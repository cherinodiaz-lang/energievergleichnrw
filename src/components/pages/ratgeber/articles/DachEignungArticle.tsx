import React, { useEffect } from 'react';
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

export default function DachEignungArticle() {
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Ist mein Dach für Solaranlagen geeignet?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ihr Dach ist geeignet, wenn es nach Süden ausgerichtet ist, ausreichend Fläche hat und nicht zu stark verschattet ist. Ein Energieberater kann dies kostenlos prüfen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Welche Dachform ist ideal?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Satteldächer sind ideal. Aber auch Flachdächer, Pultdächer und andere Formen sind möglich. Die Ausrichtung ist wichtiger als die Dachform.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie viel Dachfläche benötige ich?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Für eine 5-kW-Anlage benötigen Sie etwa 25-30 m² Dachfläche. Die genaue Fläche hängt von der Modulleistung ab.'
          }
        },
        {
          '@type': 'Question',
          name: 'Kann ich eine Solaranlage auf einem Flachdach installieren?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja, Flachdächer sind gut geeignet. Die Module werden in einem optimalen Winkel aufgestellt. Dies ermöglicht auch eine bessere Reinigung.'
          }
        },
        {
          '@type': 'Question',
          name: 'Was ist Verschattung und wie beeinflusst sie die Anlage?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Verschattung durch Bäume oder Gebäude reduziert die Leistung. Auch Teilschatten kann die Gesamtleistung deutlich senken. Ein Energieberater prüft dies.'
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
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Dach-Eignung für Photovoltaik: Checkliste | Energievergleich"
        description="Ist Ihr Dach für eine Solaranlage geeignet? Checkliste und Tipps zur Überprüfung der Dacheignung."
        keywords="Dach-Eignung, Solaranlage Dach, Photovoltaik Dach, Dachform Solaranlage"
        ogTitle="Dach-Eignung für Photovoltaik: Checkliste"
        ogDescription="Prüfen Sie, ob Ihr Dach für Solaranlagen geeignet ist."
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
              Dach-Eignung für Photovoltaik
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90">
              Checkliste zur Überprüfung der Dacheignung
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
                Nicht jedes Dach ist für Solaranlagen geeignet. Erfahren Sie, welche Kriterien Ihr Dach erfüllen sollte.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <div className="space-y-4">
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Ausrichtung und Neigung
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Ideal ist eine Ausrichtung nach Süden mit einer Neigung von etwa 30-35 Grad. Aber auch Ost- oder Westausrichtung ist möglich. Die Ausrichtung ist wichtiger als die perfekte Neigung.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Dachform
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Satteldächer: Ideal, gute Ausrichtung möglich</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Flachdächer: Sehr gut, optimale Ausrichtung möglich</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Pultdächer: Gut, je nach Ausrichtung</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Dachfläche
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Für eine 5-kW-Anlage benötigen Sie etwa 25-30 m² Dachfläche. Für eine 10-kW-Anlage etwa 50-60 m². Die genaue Fläche hängt von der Modulleistung ab.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Verschattung
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Verschattung durch Bäume, Gebäude oder Schornsteine reduziert die Leistung. Auch Teilschatten kann die Gesamtleistung deutlich senken. Ein Energieberater prüft dies mit speziellen Geräten.
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
                q: 'Ist mein Dach für Solaranlagen geeignet?',
                a: 'Ihr Dach ist geeignet, wenn es nach Süden ausgerichtet ist, ausreichend Fläche hat und nicht zu stark verschattet ist. Ein Energieberater kann dies kostenlos prüfen.'
              },
              {
                q: 'Welche Dachform ist ideal?',
                a: 'Satteldächer sind ideal. Aber auch Flachdächer, Pultdächer und andere Formen sind möglich. Die Ausrichtung ist wichtiger als die Dachform.'
              },
              {
                q: 'Wie viel Dachfläche benötige ich?',
                a: 'Für eine 5-kW-Anlage benötigen Sie etwa 25-30 m² Dachfläche. Die genaue Fläche hängt von der Modulleistung ab.'
              },
              {
                q: 'Kann ich eine Solaranlage auf einem Flachdach installieren?',
                a: 'Ja, Flachdächer sind gut geeignet. Die Module werden in einem optimalen Winkel aufgestellt. Dies ermöglicht auch eine bessere Reinigung.'
              },
              {
                q: 'Was ist Verschattung und wie beeinflusst sie die Anlage?',
                a: 'Verschattung durch Bäume oder Gebäude reduziert die Leistung. Auch Teilschatten kann die Gesamtleistung deutlich senken. Ein Energieberater prüft dies.'
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
              Nutzen Sie unsere kostenlose Beratung und lassen Sie Ihr Dach prüfen.
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
              <Link to="/ratgeber/photovoltaik/angebote-vergleichen-fehler" className="group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                      Angebote vergleichen
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-gray-600">
                      Häufige Fehler beim Vergleich von Solarangeboten.
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
