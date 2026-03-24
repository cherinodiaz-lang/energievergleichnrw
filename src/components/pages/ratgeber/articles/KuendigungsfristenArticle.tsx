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

export default function KuendigungsfristenArticle() {
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Wie lange ist die Kündigungsfrist bei Strom und Gas?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Die normale Kündigungsfrist beträgt 4 Wochen zum Ende eines Kalendermonats. Bei Preiserhöhungen haben Sie ein Sonderkündigungsrecht mit 2 Wochen Frist.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wann kann ich kündigen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sie können jederzeit mit 4 Wochen Frist zum Monatsende kündigen. Bei Preiserhöhungen können Sie sofort mit 2 Wochen Frist zum Zeitpunkt der Erhöhung kündigen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Was ist ein Sonderkündigungsrecht?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ein Sonderkündigungsrecht ist ein Recht zur vorzeitigen Kündigung bei bestimmten Ereignissen wie Preiserhöhungen. Die Frist ist meist 2 Wochen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Kann ich während einer Vertragslaufzeit kündigen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Normalerweise nicht. Aber bei Preiserhöhungen haben Sie ein Sonderkündigungsrecht. Prüfen Sie Ihren Vertrag auf weitere Kündigungsgründe.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie kündige ich richtig?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Kündigen Sie schriftlich per Brief oder E-Mail. Nennen Sie Ihre Kundennummer und das Kündigungsdatum. Bewahren Sie eine Kopie auf.'
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
        title="Kündigungsfristen Strom & Gas: Übersicht | Energievergleich"
        description="Kündigungsfristen bei Strom und Gas verstehen. Erfahren Sie, wann und wie Sie kündigen können."
        keywords="Kündigungsfrist, Strom kündigen, Gas kündigen, Sonderkündigungsrecht"
        ogTitle="Kündigungsfristen Strom & Gas: Übersicht"
        ogDescription="Alles über Kündigungsfristen bei Strom und Gas."
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
              Kündigungsfristen Strom & Gas
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90">
              Wann und wie können Sie Ihren Vertrag kündigen?
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
                Die Kündigungsfrist ist entscheidend für einen schnellen Anbieterwechsel. Erfahren Sie, welche Fristen gelten und wie Sie richtig kündigen.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Normale Kündigungsfrist
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Die normale Kündigungsfrist beträgt 4 Wochen zum Ende eines Kalendermonats. Das bedeutet: Wenn Sie am 15. Januar kündigen, endet der Vertrag am 28. Februar (oder 29. Februar in Schaltjahren).
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Sonderkündigungsrecht
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Bei Preiserhöhungen: 2 Wochen Frist zum Zeitpunkt der Erhöhung</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Bei Umzug: Oft 2 Wochen Frist</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Bei Netzwechsel: Je nach Situation</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Richtig kündigen
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Kündigen Sie schriftlich per Brief oder E-Mail. Nennen Sie Ihre Kundennummer, den Namen und das gewünschte Kündigungsdatum. Bewahren Sie eine Kopie auf und fordern Sie eine Bestätigung an.
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
                q: 'Wie lange ist die Kündigungsfrist bei Strom und Gas?',
                a: 'Die normale Kündigungsfrist beträgt 4 Wochen zum Ende eines Kalendermonats. Bei Preiserhöhungen haben Sie ein Sonderkündigungsrecht mit 2 Wochen Frist.'
              },
              {
                q: 'Wann kann ich kündigen?',
                a: 'Sie können jederzeit mit 4 Wochen Frist zum Monatsende kündigen. Bei Preiserhöhungen können Sie sofort mit 2 Wochen Frist zum Zeitpunkt der Erhöhung kündigen.'
              },
              {
                q: 'Was ist ein Sonderkündigungsrecht?',
                a: 'Ein Sonderkündigungsrecht ist ein Recht zur vorzeitigen Kündigung bei bestimmten Ereignissen wie Preiserhöhungen. Die Frist ist meist 2 Wochen.'
              },
              {
                q: 'Kann ich während einer Vertragslaufzeit kündigen?',
                a: 'Normalerweise nicht. Aber bei Preiserhöhungen haben Sie ein Sonderkündigungsrecht. Prüfen Sie Ihren Vertrag auf weitere Kündigungsgründe.'
              },
              {
                q: 'Wie kündige ich richtig?',
                a: 'Kündigen Sie schriftlich per Brief oder E-Mail. Nennen Sie Ihre Kundennummer und das Kündigungsdatum. Bewahren Sie eine Kopie auf.'
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

      <DeferredFooter />
    </div>
  );
}
