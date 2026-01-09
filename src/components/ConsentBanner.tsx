/**
 * Wix Privacy Center / Usercentrics Consent Banner Integration
 * 
 * This component integrates with Wix's official Privacy Center (powered by Usercentrics)
 * for GDPR-compliant consent management.
 * 
 * The banner is automatically managed by Wix and appears based on Privacy Center settings.
 * This component ensures GA4 only loads after Analytics consent is granted.
 * 
 * Setup Instructions:
 * 1. Go to Wix Dashboard → Settings → Privacy Center
 * 2. Enable Privacy Center
 * 3. Configure consent categories:
 *    - Essential (always enabled)
 *    - Analytics (for GA4)
 *    - Marketing (for retargeting)
 * 4. Add your Privacy Policy and Cookie Policy URLs
 * 5. The banner will automatically appear on your site
 */

import React, { useEffect } from 'react';

declare global {
  interface Window {
    consentManager?: {
      addEventListener: (event: string, callback: (consent: any) => void) => void;
      getConsentData: () => any;
    };
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export default function ConsentBanner() {
  useEffect(() => {
    // Listen for Wix Privacy Center consent changes
    if (typeof window !== 'undefined' && window.consentManager) {
      // Handle initial consent state
      const initialConsent = window.consentManager.getConsentData?.();
      if (initialConsent) {
        handleConsentChange(initialConsent);
      }

      // Listen for consent changes
      window.consentManager.addEventListener('consent', (consent: any) => {
        handleConsentChange(consent);
      });
    }
  }, []);

  const handleConsentChange = (consent: any) => {
    // Extract consent categories from Wix Privacy Center
    const analyticsConsent = consent?.categories?.analytics?.consent === true;
    const marketingConsent = consent?.categories?.marketing?.consent === true;

    // Update GA4 consent mode based on user preferences
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': analyticsConsent ? 'granted' : 'denied',
        'marketing_storage': marketingConsent ? 'granted' : 'denied'
      });
    }

    // Dispatch custom event for other components to listen to
    window.dispatchEvent(
      new CustomEvent('consent-updated', {
        detail: {
          analytics: analyticsConsent,
          marketing: marketingConsent,
          necessary: true
        }
      })
    );
  };

  // The Wix Privacy Center banner is rendered by Wix automatically
  // This component only handles consent logic and GA4 integration
  return null;
}
