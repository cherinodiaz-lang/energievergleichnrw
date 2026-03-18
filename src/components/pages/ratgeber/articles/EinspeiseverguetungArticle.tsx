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
import { ROUTES } from '@/lib/routes';

export default function EinspeiseverguetungArticle() {
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Was ist die Einspeisevergütung?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Die Einspeisevergütung ist eine Zahlung für Strom, den Sie mit Ihrer Solaranlage produzieren und ins Stromnetz einspeisen. Sie erhalten diese Vergütung für 20 Jahre.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie hoch ist die Einspeisevergütung?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Die Einspeisevergütung liegt derzeit bei etwa 8-10 Cent pro kWh. Sie hängt von der Anlagengröße und dem Zeitpunkt der Inbetriebnahme ab.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie lange erhalte ich die Einspeisevergütung?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sie erhalten die Einspeisevergütung für 20 Jahre ab dem Zeitpunkt der Inbetriebnahme. Danach können Sie den Strom selbst nutzen oder weiterhin einspeisen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Kann ich die Einspeisevergütung erhöhen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Die Einspeisevergütung ist gesetzlich festgelegt und kann nicht erhöht werden. Sie können aber Ihre Eigennutzung erhöhen, um mehr Strom selbst zu nutzen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Was ist der Unterschied zwischen Eigennutzung und Einspeisevergütung?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Eigennutzung: Sie nutzen den Strom selbst und sparen Stromkosten. Einspeisevergütung: Sie speisen überschüssigen Strom ins Netz ein und erhalten dafür Geld.'
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
        title="Einspeisevergütung verstehen | Energievergleich"
        description="Einspeisevergütung für Solaranlagen erklärt. Erfahren Sie, wie Sie mit Ihrer Solaranlage Geld verdienen."
        keywords="Einspeisevergütung, Solaranlage Vergütung, Photovoltaik Einkommen"
        ogTitle="Einspeisevergütung verstehen"
        ogDescription="Wie die Einspeisevergütung für Solaranlagen funktioniert."
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
              Einspeisevergütung verstehen
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90">
              Wie Sie mit Ihrer Solaranlage Geld verdienen
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
                Die Einspeisevergütung ist ein wichtiger Bestandteil der Wirtschaftlichkeit von Solaranlagen. Erfahren Sie, wie dieses System funktioniert und wie Sie davon profitieren.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <div className="space-y-4">
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Was ist die Einspeisevergütung?
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Die Einspeisevergütung ist eine Zahlung für Strom, den Sie mit Ihrer Solaranlage produzieren und ins öffentliche Stromnetz einspeisen. Der Netzbetreiber zahlt Ihnen für jeden Kilowattstunde Strom, den Sie einspeisen.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Höhe der Einspeisevergütung
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Die Einspeisevergütung liegt derzeit bei etwa 8-10 Cent pro kWh. Sie hängt von der Anlagengröße und dem Zeitpunkt der Inbetriebnahme ab. Größere Anlagen erhalten oft eine etwas niedrigere Vergütung.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Dauer der Vergütung
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">20 Jahre Garantie ab Inbetriebnahme</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Danach können Sie den Strom selbst nutzen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Oder weiterhin einspeisen (ohne Vergütung)</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Eigennutzung vs. Einspeisevergütung
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Sie können Ihren Solarstrom selbst nutzen (Eigennutzung) oder ins Netz einspeisen (Einspeisevergütung). Mit Eigennutzung sparen Sie Stromkosten, mit Einspeisevergütung verdienen Sie Geld. Optimal ist eine Kombination aus beiden.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Häufige Fragen
                </h2>
              </div>
            </div>
          </motion.div>

          <div className="space-y-4 mt-12">
            {[
              {
                q: 'Was ist die Einspeisevergütung?',
                a: 'Die Einspeisevergütung ist eine Zahlung für Strom, den Sie mit Ihrer Solaranlage produzieren und ins Stromnetz einspeisen. Sie erhalten diese Vergütung für 20 Jahre.'
              },
              {
                q: 'Wie hoch ist die Einspeisevergütung?',
                a: 'Die Einspeisevergütung liegt derzeit bei etwa 8-10 Cent pro kWh. Sie hängt von der Anlagengröße und dem Zeitpunkt der Inbetriebnahme ab.'
              },
              {
                q: 'Wie lange erhalte ich die Einspeisevergütung?',
                a: 'Sie erhalten die Einspeisevergütung für 20 Jahre ab dem Zeitpunkt der Inbetriebnahme. Danach können Sie den Strom selbst nutzen oder weiterhin einspeisen.'
              },
              {
                q: 'Kann ich die Einspeisevergütung erhöhen?',
                a: 'Die Einspeisevergütung ist gesetzlich festgelegt und kann nicht erhöht werden. Sie können aber Ihre Eigennutzung erhöhen, um mehr Strom selbst zu nutzen.'
              },
              {
                q: 'Was ist der Unterschied zwischen Eigennutzung und Einspeisevergütung?',
                a: 'Eigennutzung: Sie nutzen den Strom selbst und sparen Stromkosten. Einspeisevergütung: Sie speisen überschüssigen Strom ins Netz ein und erhalten dafür Geld.'
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
              Kostenlose Beratung anfragen
            </h3>
            <p className="font-paragraph text-gray-700 mb-6">
              Nutzen Sie unsere kostenlose Beratung und erfahren Sie, wie viel Sie mit Ihrer Solaranlage verdienen können.
            </p>
            <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link to={ROUTES.photovoltaik}>
                Zur Photovoltaik-Beratung
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="border-t pt-12">
            <h3 className="font-heading text-2xl font-bold text-primary mb-6">
              Verwandte Artikel
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link to="/ratgeber/photovoltaik/pv-kosten-nrw-wovon-abhaengig" className="group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                      PV-Kosten in NRW
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-gray-600">
                      Wovon hängen die Kosten einer Solaranlage ab?
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/ratgeber/photovoltaik/pv-speicher-lohnt-sich" className="group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                      PV-Speicher: Lohnt sich das?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-gray-600">
                      Erfahren Sie, ob ein Stromspeicher sinnvoll ist.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t text-center">
            <Link to="/ratgeber/photovoltaik" className="tap-target text-sm mt-4 mb-4 inline-block text-primary hover:text-primary/80 transition-colors">
              ← Zurück zum Ratgeber
            </Link>
            <p className="font-paragraph text-sm text-gray-500 mt-4">
              Zuletzt aktualisiert: 09. Januar 2026 | Redaktion Energievergleich
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
