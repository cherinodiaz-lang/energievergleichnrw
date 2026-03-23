// HPI 1.6-G - PHASE 6: Core Web Vitals Optimized
import React, { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { Zap, Flame, CheckCircle, Sun, ChevronDown, Leaf, Building2, ShieldCheck, MousePointerClick, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import NativeSelect from '@/components/ui/native-select';
import Header from '@/components/Header';
import DeferredFooter from '@/components/DeferredFooter';
import TrustRow from '@/components/TrustRow';
import HomeValuableSectionsSSR from '@/components/pages/home/HomeValuableSectionsSSR';
import { trackCTAClick, trackMethodikClick } from '@/services/ga4-tracking';

// --- Utility Components ---
const LazyHomeDeferredSections = lazy(() => import('@/components/pages/home/HomeDeferredSections'));
const HOME_HERO_IMAGE_ID = '32e7c0_5f85b8d9458c4ccbafdde2a4f3bc3cce~mv2.png';
const HOME_HERO_ASPECT_RATIO = 1024 / 1920;
const HOME_HERO_WIDTHS = [640, 960, 1280, 1536, 1920] as const;
const getHomeHeroUrl = (width: number) => {
  const height = Math.round(width * HOME_HERO_ASPECT_RATIO);
  return `https://static.wixstatic.com/media/${HOME_HERO_IMAGE_ID}/v1/fill/w_${width},h_${height},al_c,q_82,enc_auto/${HOME_HERO_IMAGE_ID}`;
};
const HOME_HERO_SRCSET = HOME_HERO_WIDTHS.map((width) => `${getHomeHeroUrl(width)} ${width}w`).join(', ');

type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

// Respect prefers-reduced-motion
const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          element.classList.add('is-visible');
        }, prefersReducedMotion ? 0 : delay);
        observer.unobserve(element);
      }
    }, { threshold: 0.1 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay, prefersReducedMotion]);

  return <div ref={ref} className={`${className || ''} animate-reveal`}>{children}</div>;
};

// --- Main Component ---

