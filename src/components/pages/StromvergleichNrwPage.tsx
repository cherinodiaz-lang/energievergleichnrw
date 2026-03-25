import { useState, useEffect, type SyntheticEvent } from 'react';
import { motion } from 'framer-motion';
import { Zap, CheckCircle, Send, ArrowRight, AlertCircle, Globe, DollarSign, MapPin, BarChart3, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
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
import { getRelatedPages } from '@/lib/internal-linking';

interface StromvergleichExampleStateProps {
  postcode: string;
  annualConsumption: number;
  usedDefaultConsumption: boolean;
}

export function StromvergleichExampleState({
  postcode,
  annualConsumption,
  usedDefaultConsumption,
}: StromvergleichExampleStateProps) {
  const formattedConsumption = annualConsumption.toLocaleString('de-DE');

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-700" />
          <div className="space-y-2">
            <p className="font-heading text-lg font-semibold text-amber-900">Beispielmodus</p>
            <p className="font-paragraph text-sm text-amber-950 sm:text-base">
              Aktuell ist auf dieser Seite keine Live-Tarifquelle aktiv. Deshalb zeigen wir hier keine echten
              Anbieter, Tarifnamen oder Wechselpreise an.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="h-full border-gray-200">
          <CardHeader>
            <CardTitle className="font-heading text-xl text-primary">Ihre Eingaben im Überblick</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <dl className="space-y-3 text-sm text-gray-700 sm:text-base">
              <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-3">
                <dt className="font-semibold text-primary">Postleitzahl</dt>
                <dd>{postcode}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="font-semibold text-primary">Verbrauch für diese Ansicht</dt>
                <dd>{formattedConsumption} kWh/Jahr</dd>
              </div>
            </dl>

            {usedDefaultConsumption && (
              <p className="rounded-lg bg-blue-50 p-3 text-sm text-gray-700">
                Für diese Beispielansicht verwenden wir 3.500 kWh/Jahr, weil kein Jahresverbrauch eingetragen wurde.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="h-full border-gray-200">
          <CardHeader>
            <CardTitle className="font-heading text-xl text-primary">So geht es ehrlich weiter</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3 text-sm text-gray-700 sm:text-base">
              <li>• Diese Seite zeigt aktuell nur eine unverbindliche Beispielansicht.</li>
              <li>• Für echte Tarifoptionen ist derzeit eine individuelle Prüfung nötig.</li>
              <li>• Wenn Sie Hilfe möchten, kontaktieren Sie uns für den nächsten Schritt.</li>
            </ul>

            <Link to={ROUTES.kontakt} className="inline-flex">
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                Kontakt aufnehmen
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function StromvergleichNrwPage() {
  const [formData, setFormData] = useState({
    postleitzahl: '',
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
            text: 'Unsere Beratung und Erstorientierung sind kostenlos. Ob und wie ein Anbieterwechsel durchgeführt wird, hängt vom ausgewählten Angebot und dem jeweiligen Prozess ab.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie lange dauert ein Stromwechsel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Die tatsächliche Dauer hängt vom gewählten Anbieter und Ihrer Vertragssituation ab. Eine Unterbrechung der Stromversorgung ist dabei in der Regel nicht zu erwarten.'
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
            text: 'Für die Erstorientierung genügen Postleitzahl und jährlicher Stromverbrauch in kWh, optional auch die Zählernummer.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie viel kann ich durch einen Stromwechsel sparen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Mögliche Einsparungen hängen von Verbrauch, Region und Tarifdetails ab. Die Seite zeigt zunächst eine unverbindliche Beispielvorschau.'
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
            text: 'Geben Sie Postleitzahl und Stromverbrauch ein. Der Rechner zeigt eine Beispielvorschau mit typischen Kennzahlen wie Arbeitspreis, Grundpreis, Laufzeit und Preisgarantie.'
          }
        },
        {
          '@type': 'Question',
          name: 'Gibt es versteckte Gebühren beim Wechsel?',
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
              Erhalten Sie eine unverbindliche Tarif-Orientierung für Ihre Region. Kostenlos und transparent.
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
                  <h2 className="font-heading text-2xl font-bold text-primary mb-8">Beispielstatus für {formData.postleitzahl}</h2>

                  <StromvergleichExampleState
                    postcode={formData.postleitzahl}
                    annualConsumption={calculatedConsumption}
                    usedDefaultConsumption={!formData.verbrauch.trim()}
                  />
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
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">Kurz erklärt: Stromvergleich für NRW</h2>
              
              <p className="font-paragraph text-lg text-gray-700 mb-6">
                Mit unserem Stromvergleich erhalten Sie in wenigen Minuten eine erste Tarif-Orientierung für Nordrhein-Westfalen. Die Vorschau ist kostenlos und unverbindlich: Sie geben Postleitzahl und Stromverbrauch ein und sehen Beispielwerte als Grundlage für Ihre weitere Entscheidung.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">So funktioniert der Vergleich – 5 einfache Schritte</h3>
              <ol className="font-paragraph text-gray-700 space-y-3 mb-6 list-decimal list-inside">
                <li><strong>Postleitzahl eingeben:</strong> Geben Sie Ihre PLZ ein, um Tarife für Ihren Netzbereich zu sehen</li>
                <li><strong>Stromverbrauch angeben:</strong> Tragen Sie Ihren jährlichen Verbrauch in kWh ein (zu finden auf der Stromrechnung)</li>
                <li><strong>Tarife vergleichen:</strong> Sehen Sie Beispielangebote mit Preis, Laufzeit und Preisgarantie</li>
                <li><strong>Wunsch-Tarif wählen:</strong> Entscheiden Sie sich für den besten Tarif nach Ihren Kriterien</li>
                <li><strong>Anfrage abschließen:</strong> Senden Sie Ihre Anfrage für eine konkrete Rückmeldung zum weiteren Vorgehen</li>
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
                  <span><strong>Kündigungsfristen ignorieren:</strong> Verpassen Sie nicht die Kündigungsfrist beim alten Anbieter und prüfen Sie Ihre Vertragsdetails</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">Stromvergleich speziell für NRW</h3>
              <p className="font-paragraph text-gray-700 mb-4">
                Nordrhein-Westfalen ist das bevölkerungsreichste Bundesland Deutschlands mit großer Vielfalt bei Stromanbietern und Tarifen. Die Strompreise variieren je nach Postleitzahl und Netzbetreiber – in Düsseldorf können die Tarife anders ausfallen als in Köln, Essen oder Dortmund. Unsere Vorschau hilft bei einer ersten regionalen Einordnung für Ihren Standort in NRW.
              </p>
            </div>

            <div className="bg-secondary/10 border-l-4 border-secondary p-6 rounded">
              <p className="font-paragraph text-gray-700 italic">
                Jetzt unverbindlich orientieren und passende nächste Schritte für Ihren Stromvertrag prüfen.
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
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Anfrage abschließen</h3>
                <p className="font-paragraph text-gray-600">
                  Wählen Sie einen passenden Tarif als Grundlage und senden Sie Ihre Anfrage für die nächsten Schritte.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Snippet Section */}
      <section className="w-full py-24 bg-white">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <h3 className="font-heading text-2xl font-bold text-primary mb-8">Stromanbieter-Orientierung in 5 Schritten</h3>
          <ol className="font-paragraph text-gray-700 space-y-4 list-decimal list-inside">
            <li><strong>Postleitzahl und Verbrauch eingeben:</strong> Nutzen Sie unseren Vergleichsrechner mit Ihren Basisdaten.</li>
            <li><strong>Tarife vergleichen:</strong> Sehen Sie Beispielangebote sortiert nach Preis und Konditionen.</li>
            <li><strong>Wunsch-Tarif wählen:</strong> Entscheiden Sie sich für den Tarif, der am besten zu Ihnen passt.</li>
            <li><strong>Angebot anfordern:</strong> Kontaktieren Sie den Anbieter oder lassen Sie sich von uns beraten.</li>
            <li><strong>Anfrage abschließen:</strong> Sie erhalten eine konkrete Rückmeldung zum weiteren Ablauf.</li>
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
                Bei energievergleich.shop erhalten Sie eine transparente und unabhängige Erstorientierung zu Stromtarifen. Wir zeigen Beispielwerte als Grundlage für Ihre Entscheidung und unterstützen Sie bei der nächsten Kontaktaufnahme.
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
                a: 'Unsere Erstorientierung ist kostenlos. Ob und welche Kosten beim späteren Tarif entstehen, richtet sich nach dem gewählten Anbieterangebot.'
              },
              {
                q: 'Wie lange dauert ein Stromwechsel?',
                a: 'Die Dauer hängt vom gewählten Anbieter und Ihrer Vertragssituation ab. Eine Unterbrechung der Stromversorgung ist in der Regel nicht zu erwarten.'
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
