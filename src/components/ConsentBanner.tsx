import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { updateConsent, sendDebugTestPing } from '@/services/ga4-tracking';
import { updateClarityConsent } from '@/services/clarity-tracking';

const CONSENT_STORAGE_KEY = 'energievergleich_consent';

type ConsentState = {
  analytics: boolean;
  marketing: boolean;
};

function readStoredConsent(): ConsentState | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const rawValue = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<ConsentState>;
    return {
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
    };
  } catch {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
    return null;
  }
}

function persistConsent(consent: ConsentState) {
  window.localStorage.setItem(
    CONSENT_STORAGE_KEY,
    JSON.stringify({
      ...consent,
      updatedAt: new Date().toISOString(),
    }),
  );
}

export default function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const savedConsent = readStoredConsent();

    if (!savedConsent) {
      updateConsent(false, false);
      updateClarityConsent(false);
      setIsVisible(true);
      return;
    }

    updateConsent(savedConsent.analytics, savedConsent.marketing);
    updateClarityConsent(savedConsent.analytics);
    if (savedConsent.analytics) {
      sendDebugTestPing();
    }
  }, []);

  useEffect(() => {
    const handleOpenConsent = () => {
      setIsVisible(true);
    };

    window.addEventListener('energievergleich:open-consent', handleOpenConsent);
    return () => {
      window.removeEventListener('energievergleich:open-consent', handleOpenConsent);
    };
  }, []);

  const applyConsent = (consent: ConsentState) => {
    persistConsent(consent);
    updateConsent(consent.analytics, consent.marketing);
    updateClarityConsent(consent.analytics);

    if (consent.analytics) {
      sendDebugTestPing();
    }

    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[110] p-3 sm:p-5">
      <div
        role="dialog"
        aria-live="polite"
        aria-label="Cookie-Einstellungen"
        className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-2xl"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
          <div className="flex-1 space-y-1">
            <p className="font-heading text-base font-semibold text-primary">
              Wir schützen Ihre Privatsphäre 🔒
            </p>
            <p className="font-paragraph text-xs text-slate-600">
              Wir nutzen Analyse-Tools, um unser Angebot besser für Sie zu machen. Keine Werbung,
              keine Weitergabe an Dritte. Sie können Ihre Auswahl jederzeit im Footer ändern.
            </p>
          </div>
          <div className="mt-3 sm:mt-0 flex flex-col gap-2 sm:flex-shrink-0 sm:flex-row">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-xs text-slate-500 hover:text-slate-700"
              onClick={() => applyConsent({ analytics: false, marketing: false })}
            >
              Ablehnen
            </Button>
            <Button
              type="button"
              size="sm"
              className="bg-primary text-white hover:bg-primary/90 font-semibold px-6"
              onClick={() => applyConsent({ analytics: true, marketing: false })}
            >
              ✓ Akzeptieren &amp; fortfahren
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
