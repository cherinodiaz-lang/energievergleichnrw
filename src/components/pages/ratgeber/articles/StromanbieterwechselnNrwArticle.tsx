import React, { useEffect } from 'react';
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

export default function StromanbieterwechselnNrwArticle() {
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Wie lange dauert ein Stromanbieterwechsel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ein Stromanbieterwechsel dauert in der Regel 4-6 Wochen. Dies ist die gesetzliche Kündigungsfrist. Während dieser Zeit wird Ihre Stromversorgung nicht unterbrochen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Ist der Stromwechsel kostenlos?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja, der Wechsel zu einem neuen Stromanbieter ist völlig kostenlos. Es fallen keine Gebühren für die Kündigung beim alten Anbieter oder für die Anmeldung beim neuen Anbieter an.'
          }
        },
        {
          '@type': 'Question',
          name: 'Kann ich während eines Wechsels ohne Strom sein?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nein, das ist nicht möglich. Ihre Stromversorgung ist gesetzlich geschützt und wird nicht unterbrochen. Selbst wenn es zu Verzögerungen kommt, springt der Grundversorger ein.'
          }
        },
        {
          '@type': 'Question',
          name: 'Welche Daten benötige ich für einen Stromwechsel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sie benötigen Ihre Postleitzahl, Ihren jährlichen Stromverbrauch (in kWh) und idealerweise Ihre Zählernummer. Den Verbrauch finden Sie auf Ihrer letzten Stromrechnung.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie viel kann ich durch einen Stromwechsel sparen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Die Einsparungen variieren je nach Ihrem Verbrauch und Ihrer Region in NRW. Mit unserem Vergleichsrechner sehen Sie sofort, wie viel Sie sparen können.'
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
        title="Stromanbieter wechseln in NRW | Energievergleich"
        description="Schritt-für-Schritt Anleitung zum Stromanbieterwechsel in NRW. Erfahren Sie, wie Sie richtig wechseln und Kosten sparen."
        keywords="Stromanbieter wechseln, Stromwechsel NRW, Stromanbieterwechsel"
        ogTitle="Stromanbieter wechseln in NRW"
        ogDescription="Anleitung zum Stromanbieterwechsel in Nordrhein-Westfalen"
      />
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-primary text-primary-foreground py-20 md:py-32">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Stromanbieter wechseln in NRW
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90">
              Schritt-für-Schritt Anleitung zum Stromanbieterwechsel in Nordrhein-Westfalen
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Kurzantwort */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
              <p className="font-paragraph text-gray-700 leading-relaxed">
                Ein Stromanbieterwechsel in NRW ist einfach, kostenlos und dauert etwa 4-6 Wochen. Sie geben Ihre Daten in einen Vergleichsrechner ein, wählen einen neuen Anbieter und wir kümmern uns um die Kündigung beim alten Anbieter. Ihre Stromversorgung wird nicht unterbrochen.
              </p>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none space-y-8">
              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Warum sollten Sie wechseln?
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Viele Haushalte in NRW zahlen zu viel für Strom. Der Grund: Sie sind bei ihrem Grundversorger angemeldet oder haben schon lange keinen Vergleich mehr gemacht. Die Strompreise ändern sich ständig, und neue Anbieter locken oft mit attraktiven Neukunden-Angeboten. Ein Wechsel kann Ihnen 100-300 Euro pro Jahr sparen – ohne Aufwand und ohne Risiko.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Schritt 1: Daten sammeln
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed mb-4">
                  Bevor Sie wechseln, benötigen Sie folgende Informationen:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700"><strong>Postleitzahl:</strong> Damit wir Anbieter in Ihrer Region finden</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700"><strong>Jahresverbrauch:</strong> In kWh, zu finden auf Ihrer letzten Stromrechnung</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700"><strong>Zählernummer:</strong> Optional, aber hilfreich (auch auf der Rechnung)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Schritt 2: Tarife vergleichen
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Nutzen Sie einen Vergleichsrechner, um alle verfügbaren Tarife in Ihrer Region zu sehen. Achten Sie nicht nur auf den Preis, sondern auch auf:
                </p>
                <ul className="space-y-3 mt-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700"><strong>Vertragslaufzeit:</strong> 12 oder 24 Monate? Kürzere Laufzeiten bieten mehr Flexibilität</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700"><strong>Preisgarantie:</strong> Wie lange ist der Preis garantiert?</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700"><strong>Kündigungsfrist:</strong> Wie flexibel können Sie kündigen?</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700"><strong>Neukundenbonus:</strong> Ist dieser in der Gesamtkostenberechnung enthalten?</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Schritt 3: Angebot auswählen und anmelden
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Haben Sie einen passenden Tarif gefunden, können Sie sich direkt online anmelden. Sie müssen nur Ihre persönlichen Daten eingeben und den Vertrag akzeptieren. Der neue Anbieter kümmert sich dann um die Kündigung beim alten Anbieter – Sie müssen sich nicht selbst darum kümmern.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Schritt 4: Wechsel abwarten
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Nach der Anmeldung dauert es etwa 4-6 Wochen, bis der Wechsel abgeschlossen ist. In dieser Zeit wird Ihre Stromversorgung nicht unterbrochen. Sie erhalten von Ihrem neuen Anbieter eine Bestätigung und alle wichtigen Informationen zum neuen Vertrag.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Häufige Fragen zum Stromwechsel
                </h2>
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <div className="space-y-4 mt-12">
            <Accordion type="single" collapsible className="bg-gray-50 rounded-lg px-6 border-none">
              <AccordionItem value="faq-1" className="border-none">
                <AccordionTrigger className="font-heading text-lg font-medium text-left py-4 hover:text-primary hover:no-underline">
                  Wie lange dauert ein Stromanbieterwechsel?
                </AccordionTrigger>
                <AccordionContent className="font-paragraph text-gray-600 pb-4 leading-relaxed">
                  Ein Stromanbieterwechsel dauert in der Regel 4-6 Wochen. Dies ist die gesetzliche Kündigungsfrist. Während dieser Zeit wird Ihre Stromversorgung nicht unterbrochen.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible className="bg-gray-50 rounded-lg px-6 border-none">
              <AccordionItem value="faq-2" className="border-none">
                <AccordionTrigger className="font-heading text-lg font-medium text-left py-4 hover:text-primary hover:no-underline">
                  Ist der Stromwechsel kostenlos?
                </AccordionTrigger>
                <AccordionContent className="font-paragraph text-gray-600 pb-4 leading-relaxed">
                  Ja, der Wechsel zu einem neuen Stromanbieter ist völlig kostenlos. Es fallen keine Gebühren für die Kündigung beim alten Anbieter oder für die Anmeldung beim neuen Anbieter an.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible className="bg-gray-50 rounded-lg px-6 border-none">
              <AccordionItem value="faq-3" className="border-none">
                <AccordionTrigger className="font-heading text-lg font-medium text-left py-4 hover:text-primary hover:no-underline">
                  Kann ich während eines Wechsels ohne Strom sein?
                </AccordionTrigger>
                <AccordionContent className="font-paragraph text-gray-600 pb-4 leading-relaxed">
                  Nein, das ist nicht möglich. Ihre Stromversorgung ist gesetzlich geschützt und wird nicht unterbrochen. Selbst wenn es zu Verzögerungen kommt, springt der Grundversorger ein.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible className="bg-gray-50 rounded-lg px-6 border-none">
              <AccordionItem value="faq-4" className="border-none">
                <AccordionTrigger className="font-heading text-lg font-medium text-left py-4 hover:text-primary hover:no-underline">
                  Welche Daten benötige ich für einen Stromwechsel?
                </AccordionTrigger>
                <AccordionContent className="font-paragraph text-gray-600 pb-4 leading-relaxed">
                  Sie benötigen Ihre Postleitzahl, Ihren jährlichen Stromverbrauch (in kWh) und idealerweise Ihre Zählernummer. Den Verbrauch finden Sie auf Ihrer letzten Stromrechnung.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible className="bg-gray-50 rounded-lg px-6 border-none">
              <AccordionItem value="faq-5" className="border-none">
                <AccordionTrigger className="font-heading text-lg font-medium text-left py-4 hover:text-primary hover:no-underline">
                  Wie viel kann ich durch einen Stromwechsel sparen?
                </AccordionTrigger>
                <AccordionContent className="font-paragraph text-gray-600 pb-4 leading-relaxed">
                  Die Einsparungen variieren je nach Ihrem Verbrauch und Ihrer Region in NRW. Mit unserem Vergleichsrechner sehen Sie sofort, wie viel Sie sparen können.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* CTA Box */}
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

          {/* Related Articles */}
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
                      Verstehen Sie die Unterschiede zwischen Grundversorgung und Sonderverträgen.
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

          {/* Last Updated */}
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
