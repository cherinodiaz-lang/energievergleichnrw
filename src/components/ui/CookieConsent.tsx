/**
 * GDPR-konformes Cookie Consent Banner
 * Speichert User-Präferenzen im localStorage
 */

import { useState, useEffect } from 'react';
import { clsx } from 'clsx';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true, // Immer aktiv
  analytics: false,
  marketing: false
};

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    // Check if user has already made a choice
    const savedPreferences = localStorage.getItem('cookieConsent');
    if (!savedPreferences) {
      setIsVisible(true);
    } else {
      setPreferences(JSON.parse(savedPreferences));
      applyPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const applyPreferences = (prefs: CookiePreferences) => {
    // Apply analytics consent
    if (prefs.analytics && typeof window !== 'undefined') {
      // Enable Google Analytics
      (window as any).gtag?.('consent', 'update', {
        analytics_storage: 'granted'
      });
    }

    // Apply marketing consent
    if (prefs.marketing) {
      (window as any).gtag?.('consent', 'update', {
        ad_storage: 'granted'
      });
    }
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true
    };
    savePreferences(allAccepted);
  };

  const handleAcceptNecessary = () => {
    savePreferences(DEFAULT_PREFERENCES);
  };

  const handleSaveCustom = () => {
    savePreferences(preferences);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookieConsent', JSON.stringify(prefs));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    applyPreferences(prefs);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-consent" role="dialog" aria-label="Cookie Einstellungen">
      <div className="cookie-consent-content">
        <h2 className="cookie-consent-title">🍪 Wir verwenden Cookies</h2>
        
        {!showDetails ? (
          <>
            <p className="cookie-consent-text">
              Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten.
              Einige Cookies sind notwendig für die Funktion der Website, während andere uns helfen,
              die Website und Ihre Erfahrung zu verbessern.
            </p>
            
            <div className="cookie-consent-actions">
              <button
                onClick={handleAcceptAll}
                className="btn btn-primary"
              >
                Alle akzeptieren
              </button>
              <button
                onClick={handleAcceptNecessary}
                className="btn btn-secondary"
              >
                Nur notwendige
              </button>
              <button
                onClick={() => setShowDetails(true)}
                className="btn btn-outline"
              >
                Einstellungen
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="cookie-settings">
              <div className="cookie-category">
                <div className="cookie-category-header">
                  <label className="cookie-label">
                    <input
                      type="checkbox"
                      checked={preferences.necessary}
                      disabled
                    />
                    <span className="cookie-name">Notwendige Cookies</span>
                  </label>
                  <span className="cookie-badge">Erforderlich</span>
                </div>
                <p className="cookie-description">
                  Diese Cookies sind für die Grundfunktionen der Website erforderlich.
                </p>
              </div>

              <div className="cookie-category">
                <div className="cookie-category-header">
                  <label className="cookie-label">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) =>
                        setPreferences({ ...preferences, analytics: e.target.checked })
                      }
                    />
                    <span className="cookie-name">Analytics Cookies</span>
                  </label>
                </div>
                <p className="cookie-description">
                  Helfen uns zu verstehen, wie Besucher mit der Website interagieren.
                </p>
              </div>

              <div className="cookie-category">
                <div className="cookie-category-header">
                  <label className="cookie-label">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) =>
                        setPreferences({ ...preferences, marketing: e.target.checked })
                      }
                    />
                    <span className="cookie-name">Marketing Cookies</span>
                  </label>
                </div>
                <p className="cookie-description">
                  Werden verwendet, um Besuchern relevante Werbung anzuzeigen.
                </p>
              </div>
            </div>

            <div className="cookie-consent-actions">
              <button
                onClick={handleSaveCustom}
                className="btn btn-primary"
              >
                Auswahl speichern
              </button>
              <button
                onClick={() => setShowDetails(false)}
                className="btn btn-secondary"
              >
                Zurück
              </button>
            </div>
          </>
        )}
        
        <p className="cookie-consent-footer">
          Mehr Informationen in unserer{' '}
          <a href="/datenschutz" className="cookie-link">
            Datenschutzerklärung
          </a>
        </p>
      </div>
    </div>
  );
}
