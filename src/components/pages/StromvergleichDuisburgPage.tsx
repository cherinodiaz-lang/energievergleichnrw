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
import { ROUTES } from '@/lib/routes';
import { validateFormFields, FORM_CONFIGS } from '@/lib/form-validation';
import { getRelatedPages } from '@/lib/internal-linking';
import StromvergleichCityLayout from '@/components/pages/stromvergleich/StromvergleichCityLayout';

export default function StromvergleichDuisburgPage() {
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
          name: 'Was ist die Grundversorgung in Duisburg?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Die Grundversorgung ist der Tarif, der automatisch gilt, wenn kein anderer Stromvertrag abgeschlossen wurde. Sie bietet Versorgungssicherheit, ist aber nicht immer die günstigste Option.',
          },
        },
        {
          '@type': 'Question',
          name: 'Welche Kündigungsfristen gelten beim Stromwechsel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Die Kündigungsfrist hängt vom aktuellen Vertrag ab. In der Grundversorgung sind Fristen oft kürzer als bei Sonderverträgen. Prüfen Sie Ihre Vertragsunterlagen.',
          },
        },
        {
          '@type': 'Question',
          name: 'Welche Angaben brauche ich für den Stromvergleich in Duisburg?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Für einen Vergleich reichen Postleitzahl und Jahresverbrauch (kWh). Optional hilft die Zählernummer bei der späteren Beauftragung.',
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
        title: 'Stromvergleich Duisburg | Stromtarife vergleichen & einfach wechseln',
        description:
          'Stromtarife in Duisburg vergleichen: passende Angebote finden, Kosten senken und unkompliziert wechseln. Kostenlos und unverbindlich.',
        keywords: 'Stromvergleich Duisburg, Stromtarife Duisburg, Stromanbieter Duisburg, Stromwechsel Duisburg',
        canonical: 'https://www.energievergleich.shop/stromvergleich-duisburg',
        ogTitle: 'Stromvergleich Duisburg | Stromtarife vergleichen & wechseln',
        ogDescription: 'Stromtarife in Duisburg vergleichen, passende Angebote finden und einfach wechseln.',
      }}
      breadcrumbLabel="Stromvergleich Duisburg"
      breadcrumbPath="/stromvergleich-duisburg"
      breadcrumbAbsoluteUrl="https://www.energievergleich.shop/stromvergleich-duisburg"
    >
      <section className="w-full bg-primary text-primary-foreground py-20 md:py-32">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 leading-tight">
              Stromvergleich Duisburg: Tarife nach PLZ vergleichen
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
              Vergleichen Sie Stromtarife in Duisburg nach Postleitzahl und Verbrauch – übersichtlich und unverbindlich.
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
                          placeholder="z.B. 47051"
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

                    <Button
                      type="submit"
                      className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 font-bold text-lg rounded-lg"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Tarife vergleichen
                    </Button>
                  </form>
                </CardContent>
              </Card>

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
                      { name: 'Tarif Option A', pricePerKwh: 0.28, baseFee: 12.5 },
                      { name: 'Tarif Option B', pricePerKwh: 0.26, baseFee: 14.0 },
                      { name: 'Tarif Option C', pricePerKwh: 0.24, baseFee: 16.5 },
                    ].map((tariff, index) => {
                      const monthlyConsumption = calculatedConsumption / 12;
                      const monthlyPrice = monthlyConsumption * tariff.pricePerKwh + tariff.baseFee;
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
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-sm">Unabhängig und kostenlos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-sm">Tarife passend zur PLZ</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-sm">Einfacher Wechselprozess</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold text-primary mb-6">Häufige Fragen zum Stromvergleich in Duisburg</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Was ist die Grundversorgung?',
                  a: 'Die Grundversorgung greift automatisch ohne aktiven Vertrag. Ein Vergleich lohnt sich häufig, weil Sondertarife bessere Konditionen haben können.',
                },
                {
                  q: 'Wie finde ich meinen Verbrauch?',
                  a: 'Den Jahresverbrauch finden Sie auf Ihrer letzten Stromrechnung (in kWh).',
                },
                {
                  q: 'Kann es zu einer Unterbrechung kommen?',
                  a: 'Nein. Die Versorgung bleibt auch während eines Anbieterwechsels durchgehend gesichert.',
                },
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
        </div>
      </section>

      <PassendeRatgeber moneyPageId="stromvergleich-duisburg" limit={4} />
      <RelatedPages pages={getRelatedPages('/stromvergleich-duisburg')} />
    </StromvergleichCityLayout>
  );
}
