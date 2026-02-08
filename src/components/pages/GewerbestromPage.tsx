import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Building2, TrendingDown, Shield, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import PassendeRatgeber from '@/components/PassendeRatgeber';
import { Link } from 'react-router-dom';

export default function GewerbestromPage() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Vielen Dank für Ihre Anfrage, ${companyName}! Wir werden uns in Kürze bei Ihnen melden.`);
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

  return (
    <div className="min-h-screen bg-background break-words leading-relaxed">
      <SEOHead
        title="Gewerbestrom NRW: Günstige Tarife für Unternehmen finden"
        description="Optimieren Sie Ihre Energiekosten! Vergleichen Sie Gewerbestrom-Tarife in NRW und sichern Sie sich die besten Konditionen für Ihr Unternehmen. Unverbindlich & transparent."
        keywords="Gewerbestrom NRW, Stromtarife Unternehmen, Gewerbekunden, Stromvergleich Gewerbe"
        ogTitle="Gewerbestrom NRW - Maßgeschneiderte Tarife für Ihr Unternehmen"
        ogDescription="Sparen Sie bis zu 30% bei Gewerbestrom. Kostenlose Beratung für Unternehmen in NRW."
      />
      <Header />

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
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full py-24 bg-white">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">Gewerbestrom in NRW – Optimieren Sie Ihre Energiekosten</h2>
              
              <p className="font-paragraph text-lg text-gray-700 mb-6">
                Gewerbestrom ist speziell auf die Bedürfnisse von Unternehmen zugeschnitten. Mit unserem kostenlosen Vergleich finden Sie den günstigsten Stromtarif für Ihr Gewerbe in Nordrhein-Westfalen. Sparen Sie bis zu 30% Ihrer Stromkosten durch maßgeschneiderte Tarife und profitieren Sie von persönlicher Beratung.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">Wie funktioniert Gewerbestrom?</h3>
              <p className="font-paragraph text-gray-700 mb-4">
                Gewerbestrom unterscheidet sich von Haushaltsstrom durch höhere Verbrauchsmengen und spezielle Tarifmodelle. Für Unternehmen werden Stromtarife oft individuell verhandelt. Unser Vergleich zeigt Ihnen alle verfügbaren Optionen für Ihren Stromverbrauch. Wir kümmern uns um die Kündigung beim alten Anbieter und den Wechsel zum neuen – kostenlos und unkompliziert.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">Welche Vorteile bietet Gewerbestrom?</h3>
              <ul className="font-paragraph text-gray-700 space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">✓</span>
                  <span><strong>Kostenersparnis:</strong> Bis zu 30% Einsparung durch optimierte Gewerbestromtarife</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">✓</span>
                  <span><strong>Planungssicherheit:</strong> Langfristige Verträge mit stabilen Preisen</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">✓</span>
                  <span><strong>Grüne Energie:</strong> 100% Ökostrom für Ihr nachhaltiges Unternehmen</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">✓</span>
                  <span><strong>Persönliche Beratung:</strong> Dedizierter Ansprechpartner für Ihr Unternehmen</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4" id="so-funktioniert-unser-vergleich">So funktioniert unser Vergleich</h3>
              <p className="font-paragraph text-gray-700 mb-4">
                Nordrhein-Westfalen ist das wirtschaftsstärkste Bundesland Deutschlands mit vielen Unternehmen aller Größen. Die Strompreise für Gewerbekunden variieren je nach Verbrauch und Standort. Unser Vergleich berücksichtigt alle regionalen Besonderheiten und zeigt Ihnen die besten Tarife für Ihr Unternehmen – ob in Düsseldorf, Köln, Essen, Dortmund oder einer anderen Stadt in NRW.
              </p>
              <p className="font-paragraph text-gray-700 text-sm mt-4">
                <strong>Transparenz:</strong> Erfahren Sie <Link to="/methodik#so-funktioniert-unser-vergleich" className="text-primary font-bold hover:underline">wie unser Vergleich funktioniert</Link> und welche Kriterien wir für die Bewertung nutzen.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">Häufige Fragen zu Gewerbestrom</h3>
              <div className="space-y-4 mb-6">
                <div>
                  <p className="font-paragraph font-bold text-gray-800 mb-2">Für wen eignet sich Gewerbestrom?</p>
                  <p className="font-paragraph text-gray-700">Gewerbestrom ist ideal für kleine und mittelständische Unternehmen, Einzelhändler, Büros, Werkstätten, Gastronomiebetriebe und alle gewerblichen Stromverbraucher in NRW.</p>
                </div>
                <div>
                  <p className="font-paragraph font-bold text-gray-800 mb-2">Wie funktioniert der Wechsel?</p>
                  <p className="font-paragraph text-gray-700">Der Wechsel ist einfach und unkompliziert. Füllen Sie unser Anfrageformular aus, wir erstellen Ihnen ein individuelles Angebot und kümmern uns um alle Formalitäten. Ihre Stromversorgung bleibt während des gesamten Prozesses gesichert.</p>
                </div>
                <div>
                  <p className="font-paragraph font-bold text-gray-800 mb-2">Welche Daten benötige ich?</p>
                  <p className="font-paragraph text-gray-700">Postleitzahl, Branche, Standort und jährlicher Stromverbrauch. Den Verbrauch finden Sie auf Ihrer letzten Stromrechnung.</p>
                </div>
              </div>
            </div>

            <div className="bg-secondary/10 border-l-4 border-secondary p-6 rounded">
              <p className="font-paragraph text-gray-700 italic">
                Mit unserem Gewerbestrom-Vergleich für NRW sparen Sie garantiert Geld. Nutzen Sie unseren kostenlosen Service und optimieren Sie Ihre Energiekosten ab sofort!
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
                      <Select value={companyType} onValueChange={setCompanyType} required>
                        <SelectTrigger id="company-type" className="font-paragraph">
                          <SelectValue placeholder="Wählen Sie..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="einzelhandel">Einzelhandel</SelectItem>
                          <SelectItem value="gastro">Gastronomie</SelectItem>
                          <SelectItem value="buero">Büro/Verwaltung</SelectItem>
                          <SelectItem value="handwerk">Handwerk</SelectItem>
                          <SelectItem value="produktion">Produktion</SelectItem>
                          <SelectItem value="dienstleistung">Dienstleistung</SelectItem>
                          <SelectItem value="sonstige">Sonstige</SelectItem>
                        </SelectContent>
                      </Select>
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

      {/* Passende Ratgeber */}
      <PassendeRatgeber moneyPageId="gewerbestrom" limit={4} />

      <Footer />
    </div>
  );
}
