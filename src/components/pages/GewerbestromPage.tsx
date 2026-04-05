import { useState, type SyntheticEvent } from 'react';
import { Zap, Building2, TrendingDown, Shield, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import NativeSelect from '@/components/ui/native-select';
import Header from '@/components/Header';
import DeferredFooter from '@/components/DeferredFooter';
import SEOHead from '@/components/SEOHead';
import PassendeRatgeber from '@/components/PassendeRatgeber';
import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import RelatedPages from '@/components/RelatedPages';
import VerivoxCalculatorEmbed from '@/components/VerivoxCalculatorEmbed';
import { Link } from 'react-router-dom';
import { getPageSEO } from '@/lib/seo-config';
import { ROUTES } from '@/lib/routes';
import { trackMethodikClick } from '@/services/form-submission';
import { getRelatedPages } from '@/lib/internal-linking';

export default function GewerbestromPage() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postcode, setPostcode] = useState('');
  const [city, setCity] = useState('');
  const [consumption, setConsumption] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitSuccess(true);
    // Reset form
    setCompanyName('');
    setContactPerson('');
    setEmail('');
    setPhone('');
    setAddress('');
    setPostcode('');
    setCity('');
    setConsumption('');
    setCompanyType('');
    setMessage('');
  };

  const seo = getPageSEO('gewerbestrom');

  const breadcrumbItems = [
    { label: 'Startseite', path: '/' },
    { label: 'Gewerbe', path: '#' },
    { label: 'Gewerbestrom', path: '/gewerbestrom' },
  ];

  const breadcrumbSchema = [
    { name: 'Startseite', url: `${typeof window !== 'undefined' ? window.location.origin : ''}${ROUTES.home}` },
    { name: 'Gewerbe', url: `${typeof window !== 'undefined' ? window.location.origin : ''}${ROUTES.home}#gewerbe` },
    { name: 'Gewerbestrom', url: `${typeof window !== 'undefined' ? window.location.origin : ''}${ROUTES.gewerbestrom}` },
  ];

  return (
    <div className="min-h-screen bg-background break-words leading-relaxed">
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
      <section id="hero" className="w-full bg-primary text-primary-foreground py-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-primary-foreground p-4 rounded-2xl">
                <Building2 className="w-16 h-16 text-primary" />
              </div>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 max-w-[22ch] sm:max-w-none break-words">
              Gewerbestrom für Ihr Unternehmen
            </h1>
            <p className="font-paragraph text-xl opacity-90 max-w-3xl mx-auto">
              Profitieren Sie von maßgeschneiderten Stromtarifen für Gewerbekunden in NRW. Senken Sie Ihre Energiekosten und setzen Sie auf nachhaltige Energie.
            </p>
            <div className="flex flex-col gap-4 mt-8">
              <Button
                onClick={() => document.getElementById('vergleich')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-14 px-8 rounded-full text-lg font-semibold shadow-lg"
              >
                Jetzt Gewerbestrom vergleichen
              </Button>
              <Link to="/methodik" onClick={trackMethodikClick} className="text-white/80 hover:text-white transition-colors text-sm font-medium underline">
                So vergleichen wir (Methodik)
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Live Calculator Section */}
      <section id="vergleich" className="w-full bg-white py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.9fr)] lg:items-start">
            <VerivoxCalculatorEmbed
              badge="Live-Gewerbevergleich"
              title="Gewerbestrom live vergleichen"
              description="Vergleichen Sie aktuelle Gewerbestromtarife direkt im Verivox-Rechner. Für viele kleine und mittlere Unternehmen reicht der Live-Marktüberblick bereits für eine belastbare Vorauswahl."
              target="Energie_Strom_Gewerbe_Rechner"
              wmid="103"
              campaignId="gewerbestrom"
              trackingProductId="93"
            />

            <div className="space-y-6">
              <div className="rounded-[1.75rem] border border-blue-100 bg-blue-50 p-6 shadow-sm">
                <h2 className="font-heading text-xl font-semibold text-primary mb-4">Wann der Rechner besonders hilft</h2>
                <ul className="space-y-3 font-paragraph text-sm leading-7 text-slate-700">
                  <li>• Für einen schnellen Marktüberblick zu Preis, Bonus, Laufzeit und Preisgarantie.</li>
                  <li>• Für Unternehmen mit klar erkennbarem Jahresverbrauch und normaler Versorgungssituation.</li>
                  <li>• Für eine saubere Vorauswahl, bevor komplexere Details individuell geklärt werden.</li>
                </ul>
              </div>

              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <h3 className="font-heading text-xl font-semibold text-primary mb-3">Komplexere Gewerbefälle?</h3>
                <p className="font-paragraph text-sm leading-7 text-slate-600 mb-4">
                  Bei mehreren Standorten, besonderen Lastprofilen oder zusätzlichen Vertragsfragen begleiten wir Sie
                  danach persönlich weiter.
                </p>
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('anfrage')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto"
                >
                  Persönliche Unterstützung anfragen
                </Button>
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
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">Kurz erklärt: Gewerbestromvergleich für NRW</h2>

              <p className="font-paragraph text-lg text-gray-700 mb-6">
                Mit unserem Gewerbestromvergleich erhalten Sie einen direkten Live-Marktüberblick für Ihr Unternehmen
                in Nordrhein-Westfalen. Für komplexere Verbrauchsprofile oder Rückfragen können Sie im zweiten Schritt
                zusätzlich unser Anfrageformular nutzen.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">So funktioniert der Vergleich – 5 Schritte</h3>
              <ol className="font-paragraph text-gray-700 space-y-3 mb-6 list-decimal list-inside">
                <li><strong>Jahresverbrauch eingeben:</strong> Geben Sie Ihren jährlichen Stromverbrauch in kWh ein (zu finden auf Ihrer letzten Stromrechnung)</li>
                <li><strong>Live-Tarife prüfen:</strong> Vergleichen Sie aktuelle Angebote nach Preis, Bonus, Laufzeit und Preisgarantie</li>
                <li><strong>Optionen einordnen:</strong> Bewerten Sie Tarifdetails passend zu Ihrem Verbrauchsprofil</li>
                <li><strong>Sonderfälle ergänzen:</strong> Nutzen Sie bei Bedarf unser Formular für RLM, mehrere Standorte oder spezielle Anforderungen</li>
                <li><strong>Nächsten Schritt starten:</strong> Treffen Sie auf Basis transparenter Tarifdaten eine belastbare Vorauswahl</li>
              </ol>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">Gewerbestrom anfragen: Welche Daten?</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-sm md:text-base">
                  <thead>
                    <tr className="bg-primary text-primary-foreground">
                      <th className="border border-primary p-3 md:p-4 text-left font-heading font-semibold">Feld</th>
                      <th className="border border-primary p-3 md:p-4 text-left font-heading font-semibold">Beispiel</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="border border-gray-300 p-3 md:p-4 font-paragraph font-semibold text-foreground">
                        Jahresverbrauch (kWh)
                      </td>
                      <td className="border border-gray-300 p-3 md:p-4 font-paragraph text-gray-700">
                        z.B. 120.000
                      </td>
                    </tr>
                    <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                      <td className="border border-gray-300 p-3 md:p-4 font-paragraph font-semibold text-foreground">
                        PLZ/Ort
                      </td>
                      <td className="border border-gray-300 p-3 md:p-4 font-paragraph text-gray-700">
                        z.B. 40210 Düsseldorf
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="border border-gray-300 p-3 md:p-4 font-paragraph font-semibold text-foreground">
                        Zählernummer/Marktlokation
                      </td>
                      <td className="border border-gray-300 p-3 md:p-4 font-paragraph text-gray-700">
                        z.B. DE… / falls vorhanden
                      </td>
                    </tr>
                    <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                      <td className="border border-gray-300 p-3 md:p-4 font-paragraph font-semibold text-foreground">
                        Leistung (kW)
                      </td>
                      <td className="border border-gray-300 p-3 md:p-4 font-paragraph text-gray-700">
                        z.B. 85
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="border border-gray-300 p-3 md:p-4 font-paragraph font-semibold text-foreground">
                        Lastprofil (SLP/RLM)
                      </td>
                      <td className="border border-gray-300 p-3 md:p-4 font-paragraph text-gray-700">
                        z.B. RLM
                      </td>
                    </tr>
                    <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                      <td className="border border-gray-300 p-3 md:p-4 font-paragraph font-semibold text-foreground">
                        Vertragslaufzeit
                      </td>
                      <td className="border border-gray-300 p-3 md:p-4 font-paragraph text-gray-700">
                        z.B. 12 Monate
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="border border-gray-300 p-3 md:p-4 font-paragraph font-semibold text-foreground">
                        Branche/Nutzung
                      </td>
                      <td className="border border-gray-300 p-3 md:p-4 font-paragraph text-gray-700">
                        z.B. Produktion
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">Welche Angaben du brauchst</h3>
              <ul className="font-paragraph text-gray-700 space-y-2 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">•</span>
                  <span><strong>Jahresverbrauch in kWh:</strong> Der wichtigste Wert – finden Sie ihn auf Ihrer letzten Stromrechnung unter „Jahresverbrauch"</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">•</span>
                  <span><strong>Zählernummer/Marktlokation (falls vorhanden):</strong> Ermöglicht präzisere Angebote und schnellere Bearbeitung</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">•</span>
                  <span><strong>Leistung:</strong> Die maximale Leistung Ihres Anschlusses in kW (auf der Stromrechnung oder beim Netzbetreiber erfragen)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">•</span>
                  <span><strong>Lastprofil (falls vorhanden):</strong> Zeigt, wie gleichmäßig Ihr Verbrauch über das Jahr verteilt ist</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">•</span>
                  <span><strong>Postleitzahl und Branche:</strong> Für regionale Tarife und branchenspezifische Angebote</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">Worauf du achten solltest</h3>
              <ul className="font-paragraph text-gray-700 space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">✓</span>
                  <span><strong>Arbeitspreis vs. Leistungspreis:</strong> Unterscheiden Sie zwischen dem Preis pro kWh (Arbeitspreis) und der Gebühr für die bereitgestellte Leistung</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">✓</span>
                  <span><strong>Preisgarantie:</strong> Achten Sie auf die Dauer der Preisgarantie – mindestens 12 Monate sind empfehlenswert für Planungssicherheit</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">✓</span>
                  <span><strong>Vertragslaufzeit:</strong> Vergleichen Sie Laufzeiten von 12 bis 36 Monaten – längere Laufzeiten bieten oft bessere Preise</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">✓</span>
                  <span><strong>Abnahmebänder:</strong> Prüfen Sie, ob Ihre Verbrauchsmenge in die angebotenen Abnahmebänder passt</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">✓</span>
                  <span><strong>Angebotslaufzeit:</strong> Beachten Sie, wie lange das Angebot gültig ist – bei schnellen Marktveränderungen kann dies wichtig sein</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">Häufige Fehler beim Gewerbestromvergleich</h3>
              <ul className="font-paragraph text-gray-700 space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">✗</span>
                  <span><strong>Falscher Verbrauch eingeben:</strong> Ein fehlerhafter Jahresverbrauch führt zu unrealistischen Angeboten – überprüfen Sie die Zahl auf Ihrer Rechnung genau</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">✗</span>
                  <span><strong>Nur auf den Preis achten:</strong> Der niedrigste Preis ist nicht immer die beste Wahl – berücksichtigen Sie auch Laufzeit, Preisgarantie und Kündigungsfristen</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">✗</span>
                  <span><strong>Kündigungsfristen beim alten Anbieter ignorieren:</strong> Beachten Sie die Kündigungsfrist Ihres aktuellen Vertrags – wir kümmern uns um die Kündigung, aber Sie sollten die Fristen kennen</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">Gewerbestrom in NRW</h3>
              <p className="font-paragraph text-gray-700 mb-4">
                Nordrhein-Westfalen ist ein grosser und heterogener Energiemarkt fuer Unternehmen. Strompreise fuer
                Gewerbekunden variieren je nach Verbrauch, Standort und Branche. Der Live-Vergleich hilft dabei,
                regionale und branchenspezifische Unterschiede strukturiert sichtbar zu machen und passende Optionen
                fuer die naechsten Schritte einzugrenzen.
              </p>
            </div>

            <div className="bg-secondary/10 border-l-4 border-secondary p-6 rounded">
              <p className="font-paragraph text-gray-700 italic">
                Jetzt live vergleichen und fuer komplexe Gewerbefaelle bei Bedarf persoenliche Unterstuetzung anfragen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="vorteile" className="w-full bg-white py-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary mb-4">
              Ihre Vorteile als Gewerbekunde
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 max-w-3xl mx-auto">
              Speziell auf die Bedürfnisse von Unternehmen zugeschnitten
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
            >
              <Card className="h-full text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 p-4 rounded-xl">
                      <TrendingDown className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="font-heading text-xl text-primary">
                    Kostenersparnis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-foreground/80">
                    Transparente Einordnung fuer Verbrauch, Laufzeit und Preisstruktur
                  </p>
                </CardContent>
              </Card>
            </div>

            <div
            >
              <Card className="h-full text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 p-4 rounded-xl">
                      <Shield className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="font-heading text-xl text-primary">
                    Planungssicherheit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-foreground/80">
                    Langfristige Verträge mit stabilen Preisen
                  </p>
                </CardContent>
              </Card>
            </div>

            <div
            >
              <Card className="h-full text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 p-4 rounded-xl">
                      <Zap className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="font-heading text-xl text-primary">
                    Grüne Energie
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-foreground/80">
                    100% Ökostrom für Ihr nachhaltiges Unternehmen
                  </p>
                </CardContent>
              </Card>
            </div>

            <div
            >
              <Card className="h-full text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 p-4 rounded-xl">
                      <Clock className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="font-heading text-xl text-primary">
                    Persönliche Beratung
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-foreground/80">
                    Dedizierter Ansprechpartner für Ihr Unternehmen
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section id="info" className="w-full bg-background py-24 overflow-x-hidden">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div
            >
              <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary mb-6">
                Maßgeschneiderte Lösungen für Ihr Gewerbe
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">
                    Für wen eignet sich Gewerbestrom?
                  </h3>
                  <p className="font-paragraph text-foreground/80">
                    Gewerbestrom ist ideal für kleine und mittelständische Unternehmen, Einzelhändler, Büros, Werkstätten, Gastronomiebetriebe und alle gewerblichen Stromverbraucher in NRW.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">
                    Wie funktioniert der Wechsel?
                  </h3>
                  <p className="font-paragraph text-foreground/80">
                    Für viele Unternehmen beginnt der Wechsel direkt mit dem Live-Rechner. Bei komplexeren Anforderungen
                    begleiten wir Sie anschließend persönlich weiter. Ihre Stromversorgung bleibt während des gesamten
                    Prozesses gesichert.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">
                    Regionale Expertise
                  </h3>
                  <p className="font-paragraph text-foreground/80">
                    Wir berücksichtigen regionale Besonderheiten in NRW und kombinieren den Live-Marktüberblick mit
                    persönlicher Unterstützung, wenn Ihr Gewerbefall mehr Tiefe braucht.
                  </p>
                </div>
              </div>
            </div>

            <div
            >
              <div className="bg-primary/10 rounded-2xl p-6 sm:p-12 flex items-center justify-center overflow-hidden">
                <Zap className="h-40 w-40 text-primary sm:h-64 sm:w-64" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Request Form Section */}
      <section id="anfrage" className="w-full bg-white py-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary mb-4">
              Persönliche Unterstützung nach dem Vergleich
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 max-w-3xl mx-auto">
              Nutzen Sie das Formular, wenn Ihr Gewerbeprofil vertieft geprüft werden soll oder der Live-Rechner nicht
              alle Anforderungen abbildet.
            </p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="font-heading text-2xl">Anfrage für Gewerbestrom</CardTitle>
              <CardDescription className="font-paragraph">
                Alle Felder mit * sind Pflichtfelder
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitSuccess && (
                <div
                  className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
                  role="status"
                  aria-live="polite"
                >
                  Vielen Dank für Ihre Anfrage. Wir melden uns in Kürze bei Ihnen.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Information */}
                <div className="space-y-6">
                  <h3 className="font-heading text-xl font-semibold text-foreground">
                    Unternehmensinformationen
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company-name" className="font-paragraph">Firmenname *</Label>
                      <Input
                        id="company-name"
                        type="text"
                        placeholder="Ihre Firma GmbH"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                        className="font-paragraph"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-type" className="font-paragraph">Branche *</Label>
                      <NativeSelect
                        id="company-type"
                        value={companyType}
                        onValueChange={setCompanyType}
                        options={[
                          { value: 'einzelhandel', label: 'Einzelhandel' },
                          { value: 'gastro', label: 'Gastronomie' },
                          { value: 'buero', label: 'Büro/Verwaltung' },
                          { value: 'handwerk', label: 'Handwerk' },
                          { value: 'produktion', label: 'Produktion' },
                          { value: 'dienstleistung', label: 'Dienstleistung' },
                          { value: 'sonstige', label: 'Sonstige' },
                        ]}
                        placeholder="Wählen Sie..."
                        required
                        className="font-paragraph"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Person */}
                <div className="space-y-6">
                  <h3 className="font-heading text-xl font-semibold text-foreground">
                    Ansprechpartner
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="contact-person" className="font-paragraph">Name *</Label>
                      <Input
                        id="contact-person"
                        type="text"
                        placeholder="Max Mustermann"
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        required
                        className="font-paragraph"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-paragraph">E-Mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="max@firma.de"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="font-paragraph"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-paragraph">Telefon *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+49 211 1234 5678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="font-paragraph"
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-6">
                  <h3 className="font-heading text-xl font-semibold text-foreground">
                    Standort
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="font-paragraph">Straße und Hausnummer *</Label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="Musterstraße 123"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      className="font-paragraph"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="postcode" className="font-paragraph">Postleitzahl *</Label>
                      <Input
                        id="postcode"
                        type="text"
                        placeholder="40210"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        required
                        className="font-paragraph"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city" className="font-paragraph">Stadt *</Label>
                      <Input
                        id="city"
                        type="text"
                        placeholder="Düsseldorf"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        className="font-paragraph"
                      />
                    </div>
                  </div>
                </div>

                {/* Consumption */}
                <div className="space-y-6">
                  <h3 className="font-heading text-xl font-semibold text-foreground">
                    Verbrauchsinformationen
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="consumption" className="font-paragraph">
                      Jährlicher Stromverbrauch (kWh) *
                    </Label>
                    <Input
                      id="consumption"
                      type="number"
                      placeholder="z.B. 50000"
                      value={consumption}
                      onChange={(e) => setConsumption(e.target.value)}
                      required
                      className="font-paragraph"
                    />
                    <p className="font-paragraph text-sm text-foreground/60">
                      Sie finden diese Information auf Ihrer letzten Stromrechnung
                    </p>
                  </div>
                </div>

                {/* Additional Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="font-paragraph">
                    Zusätzliche Informationen (optional)
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Besondere Anforderungen, Fragen oder Anmerkungen..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="font-paragraph"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-lg py-6 font-paragraph text-lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Angebot anfordern
                </Button>

                <p className="font-paragraph text-sm text-foreground/60 text-center">
                  Mit dem Absenden des Formulars stimmen Sie unserer Datenschutzerklärung zu.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trust Section */}
      <section className="w-full py-24 bg-white">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <h2 className="font-heading text-3xl font-bold text-primary">Warum energievergleich.shop?</h2>

              <p className="font-paragraph text-lg text-gray-700 leading-relaxed">
              Bei der Wahl eines Gewerbestrom-Anbieters zählen Transparenz und belastbare Kriterien.
              energievergleich.shop verbindet einen Live-Vergleich über Verivox mit persönlicher Unterstützung für
              komplexere Gewerbefälle. So sehen Sie aktuelle Tarifdetails und haben bei Bedarf dennoch einen direkten
              Ansprechpartner.
              </p>

            <p className="font-paragraph text-base text-gray-700">
              Erfahren Sie mehr über unsere Vergleichskriterien in unserer <Link to="/methodik" className="text-primary hover:underline font-semibold">So vergleichen wir (Methodik)</Link> oder kontaktieren Sie uns direkt unter <Link to="/kontakt" className="text-primary hover:underline font-semibold">Kontakt</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Passende Ratgeber */}
      <PassendeRatgeber moneyPageId="gewerbestrom" limit={4} />

      {/* Related Pages - Cross-Linking */}
      <RelatedPages pages={getRelatedPages('/gewerbestrom')} />

      {/* For Business Important Section */}
      <section className="w-full py-24 bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-primary mb-12">Für Unternehmen wichtig</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a href="https://www.energievergleich.shop/gewerbegas" className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">Gewerbegas vergleichen</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">Optimieren Sie auch Ihre Gaskosten.</p>
                  <Button variant="outline" size="sm">Mehr erfahren</Button>
                </CardContent>
              </Card>
            </a>
            <a href="https://www.energievergleich.shop/stromvergleich-nrw" className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">Stromvergleich NRW</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">Vergleichen Sie Stromtarife für Ihr Gewerbe.</p>
                  <Button variant="outline" size="sm">Mehr erfahren</Button>
                </CardContent>
              </Card>
            </a>
            <a href="https://www.energievergleich.shop/ratgeber/gewerbe" className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">Ratgeber: Energie fürs Gewerbe</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">Spezielle Informationen für Unternehmen.</p>
                  <Button variant="outline" size="sm">Mehr erfahren</Button>
                </CardContent>
              </Card>
            </a>
            <a href="https://www.energievergleich.shop/kontakt" className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">Kontakt für Gewerbe-Angebote</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">Kostenlose Beratung für Ihr Unternehmen.</p>
                  <Button variant="outline" size="sm">Kontakt aufnehmen</Button>
                </CardContent>
              </Card>
            </a>
            <a href="https://www.energievergleich.shop/methodik" className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">So vergleichen wir: Methodik & Transparenz</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">Erfahren Sie unsere Vergleichskriterien.</p>
                  <Button variant="outline" size="sm">Mehr erfahren</Button>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </section>

      </main>
      <DeferredFooter />
    </div>
  );
}
