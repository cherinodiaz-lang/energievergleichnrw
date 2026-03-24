import { useState, type SyntheticEvent } from 'react';
import { motion } from 'framer-motion';
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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
                onClick={() => document.getElementById('anfrage')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-14 px-8 rounded-full text-lg font-semibold shadow-lg"
              >
                Jetzt Angebot anfordern
              </Button>
              <Link to="/methodik" onClick={trackMethodikClick} className="text-white/80 hover:text-white transition-colors text-sm font-medium underline">
                So vergleichen wir (Methodik)
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full py-24 bg-white">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">Kurz erklärt: Gewerbestrom-Anfrage für NRW</h2>
              
              <p className="font-paragraph text-lg text-gray-700 mb-6">
                Mit unserem kostenlosen Gewerbestrom-Service finden Sie in wenigen Minuten den günstigsten Stromtarif für Ihr Unternehmen in Nordrhein-Westfalen. Die Anfrage ist völlig kostenlos und unverbindlich – Sie geben nur Ihre Verbrauchsdaten ein und erhalten sofort individualisierte Angebote. Sparen Sie bis zu 30% Ihrer Stromkosten durch optimierte Gewerbestromtarife und profitieren Sie von persönlicher Beratung durch unsere Experten.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">So funktioniert die Anfrage – 5 Schritte</h3>
              <ol className="font-paragraph text-gray-700 space-y-3 mb-6 list-decimal list-inside">
                <li><strong>Jahresverbrauch eingeben:</strong> Geben Sie Ihren jährlichen Stromverbrauch in kWh ein (zu finden auf Ihrer letzten Stromrechnung)</li>
                <li><strong>Zähler- und Marktlokation (falls vorhanden):</strong> Tragen Sie diese Nummern ein, falls Sie diese bereits haben – sie ermöglichen präzisere Angebote</li>
                <li><strong>Leistung und Lastprofil:</strong> Geben Sie die maximale Leistung und das Lastprofil an (falls vorhanden)</li>
                <li><strong>Postleitzahl und Branche:</strong> Nennen Sie Ihren Standort und Ihre Branche für maßgeschneiderte Tarife</li>
                <li><strong>Angebote vergleichen und wählen:</strong> Erhalten Sie mehrere Angebote, vergleichen Sie Preise, Laufzeiten und Konditionen und wählen Sie das beste Angebot</li>
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
                    <tr className="hover:bg-gray-50 transition-colors\">\n                      <td className="border border-gray-300 p-3 md:p-4 font-paragraph font-semibold text-foreground">Jahresverbrauch (kWh)</td>\n                      <td className="border border-gray-300 p-3 md:p-4 font-paragraph text-gray-700">z.B. 120.000</td>\n                    </tr>\n                    <tr className="bg-gray-50 hover:bg-gray-100 transition-colors\">\n                      <td className="border border-gray-300 p-3 md:p-4 font-paragraph font-semibold text-foreground">PLZ/Ort</td>\n                      <td className="border border-gray-300 p-3 md:p-4 font-paragraph text-gray-700">z.B. 40210 Düsseldorf</td>\n                    </tr>\n                    <tr className="hover:bg-gray-50 transition-colors\">\n                      <td className="border border-gray-300 p-3 md:p-4 font-paragraph font-semibold text-foreground">Zählernummer/Marktlokation</td>\n                      <td className="border border-gray-300 p-3 md:p-4 font-paragraph text-gray-700">z.B. DE… / falls vorhanden</td>\n                    </tr>\n                    <tr className="bg-gray-50 hover:bg-gray-100 transition-colors\">\n                      <td className="border border-gray-300 p-3 md:p-4 font-paragraph font-semibold text-foreground">Leistung (kW)</td>\n                      <td className="border border-gray-300 p-3 md:p-4 font-paragraph text-gray-700">z.B. 85</td>\n                    </tr>\n                    <tr className="hover:bg-gray-50 transition-colors\">\n                      <td className="border border-gray-300 p-3 md:p-4 font-paragraph font-semibold text-foreground">Lastprofil (SLP/RLM)</td>\n                      <td className="border border-gray-300 p-3 md:p-4 font-paragraph text-gray-700">z.B. RLM</td>\n                    </tr>\n                    <tr className="bg-gray-50 hover:bg-gray-100 transition-colors\">\n                      <td className="border border-gray-300 p-3 md:p-4 font-paragraph font-semibold text-foreground">Vertragslaufzeit</td>\n                      <td className="border border-gray-300 p-3 md:p-4 font-paragraph text-gray-700">z.B. 12 Monate</td>\n                    </tr>\n                    <tr className="hover:bg-gray-50 transition-colors\">\n                      <td className="border border-gray-300 p-3 md:p-4 font-paragraph font-semibold text-foreground">Branche/Nutzung</td>\n                      <td className="border border-gray-300 p-3 md:p-4 font-paragraph text-gray-700">z.B. Produktion</td>\n                    </tr>\n                  </tbody>\n                </table>\n              </div>\n            </div>\n\n            <div>\n              <h3 className="font-heading text-2xl font-bold text-primary mb-4">Welche Angaben du brauchst</h3>
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
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">Häufige Fehler bei der Gewerbestrom-Anfrage</h3>
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
                Nordrhein-Westfalen ist das wirtschaftsstärkste Bundesland Deutschlands mit über 800.000 Unternehmen aller Größen. Von Einzelhändlern über Handwerksbetriebe bis zu Produktionsunternehmen – alle profitieren von optimierten Gewerbestromtarifen. Die Strompreise für Gewerbekunden variieren je nach Verbrauch, Standort und Branche. Unser Vergleich berücksichtigt diese regionalen und branchenspezifischen Unterschiede und zeigt Ihnen die besten Tarife für Ihr Unternehmen – ob in Düsseldorf, Köln, Essen, Dortmund oder einer anderen Stadt in NRW.
              </p>
            </div>

            <div className="bg-secondary/10 border-l-4 border-secondary p-6 rounded">
              <p className="font-paragraph text-gray-700 italic">
                Jetzt unverbindlich Angebot anfordern und sparen Sie ab sofort bei Ihren Stromkosten!
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
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
                    Bis zu 30% Einsparung durch optimierte Gewerbestromtarife
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section id="info" className="w-full bg-background py-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
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
                    Der Wechsel ist einfach und unkompliziert. Füllen Sie unser Anfrageformular aus, wir erstellen Ihnen ein individuelles Angebot und kümmern uns um alle Formalitäten. Ihre Stromversorgung bleibt während des gesamten Prozesses gesichert.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">
                    Regionale Expertise
                  </h3>
                  <p className="font-paragraph text-foreground/80">
                    Als Experten für den NRW-Markt kennen wir die regionalen Besonderheiten und können Ihnen die besten Tarife für Ihren Standort anbieten.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-primary/10 rounded-2xl p-12 flex items-center justify-center">
                <Zap className="w-64 h-64 text-primary" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Request Form Section */}
      <section id="anfrage" className="w-full bg-white py-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary mb-4">
              Jetzt Angebot anfordern
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 max-w-3xl mx-auto">
              Füllen Sie das Formular aus und erhalten Sie ein individuelles Angebot für Gewerbestrom
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
              Bei der Wahl eines Gewerbestrom-Anbieters vertrauen Sie auf Transparenz und Unabhängigkeit. energievergleich.shop bietet Ihnen einen kostenlosen, unabhängigen Vergleich von Gewerbestromtarifen – ohne versteckte Gebühren oder Provisionen. Wir vergleichen Tarife nach Preis und Vertragsbedingungen, um Ihnen die beste Lösung für Ihr Unternehmen zu zeigen. Unsere Daten sind aktuell und werden regelmäßig aktualisiert. Stand: Februar 2026.
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
