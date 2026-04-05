import { useEffect } from 'react';
import { Zap, CheckCircle, Globe, DollarSign, MapPin, BarChart3, Rocket } from 'lucide-react';
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
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';
import { getPageSEO } from '@/lib/seo-config';
import { getRelatedPages } from '@/lib/internal-linking';

export default function StromvergleichNrwPage() {
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
            text: 'Moegliche Einsparungen haengen von Verbrauch, Region und Tarifdetails ab. Der Live-Rechner zeigt aktuelle Tarife fuer Ihre Postleitzahl und Ihren Verbrauch.'
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
            text: 'Geben Sie Postleitzahl und Stromverbrauch ein. Der Live-Rechner zeigt aktuelle Tarife mit Kennzahlen wie Arbeitspreis, Grundpreis, Laufzeit und Preisgarantie.'
          }
        },
        {
          '@type': 'Question',
          name: 'Gibt es versteckte Gebühren beim Wechsel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Unsere Erstorientierung ist kostenlos. Verbindliche Kosten entstehen nur aus dem später gewählten Tarif beim Anbieter.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie hoch ist der durchschnittliche Strompreis in NRW 2026?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Der durchschnittliche Arbeitspreis für Strom in Nordrhein-Westfalen liegt 2026 bei ca. 29–33 ct/kWh im Sondervertrag. Die Grundversorgung ist deutlich teurer (38–46 ct/kWh). Günstige Sondertarife starten in NRW ab ca. 27 ct/kWh.'
          }
        },
        {
          '@type': 'Question',
          name: 'Was ist der Unterschied zwischen Grundversorgung und Sondervertrag?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Die Grundversorgung ist der Standardtarif Ihres lokalen Netzbetreibers – teurer, aber immer verfügbar. Sonderverträge sind günstigere Alternativtarife von verschiedenen Anbietern. In NRW können Sie durch einen Wechsel in einen Sondervertrag oft 20–35 % der Stromkosten einsparen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Können auch Mieter in NRW den Stromanbieter wechseln?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja! Als Mieter haben Sie das Recht, Ihren Stromanbieter frei zu wählen, unabhängig vom Vermieter. Sie benötigen lediglich Ihre Postleitzahl und den jährlichen Stromverbrauch (kWh) aus Ihrer letzten Abrechnung.'
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
          <div
            className="max-w-3xl"
          >
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 leading-tight max-w-[22ch] sm:max-w-none break-words">
              Stromvergleich für NRW
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
              Vergleichen Sie aktuelle Stromtarife für Ihre Region direkt im Live-Rechner von Verivox. Kostenlos,
              transparent und ohne Umwege.
            </p>
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => document.getElementById('vergleich')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-14 px-8 rounded-full text-lg font-semibold shadow-lg"
              >
                Zum Live-Rechner
              </Button>
              <Link to="/methodik" className="text-white/80 hover:text-white transition-colors text-sm font-medium underline">
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
              title="Live-Stromtarife für NRW vergleichen"
              description="Geben Sie Ihre Postleitzahl und Ihren Jahresverbrauch ein. Der Rechner zeigt aktuelle Tarife, Preisgarantien, Boni und Laufzeiten direkt von Verivox im sichtbaren Hauptbereich."
              target="Energie_Strom_Privat_Rechner"
              wmid="104"
              campaignId="stromvergleich_nrw"
              trackingProductId="93"
            />
            <div className="space-y-6">
              <div className="rounded-[1.75rem] border border-blue-100 bg-blue-50 p-6 shadow-sm">
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
                    <span className="font-paragraph text-sm">Preisgarantie, Laufzeit, Bonus und Gesamtkosten im Blick.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-sm">Kostenlos, unverbindlich und ohne sichtbare Platzhalterlogik.</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <h3 className="font-heading text-xl font-semibold text-primary mb-3">Vor dem Start hilfreich</h3>
                <p className="font-paragraph text-sm leading-7 text-slate-600 mb-4">
                  Halten Sie am besten Ihre letzte Stromrechnung bereit. Mit Postleitzahl und Jahresverbrauch erhalten
                  Sie die belastbarsten Ergebnisse.
                </p>
                <p className="font-paragraph text-sm leading-7 text-slate-600">
                  Falls Sie Ihren Verbrauch nicht kennen, finden Sie ihn meist auf der letzten Jahresabrechnung in
                  kWh. Für einen typischen Haushalt sind oft rund 3.500 kWh ein realistischer Richtwert.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second Verivox Calculator — scroll target for CTAs */}
      <section className="w-full py-12 bg-slate-50" id="vergleichsrechner-2">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <VerivoxCalculatorEmbed
            badge="Stromvergleich NRW 2026"
            title="Jetzt Stromtarife vergleichen"
            description="Postleitzahl und Jahresverbrauch eingeben – aktuelle NRW-Tarife, Preisgarantien und Wechselbonus direkt von Verivox."
            target="Energie_Strom_Privat_Rechner"
            wmid="104"
            campaignId="stromvergleich_nrw_2"
            trackingProductId="93"
          />
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full py-24 bg-white">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">Kurz erklärt: Stromvergleich für NRW</h2>
              
              <p className="font-paragraph text-lg text-gray-700 mb-6">
                Mit unserem Stromvergleich greifen Sie direkt auf den Live-Rechner von Verivox für Nordrhein-Westfalen
                zu. Sie geben Postleitzahl und Stromverbrauch ein und sehen aktuelle Tarife als Grundlage für Ihre
                weitere Entscheidung.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">So funktioniert der Vergleich – 5 einfache Schritte</h3>
              <ol className="font-paragraph text-gray-700 space-y-3 mb-6 list-decimal list-inside">
                <li><strong>Postleitzahl eingeben:</strong> Geben Sie Ihre PLZ ein, um Tarife für Ihren Netzbereich zu sehen</li>
                <li><strong>Stromverbrauch angeben:</strong> Tragen Sie Ihren jährlichen Verbrauch in kWh ein (zu finden auf der Stromrechnung)</li>
                <li><strong>Live-Tarife vergleichen:</strong> Sehen Sie aktuelle Angebote mit Preis, Laufzeit und Preisgarantie</li>
                <li><strong>Details prüfen:</strong> Vergleichen Sie Bonus, Vertragslaufzeit, Ökostrom-Optionen und Monatskosten</li>
                <li><strong>Passenden Tarif auswählen:</strong> Entscheiden Sie auf Basis transparenter Tarifdetails und leiten Sie den nächsten Schritt ein</li>
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
                Nordrhein-Westfalen ist das bevölkerungsreichste Bundesland Deutschlands mit großer Vielfalt bei
                Stromanbietern und Tarifen. Die Strompreise variieren je nach Postleitzahl und Netzbetreiber, etwa
                zwischen Düsseldorf, Köln, Essen oder Dortmund. Der Live-Rechner hilft bei einer belastbaren
                regionalen Einordnung für Ihren Standort in NRW.
              </p>
            </div>

            <div className="bg-secondary/10 border-l-4 border-secondary p-6 rounded">
              <p className="font-paragraph text-gray-700 italic">
                Jetzt live vergleichen und passende nächste Schritte für Ihren Stromvertrag transparent prüfen.
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
              Warum wechseln?
            </h2>
            <p className="font-paragraph text-lg text-gray-600 max-w-2xl mx-auto">
              Das bringt Ihnen ein Tarifwechsel – klar & einfach erklärt.
            </p>
          </div>

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
            So funktioniert der Stromwechsel
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
                  Geben Sie Ihre Postleitzahl und Ihren Stromverbrauch ein. Das dauert nur wenige Sekunden.
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
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Tarife vergleichen</h3>
                <p className="font-paragraph text-gray-600">
                  Vergleichen Sie aktuelle Tarife mit Preis, Laufzeit und Preisgarantie auf einen Blick.
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
                  Wählen Sie einen passenden Tarif und starten Sie den nächsten Schritt direkt auf Basis transparenter
                  Tarifdetails.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Snippet Section */}
      <section className="w-full py-24 bg-white">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <h3 className="font-heading text-2xl font-bold text-primary mb-8">Stromanbieter-Orientierung in 5 Schritten</h3>
          <ol className="font-paragraph text-gray-700 space-y-4 list-decimal list-inside">
            <li><strong>Postleitzahl und Verbrauch eingeben:</strong> Nutzen Sie unseren Vergleichsrechner mit Ihren Basisdaten.</li>
            <li><strong>Tarife vergleichen:</strong> Sehen Sie aktuelle Angebote sortiert nach Preis und Konditionen.</li>
            <li><strong>Passende Option markieren:</strong> Ordnen Sie Tarife nach Preisgarantie, Bonus und Laufzeit ein.</li>
            <li><strong>Tarif auswählen:</strong> Wechseln Sie direkt oder holen Sie sich bei Bedarf eine zusätzliche Beratung.</li>
            <li><strong>Nächsten Schritt gehen:</strong> Sie erhalten einen klaren Übergang in den weiteren Wechselprozess.</li>
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

      {/* Trust Section */}
      <section className="w-full py-24 bg-white">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <div
          >
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary mb-6">
              Warum energievergleich.shop?
            </h2>
            <div className="space-y-4 font-paragraph text-gray-700 leading-relaxed">
              <p>
                Bei energievergleich.shop erhalten Sie einen transparenten Zugriff auf aktuelle Stromtarife über den
                integrierten Verivox-Rechner. So sehen Sie reale Tarifdetails als Grundlage für Ihre Entscheidung.
              </p>
              <p>
                Im Fokus stehen nicht nur Preise, sondern auch Laufzeiten, Preisgarantien, Boni und
                Kündigungsfristen. Das hilft, günstige Tarife nicht isoliert, sondern im Gesamtbild zu bewerten.
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
          </div>
        </div>
      </section>

      {/* NRW Strompreise 2026 — Marktdaten */}
      <section className="w-full py-20 bg-slate-50">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary mb-4 text-center">
            Strompreise in NRW 2026 – aktuelle Marktdaten
          </h2>
          <p className="font-paragraph text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Orientierungswerte für Nordrhein-Westfalen (Stand: April 2026). Die tatsächlichen Tarife variieren je nach PLZ, Netzbetreiber und Verbrauch.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { label: 'Ø Arbeitspreis NRW', value: '29–33 ct/kWh', sub: 'Sondervertrag, 12 Mon. Laufzeit' },
              { label: 'Ø Grundpreis NRW', value: '8–12 €/Monat', sub: 'ohne Verbrauch, netto' },
              { label: 'Grundversorgung NRW', value: '38–46 ct/kWh', sub: 'je nach Netzbetreiber' },
            ].map((d) => (
              <div key={d.label} className="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-sm">
                <p className="font-paragraph text-sm text-gray-500 mb-1">{d.label}</p>
                <p className="font-heading text-2xl font-bold text-primary mb-1">{d.value}</p>
                <p className="font-paragraph text-xs text-gray-400">{d.sub}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-8">
            <table className="w-full text-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="font-heading text-left px-5 py-3">Stadt / Region NRW</th>
                  <th className="font-heading text-right px-5 py-3">Ø Arbeitspreis</th>
                  <th className="font-heading text-right px-5 py-3">Günstigster Tarif ab</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { city: 'Köln', avg: '30,1 ct/kWh', best: '27,2 ct/kWh' },
                  { city: 'Düsseldorf', avg: '30,8 ct/kWh', best: '27,0 ct/kWh' },
                  { city: 'Dortmund', avg: '31,4 ct/kWh', best: '27,5 ct/kWh' },
                  { city: 'Essen', avg: '31,2 ct/kWh', best: '27,3 ct/kWh' },
                  { city: 'Münster', avg: '30,6 ct/kWh', best: '26,9 ct/kWh' },
                  { city: 'Bielefeld', avg: '31,0 ct/kWh', best: '27,1 ct/kWh' },
                  { city: 'Bonn', avg: '30,3 ct/kWh', best: '27,0 ct/kWh' },
                  { city: 'Wuppertal', avg: '31,5 ct/kWh', best: '27,6 ct/kWh' },
                ].map((row) => (
                  <tr key={row.city} className="hover:bg-slate-50 transition-colors">
                    <td className="font-paragraph font-medium px-5 py-3 text-gray-800">{row.city}</td>
                    <td className="font-paragraph text-right px-5 py-3 text-gray-600">{row.avg}</td>
                    <td className="font-paragraph text-right px-5 py-3 font-semibold text-green-600">{row.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="font-paragraph text-xs text-gray-400 text-center">
            * Orientierungswerte auf Basis öffentlich verfügbarer Marktdaten. Aktuelle Tarife für Ihre PLZ zeigt der Live-Rechner oben.
          </p>
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
