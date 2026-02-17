// HPI 1.6-G - PHASE 6: Core Web Vitals Optimized
import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  // --- Data Fidelity Protocol: Canonical Data Sources ---
  const [faqs, setFaqs] = useState<HufiggestellteFragen[]>([]);
  const [vorteile, setVorteile] = useState<Wechselvorteile[]>([]);
  const [materials, setMaterials] = useState<Informationsmaterial[]>([]);
  const [loading, setLoading] = useState(true);

  // Calculator states
  const [stromVerbrauch, setStromVerbrauch] = useState('');
  const [gasVerbrauch, setGasVerbrauch] = useState('');
  const [postleitzahl, setPostleitzahl] = useState('');
  const [personenAnzahl, setPersonenAnzahl] = useState('');

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
  const [pvFoto, setPvFoto] = useState<File | null>(null);
  const [pvName, setPvName] = useState('');
  const [pvEmail, setPvEmail] = useState('');
  const [pvTelefon, setPvTelefon] = useState('');

  // Tariff results states
  const [stromResults, setStromResults] = useState<any[]>([]);
  const [gasResults, setGasResults] = useState<any[]>([]);
  const [kombiResults, setKombiResults] = useState<any[]>([]);
  const [showStromResults, setShowStromResults] = useState(false);
  const [showGasResults, setShowGasResults] = useState(false);
  const [showKombiResults, setShowKombiResults] = useState(false);

  // --- Scroll Hooks for Parallax - REDUCED on mobile ---
  const { scrollY } = useScroll();
  const prefersReducedMotion = useRef(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mediaQuery.matches;
  }, []);
  
  // Disable parallax on mobile and when reduced motion is preferred
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const heroY = useTransform(scrollY, [0, 1000], prefersReducedMotion.current || isMobile ? [0, 0] : [0, 400]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  // ... keep existing code (state declarations) ...

  // --- Load Data from CMS ---
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [faqData, vorteileData, materialsData] = await Promise.all([
        BaseCrudService.getAll<HufiggestellteFragen>('faq'),
        BaseCrudService.getAll<Wechselvorteile>('wechselvorteile'),
        BaseCrudService.getAll<Informationsmaterial>('informationsmaterial'),
      ]);

      const sortedFaqs = faqData.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
      const sortedVorteile = vorteileData.items
        .filter(v => v.isActive)
        .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

      setFaqs(sortedFaqs);
      setVorteile(sortedVorteile);
      setMaterials(materialsData.items);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // --- FAQ Schema (JSON-LD) - Now faqs is defined before this effect ---
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

    let script = document.getElementById('faq-schema');
    if (!script) {
      script = document.createElement('script');
      script.id = 'faq-schema';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(faqSchema);
      document.head.appendChild(script);
    } else {
      script.textContent = JSON.stringify(faqSchema);
    }
  }, [faqs]);

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

  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showPvDialog, setShowPvDialog] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowContactDialog(true);
  };

  const handleContactSuccess = () => {
    setContactName('');
    setContactEmail('');
    setContactPhone('');
    setContactMessage('');
  };

  const handlePvSubmit = (e: React.FormEvent) => {
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
      <style>{`
        .animate-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
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
      {/* --- HERO SECTION --- */}
      <section className="hero-section relative w-full min-h-[100vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-primary">
        {/* Parallax Background */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0 overflow-hidden will-change-transform"
        >
          <Image
            src="https://static.wixstatic.com/media/32e7c0_5f85b8d9458c4ccbafdde2a4f3bc3cce~mv2.png?originWidth=1920&originHeight=1024"
            alt="Grüne Landschaft in Nordrhein-Westfalen mit Windrädern"
            className="w-full h-full object-cover"
            width={1920}
            height={1024}
            priority
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background pointer-events-none" />
        </motion.div>

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
                Energie wechseln.<br />
                <span className="text-secondary">Zukunft sichern.</span>
              </h1>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <p className="font-paragraph text-sm sm:text-lg lg:text-xl text-white/95 mb-6 sm:mb-8 md:mb-10 max-w-2xl leading-relaxed">
                Der einfache Weg zu günstigerem Strom und Gas in NRW. Mit unserem Vergleichsrechner finden Sie schnell die besten Tarife.
              </p>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <div className="flex flex-col sm:flex-row gap-3 pb-8 sm:pb-0">
                <Button
                  onClick={() => {
                    trackCTAClick('Jetzt vergleichen');
                    scrollToSection('vergleichsrechner');
                  }}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 h-12 sm:h-14 px-6 sm:px-8 rounded-lg text-base sm:text-lg font-bold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                >
                  Jetzt vergleichen
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
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 hidden sm:flex"
        >
          <div className="flex flex-col items-center gap-2 text-white/80">
            <span className="text-xs uppercase tracking-widest font-medium">Scrollen</span>
            <ChevronDown className="w-6 h-6 animate-bounce" aria-hidden="true" />
          </div>
        </motion.div>
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
                    <p className="font-heading font-bold text-base sm:text-xl text-primary">Einfacher Wechsel</p>
                    <p className="text-xs sm:text-sm text-gray-500">Wenige Minuten</p>
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
                  Ihr Weg zum <br/>
                  <span className="text-secondary">besten Tarif.</span>
                </h2>
                <p className="font-paragraph text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  Unser Vergleichsrechner findet schnell die passenden Angebote in Ihrer Region.
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
                      <p className="text-xs text-gray-500">Übersichtliche Liste der besten Tarife.</p>
                    </div>
                  </div>
                  <div className="w-px h-6 bg-gray-200 ml-4" />
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-primary text-primary flex items-center justify-center font-bold text-sm mt-1 flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Online wechseln</h4>
                      <p className="text-xs text-gray-500">Wir übernehmen den Papierkram.</p>
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
                                <Select value={personenAnzahl} onValueChange={setPersonenAnzahl}>
                                  <SelectTrigger id="strom-personen" className="h-10 sm:h-12 text-sm">
                                    <SelectValue placeholder="Bitte wählen" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="1">1 Person (ca. 1.500 kWh)</SelectItem>
                                    <SelectItem value="2">2 Personen (ca. 2.500 kWh)</SelectItem>
                                    <SelectItem value="3">3 Personen (ca. 3.500 kWh)</SelectItem>
                                    <SelectItem value="4">4+ Personen (ca. 4.250 kWh)</SelectItem>
                                  </SelectContent>
                                </Select>
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
                              Stromtarife vergleichen
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
                                    Tarif wählen
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
                                <Select value={personenAnzahl} onValueChange={setPersonenAnzahl}>
                                  <SelectTrigger id="gas-wohnflaeche" className="h-10 sm:h-12 text-sm">
                                    <SelectValue placeholder="Bitte wählen" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="30">30 m²</SelectItem>
                                    <SelectItem value="50">50 m²</SelectItem>
                                    <SelectItem value="100">100 m²</SelectItem>
                                    <SelectItem value="150">150 m²</SelectItem>
                                  </SelectContent>
                                </Select>
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
                              Gastarife vergleichen
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
                                    Tarif wählen
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
                              Kombitarife vergleichen
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
                                    Tarif wählen
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
                Das sagen unsere Kunden
              </h2>
              <p className="font-paragraph text-base sm:text-lg text-gray-600">
                Echte Erfahrungen von zufriedenen Kundinnen und Kunden
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
                  "Dank EnergievergleichNRW konnten wir unsere Stromkosten erheblich senken. Der Service war hervorragend und die Beratung sehr kompetent. Absolut empfehlenswert!"
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
                  "Der Gasvergleich war super einfach und hat uns viel Geld gespart. Wir sind sehr zufrieden mit dem neuen Anbieter und dem reibungslosen Wechsel."
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
      {/* --- VORTEILE SECTION (CMS DATA) --- */}
      <section id="vorteile" className="w-full py-24 sm:py-32 bg-primary text-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <div className="text-center mb-16 sm:mb-20">
            <AnimatedElement>
              <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-4 sm:mb-6">
                Warum wechseln?
              </h2>
              <p className="font-paragraph text-base sm:text-xl text-white/80 max-w-2xl mx-auto">
                Der Energiemarkt in NRW bietet viele Möglichkeiten. Wir helfen Ihnen, die besten für sich zu nutzen.
              </p>
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
                        <Image
                          src={vorteil.icon}
                          alt={vorteil.title || 'Icon'}
                          width={32}
                          height={32}
                          className="w-7 h-7 sm:w-8 sm:h-8 object-contain brightness-0 invert"
                          loading="lazy"
                        />
                      ) : (
                        <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-secondary" />
                      )}
                    </div>
                    <h3 className="font-heading text-lg sm:text-2xl font-bold mb-3 sm:mb-4 text-secondary">
                      {vorteil.title}
                    </h3>
                    <p className="font-paragraph text-sm sm:text-base text-white/80 leading-relaxed">
                      {vorteil.description}
                    </p>
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
                  <div className="inline-block px-3 sm:px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-bold text-xs sm:text-sm mb-4 sm:mb-6">
                    Zukunftstechnologie
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary mb-6 sm:mb-8 leading-tight">
                    Ihre eigene <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-orange-500">Energiequelle.</span>
                  </h2>
                  <p className="font-paragraph text-base sm:text-xl text-gray-600 mb-8 sm:mb-10 leading-relaxed">
                    Machen Sie sich unabhängig von steigenden Strompreisen. Mit einer Photovoltaik-Anlage produzieren Sie Ihren eigenen grünen Strom – direkt auf Ihrem Dach in NRW.
                  </p>

                  <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
                    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                      <Sun className="w-6 h-6 sm:w-8 sm:h-8 text-secondary flex-shrink-0" />
                      <span className="font-bold text-sm sm:text-base text-gray-800">Bis zu 80% Autarkie möglich</span>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                      <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-secondary flex-shrink-0" />
                      <span className="font-bold text-sm sm:text-base text-gray-800">Wertsteigerung Ihrer Immobilie</span>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                      <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-secondary flex-shrink-0" />
                      <span className="font-bold text-sm sm:text-base text-gray-800">Aktiver Klimaschutz</span>
                    </div>
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
                          <SelectTrigger id="pv-eigentumsart" className="h-10 sm:h-12 bg-gray-50 border-gray-200 text-sm">
                            <SelectValue placeholder="Bitte wählen" />
                          </SelectTrigger>
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
                          <SelectTrigger id="pv-dachform" className="h-10 sm:h-12 bg-gray-50 border-gray-200 text-sm">
                            <SelectValue placeholder="Bitte wählen" />
                          </SelectTrigger>
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
                        <Input
                          id="pv-personen"
                          type="number"
                          placeholder="z.B. 4"
                          value={pvPersonen}
                          onChange={(e) => setPvPersonen(e.target.value)}
                          className="h-10 sm:h-12 bg-gray-50 border-gray-200 text-sm"
                        />
                      </div>

                      <div className="space-y-3 border-t pt-4 sm:pt-6">
                        <h4 className="font-bold text-gray-900 text-sm">Adresse</h4>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          <div className="space-y-2 col-span-2">
                            <Label htmlFor="pv-strasse" className="text-xs sm:text-sm font-medium">Straße</Label>
                            <Input
                              id="pv-strasse"
                              placeholder="Musterstraße"
                              value={pvStrasse}
                              onChange={(e) => setPvStrasse(e.target.value)}
                              className="h-9 sm:h-10 bg-gray-50 border-gray-200 text-xs sm:text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="pv-hausnummer" className="text-xs sm:text-sm font-medium">Hausnummer</Label>
                            <Input
                              id="pv-hausnummer"
                              placeholder="123"
                              value={pvHausnummer}
                              onChange={(e) => setPvHausnummer(e.target.value)}
                              className="h-9 sm:h-10 bg-gray-50 border-gray-200 text-xs sm:text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="pv-plz" className="text-xs sm:text-sm font-medium">PLZ</Label>
                            <Input
                              id="pv-plz"
                              placeholder="40210"
                              value={pvPlz}
                              onChange={(e) => setPvPlz(e.target.value)}
                              className="h-9 sm:h-10 bg-gray-50 border-gray-200 text-xs sm:text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="pv-ort" className="text-xs sm:text-sm font-medium">Ort</Label>
                            <Input
                              id="pv-ort"
                              placeholder="Düsseldorf"
                              value={pvOrt}
                              onChange={(e) => setPvOrt(e.target.value)}
                              className="h-9 sm:h-10 bg-gray-50 border-gray-200 text-xs sm:text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 border-t pt-4 sm:pt-6">
                        <Label htmlFor="pv-foto" className="text-sm font-medium">Dachfoto (Optional)</Label>
                        <Input
                          id="pv-foto"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setPvFoto(e.target.files?.[0] || null)}
                          className="h-9 sm:h-10 bg-gray-50 border-gray-200 text-xs sm:text-sm"
                        />
                        <p className="text-xs text-gray-500">Laden Sie ein Foto Ihres Daches hoch für eine bessere Analyse</p>
                      </div>

                      <div className="space-y-3 border-t pt-4 sm:pt-6">
                        <h4 className="font-bold text-gray-900 text-sm">Kontaktinformationen</h4>
                        <div className="space-y-2">
                          <Label htmlFor="pv-name" className="text-xs sm:text-sm font-medium">Name</Label>
                          <Input
                            id="pv-name"
                            placeholder="Max Mustermann"
                            value={pvName}
                            onChange={(e) => setPvName(e.target.value)}
                            required
                            className="h-9 sm:h-10 bg-gray-50 border-gray-200 text-xs sm:text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pv-email" className="text-xs sm:text-sm font-medium">E-Mail</Label>
                          <Input
                            id="pv-email"
                            type="email"
                            placeholder="max@beispiel.de"
                            value={pvEmail}
                            onChange={(e) => setPvEmail(e.target.value)}
                            required
                            className="h-9 sm:h-10 bg-gray-50 border-gray-200 text-xs sm:text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pv-telefon" className="text-xs sm:text-sm font-medium">Telefon</Label>
                          <Input
                            id="pv-telefon"
                            type="tel"
                            placeholder="+49 211 1234 5678"
                            value={pvTelefon}
                            onChange={(e) => setPvTelefon(e.target.value)}
                            className="h-9 sm:h-10 bg-gray-50 border-gray-200 text-xs sm:text-sm"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-10 sm:h-12 text-sm sm:text-base font-bold rounded-lg mt-4 sm:mt-6"
                      >
                        Kostenlose Beratung anfragen
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>
      {/* --- INFORMATIONS MATERIAL (CMS DATA) --- */}
      <section id="informationsmaterial" className="w-full py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-12 sm:mb-16">
            <AnimatedElement>
              <div className="space-y-3 text-left">
                <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary">
                  Wissen zum <br/>Downloaden
                </h2>
              </div>
            </AnimatedElement>
            <AnimatedElement delay={100}>
              <p className="font-paragraph text-base sm:text-lg text-gray-600 max-w-md text-left md:text-right">
                Unsere Experten haben die wichtigsten Informationen für Sie zusammengefasst. Kostenlos und direkt verfügbar.
              </p>
            </AnimatedElement>
          </div>

          {loading ? (
            <div>Lädt...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {materials.map((material, index) => {
                let linkPath = ROUTES.ratgeberHub;
                const title = material.title?.toLowerCase() || '';
                
                if (title.includes('strom')) {
                  linkPath = ROUTES.ratgeberStrom;
                } else if (title.includes('gas')) {
                  linkPath = ROUTES.ratgeberGas;
                } else if (title.includes('photovoltaik') || title.includes('pv') || title.includes('solar')) {
                  linkPath = ROUTES.ratgeberPhotovoltaik;
                }
                
                return (
                  <AnimatedElement key={material._id} delay={index * 100}>
                    <Link to={linkPath} className="block h-full">
                      <Card className="h-full hover:shadow-xl transition-all duration-300 border-none bg-white overflow-hidden group cursor-pointer">
                        <div className="relative aspect-video overflow-hidden">
                          {material.thumbnail ? (
                            <Image
                              src={material.thumbnail}
                              alt={material.title || 'Material Thumbnail'}
                              width={400}
                              height={225}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                              <Download className="w-10 h-10 sm:w-12 sm:h-12 text-primary/40" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="bg-white rounded-full p-2 sm:p-3">
                              <Download className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                            </div>
                          </div>
                        </div>
                        <CardHeader className="p-4 sm:p-6">
                          <div className="flex justify-between items-start mb-2 gap-2">
                            <span className="text-xs font-bold text-secondary uppercase tracking-wider">PDF Guide</span>
                            {material.publicationDate && (
                              <span className="text-xs text-gray-400 flex-shrink-0">{new Date(material.publicationDate).toLocaleDateString('de-DE')}</span>
                            )}
                          </div>
                          <CardTitle className="font-heading text-base sm:text-xl text-gray-900 group-hover:text-primary transition-colors">
                            {material.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 pt-0">
                          <p className="font-paragraph text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6 line-clamp-3">
                            {material.description}
                          </p>
                          {material.fileUrl && (
                            <Button
                              asChild
                              variant="outline"
                              className="w-full border-gray-200 hover:border-primary hover:text-primary hover:bg-primary/5 text-xs sm:text-sm h-9 sm:h-10"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <a href={material.fileUrl} target="_blank" rel="noopener noreferrer">
                                Jetzt herunterladen
                              </a>
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
      {/* --- FAQ SECTION (CMS DATA) --- */}
      <section id="faq" className="w-full py-24 sm:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
          <AnimatedElement>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary mb-3 sm:mb-4">
                Häufige Fragen
              </h2>
              <p className="font-paragraph text-base sm:text-lg text-gray-600">
                Alles was Sie über den Wechsel wissen müssen.
              </p>
            </div>
          </AnimatedElement>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedElement key={faq._id} delay={index * 50}>
                <Accordion type="single" collapsible className="bg-gray-50 rounded-lg sm:rounded-2xl px-4 sm:px-6 border-none">
                  <AccordionItem value={`item-${index}`} className="border-none">
                    <AccordionTrigger className="font-heading text-sm sm:text-lg font-medium text-left py-4 sm:py-6 hover:text-primary hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="font-paragraph text-sm sm:text-base text-gray-600 pb-4 sm:pb-6 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
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
                <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-6 sm:mb-8">
                  Wir sind für <br/>Sie da.
                </h2>
                <p className="font-paragraph text-base sm:text-xl text-white/80 mb-8 sm:mb-12 max-w-lg">
                  Haben Sie Fragen zu Ihrem Tarif oder interessieren Sie sich für eine Solaranlage? Schreiben Sie uns.
                </p>

                <div className="space-y-6 sm:space-y-8">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/20 flex-shrink-0">
                      <Home className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-white/60 uppercase tracking-wider font-bold">Anschrift</p>
                      <p className="text-base sm:text-xl font-medium">Musterstraße 123, 40210 Düsseldorf</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/20 flex-shrink-0">
                      <Send className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-white/60 uppercase tracking-wider font-bold">E-Mail</p>
                      <p className="text-base sm:text-xl font-medium">kontakt@energievergleich.nrw</p>
                    </div>
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
                        <SelectTrigger id="contact-type" className="h-10 sm:h-12 bg-gray-50 border-gray-200 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="privat">Privatkunde</SelectItem>
                          <SelectItem value="gewerbe">Gewerbekunde</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name" className="text-sm font-medium">Name</Label>
                        <Input
                          id="contact-name"
                          placeholder="Max Mustermann"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          required
                          className="h-10 sm:h-12 bg-gray-50 border-gray-200 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-email" className="text-sm font-medium">E-Mail</Label>
                        <Input
                          id="contact-email"
                          type="email"
                          placeholder="max@beispiel.de"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          required
                          className="h-10 sm:h-12 bg-gray-50 border-gray-200 text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-message" className="text-sm font-medium">Nachricht</Label>
                      <Textarea
                        id="contact-message"
                        placeholder="Wie können wir Ihnen helfen?"
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        required
                        rows={4}
                        className="bg-gray-50 border-gray-200 resize-none text-sm"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-11 sm:h-14 text-sm sm:text-lg font-bold rounded-lg sm:rounded-xl"
                    >
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
      {/* Contact Form Dialog */}
      <FormSubmissionDialog
        isOpen={showContactDialog}
        onClose={() => setShowContactDialog(false)}
        formType="kontakt"
        formData={{
          name: contactName,
          email: contactEmail,
          phone: contactPhone,
          message: contactMessage,
          type: contactType
        }}
        requiredFields={['name', 'email', 'message']}
        onSuccess={handleContactSuccess}
        title="Kontaktanfrage senden"
      />
      {/* Photovoltaik Form Dialog */}
      <FormSubmissionDialog
        isOpen={showPvDialog}
        onClose={() => setShowPvDialog(false)}
        formType="photovoltaik"
        formData={{
          name: pvName,
          email: pvEmail,
          phone: pvTelefon,
          eigentumsart: pvEigentumsart,
          dachform: pvDachform,
          personen: pvPersonen,
          strasse: pvStrasse,
          hausnummer: pvHausnummer,
          plz: pvPlz,
          ort: pvOrt
        }}
        requiredFields={['name', 'email', 'eigentumsart', 'dachform', 'plz', 'ort']}
        onSuccess={handlePvSuccess}
        title="Kostenlose PV-Beratung"
      />
      <Footer />
    </div>
  );
}
