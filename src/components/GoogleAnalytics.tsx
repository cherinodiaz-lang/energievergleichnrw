import { useEffect } from 'react';

/**
 * DEPRECATED: This component is no longer used.
 * 
 * All tracking is now handled exclusively through Google Tag Manager (GTM).
 * This component is kept for reference only and should be removed from Router.tsx.
 * 
 * GTM handles:
 * - GA4 configuration and page views
 * - Consent Mode integration with Wix Privacy Center
 * - Custom event tracking (form_submit, cta_click)
 * - PII filtering (no email, name, phone in events)
 * 
 * To complete the migration:
 * 1. Remove this component from Router.tsx
 * 2. Ensure GTM Container ID is set in Head.tsx
 * 3. Verify GTM tags are configured in GTM Container
 * 4. Test in GTM Preview mode
 */

interface GoogleAnalyticsProps {
  measurementId?: string;
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  useEffect(() => {
    console.warn(
      'GoogleAnalytics component is deprecated. All tracking is handled by Google Tag Manager (GTM). ' +
      'Please remove this component from Router.tsx and ensure GTM Container ID is set in Head.tsx.'
    );
  }, []);

  // This component does nothing - GTM handles all tracking
  return null;
}
