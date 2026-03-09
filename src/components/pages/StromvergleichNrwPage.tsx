import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Zap, CheckCircle, TrendingDown, Shield, Clock, Send, ArrowRight, AlertCircle, Globe, DollarSign, MapPin, BarChart3, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/Header';
import DeferredFooter from '@/components/DeferredFooter';
import SEOHead from '@/components/SEOHead';
import PassendeRatgeber from '@/components/PassendeRatgeber';
import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import TrustRow from '@/components/TrustRow';
import RelatedPages from '@/components/RelatedPages';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';
import { getPageSEO } from '@/lib/seo-config';
import { validateFormFields, FORM_CONFIGS } from '@/lib/form-validation';
import FormSubmissionDialog from '@/components/FormSubmissionDialog';
import { trackMethodikClick } from '@/services/form-submission';
import { getRelatedPages } from '@/lib/internal-linking';

export default function StromvergleichNrwPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    postleitzahl: '',
    verbrauch: '',
    name: '',
    email: '',
    phone: '',
  });
  const [showResults, setShowResults] = useState(false);
  const [calculatedConsumption, setCalculatedConsumption] = useState(0);
  const [showFormDialog, setShowFormDialog] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Wie oft kann ich meinen Stromanbieter wechseln?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sie können Ihren Stromanbieter jederzeit wechseln, sofern Sie die Kündigungsfrist einhalten. Bei den meisten Verträgen beträgt diese 4 Wochen zum Ende eines Kalendermonats. Nach einem Wechsel können Sie frühestens nach 12 Monaten erneut wechseln, es sei denn, Sie haben einen Vertrag mit kürzerer Laufzeit abgeschlossen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Ist der Stromwechsel in NRW kostenlos?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja, der Wechsel zu einem neuen Stromanbieter ist völlig kostenlos. Es fallen keine Gebühren für die Kündigung beim alten Anbieter oder für die Anmeldung beim neuen Anbieter an. Der Wechsel wird von uns komplett übernommen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie lange dauert ein Stromwechsel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ein Stromwechsel dauert in der Regel 4-6 Wochen. Dies ist die gesetzliche Kündigungsfrist. Während dieser Zeit wird Ihre Stromversorgung nicht unterbrochen. Der neue Anbieter kümmert sich um alle notwendigen Formalitäten.'
          }
        },
        {
          '@type': 'Question',
          name: 'Kann ich während eines Wechsels ohne Strom sein?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nein, das ist nicht möglich. Ihre Stromversorgung ist gesetzlich geschützt und wird nicht unterbrochen. Selbst wenn es zu Verzögerungen kommt, springt der Grundversorger ein und beliefert Sie mit Strom.'
          }
        },
        {
          '@type': 'Question',
          name: 'Welche Daten benötige ich für einen Stromwechsel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sie benötigen Ihre Postleitzahl, Ihren jährlichen Stromverbrauch (in kWh) und optional Ihre Zählernummer. Den Stromverbrauch finden Sie auf Ihrer letzten Stromrechnung. Mit diesen Informationen können wir Ihnen die besten Tarife anzeigen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie viel kann ich durch einen Stromwechsel sparen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Die Einsparungen variieren je nach Ihrem Verbrauch und Ihrer Region in NRW. Im Durchschnitt sparen Haushalte 200-400 Euro pro Jahr durch einen Wechsel zu einem günstigeren Anbieter. Mit unserem Vergleichsrechner sehen Sie sofort, wie viel Sie sparen können.'
          }
        },
        {
          '@type': 'Question',
          name: 'Sind Ökostrom-Tarife teurer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nein, nicht unbedingt. Es gibt mittlerweile viele Ökostrom-Tarife, die genauso günstig oder sogar günstiger sind als konventionelle Tarife. Mit unserem Vergleichsrechner können Sie gezielt nach Ökostrom-Optionen filtern.'
          }
        },
        {
          '@type': 'Question',
          name: 'Was ist eine Preisgarantie?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Eine Preisgarantie bedeutet, dass der Strompreis für einen bestimmten Zeitraum nicht erhöht wird, auch wenn die Marktpreise steigen. Dies gibt Ihnen Planungssicherheit. Beachten Sie: Steuern und Abgaben können trotzdem erhöht werden.'
          }
        },
        {
          '@type': 'Question',
          name: 'Kann ich meinen Vertrag vorzeitig kündigen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Die Möglichkeit zur vorzeitigen Kündigung hängt von Ihrem Vertrag ab. Viele Anbieter erlauben eine Kündigung mit 4 Wochen Frist zum Ende eines Kalendermonats. Einige Verträge haben auch Sonderkündigungsrechte bei Preiserhöhungen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie funktioniert der Vergleichsrechner?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Geben Sie Ihre Postleitzahl und Ihren Stromverbrauch ein. Der Rechner zeigt Ihnen dann alle verfügbaren Tarife in Ihrer Region, sortiert nach Preis. Sie sehen alle wichtigen Informationen wie Arbeitspreis, Grundpreis, Laufzeit und Preisgarantie auf einen Blick.'
          }
        },
        {
          '@type': 'Question',
          name: 'Gibt es versteckte Gebühren beim Wechsel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nein. Der Wechsel ist komplett kostenlos. Es gibt keine versteckten Gebühren. Alle Kosten sind transparent in den Tarifdetails aufgeführt. Wir zeigen Ihnen immer die Gesamtkosten pro Jahr.'
          }
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields for private form
    const validation = validateFormFields(formData, FORM_CONFIGS.private);
    if (!validation.valid) {
      setFormErrors(validation.errors);
      return;
    }

    setFormErrors({});

    // Use custom value or default
    let consumption = 0;
    if (formData.verbrauch && parseInt(formData.verbrauch) > 0) {
      consumption = parseInt(formData.verbrauch);
    } else {
      consumption = 3500; // Default value
    }

    setCalculatedConsumption(consumption);
    setShowResults(true);
  };

  const handleFormSubmit = () => {
    setShowFormDialog(true);
  };

  const handleFormSuccess = () => {
    // Reset form
    setFormData({
      postleitzahl: '',
      verbrauch: '',
      name: '',
      email: '',
      phone: '',
    });
    setShowResults(false);
    setFormErrors({});
    // Redirect to thank you page
    setTimeout(() => {
      navigate('/danke');
    }, 2000);
  };

  const seo = getPageSEO('stromvergleich');

  const breadcrumbItems = [
    { label: 'Startseite', path: '/' },
    { label: 'Stromvergleich NRW', path: '/stromvergleich-nrw' },
  ];

  const breadcrumbSchema = [
    { name: 'Startseite', url: `${typeof window !== 'undefined' ? window.location.origin : ''}${ROUTES.home}` },
    { name: 'Stromvergleich NRW', url: `${typeof window !== 'undefined' ? window.location.origin : ''}${ROUTES.stromvergleich}` },
  ];

  return (
    <div className="min-h-screen bg-background break-words leading-mobile">
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        ogTitle={seo.ogTitle}
        ogDescription={seo.ogDescription}
      />
      <BreadcrumbSchema items={breadcrumbSchema} />
      <Header />
      <main>
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Section - LCP Optimized */}
      <section className="w-full bg-primary text-primary-foreground py-20 md:py-32">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 leading-tight max-w-[22ch] sm:max-w-none break-words">
              Stromvergleich für NRW
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
              Finden Sie den günstigsten Stromtarif in Ihrer Region. Kostenlos, unabhängig und in wenigen Minuten.
            </p>
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => document.getElementById('vergleich')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-14 px-8 rounded-full text-lg font-semibold shadow-lg"
              >
                Jetzt vergleichen
              </Button>
              <Link to="/methodik" className="text-white/80 hover:text-white transition-colors text-sm font-medium underline">
                So vergleichen wir (Methodik)
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Tool Section */}
      <section id="vergleich" className="w-full py-24 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2">
              <Card className="shadow-xl">
                <CardHeader className="bg-primary text-white">
                  <CardTitle className="font-heading text-2xl">Stromtarife vergleichen</CardTitle>
                </CardHeader>
                <CardContent className="p-8 ox-hidden">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="plz" className="font-paragraph">Postleitzahl *</Label>
                        <Input
                          id="plz"
                          placeholder="z.B. 40210"
                          value={formData.postleitzahl}
                          onChange={(e) => setFormData({ ...formData, postleitzahl: e.target.value })}
                          required
                          className="font-paragraph w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="verbrauch" className="font-paragraph">Jahresverbrauch (kWh) <span className="text-gray-400 text-sm">(optional)</span></Label>
                        <Input
                          id="verbrauch"
                          type="number"
                          placeholder="z.B. 3500"
                          value={formData.verbrauch}
                          onChange={(e) => setFormData({ ...formData, verbrauch: e.target.value })}
                          className="font-paragraph w-full"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-paragraph">Name *</Label>
                      <Input
                        id="name"
                        placeholder="Max Mustermann"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="font-paragraph w-full"
                      />
                    </div>

                    <div className="flex justify-stretch sm:justify-start">
                      <Button type="submit" className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 font-bold text-lg rounded-lg">
                        <Send className="w-5 h-5 mr-2" />
                        Tarife vergleichen
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Results Section */}
              {showResults && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-12"
                >
                  <h2 className="font-heading text-2xl font-bold text-primary mb-8">Tarifvorschau für {formData.postleitzahl}</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {[
                      {
                        name: 'Tarif Option A',
                        pricePerKwh: 0.28,
                        baseFee: 12.50,
                      },
                      {
                        name: 'Tarif Option B',
                        pricePerKwh: 0.26,
                        baseFee: 14.00,
                      },
                      {
                        name: 'Tarif Option C',
                        pricePerKwh: 0.24,
                        baseFee: 16.50,
                      },
                    ].map((tariff, index) => {
                      const monthlyConsumption = calculatedConsumption / 12;
                      const monthlyPrice = (monthlyConsumption * tariff.pricePerKwh) + tariff.baseFee;
                      const yearlyPrice = monthlyPrice * 12;

                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
                              <CardTitle className="font-heading text-xl text-primary">{tariff.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 flex-1 flex flex-col justify-between">
                              <div className="space-y-4 mb-6">
                                <div>
                                  <p className="font-paragraph text-sm text-gray-600 mb-1">Arbeitspreis</p>
                                  <p className="font-heading text-lg font-bold text-primary">{tariff.pricePerKwh.toFixed(2)} €/kWh</p>
                                </div>
                                <div>
                                  <p className="font-paragraph text-sm text-gray-600 mb-1">Grundgebühr</p>
                                  <p className="font-heading text-lg font-bold text-primary">{tariff.baseFee.toFixed(2)} €/Monat</p>
                                </div>
                                <div className="border-t pt-4">
                                  <p className="font-paragraph text-sm text-gray-600 mb-1">Geschätzte monatliche Kosten</p>
                                  <p className="font-heading text-2xl font-bold text-secondary">{monthlyPrice.toFixed(2)} €</p>
                                </div>
                                <div>
                                  <p className="font-paragraph text-sm text-gray-600 mb-1">Geschätzte jährliche Kosten</p>
                                  <p className="font-heading text-lg font-bold text-primary">{yearlyPrice.toFixed(2)} €/Jahr</p>
                                </div>
                              </div>
                              <Link to={ROUTES.kontakt} className="w-full">
                                <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-11 font-bold rounded-lg">
                                  Angebot anfordern
                                  <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                              </Link>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="font-paragraph text-sm text-gray-700">
                      <strong>Hinweis:</strong> Vorschau basiert auf Beispielrechnung. Finale Tarife nach Anbieterabfrage.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-heading font-bold text-primary mb-4">Warum mit uns vergleichen?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-sm">100% unabhängig und kostenlos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-sm">Alle Anbieter in NRW</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-sm">Transparente Tarifdetails</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-sm">Wir kümmern uns um den Wechsel</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full py-24 bg-white">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">Kurz erklärt: Stromvergleich für NRW</h2>
              
              <p className="font-paragraph text-lg text-gray-700 mb-6">
                Mit unserem Stromvergleich finden Sie in wenigen Minuten den günstigsten Stromtarif für Ihren Haushalt in Nordrhein-Westfalen. Der Vergleich ist völlig kostenlos und unverbindlich – Sie geben nur Ihre Postleitzahl und Ihren Stromverbrauch ein und erhalten sofort alle verfügbaren Tarife übersichtlich sortiert. Sparen Sie durchschnittlich 200–400 Euro pro Jahr durch einen Wechsel zu einem besseren Anbieter.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">So funktioniert der Vergleich – 5 einfache Schritte</h3>
              <ol className="font-paragraph text-gray-700 space-y-3 mb-6 list-decimal list-inside">
                <li><strong>Postleitzahl eingeben:</strong> Geben Sie Ihre PLZ ein, um Tarife für Ihren Netzbereich zu sehen</li>
                <li><strong>Stromverbrauch angeben:</strong> Tragen Sie Ihren jährlichen Verbrauch in kWh ein (zu finden auf der Stromrechnung)</li>
                <li><strong>Tarife vergleichen:</strong> Sehen Sie alle verfügbaren Angebote mit Preis, Laufzeit und Preisgarantie</li>
                <li><strong>Wunsch-Tarif wählen:</strong> Entscheiden Sie sich für den besten Tarif nach Ihren Kriterien</li>
                <li><strong>Wechsel abschließen:</strong> Wir kümmern uns um die Kündigung beim alten Anbieter und den Wechsel – kostenlos und sicher</li>
              </ol>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">Welche Angaben du brauchst</h3>
              <ul className="font-paragraph text-gray-700 space-y-2 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">•</span>
                  <span><strong>Postleitzahl:</strong> Bestimmt Ihren Stromnetzbetreiber und verfügbare Tarife</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">•</span>
                  <span><strong>Jahresverbrauch in kWh:</strong> Finden Sie auf Ihrer letzten Stromrechnung unter „Verbrauch\"</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">•</span>
                  <span><strong>Zählernummer (optional):</strong> Hilft bei der genauen Tarifberechnung</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">•</span>
                  <span><strong>Name und E-Mail:</strong> Für die Kontaktaufnahme durch Anbieter</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">Worauf du achten solltest</h3>
              <ul className="font-paragraph text-gray-700 space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">✓</span>
                  <span><strong>Laufzeit:</strong> Kurze Laufzeiten (12 Monate) bieten mehr Flexibilität als längere Verträge</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">✓</span>
                  <span><strong>Preisgarantie:</strong> Achten Sie auf die Dauer der Preisgarantie – mindestens 12 Monate sind empfehlenswert</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">✓</span>
                  <span><strong>Neukundenbonus:</strong> Viele Anbieter bieten Wechselboni, die die Gesamtkosten senken</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">✓</span>
                  <span><strong>Abschlag und Kündigungsfristen:</strong> Prüfen Sie die Höhe der monatlichen Abschläge und die Kündigungsfrist zum Vertragsende</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">Häufige Fehler beim Stromwechsel</h3>
              <ul className="font-paragraph text-gray-700 space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">✗</span>
                  <span><strong>Nur auf den Preis schauen:</strong> Der niedrigste Preis ist nicht immer die beste Wahl – achten Sie auch auf Laufzeit, Preisgarantie und Kündigungsfristen</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">✗</span>
                  <span><strong>Verbrauch falsch eingeben:</strong> Ein falscher Verbrauch führt zu unrealistischen Tarifangeboten – überprüfen Sie die Zahl auf Ihrer Rechnung</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">✗</span>
                  <span><strong>Kündigungsfristen ignorieren:</strong> Verpassen Sie nicht die Kündigungsfrist beim alten Anbieter – wir kümmern uns darum, aber informieren Sie sich selbst</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">Stromvergleich speziell für NRW</h3>
              <p className="font-paragraph text-gray-700 mb-4">
                Nordrhein-Westfalen ist das bevölkerungsreichste Bundesland Deutschlands mit großer Vielfalt bei Stromanbietern und Tarifen. Die Strompreise variieren je nach Postleitzahl und Netzbetreiber – in Düsseldorf können die Tarife anders ausfallen als in Köln, Essen oder Dortmund. Unser Vergleich berücksichtigt diese regionalen Unterschiede und zeigt Ihnen die besten Tarife speziell für Ihren Standort in NRW.
              </p>
            </div>

            <div className="bg-secondary/10 border-l-4 border-secondary p-6 rounded">
              <p className="font-paragraph text-gray-700 italic">
                Jetzt kostenlos vergleichen und sparen Sie ab sofort bei Ihren Stromkosten!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Switch Section */}
      <section className="w-full py-24 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-primary mb-4">
              Warum wechseln?
            </h2>
            <p className="font-paragraph text-lg text-gray-600 max-w-2xl mx-auto">
              Das bringt Ihnen ein Tarifwechsel – klar & einfach erklärt.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: 'Schnell & unkompliziert',
                description: 'Alle günstigen Tarife auf einen Blick.'
              },
              {
                icon: Globe,
                title: 'Unabhängig & neutral',
                description: 'Ergebnisse ohne Anbieter-Bias.'
              },
              {
                icon: DollarSign,
                title: 'Kostenlos für Sie',
                description: 'Unser Service kostet Sie keinen Cent.'
              },
              {
                icon: MapPin,
                title: 'Lokal für NRW',
                description: 'Speziell für Nordrhein-Westfalen.'
              },
              {
                icon: BarChart3,
                title: 'Individuell passend',
                description: 'Tarife abgestimmt auf Ihren Verbrauch.'
              },
              {
                icon: Rocket,
                title: 'Sofort entscheidbar',
                description: 'Direkte Weiterleitung zum Anbieter.'
              },
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading font-semibold text-lg text-primary mb-2">
                          {item.title}
                        </h3>
                        <p className="font-paragraph text-base text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* So funktioniert's Section */}
      <section className="w-full py-24 bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary mb-16 text-center">
            So funktioniert der Stromwechsel
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg h-full">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl mb-6">
                  1
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Daten eingeben</h3>
                <p className="font-paragraph text-gray-600">
                  Geben Sie Ihre Postleitzahl und Ihren Stromverbrauch ein. Das dauert nur wenige Sekunden.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg h-full">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl mb-6">
                  2
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Tarife vergleichen</h3>
                <p className="font-paragraph text-gray-600">
                  Sehen Sie alle verfügbaren Tarife mit Preis, Laufzeit und Preisgarantie auf einen Blick.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg h-full">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl mb-6">
                  3
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Wechsel abschließen</h3>
                <p className="font-paragraph text-gray-600">
                  Wählen Sie Ihren Wunsch-Tarif und wir kümmern uns um alle Formalitäten. Kostenlos und sicher.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Snippet Section */}
      <section className="w-full py-24 bg-white">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <h3 className="font-heading text-2xl font-bold text-primary mb-8">Stromanbieter wechseln in 5 Schritten</h3>
          <ol className="font-paragraph text-gray-700 space-y-4 list-decimal list-inside">
            <li><strong>Postleitzahl und Verbrauch eingeben:</strong> Nutzen Sie unseren Vergleichsrechner mit Ihren Basisdaten.</li>
            <li><strong>Tarife vergleichen:</strong> Sehen Sie alle verfügbaren Angebote sortiert nach Preis und Konditionen.</li>
            <li><strong>Wunsch-Tarif wählen:</strong> Entscheiden Sie sich für den Tarif, der am besten zu Ihnen passt.</li>
            <li><strong>Angebot anfordern:</strong> Kontaktieren Sie den Anbieter oder lassen Sie sich von uns beraten.</li>
            <li><strong>Wechsel abschließen:</strong> Wir kümmern uns um die Kündigung und den Wechsel – kostenlos und sicher.</li>
          </ol>
        </div>
      </section>

      {/* Comparison Criteria Section */}
      <section className="w-full py-24 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary mb-16 text-center">
            Worauf achten wir beim Vergleich?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Preis', description: 'Wir vergleichen die Gesamtkosten pro Jahr, nicht nur den Arbeitspreis.' },
              { title: 'Laufzeit', description: 'Flexible Laufzeiten von 12 bis 24 Monaten für maximale Flexibilität.' },
              { title: 'Preisgarantie', description: 'Wir zeigen, wie lange der Preis garantiert nicht erhöht wird.' },
              { title: 'Kündigungsfrist', description: 'Kurze Kündigungsfristen geben Ihnen mehr Flexibilität beim Wechsel.' },
              { title: 'Boni & Rabatte', description: 'Transparente Darstellung aller Wechselboni und Rabatte.' },
              { title: 'Öko-Optionen', description: 'Grüne Tarife mit Ökostrom-Zertifikaten sind oft günstiger als gedacht.' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="font-heading text-xl text-primary">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="w-full py-24 bg-white">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary mb-6">
              Warum energievergleich.shop?
            </h2>
            <div className="space-y-4 font-paragraph text-gray-700 leading-relaxed">
              <p>
                Bei energievergleich.shop vergleichen Sie Stromtarife völlig transparent und unabhängig. Wir sind nicht an einen Anbieter gebunden und zeigen Ihnen alle verfügbaren Optionen in Ihrer Region – sortiert nach Preis und Vertragsbedingungen. Unser Service ist für Sie kostenlos: Wir verdienen kein Geld mit Ihrem Wechsel, sondern nur durch Provisionen von Anbietern, die Sie selbst gewählt haben.
              </p>
              <p>
                Wir vergleichen nicht nur Preise, sondern auch Laufzeiten, Preisgarantien und Kündigungsfristen. So finden Sie den Tarif, der wirklich zu Ihnen passt – nicht nur der billigste. Alle Informationen auf dieser Seite sind aktuell und wurden zuletzt im Februar 2026 überprüft.
              </p>
              <p>
                Mehr über unsere Vergleichsmethode erfahren Sie unter{' '}
                <Link to="/methodik" className="text-primary font-semibold hover:underline">
                  So vergleichen wir (Methodik)
                </Link>
                . Bei Fragen helfen wir gerne weiter – kontaktieren Sie uns über unsere{' '}
                <Link to="/kontakt" className="text-primary font-semibold hover:underline">
                  Kontakt
                </Link>
                -Seite.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary mb-16 text-center">
            Häufig gestellte Fragen
          </h2>

          <div className="space-y-4">
            {[
              {
                q: 'Wie oft kann ich meinen Stromanbieter wechseln?',
                a: 'Sie können jederzeit wechseln, müssen aber die Kündigungsfrist (meist 4 Wochen zum Monatsende) einhalten. Nach einem Wechsel können Sie frühestens nach 12 Monaten erneut wechseln.'
              },
              {
                q: 'Ist der Stromwechsel kostenlos?',
                a: 'Ja, völlig kostenlos. Es fallen keine Gebühren für Kündigung oder Anmeldung an. Wir kümmern uns um alle Formalitäten.'
              },
              {
                q: 'Wie lange dauert ein Stromwechsel?',
                a: 'In der Regel 4-6 Wochen. Ihre Stromversorgung wird nicht unterbrochen. Der neue Anbieter kümmert sich um alle notwendigen Schritte.'
              },
              {
                q: 'Kann ich während des Wechsels ohne Strom sein?',
                a: 'Nein. Ihre Stromversorgung ist gesetzlich geschützt. Im Notfall springt der Grundversorger ein.'
              },
              {
                q: 'Welche Daten benötige ich für einen Vergleich?',
                a: 'Postleitzahl und Stromverbrauch (in kWh). Den Verbrauch finden Sie auf Ihrer letzten Rechnung. Optional: Zählernummer.'
              },
              {
                q: 'Sind Ökostrom-Tarife teurer?',
                a: 'Nein. Es gibt viele Ökostrom-Tarife, die genauso günstig oder günstiger sind. Mit unserem Rechner können Sie gezielt filtern.'
              },
              {
                q: 'Was ist eine Preisgarantie?',
                a: 'Der Strompreis wird für einen bestimmten Zeitraum nicht erhöht, auch wenn Marktpreise steigen. Steuern und Abgaben können sich aber ändern.'
              },
              {
                q: 'Kann ich meinen Vertrag vorzeitig kündigen?',
                a: 'Das hängt vom Vertrag ab. Viele erlauben Kündigung mit 4 Wochen Frist. Manche haben Sonderkündigungsrechte bei Preiserhöhungen.'
              },
              {
                q: 'Wie funktioniert der Vergleichsrechner?',
                a: 'Geben Sie Postleitzahl und Verbrauch ein. Der Rechner zeigt alle Tarife sortiert nach Preis mit Arbeitspreis, Grundpreis, Laufzeit und Garantie.'
              },
              {
                q: 'Gibt es versteckte Gebühren?',
                a: 'Nein. Der Wechsel ist komplett kostenlos. Alle Kosten sind transparent aufgeführt. Wir zeigen immer die Gesamtkosten pro Jahr.'
              }
            ].map((item, index) => (
              <Accordion key={index} type="single" collapsible className="bg-white rounded-lg border">
                <AccordionItem value={`item-${index}`} className="border-none">
                  <AccordionTrigger className="font-heading font-bold text-lg hover:text-primary px-6 py-4">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-paragraph text-gray-600 px-6 pb-4">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links Section */}
      <section className="w-full py-16 bg-white border-t">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <h3 className="font-heading text-2xl font-bold text-primary mb-8">Weitere Informationen</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <Link to={ROUTES.gasvergleich} className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">Gasvergleich NRW</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">Vergleichen Sie auch Ihre Gastarife und sparen Sie zusätzlich.</p>
                  <Button variant="outline" size="sm">Mehr erfahren</Button>
                </CardContent>
              </Card>
            </Link>
            <Link to={ROUTES.photovoltaik} className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">Photovoltaik NRW</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">Produzieren Sie Ihren eigenen Strom mit einer Solaranlage.</p>
                  <Button variant="outline" size="sm">Mehr erfahren</Button>
                </CardContent>
              </Card>
            </Link>
            <Link to={ROUTES.gewerbestrom} className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">Gewerbestrom</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">Spezielle Stromtarife für Ihr Unternehmen.</p>
                  <Button variant="outline" size="sm">Mehr erfahren</Button>
                </CardContent>
              </Card>
            </Link>
            <Link to={ROUTES.ratgeberStrom} className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">Ratgeber Strom</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">Tipps und Wissen rund um Stromtarife.</p>
                  <Button variant="outline" size="sm">Mehr erfahren</Button>
                </CardContent>
              </Card>
            </Link>
            <Link to="/methodik" className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">Methodik</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">So funktioniert unser Vergleich.</p>
                  <Button variant="outline" size="sm">Mehr erfahren</Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Passende Ratgeber */}
      <PassendeRatgeber moneyPageId="stromvergleich-nrw" limit={4} />

      {/* Related Pages - Cross-Linking */}
      <RelatedPages pages={getRelatedPages('/stromvergleich-nrw')} />

      </main>
      <DeferredFooter />
    </div>
  );
}
