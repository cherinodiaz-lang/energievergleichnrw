import { useState, useCallback } from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { trackCTAClick } from '@/services/form-submission';

interface HeroSectionProps {
  onCompare?: (plz: string) => void;
}

export default function HeroSection({ onCompare }: HeroSectionProps) {
  const [plz, setPlz] = useState('');
  const [plzError, setPlzError] = useState('');
  const navigate = useNavigate();

  const handleCompare = useCallback(() => {
    const trimmed = plz.trim();
    if (trimmed && !/^\d{5}$/.test(trimmed)) {
      setPlzError('Bitte eine gültige 5-stellige PLZ eingeben.');
      return;
    }
    setPlzError('');
    trackCTAClick('Jetzt kostenlos vergleichen – Hero PLZ');
    if (onCompare) {
      onCompare(trimmed);
    } else {
      const target = '/stromvergleich-nrw' + (trimmed ? `?plz=${trimmed}` : '');
      navigate(target);
    }
  }, [plz, navigate, onCompare]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleCompare();
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-primary via-primary to-primary py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-secondary rounded-full blur-3xl opacity-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-secondary rounded-full blur-3xl opacity-10" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 rounded-full mb-4 sm:mb-5 border border-secondary/30">
          <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary flex-shrink-0" aria-hidden="true" />
          <span className="text-xs sm:text-sm font-bold text-white">Sofortiger Vergleich – ohne Scrollen</span>
        </div>

        {/* Headline */}
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3 sm:mb-4">
          Spare bis zu{' '}
          <span className="text-secondary">847€ pro Jahr</span>
          <br className="hidden sm:block" />
          {' '}beim Strom
        </h1>

        {/* Subtext */}
        <p className="font-paragraph text-sm sm:text-base md:text-lg text-white/90 max-w-xl mx-auto mb-7 sm:mb-8 leading-relaxed">
          In 2 Minuten – Kostenlos &amp; ohne Anmeldung
        </p>

        {/* PLZ Quick-Start */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-6 max-w-md mx-auto mb-4">
          <p className="text-white/80 text-xs sm:text-sm font-medium mb-3">
            Gib deine Postleitzahl ein und vergleiche sofort:
          </p>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                id="hero-plz"
                type="text"
                inputMode="numeric"
                pattern="[0-9]{5}"
                maxLength={5}
                placeholder="z.B. 40210"
                value={plz}
                onChange={(e) => {
                  setPlz(e.target.value);
                  if (plzError) setPlzError('');
                }}
                onKeyDown={handleKeyDown}
                aria-label="Postleitzahl eingeben"
                aria-describedby={plzError ? 'hero-plz-error' : undefined}
                className="h-12 bg-white text-gray-900 placeholder-gray-400 border-0 focus:ring-2 focus:ring-secondary text-base rounded-xl"
              />
            </div>
            <Button
              onClick={handleCompare}
              className="h-12 px-5 bg-secondary hover:bg-secondary/90 text-black font-bold rounded-xl shadow-lg transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary whitespace-nowrap text-sm sm:text-base"
              aria-label="Stromtarife vergleichen"
            >
              <span className="hidden sm:inline">Vergleichen</span>
              <ArrowRight className="sm:hidden w-5 h-5" aria-hidden="true" />
              <ArrowRight className="hidden sm:inline ml-1.5 w-4 h-4" aria-hidden="true" />
            </Button>
          </div>
          {plzError && (
            <p id="hero-plz-error" role="alert" className="mt-2 text-xs text-red-300 text-left">
              {plzError}
            </p>
          )}
        </div>

        {/* Primary CTA fallback */}
        <Button
          onClick={() => { trackCTAClick('Jetzt kostenlos vergleichen – Hero CTA'); handleCompare(); }}
          size="lg"
          className="bg-secondary hover:bg-secondary/90 text-black font-bold h-13 sm:h-14 px-8 sm:px-10 rounded-xl text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all w-full sm:w-auto active:scale-95 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary"
        >
          Jetzt kostenlos vergleichen
          <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
        </Button>

        <p className="mt-3 text-white/60 text-xs">
          ✓ Kostenlos &nbsp;·&nbsp; ✓ Ohne Anmeldung &nbsp;·&nbsp; ✓ Datenschutz nach DSGVO
        </p>
      </div>
    </section>
  );
}
