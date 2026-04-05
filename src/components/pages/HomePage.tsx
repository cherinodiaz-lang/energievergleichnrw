// HPI 1.8 - PHASE 8: White Screen Fix - framer-motion removed
import React, { useState, useEffect, useRef, type SyntheticEvent } from 'react';
import SocialProofBar from '@/components/cro/SocialProofBar';
import StickyCTA from '@/components/cro/StickyCTA';
import TrustBadgesEnhanced from '@/components/cro/TrustBadgesEnhanced';
import HeroSectionV2 from '@/components/home/HeroSectionV2';
import { useFeatureFlags } from '@/lib/feature-flags';
import { Zap, Flame, CheckCircle, Sun, Download, ChevronDown, Send, ArrowRight, Leaf, Home, Building2, ShieldCheck, MousePointerClick, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import FormSubmissionDialog from '@/components/FormSubmissionDialog';
import TrustRow from '@/components/TrustRow';
import VerivoxCalculatorEmbed from '@/components/VerivoxCalculatorEmbed';
import HowToSchema from '@/components/HowToSchema';
import ReviewSchema from '@/components/ReviewSchema';
import FAQPageSchema from '@/components/FAQPageSchema';
import { BaseCrudService } from '@/integrations';
import { HufiggestellteFragen, Wechselvorteile, Informationsmaterial } from '@/entities';
import { Image } from '@/components/ui/image';
import { trackCTAClick, trackMethodikClick } from '@/services/form-submission';
import { ROUTES } from '@/lib/routes';
import { getPageSEO } from '@/lib/seo-config';

// --- Utility Components ---

type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

// Optimized AnimatedElement: Reduced motion, no layout shifts
const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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

    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      element.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (prefersReducedMotion) {
          setIsVisible(true);
        } else {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
        observer.unobserve(element);
      }
    }, { threshold: 0.1 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay, prefersReducedMotion]);

  return (
    <div
      ref={ref}
      className={`${className || ''} ${isVisible ? 'animate-reveal-visible' : 'animate-reveal'}`}
    >
      {children}
    </div>
  );
};

// --- Main Component ---

