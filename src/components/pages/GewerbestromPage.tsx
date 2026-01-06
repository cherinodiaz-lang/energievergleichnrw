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

export default function GewerbestromPage() {
  // --- SEO Meta Tags ---
  useEffect(() => {
    document.title = 'Gewerbestrom NRW - Stromtarife für Unternehmen vergleichen';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Gewerbestrom für Ihr Unternehmen in Nordrhein-Westfalen. Maßgeschneiderte Tarife mit Kostenersparnis und Planungssicherheit. Jetzt Angebot anfordern.');
    }
  }, []);
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
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-primary text-primary-foreground py-24">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
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
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
              Gewerbestrom für Ihr Unternehmen
            </h1>
            <p className="font-paragraph text-xl opacity-90 max-w-3xl mx-auto">
              Profitieren Sie von maßgeschneiderten Stromtarifen für Gewerbekunden in NRW. Senken Sie Ihre Energiekosten und setzen Sie auf nachhaltige Energie.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full bg-white py-24">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
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
      <section className="w-full bg-background py-24">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6">
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
      <section className="w-full bg-white py-24">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
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

      <Footer />
    </div>
  );
}
