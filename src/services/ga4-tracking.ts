/**
 * GA4 Tracking Service
 * Handles all Google Analytics 4 tracking with consent management
 * 
 * CRITICAL: All events are only tracked AFTER Analytics consent is granted
 * Events are queued if consent is not yet determined, then flushed when consent is given
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

/**
 * Initialize GA4 with consent mode
 * Must be called early in app lifecycle
 */
export function initializeGA4(measurementId: string) {
  if (typeof window === 'undefined') return;

  // Check for debug mode via URL parameter
  debugMode = new URLSearchParams(window.location.search).has('ga_debug');

  // Initialize dataLayer if not present
  if (!window.dataLayer) {
    window.dataLayer = [];
  }

  // Set default consent to 'denied' until user makes a choice
  window.gtag?.('consent', 'default', {
    'analytics_storage': 'denied',
    'marketing_storage': 'denied',
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
  });

  // Load GA4 script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize gtag function
  window.gtag = function () {
    window.dataLayer?.push(arguments);
  };

  // Configure GA4
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    'anonymize_ip': true,
    'allow_google_signals': false,
  });

  if (debugMode) {
    console.log('[GA4 DEBUG] Initialized with Measurement ID:', measurementId);
  }
}

/**
 * Update consent status and flush queued events
 */
export function updateConsent(analyticsConsent: boolean, marketingConsent: boolean) {
  if (typeof window === 'undefined') return;

  consentGranted = analyticsConsent;

  // Update GA4 consent mode
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
      timestamp: new Date().toISOString()
    });
  }

  // Flush queued events if consent is granted
  if (analyticsConsent) {
    flushEventQueue();
  }
}

/**
 * Track event in GA4 (only if analytics consent is granted)
 * Events are queued if consent is not yet determined
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

  const eventWithTimestamp = {
    ...eventData,
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
 */
function flushEventQueue() {
  if (debugMode) {
    console.log('[GA4 DEBUG] Flushing event queue, count:', eventQueue.length);
  }

  while (eventQueue.length > 0) {
    const event = eventQueue.shift();
    if (event) {
      const eventWithTimestamp = {
        ...event.eventData,
        'timestamp': new Date().toISOString(),
      };
      window.gtag?.('event', event.eventName, eventWithTimestamp);

      if (debugMode) {
        console.log('[GA4 DEBUG] Queued event flushed:', event.eventName, eventWithTimestamp);
      }
    }
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
 * Send debug ping event (only in debug mode with consent)
 */
export function sendDebugPing() {
  if (!debugMode || !consentGranted) return;

  trackEvent('debug_ping', {
    'page_path': window.location.pathname,
    'page_url': window.location.href,
    'consent_status': 'granted',
    'debug_mode': true,
  });

  console.log('[GA4 DEBUG] Debug ping sent');
}
