export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: string;
}

export class AnalyticsService {
  private static instance: AnalyticsService;
  
  private constructor() {}
  
  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }
  
  /**
   * Track generic event
   */
  track(eventName: string, properties: Record<string, any> = {}): void {
    const event: AnalyticsEvent = {
      name: eventName,
      properties: {
        ...properties,
        page_path: window.location.pathname,
        page_title: document.title,
        timestamp: new Date().toISOString(),
      },
    };
    
    if (typeof window.gtag === 'function') {
      window.gtag('event', event.name, event.properties);
    }
    
    if (typeof window !== 'undefined' && window.location.search.includes('debug=1')) {
      console.log('[Analytics Event]', event);
    }
  }
  
  /**
   * Track form submission
   */
  trackFormSubmit(formType: string, success: boolean, city?: string): void {
    this.track(success ? 'form_submit_success' : 'form_submit_error', {
      form_type: formType,
      city: city || 'unknown',
      success: success,
    });
  }
  
  /**
   * Track CTA click
   */
  trackCtaClick(ctaText: string, location: string): void {
    this.track('cta_click', {
      cta_text: ctaText,
      location: location,
    });
  }
  
  /**
   * Track methodology view
   */
  trackMethodologyClick(section: string): void {
    this.track('methodology_click', {
      section: section,
    });
  }
  
  /**
   * Track contact click
   */
  trackContactClick(contactType: 'phone' | 'email' | 'form'): void {
    this.track('contact_click', {
      contact_type: contactType,
    });
  }
  
  /**
   * Track page view
   */
  trackPageView(pagePath: string, pageTitle: string): void {
    this.track('page_view', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
  
  /**
   * Track error
   */
  trackError(errorType: string, errorMessage: string, context?: Record<string, any>): void {
    this.track('error', {
      error_type: errorType,
      error_message: errorMessage,
      ...context,
    });
  }
}

export const analytics = AnalyticsService.getInstance();

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    trackEvent?: (eventName: string, properties?: Record<string, any>) => void;
  }
}