import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/Header';
import DeferredFooter from '@/components/DeferredFooter';
import SEOHead from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';

export default function GaspreisgarantieArticle() {
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Was ist eine Gaspreisgarantie?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Eine Gaspreisgarantie bedeutet, dass der Gaspreis für einen bestimmten Zeitraum nicht erhöht wird. Dies gibt Ihnen Planungssicherheit bei Ihren Heizkosten.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie lange ist eine Preisgarantie sinnvoll?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Typisch sind 12 oder 24 Monate Preisgarantie. Längere Garantien sind sicherer, aber oft teurer. Wählen Sie je nach Ihrer Risikotoleranz.'
          }
        },
        {
          '@type': 'Question',
          name: 'Können Steuern und Abgaben erhöht werden?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja. Die Preisgarantie gilt nur für den Arbeitspreis und Grundpreis. Steuern und Abgaben können trotzdem erhöht werden.'
          }
        },
        {
          '@type': 'Question',
          name: 'Ist eine Preisgarantie immer teurer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nicht unbedingt. Manchmal sind Tarife mit Preisgarantie günstiger als ohne. Vergleichen Sie mehrere Angebote.'
          }
        },
        {
          '@type': 'Question',
          name: 'Was passiert nach der Preisgarantie?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nach der Preisgarantie kann der Preis erhöht werden. Sie haben dann ein Sonderkündigungsrecht mit 2 Wochen Frist.'
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
        title="Gaspreisgarantie: Worauf achten? | Energievergleich"
        description="Gaspreisgarantie verstehen. Erfahren Sie, worauf Sie bei Preisgarantien achten sollten und wie lange sie sinnvoll sind."
        keywords="Gaspreisgarantie, Preisgarantie Gas, Gasvertrag Garantie"
        ogTitle="Gaspreisgarantie: Worauf achten?"
        ogDescription="Verstehen Sie Gaspreisgarantien und treffen Sie die richtige Wahl."
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
              Gaspreisgarantie: Worauf achten?
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90">
              Preisgarantien verstehen und richtig bewerten
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
                Eine Gaspreisgarantie gibt Ihnen Sicherheit bei Ihren Heizkosten. Erfahren Sie, worauf Sie achten sollten.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Was ist eine Preisgarantie?
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Eine Gaspreisgarantie bedeutet, dass der Gaspreis für einen bestimmten Zeitraum nicht erhöht wird. Dies gibt Ihnen Planungssicherheit bei Ihren Heizkosten. Sie wissen genau, wie viel Sie zahlen müssen.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Dauer der Preisgarantie
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">12 Monate: Kürzere Garantie, oft günstiger</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">24 Monate: Längere Garantie, mehr Sicherheit</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Wählen Sie je nach Ihrer Risikotoleranz</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Was ist nicht garantiert?
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Wichtig: Die Preisgarantie gilt nur für den Arbeitspreis und Grundpreis. Steuern und Abgaben können trotzdem erhöht werden. Dies kann zu Preiserhöhungen führen, obwohl eine Preisgarantie besteht.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Nach der Preisgarantie
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Nach der Preisgarantie kann der Preis erhöht werden. Sie haben dann ein Sonderkündigungsrecht mit 2 Wochen Frist. Dies gibt Ihnen die Möglichkeit, zu einem anderen Anbieter zu wechseln.
                </p>
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
                q: 'Was ist eine Gaspreisgarantie?',
                a: 'Eine Gaspreisgarantie bedeutet, dass der Gaspreis für einen bestimmten Zeitraum nicht erhöht wird. Dies gibt Ihnen Planungssicherheit bei Ihren Heizkosten.'
              },
              {
                q: 'Wie lange ist eine Preisgarantie sinnvoll?',
                a: 'Typisch sind 12 oder 24 Monate Preisgarantie. Längere Garantien sind sicherer, aber oft teurer. Wählen Sie je nach Ihrer Risikotoleranz.'
              },
              {
                q: 'Können Steuern und Abgaben erhöht werden?',
                a: 'Ja. Die Preisgarantie gilt nur für den Arbeitspreis und Grundpreis. Steuern und Abgaben können trotzdem erhöht werden.'
              },
              {
                q: 'Ist eine Preisgarantie immer teurer?',
                a: 'Nicht unbedingt. Manchmal sind Tarife mit Preisgarantie günstiger als ohne. Vergleichen Sie mehrere Angebote.'
              },
              {
                q: 'Was passiert nach der Preisgarantie?',
                a: 'Nach der Preisgarantie kann der Preis erhöht werden. Sie haben dann ein Sonderkündigungsrecht mit 2 Wochen Frist.'
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
              Nutzen Sie unser Vergleichstool und finden Sie den besten Tarif mit Preisgarantie.
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
                      Gasanbieter wechseln
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-gray-600">
                      Schritt-für-Schritt Anleitung zum Gasanbieterwechsel.
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/ratgeber/gas/preiserhoeung-gas-rechte" className="group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                      Gaspreiserhöhung
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-gray-600">
                      Ihre Rechte bei Gaspreiserhöhungen.
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
