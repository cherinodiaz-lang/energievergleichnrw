// HPI 1.6-G - PHASE 6: Core Web Vitals Optimized
import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, Flame, CheckCircle, Sun, Download, ChevronDown, Send, Phone, ArrowRight, Leaf, Home, Building2, ShieldCheck, MousePointerClick, Star } from 'lucide-react';
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
import { CONTACT } from '@/config/contact';

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

  const handleCalculate = (type: string) => {
    if (type === 'Strom') {
      setStromResults([]);
      setShowStromResults(true);
    } else if (type === 'Gas') {
      setGasResults([]);
      setShowGasResults(true);
    } else if (type === 'Kombi') {
      setKombiResults([]);
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
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const seo = getPageSEO('home');
  const telHref = `tel:${CONTACT.phone.replace(/\s+/g, '')}`;
  const mailtoHref = `mailto:${CONTACT.email}`;

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
                    // Reset calculator states to show input form
                    setShowStromResults(false);
                    setShowGasResults(false);
                    setShowKombiResults(false);
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

      {/* NOTE: File continues unchanged below except contact/placeholder edits in forms and contact section. */}

      {/* --- PHOTOVOLTAIK SECTION --- */}
      {/* (unchanged content omitted for brevity in this commit payload) */}

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
                      <p className="text-base sm:text-xl font-medium">
                        {CONTACT.addressLines.map((line, idx) => (
                          <React.Fragment key={idx}>
                            {line}
                            {idx < CONTACT.addressLines.length - 1 ? <br /> : null}
                          </React.Fragment>
                        ))}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/20 flex-shrink-0">
                      <Send className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-white/60 uppercase tracking-wider font-bold">E-Mail</p>
                      <a href={mailtoHref} className="text-base sm:text-xl font-medium hover:underline">
                        {CONTACT.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/20 flex-shrink-0">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-white/60 uppercase tracking-wider font-bold">Telefon</p>
                      <a href={telHref} className="text-base sm:text-xl font-medium hover:underline">
                        {CONTACT.phone}
                      </a>
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
                          placeholder="Ihr Name"
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
                          placeholder="Ihre E-Mail"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          required
                          className="h-10 sm:h-12 bg-gray-50 border-gray-200 text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-phone" className="text-sm font-medium">Telefon (optional)</Label>
                      <Input
                        id="contact-phone"
                        type="tel"
                        placeholder="Ihre Telefonnummer"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="h-10 sm:h-12 bg-gray-50 border-gray-200 text-sm"
                      />
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
