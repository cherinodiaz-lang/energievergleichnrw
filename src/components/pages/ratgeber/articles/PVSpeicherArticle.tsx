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

export default function PVSpeicherArticle() {
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Lohnt sich ein Stromspeicher?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ein Stromspeicher erhöht Ihre Unabhängigkeit und Eigennutzung. Mit Speicher erreichen Sie bis zu 80% Autarkie. Die Wirtschaftlichkeit hängt von Ihrem Verbrauch und den Strompreisen ab.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie viel kostet ein Stromspeicher?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ein Stromspeicher kostet etwa 5.000-15.000 Euro, je nach Größe und Qualität. Mit Förderungen reduziert sich der Preis. Die Amortisation dauert 10-15 Jahre.'
          }
        },
        {
          '@type': 'Question',
          name: 'Welche Speichergröße ist sinnvoll?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Die Speichergröße sollte etwa 50-100% Ihres täglichen Stromverbrauchs entsprechen. Ein Energieberater kann die optimale Größe für Ihre Situation ermitteln.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie lange halten Stromspeicher?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Hochwertige Stromspeicher halten 10-15 Jahre oder länger. Die meisten Hersteller geben 10 Jahre Garantie. Nach dieser Zeit ist ein Austausch möglich.'
          }
        },
        {
          '@type': 'Question',
          name: 'Kann ich einen Speicher später nachrüsten?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja, Sie können einen Speicher später nachrüsten. Dies ist besonders sinnvoll, wenn Sie ein Elektroauto anschaffen oder Ihren Stromverbrauch erhöhen.'
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
        title="PV-Speicher: Lohnt sich das? | Energievergleich"
        description="Stromspeicher für Solaranlagen: Kosten, Nutzen und Wirtschaftlichkeit. Erfahren Sie, ob ein Speicher für Sie sinnvoll ist."
        keywords="PV-Speicher, Stromspeicher, Batterie Solaranlage, Speicher Photovoltaik"
        ogTitle="PV-Speicher: Lohnt sich das?"
        ogDescription="Erfahren Sie, ob ein Stromspeicher wirtschaftlich ist."
      />
      <Header />

      <section className="w-full bg-primary text-primary-foreground py-20 md:py-32">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div
            className="max-w-3xl"
          >
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
              PV-Speicher: Lohnt sich das?
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90">
              Stromspeicher für Ihre Solaranlage - Kosten und Nutzen
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
                Ein Stromspeicher erhöht Ihre Unabhängigkeit von Strompreisen und dem Stromnetz. Erfahren Sie, ob ein Speicher für Ihre Solaranlage wirtschaftlich ist.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <div className="space-y-4">
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Vorteile eines Stromspeichers
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Höhere Eigennutzung des Solarstroms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Bis zu 80% Autarkie möglich</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Weniger abhängig von Strompreisen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Notstromversorgung bei Stromausfall</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Kosten und Amortisation
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Ein Stromspeicher kostet etwa 5.000-15.000 Euro, je nach Größe und Qualität. Mit Förderungen reduziert sich der Preis. Die Amortisation dauert in der Regel 10-15 Jahre. Danach nutzen Sie den Speicher kostenfrei.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Speichergröße wählen
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Die Speichergröße sollte etwa 50-100% Ihres täglichen Stromverbrauchs entsprechen. Ein zu großer Speicher ist unwirtschaftlich, ein zu kleiner bringt nicht den gewünschten Nutzen. Ein Energieberater kann die optimale Größe ermitteln.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Haltbarkeit und Garantie
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Hochwertige Stromspeicher halten 10-15 Jahre oder länger. Die meisten Hersteller geben 10 Jahre Garantie. Nach dieser Zeit ist ein Austausch möglich, aber nicht zwingend erforderlich.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Häufige Fragen
                </h2>
              </div>
            </div>
          </div>

          <div className="space-y-4 mt-12">
            {[
              {
                q: 'Lohnt sich ein Stromspeicher?',
                a: 'Ein Stromspeicher erhöht Ihre Unabhängigkeit und Eigennutzung. Mit Speicher erreichen Sie bis zu 80% Autarkie. Die Wirtschaftlichkeit hängt von Ihrem Verbrauch und den Strompreisen ab.'
              },
              {
                q: 'Wie viel kostet ein Stromspeicher?',
                a: 'Ein Stromspeicher kostet etwa 5.000-15.000 Euro, je nach Größe und Qualität. Mit Förderungen reduziert sich der Preis. Die Amortisation dauert 10-15 Jahre.'
              },
              {
                q: 'Welche Speichergröße ist sinnvoll?',
                a: 'Die Speichergröße sollte etwa 50-100% Ihres täglichen Stromverbrauchs entsprechen. Ein Energieberater kann die optimale Größe für Ihre Situation ermitteln.'
              },
              {
                q: 'Wie lange halten Stromspeicher?',
                a: 'Hochwertige Stromspeicher halten 10-15 Jahre oder länger. Die meisten Hersteller geben 10 Jahre Garantie. Nach dieser Zeit ist ein Austausch möglich.'
              },
              {
                q: 'Kann ich einen Speicher später nachrüsten?',
                a: 'Ja, Sie können einen Speicher später nachrüsten. Dies ist besonders sinnvoll, wenn Sie ein Elektroauto anschaffen oder Ihren Stromverbrauch erhöhen.'
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
              Kostenlose Beratung anfragen
            </h3>
            <p className="font-paragraph text-gray-700 mb-6">
              Nutzen Sie unsere kostenlose Beratung und erhalten Sie ein individuelles Angebot mit Speicher.
            </p>
            <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link to={ROUTES.photovoltaik}>
                Zur Photovoltaik-Beratung
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="border-t pt-12">
            <h3 className="font-heading text-2xl font-bold text-primary mb-6">
              Verwandte Artikel
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link to="/ratgeber/photovoltaik/pv-kosten-nrw-wovon-abhaengig" className="group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                      PV-Kosten in NRW
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-gray-600">
                      Wovon hängen die Kosten einer Solaranlage ab?
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/ratgeber/photovoltaik/einspeiseverguetung-verstehen" className="group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                      Einspeisevergütung verstehen
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-gray-600">
                      Wie die Einspeisevergütung funktioniert.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t text-center">
            <Link to="/ratgeber/photovoltaik" className="tap-target text-sm mt-4 mb-4 inline-block text-primary hover:text-primary/80 transition-colors">
              ← Zurück zum Ratgeber
            </Link>
            <p className="font-paragraph text-sm text-gray-500 mt-4">
              Zuletzt aktualisiert: 09. Januar 2026 | Redaktion Energievergleich
            </p>
          </div>
        </div>
      </section>

      <DeferredFooter />
    </div>
  );
}
