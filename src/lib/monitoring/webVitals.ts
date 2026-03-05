/**
 * Web Vitals Tracking
 * Misst und reportet Core Web Vitals für Performance-Monitoring
 */

import type { Metric } from 'web-vitals';

interface VitalsOptions {
  analyticsId?: string;
  debug?: boolean;
}

/**
 * Sendet Web Vitals an Analytics
 */
function sendToAnalytics(metric: Metric, options: VitalsOptions = {}) {
  const { analyticsId, debug = false } = options;

  if (debug) {
    console.log('Web Vital:', metric);
  }

  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true
    });
  }

  // Custom Analytics Endpoint
  if (analyticsId) {
    const body = JSON.stringify({
      id: analyticsId,
      metric: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      navigationType: metric.navigationType
    });

    // Use `navigator.sendBeacon()` wenn verfügbar, sonst `fetch()`
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics', body);
    } else {
      fetch('/api/analytics', {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
        keepalive: true
      }).catch(console.error);
    }
  }
}

/**
 * Initialisiert Web Vitals Tracking
 */
export async function initWebVitals(options: VitalsOptions = {}) {
  if (typeof window === 'undefined') return;

  try {
    // Dynamisches Import für bessere Performance
    const { onCLS, onFID, onFCP, onLCP, onTTFB, onINP } = await import('web-vitals');

    // Core Web Vitals
    onCLS((metric) => sendToAnalytics(metric, options));
    onFID((metric) => sendToAnalytics(metric, options));
    onLCP((metric) => sendToAnalytics(metric, options));
    
    // Weitere wichtige Metriken
    onFCP((metric) => sendToAnalytics(metric, options));
    onTTFB((metric) => sendToAnalytics(metric, options));
    onINP((metric) => sendToAnalytics(metric, options));
  } catch (error) {
    console.error('Failed to initialize Web Vitals:', error);
  }
}

/**
 * Performance Observer für Custom Metriken
 */
export function observePerformance() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  try {
    // Long Tasks Observer
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          console.warn('Long Task detected:', entry);
        }
      }
    });
    longTaskObserver.observe({ entryTypes: ['longtask'] });

    // Layout Shift Observer
    const layoutShiftObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if ((entry as any).hadRecentInput === false) {
          console.log('Layout Shift:', entry);
        }
      }
    });
    layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });
  } catch (error) {
    console.error('Failed to observe performance:', error);
  }
}
