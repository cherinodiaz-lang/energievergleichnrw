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

export default function GewerbestromVertragArticle() {
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Worauf sollte ich bei einem Gewerbestromvertrag achten?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Achten Sie auf Arbeitspreis, Grundpreis, Laufzeit, Kündigungsfrist, Preisgarantie und Bonusregelungen. Vergleichen Sie mehrere Angebote und prüfen Sie die Vertragsbedingungen sorgfältig.'
          }
        },
        {
          '@type': 'Question',
          name: 'Welche Laufzeit ist für Gewerbekunden sinnvoll?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Typisch sind 12-24 Monate. Kürzere Laufzeiten bieten mehr Flexibilität, längere Laufzeiten oft bessere Preise. Wählen Sie je nach Ihrer Planungssicherheit.'
          }
        },
        {
          '@type': 'Question',
          name: 'Kann ich meinen Gewerbestromvertrag vorzeitig kündigen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Das hängt vom Vertrag ab. Viele Verträge erlauben Kündigung mit 4 Wochen Frist zum Monatsende. Prüfen Sie die Kündigungsbedingungen vor Vertragsabschluss.'
          }
        },
        {
          '@type': 'Question',
          name: 'Was ist der Unterschied zwischen Arbeits- und Grundpreis?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Der Arbeitspreis ist der Preis pro kWh Strom. Der Grundpreis ist eine monatliche Gebühr unabhängig vom Verbrauch. Beide zusammen ergeben Ihre Gesamtkosten.'
          }
        },
        {
          '@type': 'Question',
          name: 'Gibt es Boni beim Gewerbestromwechsel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja, viele Anbieter bieten Wechselboni. Diese werden oft als Rabatt auf die erste Rechnung gewährt. Beachten Sie, dass Boni in die Gesamtkostenberechnung einfließen.'
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
        title="Gewerbestromvertrag: Worauf achten? | Energievergleich"
        description="Gewerbestromvertrag richtig bewerten. Erfahren Sie, worauf Sie bei Laufzeit, Preis und Bedingungen achten sollten."
        keywords="Gewerbestromvertrag, Gewerbestrom, Vertragsbedingungen, Stromvertrag Gewerbe"
        ogTitle="Gewerbestromvertrag: Worauf achten?"
        ogDescription="Wichtige Kriterien für Gewerbestromverträge."
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
              Gewerbestromvertrag: Worauf achten?
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90">
              Wichtige Kriterien für die Auswahl des richtigen Vertrags
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
                Ein guter Gewerbestromvertrag bietet nicht nur niedrige Preise, sondern auch Flexibilität und Planungssicherheit. Erfahren Sie, welche Kriterien wirklich wichtig sind.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Arbeitspreis und Grundpreis
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Der Arbeitspreis ist der Preis pro Kilowattstunde Strom. Der Grundpreis ist eine monatliche Gebühr, die unabhängig von Ihrem Verbrauch anfällt. Bei der Vertragsauswahl sollten Sie beide Komponenten berücksichtigen, nicht nur den Arbeitspreis.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Laufzeit und Kündigungsfrist
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Typische Laufzeiten sind 12 oder 24 Monate. Kürzere Laufzeiten bieten mehr Flexibilität, längere oft bessere Preise. Achten Sie auch auf die Kündigungsfrist – idealerweise 4 Wochen zum Monatsende.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Preisgarantie
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Eine Preisgarantie bedeutet, dass der Strompreis für einen bestimmten Zeitraum nicht erhöht wird. Dies gibt Ihnen Planungssicherheit. Beachten Sie, dass Steuern und Abgaben trotzdem erhöht werden können.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Wechselboni und Rabatte
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Viele Anbieter bieten Wechselboni an</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Boni werden oft als Rabatt auf erste Rechnung gewährt</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Berechnen Sie die Gesamtkosten inklusive Boni</span>
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
                q: 'Worauf sollte ich bei einem Gewerbestromvertrag achten?',
                a: 'Achten Sie auf Arbeitspreis, Grundpreis, Laufzeit, Kündigungsfrist, Preisgarantie und Bonusregelungen. Vergleichen Sie mehrere Angebote und prüfen Sie die Vertragsbedingungen sorgfältig.'
              },
              {
                q: 'Welche Laufzeit ist für Gewerbekunden sinnvoll?',
                a: 'Typisch sind 12-24 Monate. Kürzere Laufzeiten bieten mehr Flexibilität, längere Laufzeiten oft bessere Preise. Wählen Sie je nach Ihrer Planungssicherheit.'
              },
              {
                q: 'Kann ich meinen Gewerbestromvertrag vorzeitig kündigen?',
                a: 'Das hängt vom Vertrag ab. Viele Verträge erlauben Kündigung mit 4 Wochen Frist zum Monatsende. Prüfen Sie die Kündigungsbedingungen vor Vertragsabschluss.'
              },
              {
                q: 'Was ist der Unterschied zwischen Arbeits- und Grundpreis?',
                a: 'Der Arbeitspreis ist der Preis pro kWh Strom. Der Grundpreis ist eine monatliche Gebühr unabhängig vom Verbrauch. Beide zusammen ergeben Ihre Gesamtkosten.'
              },
              {
                q: 'Gibt es Boni beim Gewerbestromwechsel?',
                a: 'Ja, viele Anbieter bieten Wechselboni. Diese werden oft als Rabatt auf die erste Rechnung gewährt. Beachten Sie, dass Boni in die Gesamtkostenberechnung einfließen.'
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
              Jetzt Gewerbestrom vergleichen
            </h3>
            <p className="font-paragraph text-gray-700 mb-6">
              Nutzen Sie unser Vergleichstool und finden Sie den besten Tarif für Ihr Unternehmen.
            </p>
            <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link to="/gewerbestrom">
                Zum Gewerbestrom-Vergleich
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="border-t pt-12">
            <h3 className="font-heading text-2xl font-bold text-primary mb-6">
              Verwandte Artikel
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link to="/ratgeber/gewerbe/gewerbegas-beschaffung-tipps" className="group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                      Gewerbegas Beschaffung
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-gray-600">
                      Tipps zur Beschaffung von Gewerbegas für Ihr Unternehmen.
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/ratgeber/wechselwissen/lieferantenwechsel-ablauf" className="group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                      Lieferantenwechsel Ablauf
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-gray-600">
                      Schritt-für-Schritt Anleitung zum Anbieterwechsel.
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