export default function HomePage() {
  // --- Data Fidelity Protocol: Canonical Data Sources ---
  const [faqs, setFaqs] = useState<HufiggestellteFragen[]>([]);
  const [vorteile, setVorteile] = useState<Wechselvorteile[]>([]);
  const [materials, setMaterials] = useState<Informationsmaterial[]>([]);
  const [loading, setLoading] = useState(true);

  // Feature flags
  const flags = useFeatureFlags();

  // Calculator states (Gas/Kombi now use VerivoxCalculatorEmbed — no local form state needed)

  // Hero PLZ quick-start
  const [heroPlz, setHeroPlz] = useState('');
  const [heroPlzError, setHeroPlzError] = useState('');

  // Contact form states
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactType, setContactType] = useState('privat');

  // Photovoltaik form states
  const [pvEigentumsart, setPvEigentumsart] = useState('');
  const [pvDachform, setPvDachform] = useState('');
  const [pvPersonen, setPvPersonen] = useState('');
  const [pvStrasse, setPvStrasse] = useState('');
  const [pvHausnummer, setPvHausnummer] = useState('');
  const [pvPlz, setPvPlz] = useState('');
  const [pvOrt, setPvOrt] = useState('');
  const [, setPvFoto] = useState<File | null>(null);
  const [pvName, setPvName] = useState('');
  const [pvEmail, setPvEmail] = useState('');
  const [pvTelefon, setPvTelefon] = useState('');


  // --- Load Data from CMS ---
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [faqData, vorteileData, materialsData] = await Promise.all([
        BaseCrudService.getAll<HufiggestellteFragen>('faq').catch(() => ({ items: [] })),
        BaseCrudService.getAll<Wechselvorteile>('wechselvorteile').catch(() => ({ items: [] })),
        BaseCrudService.getAll<Informationsmaterial>('informationsmaterial').catch(() => ({ items: [] })),
      ]);

      const sortedFaqs = (faqData?.items || []).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
      const sortedVorteile = (vorteileData?.items || [])
        .filter(v => v.isActive)
        .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

      setFaqs(sortedFaqs);
      setVorteile(sortedVorteile);
      setMaterials(materialsData?.items || []);
    } catch (error) {
      console.error('Error loading data:', error);
      setFaqs([]);
      setVorteile([]);
      setMaterials([]);
    } finally {
      setLoading(false);
    }
  };

  // --- FAQ Schema (JSON-LD) ---
  useEffect(() => {
    if (faqs.length === 0) return;

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };

    const scriptElement = document.getElementById('faq-schema') as HTMLScriptElement | null;
    if (!scriptElement) {
      const newScript = document.createElement('script') as HTMLScriptElement;
      newScript.id = 'faq-schema';
      newScript.type = 'application/ld+json';
      newScript.textContent = JSON.stringify(faqSchema);
      document.head.appendChild(newScript);
    } else {
      scriptElement.textContent = JSON.stringify(faqSchema);
    }
  }, [faqs]);


  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showPvDialog, setShowPvDialog] = useState(false);

  const handleContactSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowContactDialog(true);
  };

  const handleContactSuccess = () => {
    setContactName('');
    setContactEmail('');
    setContactPhone('');
    setContactMessage('');
  };

  const handlePvSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowPvDialog(true);
  };

  const handlePvSuccess = () => {
    setPvEigentumsart('');
    setPvDachform('');
    setPvPersonen('');
    setPvStrasse('');
    setPvHausnummer('');
    setPvPlz('');
    setPvOrt('');
    setPvFoto(null);
    setPvName('');
    setPvEmail('');
    setPvTelefon('');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleHeroCompare = () => {
    const trimmed = heroPlz.trim();
    if (trimmed && !/^\d{5}$/.test(trimmed)) {
      setHeroPlzError('Bitte eine gültige 5-stellige PLZ eingeben.');
      return;
    }
    setHeroPlzError('');
    if (trimmed) trackCTAClick('Jetzt kostenlos vergleichen – Hero PLZ');
    scrollToSection('vergleichsrechner');
  };

  const seo = getPageSEO('home');

  return (
    <div className="min-h-screen bg-background overflow-x-hidden selection:bg-primary selection:text-white">
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        ogTitle={seo.ogTitle}
        ogDescription={seo.ogDescription}
      />
      <HowToSchema />
      <ReviewSchema />
      <FAQPageSchema />
      <Header />
      {flags.showSocialProofBar && (
        <SocialProofBar
          showCountdown={flags.showCountdown}
          showUserCounter={flags.showUserCounter}
        />
      )}
      <main>
      {/* --- HERO SECTION (A/B tested via feature flag) --- */}
      {flags.heroVariant === 'B' ? (
        <HeroSectionV2 onCompare={(plz) => { if (plz) trackCTAClick('Hero PLZ Compare'); scrollToSection('vergleichsrechner'); }} />
      ) : (
      <section className="hero-section relative w-full min-h-screen md:min-h-screen flex items-center justify-center overflow-hidden bg-primary">
        {/* Static Background (no framer-motion parallax) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="https://static.wixstatic.com/media/32e7c0_5f85b8d9458c4ccbafdde2a4f3bc3cce~mv2.png?originWidth=1920&originHeight=1024"
            alt="Grüne Landschaft in Nordrhein-Westfalen mit Windrädern"
            className="w-full h-full object-cover"
            width={1920}
            height={1024}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 md:py-20 flex items-center justify-center min-h-screen">
          <div className="max-w-3xl w-full">
            <AnimatedElement>
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-secondary text-black text-xs sm:text-sm font-bold mb-4 sm:mb-5 md:mb-6 backdrop-blur-sm">
                <Leaf className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" aria-hidden="true" />
                <span className="hidden sm:inline font-heading">Die Nr. 1 für Energievergleiche in NRW</span>
                <span className="sm:hidden font-heading">Energievergleiche NRW</span>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={100}>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-3 sm:mb-4 md:mb-6">
                Spare bis zu{' '}
                <span className="text-secondary">847€ pro Jahr</span>
                <br className="hidden sm:block" />
                {' '}beim Strom
              </h1>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <p className="font-paragraph text-base sm:text-lg md:text-xl text-white/95 mb-5 sm:mb-6 md:mb-7 max-w-2xl leading-relaxed">
                In 2 Minuten – Kostenlos &amp; ohne Anmeldung
              </p>
            </AnimatedElement>

            {/* PLZ Quick-Start */}
            <AnimatedElement delay={250}>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 max-w-md mb-5 sm:mb-6">
                <p className="text-white/80 text-xs sm:text-sm font-medium mb-3">
                  Gib deine Postleitzahl ein für den Sofortvergleich:
                </p>
                <div className="flex gap-2">
                  <Input
                    id="hero-plz-inline"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{5}"
                    maxLength={5}
                    placeholder="z.B. 40210"
                    value={heroPlz}
                    onChange={(e) => { setHeroPlz(e.target.value); if (heroPlzError) setHeroPlzError(''); }}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleHeroCompare(); }}
                    aria-label="Postleitzahl eingeben"
                    aria-describedby={heroPlzError ? 'hero-plz-inline-error' : undefined}
                    className="flex-1 h-11 sm:h-12 bg-white text-gray-900 placeholder-gray-400 border-0 focus:ring-2 focus:ring-secondary text-sm sm:text-base rounded-xl"
                  />
                  <Button
                    onClick={handleHeroCompare}
                    className="h-11 sm:h-12 px-4 sm:px-5 bg-secondary hover:bg-secondary/90 text-black font-bold rounded-xl shadow-lg transition-all active:scale-95 text-sm sm:text-base whitespace-nowrap"
                    aria-label="Jetzt vergleichen"
                  >
                    <span className="hidden sm:inline">Vergleichen</span>
                    <ArrowRight className="sm:hidden w-5 h-5" aria-hidden="true" />
                    <ArrowRight className="hidden sm:inline ml-1.5 w-4 h-4" aria-hidden="true" />
                  </Button>
                </div>
                {heroPlzError && (
                  <p id="hero-plz-inline-error" role="alert" className="mt-2 text-xs text-red-300">
                    {heroPlzError}
                  </p>
                )}
              </div>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pb-4 sm:pb-0">
                <Button
                  onClick={() => { trackCTAClick('Jetzt kostenlos vergleichen'); handleHeroCompare(); }}
                  className="bg-secondary text-secondary-foreground hover:bg-[#D49700] focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary h-12 sm:h-13 md:h-14 px-6 sm:px-8 rounded-lg text-base sm:text-lg font-bold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto active:scale-95"
                >
                  Jetzt kostenlos vergleichen
                  <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
                </Button>
                <Button
                  onClick={() => { trackCTAClick('Photovoltaik Beratung'); scrollToSection('photovoltaik'); }}
                  className="bg-white/20 border-2 border-white text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary h-12 sm:h-13 md:h-14 px-6 sm:px-8 rounded-lg text-base sm:text-lg font-semibold backdrop-blur-md transition-all w-full sm:w-auto active:scale-95"
                >
                  <Sun className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" aria-hidden="true" />
                  <span className="hidden sm:inline">Photovoltaik Beratung</span>
                  <span className="sm:hidden">Photovoltaik</span>
                </Button>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={400}>
              <p className="mt-3 text-white/60 text-xs">
                ✓ Kostenlos &nbsp;·&nbsp; ✓ Ohne Anmeldung &nbsp;·&nbsp; ✓ Datenschutz nach DSGVO
              </p>
            </AnimatedElement>

            <AnimatedElement delay={450}>
              <Link to="/methodik" onClick={trackMethodikClick} className="inline-block text-white/80 hover:text-white transition-colors text-sm sm:text-base font-medium underline mt-2">
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
      )}

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
                    <p className="font-heading font-bold text-base sm:text-xl text-primary">Einfacher Wechsel</p>
                    <p className="text-xs sm:text-sm text-gray-500">Wenige Minuten</p>
                  </div>
                </div>
              </div>
              <div className="border-t pt-6 sm:pt-8">
                {flags.showTrustBadgesEnhanced ? (
                  <TrustBadgesEnhanced showUserCounter={flags.showUserCounter} />
                ) : (
                  <TrustRow />
                )}
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
                  Ihr Weg zum <br/>
                  <span className="text-secondary">passenden Angebot.</span>
                </h2>
                <p className="font-paragraph text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  Im Strom-, Gas- und Kombi-Tab greifen Sie direkt auf Live-Tarife von Verivox zu.
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
                      <h4 className="font-bold text-gray-900 text-sm">Angebote vergleichen</h4>
                      <p className="text-xs text-gray-500">Strom, Gas und Kombi live via Verivox.</p>
                    </div>
                  </div>
                  <div className="w-px h-6 bg-gray-200 ml-4" />
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-primary text-primary flex items-center justify-center font-bold text-sm mt-1 flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Naechste Schritte klaeren</h4>
                      <p className="text-xs text-gray-500">Auf Wunsch begleiten wir die Anfrage und den weiteren Ablauf.</p>
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
                    <p className="text-white/80 text-xs sm:text-sm">Strom, Gas und Kombi live via Verivox</p>
                  </div>

                  <Tabs defaultValue="strom" className="w-full">
                    <div className="bg-gray-50 border-b px-3 sm:px-6 pt-2 sm:pt-4 overflow-x-auto">
                      <TabsList className="grid w-full grid-cols-3 bg-transparent h-auto p-0 gap-1 sm:gap-4">
                        <TabsTrigger value="strom" className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:border-t-4 data-[state=active]:border-primary rounded-none py-2 sm:py-4 px-2 sm:px-4 transition-all text-xs sm:text-sm font-medium">
                          <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                            <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-xs sm:text-sm">Strom</span>
                          </div>
                        </TabsTrigger>
                        <TabsTrigger value="gas" className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:border-t-4 data-[state=active]:border-primary rounded-none py-2 sm:py-4 px-2 sm:px-4 transition-all text-xs sm:text-sm font-medium">
                          <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                            <Flame className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-xs sm:text-sm">Gas</span>
                          </div>
                        </TabsTrigger>
                        <TabsTrigger value="kombi" className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:border-t-4 data-[state=active]:border-primary rounded-none py-2 sm:py-4 px-2 sm:px-4 transition-all text-xs sm:text-sm font-medium">
                          <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-xs sm:text-sm">Kombi</span>
                          </div>
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    <div className="p-3 sm:p-6 md:p-8 bg-white">
                      {/* STROM TAB */}
                      <TabsContent value="strom" className="mt-0 space-y-4 sm:space-y-6">
                        <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-3 sm:p-4">
                          <p className="text-xs sm:text-sm font-medium text-emerald-900">
                            Im Strom-Tab nutzen Sie direkt dieselbe Live-Tarifquelle wie auf unserer Stromvergleich-NRW-Seite.
                          </p>
                        </div>
                        <VerivoxCalculatorEmbed
                          badge="Live-Stromvergleich"
                          title="Live-Stromtarife für NRW"
                          description="Geben Sie Ihre Postleitzahl und Ihren Jahresverbrauch direkt im Verivox-Rechner ein. So sehen Sie aktuelle Tarife ohne vorgeschaltete Beispielwerte."
                          target="Energie_Strom_Privat_Rechner"
                          wmid="104"
                          campaignId="stromvergleich_nrw"
                          trackingProductId="93"
                        />
                        <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-sm leading-6 text-slate-600">
                            Falls Sie mehr Kontext, Methodik und begleitende Hinweise benötigen, öffnen Sie die vollständige Stromseite.
                          </p>
                          <Link
                            to={ROUTES.stromvergleich}
                            onClick={() => trackCTAClick('Homepage Strom Vollansicht')}
                            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                          >
                            Stromvergleich NRW öffnen
                          </Link>
                        </div>
                      </TabsContent>

                      {/* GAS TAB */}
                      <TabsContent value="gas" className="mt-0">
                        <VerivoxCalculatorEmbed
                          badge="Live-Gasvergleich"
                          title="Live-Gastarife für NRW"
                          description="Geben Sie Ihre Postleitzahl und Ihren Jahresverbrauch ein. Der Rechner zeigt aktuelle Gastarife, Preisgarantien, Boni und Laufzeiten direkt von Verivox."
                          target="Energie_Gas_Privat_Rechner"
                          wmid="102"
                          campaignId="gasvergleich_nrw"
                          trackingProductId="99"
                        />
                        <div className="mt-4 text-center">
                          <Link
                            to={ROUTES.gasvergleich}
                            onClick={() => trackCTAClick('Homepage Gas Vollansicht')}
                            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                          >
                            Gasvergleich NRW öffnen
                          </Link>
                        </div>
                      </TabsContent>

                      {/* KOMBI TAB — Gas via Verivox + link to Stromvergleich */}
                      <TabsContent value="kombi" className="mt-0 space-y-6">
                        <VerivoxCalculatorEmbed
                          badge="Live-Gasvergleich (Kombi)"
                          title="Gastarife für Ihren Kombi-Wechsel"
                          description="Vergleichen Sie zuerst Ihre Gastarife live. Für Strom wechseln Sie bitte zum Strom-Tab — dort finden Sie denselben Live-Rechner mit aktuellen Stromtarifen."
                          target="Energie_Gas_Privat_Rechner"
                          wmid="102"
                          campaignId="gasvergleich_nrw_kombi"
                          trackingProductId="99"
                        />
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Link
                            to={ROUTES.stromvergleich}
                            onClick={() => trackCTAClick('Homepage Kombi → Strom')}
                            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                          >
                            Auch Strom vergleichen
                          </Link>
                          <Link
                            to={ROUTES.gasvergleich}
                            onClick={() => trackCTAClick('Homepage Kombi → Gas Vollansicht')}
                            className="inline-flex items-center justify-center rounded-lg border border-primary px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
                          >
                            Gasvergleich NRW öffnen
                          </Link>
                        </div>
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
              <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary mb-3 sm:mb-4">Das sagen unsere Kunden</h2>
              <p className="font-paragraph text-base sm:text-lg text-gray-600">Echte Erfahrungen von zufriedenen Kundinnen und Kunden</p>
            </AnimatedElement>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <AnimatedElement delay={100}>
              <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <div className="flex items-center gap-1 mb-4 sm:mb-6">{[...Array(5)].map((_, i) => (<Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 fill-secondary text-secondary" />))}</div>
                <p className="font-paragraph text-sm sm:text-base text-gray-700 mb-6 sm:mb-8 leading-relaxed">"Dank EnergievergleichNRW konnten wir unsere Stromkosten erheblich senken. Der Service war hervorragend und die Beratung sehr kompetent. Absolut empfehlenswert!"</p>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"><span className="font-bold text-primary text-sm sm:text-base">AM</span></div>
                  <div><p className="font-heading font-semibold text-sm sm:text-base text-gray-900">Anna Müller</p><p className="text-xs sm:text-sm text-gray-500">Stromkunde</p></div>
                </div>
              </div>
            </AnimatedElement>
            <AnimatedElement delay={200}>
              <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <div className="flex items-center gap-1 mb-4 sm:mb-6">{[...Array(5)].map((_, i) => (<Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 fill-secondary text-secondary" />))}</div>
                <p className="font-paragraph text-sm sm:text-base text-gray-700 mb-6 sm:mb-8 leading-relaxed">"Der Gasvergleich war super einfach und hat uns viel Geld gespart. Wir sind sehr zufrieden mit dem neuen Anbieter und dem reibungslosen Wechsel."</p>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"><span className="font-bold text-primary text-sm sm:text-base">MS</span></div>
                  <div><p className="font-heading font-semibold text-sm sm:text-base text-gray-900">Max Schmidt</p><p className="text-xs sm:text-sm text-gray-500">Gaskunde</p></div>
                </div>
              </div>
            </AnimatedElement>
            <AnimatedElement delay={300}>
              <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <div className="flex items-center gap-1 mb-4 sm:mb-6">{[...Array(5)].map((_, i) => (<Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 fill-secondary text-secondary" />))}</div>
                <p className="font-paragraph text-sm sm:text-base text-gray-700 mb-6 sm:mb-8 leading-relaxed">"Die Photovoltaik-Beratung war top! Wir haben jetzt unsere eigene Solaranlage und sind begeistert von der Unabhängigkeit und den Einsparungen."</p>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"><span className="font-bold text-primary text-sm sm:text-base">LM</span></div>
                  <div><p className="font-heading font-semibold text-sm sm:text-base text-gray-900">Lisa Meier</p><p className="text-xs sm:text-sm text-gray-500">Photovoltaik-Kunde</p></div>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* --- VORTEILE SECTION --- */}
      <section id="vorteile" className="w-full py-24 sm:py-32 bg-primary text-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <div className="text-center mb-16 sm:mb-20">
            <AnimatedElement>
              <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-4 sm:mb-6">Warum wechseln?</h2>
              <p className="font-paragraph text-base sm:text-xl text-white/80 max-w-2xl mx-auto">Der Energiemarkt in NRW bietet viele Möglichkeiten. Wir helfen Ihnen, die besten für sich zu nutzen.</p>
            </AnimatedElement>
          </div>
          {loading ? (
            <div className="text-center text-white/60">Lade Vorteile...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {vorteile.map((vorteil, index) => (
                <AnimatedElement key={vorteil._id} delay={index * 100}>
                  <div className="group bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 h-full">
                    <div className="mb-4 sm:mb-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {vorteil.icon ? (
                        <Image src={vorteil.icon} alt={vorteil.title || 'Icon'} width={32} height={32} className="w-7 h-7 sm:w-8 sm:h-8 object-contain brightness-0 invert" loading="lazy" />
                      ) : (
                        <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-secondary" />
                      )}
                    </div>
                    <h3 className="font-heading text-lg sm:text-2xl font-bold mb-3 sm:mb-4 text-secondary">{vorteil.title}</h3>
                    <p className="font-paragraph text-sm sm:text-base text-white/80 leading-relaxed">{vorteil.description}</p>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --- PHOTOVOLTAIK SECTION --- */}
      <section id="photovoltaik" className="w-full bg-white pt-16 sm:pt-24 pb-24 sm:pb-32">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="relative h-full">
              <div className="lg:sticky lg:top-32">
                <AnimatedElement>
                  <div className="inline-block px-3 sm:px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-bold text-xs sm:text-sm mb-4 sm:mb-6">Zukunftstechnologie</div>
                  <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary mb-6 sm:mb-8 leading-tight">
                    Ihre eigene <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-orange-500">Energiequelle.</span>
                  </h2>
                  <p className="font-paragraph text-base sm:text-xl text-gray-600 mb-8 sm:mb-10 leading-relaxed">Machen Sie sich unabhängig von steigenden Strompreisen. Mit einer Photovoltaik-Anlage produzieren Sie Ihren eigenen grünen Strom – direkt auf Ihrem Dach in NRW.</p>
                  <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
                    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"><Sun className="w-6 h-6 sm:w-8 sm:h-8 text-secondary flex-shrink-0" /><span className="font-bold text-sm sm:text-base text-gray-800">Bis zu 80% Autarkie möglich</span></div>
                    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"><Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-secondary flex-shrink-0" /><span className="font-bold text-sm sm:text-base text-gray-800">Wertsteigerung Ihrer Immobilie</span></div>
                    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"><Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-secondary flex-shrink-0" /><span className="font-bold text-sm sm:text-base text-gray-800">Aktiver Klimaschutz</span></div>
                  </div>
                </AnimatedElement>
              </div>
            </div>
            <div className="pt-8 lg:pt-0">
              <AnimatedElement delay={200}>
                <Card className="border-none shadow-2xl overflow-hidden">
                  <div className="bg-primary p-4 sm:p-6 text-white">
                    <h3 className="font-heading text-lg sm:text-2xl font-bold">Kostenlose Beratung</h3>
                    <p className="text-white/80 text-xs sm:text-sm">Füllen Sie das Formular aus und wir melden uns schnellstmöglich</p>
                  </div>
                  <CardContent className="p-4 sm:p-8">
                    <form onSubmit={handlePvSubmit} className="space-y-4 sm:space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="pv-eigentumsart" className="text-sm font-medium">Eigentumsart</Label>
                        <Select value={pvEigentumsart} onValueChange={setPvEigentumsart} required>
                          <SelectTrigger id="pv-eigentumsart" className="h-10 sm:h-12 bg-gray-50 border-gray-200 text-sm"><SelectValue placeholder="Bitte wählen" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="einfamilienhaus">Einfamilienhaus</SelectItem>
                            <SelectItem value="mehrfamilienhaus">Mehrfamilienhaus</SelectItem>
                            <SelectItem value="gewerbe">Gewerbe</SelectItem>
                            <SelectItem value="wohnung_miete">Wohnung zur Miete</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pv-dachform" className="text-sm font-medium">Dachform</Label>
                        <Select value={pvDachform} onValueChange={setPvDachform} required>
                          <SelectTrigger id="pv-dachform" className="h-10 sm:h-12 bg-gray-50 border-gray-200 text-sm"><SelectValue placeholder="Bitte wählen" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="satteldach">Satteldach</SelectItem>
                            <SelectItem value="flachdach">Flachdach</SelectItem>
                            <SelectItem value="pultdach">Pultdach</SelectItem>
                            <SelectItem value="mansardendach">Mansardendach</SelectItem>
                            <SelectItem value="walmdach">Walmdach</SelectItem>
                            <SelectItem value="andere">Andere</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pv-personen" className="text-sm font-medium">Anzahl Personen im Haushalt</Label>
                        <Input id="pv-personen" type="number" placeholder="z.B. 4" value={pvPersonen} onChange={(e) => setPvPersonen(e.target.value)} className="h-10 sm:h-12 bg-gray-50 border-gray-200 text-sm" />
                      </div>
                      <div className="space-y-3 border-t pt-4 sm:pt-6">
                        <h4 className="font-bold text-gray-900 text-sm">Adresse</h4>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          <div className="space-y-2 col-span-2"><Label htmlFor="pv-strasse" className="text-xs sm:text-sm font-medium">Straße</Label><Input id="pv-strasse" placeholder="Musterstraße" value={pvStrasse} onChange={(e) => setPvStrasse(e.target.value)} className="h-9 sm:h-10 bg-gray-50 border-gray-200 text-xs sm:text-sm" /></div>
                          <div className="space-y-2"><Label htmlFor="pv-hausnummer" className="text-xs sm:text-sm font-medium">Hausnummer</Label><Input id="pv-hausnummer" placeholder="123" value={pvHausnummer} onChange={(e) => setPvHausnummer(e.target.value)} className="h-9 sm:h-10 bg-gray-50 border-gray-200 text-xs sm:text-sm" /></div>
                          <div className="space-y-2"><Label htmlFor="pv-plz" className="text-xs sm:text-sm font-medium">PLZ</Label><Input id="pv-plz" placeholder="40210" value={pvPlz} onChange={(e) => setPvPlz(e.target.value)} className="h-9 sm:h-10 bg-gray-50 border-gray-200 text-xs sm:text-sm" /></div>
                          <div className="space-y-2 col-span-2"><Label htmlFor="pv-ort" className="text-xs sm:text-sm font-medium">Ort</Label><Input id="pv-ort" placeholder="Düsseldorf" value={pvOrt} onChange={(e) => setPvOrt(e.target.value)} className="h-9 sm:h-10 bg-gray-50 border-gray-200 text-xs sm:text-sm" /></div>
                        </div>
                      </div>
                      <div className="space-y-2 border-t pt-4 sm:pt-6">
                        <Label htmlFor="pv-foto" className="text-sm font-medium">Dachfoto (Optional)</Label>
                        <Input id="pv-foto" type="file" accept="image/*" onChange={(e) => setPvFoto(e.target.files?.[0] || null)} className="h-9 sm:h-10 bg-gray-50 border-gray-200 text-xs sm:text-sm" />
                        <p className="text-xs text-gray-500">Laden Sie ein Foto Ihres Daches hoch für eine bessere Analyse</p>
                      </div>
                      <div className="space-y-3 border-t pt-4 sm:pt-6">
                        <h4 className="font-bold text-gray-900 text-sm">Kontaktinformationen</h4>
                        <div className="space-y-2"><Label htmlFor="pv-name" className="text-xs sm:text-sm font-medium">Name</Label><Input id="pv-name" placeholder="Max Mustermann" value={pvName} onChange={(e) => setPvName(e.target.value)} required className="h-9 sm:h-10 bg-gray-50 border-gray-200 text-xs sm:text-sm" /></div>
                        <div className="space-y-2"><Label htmlFor="pv-email" className="text-xs sm:text-sm font-medium">E-Mail</Label><Input id="pv-email" type="email" placeholder="max@beispiel.de" value={pvEmail} onChange={(e) => setPvEmail(e.target.value)} required className="h-9 sm:h-10 bg-gray-50 border-gray-200 text-xs sm:text-sm" /></div>
                        <div className="space-y-2"><Label htmlFor="pv-telefon" className="text-xs sm:text-sm font-medium">Telefon</Label><Input id="pv-telefon" type="tel" placeholder="+49 211 1234 5678" value={pvTelefon} onChange={(e) => setPvTelefon(e.target.value)} className="h-9 sm:h-10 bg-gray-50 border-gray-200 text-xs sm:text-sm" /></div>
                      </div>
                      <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-10 sm:h-12 text-sm sm:text-base font-bold rounded-lg mt-4 sm:mt-6">Kostenlose Beratung anfragen</Button>
                    </form>
                  </CardContent>
                </Card>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>

      {/* --- INFORMATIONS MATERIAL --- */}
      <section id="informationsmaterial" className="w-full py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-12 sm:mb-16">
            <AnimatedElement><div className="space-y-3 text-left"><h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary">Wissen zum <br/>Downloaden</h2></div></AnimatedElement>
            <AnimatedElement delay={100}><p className="font-paragraph text-base sm:text-lg text-gray-600 max-w-md text-left md:text-right">Unsere Experten haben die wichtigsten Informationen für Sie zusammengefasst. Kostenlos und direkt verfügbar.</p></AnimatedElement>
          </div>
          {loading ? (<div>Lädt...</div>) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {materials.map((material, index) => {
                let linkPath = ROUTES.ratgeberHub;
                const title = material.title?.toLowerCase() || '';
                if (title.includes('strom')) linkPath = ROUTES.ratgeberStrom;
                else if (title.includes('gas')) linkPath = ROUTES.ratgeberGas;
                else if (title.includes('photovoltaik') || title.includes('pv') || title.includes('solar')) linkPath = ROUTES.ratgeberPhotovoltaik;
                return (
                  <AnimatedElement key={material._id} delay={index * 100}>
                    <Link to={linkPath} className="block h-full">
                      <Card className="h-full hover:shadow-xl transition-all duration-300 border-none bg-white overflow-hidden group cursor-pointer">
                        <div className="relative aspect-video overflow-hidden">
                          {material.thumbnail ? (
                            <Image src={material.thumbnail} alt={material.title || 'Material Thumbnail'} width={400} height={225} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                          ) : (
                            <div className="w-full h-full bg-primary/10 flex items-center justify-center"><Download className="w-10 h-10 sm:w-12 sm:h-12 text-primary/40" /></div>
                          )}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="bg-white rounded-full p-2 sm:p-3"><Download className="w-5 h-5 sm:w-6 sm:h-6 text-primary" /></div>
                          </div>
                        </div>
                        <CardHeader className="p-4 sm:p-6">
                          <div className="flex justify-between items-start mb-2 gap-2">
                            <span className="text-xs font-bold text-secondary uppercase tracking-wider">PDF Guide</span>
                            {material.publicationDate && (<span className="text-xs text-gray-400 flex-shrink-0">{new Date(material.publicationDate).toLocaleDateString('de-DE')}</span>)}
                          </div>
                          <CardTitle className="font-heading text-base sm:text-xl text-gray-900 group-hover:text-primary transition-colors">{material.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 pt-0">
                          <p className="font-paragraph text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6 line-clamp-3">{material.description}</p>
                          {material.fileUrl && (
                            <Button asChild variant="outline" className="w-full border-gray-200 hover:border-primary hover:text-primary hover:bg-primary/5 text-xs sm:text-sm h-9 sm:h-10" onClick={(e) => e.stopPropagation()}>
                              <a href={material.fileUrl} target="_blank" rel="noopener noreferrer">Jetzt herunterladen</a>
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  </AnimatedElement>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="w-full py-24 sm:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
          <AnimatedElement>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary mb-3 sm:mb-4">Häufige Fragen</h2>
              <p className="font-paragraph text-base sm:text-lg text-gray-600">Alles was Sie über den Wechsel wissen müssen.</p>
            </div>
          </AnimatedElement>
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedElement key={faq._id} delay={index * 50}>
                <Accordion type="single" collapsible className="bg-gray-50 rounded-lg sm:rounded-2xl px-4 sm:px-6 border-none">
                  <AccordionItem value={`item-${index}`} className="border-none">
                    <AccordionTrigger className="font-heading text-sm sm:text-lg font-medium text-left py-4 sm:py-6 hover:text-primary hover:no-underline">{faq.question}</AccordionTrigger>
                    <AccordionContent className="font-paragraph text-sm sm:text-base text-gray-600 pb-4 sm:pb-6 leading-relaxed">{faq.answer}</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="kontakt" className="w-full py-24 sm:py-32 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="text-white">
              <AnimatedElement>
                <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-6 sm:mb-8">Wir sind für <br/>Sie da.</h2>
                <p className="font-paragraph text-base sm:text-xl text-white/80 mb-8 sm:mb-12 max-w-lg">Haben Sie Fragen zu Ihrem Tarif oder interessieren Sie sich für eine Solaranlage? Schreiben Sie uns.</p>
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/20 flex-shrink-0"><Home className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" /></div>
                    <div><p className="text-xs sm:text-sm text-white/60 uppercase tracking-wider font-bold">Anschrift</p><p className="text-base sm:text-xl font-medium">59302 Oelde, NRW</p></div>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/20 flex-shrink-0"><Send className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" /></div>
                    <div><p className="text-xs sm:text-sm text-white/60 uppercase tracking-wider font-bold">E-Mail</p><p className="text-base sm:text-xl font-medium">support@energievergleich.shop</p></div>
                  </div>
                </div>
              </AnimatedElement>
            </div>
            <AnimatedElement delay={200}>
              <Card className="border-none shadow-2xl bg-white/95 backdrop-blur-sm p-2">
                <CardContent className="pt-6 sm:pt-8 px-4 sm:px-8 pb-6 sm:pb-8">
                  <form onSubmit={handleContactSubmit} className="space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="contact-type" className="text-sm font-medium">Ich bin...</Label>
                      <Select value={contactType} onValueChange={setContactType}>
                        <SelectTrigger id="contact-type" className="h-10 sm:h-12 bg-gray-50 border-gray-200 text-sm"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="privat">Privatkunde</SelectItem>
                          <SelectItem value="gewerbe">Gewerbekunde</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2"><Label htmlFor="contact-name" className="text-sm font-medium">Name</Label><Input id="contact-name" placeholder="Max Mustermann" value={contactName} onChange={(e) => setContactName(e.target.value)} required className="h-10 sm:h-12 bg-gray-50 border-gray-200 text-sm" /></div>
                      <div className="space-y-2"><Label htmlFor="contact-email" className="text-sm font-medium">E-Mail</Label><Input id="contact-email" type="email" placeholder="max@beispiel.de" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} required className="h-10 sm:h-12 bg-gray-50 border-gray-200 text-sm" /></div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-message" className="text-sm font-medium">Nachricht</Label>
                      <Textarea id="contact-message" placeholder="Wie können wir Ihnen helfen?" value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} required rows={4} className="bg-gray-50 border-gray-200 resize-none text-sm" />
                    </div>
                    <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-11 sm:h-14 text-sm sm:text-lg font-bold rounded-lg sm:rounded-xl">
                      Nachricht senden
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </AnimatedElement>
          </div>
        </div>
      </section>
      </main>

      {/* Contact Form Dialog */}
      <FormSubmissionDialog
        isOpen={showContactDialog}
        onClose={() => setShowContactDialog(false)}
        formType="kontakt"
        formData={{ name: contactName, email: contactEmail, phone: contactPhone, message: contactMessage, type: contactType }}
        requiredFields={['name', 'email', 'message']}
        onSuccess={handleContactSuccess}
        title="Kontaktanfrage senden"
      />
      {/* Photovoltaik Form Dialog */}
      <FormSubmissionDialog
        isOpen={showPvDialog}
        onClose={() => setShowPvDialog(false)}
        formType="photovoltaik"
        formData={{ name: pvName, email: pvEmail, phone: pvTelefon, eigentumsart: pvEigentumsart, dachform: pvDachform, personen: pvPersonen, strasse: pvStrasse, hausnummer: pvHausnummer, plz: pvPlz, ort: pvOrt }}
        requiredFields={['name', 'email', 'eigentumsart', 'dachform', 'plz', 'ort']}
        onSuccess={handlePvSuccess}
        title="Kostenlose PV-Beratung"
      />
      <Footer />
      {flags.showStickyCTA && (
        <StickyCTA
          showExitIntent={flags.showExitIntentPopup}
          onCTAClick={() => trackCTAClick('StickyCTA – Jetzt Tarife vergleichen')}
        />
      )}
    </div>
  );
}
