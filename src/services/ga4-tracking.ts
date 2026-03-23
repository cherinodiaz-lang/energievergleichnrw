/**
 * GA4 Tracking Service
 * Handles all Google Analytics 4 tracking with consent management
 * 
 * CRITICAL: All events are only tracked AFTER Analytics consent is granted
 * Events are queued if consent is not yet determined, then flushed when consent is given
 * 
 * EXECUTION ORDER (FIXED):
 * 1. Script load (async)
 * 2. gtag('js') initialization
 * 3. gtag('config') with send_page_view:true AFTER consent
 * 4. Flush queued events immediately
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

interface QueuedEvent {
  eventName: string;
  eventData: Record<string, any>;
}

let eventQueue: QueuedEvent[] = [];
let consentGranted = false;
let debugMode = false;
let debugTestPingSent = false;
let measurementIdGlobal = '';
let scriptLoaded = false;
let scriptLoading = false;
let gaConfigApplied = false;

function scheduleNonCriticalTask(callback: () => void) {
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(() => callback(), { timeout: 2000 });
    return;
  }

  window.setTimeout(callback, 0);
}

function ensureGA4ScriptLoaded() {
  if (typeof window === 'undefined' || !measurementIdGlobal || scriptLoaded || scriptLoading) {
    return;
  }

  scriptLoading = true;

  scheduleNonCriticalTask(() => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[data-ga4-id="${measurementIdGlobal}"]`,
    );

    if (existingScript) {
      scriptLoaded = true;
      scriptLoading = false;
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementIdGlobal}`;
    script.dataset.ga4Id = measurementIdGlobal;

    script.onload = () => {
      scriptLoaded = true;
      scriptLoading = false;

      if (debugMode) {
        console.log('[GA4 DEBUG] Script loaded successfully for ID:', measurementIdGlobal);
      }

      if (consentGranted) {
        applyGA4Config();
        flushEventQueue();
      }
    };

    script.onerror = () => {
      scriptLoading = false;
      console.error('[GA4 ERROR] Failed to load GA4 script');
    };

    document.head.appendChild(script);
  });
}

function applyGA4Config() {
  if (!measurementIdGlobal || gaConfigApplied === true || !scriptLoaded) {
    return;
  }

  window.gtag?.('config', measurementIdGlobal, {
    send_page_view: true,
    anonymize_ip: true,
    allow_google_signals: false,
    debug_mode: debugMode,
  });
  gaConfigApplied = true;

  if (debugMode) {
    console.log('[GA4 DEBUG] gtag("config") called with:', {
      measurementId: measurementIdGlobal,
      send_page_view: true,
      debug_mode: debugMode,
    });
  }
}

/**
 * Initialize GA4 with consent mode
 * Must be called early in app lifecycle
 * 
 * CRITICAL: gtag('config') is NOT called here - it's called AFTER consent is granted
 */
export function initializeGA4(measurementId: string) {
  if (typeof window === 'undefined') return;
  if (measurementIdGlobal === measurementId && window.gtag) return;

  measurementIdGlobal = measurementId;
  gaConfigApplied = false;

  // Check for debug mode via URL parameter (?debug=1)
  debugMode = new URLSearchParams(window.location.search).get('debug') === '1';

  // Initialize dataLayer if not present
  if (!window.dataLayer) {
    window.dataLayer = [];
  }

  // Initialize gtag function BEFORE script loads
  window.gtag = function () {
    window.dataLayer?.push(arguments);
  };

  // Set default consent to 'denied' until user makes a choice
  window.gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'marketing_storage': 'denied',
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
  });

  // Initialize gtag with 'js' command
  window.gtag('js', new Date());

  if (debugMode) {
    console.log('[GA4 DEBUG] Initialization started with Measurement ID:', measurementId);
  }
}

/**
 * Update consent status and flush queued events
 * 
 * CRITICAL EXECUTION ORDER:
 * 1. Update consent mode
 * 2. Call gtag('config') with send_page_view:true AFTER consent is granted
 * 3. Flush queued events immediately
 */
export function updateConsent(analyticsConsent: boolean, marketingConsent: boolean) {
  if (typeof window === 'undefined') return;

  consentGranted = analyticsConsent;
  gaConfigApplied = analyticsConsent ? gaConfigApplied : false;

  // Step 1: Update GA4 consent mode
  window.gtag?.('consent', 'update', {
    'analytics_storage': analyticsConsent ? 'granted' : 'denied',
    'marketing_storage': marketingConsent ? 'granted' : 'denied',
    'ad_storage': marketingConsent ? 'granted' : 'denied',
    'ad_user_data': marketingConsent ? 'granted' : 'denied',
    'ad_personalization': marketingConsent ? 'granted' : 'denied',
  });

  if (debugMode) {
    console.log('[GA4 DEBUG] Consent updated:', {
      analytics: analyticsConsent,
      marketing: marketingConsent,
      scriptLoaded: scriptLoaded,
      timestamp: new Date().toISOString()
    });
  }

  // Step 2: If analytics consent granted, call gtag('config') with send_page_view:true
  if (analyticsConsent && measurementIdGlobal) {
    ensureGA4ScriptLoaded();
    applyGA4Config();
  }

  // Step 3: Flush queued events immediately after config
  if (analyticsConsent && scriptLoaded) {
    // Use setTimeout to ensure config is processed first
    setTimeout(() => {
      flushEventQueue();
    }, 0);
  }
}

