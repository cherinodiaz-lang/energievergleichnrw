import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface GoogleAnalyticsProps {
  measurementId?: string;
}

interface ConsentState {
  analytics?: boolean;
  marketing?: boolean;
  necessary?: boolean;
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const location = useLocation();
  const [hasConsent, setHasConsent] = useState(false);

  // Check consent on mount and listen for updates
  useEffect(() => {
    const checkConsent = () => {
      const consentStr = localStorage.getItem('wix-consent-preferences');
      if (consentStr) {
        try {
          const consent: ConsentState = JSON.parse(consentStr);
          setHasConsent(consent.analytics === true);
        } catch (error) {
          console.error('Error parsing consent:', error);
        }
      }
    };

    checkConsent();

    // Listen for consent updates
    const handleConsentUpdate = (event: Event) => {
      const customEvent = event as CustomEvent;
      setHasConsent(customEvent.detail?.analytics === true);
    };

    window.addEventListener('consent-updated', handleConsentUpdate);
    return () => window.removeEventListener('consent-updated', handleConsentUpdate);
  }, []);

  // Load GA4 only if consent is given
  useEffect(() => {
    if (!measurementId || !hasConsent) return;

    // Add Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(arguments);
    }
    (window as any).gtag = gtag;
    gtag('js', new Date());
    gtag('config', measurementId, {
      page_path: location.pathname,
      'anonymize_ip': true,
      'allow_google_signals': true
    });

    // Track page views on route change
    gtag('event', 'page_view', {
      page_path: location.pathname,
      page_title: document.title,
    });

    return () => {
      try {
        document.head.removeChild(script);
      } catch (error) {
        // Script might have already been removed
      }
    };
  }, [measurementId, hasConsent, location.pathname]);

  return null;
}

// Extend window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
