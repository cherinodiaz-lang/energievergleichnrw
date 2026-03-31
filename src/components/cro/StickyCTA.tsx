import { useState, useEffect, useCallback } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StickyCTAProps {
  showExitIntent?: boolean;
  onCTAClick?: () => void;
}

export default function StickyCTA({ showExitIntent = true, onCTAClick }: StickyCTAProps) {
  const [showSticky, setShowSticky] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupDismissed, setPopupDismissed] = useState(false);

  // Show sticky bar after scrolling 300px
  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Exit-intent detection: mouse leaves the viewport at the top
  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (showExitIntent && !popupDismissed && e.clientY <= 0) {
        setShowPopup(true);
      }
    },
    [showExitIntent, popupDismissed]
  );

  useEffect(() => {
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [handleMouseLeave]);

  const handleDismissPopup = () => {
    setShowPopup(false);
    setPopupDismissed(true);
  };

  const handleCTAClick = () => {
    setShowPopup(false);
    onCTAClick?.();
    const el = document.getElementById('vergleichsrechner');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Sticky Bottom Bar – mobile only */}
      <div
        role="complementary"
        aria-label="Jetzt Tarife vergleichen"
        className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${
          showSticky ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="bg-primary border-t-2 border-secondary shadow-2xl px-4 py-3 safe-area-inset-bottom">
          <button
            onClick={handleCTAClick}
            className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-black font-bold py-3.5 px-6 rounded-xl text-base transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary"
            aria-label="Jetzt Tarife vergleichen – zum Rechner scrollen"
          >
            <span>Jetzt Tarife vergleichen</span>
            <ArrowRight className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Exit-Intent Popup */}
      {showPopup && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-popup-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleDismissPopup}
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 text-center">
            <button
              onClick={handleDismissPopup}
              className="absolute top-3 right-3 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Popup schließen"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            {/* Icon */}
            <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl" aria-hidden="true">⚡</span>
            </div>

            <h2 id="exit-popup-title" className="font-heading text-xl sm:text-2xl font-bold text-primary mb-2">
              Warte! Du könntest 847€ sparen
            </h2>
            <p className="font-paragraph text-gray-600 text-sm sm:text-base mb-6">
              In nur 2 Minuten den besten Stromtarif für NRW finden – kostenlos und ohne Anmeldung.
            </p>

            <Button
              onClick={handleCTAClick}
              className="w-full bg-secondary hover:bg-secondary/90 text-black font-bold h-12 text-base rounded-xl mb-3"
            >
              Jetzt kostenlos vergleichen
              <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
            </Button>

            <button
              onClick={handleDismissPopup}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors underline focus:outline-none"
            >
              Nein danke, ich zahle lieber zu viel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
