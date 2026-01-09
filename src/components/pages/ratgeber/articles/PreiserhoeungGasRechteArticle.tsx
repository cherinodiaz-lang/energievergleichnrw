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

export default function PreiserhoeungGasRechteArticle() {
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Kann der Gasanbieter den Preis einfach erhöhen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nein. Der Gasanbieter muss eine Preiserhöhung mindestens 6 Wochen vorher schriftlich ankündigen. Sie haben dann ein Sonderkündigungsrecht.'
          }
        },
        {
          '@type': 'Question',
          name: 'Welche Rechte habe ich bei einer Preiserhöhung?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sie können den Vertrag mit einer Frist von 2 Wochen zum Zeitpunkt der Preiserhöhung kündigen. Dies ist ein Sonderkündigungsrecht und kostet nichts.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie lange muss die Ankündigung sein?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Mindestens 6 Wochen. Die Ankündigung muss schriftlich erfolgen und die neue Preisstruktur deutlich machen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Kann ich sofort kündigen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja, mit dem Sonderkündigungsrecht können Sie mit 2 Wochen Frist zum Zeitpunkt der Preiserhöhung kündigen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Was sollte ich bei einer Preiserhöhung tun?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Vergleichen Sie Alternativen, nutzen Sie das Sonderkündigungsrecht und wechseln Sie zu einem günstigeren Anbieter.'
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
        title="Gaspreiserhöhung: Ihre Rechte | Energievergleich"
        description="Was Sie bei Gaspreiserhöhungen tun können. Erfahren Sie Ihre Rechte und wie Sie richtig reagieren."
        keywords="Gaspreiserhöhung, Preiserhöhung Gas, Sonderkündigungsrecht, Gasvertrag kündigen"
        ogTitle="Gaspreiserhöhung: Ihre Rechte"
        ogDescription="Erfahren Sie, welche Rechte Sie bei Gaspreiserhöhungen haben."
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
              Gaspreiserhöhung: Ihre Rechte
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90">
              Was Sie bei Preiserhöhungen tun können und welche Rechte Sie haben
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
                Gaspreiserhöhungen sind ärgerlich, aber Sie haben Rechte. Mit dem Sonderkündigungsrecht können Sie schnell zu einem günstigeren Anbieter wechseln. Erfahren Sie hier, wie Sie richtig reagieren.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Ihr Sonderkündigungsrecht
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Bei einer Preiserhöhung haben Sie ein Sonderkündigungsrecht. Das bedeutet: Sie können den Vertrag mit nur 2 Wochen Frist zum Zeitpunkt der Preiserhöhung kündigen. Dies ist kostenlos und unabhängig von der ursprünglichen Vertragslaufzeit.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Ankündigungsfrist
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Der Gasanbieter muss eine Preiserhöhung mindestens 6 Wochen vorher schriftlich ankündigen. Die Ankündigung muss die neuen Preise und den Zeitpunkt der Erhöhung deutlich machen. Erst nach dieser Frist kann die Preiserhöhung wirksam werden.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  So reagieren Sie richtig
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700"><strong>Schritt 1:</strong> Ankündigung sorgfältig lesen und Datum notieren</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700"><strong>Schritt 2:</strong> Gastarife vergleichen und bessere Angebote suchen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700"><strong>Schritt 3:</strong> Neuen Anbieter wählen und anmelden</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700"><strong>Schritt 4:</strong> Alten Vertrag mit Sonderkündigungsrecht kündigen</span>
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
                q: 'Kann der Gasanbieter den Preis einfach erhöhen?',
                a: 'Nein. Der Gasanbieter muss eine Preiserhöhung mindestens 6 Wochen vorher schriftlich ankündigen. Sie haben dann ein Sonderkündigungsrecht.'
              },
              {
                q: 'Welche Rechte habe ich bei einer Preiserhöhung?',
                a: 'Sie können den Vertrag mit einer Frist von 2 Wochen zum Zeitpunkt der Preiserhöhung kündigen. Dies ist ein Sonderkündigungsrecht und kostet nichts.'
              },
              {
                q: 'Wie lange muss die Ankündigung sein?',
                a: 'Mindestens 6 Wochen. Die Ankündigung muss schriftlich erfolgen und die neue Preisstruktur deutlich machen.'
              },
              {
                q: 'Kann ich sofort kündigen?',
                a: 'Ja, mit dem Sonderkündigungsrecht können Sie mit 2 Wochen Frist zum Zeitpunkt der Preiserhöhung kündigen.'
              },
              {
                q: 'Was sollte ich bei einer Preiserhöhung tun?',
                a: 'Vergleichen Sie Alternativen, nutzen Sie das Sonderkündigungsrecht und wechseln Sie zu einem günstigeren Anbieter.'
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
              Nutzen Sie unser Vergleichstool und finden Sie einen günstigeren Anbieter.
            </p>
            <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link to="/gasvergleich-nrw">
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

      <Footer />
    </div>
  );
}
