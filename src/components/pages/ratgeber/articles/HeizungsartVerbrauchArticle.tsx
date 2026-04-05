import { useEffect } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/Header';
import DeferredFooter from '@/components/DeferredFooter';
import SEOHead from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';

export default function HeizungsartVerbrauchArticle() {
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Wie berechne ich meinen Gasverbrauch?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Der Gasverbrauch steht auf Ihrer letzten Gasrechnung in kWh. Alternativ können Sie ihn anhand Ihrer Wohnfläche und Heizungsart schätzen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Welche Heizungsarten gibt es?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Die wichtigsten sind: Gasheizung, Ölheizung, Wärmepumpe, Fernwärme und Holzheizung. Gasheizungen sind in Deutschland am weitesten verbreitet.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie viel Gas verbraucht eine Gasheizung?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Der Verbrauch hängt von Wohnfläche, Isolierung und Heizgewohnheiten ab. Im Durchschnitt verbraucht ein Haushalt mit 100 m² etwa 10.000-15.000 kWh pro Jahr.'
          }
        },
        {
          '@type': 'Question',
          name: 'Kann ich meinen Gasverbrauch senken?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja, durch bessere Isolierung, moderne Heizungsanlage, richtige Raumtemperatur und Lüftungsverhalten können Sie Ihren Verbrauch um 10-20% senken.'
          }
        },
        {
          '@type': 'Question',
          name: 'Was ist ein durchschnittlicher Gasverbrauch?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ein 4-Personen-Haushalt mit 120 m² verbraucht durchschnittlich 12.000-20.000 kWh pro Jahr, je nach Isolierung und Heizverhalten.'
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

  return (
    <div className="min-h-screen bg-background break-words leading-mobile">
      <SEOHead
        title="Heizungsart und Gasverbrauch: Wie viel verbrauchen Sie? | Energievergleich"
        description="Erfahren Sie, wie Sie Ihren Gasverbrauch berechnen und welche Heizungsart am effizientesten ist."
        keywords="Gasverbrauch, Heizungsart, Gasheizung, Verbrauch berechnen, Energieverbrauch"
        ogTitle="Heizungsart und Gasverbrauch"
        ogDescription="Berechnen Sie Ihren Gasverbrauch und finden Sie die richtige Heizungsart."
      />
      <Header />

      <section className="w-full bg-primary text-primary-foreground py-20 md:py-32">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div
            className="max-w-3xl"
          >
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Heizungsart und Gasverbrauch
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90">
              Wie Sie Ihren Gasverbrauch berechnen und optimieren
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div
          >
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
              <p className="font-paragraph text-gray-700 leading-relaxed">
                Der Gasverbrauch hängt stark von Ihrer Heizungsart und Ihrem Verhalten ab. Erfahren Sie, wie Sie Ihren Verbrauch richtig einschätzen und optimieren.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Gasverbrauch berechnen
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Der einfachste Weg ist, auf Ihrer letzten Gasrechnung nachzuschauen. Dort finden Sie den Jahresverbrauch in kWh. Alternativ können Sie den Verbrauch anhand Ihrer Wohnfläche und Heizungsart schätzen.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Heizungsarten im Überblick
                </h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="font-bold text-gray-900 mb-2">Gasheizung</h3>
                    <p className="font-paragraph text-gray-700 text-sm">Die häufigste Heizungsart in Deutschland. Verbrauch: 10-20 kWh pro m² pro Jahr.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="font-bold text-gray-900 mb-2">Ölheizung</h3>
                    <p className="font-paragraph text-gray-700 text-sm">Ähnlicher Verbrauch wie Gasheizung. Wird zunehmend durch Gasheizungen ersetzt.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="font-bold text-gray-900 mb-2">Wärmepumpe</h3>
                    <p className="font-paragraph text-gray-700 text-sm">Sehr effizient. Verbrauch: 5-10 kWh pro m² pro Jahr (Stromverbrauch).</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="font-bold text-gray-900 mb-2">Fernwärme</h3>
                    <p className="font-paragraph text-gray-700 text-sm">Zentrale Wärmeversorgung. Verbrauch variiert je nach Anbieter.</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Verbrauch senken
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Bessere Isolierung von Wänden und Dach</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Moderne Heizungsanlage mit Thermostat</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Raumtemperatur um 1°C senken spart 6% Energie</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Richtig lüften (Stoßlüftung statt Dauerlüftung)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Häufige Fragen
                </h2>
              </div>
            </div>
          </div>

          <div className="space-y-4 mt-12">
            {[
              {
                q: 'Wie berechne ich meinen Gasverbrauch?',
                a: 'Der Gasverbrauch steht auf Ihrer letzten Gasrechnung in kWh. Alternativ können Sie ihn anhand Ihrer Wohnfläche und Heizungsart schätzen.'
              },
              {
                q: 'Welche Heizungsarten gibt es?',
                a: 'Die wichtigsten sind: Gasheizung, Ölheizung, Wärmepumpe, Fernwärme und Holzheizung. Gasheizungen sind in Deutschland am weitesten verbreitet.'
              },
              {
                q: 'Wie viel Gas verbraucht eine Gasheizung?',
                a: 'Der Verbrauch hängt von Wohnfläche, Isolierung und Heizgewohnheiten ab. Im Durchschnitt verbraucht ein Haushalt mit 100 m² etwa 10.000-15.000 kWh pro Jahr.'
              },
              {
                q: 'Kann ich meinen Gasverbrauch senken?',
                a: 'Ja, durch bessere Isolierung, moderne Heizungsanlage, richtige Raumtemperatur und Lüftungsverhalten können Sie Ihren Verbrauch um 10-20% senken.'
              },
              {
                q: 'Was ist ein durchschnittlicher Gasverbrauch?',
                a: 'Ein 4-Personen-Haushalt mit 120 m² verbraucht durchschnittlich 12.000-20.000 kWh pro Jahr, je nach Isolierung und Heizverhalten.'
              }
            ].map((item, index) => (
              <Accordion key={index} type="single" collapsible className="bg-gray-50 rounded-lg px-6 border-none">
                <AccordionItem value={`faq-${index}`} className="border-none">
                  <AccordionTrigger className="font-heading text-lg font-medium text-left py-4 hover:text-primary hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-paragraph text-gray-600 pb-4 leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>

          <div className="bg-secondary/10 border border-secondary rounded-lg p-8 my-12">
            <h3 className="font-heading text-2xl font-bold text-primary mb-4">
              Jetzt Gastarife vergleichen
            </h3>
            <p className="font-paragraph text-gray-700 mb-6">
              Nutzen Sie unser Vergleichstool und finden Sie den besten Tarif für Ihren Verbrauch.
            </p>
            <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link to={ROUTES.gasvergleich}>
                Zum Gasvergleich
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="border-t pt-12">
            <h3 className="font-heading text-2xl font-bold text-primary mb-6">
              Verwandte Artikel
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link to="/ratgeber/gas/gasanbieter-wechseln-nrw" className="group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                      Gasanbieter wechseln in NRW
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-gray-600">
                      Schritt-für-Schritt Anleitung zum Gasanbieterwechsel.
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/ratgeber/gas/grundversorgung-gas-sondervertrag" className="group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                      Grundversorgung vs. Sondervertrag
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-gray-600">
                      Unterschiede zwischen Grundversorgung und Sonderverträgen.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t text-center">
            <p className="font-paragraph text-sm text-gray-500">
              Zuletzt aktualisiert: 09. Januar 2026 | Redaktion Energievergleich
            </p>
          </div>
        </div>
      </section>

      <DeferredFooter />
    </div>
  );
}
