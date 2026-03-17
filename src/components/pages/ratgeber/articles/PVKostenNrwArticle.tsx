import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';

export default function PVKostenNrwArticle() {
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Was kostet eine Photovoltaikanlage in NRW?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Eine 5-kW-Anlage kostet in NRW etwa 8.000-12.000 Euro (netto). Die Kosten hängen von Größe, Qualität und Installationsaufwand ab. Mit Förderungen reduziert sich der Preis.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wovon hängen die Kosten einer Solaranlage ab?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Die Kosten hängen ab von: Anlagengröße, Modulqualität, Wechselrichter, Montagesystem, Installationsaufwand und regionalen Besonderheiten. Größere Anlagen sind pro kW günstiger.'
          }
        },
        {
          '@type': 'Question',
          name: 'Gibt es Förderungen für Solaranlagen in NRW?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja, es gibt KfW-Förderung, Einspeisevergütung und regionale Programme. Die KfW bietet günstige Kredite und Zuschüsse. Informieren Sie sich über aktuelle Förderprogramme.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie lange dauert die Amortisation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Mit Einspeisevergütung und Eigennutzung amortisiert sich eine Anlage in NRW meist nach 8-12 Jahren. Danach produzieren Sie kostenlosen Strom für 15-20 Jahre.'
          }
        },
        {
          '@type': 'Question',
          name: 'Sind teurere Module besser?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nicht unbedingt. Achten Sie auf Leistung, Garantie und Hersteller. Hochwertige Module von bekannten Herstellern sind zuverlässiger, aber auch teurere Module können wirtschaftlich sein.'
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
        title="PV-Kosten NRW: Wovon hängen sie ab? | Energievergleich"
        description="Photovoltaik-Kosten in NRW verstehen. Erfahren Sie, welche Faktoren die Preise beeinflussen und wie Sie sparen können."
        keywords="PV-Kosten NRW, Solaranlage Kosten, Photovoltaik Preis, Solaranlage Preis"
        ogTitle="PV-Kosten NRW: Wovon hängen sie ab?"
        ogDescription="Verstehen Sie die Kosten für Solaranlagen in NRW."
      />
      <Header />

      <section className="w-full bg-primary text-primary-foreground py-20 md:py-32">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
              PV-Kosten in NRW
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90">
              Wovon hängen die Kosten einer Solaranlage ab?
            </p>
          </motion.div>
        </div>
      </section>

      <section className="w-full py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
              <p className="font-paragraph text-gray-700 leading-relaxed">
                Die Kosten einer Solaranlage hängen von vielen Faktoren ab. Erfahren Sie, welche Faktoren den Preis beeinflussen und wie Sie die beste Anlage für Ihr Budget finden.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <div className="space-y-4">
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Kostenkomponenten
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Die Kosten einer Solaranlage setzen sich aus mehreren Komponenten zusammen: Solarmodule, Wechselrichter, Montagesystem, Kabel und Zubehör sowie Installationskosten. Jede Komponente trägt zu den Gesamtkosten bei.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Einflussfaktoren auf die Kosten
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Anlagengröße: Größere Anlagen sind pro kW günstiger</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Modulqualität: Hochwertige Module sind teurer, aber zuverlässiger</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Installationsaufwand: Komplexe Dächer sind teurer</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Stromspeicher: Optional, aber erhöht die Kosten</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Förderungen nutzen
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Es gibt verschiedene Förderungsmöglichkeiten, die die Kosten senken: KfW-Förderung mit günstigen Krediten und Zuschüssen, Einspeisevergütung für Überschussstrom, und regionale Förderprogramme in NRW. Informieren Sie sich über aktuelle Programme.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Wirtschaftlichkeit
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Mit Einspeisevergütung und Eigennutzung amortisiert sich eine Anlage in NRW meist nach 8-12 Jahren. Danach produzieren Sie kostenlosen Strom für weitere 15-20 Jahre. Dies macht Solaranlagen wirtschaftlich attraktiv.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Häufige Fragen
                </h2>
              </div>
            </div>
          </motion.div>

          <div className="space-y-4 mt-12">
            {[
              {
                q: 'Was kostet eine Photovoltaikanlage in NRW?',
                a: 'Eine 5-kW-Anlage kostet in NRW etwa 8.000-12.000 Euro (netto). Die Kosten hängen von Größe, Qualität und Installationsaufwand ab. Mit Förderungen reduziert sich der Preis.'
              },
              {
                q: 'Wovon hängen die Kosten einer Solaranlage ab?',
                a: 'Die Kosten hängen ab von: Anlagengröße, Modulqualität, Wechselrichter, Montagesystem, Installationsaufwand und regionalen Besonderheiten. Größere Anlagen sind pro kW günstiger.'
              },
              {
                q: 'Gibt es Förderungen für Solaranlagen in NRW?',
                a: 'Ja, es gibt KfW-Förderung, Einspeisevergütung und regionale Programme. Die KfW bietet günstige Kredite und Zuschüsse. Informieren Sie sich über aktuelle Förderprogramme.'
              },
              {
                q: 'Wie lange dauert die Amortisation?',
                a: 'Mit Einspeisevergütung und Eigennutzung amortisiert sich eine Anlage in NRW meist nach 8-12 Jahren. Danach produzieren Sie kostenlosen Strom für 15-20 Jahre.'
              },
              {
                q: 'Sind teurere Module besser?',
                a: 'Nicht unbedingt. Achten Sie auf Leistung, Garantie und Hersteller. Hochwertige Module von bekannten Herstellern sind zuverlässiger, aber auch teurere Module können wirtschaftlich sein.'
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
              Nutzen Sie unsere kostenlose Beratung und erhalten Sie ein individuelles Angebot für Ihre Solaranlage.
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
              <Link to="/ratgeber/photovoltaik/pv-speicher-lohnt-sich" className="group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                      PV-Speicher: Lohnt sich das?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-gray-600">
                      Erfahren Sie, ob ein Stromspeicher sinnvoll ist.
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

      <Footer />
    </div>
  );
}
