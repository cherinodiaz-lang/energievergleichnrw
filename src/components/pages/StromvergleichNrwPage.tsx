import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, CheckCircle, TrendingDown, Shield, Clock, Send, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import PassendeRatgeber from '@/components/PassendeRatgeber';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';

export default function StromvergleichNrwPage() {
  const [formData, setFormData] = useState({
    postleitzahl: '',
    haushaltsgröße: '',
    verbrauch: '',
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
            text: 'Ja, der Wechsel zu einem neuen Stromanbieter ist völlig kostenlos. Es fallen keine Gebühren für die Kündigung beim alten Anbieter oder für die Anmeldung beim neuen Anbieter an. Der Wechsel wird von uns komplett übernommen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie lange dauert ein Stromwechsel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ein Stromwechsel dauert in der Regel 4-6 Wochen. Dies ist die gesetzliche Kündigungsfrist. Während dieser Zeit wird Ihre Stromversorgung nicht unterbrochen. Der neue Anbieter kümmert sich um alle notwendigen Formalitäten.'
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
            text: 'Sie benötigen Ihre Postleitzahl, Ihren jährlichen Stromverbrauch (in kWh) und optional Ihre Zählernummer. Den Stromverbrauch finden Sie auf Ihrer letzten Stromrechnung. Mit diesen Informationen können wir Ihnen die besten Tarife anzeigen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie viel kann ich durch einen Stromwechsel sparen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Die Einsparungen variieren je nach Ihrem Verbrauch und Ihrer Region in NRW. Im Durchschnitt sparen Haushalte 200-400 Euro pro Jahr durch einen Wechsel zu einem günstigeren Anbieter. Mit unserem Vergleichsrechner sehen Sie sofort, wie viel Sie sparen können.'
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
            text: 'Geben Sie Ihre Postleitzahl und Ihren Stromverbrauch ein. Der Rechner zeigt Ihnen dann alle verfügbaren Tarife in Ihrer Region, sortiert nach Preis. Sie sehen alle wichtigen Informationen wie Arbeitspreis, Grundpreis, Laufzeit und Preisgarantie auf einen Blick.'
          }
        },
        {
          '@type': 'Question',
          name: 'Gibt es versteckte Gebühren beim Wechsel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nein. Der Wechsel ist komplett kostenlos. Es gibt keine versteckten Gebühren. Alle Kosten sind transparent in den Tarifdetails aufgeführt. Wir zeigen Ihnen immer die Gesamtkosten pro Jahr.'
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
    setFormData({ postleitzahl: '', haushaltsgröße: '', verbrauch: '', name: '', email: '', phone: '' });
  };

  return (
    <div className="min-h-screen bg-background break-words leading-mobile">
      <SEOHead
        title="Stromvergleich NRW | Energievergleich"
        description="Stromtarife in NRW kostenlos vergleichen und wechseln. Unabhängig, transparent und ohne Verpflichtung. Jetzt Tarife vergleichen!"
        keywords="Stromvergleich NRW, Stromtarife, Strom sparen, Stromanbieter wechseln, günstige Stromtarife"
        ogTitle="Stromvergleich NRW | Energievergleich"
        ogDescription="Kostenlos Stromtarife in NRW vergleichen. Unabhängig und transparent."
      />
      <Header />

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
              Stromvergleich für NRW
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
              Finden Sie den günstigsten Stromtarif in Ihrer Region. Kostenlos, unabhängig und in wenigen Minuten.
            </p>
            <Button
              onClick={() => document.getElementById('vergleich')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-14 px-8 rounded-full text-lg font-semibold shadow-lg"
            >
              Jetzt vergleichen
            </Button>
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
                        <Label htmlFor="haushalt" className="font-paragraph">Haushaltsgröße *</Label>
                        <Select value={formData.haushaltsgröße} onValueChange={(value) => setFormData({ ...formData, haushaltsgröße: value })} required>
                          <SelectTrigger id="haushalt" className="font-paragraph w-full">
                            <SelectValue placeholder="Wählen Sie..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Person (ca. 1.500 kWh)</SelectItem>
                            <SelectItem value="2">2 Personen (ca. 2.500 kWh)</SelectItem>
                            <SelectItem value="3">3 Personen (ca. 3.500 kWh)</SelectItem>
                            <SelectItem value="4">4+ Personen (ca. 4.250 kWh)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-paragraph">E-Mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="max@beispiel.de"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="font-paragraph w-full"
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
                          className="font-paragraph w-full"
                        />
                      </div>
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
                    <span className="font-paragraph text-sm">Alle Anbieter in NRW</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-sm">Transparente Tarifdetails</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-sm">Wir kümmern uns um den Wechsel</span>
                  </li>
                </ul>
              </div>
            </div>
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
                  Sehen Sie alle verfügbaren Tarife mit Preis, Laufzeit und Preisgarantie auf einen Blick.
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
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Wechsel abschließen</h3>
                <p className="font-paragraph text-gray-600">
                  Wählen Sie Ihren Wunsch-Tarif und wir kümmern uns um alle Formalitäten. Kostenlos und sicher.
                </p>
              </div>
            </motion.div>
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
                a: 'Ja, völlig kostenlos. Es fallen keine Gebühren für Kündigung oder Anmeldung an. Wir kümmern uns um alle Formalitäten.'
              },
              {
                q: 'Wie lange dauert ein Stromwechsel?',
                a: 'In der Regel 4-6 Wochen. Ihre Stromversorgung wird nicht unterbrochen. Der neue Anbieter kümmert sich um alle notwendigen Schritte.'
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
                a: 'Geben Sie Postleitzahl und Verbrauch ein. Der Rechner zeigt alle Tarife sortiert nach Preis mit Arbeitspreis, Grundpreis, Laufzeit und Garantie.'
              },
              {
                q: 'Gibt es versteckte Gebühren?',
                a: 'Nein. Der Wechsel ist komplett kostenlos. Alle Kosten sind transparent aufgeführt. Wir zeigen immer die Gesamtkosten pro Jahr.'
              }
            ].map((item, index) => (
              <Accordion key={index} type="single" collapsible className="bg-white rounded-lg border">
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

      {/* Internal Links Section */}
      <section className="w-full py-16 bg-white border-t">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <h3 className="font-heading text-2xl font-bold text-primary mb-8">Weitere Informationen</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to={ROUTES.GASVERGLEICH_NRW} className="group">
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
      <PassendeRatgeber moneyPageId="stromvergleich-nrw" limit={4} />

      <Footer />
    </div>
  );
}
