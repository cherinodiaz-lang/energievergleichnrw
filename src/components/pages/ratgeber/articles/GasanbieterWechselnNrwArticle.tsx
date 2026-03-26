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

export default function GasanbieterWechselnNrwArticle() {
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Wie lange dauert ein Gasanbieterwechsel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ein Gasanbieterwechsel dauert in der Regel 4-6 Wochen. Dies ist die gesetzliche Kündigungsfrist. Ihre Gasversorgung wird während des gesamten Prozesses nicht unterbrochen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Welche Unterlagen benötige ich für den Wechsel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sie benötigen Ihre Postleitzahl, Ihren jährlichen Gasverbrauch (in kWh) und optional Ihre Zählernummer. Diese Informationen finden Sie auf Ihrer letzten Gasrechnung.'
          }
        },
        {
          '@type': 'Question',
          name: 'Kann ich während des Wechsels ohne Gas sein?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nein. Ihre Gasversorgung ist gesetzlich geschützt und wird nicht unterbrochen. Im Notfall springt der Grundversorger ein.'
          }
        },
        {
          '@type': 'Question',
          name: 'Muss ich meinen alten Vertrag selbst kündigen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nein. Der neue Gasanbieter kümmert sich um die Kündigung bei Ihrem alten Anbieter. Sie müssen nur den neuen Vertrag unterzeichnen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Gibt es versteckte Kosten beim Wechsel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nein. Der Wechsel ist komplett kostenlos. Es fallen keine Gebühren für Kündigung oder Anmeldung an. Alle Kosten sind transparent aufgeführt.'
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
        title="Gasanbieter wechseln in NRW | Energievergleich"
        description="Schritt-für-Schritt Anleitung zum Gasanbieterwechsel in NRW. Erfahren Sie, wie Sie richtig wechseln und Kosten sparen."
        keywords="Gasanbieter wechseln, Gaswechsel NRW, Gasanbieterwechsel"
        ogTitle="Gasanbieter wechseln in NRW"
        ogDescription="Anleitung zum Gasanbieterwechsel in NRW."
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
              Gasanbieter wechseln in NRW
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90">
              Schritt-für-Schritt Anleitung zum erfolgreichen Gasanbieterwechsel
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
                Ein Gasanbieterwechsel ist einfacher als viele denken. Mit wenigen Schritten können Sie zu einem günstigeren Anbieter wechseln und Heizkosten sparen. Der Wechsel ist kostenlos und Ihre Gasversorgung wird nicht unterbrochen.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Schritt 1: Gasverbrauch ermitteln
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Schauen Sie auf Ihre letzte Gasrechnung. Dort finden Sie Ihren jährlichen Gasverbrauch in Kilowattstunden (kWh). Dieser Wert ist wichtig für den Vergleich. Wenn Sie die genaue Zahl nicht haben, können Sie auch Ihre Wohnfläche angeben – damit wird der Verbrauch geschätzt.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Schritt 2: Tarife vergleichen
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Nutzen Sie einen Vergleichsrechner und geben Sie Ihre Postleitzahl und Ihren Gasverbrauch ein. Der Rechner zeigt Ihnen alle verfügbaren Tarife sortiert nach Preis. Achten Sie nicht nur auf den Gesamtpreis, sondern auch auf Laufzeit, Preisgarantie und Kündigungsfrist.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Schritt 3: Angebot auswählen
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Wählen Sie einen Tarif, der zu Ihnen passt. Achten Sie darauf, dass die Preisgarantie mindestens 12 Monate beträgt. Lesen Sie die Vertragsbedingungen sorgfältig durch, bevor Sie sich anmelden.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Schritt 4: Wechsel durchführen
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Füllen Sie das Anmeldeformular aus und unterschreiben Sie den neuen Vertrag. Der neue Gasanbieter kümmert sich um die Kündigung bei Ihrem alten Anbieter. Sie müssen sich selbst nicht darum kümmern.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Schritt 5: Bestätigung abwarten
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Nach etwa 4-6 Wochen erhalten Sie eine Bestätigung vom neuen Gasanbieter. Ab diesem Zeitpunkt wird Ihr neuer Tarif berechnet. Ihre Gasversorgung läuft die ganze Zeit über ohne Unterbrechung.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Worauf Sie achten sollten
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Preisgarantie: Mindestens 12 Monate</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Kündigungsfrist: 4 Wochen zum Monatsende</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Grundpreis: Vergleichen Sie auch den monatlichen Grundpreis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Boni: Achten Sie auf Neukundenboni und deren Bedingungen</span>
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
                q: 'Wie lange dauert ein Gasanbieterwechsel?',
                a: 'Ein Gasanbieterwechsel dauert in der Regel 4-6 Wochen. Dies ist die gesetzliche Kündigungsfrist. Ihre Gasversorgung wird während des gesamten Prozesses nicht unterbrochen.'
              },
              {
                q: 'Welche Unterlagen benötige ich für den Wechsel?',
                a: 'Sie benötigen Ihre Postleitzahl, Ihren jährlichen Gasverbrauch (in kWh) und optional Ihre Zählernummer. Diese Informationen finden Sie auf Ihrer letzten Gasrechnung.'
              },
              {
                q: 'Kann ich während des Wechsels ohne Gas sein?',
                a: 'Nein. Ihre Gasversorgung ist gesetzlich geschützt und wird nicht unterbrochen. Im Notfall springt der Grundversorger ein.'
              },
              {
                q: 'Muss ich meinen alten Vertrag selbst kündigen?',
                a: 'Nein. Der neue Gasanbieter kümmert sich um die Kündigung bei Ihrem alten Anbieter. Sie müssen nur den neuen Vertrag unterzeichnen.'
              },
              {
                q: 'Gibt es versteckte Kosten beim Wechsel?',
                a: 'Nein. Der Wechsel ist komplett kostenlos. Es fallen keine Gebühren für Kündigung oder Anmeldung an. Alle Kosten sind transparent aufgeführt.'
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
              Jetzt Gastarife vergleichen
            </h3>
            <p className="font-paragraph text-gray-700 mb-6">
              Nutzen Sie unseren kostenlosen Vergleichsrechner und finden Sie den günstigsten Gastarif in Ihrer Region.
            </p>
            <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link to={ROUTES.gasvergleich}>
                Zum Gasvergleich
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="border-t pt-12">
            <h3 className="font-heading text-2xl font-bold text-primary mb-6">
              Verwandte Artikel
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link to="/ratgeber/gas/grundversorgung-gas-sondervertrag" className="group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                      Grundversorgung vs. Sondervertrag
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-gray-600">
                      Unterschiede zwischen Grundversorgung und Sonderverträgen bei Gas.
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/ratgeber/gas/preiserhoeung-gas-rechte" className="group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                      Preiserhöhung: Ihre Rechte
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-gray-600">
                      Was Sie bei Gaspreiserhöhungen tun können.
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
