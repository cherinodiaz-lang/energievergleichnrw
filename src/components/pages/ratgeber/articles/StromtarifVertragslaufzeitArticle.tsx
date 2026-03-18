import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';

export default function StromtarifVertragslaufzeitArticle() {
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Wie lange sollte meine Stromvertragslaufzeit sein?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Die optimale Laufzeit hängt von Ihren Zielen ab. 12 Monate bieten Flexibilität, 24 Monate bieten Preissicherheit. Wählen Sie basierend auf Ihrer Situation.'
          }
        },
        {
          '@type': 'Question',
          name: 'Welche Vorteile hat eine 12-Monats-Laufzeit?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Mit 12 Monaten Laufzeit können Sie jährlich wechseln und von besseren Angeboten profitieren. Sie haben mehr Flexibilität und können schnell reagieren.'
          }
        },
        {
          '@type': 'Question',
          name: 'Welche Vorteile hat eine 24-Monats-Laufzeit?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Mit 24 Monaten Laufzeit erhalten Sie oft bessere Preise und längere Preisgarantie. Sie haben Planungssicherheit für 2 Jahre.'
          }
        },
        {
          '@type': 'Question',
          name: 'Kann ich einen Vertrag vorzeitig kündigen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Das hängt vom Vertrag ab. Bei Preiserhöhungen haben Sie ein Sonderkündigungsrecht. Ansonsten müssen Sie die Laufzeit einhalten.'
          }
        },
        {
          '@type': 'Question',
          name: 'Welche Laufzeit ist am günstigsten?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Längere Laufzeiten sind oft günstiger. Aber wenn Sie flexibel sein möchten, zahlen Sie für die Flexibilität. Vergleichen Sie beide Optionen.'
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
        title="Stromtarif und Vertragslaufzeit | Energievergleich"
        description="Wie lange sollte Ihre Stromvertragslaufzeit sein? Vor- und Nachteile von 12, 24 Monaten und flexiblen Verträgen."
        keywords="Vertragslaufzeit, Stromtarif, 12 Monate, 24 Monate"
        ogTitle="Stromtarif und Vertragslaufzeit"
        ogDescription="Erfahren Sie, welche Vertragslaufzeit für Sie am besten passt."
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
              Stromtarif und Vertragslaufzeit
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90">
              Welche Laufzeit passt zu Ihnen?
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
                Die Vertragslaufzeit bestimmt, wie lange Sie an einen Stromtarif gebunden sind. 12 Monate bieten Flexibilität, 24 Monate bieten bessere Preise. Wählen Sie basierend auf Ihren Bedürfnissen.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  12-Monats-Laufzeit
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Mit einer 12-Monats-Laufzeit können Sie jährlich wechseln und von besseren Angeboten profitieren. Sie haben maximale Flexibilität und können schnell auf Marktveränderungen reagieren.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  24-Monats-Laufzeit
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Mit einer 24-Monats-Laufzeit erhalten Sie oft bessere Preise und längere Preisgarantie. Sie haben Planungssicherheit für 2 Jahre, müssen aber länger warten, um zu wechseln.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Vergleich der Laufzeiten
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-primary mb-4">12 Monate</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>✓ Jährlicher Wechsel möglich</li>
                      <li>✓ Flexibilität</li>
                      <li>✓ Schnelle Reaktion auf Angebote</li>
                      <li>✗ Oft höhere Preise</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-primary mb-4">24 Monate</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>✓ Bessere Preise</li>
                      <li>✓ Längere Preisgarantie</li>
                      <li>✓ Planungssicherheit</li>
                      <li>✗ Weniger Flexibilität</li>
                    </ul>
                  </div>
                </div>
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
                q: 'Wie lange sollte meine Stromvertragslaufzeit sein?',
                a: 'Die optimale Laufzeit hängt von Ihren Zielen ab. 12 Monate bieten Flexibilität, 24 Monate bieten Preissicherheit. Wählen Sie basierend auf Ihrer Situation.'
              },
              {
                q: 'Welche Vorteile hat eine 12-Monats-Laufzeit?',
                a: 'Mit 12 Monaten Laufzeit können Sie jährlich wechseln und von besseren Angeboten profitieren. Sie haben mehr Flexibilität und können schnell reagieren.'
              },
              {
                q: 'Welche Vorteile hat eine 24-Monats-Laufzeit?',
                a: 'Mit 24 Monaten Laufzeit erhalten Sie oft bessere Preise und längere Preisgarantie. Sie haben Planungssicherheit für 2 Jahre.'
              },
              {
                q: 'Kann ich einen Vertrag vorzeitig kündigen?',
                a: 'Das hängt vom Vertrag ab. Bei Preiserhöhungen haben Sie ein Sonderkündigungsrecht. Ansonsten müssen Sie die Laufzeit einhalten.'
              },
              {
                q: 'Welche Laufzeit ist am günstigsten?',
                a: 'Längere Laufzeiten sind oft günstiger. Aber wenn Sie flexibel sein möchten, zahlen Sie für die Flexibilität. Vergleichen Sie beide Optionen.'
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
              Jetzt Stromtarife vergleichen
            </h3>
            <p className="font-paragraph text-gray-700 mb-6">
              Nutzen Sie unseren kostenlosen Vergleichsrechner und finden Sie den günstigsten Stromtarif in Ihrer Region.
            </p>
            <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link to={ROUTES.stromvergleich}>
                Zum Stromvergleich
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="border-t pt-12">
            <h3 className="font-heading text-2xl font-bold text-primary mb-6">
              Verwandte Artikel
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link to="/ratgeber/strom/grundversorgung-vs-sondervertrag" className="group">
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
              <Link to="/ratgeber/strom/neukundenboni-fallen" className="group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                      Neukundenbonus und versteckte Fallen
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-gray-600">
                      Wie Sie echte Ersparnisse erkennen.
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
