/**
 * GDPR-Compliant Consent Banner Component
 * Manages user consent for Analytics and Marketing
 * Integrates with Wix Privacy Center
 * Controls GA4 and other tracking tags
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export interface ConsentState {
  analytics: boolean;
  marketing: boolean;
  necessary: boolean; // Always true
}

const CONSENT_STORAGE_KEY = 'wix-consent-preferences';

export default function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    analytics: false,
    marketing: false
  });

  // Load consent preferences from localStorage
  useEffect(() => {
    const savedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        setConsent(parsed);
        applyConsent(parsed);
      } catch (error) {
        console.error('Error parsing consent preferences:', error);
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }
  }, []);

  /**
   * Apply consent preferences
   * Enable/disable tracking tags based on user consent
   */
  const applyConsent = (consentState: ConsentState) => {
    // GA4 - Only load if analytics consent is given
    if (consentState.analytics && typeof window !== 'undefined') {
      // GA4 will be loaded by GoogleAnalytics component if consent is true
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function() {
        window.dataLayer.push(arguments);
      };
      
      // Set consent mode
      window.gtag('consent', 'update', {
        'analytics_storage': consentState.analytics ? 'granted' : 'denied',
        'marketing_storage': consentState.marketing ? 'granted' : 'denied'
      });
    }

    // Store consent preferences
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentState));

    // Trigger custom event for other components to listen to
    window.dispatchEvent(
      new CustomEvent('consent-updated', { detail: consentState })
    );
  };

  const handleAcceptAll = () => {
    const newConsent: ConsentState = {
      necessary: true,
      analytics: true,
      marketing: true
    };
    setConsent(newConsent);
    applyConsent(newConsent);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleRejectAll = () => {
    const newConsent: ConsentState = {
      necessary: true,
      analytics: false,
      marketing: false
    };
    setConsent(newConsent);
    applyConsent(newConsent);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleSaveSettings = () => {
    applyConsent(consent);
    setShowBanner(false);
    setShowSettings(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-2xl"
        >
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-6">
            {!showSettings ? (
              // Main Banner
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-gray-900 mb-2">
                    Datenschutz & Cookies
                  </h3>
                  <p className="font-paragraph text-sm text-gray-600">
                    Wir nutzen Cookies und Tracking-Tools, um Ihre Erfahrung zu verbessern und unsere Website zu optimieren.
                    {' '}
                    <Link
                      to="/datenschutz"
                      className="text-primary hover:underline font-bold"
                    >
                      Mehr erfahren
                    </Link>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <Button
                    onClick={handleRejectAll}
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    Ablehnen
                  </Button>
                  <Button
                    onClick={() => setShowSettings(true)}
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Einstellungen
                  </Button>
                  <Button
                    onClick={handleAcceptAll}
                    className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  >
                    Alle akzeptieren
                  </Button>
                </div>
              </div>
            ) : (
              // Settings Panel
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-gray-900">
                    Cookie-Einstellungen
                  </h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Necessary Cookies */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900">Notwendige Cookies</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          Erforderlich für die Funktionalität der Website
                        </p>
                      </div>
                      <div className="w-12 h-6 bg-primary rounded-full flex items-center justify-end pr-1">
                        <div className="w-5 h-5 bg-white rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900">Analyse-Cookies</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          Helfen uns, die Website zu verbessern (Google Analytics)
                        </p>
                      </div>
                      <button
                        onClick={() => setConsent({ ...consent, analytics: !consent.analytics })}
                        className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                          consent.analytics ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            consent.analytics ? 'translate-x-6' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900">Marketing-Cookies</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          Für personalisierte Werbung und Retargeting
                        </p>
                      </div>
                      <button
                        onClick={() => setConsent({ ...consent, marketing: !consent.marketing })}
                        className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                          consent.marketing ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            consent.marketing ? 'translate-x-6' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleRejectAll}
                    variant="outline"
                    className="flex-1"
                  >
                    Alle ablehnen
                  </Button>
                  <Button
                    onClick={handleSaveSettings}
                    className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  >
                    Einstellungen speichern
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
