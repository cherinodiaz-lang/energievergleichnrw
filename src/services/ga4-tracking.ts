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
 * 3. gtag('config') with send_page_view:false AFTER consent (SPA tracking sends page_view manually)
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
let isErrorListenerAttached = false;

/**
 * Initialize GA4 with consent mode
 * Must be called early in app lifecycle
 * 
 * CRITICAL: gtag('config') is NOT called here - it's called AFTER consent is granted
 */
export function initializeGA4(measurementId: string) {
  if (typeof window === 'undefined') return;

  measurementIdGlobal = measurementId;

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

  // Load GA4 script - ASYNC
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  
  // Mark script as loaded when it completes
  script.onload = () => {
    scriptLoaded = true;
    if (debugMode) {
      console.log('[GA4 DEBUG] Script loaded successfully for ID:', measurementId);
    }
  };
  
  script.onerror = () => {
    console.error('[GA4 ERROR] Failed to load GA4 script');
  };

  document.head.appendChild(script);

  if (debugMode) {
    console.log('[GA4 DEBUG] Initialization started with Measurement ID:', measurementId);
  }
  
  // Attach global error listener for JS Error Monitoring
  attachGlobalErrorListener();
}

/**
 * Update consent status and flush queued events
 * 
 * CRITICAL EXECUTION ORDER:
 * 1. Update consent mode
 * 2. Call gtag('config') AFTER consent is granted (send_page_view disabled; SPA handles page_view)
 * 3. Flush queued events immediately
 */
export function updateConsent(analyticsConsent: boolean, marketingConsent: boolean) {
  if (typeof window === 'undefined') return;

  consentGranted = analyticsConsent;

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

  // Step 2: If analytics consent granted, call gtag('config')
  // NOTE: send_page_view is disabled to prevent double counting; page views are tracked via trackPageView()
  if (analyticsConsent && measurementIdGlobal) {
    window.gtag?.('config', measurementIdGlobal, {
      'send_page_view': false,
      'anonymize_ip': true,
      'allow_google_signals': false,
      'debug_mode': debugMode,
    });

    if (debugMode) {
      console.log('[GA4 DEBUG] gtag("config") called with:', {
        measurementId: measurementIdGlobal,
        send_page_view: false,
        debug_mode: debugMode,
      });
    }
  }

  // Step 3: Flush queued events immediately after config
  if (analyticsConsent) {
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
 * Track SPA page views safely (only if analytics consent is granted).
 * Uses a dedicated page_view event so you get one hit per route change.
 */
export function trackPageView(pathname: string) {
  if (typeof window === 'undefined') return;

  trackEvent('page_view', {
    page_path: pathname,
    page_location: window.location.href,
    page_title: document.title,
  });
}

/**
 * Track form submission as conversion
 */
export function trackFormSubmit(formType: string, city?: string) {
  trackEvent('form_submit', {
    'page_path': window.location.pathname,
    'form_type': formType,
    'city': city || 'none',
  });
}

/**
 * Track form submission error
 */
export function trackFormError(formType: string, errors: string, city?: string) {
  trackEvent('form_error', {
    'page_path': window.location.pathname,
    'form_type': formType,
    'city': city || 'none',
    'error_fields': errors,
  });
}

/**
 * Track CTA button clicks
 */
export function trackCTAClick(ctaLabel: string, city?: string) {
  trackEvent('cta_click', {
    'page_path': window.location.pathname,
    'cta_label': ctaLabel,
    'city': city || 'none',
  });
}

/**
 * Track Methodik link clicks
 */
export function trackMethodikClick() {
  trackEvent('methodik_click', {
    'page_path': window.location.pathname,
  });
}

/**
 * Track Kontakt clicks
 */
export function trackKontaktClick(method: 'email' | 'phone') {
  trackEvent('kontakt_click', {
    'page_path': window.location.pathname,
    'method': method,
  });
}

/**
 * Track 404 Errors
 */
export function track404Error(url: string) {
  trackEvent('404_error', {
    'page_path': window.location.pathname,
    'broken_url': url,
  });
}

/**
 * Track JS Errors globally
 */
export function trackJsError(errorMessage: string, source: string, lineno: number) {
  trackEvent('js_error', {
    'page_path': window.location.pathname,
    'error_message': errorMessage,
    'source': source,
    'lineno': lineno,
  });
}

/**
 * Attaches a global error listener for monitoring unhandled JS errors
 */
function attachGlobalErrorListener() {
  if (typeof window === 'undefined' || isErrorListenerAttached) return;
  
  window.addEventListener('error', (event) => {
    trackJsError(event.message, event.filename || 'unknown', event.lineno || 0);
  });
  
  isErrorListenerAttached = true;
}

/**
 * Flush all queued events
 */
function flushEventQueue() {
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
 * Send GA4 test ping event
 */
export function sendDebugTestPing() {
  if (typeof window === 'undefined') return;

  if (!debugMode || !consentGranted || debugTestPingSent) {
    if (debugMode && !consentGranted) {
      console.log('[GA4 DEBUG] Test ping blocked: consent not granted');
    }
    return;
  }

  debugTestPingSent = true;

  trackEvent('ga4_test_ping', {
    'page_path': window.location.pathname,
    'debug_mode': true,
  });

  console.log('[GA4 DEBUG] Test ping sent (ga4_test_ping)');
}
