import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/Header';
import DeferredFooter from '@/components/DeferredFooter';
import SEOHead from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';

export default function GrundversorgungVsSondervertragArticle() {
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Was ist Stromgrundversorgung?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Die Grundversorgung ist der Standardtarif des örtlichen Stromanbieters. Sie gilt automatisch, wenn Sie keinen anderen Vertrag abgeschlossen haben. Die Preise sind oft höher als bei Sonderverträgen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Was ist ein Sondervertrag?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ein Sondervertrag ist ein individueller Stromtarif mit festgelegten Konditionen. Sie wählen Laufzeit, Preisgarantie und Anbieter selbst. Sonderverträge sind meist günstiger als die Grundversorgung.'
          }
        },
        {
          '@type': 'Question',
          name: 'Kann ich jederzeit aus der Grundversorgung wechseln?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja, Sie können mit einer Frist von 2 Wochen zum Ende eines Kalendermonats aus der Grundversorgung kündigen. Ein Wechsel zu einem Sondervertrag ist jederzeit möglich.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie viel kann ich durch einen Wechsel sparen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Die Einsparungen variieren je nach Region und Anbieter. Im Durchschnitt sparen Haushalte 100-300 Euro pro Jahr durch den Wechsel von der Grundversorgung zu einem Sondervertrag.'
          }
        },
        {
          '@type': 'Question',
          name: 'Ist ein Sondervertrag sicherer als die Grundversorgung?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Beide Vertragsarten sind sicher. Bei Sonderverträgen sollten Sie auf Preisgarantie und Kündigungsfrist achten. Die Grundversorgung bietet mehr Flexibilität, ist aber teurer.'
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
        title="Grundversorgung vs. Sondervertrag | Energievergleich"
        description="Unterschiede zwischen Stromgrundversorgung und Sonderverträgen. Welcher Tarif passt zu Ihnen? Vor- und Nachteile im Vergleich."
        keywords="Grundversorgung, Sondervertrag, Stromtarif, Vergleich"
        ogTitle="Grundversorgung vs. Sondervertrag"
        ogDescription="Erfahren Sie die Unterschiede zwischen Grundversorgung und Sonderverträgen."
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
              Grundversorgung vs. Sondervertrag
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90">
              Verstehen Sie die Unterschiede und treffen Sie die richtige Wahl für Ihren Stromtarif
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
                Die Grundversorgung ist der Standardtarif Ihres örtlichen Stromanbieters. Ein Sondervertrag ist ein individueller Tarif mit besseren Konditionen. Sonderverträge sind in der Regel günstiger, erfordern aber einen aktiven Wechsel.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Was ist die Stromgrundversorgung?
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Die Grundversorgung ist der Standardtarif des örtlichen Stromanbieters. Sie gilt automatisch, wenn Sie keinen anderen Vertrag abgeschlossen haben oder Ihr Vertrag endet. Die Grundversorgung ist gesetzlich reguliert und bietet hohe Flexibilität mit kurzen Kündigungsfristen.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Was ist ein Sondervertrag?
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Ein Sondervertrag ist ein individueller Stromtarif, den Sie mit einem Anbieter Ihrer Wahl abschließen. Sie bestimmen die Laufzeit, Preisgarantie und andere Bedingungen selbst. Sonderverträge sind meist günstiger als die Grundversorgung, erfordern aber einen aktiven Wechsel.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Vor- und Nachteile im Überblick
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-primary mb-4">Grundversorgung</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="font-bold text-gray-900 mb-1">✓ Vorteile:</p>
                        <ul className="text-sm text-gray-700 space-y-1 ml-4">
                          <li>• Automatisch verfügbar</li>
                          <li>• Kurze Kündigungsfrist (2 Wochen)</li>
                          <li>• Hohe Flexibilität</li>
                          <li>• Keine Vertragsbindung</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 mb-1">✗ Nachteile:</p>
                        <ul className="text-sm text-gray-700 space-y-1 ml-4">
                          <li>• Höhere Preise</li>
                          <li>• Keine Preisgarantie</li>
                          <li>• Oft teurer als Sonderverträge</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-primary mb-4">Sondervertrag</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="font-bold text-gray-900 mb-1">✓ Vorteile:</p>
                        <ul className="text-sm text-gray-700 space-y-1 ml-4">
                          <li>• Günstiger als Grundversorgung</li>
                          <li>• Preisgarantie möglich</li>
                          <li>• Wahl des Anbieters</li>
                          <li>• Bessere Konditionen</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 mb-1">✗ Nachteile:</p>
                        <ul className="text-sm text-gray-700 space-y-1 ml-4">
                          <li>• Längere Laufzeit</li>
                          <li>• Längere Kündigungsfrist</li>
                          <li>• Aktiver Wechsel nötig</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Wann lohnt sich ein Wechsel?
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Ein Wechsel zu einem Sondervertrag lohnt sich fast immer. Die Einsparungen liegen durchschnittlich bei 100-300 Euro pro Jahr. Besonders sinnvoll ist ein Wechsel, wenn Sie lange in Ihrer Wohnung bleiben und von stabilen Preisen profitieren möchten.
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
                q: 'Was ist Stromgrundversorgung?',
                a: 'Die Grundversorgung ist der Standardtarif des örtlichen Stromanbieters. Sie gilt automatisch, wenn Sie keinen anderen Vertrag abgeschlossen haben. Die Preise sind oft höher als bei Sonderverträgen.'
              },
              {
                q: 'Was ist ein Sondervertrag?',
                a: 'Ein Sondervertrag ist ein individueller Stromtarif mit festgelegten Konditionen. Sie wählen Laufzeit, Preisgarantie und Anbieter selbst. Sonderverträge sind meist günstiger als die Grundversorgung.'
              },
              {
                q: 'Kann ich jederzeit aus der Grundversorgung wechseln?',
                a: 'Ja, Sie können mit einer Frist von 2 Wochen zum Ende eines Kalendermonats aus der Grundversorgung kündigen. Ein Wechsel zu einem Sondervertrag ist jederzeit möglich.'
              },
              {
                q: 'Wie viel kann ich durch einen Wechsel sparen?',
                a: 'Die Einsparungen variieren je nach Region und Anbieter. Im Durchschnitt sparen Haushalte 100-300 Euro pro Jahr durch den Wechsel von der Grundversorgung zu einem Sondervertrag.'
              },
              {
                q: 'Ist ein Sondervertrag sicherer als die Grundversorgung?',
                a: 'Beide Vertragsarten sind sicher. Bei Sonderverträgen sollten Sie auf Preisgarantie und Kündigungsfrist achten. Die Grundversorgung bietet mehr Flexibilität, ist aber teurer.'
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
              <Link to="/ratgeber/strom/stromanbieter-wechseln-nrw" className="group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                      Stromanbieter wechseln in NRW
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-gray-600">
                      Schritt-für-Schritt Anleitung zum Stromanbieterwechsel.
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/ratgeber/wechselwissen/lieferantenwechsel-ablauf" className="group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                      Lieferantenwechsel: Ablauf und Dauer
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-gray-600">
                      Wie läuft ein Lieferantenwechsel ab und wie lange dauert er?
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
