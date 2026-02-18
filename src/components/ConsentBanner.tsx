/**
 * Custom Consent Banner Component
 * 
 * A compact, German-language cookie consent banner that appears at the bottom of the page.
 * Features:
 * - Compact banner layout (not a large panel)
 * - German text
 * - Buttons positioned to the right
 * - Matches website color scheme (primary green)
 * - Only appears on first visit
 * - Disappears after consent is given
 * - Small "Privacy Settings" link to reopen
 * - GA4 integration with consent-safe tracking
 * - Events only tracked AFTER Analytics consent is granted
 */

import React, { useEffect, useState } from 'react';
import { Settings, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/routes';
import { updateConsent, sendDebugTestPing } from '@/services/ga4-tracking';

interface ConsentState {
  analytics: boolean;
  marketing: boolean;
  necessary: boolean;
}

const CONSENT_STORAGE_KEY = 'energievergleich_consent';
const CONSENT_VERSION = '1.0';

export default function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    analytics: false,
    marketing: false,
    necessary: true,
  });

  // Initialize banner on mount - defer to avoid blocking render
  useEffect(() => {
    const timer = setTimeout(() => {
      const storedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
      
      if (!storedConsent) {
        // No consent stored, show banner
        setShowBanner(true);
      } else {
        try {
          const parsed = JSON.parse(storedConsent);
          setConsent(parsed);
          // Apply stored consent
          applyConsent(parsed);
        } catch (error) {
          console.error('Error parsing stored consent:', error);
          setShowBanner(true);
        }
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const applyConsent = (consentState: ConsentState) => {
    // Update GA4 consent mode via service
    // This triggers: consent update -> gtag('config') -> flush queued events
    updateConsent(consentState.analytics, consentState.marketing);

    // Send debug test ping if in debug mode and analytics consent granted
    // Delayed to ensure config and flush are complete
    if (consentState.analytics) {
      setTimeout(() => {
        sendDebugTestPing();
      }, 200);
    }

    // Dispatch custom event for other components
    window.dispatchEvent(
      new CustomEvent('consent-updated', {
        detail: consentState,
      })
    );
  };

  const handleAcceptAll = () => {
    const newConsent: ConsentState = {
      analytics: true,
      marketing: true,
      necessary: true,
    };
    saveAndApplyConsent(newConsent);
  };

  const handleRejectAll = () => {
    const newConsent: ConsentState = {
      analytics: false,
      marketing: false,
      necessary: true,
    };
    saveAndApplyConsent(newConsent);
  };

  const handleSaveSettings = () => {
    saveAndApplyConsent(consent);
  };

  const saveAndApplyConsent = (consentState: ConsentState) => {
    localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({
        ...consentState,
        timestamp: new Date().toISOString(),
        version: CONSENT_VERSION,
      })
    );
    setConsent(consentState);
    applyConsent(consentState);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleResetConsent = () => {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
    setShowBanner(true);
    setShowSettings(false);
  };

  // Compact Banner (First Layer)
  if (showBanner && !showSettings) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-primary text-primary-foreground shadow-2xl">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            {/* Text Content */}
            <div className="flex-1 min-w-0">
              <p className="font-paragraph text-xs sm:text-sm leading-snug">
                Wir nutzen Cookies für bessere Erfahrung.{' '}
                <button
                  onClick={() => setShowSettings(true)}
                  className="underline hover:opacity-80 transition-opacity font-semibold"
                >
                  Einstellungen
                </button>
              </p>
            </div>

            {/* Buttons - Right aligned */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 w-full sm:w-auto">
              <Button
                onClick={handleRejectAll}
                variant="outline"
                className="flex-1 sm:flex-none h-8 sm:h-9 px-3 sm:px-4 text-xs sm:text-sm bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 rounded-md"
              >
                Ablehnen
              </Button>
              <Button
                onClick={handleAcceptAll}
                className="flex-1 sm:flex-none h-8 sm:h-9 px-3 sm:px-4 text-xs sm:text-sm bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-md font-semibold"
              >
                Akzeptieren
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Settings Panel (Second Layer)
  if (showSettings) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center">
        <div className="bg-white w-full sm:w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-primary text-primary-foreground p-4 sm:p-6 flex items-center justify-between border-b border-primary-foreground/10">
            <h2 className="font-heading text-lg sm:text-xl font-bold">Datenschutzeinstellungen</h2>
            <button
              onClick={() => setShowSettings(false)}
              className="p-1 hover:bg-primary-foreground/10 rounded-lg transition-colors"
              aria-label="Schließen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 space-y-6">
            {/* Necessary Cookies */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-heading font-semibold text-gray-900">
                  Notwendige Cookies
                </label>
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="w-5 h-5 rounded accent-primary cursor-not-allowed"
                />
              </div>
              <p className="font-paragraph text-xs sm:text-sm text-gray-600">
                Erforderlich für die Grundfunktionalität der Website.
              </p>
            </div>

            {/* Analytics Cookies */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-heading font-semibold text-gray-900">
                  Analyse-Cookies
                </label>
                <input
                  type="checkbox"
                  checked={consent.analytics}
                  onChange={(e) =>
                    setConsent({ ...consent, analytics: e.target.checked })
                  }
                  className="w-5 h-5 rounded accent-primary cursor-pointer"
                />
              </div>
              <p className="font-paragraph text-xs sm:text-sm text-gray-600">
                Helfen uns zu verstehen, wie Sie unsere Website nutzen.
              </p>
            </div>

            {/* Marketing Cookies */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-heading font-semibold text-gray-900">
                  Marketing-Cookies
                </label>
                <input
                  type="checkbox"
                  checked={consent.marketing}
                  onChange={(e) =>
                    setConsent({ ...consent, marketing: e.target.checked })
                  }
                  className="w-5 h-5 rounded accent-primary cursor-pointer"
                />
              </div>
              <p className="font-paragraph text-xs sm:text-sm text-gray-600">
                Ermöglichen personalisierte Werbung und Retargeting.
              </p>
            </div>

            {/* Links */}
            <div className="border-t pt-4 space-y-2">
              <a
                href={ROUTES.DATENSCHUTZ}
                className="block font-paragraph text-xs sm:text-sm text-primary hover:underline"
              >
                Datenschutzerklärung
              </a>
              <a
                href={ROUTES.IMPRESSUM}
                className="block font-paragraph text-xs sm:text-sm text-primary hover:underline"
              >
                Impressum
              </a>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="sticky bottom-0 bg-gray-50 border-t p-4 sm:p-6 flex gap-3 sm:gap-4">
            <Button
              onClick={handleRejectAll}
              variant="outline"
              className="flex-1 h-9 sm:h-10 text-xs sm:text-sm border-gray-300 hover:bg-gray-100"
            >
              Ablehnen
            </Button>
            <Button
              onClick={handleSaveSettings}
              className="flex-1 h-9 sm:h-10 text-xs sm:text-sm bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold"
            >
              Speichern
            </Button>
            <Button
              onClick={handleAcceptAll}
              className="flex-1 h-9 sm:h-10 text-xs sm:text-sm bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            >
              Alle
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Privacy Settings Link (shown when banner is hidden)
  if (!showBanner && !showSettings) {
    return (
      <button
        onClick={handleResetConsent}
        className="fixed bottom-6 right-6 z-40 p-2 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
        title="Datenschutzeinstellungen"
        aria-label="Datenschutzeinstellungen"
      >
        <Settings className="w-5 h-5" />
      </button>
    );
  }

  return null;
}
