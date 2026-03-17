import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Link } from 'react-router-dom';

export default function GewerbegasBeschaffungArticle() {
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Wie beschaffe ich Gas für mein Gewerbe?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Vergleichen Sie Angebote mehrerer Gasanbieter, prüfen Sie Preise und Bedingungen, und wechseln Sie zu dem Anbieter mit den besten Konditionen. Der Wechsel ist kostenlos und unkompliziert.'
          }
        },
        {
          '@type': 'Question',
          name: 'Welche Unterlagen benötige ich für einen Gaswechsel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sie benötigen Ihre Kundennummer beim aktuellen Anbieter, die Zählernummer und Ihren jährlichen Gasverbrauch. Diese Informationen finden Sie auf Ihrer letzten Gasrechnung.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie lange dauert ein Gaswechsel im Gewerbe?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ein Gaswechsel dauert in der Regel 4-6 Wochen. Die Gasversorgung wird nicht unterbrochen. Der neue Anbieter kümmert sich um alle notwendigen Schritte.'
          }
        },
        {
          '@type': 'Question',
          name: 'Kann ich Gewerbegas auch kurzfristig wechseln?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Das hängt von Ihrer Kündigungsfrist ab. Viele Verträge erlauben Kündigung mit 4 Wochen Frist zum Monatsende. Bei Preiserhöhungen haben Sie oft ein Sonderkündigungsrecht.'
          }
        },
        {
          '@type': 'Question',
          name: 'Gibt es Besonderheiten bei Gewerbegas?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja, Gewerbegas hat oft bessere Konditionen als Privatkundengas. Verhandeln Sie mit mehreren Anbietern und nutzen Sie Ihre Verbrauchsmenge als Verhandlungsmasse.'
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
        title="Gewerbegas Beschaffung: Tipps & Strategie | Energievergleich"
        description="Gewerbegas richtig beschaffen. Tipps zur Auswahl des besten Anbieters und zum Wechsel für Ihr Unternehmen."
        keywords="Gewerbegas Beschaffung, Gasanbieter Gewerbe, Gaswechsel Unternehmen"
        ogTitle="Gewerbegas Beschaffung: Tipps & Strategie"
        ogDescription="Effiziente Gewerbegas-Beschaffung für Ihr Unternehmen."
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
              Gewerbegas Beschaffung
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90">
              Tipps und Strategien zur optimalen Gasversorgung für Ihr Unternehmen
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
                Die richtige Gasbeschaffung ist entscheidend für die Wirtschaftlichkeit Ihres Unternehmens. Erfahren Sie, wie Sie den besten Anbieter finden und Kosten sparen.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Vergleich mehrerer Angebote
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Der erste Schritt ist ein Vergleich mehrerer Gasanbieter. Nutzen Sie Vergleichstools und fordern Sie direkt bei Anbietern an. Je höher Ihr Verbrauch, desto besser können Sie verhandeln.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Vertragsbedingungen prüfen
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Achten Sie nicht nur auf den Preis, sondern auch auf Laufzeit, Kündigungsfrist und Preisgarantie. Ein günstiger Preis mit langer Bindung kann teuer werden, wenn die Preise fallen.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Verhandlung mit Anbietern
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Nutzen Sie Konkurrenzangebote als Verhandlungsmasse</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Verhandeln Sie über Boni und Rabatte</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Fragen Sie nach Mengenrabatten bei höherem Verbrauch</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Wechsel durchführen
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Der Wechsel ist kostenlos und unkompliziert. Der neue Anbieter kümmert sich um die Kündigung beim alten Anbieter. Ihre Gasversorgung wird nicht unterbrochen.
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
                q: 'Wie beschaffe ich Gas für mein Gewerbe?',
                a: 'Vergleichen Sie Angebote mehrerer Gasanbieter, prüfen Sie Preise und Bedingungen, und wechseln Sie zu dem Anbieter mit den besten Konditionen. Der Wechsel ist kostenlos und unkompliziert.'
              },
              {
                q: 'Welche Unterlagen benötige ich für einen Gaswechsel?',
                a: 'Sie benötigen Ihre Kundennummer beim aktuellen Anbieter, die Zählernummer und Ihren jährlichen Gasverbrauch. Diese Informationen finden Sie auf Ihrer letzten Gasrechnung.'
              },
              {
                q: 'Wie lange dauert ein Gaswechsel im Gewerbe?',
                a: 'Ein Gaswechsel dauert in der Regel 4-6 Wochen. Die Gasversorgung wird nicht unterbrochen. Der neue Anbieter kümmert sich um alle notwendigen Schritte.'
              },
              {
                q: 'Kann ich Gewerbegas auch kurzfristig wechseln?',
                a: 'Das hängt von Ihrer Kündigungsfrist ab. Viele Verträge erlauben Kündigung mit 4 Wochen Frist zum Monatsende. Bei Preiserhöhungen haben Sie oft ein Sonderkündigungsrecht.'
              },
              {
                q: 'Gibt es Besonderheiten bei Gewerbegas?',
                a: 'Ja, Gewerbegas hat oft bessere Konditionen als Privatkundengas. Verhandeln Sie mit mehreren Anbietern und nutzen Sie Ihre Verbrauchsmenge als Verhandlungsmasse.'
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
              Jetzt Gewerbegas vergleichen
            </h3>
            <p className="font-paragraph text-gray-700 mb-6">
              Nutzen Sie unser Vergleichstool und finden Sie den besten Tarif für Ihr Unternehmen.
            </p>
            <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link to="/gewerbegas">
                Zum Gewerbegas-Vergleich
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

      <Footer />
    </div>
  );
}
