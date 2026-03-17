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

export default function UmzugGasvertragArticle() {
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Kann ich meinen Gasvertrag bei einem Umzug mitnehmen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nein, normalerweise nicht. Der Gasvertrag ist an die Adresse gebunden. Bei einem Umzug müssen Sie den Vertrag kündigen und einen neuen abschließen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie lange vorher muss ich kündigen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Die Kündigungsfrist beträgt normalerweise 4 Wochen zum Ende eines Kalendermonats. Manche Verträge haben kürzere Fristen. Prüfen Sie Ihren Vertrag.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wann sollte ich kündigen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Kündigen Sie mindestens 6-8 Wochen vor dem Umzug. So haben Sie Zeit, einen neuen Anbieter zu finden und den Wechsel abzuwickeln.'
          }
        },
        {
          '@type': 'Question',
          name: 'Kann ich bei einem Umzug zu einem neuen Anbieter wechseln?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja, das ist sogar eine gute Gelegenheit. Nutzen Sie den Umzug, um zu einem günstigeren Anbieter zu wechseln.'
          }
        },
        {
          '@type': 'Question',
          name: 'Was muss ich bei der neuen Adresse beachten?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Prüfen Sie, ob die neue Adresse an das Gasnetz angeschlossen ist. Nicht alle Adressen haben Gasversorgung. Fragen Sie beim Netzbetreiber nach.'
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
        title="Gasvertrag bei Umzug: Was Sie wissen müssen | Energievergleich"
        description="Gasvertrag bei Umzug kündigen und neuen abschließen. Tipps und Checkliste für den Wechsel."
        keywords="Umzug Gasvertrag, Gasvertrag kündigen, Umzug Gas, Gasanbieter wechseln Umzug"
        ogTitle="Gasvertrag bei Umzug"
        ogDescription="Erfahren Sie, wie Sie Ihren Gasvertrag bei einem Umzug richtig kündigen."
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
              Gasvertrag bei Umzug
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90">
              Wie Sie Ihren Gasvertrag richtig kündigen und bei der neuen Adresse anmelden
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
                Ein Umzug ist eine gute Gelegenheit, Ihren Gasvertrag zu überprüfen und möglicherweise zu einem günstigeren Anbieter zu wechseln. Erfahren Sie hier, wie Sie vorgehen.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Zeitplan für den Umzug
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Beginnen Sie 6-8 Wochen vor dem Umzug mit den Vorbereitungen. So haben Sie genug Zeit, Ihren alten Vertrag zu kündigen und einen neuen abzuschließen.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Schritt-für-Schritt Anleitung
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700"><strong>Schritt 1:</strong> Kündigungsfrist prüfen (normalerweise 4 Wochen zum Monatsende)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700"><strong>Schritt 2:</strong> Alten Gasvertrag schriftlich kündigen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700"><strong>Schritt 3:</strong> Neue Adresse auf Gasversorgung prüfen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700"><strong>Schritt 4:</strong> Gastarife für neue Adresse vergleichen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700"><strong>Schritt 5:</strong> Neuen Gasvertrag abschließen</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Häufige Fragen
                </h2>
              </div>
            </div>
          </motion.div>

          <div className="space-y-4 mt-12">
            {[
              {
                q: 'Kann ich meinen Gasvertrag bei einem Umzug mitnehmen?',
                a: 'Nein, normalerweise nicht. Der Gasvertrag ist an die Adresse gebunden. Bei einem Umzug müssen Sie den Vertrag kündigen und einen neuen abschließen.'
              },
              {
                q: 'Wie lange vorher muss ich kündigen?',
                a: 'Die Kündigungsfrist beträgt normalerweise 4 Wochen zum Ende eines Kalendermonats. Manche Verträge haben kürzere Fristen. Prüfen Sie Ihren Vertrag.'
              },
              {
                q: 'Wann sollte ich kündigen?',
                a: 'Kündigen Sie mindestens 6-8 Wochen vor dem Umzug. So haben Sie Zeit, einen neuen Anbieter zu finden und den Wechsel abzuwickeln.'
              },
              {
                q: 'Kann ich bei einem Umzug zu einem neuen Anbieter wechseln?',
                a: 'Ja, das ist sogar eine gute Gelegenheit. Nutzen Sie den Umzug, um zu einem günstigeren Anbieter zu wechseln.'
              },
              {
                q: 'Was muss ich bei der neuen Adresse beachten?',
                a: 'Prüfen Sie, ob die neue Adresse an das Gasnetz angeschlossen ist. Nicht alle Adressen haben Gasversorgung. Fragen Sie beim Netzbetreiber nach.'
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
              Nutzen Sie unser Vergleichstool und finden Sie den besten Tarif für Ihre neue Adresse.
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
              <Link to="/ratgeber/wechselwissen/kuendigungsfristen-strom-gas" className="group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                      Kündigungsfristen Strom & Gas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-gray-600">
                      Wichtige Fristen beim Anbieterwechsel.
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

      <Footer />
    </div>
  );
}
