import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Send, ArrowRight, AlertCircle, Globe, DollarSign, MapPin, BarChart3, Rocket, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import PassendeRatgeber from '@/components/PassendeRatgeber';
import RelatedPages from '@/components/RelatedPages';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';
import { validateFormFields, FORM_CONFIGS } from '@/lib/form-validation';
import { getRelatedPages } from '@/lib/internal-linking';
import StromvergleichCityLayout from '@/components/pages/stromvergleich/StromvergleichCityLayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function StromvergleichKoelnPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    postleitzahl: '',
    verbrauch: '',
    name: '',
    email: '',
    phone: '',
  });
  const [showResults, setShowResults] = useState(false);
  const [calculatedConsumption, setCalculatedConsumption] = useState(0);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Wie setzt sich der Grundversorgungstarif in Köln zusammen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Der Grundversorgungstarif in Köln wird von RheinEnergie als Grundversorger festgelegt. Er setzt sich aus dem Arbeitspreis (€/kWh), der Grundgebühr (€/Monat) und den Netzentgelte zusammen. RheinEnergie ist verpflichtet, alle Haushalte in Köln mit Strom zu versorgen. Die Tarife sind oft höher als Sondertarife bei anderen Anbietern, weshalb ein Wechsel meist sinnvoll ist.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wer ist der Grundversorger in Köln?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'RheinEnergie ist der Grundversorger für Köln und die Region. Als Grundversorger ist RheinEnergie verpflichtet, jeden Haushalt mit Strom zu versorgen, auch wenn dieser nicht aktiv einen Vertrag abgeschlossen hat. Die Grundversorgung ist oft teurer als Sondertarife bei anderen Anbietern.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie lange sind die Kündigungsfristen in Köln?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Bei der Grundversorgung von RheinEnergie beträgt die Kündigungsfrist 2 Wochen zum Ende eines Kalendermonats. Bei Sondertarifen anderer Anbieter liegt die Frist meist bei 4 Wochen zum Monatsende. Achten Sie auf die genaue Kündigungsfrist in Ihrem Vertrag.'
          }
        },
        {
          '@type': 'Question',
          name: 'Was muss ich beim Umzug in Köln beachten?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Bei einem Umzug in Köln sollten Sie Ihren Stromvertrag rechtzeitig (mindestens 4 Wochen vorher) kündigen oder einen neuen Tarif für die neue Adresse abschließen. Nutzen Sie unseren Vergleichsrechner mit Ihrer neuen Postleitzahl, um die besten Tarife für Ihre neue Wohnung zu finden. Die Stromversorgung wird nicht unterbrochen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie oft kann ich meinen Stromanbieter in Köln wechseln?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sie können jederzeit wechseln, müssen aber die Kündigungsfrist einhalten. Bei den meisten Verträgen beträgt diese 4 Wochen zum Ende eines Kalendermonats. Nach einem Wechsel können Sie frühestens nach 12 Monaten erneut wechseln, es sei denn, Sie haben einen Vertrag mit kürzerer Laufzeit abgeschlossen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Ist der Stromwechsel in Köln kostenlos?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja, der Wechsel zu einem neuen Stromanbieter ist völlig kostenlos. Es fallen keine Gebühren für die Kündigung beim alten Anbieter oder für die Anmeldung beim neuen Anbieter an. Der Wechsel wird von uns komplett übernommen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie lange dauert ein Stromwechsel in Köln?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ein Stromwechsel dauert in der Regel einige Wochen. Das hängt vor allem von der Kündigungsfrist Ihres aktuellen Vertrags ab. Während dieser Zeit wird Ihre Stromversorgung nicht unterbrochen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Kann ich während eines Wechsels ohne Strom sein?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nein, das ist nicht möglich. Ihre Stromversorgung ist gesetzlich geschützt und wird nicht unterbrochen. Selbst wenn es zu Verzögerungen kommt, springt der Grundversorger (RheinEnergie) ein und beliefert Sie mit Strom.'
          }
        },
        {
          '@type': 'Question',
          name: 'Welche Daten benötige ich für einen Stromwechsel in Köln?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sie benötigen Ihre Postleitzahl (z.B. 50667 für die Kölner Innenstadt), Ihren jährlichen Stromverbrauch (in kWh) und optional Ihre Zählernummer. Den Stromverbrauch finden Sie auf Ihrer letzten Stromrechnung. Mit diesen Informationen können wir Ihnen passende Tarife anzeigen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie viel kann ich durch einen Stromwechsel in Köln sparen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Das hängt von Ihrem Verbrauch, Ihrem aktuellen Tarif und den verfügbaren Angeboten ab. Ein Vergleich lohnt sich häufig, weil Grundversorgung und alte Tarife oft teurer sind als aktuelle Angebote.'
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

    const validation = validateFormFields(formData, FORM_CONFIGS.private);
    if (!validation.valid) {
      setFormErrors(validation.errors);
      return;
    }

    setFormErrors({});

    const consumption = formData.verbrauch && parseInt(formData.verbrauch) > 0 ? parseInt(formData.verbrauch) : 3500;

    setCalculatedConsumption(consumption);
    setShowResults(true);
  };

  const handleFormSuccess = () => {
    setFormData({
      postleitzahl: '',
      verbrauch: '',
      name: '',
      email: '',
      phone: '',
    });
    setShowResults(false);
    setFormErrors({});
    setTimeout(() => {
      navigate('/danke');
    }, 2000);
  };

  return (
    <StromvergleichCityLayout
      seo={{
        title: 'Stromvergleich Köln | Stromtarife vergleichen & sparen',
        description: 'Stromtarife in Köln vergleichen: passende Angebote finden, Kosten senken und einfach wechseln. Kostenlos und unabhängig.',
        keywords: 'Stromvergleich Köln, Stromtarife Köln, Stromanbieter Köln, Stromwechsel Köln',
        ogTitle: 'Stromvergleich Köln | Stromtarife vergleichen & sparen',
        ogDescription: 'Stromtarife in Köln vergleichen, sparen und einfach wechseln. Kostenlos und unabhängig.',
      }}
      breadcrumbLabel="Stromvergleich Köln"
      breadcrumbPath="/stromvergleich-koeln"
      breadcrumbAbsoluteUrl="https://www.energievergleich.shop/stromvergleich-koeln"
    >
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
              Stromvergleich Köln: Günstige Tarife für Kölner Haushalte
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
              Finden Sie passende Stromtarife in Köln. Kostenlos, unabhängig und in wenigen Minuten.
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
                          placeholder="z.B. 50667"
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
                        placeholder=""
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
                  <h2 className="font-heading text-2xl font-bold text-primary mb-8">Tarifvorschau für {formData.postleitzahl}</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {[
                      { name: 'Tarif Option A', pricePerKwh: 0.28, baseFee: 12.50 },
                      { name: 'Tarif Option B', pricePerKwh: 0.26, baseFee: 14.00 },
                      { name: 'Tarif Option C', pricePerKwh: 0.24, baseFee: 16.50 },
                    ].map((tariff, index) => {
                      const monthlyConsumption = calculatedConsumption / 12;
                      const monthlyPrice = (monthlyConsumption * tariff.pricePerKwh) + tariff.baseFee;
                      const yearlyPrice = monthlyPrice * 12;

                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
                              <CardTitle className="font-heading text-xl text-primary">{tariff.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 flex-1 flex flex-col justify-between">
                              <div className="space-y-4 mb-6">
                                <div>
                                  <p className="font-paragraph text-sm text-gray-600 mb-1">Arbeitspreis</p>
                                  <p className="font-heading text-lg font-bold text-primary">{tariff.pricePerKwh.toFixed(2)} €/kWh</p>
                                </div>
                                <div>
                                  <p className="font-paragraph text-sm text-gray-600 mb-1">Grundgebühr</p>
                                  <p className="font-heading text-lg font-bold text-primary">{tariff.baseFee.toFixed(2)} €/Monat</p>
                                </div>
                                <div className="border-t pt-4">
                                  <p className="font-paragraph text-sm text-gray-600 mb-1">Geschätzte monatliche Kosten</p>
                                  <p className="font-heading text-2xl font-bold text-secondary">{monthlyPrice.toFixed(2)} €</p>
                                </div>
                                <div>
                                  <p className="font-paragraph text-sm text-gray-600 mb-1">Geschätzte jährliche Kosten</p>
                                  <p className="font-heading text-lg font-bold text-primary">{yearlyPrice.toFixed(2)} €/Jahr</p>
                                </div>
                              </div>
                              <Link to={ROUTES.kontakt} className="w-full">
                                <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-11 font-bold rounded-lg">
                                  Angebot anfordern
                                  <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                              </Link>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="font-paragraph text-sm text-gray-700">
                      <strong>Hinweis:</strong> Vorschau basiert auf Beispielrechnung. Finale Tarife nach Anbieterabfrage.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-heading font-bold text-primary mb-4">Warum mit uns vergleichen?</h3>
                <ul className="space-y-3">
                  {[
                    '100% unabhängig und kostenlos',
                    'Alle Anbieter in Köln',
                    'Transparente Tarifdetails',
                    'Wir kümmern uns um den Wechsel',
                  ].map((text) => (
                    <li key={text} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-paragraph text-sm">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* (Restlicher City-spezifischer Content bleibt unverändert) */}
      {/* FAQ Section */}
      <section className="w-full py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary mb-16 text-center">
            Häufig gestellte Fragen
          </h2>

          <div className="space-y-4">
            {[
              {
                q: 'Wie setzt sich der Grundversorgungstarif in Köln zusammen?',
                a: 'Der Grundversorgungstarif in Köln wird von RheinEnergie als Grundversorger festgelegt. Er setzt sich aus dem Arbeitspreis (€/kWh), der Grundgebühr (€/Monat) und den Netzentgelte zusammen. RheinEnergie ist verpflichtet, alle Haushalte in Köln mit Strom zu versorgen.'
              },
              {
                q: 'Wer ist der Grundversorger in Köln?',
                a: 'RheinEnergie ist der Grundversorger für Köln und die Region. Als Grundversorger ist RheinEnergie verpflichtet, jeden Haushalt mit Strom zu versorgen, auch wenn dieser nicht aktiv einen Vertrag abgeschlossen hat.'
              },
              {
                q: 'Wie lange sind die Kündigungsfristen in Köln?',
                a: 'Bei der Grundversorgung von RheinEnergie beträgt die Kündigungsfrist 2 Wochen zum Ende eines Kalendermonats. Bei Sondertarifen anderer Anbieter liegt die Frist meist bei 4 Wochen zum Monatsende.'
              },
              {
                q: 'Was muss ich beim Umzug in Köln beachten?',
                a: 'Bei einem Umzug in Köln sollten Sie Ihren Stromvertrag rechtzeitig (mindestens 4 Wochen vorher) kündigen oder einen neuen Tarif für die neue Adresse abschließen. Nutzen Sie unseren Vergleichsrechner mit Ihrer neuen Postleitzahl.'
              },
              {
                q: 'Wie oft kann ich meinen Stromanbieter in Köln wechseln?',
                a: 'Sie können jederzeit wechseln, müssen aber die Kündigungsfrist einhalten. Nach einem Wechsel können Sie frühestens nach 12 Monaten erneut wechseln.'
              },
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

      {/* Passende Ratgeber */}
      <PassendeRatgeber moneyPageId="stromvergleich-koeln" limit={4} />

      {/* Related Pages - Cross-Linking */}
      <RelatedPages pages={getRelatedPages('/stromvergleich-koeln')} />
    </StromvergleichCityLayout>
  );
}
