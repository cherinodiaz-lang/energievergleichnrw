import { useState, useCallback } from 'react';
import { ArrowRight, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { trackCTAClick } from '@/services/form-submission';

export default function HeroSection() {
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
    trackCTAClick('Jetzt kostenlos vergleichen – Hero');
    navigate('/stromvergleich-nrw' + (trimmed ? `?plz=${trimmed}` : ''));
  }, [plz, navigate]);

  return (
    <section className="relative w-full bg-gradient-to-br from-primary via-primary to-primary py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4 md:mb-6 border border-white/20">
            <TrendingDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary flex-shrink-0" aria-hidden="true" />
            <span className="text-xs sm:text-sm font-medium text-white">Transparente Orientierung fuer NRW</span>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight">
            Spare bis zu{' '}
            <span className="text-secondary">847€ pro Jahr</span>
            <br className="hidden sm:block" />
            {' '}beim Strom
          </h1>

          <p className="font-paragraph text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto mb-5 sm:mb-6 md:mb-8 leading-relaxed">
            In 2 Minuten – Kostenlos &amp; ohne Anmeldung
          </p>

          {/* PLZ Quick-Start */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 max-w-md mx-auto mb-5 sm:mb-6">
            <p className="text-white/80 text-xs sm:text-sm font-medium mb-3 text-left">
              Deine Postleitzahl für den Sofortvergleich:
            </p>
            <div className="flex gap-2">
              <Input
                id="hero-plz"
                type="text"
                inputMode="numeric"
                pattern="[0-9]{5}"
                maxLength={5}
                placeholder="z.B. 40210"
                value={plz}
                onChange={(e) => { setPlz(e.target.value); if (plzError) setPlzError(''); }}
                onKeyDown={(e) => { if (e.key === 'Enter') handleCompare(); }}
                aria-label="Postleitzahl eingeben"
                aria-describedby={plzError ? 'hero-plz-error' : undefined}
                className="flex-1 h-11 sm:h-12 bg-white text-gray-900 placeholder-gray-400 border-0 focus:ring-2 focus:ring-secondary text-sm sm:text-base rounded-xl"
              />
              <Button
                onClick={handleCompare}
                className="h-11 sm:h-12 px-4 sm:px-5 bg-secondary hover:bg-secondary/90 text-black font-bold rounded-xl shadow-lg transition-all active:scale-95 text-sm sm:text-base whitespace-nowrap"
                aria-label="Jetzt vergleichen"
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

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4 justify-center">
            <Button
              onClick={() => { trackCTAClick('Jetzt kostenlos vergleichen – Hero CTA'); handleCompare(); }}
              size="lg"
              className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-black font-bold h-12 sm:h-13 md:h-14 text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all active:scale-95 px-8"
            >
              Jetzt kostenlos vergleichen
              <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
            </Button>
          </div>

          <p className="mt-4 text-white/60 text-xs">
            ✓ Kostenlos &nbsp;·&nbsp; ✓ Ohne Anmeldung &nbsp;·&nbsp; ✓ Datenschutz nach DSGVO
          </p>
        </div>
      </div>
    </section>
  );
}
