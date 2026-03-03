import React, { useState } from 'react';
import {
  Zap,
  CheckCircle,
  TrendingDown,
  Shield,
  Clock,
  Send,
  ArrowRight,
  AlertCircle,
  Globe,
  DollarSign,
  MapPin,
  BarChart3,
  Rocket,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import PassendeRatgeber from '@/components/PassendeRatgeber';
import TrustRow from '@/components/TrustRow';
import RelatedPages from '@/components/RelatedPages';
import RelatedCities from '@/components/RelatedCities';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';
import { getPageSEO } from '@/lib/seo-config';
import { validateFormFields, FORM_CONFIGS } from '@/lib/form-validation';
import FormSubmissionDialog from '@/components/FormSubmissionDialog';
import { trackMethodikClick } from '@/services/form-submission';
import { getRelatedPages } from '@/lib/internal-linking';
import StromvergleichCityLayout from '@/components/pages/stromvergleich/StromvergleichCityLayout';
import FAQSchema from '@/components/FAQSchema';

const FAQ_ITEMS = [
  {
    question: 'Wer ist der Grundversorger in Düsseldorf?',
    answer:
      'Stadtwerke Düsseldorf ist der Grundversorger für Düsseldorf und die unmittelbare Region. Als Grundversorger ist Stadtwerke Düsseldorf verpflichtet, jeden Haushalt mit Strom zu versorgen, auch wenn dieser nicht aktiv einen Vertrag abgeschlossen hat. Die Grundversorgung ist oft teurer als Sondertarife bei anderen Anbietern.',
  },
  {
    question: 'Wie setzt sich der Grundversorgungstarif in Düsseldorf zusammen?',
    answer:
      'Der Grundversorgungstarif in Düsseldorf wird von Stadtwerke Düsseldorf als Grundversorger festgelegt. Er setzt sich aus dem Arbeitspreis (€/kWh), der Grundgebühr (€/Monat) und den Netzentgelte zusammen. Stadtwerke Düsseldorf ist verpflichtet, alle Haushalte in Düsseldorf mit Strom zu versorgen. Die Tarife sind oft höher als Sondertarife bei anderen Anbietern, weshalb ein Wechsel meist sinnvoll ist.',
  },
  {
    question: 'Wie lange sind die Kündigungsfristen in Düsseldorf?',
    answer:
      'Bei der Grundversorgung von Stadtwerke Düsseldorf beträgt die Kündigungsfrist 2 Wochen zum Ende eines Kalendermonats. Bei Sondertarifen anderer Anbieter liegt die Frist meist bei 4 Wochen zum Monatsende. Achten Sie auf die genaue Kündigungsfrist in Ihrem Vertrag.',
  },
  {
    question: 'Was muss ich beim Umzug in Düsseldorf beachten?',
    answer:
      'Bei einem Umzug in Düsseldorf sollten Sie Ihren Stromvertrag rechtzeitig (mindestens 4 Wochen vorher) kündigen oder einen neuen Tarif für die neue Adresse abschließen. Nutzen Sie unseren Vergleichsrechner mit Ihrer neuen Postleitzahl, um die besten Tarife für Ihre neue Wohnung zu finden. Die Stromversorgung wird nicht unterbrochen.',
  },
  {
    question: 'Wie viel kann ich durch einen Stromwechsel in Düsseldorf sparen?',
    answer:
      'Die Einsparungen variieren je nach Ihrem Verbrauch und Ihrer aktuellen Versorgung. Im Durchschnitt sparen Düsseldorfer Haushalte 200-400 Euro pro Jahr durch einen Wechsel zu einem günstigeren Anbieter. Mit unserem Vergleichsrechner sehen Sie sofort, wie viel Sie sparen können.',
  },
  {
    question: 'Welche Daten brauche ich für den Stromvergleich in Düsseldorf?',
    answer:
      'Für den Stromvergleich in Düsseldorf reichen Postleitzahl und Ihr Jahresverbrauch (kWh). Optional hilft die Zählernummer für die spätere Beauftragung.',
  },
  {
    question: 'Ist der Stromanbieterwechsel in Düsseldorf kostenlos?',
    answer:
      'Ja. Der Anbieterwechsel selbst ist kostenlos. Es fallen keine Gebühren für Kündigung oder Anmeldung an. Die Stromversorgung bleibt durchgehend gewährleistet.',
  },
  {
    question: 'Wie lange dauert ein Stromwechsel in Düsseldorf?',
    answer:
      'Das hängt von der Kündigungsfrist Ihres aktuellen Vertrags ab. In der Praxis dauert ein Wechsel häufig einige Wochen.',
  },
] as const;

export default function StromvergleichDuesseldorfPage() {
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
  const [showFormDialog, setShowFormDialog] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

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

  const handleFormSubmit = () => {
    setShowFormDialog(true);
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
        title: 'Stromvergleich Düsseldorf 2026 | Günstige Tarife für Düsseldorfer Haushalte',
        description:
          'Stromvergleich für Düsseldorf – Tarife vergleichen & bis zu 30 % sparen. Kostenloser Stromtarif-Rechner für Düsseldorfer Haushalte.',
        keywords: 'Stromvergleich Düsseldorf, Stromtarife Düsseldorf, Stromanbieter Düsseldorf, Stromwechsel Düsseldorf',
        canonical: 'https://www.energievergleich.shop/stromvergleich-duesseldorf',
        ogTitle: 'Stromvergleich Düsseldorf 2026 | Günstige Tarife für Düsseldorfer Haushalte',
        ogDescription:
          'Stromvergleich für Düsseldorf – Tarife vergleichen & bis zu 30 % sparen. Kostenloser Stromtarif-Rechner für Düsseldorfer Haushalte.',
      }}
      breadcrumbLabel="Stromvergleich Düsseldorf"
      breadcrumbPath="/stromvergleich-duesseldorf"
      breadcrumbAbsoluteUrl="https://www.energievergleich.shop/stromvergleich-duesseldorf"
      cityName="Düsseldorf"
      citySlug="duesseldorf"
    >
      <FAQSchema items={[...FAQ_ITEMS]} />

      <div className="min-h-screen bg-background break-words leading-mobile">
        {/* Hero Section - LCP Optimized */}
        <section className="w-full bg-primary text-primary-foreground py-20 md:py-32">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl"
            >
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 leading-tight max-w-[22ch] sm:max-w-none break-words">
                Stromvergleich Düsseldorf: Günstige Tarife für Düsseldorfer Haushalte
              </h1>
              <p className="font-paragraph text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
                Finden Sie den günstigsten Stromtarif in Düsseldorf. Kostenlos, unabhängig und in wenigen Minuten.
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
            </div>
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
                  <CardContent className="p-8 overflow-hidden">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="plz" className="font-paragraph">
                            Postleitzahl *
                          </Label>
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
                          placeholder=""
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="font-paragraph w-full"
                        />
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

                {/* Results Section */}
                {showResults && (
                  <div className="mt-12"
                  >
                    <h2 className="font-heading text-2xl font-bold text-primary mb-8">Tarifvorschau für {formData.postleitzahl}</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                      {[
                        {
                          name: 'Tarif Option A',
                          pricePerKwh: 0.28,
                          baseFee: 12.5,
                        },
                        {
                          name: 'Tarif Option B',
                          pricePerKwh: 0.26,
                          baseFee: 14.0,
                        },
                        {
                          name: 'Tarif Option C',
                          pricePerKwh: 0.24,
                          baseFee: 16.5,
                        },
                      ].map((tariff, index) => {
                        const monthlyConsumption = calculatedConsumption / 12;
                        const monthlyPrice = monthlyConsumption * tariff.pricePerKwh + tariff.baseFee;
                        const yearlyPrice = monthlyPrice * 12;

                        return (
                          <div key={index}
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
                          </div>
                        );
                      })}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="font-paragraph text-sm text-gray-700">
                        <strong>Hinweis:</strong> Vorschau basiert auf Beispielrechnung. Finale Tarife nach Anbieterabfrage.
                      </p>
                    </div>
                  </div>
                )}
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
                      <span className="font-paragraph text-sm">Alle Anbieter in Düsseldorf</span>
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
        
        {/* FAQ Section */}
        <section className="w-full py-24 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary mb-16 text-center">
              Häufig gestellte Fragen
            </h2>

            <div className="space-y-4">
              {FAQ_ITEMS.map((item, index) => (
                <Accordion key={index} type="single" collapsible className="bg-white rounded-lg border">
                  <AccordionItem value={`item-${index}`} className="border-none">
                    <AccordionTrigger className="font-heading font-bold text-lg hover:text-primary px-6 py-4">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="font-paragraph text-gray-600 px-6 pb-4">{item.answer}</AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </div>
        </section>

        {/* Passende Ratgeber */}
        <PassendeRatgeber moneyPageId="stromvergleich-duesseldorf" limit={4} />

        {/* Related Pages - Cross-Linking */}
        <RelatedPages pages={getRelatedPages('/stromvergleich-duesseldorf')} />

        <RelatedCities currentCity="duesseldorf" />
      </div>
    </StromvergleichCityLayout>
  );
}