export default function HomePage() {
  // Calculator states
  const [stromVerbrauch, setStromVerbrauch] = useState('');
  const [gasVerbrauch, setGasVerbrauch] = useState('');
  const [postleitzahl, setPostleitzahl] = useState('');
  const [personenAnzahl, setPersonenAnzahl] = useState('');

  // Tariff results states
  type TariffResult = {
    id: number;
    provider: string;
    logo: string;
    jahreskosten: number;
    arbeitspreis: number;
    grundpreis: number;
    vertragslaufzeit: string;
    preisgarantie: string;
  };
  const [stromResults, setStromResults] = useState<TariffResult[]>([]);
  const [gasResults, setGasResults] = useState<TariffResult[]>([]);
  const [kombiResults, setKombiResults] = useState<TariffResult[]>([]);
  const [showStromResults, setShowStromResults] = useState(false);
  const [showGasResults, setShowGasResults] = useState(false);
  const [showKombiResults, setShowKombiResults] = useState(false);

  const deferredSectionsRef = useRef<HTMLDivElement>(null);
  const [loadDeferredSections, setLoadDeferredSections] = useState(false);

  useEffect(() => {
    if (loadDeferredSections) return;
    if (typeof window === 'undefined') return;

    let timeoutId: ReturnType<typeof globalThis.setTimeout> | null = null;
    let idleId: number | null = null;

    const load = () => setLoadDeferredSections(true);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          load();
          observer.disconnect();
        }
      },
      { rootMargin: '1200px 0px' },
    );

    if (deferredSectionsRef.current) {
      observer.observe(deferredSectionsRef.current);
    }

    if ('requestIdleCallback' in window) {
      idleId = (window as Window & { requestIdleCallback: (callback: () => void, options?: { timeout: number }) => number }).requestIdleCallback(load, { timeout: 3500 });
    } else {
      timeoutId = globalThis.setTimeout(load, 3500);
    }

    return () => {
      observer.disconnect();
      if (idleId !== null && 'cancelIdleCallback' in window) {
        (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        globalThis.clearTimeout(timeoutId);
      }
    };
  }, [loadDeferredSections]);

  // Sample tariff data
  const sampleTariffs = {
    strom: [
      {
        id: 1,
        provider: 'GrünerStrom NRW',
        logo: '⚡',
        jahreskosten: 1245,
        arbeitspreis: 0.32,
        grundpreis: 12.50,
        vertragslaufzeit: '12 Monate',
        preisgarantie: '12 Monate',
      },
      {
        id: 2,
        provider: 'EnergiePlus Rheinland',
        logo: '🔋',
        jahreskosten: 1189,
        arbeitspreis: 0.30,
        grundpreis: 11.99,
        vertragslaufzeit: '24 Monate',
        preisgarantie: '24 Monate',
      },
      {
        id: 3,
        provider: 'NRW Energie AG',
        logo: '⚙️',
        jahreskosten: 1312,
        arbeitspreis: 0.35,
        grundpreis: 13.00,
        vertragslaufzeit: '12 Monate',
        preisgarantie: '6 Monate',
      },
    ],
    gas: [
      {
        id: 1,
        provider: 'WärmeWechsel NRW',
        logo: '🔥',
        jahreskosten: 1890,
        arbeitspreis: 0.085,
        grundpreis: 15.00,
        vertragslaufzeit: '12 Monate',
        preisgarantie: '12 Monate',
      },
      {
        id: 2,
        provider: 'KlimaGas Westfalen',
        logo: '♻️',
        jahreskosten: 1756,
        arbeitspreis: 0.078,
        grundpreis: 14.50,
        vertragslaufzeit: '24 Monate',
        preisgarantie: '24 Monate',
      },
      {
        id: 3,
        provider: 'Heizenergie Plus',
        logo: '🌡️',
        jahreskosten: 1945,
        arbeitspreis: 0.092,
        grundpreis: 15.50,
        vertragslaufzeit: '12 Monate',
        preisgarantie: '6 Monate',
      },
    ],
    kombi: [
      {
        id: 1,
        provider: 'AllEnergy NRW',
        logo: '⚡',
        jahreskosten: 3089,
        arbeitspreis: 0.32,
        grundpreis: 27.50,
        vertragslaufzeit: '12 Monate',
        preisgarantie: '12 Monate',
      },
      {
        id: 2,
        provider: 'DualPower Rheinland',
        logo: '🔋',
        jahreskosten: 2945,
        arbeitspreis: 0.30,
        grundpreis: 26.49,
        vertragslaufzeit: '24 Monate',
        preisgarantie: '24 Monate',
      },
      {
        id: 3,
        provider: 'Kombi Energie AG',
        logo: '⚙️',
        jahreskosten: 3257,
        arbeitspreis: 0.35,
        grundpreis: 28.50,
        vertragslaufzeit: '12 Monate',
        preisgarantie: '6 Monate',
      },
    ],
  };

  const handleCalculate = (type: string) => {
    if (type === 'Strom') {
      setStromResults(sampleTariffs.strom.sort((a, b) => a.jahreskosten - b.jahreskosten));
      setShowStromResults(true);
    } else if (type === 'Gas') {
      setGasResults(sampleTariffs.gas.sort((a, b) => a.jahreskosten - b.jahreskosten));
      setShowGasResults(true);
    } else if (type === 'Kombi') {
      setKombiResults(sampleTariffs.kombi.sort((a, b) => a.jahreskosten - b.jahreskosten));
      setShowKombiResults(true);
    }
  };

  const deferredSectionIds = new Set([
    'vorteile',
    'photovoltaik',
    'informationsmaterial',
    'faq',
    'kontakt',
  ]);

  const scrollToSection = (id: string) => {
    const scroll = () => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return true;
      }
      return false;
    };

    if (scroll()) {
      return;
    }

    if (!loadDeferredSections && deferredSectionIds.has(id)) {
      setLoadDeferredSections(true);
      let retries = 0;
      const maxRetries = 20;
      const retryScroll = () => {
        if (scroll() || retries >= maxRetries) {
          return;
        }
        retries += 1;
        window.setTimeout(retryScroll, 100);
      };
      retryScroll();
      return;
    }

    scroll();
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden selection:bg-primary selection:text-white">
      <style>{`
        /* PHASE 7: Reduced animation intensity from 0.8s to 0.3s for mobile */
        .animate-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.3s ease-out, transform 0.3s ease-out;
        }
        .animate-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-reveal {
            transition: none;
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <Header />
      <main id="main-content">
      {/* --- HERO SECTION --- */}
      <section className="hero-section relative w-full min-h-[100vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={getHomeHeroUrl(960)}
            srcSet={HOME_HERO_SRCSET}
            alt="Grüne Landschaft in Nordrhein-Westfalen mit Windrädern"
            className="w-full h-full object-cover"
            width={1920}
            height={1024}
            sizes="100vw"
            {...({ fetchpriority: 'high' } as React.ImgHTMLAttributes<HTMLImageElement>)}
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-3 sm:px-6 lg:px-12 py-16 sm:py-20 flex items-center justify-center min-h-[100vh] md:min-h-screen">
          <div className="max-w-4xl w-full">
            <AnimatedElement>
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-xs sm:text-sm font-bold mb-4 sm:mb-6 backdrop-blur-sm">
                <Leaf className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" aria-hidden="true" />
                <span className="hidden sm:inline font-heading">Die Nr. 1 für Energievergleiche in NRW</span>
                <span className="sm:hidden font-heading">Energievergleiche NRW</span>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={100}>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-tight mb-4 sm:mb-6 md:mb-8">
                Energie einordnen.<br />
                <span className="text-secondary">Zukunft planen.</span>
              </h1>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <p className="font-paragraph text-sm sm:text-lg lg:text-xl text-white/95 mb-6 sm:mb-8 md:mb-10 max-w-2xl leading-relaxed">
                Der einfache Weg zur Tarif-Orientierung für Strom und Gas in NRW. Unser Rechner zeigt unverbindliche Beispielwerte als erste Einordnung.
              </p>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <div className="flex flex-col sm:flex-row gap-3 pb-8 sm:pb-0">
                <Button
                  onClick={() => {
                    trackCTAClick('Jetzt orientieren');
                    scrollToSection('vergleichsrechner');
                  }}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 h-12 sm:h-14 px-6 sm:px-8 rounded-lg text-base sm:text-lg font-bold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                >
                  Jetzt orientieren
                </Button>
                <Button
                  onClick={() => {
                    trackCTAClick('Photovoltaik Beratung');
                    scrollToSection('photovoltaik');
                  }}
                  className="bg-white/20 border-2 border-white text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary h-12 sm:h-14 px-6 sm:px-8 rounded-lg text-base sm:text-lg font-semibold backdrop-blur-md transition-all w-full sm:w-auto"
                >
                  <Sun className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" aria-hidden="true" />
                  <span className="hidden sm:inline">Photovoltaik Beratung</span>
                  <span className="sm:hidden">Photovoltaik</span>
                </Button>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={400}>
              <Link to="/methodik" onClick={trackMethodikClick} className="inline-block text-white/80 hover:text-white transition-colors text-sm sm:text-base font-medium underline">
                So vergleichen wir (Methodik)
              </Link>
            </AnimatedElement>
          </div>
        </div>

        {/* Scroll Indicator - Hidden on Mobile */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 hidden sm:flex">
          <div className="flex flex-col items-center gap-2 text-white/80">
            <span className="text-xs uppercase tracking-widest font-medium">Scrollen</span>
            <ChevronDown className="w-6 h-6 animate-bounce" aria-hidden="true" />
          </div>
        </div>
      </section>
      {/* --- TRUST & STATS BAR --- */}
      <section className="relative z-20 -mt-16 sm:-mt-20 w-full mb-16 sm:mb-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedElement delay={400}>
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100 mb-6 sm:mb-8">
                <div className="flex items-center gap-3 sm:gap-4 justify-center md:justify-start p-3 sm:p-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading font-bold text-base sm:text-xl text-primary">100% Unabhängig</p>
                    <p className="text-xs sm:text-sm text-gray-500">Objektiver Vergleich</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 justify-center md:justify-start p-3 sm:p-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading font-bold text-base sm:text-xl text-primary">Regional in NRW</p>
                    <p className="text-xs sm:text-sm text-gray-500">Spezialisiert lokal</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 justify-center md:justify-start p-3 sm:p-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <MousePointerClick className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading font-bold text-base sm:text-xl text-primary">Einfache Orientierung</p>
                    <p className="text-xs sm:text-sm text-gray-500">In wenigen Minuten</p>
                  </div>
                </div>
              </div>
              <div className="border-t pt-6 sm:pt-8">
                <TrustRow />
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>
      {/* --- CALCULATOR SECTION --- */}
      <section id="vergleichsrechner" className="w-full py-16 sm:py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <AnimatedElement>
                <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary mb-4 sm:mb-6">
                  Ihr Weg zur <br/>
                  <span className="text-secondary">ehrlichen Tarif-Orientierung.</span>
                </h2>
                <p className="font-paragraph text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  Unser Rechner zeigt eine unverbindliche Vorschau mit Beispielwerten für Ihre Region.
                </p>

                <div className="space-y-4 hidden lg:block">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm mt-1 flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Daten eingeben</h4>
                      <p className="text-xs text-gray-500">PLZ und Verbrauch reichen aus.</p>
                    </div>
                  </div>
                  <div className="w-px h-6 bg-gray-200 ml-4" />
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-primary text-primary flex items-center justify-center font-bold text-sm mt-1 flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Beispielangebote einordnen</h4>
                      <p className="text-xs text-gray-500">Übersichtliche Liste mit Beispieltarifen.</p>
                    </div>
                  </div>
                  <div className="w-px h-6 bg-gray-200 ml-4" />
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-primary text-primary flex items-center justify-center font-bold text-sm mt-1 flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Anfrage senden</h4>
                      <p className="text-xs text-gray-500">Wir melden uns für die nächsten Schritte.</p>
                    </div>
                  </div>
                </div>
              </AnimatedElement>
            </div>

            <div className="lg:col-span-7">
              <AnimatedElement delay={200}>
                <Card className="border-none shadow-2xl overflow-hidden">
                  <div className="bg-primary p-4 sm:p-6 text-white">
                    <h3 className="font-heading text-xl sm:text-2xl font-bold">Tarifrechner NRW</h3>
                    <p className="text-white/80 text-xs sm:text-sm">Aktuelle Konditionen für {new Date().getFullYear()}</p>
                  </div>

                  <Tabs defaultValue="strom" className="w-full">
                    <div className="bg-gray-50 border-b px-4 sm:px-6 pt-3 sm:pt-4 overflow-x-auto">
                      <TabsList className="grid w-full grid-cols-3 bg-transparent h-auto p-0 gap-2 sm:gap-4">
                        <TabsTrigger
                          value="strom"
                          className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:border-t-4 data-[state=active]:border-primary rounded-none py-3 sm:py-4 transition-all text-xs sm:text-sm"
                        >
                          <div className="flex flex-col items-center gap-1">
                            <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Strom</span>
                          </div>
                        </TabsTrigger>
                        <TabsTrigger
                          value="gas"
                          className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:border-t-4 data-[state=active]:border-primary rounded-none py-3 sm:py-4 transition-all text-xs sm:text-sm"
                        >
                          <div className="flex flex-col items-center gap-1">
                            <Flame className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Gas</span>
                          </div>
                        </TabsTrigger>
                        <TabsTrigger
                          value="kombi"
                          className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:border-t-4 data-[state=active]:border-primary rounded-none py-3 sm:py-4 transition-all text-xs sm:text-sm"
                        >
                          <div className="flex flex-col items-center gap-1">
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Kombi</span>
                          </div>
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    <div className="p-4 sm:p-8 bg-white">
                      <TabsContent value="strom" className="mt-0 space-y-6 sm:space-y-8">
                        {!showStromResults ? (
                          <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                              <div className="space-y-2">
                                <Label htmlFor="strom-plz" className="text-sm font-medium">Postleitzahl</Label>
                                <Input
                                  id="strom-plz"
                                  placeholder="z.B. 40210"
                                  value={postleitzahl}
                                  onChange={(e) => setPostleitzahl(e.target.value)}
                                  className="h-10 sm:h-12 text-sm"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="strom-personen" className="text-sm font-medium">Haushaltsgröße</Label>
                                <NativeSelect
                                  id="strom-personen"
                                  value={personenAnzahl}
                                  onValueChange={setPersonenAnzahl}
                                  placeholder="Bitte wählen"
                                  className="h-10 sm:h-12 text-sm"
                                  options={[
                                    { value: '1', label: '1 Person (ca. 1.500 kWh)' },
                                    { value: '2', label: '2 Personen (ca. 2.500 kWh)' },
                                    { value: '3', label: '3 Personen (ca. 3.500 kWh)' },
                                    { value: '4', label: '4+ Personen (ca. 4.250 kWh)' },
                                  ]}
                                />
                              </div>
                              <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="strom-verbrauch" className="text-sm font-medium">Jahresverbrauch (kWh) <span className="text-gray-400 font-normal text-xs">(Optional)</span></Label>
                                <Input
                                  id="strom-verbrauch"
                                  type="number"
                                  placeholder="Genauen Verbrauch eingeben"
                                  value={stromVerbrauch}
                                  onChange={(e) => setStromVerbrauch(e.target.value)}
                                  className="h-10 sm:h-12 text-sm"
                                />
                              </div>
                            </div>
                            <Button
                              onClick={() => handleCalculate('Strom')}
                              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-11 sm:h-14 text-sm sm:text-lg font-bold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all"
                            >
                              Beispieltarife anzeigen
                            </Button>
                          </>
                        ) : (
                          <>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                              <p className="text-xs sm:text-sm text-blue-800 font-medium">ℹ️ Dies sind Beispielwerte. Eine echte API-Verbindung wird in Kürze implementiert.</p>
                            </div>
                            <div className="space-y-3 sm:space-y-4">
                              {stromResults.map((tariff) => (
                                <div key={tariff.id} className="border rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow">
                                  <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
                                    <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                                      <div className="text-2xl sm:text-4xl flex-shrink-0">{tariff.logo}</div>
                                      <div className="min-w-0">
                                        <h4 className="font-bold text-sm sm:text-lg text-gray-900 truncate">{tariff.provider}</h4>
                                        <p className="text-xs sm:text-sm text-gray-500">Stromversorger</p>
                                      </div>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                      <p className="text-xl sm:text-3xl font-bold text-primary">{tariff.jahreskosten.toFixed(2)}€</p>
                                      <p className="text-xs text-gray-500">pro Jahr</p>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6 py-3 sm:py-4 border-y border-gray-200">
                                    <div>
                                      <p className="text-xs text-gray-500 uppercase font-bold">Arbeitspreis</p>
                                      <p className="text-sm sm:text-lg font-bold text-gray-900">{tariff.arbeitspreis.toFixed(2)}€/kWh</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-gray-500 uppercase font-bold">Grundpreis</p>
                                      <p className="text-sm sm:text-lg font-bold text-gray-900">{tariff.grundpreis.toFixed(2)}€/M</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-gray-500 uppercase font-bold">Laufzeit</p>
                                      <p className="text-sm sm:text-lg font-bold text-gray-900">{tariff.vertragslaufzeit}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-gray-500 uppercase font-bold">Garantie</p>
                                      <p className="text-sm sm:text-lg font-bold text-gray-900">{tariff.preisgarantie}</p>
                                    </div>
                                  </div>
                                  <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-10 sm:h-12 font-bold rounded-lg text-sm sm:text-base">
                                    Option vormerken
                                  </Button>
                                </div>
                              ))}
                            </div>
                            <Button
                              onClick={() => setShowStromResults(false)}
                              variant="outline"
                              className="w-full mt-4 sm:mt-6"
                            >
                              Neue Berechnung
                            </Button>
                          </>
                        )}
                      </TabsContent>

                      <TabsContent value="gas" className="mt-0 space-y-6 sm:space-y-8">
                        {!showGasResults ? (
                          <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                              <div className="space-y-2">
                                <Label htmlFor="gas-plz" className="text-sm font-medium">Postleitzahl</Label>
                                <Input
                                  id="gas-plz"
                                  placeholder="z.B. 40210"
                                  value={postleitzahl}
                                  onChange={(e) => setPostleitzahl(e.target.value)}
                                  className="h-10 sm:h-12 text-sm"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="gas-wohnflaeche" className="text-sm font-medium">Wohnfläche (m²)</Label>
                                <NativeSelect
                                  id="gas-wohnflaeche"
                                  value={personenAnzahl}
                                  onValueChange={setPersonenAnzahl}
                                  placeholder="Bitte wählen"
                                  className="h-10 sm:h-12 text-sm"
                                  options={[
                                    { value: '30', label: '30 m²' },
                                    { value: '50', label: '50 m²' },
                                    { value: '100', label: '100 m²' },
                                    { value: '150', label: '150 m²' },
                                  ]}
                                />
                              </div>
                              <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="gas-verbrauch" className="text-sm font-medium">Jahresverbrauch (kWh) <span className="text-gray-400 font-normal text-xs">(Optional)</span></Label>
                                <Input
                                  id="gas-verbrauch"
                                  type="number"
                                  placeholder="Genauen Verbrauch eingeben"
                                  value={gasVerbrauch}
                                  onChange={(e) => setGasVerbrauch(e.target.value)}
                                  className="h-10 sm:h-12 text-sm"
                                />
                              </div>
                            </div>
                            <Button
                              onClick={() => handleCalculate('Gas')}
                              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-11 sm:h-14 text-sm sm:text-lg font-bold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all"
                            >
                              Beispieltarife anzeigen
                            </Button>
                          </>
                        ) : (
                          <>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                              <p className="text-xs sm:text-sm text-blue-800 font-medium">ℹ️ Dies sind Beispielwerte. Eine echte API-Verbindung wird in Kürze implementiert.</p>
                            </div>
                            <div className="space-y-3 sm:space-y-4">
                              {gasResults.map((tariff) => (
                                <div key={tariff.id} className="border rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow">
                                  <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
                                    <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                                      <div className="text-2xl sm:text-4xl flex-shrink-0">{tariff.logo}</div>
                                      <div className="min-w-0">
                                        <h4 className="font-bold text-sm sm:text-lg text-gray-900 truncate">{tariff.provider}</h4>
                                        <p className="text-xs sm:text-sm text-gray-500">Gasversorger</p>
                                      </div>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                      <p className="text-xl sm:text-3xl font-bold text-primary">{tariff.jahreskosten.toFixed(2)}€</p>
                                      <p className="text-xs text-gray-500">pro Jahr</p>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6 py-3 sm:py-4 border-y border-gray-200">
                                    <div>
                                      <p className="text-xs text-gray-500 uppercase font-bold">Arbeitspreis</p>
                                      <p className="text-sm sm:text-lg font-bold text-gray-900">{tariff.arbeitspreis.toFixed(3)}€/kWh</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-gray-500 uppercase font-bold">Grundpreis</p>
                                      <p className="text-sm sm:text-lg font-bold text-gray-900">{tariff.grundpreis.toFixed(2)}€/M</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-gray-500 uppercase font-bold">Laufzeit</p>
                                      <p className="text-sm sm:text-lg font-bold text-gray-900">{tariff.vertragslaufzeit}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-gray-500 uppercase font-bold">Garantie</p>
                                      <p className="text-sm sm:text-lg font-bold text-gray-900">{tariff.preisgarantie}</p>
                                    </div>
                                  </div>
                                  <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-10 sm:h-12 font-bold rounded-lg text-sm sm:text-base">
                                    Option vormerken
                                  </Button>
                                </div>
                              ))}
                            </div>
                            <Button
                              onClick={() => setShowGasResults(false)}
                              variant="outline"
                              className="w-full mt-4 sm:mt-6"
                            >
                              Neue Berechnung
                            </Button>
                          </>
                        )}
                      </TabsContent>

                      <TabsContent value="kombi" className="mt-0 space-y-6 sm:space-y-8">
                        {!showKombiResults ? (
                          <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                              <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="kombi-plz" className="text-sm font-medium">Postleitzahl</Label>
                                <Input
                                  id="kombi-plz"
                                  placeholder="z.B. 40210"
                                  value={postleitzahl}
                                  onChange={(e) => setPostleitzahl(e.target.value)}
                                  className="h-10 sm:h-12 text-sm"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="kombi-strom" className="text-sm font-medium">Stromverbrauch (kWh)</Label>
                                <Input
                                  id="kombi-strom"
                                  type="number"
                                  placeholder="z.B. 3500"
                                  value={stromVerbrauch}
                                  onChange={(e) => setStromVerbrauch(e.target.value)}
                                  className="h-10 sm:h-12 text-sm"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="kombi-gas" className="text-sm font-medium">Gasverbrauch (kWh)</Label>
                                <Input
                                  id="kombi-gas"
                                  type="number"
                                  placeholder="z.B. 20000"
                                  value={gasVerbrauch}
                                  onChange={(e) => setGasVerbrauch(e.target.value)}
                                  className="h-10 sm:h-12 text-sm"
                                />
                              </div>
                            </div>
                            <Button
                              onClick={() => handleCalculate('Kombi')}
                              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-11 sm:h-14 text-sm sm:text-lg font-bold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all"
                            >
                              Beispieltarife anzeigen
                            </Button>
                          </>
                        ) : (
                          <>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                              <p className="text-xs sm:text-sm text-blue-800 font-medium">ℹ️ Dies sind Beispielwerte. Eine echte API-Verbindung wird in Kürze implementiert.</p>
                            </div>
                            <div className="space-y-3 sm:space-y-4">
                              {kombiResults.map((tariff) => (
                                <div key={tariff.id} className="border rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow">
                                  <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
                                    <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                                      <div className="text-2xl sm:text-4xl flex-shrink-0">{tariff.logo}</div>
                                      <div className="min-w-0">
                                        <h4 className="font-bold text-sm sm:text-lg text-gray-900 truncate">{tariff.provider}</h4>
                                        <p className="text-xs sm:text-sm text-gray-500">Kombi-Angebot</p>
                                      </div>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                      <p className="text-xl sm:text-3xl font-bold text-primary">{tariff.jahreskosten.toFixed(2)}€</p>
                                      <p className="text-xs text-gray-500">pro Jahr</p>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6 py-3 sm:py-4 border-y border-gray-200">
                                    <div>
                                      <p className="text-xs text-gray-500 uppercase font-bold">Arbeitspreis</p>
                                      <p className="text-sm sm:text-lg font-bold text-gray-900">{tariff.arbeitspreis.toFixed(2)}€/kWh</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-gray-500 uppercase font-bold">Grundpreis</p>
                                      <p className="text-sm sm:text-lg font-bold text-gray-900">{tariff.grundpreis.toFixed(2)}€/M</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-gray-500 uppercase font-bold">Laufzeit</p>
                                      <p className="text-sm sm:text-lg font-bold text-gray-900">{tariff.vertragslaufzeit}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-gray-500 uppercase font-bold">Garantie</p>
                                      <p className="text-sm sm:text-lg font-bold text-gray-900">{tariff.preisgarantie}</p>
                                    </div>
                                  </div>
                                  <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-10 sm:h-12 font-bold rounded-lg text-sm sm:text-base">
                                    Option vormerken
                                  </Button>
                                </div>
                              ))}
                            </div>
                            <Button
                              onClick={() => setShowKombiResults(false)}
                              variant="outline"
                              className="w-full mt-4 sm:mt-6"
                            >
                              Neue Berechnung
                            </Button>
                          </>
                        )}
                      </TabsContent>
                    </div>
                  </Tabs>
                </Card>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>
      {/* --- CUSTOMER REVIEWS SECTION --- */}
      <section className="w-full py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <AnimatedElement>
              <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary mb-3 sm:mb-4">
                Rückmeldungen aus Beratungen
              </h2>
              <p className="font-paragraph text-base sm:text-lg text-gray-600">
                Beispielhafte Stimmen zur Orientierung
              </p>
            </AnimatedElement>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Review 1 */}
            <AnimatedElement delay={100}>
              <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <div className="flex items-center gap-1 mb-4 sm:mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="font-paragraph text-sm sm:text-base text-gray-700 mb-6 sm:mb-8 leading-relaxed">
                  "Dank EnergievergleichNRW konnten wir unsere Optionen deutlich besser einordnen. Die Beratung war hilfreich und transparent. Absolut empfehlenswert!"
                </p>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary text-sm sm:text-base">AM</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading font-semibold text-sm sm:text-base text-gray-900">Anna Müller</p>
                    <p className="text-xs sm:text-sm text-gray-500">Stromkunde</p>
                  </div>
                </div>
              </div>
            </AnimatedElement>

            {/* Review 2 */}
            <AnimatedElement delay={200}>
              <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <div className="flex items-center gap-1 mb-4 sm:mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="font-paragraph text-sm sm:text-base text-gray-700 mb-6 sm:mb-8 leading-relaxed">
                  "Die Gas-Tariforientierung war super einfach und hat uns eine klare erste Einordnung gegeben. Wir sind sehr zufrieden mit der transparenten Beratung."
                </p>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary text-sm sm:text-base">MS</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading font-semibold text-sm sm:text-base text-gray-900">Max Schmidt</p>
                    <p className="text-xs sm:text-sm text-gray-500">Gaskunde</p>
                  </div>
                </div>
              </div>
            </AnimatedElement>

            {/* Review 3 */}
            <AnimatedElement delay={300}>
              <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <div className="flex items-center gap-1 mb-4 sm:mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="font-paragraph text-sm sm:text-base text-gray-700 mb-6 sm:mb-8 leading-relaxed">
                  "Die Photovoltaik-Beratung war top! Wir haben jetzt unsere eigene Solaranlage und sind begeistert von der Unabhängigkeit und den Einsparungen."
                </p>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary text-sm sm:text-base">LM</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading font-semibold text-sm sm:text-base text-gray-900">Lisa Meier</p>
                    <p className="text-xs sm:text-sm text-gray-500">Photovoltaik-Kunde</p>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>
      <div ref={deferredSectionsRef} className="h-px w-full" aria-hidden="true" />
      {loadDeferredSections ? (
        <Suspense fallback={<HomeValuableSectionsSSR />}>
          <LazyHomeDeferredSections />
        </Suspense>
      ) : (
        <HomeValuableSectionsSSR />
      )}
      </main>
      <DeferredFooter />
    </div>
  );
}
