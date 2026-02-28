import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  CheckCircle,
  TrendingDown,
  Shield,
  Clock,
  Send,
  ArrowRight,
  AlertCircle,
  Globe,
  DollarSign,
  MapPin,
  BarChart3,
  Rocket,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import PassendeRatgeber from '@/components/PassendeRatgeber';
import TrustRow from '@/components/TrustRow';
import RelatedPages from '@/components/RelatedPages';
import RelatedCities from '@/components/RelatedCities';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';
import { getPageSEO } from '@/lib/seo-config';
import { validateFormFields, FORM_CONFIGS } from '@/lib/form-validation';
import FormSubmissionDialog from '@/components/FormSubmissionDialog';
import { trackMethodikClick } from '@/services/form-submission';
import { getRelatedPages } from '@/lib/internal-linking';
import StromvergleichCityLayout from '@/components/pages/stromvergleich/StromvergleichCityLayout';

export default function StromvergleichDuesseldorfPage() {
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
          name: 'Wer ist der Grundversorger in Düsseldorf?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Stadtwerke Düsseldorf ist der Grundversorger für Düsseldorf und die unmittelbare Region. Als Grundversorger ist Stadtwerke Düsseldorf verpflichtet, jeden Haushalt mit Strom zu versorgen, auch wenn dieser nicht aktiv einen Vertrag abgeschlossen hat. Die Grundversorgung ist oft teurer als Sondertarife bei anderen Anbietern.',
          },
        },
        {
          '@type': 'Question',
          name: 'Wie setzt sich der Grundversorgungstarif in Düsseldorf zusammen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Der Grundversorgungstarif in Düsseldorf wird von Stadtwerke Düsseldorf als Grundversorger festgelegt. Er setzt sich aus dem Arbeitspreis (€/kWh), der Grundgebühr (€/Monat) und den Netzentgelte zusammen. Stadtwerke Düsseldorf ist verpflichtet, alle Haushalte in Düsseldorf mit Strom zu versorgen. Die Tarife sind oft höher als Sondertarife bei anderen Anbietern, weshalb ein Wechsel meist sinnvoll ist.',
          },
        },
        {
          '@type': 'Question',
          name: 'Wie lange sind die Kündigungsfristen in Düsseldorf?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Bei der Grundversorgung von Stadtwerke Düsseldorf beträgt die Kündigungsfrist 2 Wochen zum Ende eines Kalendermonats. Bei Sondertarifen anderer Anbieter liegt die Frist meist bei 4 Wochen zum Monatsende. Achten Sie auf die genaue Kündigungsfrist in Ihrem Vertrag.',
          },
        },
        {
          '@type': 'Question',
          name: 'Was muss ich beim Umzug in Düsseldorf beachten?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Bei einem Umzug in Düsseldorf sollten Sie Ihren Stromvertrag rechtzeitig (mindestens 4 Wochen vorher) kündigen oder einen neuen Tarif für die neue Adresse abschließen. Nutzen Sie unseren Vergleichsrechner mit Ihrer neuen Postleitzahl, um die besten Tarife für Ihre neue Wohnung zu finden. Die Stromversorgung wird nicht unterbrochen.',
          },
        },
        {
          '@type': 'Question',
          name: 'Wie viel kann ich durch einen Stromwechsel in Düsseldorf sparen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Die Einsparungen variieren je nach Ihrem Verbrauch und Ihrer aktuellen Versorgung. Im Durchschnitt sparen Düsseldorfer Haushalte 200-400 Euro pro Jahr durch einen Wechsel zu einem günstigeren Anbieter. Mit unserem Vergleichsrechner sehen Sie sofort, wie viel Sie sparen können.',
          },
        },
      ],
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

    const validation = validateFormFields(formData, FORM_CONFIGS.private);
    if (!validation.valid) {
      setFormErrors(validation.errors);
      return;
    }

    setFormErrors({});

    const consumption = formData.verbrauch && parseInt(formData.verbrauch) > 0 ? parseInt(formData.verbrauch) : 3500;

    setCalculatedConsumption(consumption);
    setShowResults(true);
  };

  const handleFormSubmit = () => {
    setShowFormDialog(true);
  };

  const handleFormSuccess = () => {
    setFormData({
      postleitzahl: '',
      verbrauch: '',
      name: '',
      email: '',
      phone: '',
    });
    setShowResults(false);
    setFormErrors({});

    setTimeout(() => {
      navigate('/danke');
    }, 2000);
  };

  return (
    <StromvergleichCityLayout
      seo={{
        title: 'Stromvergleich Düsseldorf 2026 | Günstige Tarife für Düsseldorfer Haushalte',
        description:
          'Stromvergleich für Düsseldorf – Tarife vergleichen & bis zu 30 % sparen. Kostenloser Stromtarif-Rechner für Düsseldorfer Haushalte.',
        keywords: 'Stromvergleich Düsseldorf, Stromtarife Düsseldorf, Stromanbieter Düsseldorf, Stromwechsel Düsseldorf',
        canonical: 'https://www.energievergleich.shop/stromvergleich-duesseldorf',
        ogTitle: 'Stromvergleich Düsseldorf 2026 | Günstige Tarife für Düsseldorfer Haushalte',
        ogDescription:
          'Stromvergleich für Düsseldorf – Tarife vergleichen & bis zu 30 % sparen. Kostenloser Stromtarif-Rechner für Düsseldorfer Haushalte.',
      }}
      breadcrumbLabel="Stromvergleich Düsseldorf"
      breadcrumbPath="/stromvergleich-duesseldorf"
      breadcrumbAbsoluteUrl="https://www.energievergleich.shop/stromvergleich-duesseldorf"
      cityName="Düsseldorf"
      citySlug="duesseldorf"
    >
      <div className="min-h-screen bg-background break-words leading-mobile">
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
                Stromvergleich Düsseldorf: Günstige Tarife für Düsseldorfer Haushalte
              </h1>
              <p className="font-paragraph text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
                Finden Sie den günstigsten Stromtarif in Düsseldorf. Kostenlos, unabhängig und in wenigen Minuten.
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
                          <Label htmlFor="plz" className="font-paragraph">
                            Postleitzahl *
                          </Label>
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
                          <Label htmlFor="verbrauch" className="font-paragraph">
                            Jahresverbrauch (kWh) <span className="text-gray-400 text-sm">(optional)</span>
                          </Label>
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
                        <Label htmlFor="name" className="font-paragraph">
                          Name *
                        </Label>
                        <Input
                          id="name"
                          placeholder=""
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="font-paragraph w-full"
                        />
                      </div>

                      <div className="flex justify-stretch sm:justify-start">
                        <Button
                          type="submit"
                          className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 font-bold text-lg rounded-lg"
                        >
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
                          baseFee: 12.5,
                        },
                        {
                          name: 'Tarif Option B',
                          pricePerKwh: 0.26,
                          baseFee: 14.0,
                        },
                        {
                          name: 'Tarif Option C',
                          pricePerKwh: 0.24,
                          baseFee: 16.5,
                        },
                      ].map((tariff, index) => {
                        const monthlyConsumption = calculatedConsumption / 12;
                        const monthlyPrice = monthlyConsumption * tariff.pricePerKwh + tariff.baseFee;
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
                      <span className="font-paragraph text-sm">Alle Anbieter in Düsseldorf</span>
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
                <h2 className="font-heading text-3xl font-bold text-primary mb-6">Kurz erklärt: Stromvergleich für Düsseldorf</h2>

                <p className="font-paragraph text-lg text-gray-700 mb-6">
                  Mit unserem Stromvergleich finden Sie in wenigen Minuten den günstigsten Stromtarif für Ihren Haushalt in Düsseldorf.
                  Der Vergleich ist völlig kostenlos und unverbindlich – Sie geben nur Ihre Postleitzahl und Ihren Stromverbrauch ein
                  und erhalten sofort alle verfügbaren Tarife übersichtlich sortiert. Sparen Sie durchschnittlich 200–400 Euro pro Jahr
                  durch einen Wechsel zu einem besseren Anbieter.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">So funktioniert der Vergleich – 5 einfache Schritte</h3>
                <ol className="font-paragraph text-gray-700 space-y-3 mb-6 list-decimal list-inside">
                  <li>
                    <strong>Postleitzahl eingeben:</strong> Geben Sie Ihre Düsseldorfer PLZ ein (z.B. 40210, 40211, 40212), um Tarife
                    für Ihren Netzbereich zu sehen
                  </li>
                  <li>
                    <strong>Stromverbrauch angeben:</strong> Tragen Sie Ihren jährlichen Verbrauch in kWh ein (zu finden auf der
                    Stromrechnung)
                  </li>
                  <li>
                    <strong>Tarife vergleichen:</strong> Sehen Sie alle verfügbaren Angebote mit Preis, Laufzeit und Preisgarantie
                  </li>
                  <li>
                    <strong>Wunsch-Tarif wählen:</strong> Entscheiden Sie sich für den besten Tarif nach Ihren Kriterien
                  </li>
                  <li>
                    <strong>Wechsel abschließen:</strong> Wir kümmern uns um die Kündigung beim alten Anbieter und den Wechsel – kostenlos
                    und sicher
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Welche Angaben du brauchst</h3>
                <ul className="font-paragraph text-gray-700 space-y-2 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-secondary font-bold flex-shrink-0">•</span>
                    <span>
                      <strong>Postleitzahl:</strong> Bestimmt Ihren Stromnetzbetreiber und verfügbare Tarife in Düsseldorf
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary font-bold flex-shrink-0">•</span>
                    <span>
                      <strong>Jahresverbrauch in kWh:</strong> Finden Sie auf Ihrer letzten Stromrechnung unter „Verbrauch"
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary font-bold flex-shrink-0">•</span>
                    <span>
                      <strong>Zählernummer (optional):</strong> Hilft bei der genauen Tarifberechnung
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary font-bold flex-shrink-0">•</span>
                    <span>
                      <strong>Name und E-Mail:</strong> Für die Kontaktaufnahme durch Anbieter
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Worauf du achten solltest</h3>
                <ul className="font-paragraph text-gray-700 space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-secondary font-bold flex-shrink-0">✓</span>
                    <span>
                      <strong>Laufzeit:</strong> Kurze Laufzeiten (12 Monate) bieten mehr Flexibilität als längere Verträge
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary font-bold flex-shrink-0">✓</span>
                    <span>
                      <strong>Preisgarantie:</strong> Achten Sie auf die Dauer der Preisgarantie – mindestens 12 Monate sind
                      empfehlenswert
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary font-bold flex-shrink-0">✓</span>
                    <span>
                      <strong>Neukundenbonus:</strong> Viele Anbieter bieten Wechselboni, die die Gesamtkosten senken
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary font-bold flex-shrink-0">✓</span>
                    <span>
                      <strong>Abschlag und Kündigungsfristen:</strong> Prüfen Sie die Höhe der monatlichen Abschläge und die
                      Kündigungsfrist zum Vertragsende
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Häufige Fehler beim Stromwechsel</h3>
                <ul className="font-paragraph text-gray-700 space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-secondary font-bold flex-shrink-0">✗</span>
                    <span>
                      <strong>Nur auf den Preis schauen:</strong> Der niedrigste Preis ist nicht immer die beste Wahl – achten Sie
                      auch auf Laufzeit, Preisgarantie und Kündigungsfristen
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary font-bold flex-shrink-0">✗</span>
                    <span>
                      <strong>Verbrauch falsch eingeben:</strong> Ein falscher Verbrauch führt zu unrealistischen Tarifangeboten –
                      überprüfen Sie die Zahl auf Ihrer Rechnung
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary font-bold flex-shrink-0">✗</span>
                    <span>
                      <strong>Kündigungsfristen ignorieren:</strong> Verpassen Sie nicht die Kündigungsfrist beim alten Anbieter –
                      wir kümmern uns darum, aber informieren Sie sich selbst
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Stromvergleich speziell für Düsseldorf</h3>
                <p className="font-paragraph text-gray-700 mb-4">
                  Düsseldorf ist mit über 600.000 Einwohnern eine der größten Städte Deutschlands und Landeshauptstadt von Nordrhein-
                  Westfalen. Die Stadt hat eine vielfältige Strommarkt-Landschaft mit mehreren Netzgebieten und Stromanbietern. Die
                  Strompreise variieren je nach Postleitzahl und Netzbetreiber – in der Altstadt (40213) können die Tarife anders
                  ausfallen als in Düsseldorf-Gerresheim (40625) oder Düsseldorf-Benrath (40597). Unser Vergleich berücksichtigt diese
                  regionalen Unterschiede und zeigt Ihnen die besten Tarife speziell für Ihren Standort in Düsseldorf.
                </p>
                <p className="font-paragraph text-gray-700 mb-4">
                  Düsseldorf ist bekannt für seine wirtschaftliche Stärke und als Finanzplatz. Dies führt zu einer hohen Nachfrage nach
                  Stromtarifen und vielen Angeboten von verschiedenen Anbietern. Besonders für Neubau- und Renovierungsprojekte in
                  Düsseldorf gibt es spezielle Tarife. Nutzen Sie unseren Vergleichsrechner, um die besten Konditionen für Ihre Situation
                  zu finden.
                </p>
              </div>

              <div className="bg-secondary/10 border-l-4 border-secondary p-6 rounded">
                <p className="font-paragraph text-gray-700 italic">
                  Jetzt kostenlos vergleichen und sparen Sie ab sofort bei Ihren Stromkosten in Düsseldorf!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Düsseldorf Grundversorgung Section */}
        <section className="w-full py-24 bg-background">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-6">
                  Düsseldorfer Grundversorgung: Stadtwerke Düsseldorf und Alternativen
                </h2>

                <p className="font-paragraph text-lg text-gray-700 mb-6">
                  Stadtwerke Düsseldorf ist der Grundversorger für Düsseldorf und die unmittelbare Region. Als Grundversorger ist
                  Stadtwerke Düsseldorf verpflichtet, jeden Haushalt mit Strom zu versorgen – unabhängig davon, ob Sie aktiv einen Vertrag
                  abgeschlossen haben oder nicht. Dies ist ein wichtiger Schutzmechanismus für Verbraucher, garantiert aber nicht
                  automatisch die günstigsten Preise.
                </p>

                <p className="font-paragraph text-lg text-gray-700 mb-6">
                  Die Grundversorgungstarife von Stadtwerke Düsseldorf setzen sich aus mehreren Komponenten zusammen: dem Arbeitspreis
                  (€/kWh), der Grundgebühr (€/Monat) und den Netzentgelte. Diese Tarife sind oft höher als Sondertarife bei anderen
                  Anbietern, weshalb ein Wechsel für viele Düsseldorfer Haushalte sinnvoll ist. Mit unserem Vergleichsrechner können Sie
                  schnell sehen, wie viel Sie durch einen Wechsel sparen können.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Kündigungsfristen in Düsseldorf</h3>
                <p className="font-paragraph text-gray-700 mb-4">
                  Die Kündigungsfristen sind ein wichtiger Faktor beim Stromwechsel. Bei der Grundversorgung von Stadtwerke Düsseldorf
                  beträgt die Kündigungsfrist 2 Wochen zum Ende eines Kalendermonats. Das bedeutet: Wenn Sie Ihren Vertrag am 15. Januar
                  kündigen, endet dieser am 31. Januar. Dies ist eine der kürzeren Fristen und bietet Ihnen Flexibilität.
                </p>
                <p className="font-paragraph text-gray-700 mb-4">
                  Bei Sondertarifen anderer Anbieter liegt die Kündigungsfrist meist bei 4 Wochen zum Ende eines Kalendermonats. Achten
                  Sie auf die genaue Kündigungsfrist in Ihrem Vertrag – diese finden Sie in den Vertragsbedingungen oder auf Ihrer
                  Rechnung. Besonders wichtig: Wenn Sie einen Vertrag mit längerer Laufzeit (z.B. 24 Monate) abschließen, können Sie
                  diesen oft nur zum Ende der Laufzeit kündigen, es sei denn, es gibt ein Sonderkündigungsrecht (z.B. bei Preiserhöhungen).
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Umzugsszenarien in Düsseldorf</h3>
                <p className="font-paragraph text-gray-700 mb-4">
                  Düsseldorf ist eine dynamische Stadt mit vielen Menschen, die umziehen. Wenn Sie in Düsseldorf umziehen, sollten Sie
                  Ihren Stromvertrag rechtzeitig (mindestens 4 Wochen vorher) kündigen oder einen neuen Tarif für die neue Adresse
                  abschließen. Nutzen Sie unseren Vergleichsrechner mit Ihrer neuen Postleitzahl, um die besten Tarife für Ihre neue
                  Wohnung zu finden.
                </p>
                <p className="font-paragraph text-gray-700 mb-4">
                  Wichtig: Die Stromversorgung wird bei einem Umzug nicht unterbrochen. Wenn Sie keinen neuen Vertrag abschließen,
                  werden Sie automatisch von Stadtwerke Düsseldorf in der Grundversorgung beliefert. Dies ist zwar sicher, aber oft teurer
                  als ein Sondertarif. Daher empfehlen wir, rechtzeitig einen neuen Tarif zu suchen. Besonderheit in Düsseldorf: Je nach
                  Stadtteil (z.B. Düsseldorf-Benrath, Düsseldorf-Gerresheim, Düsseldorf-Pempelfort) können unterschiedliche Netzbetreiber
                  zuständig sein, was zu unterschiedlichen Tarifoptionen führt.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Besonderheiten der Düsseldorfer Strommarkt</h3>
                <ul className="font-paragraph text-gray-700 space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-secondary font-bold flex-shrink-0">•</span>
                    <span>
                      <strong>Mehrere Netzgebiete:</strong> Düsseldorf hat mehrere Netzgebiete mit unterschiedlichen Netzbetreibern,
                      was zu unterschiedlichen Tarifoptionen führt
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary font-bold flex-shrink-0">•</span>
                    <span>
                      <strong>Stadtwerke-Dominanz:</strong> Stadtwerke Düsseldorf ist der größte Anbieter in Düsseldorf und oft auch
                      der Grundversorger
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary font-bold flex-shrink-0">•</span>
                    <span>
                      <strong>Ökostrom-Optionen:</strong> Düsseldorf hat eine starke Nachfrage nach Ökostrom, weshalb viele Anbieter
                      grüne Tarife anbieten
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary font-bold flex-shrink-0">•</span>
                    <span>
                      <strong>Wechselbonus:</strong> Viele Anbieter bieten Wechselboni für Neukunden in Düsseldorf an
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary font-bold flex-shrink-0">•</span>
                    <span>
                      <strong>Preisgarantie:</strong> Achten Sie auf die Dauer der Preisgarantie – in Düsseldorf sind 12-24 Monate
                      üblich
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 border-l-4 border-primary p-6 rounded">
                <h4 className="font-heading font-bold text-primary mb-3">Tipp für Düsseldorfer Haushalte:</h4>
                <p className="font-paragraph text-gray-700">
                  Nutzen Sie unseren Vergleichsrechner regelmäßig – mindestens einmal pro Jahr. Die Strompreise ändern sich ständig, und
                  durch einen rechtzeitigen Wechsel können Sie hunderte Euro pro Jahr sparen. Besonders nach Preiserhöhungen von
                  Stadtwerke Düsseldorf lohnt sich ein Vergleich, da Sie oft ein Sonderkündigungsrecht haben.
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
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-primary mb-4">Warum wechseln?</h2>
              <p className="font-paragraph text-lg text-gray-600 max-w-2xl mx-auto">
                Das bringt Ihnen ein Tarifwechsel – klar & einfach erklärt.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Zap,
                  title: 'Schnell & unkompliziert',
                  description: 'Alle günstigen Tarife auf einen Blick.',
                },
                {
                  icon: Globe,
                  title: 'Unabhängig & neutral',
                  description: 'Ergebnisse ohne Anbieter-Bias.',
                },
                {
                  icon: DollarSign,
                  title: 'Kostenlos für Sie',
                  description: 'Unser Service kostet Sie keinen Cent.',
                },
                {
                  icon: MapPin,
                  title: 'Lokal für Düsseldorf',
                  description: 'Speziell für Düsseldorfer Haushalte.',
                },
                {
                  icon: BarChart3,
                  title: 'Individuell passend',
                  description: 'Tarife abgestimmt auf Ihren Verbrauch.',
                },
                {
                  icon: Rocket,
                  title: 'Sofort entscheidbar',
                  description: 'Direkte Weiterleitung zum Anbieter.',
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
                          <h3 className="font-heading font-semibold text-lg text-primary mb-2">{item.title}</h3>
                          <p className="font-paragraph text-base text-gray-600 leading-relaxed">{item.description}</p>
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
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative">
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
              <li>
                <strong>Postleitzahl und Verbrauch eingeben:</strong> Nutzen Sie unseren Vergleichsrechner mit Ihren Basisdaten.
              </li>
              <li>
                <strong>Tarife vergleichen:</strong> Sehen Sie alle verfügbaren Angebote sortiert nach Preis und Konditionen.
              </li>
              <li>
                <strong>Wunsch-Tarif wählen:</strong> Entscheiden Sie sich für den Tarif, der am besten zu Ihnen passt.
              </li>
              <li>
                <strong>Angebot anfordern:</strong> Kontaktieren Sie den Anbieter oder lassen Sie sich von uns beraten.
              </li>
              <li>
                <strong>Wechsel abschließen:</strong> Wir kümmern uns um die Kündigung und den Wechsel – kostenlos und sicher.
              </li>
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
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary mb-6">Warum energievergleich.shop?</h2>
              <div className="space-y-4 font-paragraph text-gray-700 leading-relaxed">
                <p>
                  Bei energievergleich.shop vergleichen Sie Stromtarife völlig transparent und unabhängig. Wir sind nicht an einen
                  Anbieter gebunden und zeigen Ihnen alle verfügbaren Optionen in Ihrer Region – sortiert nach Preis und
                  Vertragsbedingungen. Unser Service ist für Sie kostenlos: Wir verdienen kein Geld mit Ihrem Wechsel, sondern nur durch
                  Provisionen von Anbietern, die Sie selbst gewählt haben.
                </p>
                <p>
                  Wir vergleichen nicht nur Preise, sondern auch Laufzeiten, Preisgarantien und Kündigungsfristen. So finden Sie den
                  Tarif, der wirklich zu Ihnen passt – nicht nur der billigste. Alle Informationen auf dieser Seite sind aktuell und
                  wurden zuletzt im Februar 2026 überprüft.
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
                  q: 'Wer ist der Grundversorger in Düsseldorf?',
                  a: 'Stadtwerke Düsseldorf ist der Grundversorger für Düsseldorf und die Region. Als Grundversorger ist Stadtwerke Düsseldorf verpflichtet, jeden Haushalt mit Strom zu versorgen, auch wenn dieser nicht aktiv einen Vertrag abgeschlossen hat.',
                },
                {
                  q: 'Wie setzt sich der Grundversorgungstarif in Düsseldorf zusammen?',
                  a: 'Der Grundversorgungstarif in Düsseldorf wird von Stadtwerke Düsseldorf als Grundversorger festgelegt. Er setzt sich aus dem Arbeitspreis (€/kWh), der Grundgebühr (€/Monat) und den Netzentgelte zusammen. Stadtwerke Düsseldorf ist verpflichtet, alle Haushalte in Düsseldorf mit Strom zu versorgen.',
                },
                {
                  q: 'Wie lange sind die Kündigungsfristen in Düsseldorf?',
                  a: 'Bei der Grundversorgung von Stadtwerke Düsseldorf beträgt die Kündigungsfrist 2 Wochen zum Ende eines Kalendermonats. Bei Sondertarifen anderer Anbieter liegt die Frist meist bei 4 Wochen zum Monatsende.',
                },
                {
                  q: 'Was muss ich beim Umzug in Düsseldorf beachten?',
                  a: 'Bei einem Umzug in Düsseldorf sollten Sie Ihren Stromvertrag rechtzeitig (mindestens 4 Wochen vorher) kündigen oder einen neuen Tarif für die neue Adresse abschließen. Nutzen Sie unseren Vergleichsrechner mit Ihrer neuen Postleitzahl.',
                },
                {
                  q: 'Wie viel kann ich durch einen Stromwechsel in Düsseldorf sparen?',
                  a: 'Die Einsparungen variieren je nach Ihrem Verbrauch. Im Durchschnitt sparen Düsseldorfer Haushalte 200-400 Euro pro Jahr durch einen Wechsel zu einem günstigeren Anbieter.',
                },
              ].map((item, index) => (
                <Accordion key={index} type="single" collapsible className="bg-white rounded-lg border">
                  <AccordionItem value={`item-${index}`} className="border-none">
                    <AccordionTrigger className="font-heading font-bold text-lg hover:text-primary px-6 py-4">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="font-paragraph text-gray-600 px-6 pb-4">{item.a}</AccordionContent>
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
        <PassendeRatgeber moneyPageId="stromvergleich-duesseldorf" limit={4} />

        {/* Related Pages - Cross-Linking */}
        <RelatedPages pages={getRelatedPages('/stromvergleich-duesseldorf')} />

        <RelatedCities currentCity="duesseldorf" />
      </div>
    </StromvergleichCityLayout>
  );
}
