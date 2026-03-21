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

export default function NeukndenbonusFallenArticle() {
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Wie funktioniert ein Neukundenbonus?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ein Neukundenbonus ist eine Geldleistung, die Sie erhalten, wenn Sie zu einem neuen Anbieter wechseln. Der Bonus wird meist nach einigen Monaten ausbezahlt oder direkt mit der Rechnung verrechnet.'
          }
        },
        {
          '@type': 'Question',
          name: 'Sind Neukundenboni in den Tarifpreisen enthalten?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja, seriöse Vergleichsrechner berücksichtigen Neukundenboni in der Gesamtkostenberechnung. Achten Sie darauf, dass der Bonus in der angezeigten Jahresgebühr enthalten ist.'
          }
        },
        {
          '@type': 'Question',
          name: 'Welche Fallen gibt es bei Neukundenboni?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Häufige Fallen: Bonus wird erst nach 12 Monaten ausbezahlt, hohe Grundpreise, kurze Preisgarantie, versteckte Bedingungen. Lesen Sie die Vertragsbedingungen genau.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie erkenne ich echte Ersparnisse?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Vergleichen Sie die Gesamtkosten für 12 Monate inklusive Bonus. Achten Sie auf Arbeitspreis, Grundpreis und Preisgarantie. Der günstigste Tarif ist nicht immer der beste.'
          }
        },
        {
          '@type': 'Question',
          name: 'Lohnt sich ein Wechsel wegen des Bonus?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ein Wechsel lohnt sich nur, wenn die Gesamtkosten inklusive Bonus günstiger sind als bei Ihrem aktuellen Anbieter. Der Bonus allein ist kein Grund zum Wechsel.'
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
        title="Neukundenbonus und versteckte Fallen | Energievergleich"
        description="Wie Neukundenboni funktionieren und welche Fallen Sie vermeiden sollten. Tipps für echte Ersparnisse beim Stromwechsel."
        keywords="Neukundenbonus, Strombonus, Wechselbonus, Fallen"
        ogTitle="Neukundenbonus und versteckte Fallen"
        ogDescription="Lernen Sie, Neukundenboni richtig zu bewerten und versteckte Fallen zu erkennen."
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
              Neukundenbonus und versteckte Fallen
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90">
              Wie Sie Neukundenboni richtig bewerten und echte Ersparnisse erkennen
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
                Neukundenboni klingen verlockend, verstecken aber oft Fallen. Hohe Grundpreise, kurze Preisgarantien und verzögerte Auszahlungen können die vermeintlichen Ersparnisse aufzehren. Wir zeigen Ihnen, wie Sie echte Ersparnisse erkennen.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Wie funktionieren Neukundenboni?
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Ein Neukundenbonus ist eine Geldleistung, die Sie erhalten, wenn Sie zu einem neuen Anbieter wechseln. Der Bonus wird meist nach einigen Monaten ausbezahlt oder direkt mit der Rechnung verrechnet. Typische Boni liegen zwischen 50 und 200 Euro.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Typische Fallen bei Neukundenboni
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700"><strong>Verzögerte Auszahlung:</strong> Bonus wird erst nach 12 Monaten ausbezahlt</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700"><strong>Hohe Grundpreise:</strong> Der Bonus wird durch höhere Grundpreise kompensiert</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700"><strong>Kurze Preisgarantie:</strong> Nach 12 Monaten steigen die Preise stark</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700"><strong>Versteckte Bedingungen:</strong> Bonus nur unter bestimmten Voraussetzungen</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  So erkennen Sie echte Ersparnisse
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed mb-4">
                  Der Schlüssel ist die Gesamtkostenberechnung über 12 Monate:
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-3">
                  <p className="font-paragraph text-gray-700">
                    <strong>Formel:</strong> (Arbeitspreis × Jahresverbrauch) + (Grundpreis × 12) + Bonus = Gesamtkosten
                  </p>
                  <p className="font-paragraph text-gray-700 text-sm">
                    Vergleichen Sie diese Gesamtkosten mit Ihrem aktuellen Anbieter. Nur wenn die Gesamtkosten günstiger sind, lohnt sich der Wechsel.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Worauf Sie achten sollten
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Ist der Bonus in der Gesamtkostenberechnung enthalten?</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Wie lange ist die Preisgarantie?</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Wie hoch ist der Grundpreis?</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Wann wird der Bonus ausbezahlt?</span>
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
                q: 'Wie funktioniert ein Neukundenbonus?',
                a: 'Ein Neukundenbonus ist eine Geldleistung, die Sie erhalten, wenn Sie zu einem neuen Anbieter wechseln. Der Bonus wird meist nach einigen Monaten ausbezahlt oder direkt mit der Rechnung verrechnet.'
              },
              {
                q: 'Sind Neukundenboni in den Tarifpreisen enthalten?',
                a: 'Ja, seriöse Vergleichsrechner berücksichtigen Neukundenboni in der Gesamtkostenberechnung. Achten Sie darauf, dass der Bonus in der angezeigten Jahresgebühr enthalten ist.'
              },
              {
                q: 'Welche Fallen gibt es bei Neukundenboni?',
                a: 'Häufige Fallen: Bonus wird erst nach 12 Monaten ausbezahlt, hohe Grundpreise, kurze Preisgarantie, versteckte Bedingungen. Lesen Sie die Vertragsbedingungen genau.'
              },
              {
                q: 'Wie erkenne ich echte Ersparnisse?',
                a: 'Vergleichen Sie die Gesamtkosten für 12 Monate inklusive Bonus. Achten Sie auf Arbeitspreis, Grundpreis und Preisgarantie. Der günstigste Tarif ist nicht immer der beste.'
              },
              {
                q: 'Lohnt sich ein Wechsel wegen des Bonus?',
                a: 'Ein Wechsel lohnt sich nur, wenn die Gesamtkosten inklusive Bonus günstiger sind als bei Ihrem aktuellen Anbieter. Der Bonus allein ist kein Grund zum Wechsel.'
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
              <Link to="/ratgeber/strom/stromtarif-vertragslaufzeit" className="group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                      Stromtarif und Vertragslaufzeit
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-gray-600">
                      Welche Vertragslaufzeit ist für Sie die beste?
                    </p>
                  </CardContent>
                </Card>
              </Link>
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
