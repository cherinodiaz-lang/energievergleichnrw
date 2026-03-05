/**
 * Analytics & Event Tracking
 * Privacy-first Analytics mit User Consent
 */

export interface TrackEventParams {
  category: string;
  action: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
}

export interface TrackPageViewParams {
  path: string;
  title?: string;
  referrer?: string;
}

/**
 * Prüft ob Analytics Cookies erlaubt sind
 */
function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;

  const consent = localStorage.getItem('cookieConsent');
  if (!consent) return false;

  try {
    const preferences = JSON.parse(consent);
    return preferences.analytics === true;
  } catch {
    return false;
  }
}

/**
 * Track Custom Events
 */
export function trackEvent({
  category,
  action,
  label,
  value,
  nonInteraction = false,
}: TrackEventParams): void {
  if (!hasAnalyticsConsent()) return;

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      non_interaction: nonInteraction,
    });
  }

  // Optional: Custom Analytics Endpoint
  sendToCustomAnalytics('event', { category, action, label, value });
}

/**
 * Track Page Views
 */
export function trackPageView({ path, title, referrer }: TrackPageViewParams): void {
  if (!hasAnalyticsConsent()) return;

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', 'G-XXXXXXXXXX', {
      page_path: path,
      page_title: title,
      page_referrer: referrer,
    });
  }

  sendToCustomAnalytics('pageview', { path, title, referrer });
}

/**
 * Track Conversions (z.B. Formular-Submissions)
 */
export function trackConversion(
  conversionName: string,
  value?: number,
  currency: string = 'EUR'
): void {
  if (!hasAnalyticsConsent()) return;

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'conversion', {
      send_to: conversionName,
      value: value,
      currency: currency,
    });
  }

  sendToCustomAnalytics('conversion', { name: conversionName, value, currency });
}

/**
 * Track User Timing (Performance Metriken)
 */
export function trackTiming(
  category: string,
  variable: string,
  time: number,
  label?: string
): void {
  if (!hasAnalyticsConsent()) return;

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'timing_complete', {
      name: variable,
      value: time,
      event_category: category,
      event_label: label,
    });
  }
}

/**
 * Track Exceptions/Errors
 */
export function trackException(description: string, fatal: boolean = false): void {
  if (!hasAnalyticsConsent()) return;

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'exception', {
      description: description,
      fatal: fatal,
    });
  }

  sendToCustomAnalytics('error', { description, fatal });
}

/**
 * Custom Analytics Endpoint (Optional)
 */
async function sendToCustomAnalytics(type: string, data: Record<string, any>): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    const body = JSON.stringify({
      type,
      data,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      referrer: document.referrer,
    });

    // Beacon API for reliable tracking even on page unload
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics', body);
    } else {
      fetch('/api/analytics', {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      }).catch(console.error);
    }
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
}

/**
 * Initialize Analytics with Consent
 */
export function initAnalytics(): void {
  if (typeof window === 'undefined') return;

  // Google Analytics Consent Mode
  (window as any).gtag?.('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    wait_for_update: 500,
  });

  // Check saved preferences
  const consent = localStorage.getItem('cookieConsent');
  if (consent) {
    try {
      const preferences = JSON.parse(consent);
      if (preferences.analytics) {
        (window as any).gtag?.('consent', 'update', {
          analytics_storage: 'granted',
        });
      }
      if (preferences.marketing) {
        (window as any).gtag?.('consent', 'update', {
          ad_storage: 'granted',
        });
      }
    } catch (error) {
      console.error('Error parsing cookie consent:', error);
    }
  }
}
