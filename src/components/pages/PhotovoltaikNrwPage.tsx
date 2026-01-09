import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, CheckCircle, TrendingUp, Leaf, Zap, Send, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import PassendeRatgeber from '@/components/PassendeRatgeber';
import { Link } from 'react-router-dom';

export default function PhotovoltaikNrwPage() {
  const [formData, setFormData] = useState({
    eigentumsart: '',
    dachform: '',
    personen: '',
    strasse: '',
    hausnummer: '',
    plz: '',
    ort: '',
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Lohnt sich eine Photovoltaikanlage in NRW?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja, auch in NRW lohnt sich eine Photovoltaikanlage. Durch die Einspeisevergütung und die Eigennutzung des Stroms amortisiert sich die Anlage in der Regel nach 8-12 Jahren. Danach produzieren Sie kostenlosen Strom für weitere 15-20 Jahre.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie viel Strom produziert eine Solaranlage in NRW?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Eine typische 5-kW-Anlage produziert in NRW etwa 4.500-5.000 kWh pro Jahr. Dies hängt von der Ausrichtung, dem Neigungswinkel und der Verschattung ab. Mit unserem Beratungsgespräch ermitteln wir die optimale Größe für Ihren Bedarf.'
          }
        },
        {
          '@type': 'Question',
          name: 'Welche Förderungen gibt es für Photovoltaik in NRW?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Es gibt verschiedene Förderungsmöglichkeiten: die KfW-Förderung für Solaranlagen, die Einspeisevergütung für Überschussstrom und regionale Förderprogramme in NRW. Wir informieren Sie über alle verfügbaren Optionen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie lange hält eine Solaranlage?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Hochwertige Solarmodule halten 25-30 Jahre oder länger. Die meisten Hersteller geben eine Leistungsgarantie von 25 Jahren. Der Wechselrichter sollte nach etwa 10-15 Jahren ausgetauscht werden.'
          }
        },
        {
          '@type': 'Question',
          name: 'Benötige ich einen Stromspeicher?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ein Stromspeicher ist optional, erhöht aber Ihre Unabhängigkeit und Eigennutzungsquote. Mit einem Speicher können Sie bis zu 80% Autarkie erreichen. Wir beraten Sie, ob ein Speicher für Ihre Situation sinnvoll ist.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie viel kostet eine Photovoltaikanlage?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Eine 5-kW-Anlage kostet in NRW etwa 8.000-12.000 Euro (netto). Mit Förderungen und der Einspeisevergütung reduziert sich die Amortisationszeit erheblich. Wir erstellen Ihnen ein individuelles Angebot.'
          }
        },
        {
          '@type': 'Question',
          name: 'Kann ich eine Solaranlage mieten?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja, es gibt Mietmodelle für Solaranlagen. Dabei zahlen Sie eine monatliche Rate, ohne die Anlage zu kaufen. Dies ist eine gute Option, wenn Sie wenig Kapital investieren möchten.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie lange dauert die Installation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Die Installation einer Solaranlage dauert in der Regel 1-3 Tage. Vorher benötigen Sie eine Genehmigung vom Netzbetreiber, was etwa 4-8 Wochen dauert. Insgesamt sollten Sie mit 2-3 Monaten rechnen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Brauche ich eine Versicherung für meine Solaranlage?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja, eine Versicherung ist empfehlenswert. Sie schützt vor Schäden durch Hagel, Blitzschlag oder Diebstahl. Die Kosten liegen bei etwa 100-200 Euro pro Jahr.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie funktioniert die Einspeisevergütung?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Für jeden Kilowattstunde Strom, den Sie ins Netz einspeisen, erhalten Sie eine Vergütung. Diese wird monatlich oder jährlich ausbezahlt. Die aktuelle Vergütung liegt bei etwa 8-10 Cent pro kWh.'
          }
        },
        {
          '@type': 'Question',
          name: 'Kann ich meine Solaranlage später erweitern?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja, Sie können Ihre Anlage später erweitern. Dies ist besonders sinnvoll, wenn Sie einen Stromspeicher oder ein Elektroauto anschaffen. Wir beraten Sie zu den Möglichkeiten.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie funktioniert die Beratung?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Wir führen ein kostenloses Beratungsgespräch durch, analysieren Ihr Dach und Ihren Stromverbrauch, und erstellen ein individuelles Angebot. Danach kümmern wir uns um alle Formalitäten und die Installation.'
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Vielen Dank für Ihre Anfrage! Wir werden uns in Kürze bei Ihnen melden.`);
    setFormData({
      eigentumsart: '',
      dachform: '',
      personen: '',
      strasse: '',
      hausnummer: '',
      plz: '',
      ort: '',
      name: '',
      email: '',
      phone: '',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Photovoltaik NRW | Energievergleich"
        description="Solaranlagen in NRW kostenlos beraten. Unabhängige Beratung für Privathaushalte. Jetzt unverbindlich anfragen!"
        keywords="Photovoltaik NRW, Solaranlage, Solarenergie, Sonnenenergie, Solaranlage kaufen"
        ogTitle="Photovoltaik NRW | Energievergleich"
        ogDescription="Kostenlose Beratung für Solaranlagen in NRW. Unabhängig und transparent."
      />
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-primary text-primary-foreground py-20 md:py-32">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Photovoltaik für NRW
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
              Nutzen Sie die Kraft der Sonne und werden Sie unabhängig von steigenden Strompreisen. Kostenlose Beratung für Ihre Solaranlage.
            </p>
            <Button
              onClick={() => document.getElementById('beratung')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-14 px-8 rounded-full text-lg font-semibold shadow-lg"
            >
              Kostenlose Beratung
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-16 text-center">
            Warum Photovoltaik in NRW?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'Wertsteigerung',
                description: 'Eine Solaranlage erhöht den Wert Ihrer Immobilie um 5-10%.'
              },
              {
                icon: Leaf,
                title: 'Klimaschutz',
                description: 'Produzieren Sie sauberen Strom und reduzieren Sie Ihren CO₂-Fußabdruck.'
              },
              {
                icon: Zap,
                title: 'Unabhängigkeit',
                description: 'Bis zu 80% Autarkie möglich. Weniger abhängig von Strompreisen.'
              },
              {
                icon: CheckCircle,
                title: 'Förderungen',
                description: 'KfW-Förderung und Einspeisevergütung reduzieren Ihre Kosten.'
              },
              {
                icon: Home,
                title: 'Langlebigkeit',
                description: '25-30 Jahre Lebensdauer. Garantie auf die Module.'
              },
              {
                icon: Sun,
                title: 'Kostenloser Strom',
                description: 'Nach der Amortisation produzieren Sie kostenlosen Strom.'
              },
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
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
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

      {/* So funktioniert's Section */}
      <section className="w-full py-24 bg-background">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-16 text-center">
            So funktioniert die Installation
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
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Kostenlose Beratung</h3>
                <p className="font-paragraph text-gray-600">
                  Wir analysieren Ihr Dach, Ihren Stromverbrauch und erstellen ein individuelles Angebot.
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
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Planung & Genehmigung</h3>
                <p className="font-paragraph text-gray-600">
                  Wir kümmern uns um alle Genehmigungen und die technische Planung.
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
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Installation & Betrieb</h3>
                <p className="font-paragraph text-gray-600">
                  Professionelle Installation und Inbetriebnahme. Danach produzieren Sie Ihren eigenen Strom.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comparison Criteria Section */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-16 text-center">
            Worauf achten wir beim Vergleich?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Dachfläche', description: 'Größe und Ausrichtung Ihres Daches bestimmen die Anlagengröße.' },
              { title: 'Stromverbrauch', description: 'Wir dimensionieren die Anlage optimal für Ihren Bedarf.' },
              { title: 'Verschattung', description: 'Bäume und Gebäude können die Leistung beeinflussen.' },
              { title: 'Speicher', description: 'Optional: Stromspeicher für höhere Unabhängigkeit.' },
              { title: 'Förderungen', description: 'Wir nutzen alle verfügbaren Förderprogramme für Sie.' },
              { title: 'Qualität', description: 'Hochwertige Module mit 25 Jahren Leistungsgarantie.' },
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

      {/* Consultation Form Section */}
      <section id="beratung" className="w-full py-24 bg-background">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2">
              <Card className="shadow-xl">
                <CardHeader className="bg-primary text-white">
                  <CardTitle className="font-heading text-2xl">Kostenlose Beratung anfragen</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="eigentumsart" className="font-paragraph">Eigentumsart *</Label>
                        <Select value={formData.eigentumsart} onValueChange={(value) => setFormData({ ...formData, eigentumsart: value })} required>
                          <SelectTrigger id="eigentumsart" className="font-paragraph">
                            <SelectValue placeholder="Wählen Sie..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="einfamilienhaus">Einfamilienhaus</SelectItem>
                            <SelectItem value="mehrfamilienhaus">Mehrfamilienhaus</SelectItem>
                            <SelectItem value="gewerbe">Gewerbe</SelectItem>
                            <SelectItem value="miete">Wohnung zur Miete</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dachform" className="font-paragraph">Dachform *</Label>
                        <Select value={formData.dachform} onValueChange={(value) => setFormData({ ...formData, dachform: value })} required>
                          <SelectTrigger id="dachform" className="font-paragraph">
                            <SelectValue placeholder="Wählen Sie..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="satteldach">Satteldach</SelectItem>
                            <SelectItem value="flachdach">Flachdach</SelectItem>
                            <SelectItem value="pultdach">Pultdach</SelectItem>
                            <SelectItem value="mansardendach">Mansardendach</SelectItem>
                            <SelectItem value="walmdach">Walmdach</SelectItem>
                            <SelectItem value="andere">Andere</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="personen" className="font-paragraph">Anzahl Personen im Haushalt</Label>
                      <Input
                        id="personen"
                        type="number"
                        placeholder="z.B. 4"
                        value={formData.personen}
                        onChange={(e) => setFormData({ ...formData, personen: e.target.value })}
                        className="font-paragraph"
                      />
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="font-heading font-bold text-primary mb-4">Adresse</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="strasse" className="font-paragraph">Straße *</Label>
                          <Input
                            id="strasse"
                            placeholder="Musterstraße"
                            value={formData.strasse}
                            onChange={(e) => setFormData({ ...formData, strasse: e.target.value })}
                            required
                            className="font-paragraph"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="hausnummer" className="font-paragraph">Hausnummer *</Label>
                          <Input
                            id="hausnummer"
                            placeholder="123"
                            value={formData.hausnummer}
                            onChange={(e) => setFormData({ ...formData, hausnummer: e.target.value })}
                            required
                            className="font-paragraph"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="plz" className="font-paragraph">PLZ *</Label>
                          <Input
                            id="plz"
                            placeholder="40210"
                            value={formData.plz}
                            onChange={(e) => setFormData({ ...formData, plz: e.target.value })}
                            required
                            className="font-paragraph"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="ort" className="font-paragraph">Ort *</Label>
                          <Input
                            id="ort"
                            placeholder="Düsseldorf"
                            value={formData.ort}
                            onChange={(e) => setFormData({ ...formData, ort: e.target.value })}
                            required
                            className="font-paragraph"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="font-heading font-bold text-primary mb-4">Kontaktinformationen</h3>
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
                    </div>

                    <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 font-bold text-lg rounded-lg">
                      <Send className="w-5 h-5 mr-2" />
                      Kostenlose Beratung anfragen
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-heading font-bold text-primary mb-4">Ihre Vorteile</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-sm">Kostenlose Beratung</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-sm">Individuelle Planung</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-sm">Alle Förderungen nutzen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-sm">Professionelle Installation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-16 text-center">
            Häufig gestellte Fragen
          </h2>

          <div className="space-y-4">
            {[
              {
                q: 'Lohnt sich eine Solaranlage?',
                a: 'Ja. Durch Einspeisevergütung und Eigennutzung amortisiert sich die Anlage meist nach 8-12 Jahren. Danach produzieren Sie kostenlosen Strom für 15-20 Jahre.'
              },
              {
                q: 'Wie viel Strom produziert eine Anlage?',
                a: 'Eine 5-kW-Anlage produziert in NRW etwa 4.500-5.000 kWh pro Jahr. Das hängt von Ausrichtung, Neigung und Verschattung ab.'
              },
              {
                q: 'Welche Förderungen gibt es?',
                a: 'KfW-Förderung, Einspeisevergütung und regionale Programme. Wir informieren Sie über alle verfügbaren Optionen.'
              },
              {
                q: 'Wie lange hält eine Solaranlage?',
                a: 'Module halten 25-30 Jahre. Die meisten Hersteller geben 25 Jahre Leistungsgarantie. Der Wechselrichter sollte nach 10-15 Jahren ausgetauscht werden.'
              },
              {
                q: 'Brauche ich einen Stromspeicher?',
                a: 'Optional. Ein Speicher erhöht Ihre Unabhängigkeit und Eigennutzung. Mit Speicher erreichen Sie bis zu 80% Autarkie.'
              },
              {
                q: 'Was kostet eine Solaranlage?',
                a: 'Eine 5-kW-Anlage kostet etwa 8.000-12.000 Euro (netto). Mit Förderungen reduziert sich die Amortisationszeit erheblich.'
              },
              {
                q: 'Kann ich eine Anlage mieten?',
                a: 'Ja. Mit Mietmodellen zahlen Sie monatlich, ohne die Anlage zu kaufen. Gut für weniger Kapitalaufwand.'
              },
              {
                q: 'Wie lange dauert die Installation?',
                a: 'Installation: 1-3 Tage. Genehmigung: 4-8 Wochen. Insgesamt: 2-3 Monate bis zur Inbetriebnahme.'
              },
              {
                q: 'Brauche ich eine Versicherung?',
                a: 'Ja, empfohlen. Sie schützt vor Hagel, Blitzschlag und Diebstahl. Kosten: etwa 100-200 Euro pro Jahr.'
              },
              {
                q: 'Wie funktioniert die Einspeisevergütung?',
                a: 'Sie erhalten Vergütung für Strom, den Sie ins Netz einspeisen. Aktuelle Rate: etwa 8-10 Cent pro kWh.'
              },
              {
                q: 'Kann ich die Anlage später erweitern?',
                a: 'Ja. Erweiterung ist sinnvoll bei Stromspeicher oder Elektroauto. Wir beraten Sie zu den Möglichkeiten.'
              },
              {
                q: 'Wie funktioniert die Beratung?',
                a: 'Kostenlose Beratung, Dachanalyse, Stromverbrauchsanalyse und individuelles Angebot. Wir kümmern uns um Formalitäten und Installation.'
              }
            ].map((item, index) => (
              <Accordion key={index} type="single" collapsible className="bg-background rounded-lg border">
                <AccordionItem value={`item-${index}`} className="border-none">
                  <AccordionTrigger className="font-heading font-bold text-lg hover:text-primary px-6 py-4">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-paragraph text-gray-600 px-6 pb-4">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      </section>

      {/* Passende Ratgeber */}
      <PassendeRatgeber moneyPageId="photovoltaik-nrw" limit={4} />

      {/* Internal Links Section */}
      <section className="w-full py-16 bg-white border-t">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <h3 className="font-heading text-2xl font-bold text-primary mb-8">Weitere Informationen</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/stromvergleich-nrw" className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">Stromvergleich NRW</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">Vergleichen Sie Stromtarife und sparen Sie Kosten.</p>
                  <Button variant="outline" size="sm">Mehr erfahren</Button>
                </CardContent>
              </Card>
            </Link>
            <Link to="/gasvergleich-nrw" className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">Gasvergleich NRW</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">Vergleichen Sie auch Ihre Gastarife.</p>
                  <Button variant="outline" size="sm">Mehr erfahren</Button>
                </CardContent>
              </Card>
            </Link>
            <Link to="/kontakt" className="group">
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

      <Footer />
    </div>
  );
}
