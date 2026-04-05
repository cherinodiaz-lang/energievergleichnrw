import { useEffect } from 'react';
import { Flame, CheckCircle, Globe, DollarSign, MapPin, BarChart3, Rocket, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import DeferredFooter from '@/components/DeferredFooter';
import SEOHead from '@/components/SEOHead';
import PassendeRatgeber from '@/components/PassendeRatgeber';
import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import RelatedPages from '@/components/RelatedPages';
import VerivoxCalculatorEmbed from '@/components/VerivoxCalculatorEmbed';
import GasCalculatorForm from '@/components/gas/GasCalculatorForm';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';
import { getPageSEO } from '@/lib/seo-config';
import { trackMethodikClick } from '@/services/form-submission';
import { getRelatedPages } from '@/lib/internal-linking';

export default function GasvergleichNrwPage() {
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
            text: 'Moegliche Einsparungen haengen von Verbrauch, Region und Tarifdetails ab. Der Live-Rechner zeigt aktuelle Tarife fuer Ihre Postleitzahl und Ihren Verbrauch.'
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
            text: 'Geben Sie Postleitzahl und Verbrauch ein. Der Live-Rechner zeigt aktuelle Tarife mit typischen Kennzahlen wie Arbeitspreis, Grundpreis, Laufzeit und Preisgarantie.'
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
          <div
            className="max-w-3xl"
          >
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 leading-tight max-w-[22ch] sm:max-w-none break-words">
              Gasvergleich für NRW
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
              Vergleichen Sie aktuelle Gastarife für Ihre Region direkt im Live-Rechner von Verivox. Kostenlos,
              transparent und mobil sauber nutzbar.
            </p>
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => document.getElementById('vergleich')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-14 px-8 rounded-full text-lg font-semibold shadow-lg"
              >
                Zum Live-Rechner
              </Button>
              <Link to="/methodik" onClick={trackMethodikClick} className="text-white/80 hover:text-white transition-colors text-sm font-medium underline">
                So vergleichen wir (Methodik)
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Tool Section */}
      <section id="vergleich" className="w-full py-24 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.9fr)] lg:items-start">
            <VerivoxCalculatorEmbed
              title="Live-Gastarife für NRW vergleichen"
              description="Geben Sie Ihre Postleitzahl und Ihren Jahresverbrauch ein. Der Rechner zeigt aktuelle Gastarife, Preisgarantien, Boni und Laufzeiten direkt von Verivox."
              target="Energie_Gas_Privat_Rechner"
              wmid="102"
              campaignId="gasvergleich_nrw"
              trackingProductId="99"
            />
            <div className="space-y-6">
              <div className="rounded-[1.75rem] border border-orange-100 bg-orange-50 p-6 shadow-sm">
                <h3 className="font-heading text-xl font-semibold text-primary mb-4">Warum dieser Rechner Sinn macht</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-sm">Aktuelle Tarifdaten direkt aus dem Verivox-Partnerrechner.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-sm">Für private Haushalte in Nordrhein-Westfalen optimiert.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-sm">Preisgarantie, Bonus und Gesamtkosten sauber vergleichbar.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-sm">Kostenlos, unverbindlich und ohne alte Beispieltarif-Logik.</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <h3 className="font-heading text-xl font-semibold text-primary mb-3">Vor dem Start hilfreich</h3>
                <p className="font-paragraph text-sm leading-7 text-slate-600 mb-4">
                  Für den verlässlichsten Vergleich brauchen Sie vor allem Postleitzahl und Jahresverbrauch. Die
                  Werte finden Sie in der Regel auf Ihrer letzten Gasabrechnung.
                </p>
                <p className="font-paragraph text-sm leading-7 text-slate-600">
                  Wenn Ihr Jahresverbrauch nicht direkt vorliegt, hilft oft die letzte Jahresabrechnung oder ein Blick
                  auf die Abschläge und den gemessenen Verbrauchszeitraum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Gas Tariff Calculator Section */}
      <GasCalculatorForm />

      {/* Content Section */}
      <section className="w-full py-24 bg-white">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">Kurz erklärt: Gasvergleich für NRW</h2>

              <p className="font-paragraph text-lg text-gray-700 mb-6">
                Mit unserem Gasvergleich greifen Sie direkt auf den Live-Rechner von Verivox für Nordrhein-Westfalen
                zu. Sie geben Postleitzahl und Gasverbrauch ein und sehen aktuelle Tarife als Grundlage für Ihre
                weitere Entscheidung.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">So funktioniert der Vergleich – 5 einfache Schritte</h3>
              <ol className="font-paragraph text-gray-700 space-y-3 mb-6 list-decimal list-inside">
                <li><strong>Postleitzahl eingeben:</strong> Geben Sie Ihre PLZ ein, um Tarife für Ihren Netzbereich zu sehen</li>
                <li><strong>Wohnfläche oder Verbrauch angeben:</strong> Tragen Sie Ihre Wohnfläche ein oder geben Sie Ihren jährlichen Verbrauch in kWh an (zu finden auf der Gasrechnung)</li>
                <li><strong>Live-Tarife vergleichen:</strong> Sehen Sie aktuelle Angebote mit Preis, Laufzeit und Preisgarantie</li>
                <li><strong>Optionen einordnen:</strong> Ordnen Sie die gezeigten Tarife nach Bonus, Preisgarantie und Vertragslaufzeit ein</li>
                <li><strong>Passenden Tarif auswählen:</strong> Gehen Sie auf Basis transparenter Tarifdetails direkt zum nächsten Schritt</li>
              </ol>
            </div>

            <div>
              <h3 className="font-heading text-xl font-bold text-primary mb-4">Gasanbietervergleich in 5 Schritten</h3>
              <ol className="font-paragraph text-gray-700 space-y-3 mb-6 list-decimal list-inside">
                <li><strong>Aktuelle Gasrechnung bereitstellen:</strong> Suchen Sie Ihre letzte Gasrechnung heraus, um Ihren Verbrauch und Ihre Zählernummer zu finden.</li>
                <li><strong>Optionen prüfen:</strong> Nutzen Sie unseren Live-Rechner für aktuelle Angebote und Konditionen.</li>
                <li><strong>Tarifdetails vergleichen:</strong> Prüfen Sie Preis, Laufzeit, Bonus und Preisgarantie im direkten Vergleich.</li>
                <li><strong>Vertragsfristen prüfen:</strong> Prüfen Sie Ihre Vertragsfristen und Details beim aktuellen Anbieter.</li>
                <li><strong>Nächsten Schritt starten:</strong> Wechseln Sie direkt oder holen Sie sich bei Bedarf zusätzliche Beratung.</li>
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
                  <span><strong>Vertragsdaten (optional):</strong> Zählernummer oder aktueller Anbieter helfen später beim Wechselprozess</span>
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
                Nordrhein-Westfalen ist das bevölkerungsreichste Bundesland Deutschlands mit großer Vielfalt bei
                Gasanbietern und Tarifen. Die Gaspreise variieren je nach Postleitzahl und Netzbetreiber, etwa zwischen
                Düsseldorf, Köln, Essen oder Dortmund. Der Live-Rechner hilft bei einer belastbaren regionalen
                Einordnung für Ihren Standort in NRW.
              </p>
            </div>

            <div className="bg-secondary/10 border-l-4 border-secondary p-6 rounded">
              <p className="font-paragraph text-gray-700 italic">
                Jetzt live vergleichen und passende nächste Schritte für Ihren Gasvertrag transparent prüfen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Switch Section */}
      <section className="w-full py-24 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-primary mb-4">
              Warum dieser Vergleich?
            </h2>
            <p className="font-paragraph text-lg text-gray-600 max-w-2xl mx-auto">
              Das bringt Ihnen einen klaren Marktüberblick mit aktuellen Tarifdetails.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Flame,
                title: 'Schnell & unkompliziert',
                description: 'Schneller Live-Vergleich auf einen Blick.'
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
                description: 'Direkter Übergang vom Vergleich zum nächsten Schritt.'
              },
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* So funktioniert's Section */}
      <section className="w-full py-24 bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary mb-16 text-center">
            So funktioniert der Gasvergleich
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg h-full">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl mb-6">
                  1
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Daten eingeben</h3>
                <p className="font-paragraph text-gray-600">
                  Geben Sie Ihre Postleitzahl und Ihren Verbrauch ein. Das dauert nur wenige Sekunden.
                </p>
              </div>
            </div>

            <div
              className="relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg h-full">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl mb-6">
                  2
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Live-Tarife einordnen</h3>
                <p className="font-paragraph text-gray-600">
                  Sehen Sie aktuelle Tarife mit Preis, Laufzeit und Preisgarantie auf einen Blick.
                </p>
              </div>
            </div>

            <div
              className="relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg h-full">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl mb-6">
                  3
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Tarif auswählen</h3>
                <p className="font-paragraph text-gray-600">
                  Wählen Sie eine passende Option auf Basis transparenter Tarifdetails und starten Sie den nächsten
                  Schritt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gasvergleich in 5 Schritten Section */}
      <section className="w-full py-24 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary mb-12 text-center">
            Gasvergleich in 5 Schritten
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
                  title: 'Live-Tarife ansehen',
                  description: 'Nutzen Sie unseren Vergleichsrechner. Geben Sie Ihre Postleitzahl und Ihren Verbrauch ein und sehen Sie aktuelle Tarife.'
                },
                {
                  step: 3,
                  title: 'Passende Option vormerken',
                  description: 'Ordnen Sie Preis, Laufzeit und Preisgarantie ein und markieren Sie eine passende Option.'
                },
                {
                  step: 4,
                  title: 'Tarif auswählen',
                  description: 'Gehen Sie vom Vergleich direkt in den nächsten Schritt oder holen Sie sich zusätzliche Beratung.'
                },
                {
                  step: 5,
                  title: 'Wechsel strukturieren',
                  description: 'Prüfen Sie Fristen, Vertragsdetails und die Angaben für einen reibungslosen Wechsel.'
                }
              ].map((item, index) => (
                <div
                  key={index}
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
                </div>
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
              <div
                key={index}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="font-heading text-xl text-primary">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
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
            <a
              href="https://www.energievergleich.shop/stromvergleich-nrw"
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
            </a>

            <a
              href="https://www.energievergleich.shop/photovoltaik-nrw"
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
            </a>

            <a
              href="https://www.energievergleich.shop/gewerbegas"
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
            </a>

            <a
              href="https://www.energievergleich.shop/ratgeber/gas"
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
            </a>

            <a
              href="https://www.energievergleich.shop/methodik"
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
            </a>
          </div>
        </div>
      </section>

      {/* Trust Section - Warum energievergleich.shop? */}
      <section className="w-full py-24 bg-white border-t">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <div
            className="space-y-6"
          >
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-primary">
              Warum energievergleich.shop?
            </h2>

            <p className="font-paragraph text-lg text-gray-700 leading-relaxed">
              Bei energievergleich.shop erhalten Sie Transparenz und Unabhängigkeit beim Live-Vergleich von
              Gastarifen. Im Fokus stehen Preis, Vertragsbedingungen, Preisgarantie und tatsächliche Tarifdetails als
              Grundlage für Ihre Entscheidung. Unser Service ist kostenlos und unverbindlich. Erfahren Sie mehr über
              unsere Methodik und wie wir arbeiten: <Link to="/methodik" className="text-primary font-semibold hover:underline">So vergleichen wir (Methodik)</Link>. Bei Fragen stehen wir Ihnen jederzeit zur Verfügung – <Link to="/kontakt" className="text-primary font-semibold hover:underline">Kontakt</Link>.
            </p>

            <p className="font-paragraph text-sm text-gray-500 italic">
              Stand: Februar 2026
            </p>
          </div>
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
                a: 'Geben Sie Postleitzahl und Verbrauch ein. Der Rechner zeigt aktuelle Tarife mit Arbeitspreis, Grundpreis, Laufzeit und Garantie.'
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
