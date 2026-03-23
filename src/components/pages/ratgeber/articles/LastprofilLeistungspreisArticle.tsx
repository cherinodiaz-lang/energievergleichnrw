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

export default function LastprofilLeistungspreisArticle() {
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Was ist ein Lastprofil?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ein Lastprofil beschreibt, wie sich Ihr Stromverbrauch über die Zeit verteilt. Es zeigt, zu welchen Zeiten Sie viel oder wenig Strom verbrauchen. Dies ist wichtig für die Tarifberechnung.'
          }
        },
        {
          '@type': 'Question',
          name: 'Was ist der Unterschied zwischen Leistungspreis und Arbeitspreis?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Der Arbeitspreis ist der Preis pro kWh Strom. Der Leistungspreis ist eine Gebühr für die maximale Leistung (in kW), die Sie gleichzeitig abrufen. Beide zusammen ergeben Ihre Stromkosten.'
          }
        },
        {
          '@type': 'Question',
          name: 'Für wen ist ein Leistungspreis relevant?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Leistungspreise sind vor allem für Gewerbekunden relevant. Privathaushalt zahlen normalerweise nur Arbeitspreis und Grundpreis. Gewerbekunden mit hohem Verbrauch zahlen oft zusätzlich einen Leistungspreis.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie kann ich meinen Leistungspreis senken?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Reduzieren Sie Ihre maximale Leistung durch bessere Lastverteilung. Nutzen Sie Energiesparprogramme und moderne Technologien. Ein Energieberater kann konkrete Maßnahmen empfehlen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie wird das Lastprofil ermittelt?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Das Lastprofil wird durch Messungen oder Schätzungen ermittelt. Bei Gewerbekunden erfolgt dies durch intelligente Zähler oder Messungen. Dies ist Grundlage für die Tarifberechnung.'
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
        title="Lastprofil & Leistungspreis: Erklärung | Energievergleich"
        description="Lastprofil und Leistungspreis verstehen. Erfahren Sie, wie diese Faktoren Ihre Stromkosten beeinflussen."
        keywords="Lastprofil, Leistungspreis, Arbeitspreis, Stromkosten Gewerbe"
        ogTitle="Lastprofil & Leistungspreis: Erklärung"
        ogDescription="Verstehen Sie Lastprofil und Leistungspreis bei Stromtarifen."
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
              Lastprofil & Leistungspreis
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90">
              Verstehen Sie, wie Lastprofil und Leistungspreis Ihre Stromkosten beeinflussen
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
                Lastprofil und Leistungspreis sind wichtige Faktoren bei Gewerbestromtarifen. Erfahren Sie, wie diese funktionieren und wie Sie Ihre Kosten optimieren können.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Was ist ein Lastprofil?
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Ein Lastprofil beschreibt, wie sich Ihr Stromverbrauch über die Zeit verteilt. Es zeigt, zu welchen Zeiten Sie viel oder wenig Strom verbrauchen. Dieses Profil ist wichtig für die Tarifberechnung und die Netzplanung.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Arbeitspreis vs. Leistungspreis
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Der Arbeitspreis ist der Preis pro Kilowattstunde (kWh) Strom, den Sie verbrauchen. Der Leistungspreis ist eine Gebühr für die maximale Leistung (in Kilowatt, kW), die Sie gleichzeitig abrufen. Beide zusammen ergeben Ihre Gesamtstromkosten.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Für wen ist der Leistungspreis relevant?
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Vor allem für Gewerbekunden mit hohem Verbrauch</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Privathaushalt zahlen normalerweise nur Arbeitspreis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Kann einen großen Teil der Stromkosten ausmachen</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Leistungspreis senken
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Sie können Ihren Leistungspreis senken, indem Sie Ihre maximale Leistung reduzieren. Dies erreichen Sie durch bessere Lastverteilung, Energiesparprogramme und moderne Technologien. Ein Energieberater kann konkrete Maßnahmen empfehlen.
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
                q: 'Was ist ein Lastprofil?',
                a: 'Ein Lastprofil beschreibt, wie sich Ihr Stromverbrauch über die Zeit verteilt. Es zeigt, zu welchen Zeiten Sie viel oder wenig Strom verbrauchen. Dies ist wichtig für die Tarifberechnung.'
              },
              {
                q: 'Was ist der Unterschied zwischen Leistungspreis und Arbeitspreis?',
                a: 'Der Arbeitspreis ist der Preis pro kWh Strom. Der Leistungspreis ist eine Gebühr für die maximale Leistung (in kW), die Sie gleichzeitig abrufen. Beide zusammen ergeben Ihre Stromkosten.'
              },
              {
                q: 'Für wen ist ein Leistungspreis relevant?',
                a: 'Leistungspreise sind vor allem für Gewerbekunden relevant. Privathaushalt zahlen normalerweise nur Arbeitspreis und Grundpreis. Gewerbekunden mit hohem Verbrauch zahlen oft zusätzlich einen Leistungspreis.'
              },
              {
                q: 'Wie kann ich meinen Leistungspreis senken?',
                a: 'Reduzieren Sie Ihre maximale Leistung durch bessere Lastverteilung. Nutzen Sie Energiesparprogramme und moderne Technologien. Ein Energieberater kann konkrete Maßnahmen empfehlen.'
              },
              {
                q: 'Wie wird das Lastprofil ermittelt?',
                a: 'Das Lastprofil wird durch Messungen oder Schätzungen ermittelt. Bei Gewerbekunden erfolgt dies durch intelligente Zähler oder Messungen. Dies ist Grundlage für die Tarifberechnung.'
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
              <Link to="/ratgeber/gewerbe/gewerbestrom-vertrag-worauf-achten" className="group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                      Gewerbestromvertrag
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-gray-600">
                      Worauf Sie bei Gewerbestromverträgen achten sollten.
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
