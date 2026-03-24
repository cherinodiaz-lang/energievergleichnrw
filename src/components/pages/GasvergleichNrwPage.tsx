import { useState, useEffect, type SyntheticEvent } from 'react';
import { motion } from 'framer-motion';
import { Flame, CheckCircle, Send, ArrowRight, Globe, DollarSign, MapPin, BarChart3, Rocket, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import NativeSelect from '@/components/ui/native-select';
import Header from '@/components/Header';
import DeferredFooter from '@/components/DeferredFooter';
import SEOHead from '@/components/SEOHead';
import PassendeRatgeber from '@/components/PassendeRatgeber';
import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import RelatedPages from '@/components/RelatedPages';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';
import { getPageSEO } from '@/lib/seo-config';
import { validateFormFields, FORM_CONFIGS } from '@/lib/form-validation';
import { trackMethodikClick } from '@/services/form-submission';
import { getRelatedPages } from '@/lib/internal-linking';

export default function GasvergleichNrwPage() {
  const [formData, setFormData] = useState({
    postleitzahl: '',
    wohnfläche: '',
    verbrauch: '',
    name: '',
    email: '',
    phone: '',
  });
  const [showResults, setShowResults] = useState(false);
  const [calculatedConsumption, setCalculatedConsumption] = useState(0);
  const [, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Wie oft kann ich meinen Gasanbieter wechseln?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sie können Ihren Gasanbieter jederzeit wechseln, sofern Sie die Kündigungsfrist einhalten. Bei den meisten Verträgen beträgt diese 4 Wochen zum Ende eines Kalendermonats. Nach einem Wechsel können Sie frühestens nach 12 Monaten erneut wechseln.'
          }
        },
        {
          '@type': 'Question',
          name: 'Ist der Gaswechsel in NRW kostenlos?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Unsere Beratung und Erstorientierung sind kostenlos. Ob und wie ein Anbieterwechsel durchgeführt wird, hängt vom ausgewählten Angebot und dem jeweiligen Prozess ab.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie lange dauert ein Gaswechsel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Die tatsächliche Dauer hängt vom gewählten Anbieter und Ihrer Vertragssituation ab. Eine Unterbrechung der Gasversorgung ist dabei in der Regel nicht zu erwarten.'
          }
        },
        {
          '@type': 'Question',
          name: 'Kann ich während eines Wechsels ohne Gas sein?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nein, das ist nicht möglich. Ihre Gasversorgung ist gesetzlich geschützt und wird nicht unterbrochen. Selbst wenn es zu Verzögerungen kommt, springt der Grundversorger ein und beliefert Sie mit Gas.'
          }
        },
        {
          '@type': 'Question',
          name: 'Welche Daten benötige ich für einen Gaswechsel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Für die Erstorientierung genügen Postleitzahl sowie Wohnfläche oder jährlicher Gasverbrauch in kWh.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie viel kann ich durch einen Gaswechsel sparen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Mögliche Einsparungen hängen von Verbrauch, Region und Tarifdetails ab. Die Seite zeigt zunächst eine unverbindliche Beispielvorschau.'
          }
        },
        {
          '@type': 'Question',
          name: 'Sind Biogas-Tarife teurer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nein, nicht unbedingt. Es gibt mittlerweile viele Biogas-Tarife, die genauso günstig oder sogar günstiger sind als konventionelle Tarife. Mit unserem Vergleichsrechner können Sie gezielt nach nachhaltigen Optionen filtern.'
          }
        },
        {
          '@type': 'Question',
          name: 'Was ist eine Preisgarantie bei Gas?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Eine Preisgarantie bedeutet, dass der Gaspreis für einen bestimmten Zeitraum nicht erhöht wird, auch wenn die Marktpreise steigen. Dies gibt Ihnen Planungssicherheit. Beachten Sie: Steuern und Abgaben können trotzdem erhöht werden.'
          }
        },
        {
          '@type': 'Question',
          name: 'Kann ich meinen Gasvertrag vorzeitig kündigen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Die Möglichkeit zur vorzeitigen Kündigung hängt von Ihrem Vertrag ab. Viele Anbieter erlauben eine Kündigung mit 4 Wochen Frist zum Ende eines Kalendermonats. Einige Verträge haben auch Sonderkündigungsrechte bei Preiserhöhungen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie funktioniert der Gasvergleichsrechner?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Geben Sie Postleitzahl und Wohnfläche oder Verbrauch ein. Der Rechner zeigt eine Beispielvorschau mit typischen Kennzahlen wie Arbeitspreis, Grundpreis, Laufzeit und Preisgarantie.'
          }
        },
        {
          '@type': 'Question',
          name: 'Gibt es versteckte Gebühren beim Gaswechsel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Unsere Erstorientierung ist kostenlos. Verbindliche Kosten entstehen nur aus dem später gewählten Tarif beim Anbieter.'
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

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate required fields for private form
    const validation = validateFormFields(formData, FORM_CONFIGS.private);
    if (!validation.valid) {
      setFormErrors(validation.errors);
      return;
    }

    setFormErrors({});

    // Calculate consumption based on living area or use custom value
    let consumption = 0;
    if (formData.verbrauch && parseInt(formData.verbrauch) > 0) {
      consumption = parseInt(formData.verbrauch);
    } else {
      const areaMap: { [key: string]: number } = {
        '50': 5000,
        '100': 10000,
        '150': 15000,
        '200': 20000,
      };
      consumption = areaMap[formData.wohnfläche] || 15000;
    }

    setCalculatedConsumption(consumption);
    setShowResults(true);
  };

  const seo = getPageSEO('gasvergleich');

  const breadcrumbItems = [
    { label: 'Startseite', path: '/' },
    { label: 'Gasvergleich NRW', path: '/gasvergleich-nrw' },
  ];

  const breadcrumbSchema = [
    { name: 'Startseite', url: `${typeof window !== 'undefined' ? window.location.origin : ''}${ROUTES.home}` },
    { name: 'Gasvergleich NRW', url: `${typeof window !== 'undefined' ? window.location.origin : ''}${ROUTES.gasvergleich}` },
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

      {/* Hero Section */}
      <section className="w-full bg-primary text-primary-foreground py-20 md:py-32">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 leading-tight max-w-[22ch] sm:max-w-none break-words">
              Gasvergleich für NRW
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
              Erhalten Sie eine unverbindliche Tarif-Orientierung für Ihre Region. Kostenlos und transparent.
            </p>
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => document.getElementById('vergleich')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-14 px-8 rounded-full text-lg font-semibold shadow-lg"
              >
                Zur Orientierung starten
              </Button>
              <Link to="/methodik" onClick={trackMethodikClick} className="text-white/80 hover:text-white transition-colors text-sm font-medium underline">
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
                  <CardTitle className="font-heading text-2xl">Gastarif-Orientierung</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
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
                          className="font-paragraph"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="wohnflaeche" className="font-paragraph">Wohnfläche (m²) *</Label>
                        <NativeSelect
                          id="wohnflaeche"
                          value={formData.wohnfläche}
                          onValueChange={(value) => setFormData({ ...formData, wohnfläche: value })}
                          options={[
                            { value: '50', label: 'bis 50 m² (ca. 5.000 kWh)' },
                            { value: '100', label: '50-100 m² (ca. 10.000 kWh)' },
                            { value: '150', label: '100-150 m² (ca. 15.000 kWh)' },
                            { value: '200', label: 'über 150 m² (ca. 20.000 kWh)' },
                          ]}
                          placeholder="Wählen Sie..."
                          required
                          className="font-paragraph"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="verbrauch" className="font-paragraph">Jahresverbrauch (kWh) <span className="text-gray-400 text-sm">(optional)</span></Label>
                      <Input
                        id="verbrauch"
                        type="number"
                        placeholder="z.B. 15000"
                        value={formData.verbrauch}
                        onChange={(e) => setFormData({ ...formData, verbrauch: e.target.value })}
                        className="font-paragraph"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="font-paragraph">Name *</Label>
                        <Input
                          id="name"
                          placeholder="Max Mustermann"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="font-paragraph"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-paragraph">E-Mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="max@beispiel.de"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="font-paragraph"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="font-paragraph">Telefon</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+49 211 1234 5678"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="font-paragraph"
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 font-bold text-lg rounded-lg">
                      <Send className="w-5 h-5 mr-2" />
                      Orientierung anzeigen
                    </Button>
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
                        pricePerKwh: 0.08,
                        baseFee: 18.50,
                      },
                      {
                        name: 'Tarif Option B',
                        pricePerKwh: 0.075,
                        baseFee: 22.00,
                      },
                      {
                        name: 'Tarif Option C',
                        pricePerKwh: 0.07,
                        baseFee: 25.50,
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
                              <Link to={ROUTES.KONTAKT} className="w-full">
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
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="font-heading font-bold text-primary mb-4">Warum diese Orientierung nutzen?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-sm">100% unabhängig und kostenlos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-sm">Unverbindliche Orientierung für NRW</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-sm">Transparente Tarifdetails</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-sm">Begleitung ab der Anfrage</span>
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
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">Kurz erklärt: Gasvergleich für NRW</h2>
              
              <p className="font-paragraph text-lg text-gray-700 mb-6">
                Mit unserer Gas-Tariforientierung erhalten Sie in wenigen Minuten eine erste Einordnung für Nordrhein-Westfalen. Die Vorschau ist kostenlos und unverbindlich: Sie geben Postleitzahl und Gasverbrauch ein und sehen Beispielwerte als Grundlage für Ihre weitere Entscheidung.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">So funktioniert die Orientierung – 5 einfache Schritte</h3>
              <ol className="font-paragraph text-gray-700 space-y-3 mb-6 list-decimal list-inside">
                <li><strong>Postleitzahl eingeben:</strong> Geben Sie Ihre PLZ ein, um Beispielwerte für Ihren Netzbereich zu sehen</li>
                <li><strong>Wohnfläche oder Verbrauch angeben:</strong> Tragen Sie Ihre Wohnfläche ein oder geben Sie Ihren jährlichen Verbrauch in kWh an (zu finden auf der Gasrechnung)</li>
                <li><strong>Beispielübersicht ansehen:</strong> Sehen Sie Beispielangebote mit Preis, Laufzeit und Preisgarantie</li>
                <li><strong>Optionen einordnen:</strong> Ordnen Sie die gezeigten Beispielangebote nach Ihren Kriterien ein</li>
                <li><strong>Unverbindliche Anfrage senden:</strong> Senden Sie Ihre Anfrage für eine Rückmeldung zum weiteren Vorgehen</li>
              </ol>
            </div>

            <div>
              <h3 className="font-heading text-xl font-bold text-primary mb-4">Gasanbieter-Orientierung in 5 Schritten</h3>
              <ol className="font-paragraph text-gray-700 space-y-3 mb-6 list-decimal list-inside">
                <li><strong>Aktuelle Gasrechnung bereitstellen:</strong> Suchen Sie Ihre letzte Gasrechnung heraus, um Ihren Verbrauch und Ihre Zählernummer zu finden.</li>
                <li><strong>Optionen prüfen:</strong> Nutzen Sie unseren Rechner für eine erste Orientierung zu passenden Optionen.</li>
                <li><strong>Anfrage senden:</strong> Geben Sie Ihre Daten ein und senden Sie eine unverbindliche Anfrage für die nächsten Schritte.</li>
                <li><strong>Vertragsfristen prüfen:</strong> Prüfen Sie Ihre Vertragsfristen und Details beim aktuellen Anbieter.</li>
                <li><strong>Rückmeldung erhalten:</strong> Danach erhalten Sie Informationen zum weiteren Ablauf.</li>
              </ol>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">Welche Angaben du brauchst</h3>
              <ul className="font-paragraph text-gray-700 space-y-2 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">•</span>
                  <span><strong>Postleitzahl:</strong> Bestimmt Ihren Gasnetzbetreiber und verfügbare Tarife</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">•</span>
                  <span><strong>Wohnfläche oder Jahresverbrauch in kWh:</strong> Finden Sie auf Ihrer letzten Gasrechnung unter „Verbrauch\"</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">•</span>
                  <span><strong>Zählernummer (optional):</strong> Hilft bei der genauen Tarifberechnung</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">•</span>
                  <span><strong>Name und E-Mail:</strong> Für die Rückmeldung zu Ihrer Anfrage</span>
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
                  <span><strong>Bonus:</strong> Viele Anbieter bieten Wechselboni, die die Gesamtkosten senken</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">✓</span>
                  <span><strong>Abschlag und Kündigungsfristen:</strong> Prüfen Sie die Höhe der monatlichen Abschläge und die Kündigungsfrist zum Vertragsende</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">Häufige Fehler beim Gaswechsel</h3>
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
                  <span><strong>Kündigungsfristen ignorieren:</strong> Verpassen Sie nicht die Kündigungsfrist beim alten Anbieter und prüfen Sie Ihre Vertragsdetails</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">Gasvergleich speziell für NRW</h3>
              <p className="font-paragraph text-gray-700 mb-4">
                Nordrhein-Westfalen ist das bevölkerungsreichste Bundesland Deutschlands mit großer Vielfalt bei Gasanbietern und Tarifen. Die Gaspreise variieren je nach Postleitzahl und Netzbetreiber – in Düsseldorf können die Tarife anders ausfallen als in Köln, Essen oder Dortmund. Unsere Vorschau hilft bei einer ersten regionalen Einordnung für Ihren Standort in NRW.
              </p>
            </div>

            <div className="bg-secondary/10 border-l-4 border-secondary p-6 rounded">
              <p className="font-paragraph text-gray-700 italic">
                Jetzt unverbindlich orientieren und passende nächste Schritte für Ihren Gasvertrag prüfen.
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
              Warum diese Orientierung?
            </h2>
            <p className="font-paragraph text-lg text-gray-600 max-w-2xl mx-auto">
              Das bringt Ihnen eine unverbindliche Tarif-Einordnung – klar & einfach erklärt.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Flame,
                title: 'Schnell & unkompliziert',
                description: 'Schnelle Erstorientierung auf einen Blick.'
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
                title: 'Nächste Schritte klar',
                description: 'Konkrete Rückmeldung nach Ihrer Anfrage.'
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
            So funktioniert die Gas-Tariforientierung
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
                  Geben Sie Ihre Postleitzahl und Ihre Wohnfläche ein. Das dauert nur wenige Sekunden.
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
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Beispielangebote einordnen</h3>
                <p className="font-paragraph text-gray-600">
                  Sehen Sie eine Beispielvorschau mit Preis, Laufzeit und Preisgarantie auf einen Blick.
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
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Unverbindliche Anfrage senden</h3>
                <p className="font-paragraph text-gray-600">
                  Markieren Sie eine passende Option als Grundlage und senden Sie Ihre Anfrage für die nächsten Schritte.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gasanbieter-Orientierung in 5 Schritten Section */}
      <section className="w-full py-24 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary mb-12 text-center">
            Gas-Tariforientierung in 5 Schritten
          </h2>

          <div className="max-w-3xl mx-auto">
            <ol className="space-y-6">
              {[
                {
                  step: 1,
                  title: 'Gasrechnung bereitstellen',
                  description: 'Suchen Sie Ihre letzte Gasrechnung heraus. Sie benötigen Ihren jährlichen Gasverbrauch in kWh und Ihre Zählernummer.'
                },
                {
                  step: 2,
                  title: 'Beispielangebote ansehen',
                  description: 'Nutzen Sie unseren Orientierungsrechner. Geben Sie Ihre Postleitzahl und Ihren Verbrauch ein und sehen Sie eine Beispielvorschau.'
                },
                {
                  step: 3,
                  title: 'Passende Option vormerken',
                  description: 'Ordnen Sie Preis, Laufzeit und Preisgarantie ein und markieren Sie eine passende Option zur Orientierung.'
                },
                {
                  step: 4,
                  title: 'Anfrage senden',
                  description: 'Geben Sie Ihre Daten ein und senden Sie eine unverbindliche Anfrage für die nächsten Schritte.'
                },
                {
                  step: 5,
                  title: 'Rückmeldung erhalten',
                  description: 'Danach erhalten Sie Informationen zum weiteren Ablauf.'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-heading font-bold text-lg">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-lg text-primary mb-2">
                      {item.title}
                    </h3>
                    <p className="font-paragraph text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </ol>
          </div>
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
              { title: 'Öko-Optionen', description: 'Biogas-Tarife mit Nachhaltigkeitszertifikaten sind oft günstiger als gedacht.' },
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

      {/* Weiterführende Infos Section */}
      <section className="w-full py-24 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary mb-16 text-center">
            Weiterführende Infos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.a
              href="https://www.energievergleich.shop/stromvergleich-nrw"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                    Stromtarife in NRW vergleichen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">
                    Finden Sie auch passende Stromtarife in Ihrer Region zur unverbindlichen Orientierung.
                  </p>
                  <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-white transition-colors">
                    Zum Stromvergleich <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.a>

            <motion.a
              href="https://www.energievergleich.shop/photovoltaik-nrw"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group"
            >
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                    Photovoltaik-Angebote in NRW
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">
                    Produzieren Sie Ihren eigenen Strom mit einer Solaranlage und werden Sie unabhängig.
                  </p>
                  <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-white transition-colors">
                    Zu Photovoltaik <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.a>

            <motion.a
              href="https://www.energievergleich.shop/gewerbegas"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group"
            >
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                    Gewerbegas für Unternehmen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">
                    Spezielle Gastarife für Gewerbetreibende und Unternehmen mit optimalen Konditionen.
                  </p>
                  <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-white transition-colors">
                    Zu Gewerbegas <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.a>

            <motion.a
              href="https://www.energievergleich.shop/ratgeber/gas"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group"
            >
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                    Ratgeber: Gas sparen & wechseln
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">
                    Umfassende Tipps und Informationen zum Thema Gasvertrag und Kostenplanung.
                  </p>
                  <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-white transition-colors">
                    Zum Ratgeber <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.a>

            <motion.a
              href="https://www.energievergleich.shop/methodik"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="group"
            >
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                    So vergleichen wir: Methodik & Transparenz
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">
                    Erfahren Sie, wie unser Vergleich funktioniert und welche Kriterien wir nutzen.
                  </p>
                  <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-white transition-colors">
                    Zur Methodik <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Trust Section - Warum energievergleich.shop? */}
      <section className="w-full py-24 bg-white border-t">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-primary">
              Warum energievergleich.shop?
            </h2>
            
            <p className="font-paragraph text-lg text-gray-700 leading-relaxed">
              Bei energievergleich.shop erhalten Sie Transparenz und Unabhängigkeit in der Erstorientierung zu Gastarifen. Wir zeigen Beispielwerte nach Preis und Vertragsbedingungen als Grundlage für Ihre Entscheidung. Unser Service ist kostenlos und unverbindlich. Ersparnis hängt von Verbrauch, Region und Tarif ab. Erfahren Sie mehr über unsere Methodik und wie wir arbeiten: <Link to="/methodik" className="text-primary font-semibold hover:underline">So vergleichen wir (Methodik)</Link>. Bei Fragen stehen wir Ihnen jederzeit zur Verfügung – <Link to="/kontakt" className="text-primary font-semibold hover:underline">Kontakt</Link>.
            </p>
            
            <p className="font-paragraph text-sm text-gray-500 italic">
              Stand: Februar 2026
            </p>
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
                q: 'Wie oft kann ich meinen Gasanbieter wechseln?',
                a: 'Sie können jederzeit wechseln, müssen aber die Kündigungsfrist (meist 4 Wochen zum Monatsende) einhalten. Nach einem Wechsel können Sie frühestens nach 12 Monaten erneut wechseln.'
              },
              {
                q: 'Ist der Gaswechsel kostenlos?',
                a: 'Unsere Erstorientierung ist kostenlos. Ob und welche Kosten beim späteren Tarif entstehen, richtet sich nach dem gewählten Anbieterangebot.'
              },
              {
                q: 'Wie lange dauert ein Gaswechsel?',
                a: 'Die Dauer hängt vom gewählten Anbieter und Ihrer Vertragssituation ab. Eine Unterbrechung der Gasversorgung ist in der Regel nicht zu erwarten.'
              },
              {
                q: 'Kann ich während des Wechsels ohne Gas sein?',
                a: 'Nein. Ihre Gasversorgung ist gesetzlich geschützt. Im Notfall springt der Grundversorger ein.'
              },
              {
                q: 'Welche Daten benötige ich für einen Vergleich?',
                a: 'Postleitzahl und Gasverbrauch (in kWh) oder Wohnfläche. Den Verbrauch finden Sie auf Ihrer letzten Rechnung. Optional: Zählernummer.'
              },
              {
                q: 'Sind Biogas-Tarife teurer?',
                a: 'Nein. Es gibt viele Biogas-Tarife, die genauso günstig oder günstiger sind. Mit unserem Rechner können Sie gezielt filtern.'
              },
              {
                q: 'Was ist eine Preisgarantie?',
                a: 'Der Gaspreis wird für einen bestimmten Zeitraum nicht erhöht, auch wenn Marktpreise steigen. Steuern und Abgaben können sich aber ändern.'
              },
              {
                q: 'Kann ich meinen Vertrag vorzeitig kündigen?',
                a: 'Das hängt vom Vertrag ab. Viele erlauben Kündigung mit 4 Wochen Frist. Manche haben Sonderkündigungsrechte bei Preiserhöhungen.'
              },
              {
                q: 'Wie funktioniert der Vergleichsrechner?',
                a: 'Geben Sie Postleitzahl und Verbrauch ein. Der Rechner zeigt eine Beispielvorschau mit Arbeitspreis, Grundpreis, Laufzeit und Garantie.'
              },
              {
                q: 'Gibt es versteckte Gebühren?',
                a: 'Die Erstorientierung auf dieser Seite ist kostenlos. Verbindliche Kosten ergeben sich erst aus einem später gewählten Tarif beim Anbieter.'
              }
            ].map((item, index) => (
              <details key={index} className="group rounded-lg border bg-white">
                <summary className="font-heading cursor-pointer list-none px-6 py-4 text-lg font-bold hover:text-primary">
                  <span>{item.q}</span>
                </summary>
                <div className="px-6 pb-4 font-paragraph text-gray-600">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links Section */}
      <section className="w-full py-16 bg-white border-t">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <h3 className="font-heading text-2xl font-bold text-primary mb-8">Weitere Informationen</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to={ROUTES.STROMVERGLEICH_NRW} className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">Stromvergleich NRW</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">Vergleichen Sie auch Ihre Stromtarife und sparen Sie zusätzlich.</p>
                  <Button variant="outline" size="sm">Mehr erfahren</Button>
                </CardContent>
              </Card>
            </Link>
            <Link to={ROUTES.PHOTOVOLTAIK_NRW} className="group">
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
            <Link to={ROUTES.KONTAKT} className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">Kontakt</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">Haben Sie Fragen? Kontaktieren Sie uns direkt.</p>
                  <Button variant="outline" size="sm">Kontakt aufnehmen</Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Passende Ratgeber */}
      <PassendeRatgeber moneyPageId="gasvergleich-nrw" limit={4} />

      {/* Related Pages - Cross-Linking */}
      <RelatedPages pages={getRelatedPages('/gasvergleich-nrw')} />

      </main>
      <DeferredFooter />
    </div>
  );
}
