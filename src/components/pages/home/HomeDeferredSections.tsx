// HPI 1.6-G - PHASE 6: Core Web Vitals Optimized
import React, { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { CheckCircle, Sun, Download, ChevronDown, Send, ArrowRight, Leaf, Home, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import NativeSelect from '@/components/ui/native-select';
import { BaseCrudService } from '@/integrations';
import { HufiggestellteFragen, Wechselvorteile, Informationsmaterial } from '@/entities';
import { Image } from '@/components/ui/image';
import { ROUTES } from '@/lib/routes';

// --- Utility Components ---
const LazyFormSubmissionDialog = lazy(() => import('@/components/FormSubmissionDialog'));

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

export default function HomeDeferredSections() {
  // --- Data Fidelity Protocol: Canonical Data Sources ---
  const [faqs, setFaqs] = useState<HufiggestellteFragen[]>([]);
  const [vorteile, setVorteile] = useState<Wechselvorteile[]>([]);
  const [materials, setMaterials] = useState<Informationsmaterial[]>([]);
  const [loading, setLoading] = useState(true);

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

  const normalizeDownloadUrl = (url?: string) => {
    if (!url) return '';
    return url.replace(/https?:\/\/(www\.)?energievergleich\.nrw/gi, 'https://www.energievergleich.shop').trim();
  };

  return (
    <>
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
                        <NativeSelect
                          id="pv-eigentumsart"
                          value={pvEigentumsart}
                          onValueChange={setPvEigentumsart}
                          placeholder="Bitte wählen"
                          required
                          className="h-10 sm:h-12 bg-gray-50 border-gray-200 text-sm"
                          options={[
                            { value: 'einfamilienhaus', label: 'Einfamilienhaus' },
                            { value: 'mehrfamilienhaus', label: 'Mehrfamilienhaus' },
                            { value: 'gewerbe', label: 'Gewerbe' },
                            { value: 'wohnung_miete', label: 'Wohnung zur Miete' },
                          ]}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pv-dachform" className="text-sm font-medium">Dachform</Label>
                        <NativeSelect
                          id="pv-dachform"
                          value={pvDachform}
                          onValueChange={setPvDachform}
                          placeholder="Bitte wählen"
                          required
                          className="h-10 sm:h-12 bg-gray-50 border-gray-200 text-sm"
                          options={[
                            { value: 'satteldach', label: 'Satteldach' },
                            { value: 'flachdach', label: 'Flachdach' },
                            { value: 'pultdach', label: 'Pultdach' },
                            { value: 'mansardendach', label: 'Mansardendach' },
                            { value: 'walmdach', label: 'Walmdach' },
                            { value: 'andere', label: 'Andere' },
                          ]}
                        />
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
                const downloadUrl = normalizeDownloadUrl(material.fileUrl);
                
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
                          {downloadUrl && (
                            <Button
                              asChild
                              variant="outline"
                              className="w-full border-gray-200 hover:border-primary hover:text-primary hover:bg-primary/5 text-xs sm:text-sm h-9 sm:h-10"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
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
                <details className="group rounded-lg bg-gray-50 px-4 sm:rounded-2xl sm:px-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-heading text-sm font-medium text-left hover:text-primary sm:py-6 sm:text-lg [&::-webkit-details-marker]:hidden">
                    <span>{faq.question}</span>
                    <ChevronDown
                      className="h-5 w-5 flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="pb-4 font-paragraph text-sm leading-relaxed text-gray-600 sm:pb-6 sm:text-base">
                    {faq.answer}
                  </div>
                </details>
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
                      <p className="text-base sm:text-xl font-medium">59302 Oelde, NRW</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/20 flex-shrink-0">
                      <Send className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-white/60 uppercase tracking-wider font-bold">E-Mail</p>
                      <a
                        href="mailto:support@energievergleich.nrw"
                        className="text-base sm:text-xl font-medium underline-offset-4 hover:underline"
                        aria-label="E-Mail an support@energievergleich.nrw"
                      >
                        support@energievergleich.nrw
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
                      <NativeSelect
                        id="contact-type"
                        value={contactType}
                        onValueChange={setContactType}
                        className="h-10 sm:h-12 bg-gray-50 border-gray-200 text-sm"
                        options={[
                          { value: 'privat', label: 'Privatkunde' },
                          { value: 'gewerbe', label: 'Gewerbekunde' },
                        ]}
                      />
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
      <Suspense fallback={null}>
        {showContactDialog ? (
          <LazyFormSubmissionDialog
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
        ) : null}
        {showPvDialog ? (
          <LazyFormSubmissionDialog
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
        ) : null}
      </Suspense>
    </>
  );
}