/**
 * Track event in GA4 (only if analytics consent is granted)
 * Events are queued if consent is not yet determined
 * If debug mode is active, adds debug_mode: true to all events
 */
export function trackEvent(eventName: string, eventData: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;

  // If consent not yet determined, queue the event
  if (!consentGranted && eventQueue.length < 50) {
    eventQueue.push({ eventName, eventData });
    if (debugMode) {
      console.log('[GA4 DEBUG] Event queued (consent pending):', eventName, eventData);
    }
    return;
  }

  // Only send event if consent is granted
  if (!consentGranted) {
    if (debugMode) {
      console.log('[GA4 DEBUG] Event blocked (consent denied):', eventName);
    }
    return;
  }

  // Add debug_mode parameter if in debug mode
  const eventWithDebug = debugMode
    ? { ...eventData, debug_mode: true }
    : eventData;

  const eventWithTimestamp = {
    ...eventWithDebug,
    'timestamp': new Date().toISOString(),
  };

  window.gtag?.('event', eventName, eventWithTimestamp);

  if (debugMode) {
    console.log('[GA4 DEBUG] Event sent:', eventName, eventWithTimestamp);
  }
}

/**
 * Track form submission as conversion
 * Event: form_submit
 * Parameters: page_path, form_type
 */
export function trackFormSubmit(formType: string) {
  trackEvent('form_submit', {
    'page_path': window.location.pathname,
    'form_type': formType,
  });
}

/**
 * Track CTA button clicks as conversion
 * Event: cta_click
 * Parameters: page_path, cta_label
 */
export function trackCTAClick(ctaLabel: string) {
  trackEvent('cta_click', {
    'page_path': window.location.pathname,
    'cta_label': ctaLabel,
  });
}

/**
 * Track Methodik link clicks
 * Event: methodik_click
 * Parameters: page_path
 */
export function trackMethodikClick() {
  trackEvent('methodik_click', {
    'page_path': window.location.pathname,
  });
}

/**
 * Flush all queued events
 * Called immediately after consent is granted and gtag('config') is set
 */
function flushEventQueue() {
  if (!scriptLoaded) {
    return;
  }

  if (debugMode) {
    console.log('[GA4 DEBUG] Flushing event queue, count:', eventQueue.length);
  }

  let flushedCount = 0;
  while (eventQueue.length > 0) {
    const event = eventQueue.shift();
    if (event) {
      const eventWithDebug = debugMode
        ? { ...event.eventData, debug_mode: true }
        : event.eventData;

      const eventWithTimestamp = {
        ...eventWithDebug,
        'timestamp': new Date().toISOString(),
      };
      
      window.gtag?.('event', event.eventName, eventWithTimestamp);
      flushedCount++;

      if (debugMode) {
        console.log('[GA4 DEBUG] Queued event flushed:', event.eventName, eventWithTimestamp);
      }
    }
  }

  if (debugMode && flushedCount > 0) {
    console.log('[GA4 DEBUG] Event queue flush complete. Flushed:', flushedCount, 'events');
  }
}

/**
 * Check if analytics consent is granted
 */
export function isAnalyticsConsented(): boolean {
  return consentGranted;
}

/**
 * Get queued events count (for debugging)
 */
export function getQueuedEventsCount(): number {
  return eventQueue.length;
}

/**
 * Check if debug mode is active
 */
export function isDebugMode(): boolean {
  return debugMode;
}

/**
 * Reset debug test ping flag (for testing purposes)
 */
export function resetDebugTestPingFlag() {
  debugTestPingSent = false;
}

/**
 * Send GA4 test ping event (only in debug mode with consent)
 * Sends exactly once per page load when ?debug=1 and analytics consent is granted
 * Event name: ga4_test_ping
 * Parameters: page_path, debug_mode: true
 */
export function sendDebugTestPing() {
  if (typeof window === 'undefined') return;

  // Only send if debug mode is active, consent is granted, and not already sent
  if (!debugMode || !consentGranted || debugTestPingSent) {
    if (debugMode && !consentGranted) {
      console.log('[GA4 DEBUG] Test ping blocked: consent not granted');
    }
    return;
  }

  // Mark as sent to prevent duplicate sends
  debugTestPingSent = true;

  trackEvent('ga4_test_ping', {
    'page_path': window.location.pathname,
    'debug_mode': true,
  });

  console.log('[GA4 DEBUG] Test ping sent (ga4_test_ping)');
}
