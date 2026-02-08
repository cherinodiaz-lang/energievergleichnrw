import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Building2, TrendingDown, Shield, Clock, Send, Sun, ArrowRight } from 'lucide-react';
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
import { useNavigate } from 'react-router-dom';
import { getPageSEO } from '@/lib/seo-config';

export default function GewerbegasPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Wie oft kann ich meinen Gewerbegas-Anbieter wechseln?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sie können Ihren Gewerbegas-Anbieter jederzeit wechseln, sofern Sie die Kündigungsfrist einhalten. Bei den meisten Verträgen beträgt diese 4 Wochen zum Ende eines Kalendermonats. Nach einem Wechsel können Sie frühestens nach 12 Monaten erneut wechseln.'
          }
        },
        {
          '@type': 'Question',
          name: 'Ist der Wechsel des Gewerbegas-Anbieters kostenlos?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja, völlig kostenlos. Es fallen keine Gebühren für die Kündigung beim alten Anbieter oder die Anmeldung beim neuen an. Wir kümmern uns um alle Formalitäten.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie lange dauert ein Gewerbegas-Wechsel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In der Regel 4-6 Wochen. Ihre Gasversorgung wird nicht unterbrochen. Der neue Anbieter kümmert sich um alle notwendigen Schritte.'
          }
        },
        {
          '@type': 'Question',
          name: 'Kann ich während des Wechsels ohne Gas sein?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nein. Ihre Gasversorgung ist gesetzlich geschützt. Im Notfall springt der Grundversorger ein.'
          }
        },
        {
          '@type': 'Question',
          name: 'Welche Daten benötige ich für einen Gewerbegas-Vergleich?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Postleitzahl und Gasverbrauch (in kWh). Den Verbrauch finden Sie auf Ihrer letzten Rechnung. Optional: Zählernummer und Heizungsart.'
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

  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postcode, setPostcode] = useState('');
  const [city, setCity] = useState('');
  const [consumption, setConsumption] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [heatingType, setHeatingType] = useState('');
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
    setHeatingType('');
    setMessage('');
  };

  const seo = getPageSEO('gewerbegas');

  return (
    <div className="min-h-screen bg-background break-words leading-mobile">
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
      />
      <Header />

      {/* Hero Section */}
      <section id="hero" className="w-full bg-primary text-primary-foreground py-32">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-8">
              <div className="bg-secondary p-4 rounded-2xl shadow-lg">
                <Flame className="w-16 h-16 text-primary" />
              </div>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-8 leading-tight max-w-[22ch] sm:max-w-none break-words">
              Gewerbegas für Ihr Unternehmen
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white font-medium max-w-3xl mx-auto leading-relaxed">
              Profitieren Sie von maßgeschneiderten Gastarifen für Gewerbekunden in NRW. Senken Sie Ihre Heizkosten und setzen Sie auf nachhaltige Energie.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Button
                onClick={() => document.getElementById('anfrage')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 min-h-[44px] h-12 sm:h-14 px-6 sm:px-8 rounded-full text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 w-full sm:w-auto"
              >
                Angebot anfordern
              </Button>
              <Button
                onClick={() => navigate('/#photovoltaik')}
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 min-h-[44px] h-12 sm:h-14 px-6 sm:px-8 rounded-full text-base sm:text-lg font-medium backdrop-blur-md transition-all w-full sm:w-auto"
              >
                <Sun className="w-5 h-5 mr-2" />
                Photovoltaik Beratung
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="vorteile" className="w-full bg-white py-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
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
                    Bis zu 25% Einsparung durch optimierte Gewerbegas-Tarife
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
                    Preisgarantie
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-foreground/80">
                    Langfristige Verträge mit stabilen Gaspreisen
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
                      <Flame className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="font-heading text-xl text-primary">
                    Klimaneutral
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-foreground/80">
                    Klimaneutrales Gas für Ihr nachhaltiges Unternehmen
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
      <section id="info" className="w-full bg-cover bg-center ox-hidden py-24" style={{ backgroundImage: 'linear-gradient(rgba(44, 110, 73, 0.85), rgba(44, 110, 73, 0.85))' }}>
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-primary/10 rounded-2xl p-12 flex items-center justify-center">
                <Flame className="w-64 h-64 text-primary" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6">
                Maßgeschneiderte Gastarife für Ihr Gewerbe
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">
                    Für wen eignet sich Gewerbegas?
                  </h3>
                  <p className="font-paragraph text-foreground/80">
                    Gewerbegas ist ideal für Unternehmen mit Gasheizung, Produktionsbetriebe, Gastronomiebetriebe mit Gasherden, Werkstätten und alle gewerblichen Gasverbraucher in NRW.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">
                    Wie funktioniert der Wechsel?
                  </h3>
                  <p className="font-paragraph text-foreground/80">
                    Der Wechsel ist einfach und unkompliziert. Füllen Sie unser Anfrageformular aus, wir erstellen Ihnen ein individuelles Angebot und kümmern uns um alle Formalitäten. Ihre Gasversorgung bleibt während des gesamten Prozesses gesichert.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">
                    Klimaneutrales Gas
                  </h3>
                  <p className="font-paragraph text-foreground/80">
                    Wir bieten klimaneutrales Gas an, bei dem die CO₂-Emissionen durch zertifizierte Klimaschutzprojekte ausgeglichen werden. So heizen Sie nachhaltig und tragen aktiv zum Klimaschutz bei.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Request Form Section */}
      <section id="anfrage" className="w-full bg-white py-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
              Jetzt Angebot anfordern
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 max-w-3xl mx-auto">
              Füllen Sie das Formular aus und erhalten Sie ein individuelles Angebot für Gewerbegas
            </p>
          </div>

          <Card className="max-w-4xl mx-auto shadow-sm md:shadow">
            <CardHeader>
              <CardTitle className="font-heading text-2xl">Anfrage für Gewerbegas</CardTitle>
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
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company-name" className="font-paragraph">Firmenname *</Label>
                      <Input
                        id="company-name"
                        type="text"
                        placeholder="Ihre Firma GmbH"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                        className="font-paragraph w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-type" className="font-paragraph">Branche *</Label>
                      <Select value={companyType} onValueChange={setCompanyType} required>
                        <SelectTrigger id="company-type" className="font-paragraph w-full">
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
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="contact-person" className="font-paragraph">Name *</Label>
                      <Input
                        id="contact-person"
                        type="text"
                        placeholder="Max Mustermann"
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        required
                        className="font-paragraph w-full"
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
                        className="font-paragraph w-full"
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
                        className="font-paragraph w-full"
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
                      className="font-paragraph w-full"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="postcode" className="font-paragraph">Postleitzahl *</Label>
                      <Input
                        id="postcode"
                        type="text"
                        placeholder="40210"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        required
                        className="font-paragraph w-full"
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
                        className="font-paragraph w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Consumption */}
                <div className="space-y-6">
                  <h3 className="font-heading text-xl font-semibold text-foreground">
                    Verbrauchsinformationen
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="consumption" className="font-paragraph">
                        Jährlicher Gasverbrauch (kWh) *
                      </Label>
                      <Input
                        id="consumption"
                        type="number"
                        placeholder="z.B. 100000"
                        value={consumption}
                        onChange={(e) => setConsumption(e.target.value)}
                        required
                        className="font-paragraph w-full"
                      />
                      <p className="font-paragraph text-sm text-foreground/60">
                        Sie finden diese Information auf Ihrer letzten Gasrechnung
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="heating-type" className="font-paragraph">Heizungsart *</Label>
                      <Select value={heatingType} onValueChange={setHeatingType} required>
                        <SelectTrigger id="heating-type" className="font-paragraph w-full">
                          <SelectValue placeholder="Wählen Sie..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gasheizung">Gasheizung</SelectItem>
                          <SelectItem value="gasherd">Gasherd</SelectItem>
                          <SelectItem value="beides">Heizung und Herd</SelectItem>
                          <SelectItem value="produktion">Produktionsprozesse</SelectItem>
                          <SelectItem value="sonstige">Sonstige</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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
                    className="font-paragraph w-full"
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
      <PassendeRatgeber moneyPageId="gewerbegas" limit={4} />

      <Footer />
    </div>
  );
}
