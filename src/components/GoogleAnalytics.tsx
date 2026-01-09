import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface GoogleAnalyticsProps {
  measurementId?: string;
}

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    consentManager?: {
      getConsentData: () => any;
      addEventListener: (event: string, callback: (consent: any) => void) => void;
    };
  }
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const location = useLocation();
  const [hasConsent, setHasConsent] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Check consent from Wix Privacy Center and listen for updates
  useEffect(() => {
    const checkWixConsent = () => {
      if (typeof window !== 'undefined' && window.consentManager) {
        try {
          const consentData = window.consentManager.getConsentData?.();
          const analyticsConsent = consentData?.categories?.analytics?.consent === true;
          setHasConsent(analyticsConsent);
        } catch (error) {
          console.error('Error checking Wix consent:', error);
        }
      }
    };

    // Check initial consent
    checkWixConsent();

    // Listen for Wix Privacy Center consent changes
    if (typeof window !== 'undefined' && window.consentManager) {
      window.consentManager.addEventListener('consent', (consent: any) => {
        const analyticsConsent = consent?.categories?.analytics?.consent === true;
        setHasConsent(analyticsConsent);
      });
    }

    // Also listen for custom consent-updated events (fallback)
    const handleConsentUpdate = (event: Event) => {
      const customEvent = event as CustomEvent;
      setHasConsent(customEvent.detail?.analytics === true);
    };

    window.addEventListener('consent-updated', handleConsentUpdate);
    return () => window.removeEventListener('consent-updated', handleConsentUpdate);
  }, []);

  // Load GA4 only if consent is given
  useEffect(() => {
    if (!measurementId || !hasConsent || scriptLoaded) return;

    // Add Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    script.onload = () => {
      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer!.push(arguments);
      }
      (window as any).gtag = gtag;
      
      gtag('js', new Date());
      gtag('config', measurementId, {
        page_path: location.pathname,
        'anonymize_ip': true,
        'allow_google_signals': false
      });

      // Track page view
      gtag('event', 'page_view', {
        page_path: location.pathname,
        page_title: document.title,
      });

      setScriptLoaded(true);
    };

    return () => {
      try {
        document.head.removeChild(script);
      } catch (error) {
        // Script might have already been removed
      }
    };
  }, [measurementId, hasConsent, scriptLoaded]);

  // Track page views on route change (only if GA4 is loaded)
  useEffect(() => {
    if (!scriptLoaded || !window.gtag) return;

    window.gtag('event', 'page_view', {
      page_path: location.pathname,
      page_title: document.title,
    });
  }, [location.pathname, scriptLoaded]);

  return null;
}
