import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { updateConsent, sendDebugTestPing } from '@/services/ga4-tracking';

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
      setIsVisible(true);
      return;
    }

    updateConsent(savedConsent.analytics, savedConsent.marketing);
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

    if (consent.analytics) {
      sendDebugTestPing();
    }

    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[110] p-4 sm:p-6">
      <div
        role="dialog"
        aria-live="polite"
        aria-label="Cookie-Einstellungen"
        className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl"
      >
        <div className="space-y-3">
          <p className="font-heading text-lg font-semibold text-primary">Cookie-Einstellungen</p>
          <p className="font-paragraph text-sm text-slate-700">
            Wir verwenden nur dann Analyse-Cookies, wenn Sie zustimmen. Ohne Einwilligung bleiben
            nur technisch notwendige Funktionen aktiv.
          </p>
          <p className="font-paragraph text-xs text-slate-500">
            Ihre Auswahl können Sie jederzeit über den Footer unter &quot;Cookie-Einstellungen&quot;
            erneut öffnen und ändern.
          </p>
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => applyConsent({ analytics: false, marketing: false })}
          >
            Nur notwendige
          </Button>
          <Button
            type="button"
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 sm:w-auto"
            onClick={() => applyConsent({ analytics: true, marketing: false })}
          >
            Analyse erlauben
          </Button>
        </div>
      </div>
    </div>
  );
}
