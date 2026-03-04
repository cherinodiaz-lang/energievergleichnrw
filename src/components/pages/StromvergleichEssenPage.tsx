import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, CheckCircle, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import PassendeRatgeber from '@/components/PassendeRatgeber';
import RelatedPages from '@/components/RelatedPages';
import RelatedCities from '@/components/RelatedCities';
import StromvergleichCityLayout from '@/components/pages/stromvergleich/StromvergleichCityLayout';

import { ROUTES } from '@/lib/routes';
import { validateFormFields, FORM_CONFIGS } from '@/lib/form-validation';
import { getRelatedPages } from '@/lib/internal-linking';

export default function StromvergleichEssenPage() {
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
          name: 'Welche Daten brauche ich für den Stromvergleich in Essen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Für den Stromvergleich in Essen reichen Postleitzahl und Ihr Jahresverbrauch (kWh). Optional hilft die Zählernummer für die spätere Beauftragung.',
          },
        },
        {
          '@type': 'Question',
          name: 'Ist der Stromanbieterwechsel in Essen kostenlos?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja. Der Anbieterwechsel selbst ist kostenlos. Es fallen keine Gebühren für Kündigung oder Anmeldung an. Die Stromversorgung bleibt durchgehend gewährleistet.',
          },
        },
        {
          '@type': 'Question',
          name: 'Wie lange dauert ein Stromwechsel in Essen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Das hängt von der Kündigungsfrist Ihres aktuellen Vertrags ab. In der Praxis dauert ein Wechsel häufig einige Wochen.',
          },
        },
      ],
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

  return (
    <StromvergleichCityLayout
      seo={{
        title: 'Stromvergleich Essen | Stromtarife vergleichen & sparen',
        description: 'Stromtarife in Essen vergleichen: passende Angebote finden, Kosten senken und einfach wechseln. Kostenlos und unabhängig.',
        keywords: 'Stromvergleich Essen, Stromtarife Essen, Stromanbieter Essen, Stromwechsel Essen',
        canonical: 'https://www.energievergleich.shop/stromvergleich-essen',
        ogTitle: 'Stromvergleich Essen | Stromtarife vergleichen & sparen',
        ogDescription: 'Stromtarife in Essen vergleichen, sparen und einfach wechseln. Kostenlos und unabhängig.',
      }}
      breadcrumbLabel="Stromvergleich Essen"
      breadcrumbPath="/stromvergleich-essen"
      breadcrumbAbsoluteUrl="https://www.energievergleich.shop/stromvergleich-essen"
      cityName="Essen"
      citySlug="essen"
    >
      <div className="min-h-screen bg-background break-words leading-mobile">
        {/* Hero */}
        <section className="w-full bg-primary text-primary-foreground py-20 md:py-32">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 leading-tight max-w-[22ch] sm:max-w-none break-words">
                Stromvergleich Essen: Tarife finden, Kosten senken
              </h1>
              <p className="font-paragraph text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
                Kostenlos vergleichen – mit PLZ starten und passende Stromtarife für Essen sehen.
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

        {/* Vergleich */}
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
                          <Label htmlFor="plz" className="font-paragraph">
                            Postleitzahl *
                          </Label>
                          <Input
                            id="plz"
                            placeholder="z.B. 45127"
                            value={formData.postleitzahl}
                            onChange={(e) => setFormData({ ...formData, postleitzahl: e.target.value })}
                            required
                            className="font-paragraph w-full"
                          />
                          {formErrors.postleitzahl && <p className="text-sm text-red-600">{formErrors.postleitzahl}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="verbrauch" className="font-paragraph">
                            Jahresverbrauch (kWh) <span className="text-gray-400 text-sm">(optional)</span>
                          </Label>
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
                        <Label htmlFor="name" className="font-paragraph">
                          Name *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="font-paragraph w-full"
                        />
                        {formErrors.name && <p className="text-sm text-red-600">{formErrors.name}</p>}
                      </div>

                      <div className="flex justify-stretch sm:justify-start">
                        <Button
                          type="submit"
                          className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 font-bold text-lg rounded-lg"
                        >
                          <Send className="w-5 h-5 mr-2" />
                          Tarife vergleichen
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                {showResults && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-12">
                    <h2 className="font-heading text-2xl font-bold text-primary mb-8">Tarifvorschau für {formData.postleitzahl}</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                      {[
                        { name: 'Tarif Option A', pricePerKwh: 0.28, baseFee: 12.5 },
                        { name: 'Tarif Option B', pricePerKwh: 0.26, baseFee: 14.0 },
                        { name: 'Tarif Option C', pricePerKwh: 0.24, baseFee: 16.5 },
                      ].map((tariff, index) => {
                        const monthlyConsumption = calculatedConsumption / 12;
                        const monthlyPrice = monthlyConsumption * tariff.pricePerKwh + tariff.baseFee;
                        const yearlyPrice = monthlyPrice * 12;

                        return (
                          <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
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
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-paragraph text-sm">Unabhängig und kostenlos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-paragraph text-sm">Tarife nach PLZ / Netzgebiet</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-paragraph text-sm">Kriterien: Preis, Laufzeit, Preisgarantie</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-paragraph text-sm">Beratung, wenn du sie brauchst</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-heading font-bold text-primary mb-3">PLZ-Beispiele in Essen</h3>
                  <p className="font-paragraph text-sm text-gray-700">z.B. 45127, 45128, 45130, 45131, 45133, 45136.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full py-24 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary mb-16 text-center">
              Häufige Fragen zum Stromvergleich in Essen
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: 'Wie finde ich den passenden Stromtarif in Essen?',
                  a: 'Gib deine Postleitzahl in Essen ein und vergleiche Tarife nach Preis, Laufzeit und Preisgarantie. Optional hilft dein Jahresverbrauch (kWh) für realistischere Kosten.',
                },
                { q: 'Welche Angaben brauche ich?', a: 'Mindestens die PLZ. Sinnvoll sind außerdem Jahresverbrauch und optional die Zählernummer.' },
                { q: 'Kann ich beim Wechsel ohne Strom sein?', a: 'Nein – die Versorgung bleibt in Deutschland durchgehend abgesichert.' },
                { q: 'Wie lange dauert ein Wechsel?', a: 'Je nach Vertrag/Kündigungsfrist oft einige Wochen. Die Versorgung läuft in der Zeit weiter.' },
              ].map((item, index) => (
                <Accordion key={index} type="single" collapsible className="bg-white rounded-lg border">
                  <AccordionItem value={`item-${index}`} className="border-none">
                    <AccordionTrigger className="font-heading font-bold text-lg hover:text-primary px-6 py-4">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="font-paragraph text-gray-600 px-6 pb-4">{item.a}</AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </div>
        </section>

        <PassendeRatgeber moneyPageId="stromvergleich-essen" limit={4} />
        <RelatedPages pages={getRelatedPages('/stromvergleich-essen')} />

        <RelatedCities currentCity="essen" />
      </div>
    </StromvergleichCityLayout>
  );
}
