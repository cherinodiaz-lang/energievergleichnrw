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

export default function WechselSchiefgehtArticle() {
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Was tun, wenn der Wechsel nicht funktioniert?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Kontaktieren Sie sofort den neuen Anbieter und den Netzbetreiber. Prüfen Sie, ob die Kündigung beim alten Anbieter eingegangen ist. Dokumentieren Sie alles schriftlich.'
          }
        },
        {
          '@type': 'Question',
          name: 'Kann ich ohne Strom sein?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nein. Ihre Versorgung ist gesetzlich geschützt. Im Notfall springt der Grundversorger ein und beliefert Sie mit Strom oder Gas.'
          }
        },
        {
          '@type': 'Question',
          name: 'Was ist der Grundversorger?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Der Grundversorger ist der Anbieter mit den meisten Kunden in Ihrer Region. Er muss Sie beliefern, wenn kein anderer Anbieter verfügbar ist.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wer hilft mir bei Problemen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Kontaktieren Sie den neuen Anbieter, den Netzbetreiber oder die Schlichtungsstelle. Die Verbraucherzentrale bietet auch kostenlose Beratung.'
          }
        },
        {
          '@type': 'Question',
          name: 'Kann ich Schadensersatz fordern?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja, bei Verschulden des Anbieters können Sie Schadensersatz fordern. Dokumentieren Sie alle Schäden und Kosten. Eine Schlichtungsstelle kann helfen.'
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
        title="Wechsel schiefgegangen: Was tun? | Energievergleich"
        description="Probleme beim Lieferantenwechsel? Erfahren Sie, was Sie tun können und wer Ihnen hilft."
        keywords="Wechsel schiefgegangen, Probleme Anbieterwechsel, Beschwerde Energieversorger"
        ogTitle="Wechsel schiefgegangen: Was tun?"
        ogDescription="Hilfe bei Problemen beim Lieferantenwechsel."
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
              Wechsel schiefgegangen?
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90">
              Was Sie tun können, wenn Probleme beim Wechsel auftreten
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
                Probleme beim Lieferantenwechsel sind selten, aber möglich. Erfahren Sie, wie Sie vorgehen, wenn etwas schiefgeht.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Erste Schritte
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Kontaktieren Sie sofort den neuen Anbieter</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Prüfen Sie, ob die Kündigung beim alten Anbieter eingegangen ist</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Dokumentieren Sie alles schriftlich</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Kontaktieren Sie den Netzbetreiber</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Versorgungssicherheit
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Ihre Versorgung ist gesetzlich geschützt. Sie können nicht ohne Strom oder Gas sein. Im Notfall springt der Grundversorger ein und beliefert Sie mit Energie. Dies ist eine Notversorgung, die teurer sein kann.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Hilfe und Beschwerde
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Wenn Sie nicht weiterkommen, können Sie sich an die Schlichtungsstelle wenden. Diese vermittelt kostenlos zwischen Ihnen und dem Energieversorger. Die Verbraucherzentrale bietet auch kostenlose Beratung.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Schadensersatz
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Bei Verschulden des Anbieters können Sie Schadensersatz fordern. Dokumentieren Sie alle Schäden und Kosten. Eine Schlichtungsstelle kann helfen, eine Einigung zu erreichen.
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
                q: 'Was tun, wenn der Wechsel nicht funktioniert?',
                a: 'Kontaktieren Sie sofort den neuen Anbieter und den Netzbetreiber. Prüfen Sie, ob die Kündigung beim alten Anbieter eingegangen ist. Dokumentieren Sie alles schriftlich.'
              },
              {
                q: 'Kann ich ohne Strom sein?',
                a: 'Nein. Ihre Versorgung ist gesetzlich geschützt. Im Notfall springt der Grundversorger ein und beliefert Sie mit Strom oder Gas.'
              },
              {
                q: 'Was ist der Grundversorger?',
                a: 'Der Grundversorger ist der Anbieter mit den meisten Kunden in Ihrer Region. Er muss Sie beliefern, wenn kein anderer Anbieter verfügbar ist.'
              },
              {
                q: 'Wer hilft mir bei Problemen?',
                a: 'Kontaktieren Sie den neuen Anbieter, den Netzbetreiber oder die Schlichtungsstelle. Die Verbraucherzentrale bietet auch kostenlose Beratung.'
              },
              {
                q: 'Kann ich Schadensersatz fordern?',
                a: 'Ja, bei Verschulden des Anbieters können Sie Schadensersatz fordern. Dokumentieren Sie alle Schäden und Kosten. Eine Schlichtungsstelle kann helfen.'
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
              Kontakt & Hilfe
            </h3>
            <p className="font-paragraph text-gray-700 mb-6">
              Haben Sie Probleme? Kontaktieren Sie uns oder die Verbraucherzentrale.
            </p>
            <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link to="/kontakt">
                Kontakt aufnehmen
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="border-t pt-12">
            <h3 className="font-heading text-2xl font-bold text-primary mb-6">
              Verwandte Artikel
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <Link to="/ratgeber/wechselwissen/kuendigungsfristen-strom-gas" className="group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                      Kündigungsfristen
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-gray-600">
                      Kündigungsfristen bei Strom und Gas.
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
