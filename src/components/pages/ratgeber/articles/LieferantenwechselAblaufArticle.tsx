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

export default function LieferantenwechselAblaufArticle() {
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Wie lange dauert ein Lieferantenwechsel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ein Lieferantenwechsel dauert in der Regel 4-6 Wochen. Dies ist die gesetzliche Kündigungsfrist. Der neue Anbieter kümmert sich um alle Formalitäten.'
          }
        },
        {
          '@type': 'Question',
          name: 'Was muss ich beim Wechsel beachten?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Beachten Sie: Kündigungsfrist prüfen, neuen Anbieter wählen, Kündigung schreiben, Zählernummer bereithalten, Abschlag klären, Wechsel bestätigen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wird meine Versorgung unterbrochen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nein. Ihre Versorgung ist gesetzlich geschützt und wird nicht unterbrochen. Im Notfall springt der Grundversorger ein.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wer kümmert sich um die Kündigung?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sie können selbst kündigen oder der neue Anbieter kümmert sich darum. Viele Anbieter bieten einen kostenlosen Wechselservice an.'
          }
        },
        {
          '@type': 'Question',
          name: 'Was passiert mit meinen Abschlägen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Der alte Anbieter berechnet die Abschläge bis zum Kündigungsdatum. Der neue Anbieter setzt neue Abschläge fest. Eine Abrechnung erfolgt später.'
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
        title="Lieferantenwechsel: Ablauf & Tipps | Energievergleich"
        description="Lieferantenwechsel Schritt für Schritt erklärt. Erfahren Sie, wie Sie richtig wechseln und worauf Sie achten sollten."
        keywords="Lieferantenwechsel, Anbieterwechsel, Stromwechsel, Gaswechsel"
        ogTitle="Lieferantenwechsel: Ablauf & Tipps"
        ogDescription="Schritt-für-Schritt Anleitung zum Lieferantenwechsel."
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
              Lieferantenwechsel: Ablauf
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90">
              Schritt-für-Schritt Anleitung zum Anbieterwechsel
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
                Ein Lieferantenwechsel ist einfacher als viele denken. Erfahren Sie, wie der Wechsel Schritt für Schritt funktioniert.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Schritt 1: Tarife vergleichen
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Nutzen Sie einen Vergleichsrechner und finden Sie einen besseren Tarif. Geben Sie Ihre Postleitzahl und Ihren Verbrauch ein. Vergleichen Sie mehrere Angebote.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Schritt 2: Neuen Anbieter wählen
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Wählen Sie einen neuen Anbieter und schließen Sie einen Vertrag ab. Der neue Anbieter kümmert sich meist um die Kündigung beim alten Anbieter.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Schritt 3: Kündigung einreichen
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Kündigung schriftlich einreichen (Brief oder E-Mail)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Kündigungsfrist beachten (4 Wochen zum Monatsende)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Bestätigung anfordern und aufbewahren</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Schritt 4: Wechsel abwarten
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Der Wechsel dauert in der Regel 4-6 Wochen. Ihre Versorgung wird nicht unterbrochen. Der neue Anbieter meldet sich mit den neuen Abschlägen.
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
                q: 'Wie lange dauert ein Lieferantenwechsel?',
                a: 'Ein Lieferantenwechsel dauert in der Regel 4-6 Wochen. Dies ist die gesetzliche Kündigungsfrist. Der neue Anbieter kümmert sich um alle Formalitäten.'
              },
              {
                q: 'Was muss ich beim Wechsel beachten?',
                a: 'Beachten Sie: Kündigungsfrist prüfen, neuen Anbieter wählen, Kündigung schreiben, Zählernummer bereithalten, Abschlag klären, Wechsel bestätigen.'
              },
              {
                q: 'Wird meine Versorgung unterbrochen?',
                a: 'Nein. Ihre Versorgung ist gesetzlich geschützt und wird nicht unterbrochen. Im Notfall springt der Grundversorger ein.'
              },
              {
                q: 'Wer kümmert sich um die Kündigung?',
                a: 'Sie können selbst kündigen oder der neue Anbieter kümmert sich darum. Viele Anbieter bieten einen kostenlosen Wechselservice an.'
              },
              {
                q: 'Was passiert mit meinen Abschlägen?',
                a: 'Der alte Anbieter berechnet die Abschläge bis zum Kündigungsdatum. Der neue Anbieter setzt neue Abschläge fest. Eine Abrechnung erfolgt später.'
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
              Jetzt Tarife vergleichen
            </h3>
            <p className="font-paragraph text-gray-700 mb-6">
              Nutzen Sie unser Vergleichstool und finden Sie bessere Tarife.
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
              <Link to="/ratgeber/wechselwissen/was-tun-wenn-wechsel-schiefgeht" className="group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                      Wechsel schiefgegangen?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-gray-600">
                      Was tun, wenn etwas beim Wechsel schiefgeht?
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
