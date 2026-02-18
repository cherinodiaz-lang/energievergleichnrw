import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import AuthorBox from '@/components/AuthorBox';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';

export default function StromGrundversorgungArticle() {
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Was ist Stromgrundversorgung?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Die Stromgrundversorgung ist ein gesetzlich geregeltes Angebot des Stromanbieters in Ihrer Region. Sie müssen automatisch in die Grundversorgung aufgenommen werden, wenn Sie keinen anderen Stromvertrag haben. Die Grundversorgung bietet Sicherheit, ist aber meist teurer als alternative Tarife.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wer ist mein Grundversorger?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ihr Grundversorger ist der Stromanbieter mit den meisten Kunden in Ihrer Region. In NRW sind das meist große Energieunternehmen wie Stadtwerke oder nationale Versorger. Sie können Ihren Grundversorger auf der Website Ihres Netzbetreibers oder durch Ihre aktuelle Stromrechnung ermitteln.'
          }
        },
        {
          '@type': 'Question',
          name: 'Kann ich aus der Grundversorgung wechseln?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja, Sie können jederzeit aus der Grundversorgung wechseln. Die Kündigungsfrist beträgt 2 Wochen zum Ende eines Kalendermonats. Ein Wechsel ist kostenlos und Ihre Stromversorgung wird nicht unterbrochen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Ist die Grundversorgung teuer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja, die Grundversorgung ist in der Regel 10-30% teurer als alternative Tarife. Das liegt daran, dass der Grundversorger keine Rabatte gewährt und die Preise regelmäßig angepasst werden. Ein Wechsel zu einem anderen Anbieter kann Ihnen erhebliche Einsparungen bringen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Was passiert, wenn mein Vertrag endet?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Wenn Ihr Stromvertrag endet und Sie keinen neuen abgeschlossen haben, fallen Sie automatisch in die Grundversorgung zurück. Deshalb ist es wichtig, rechtzeitig einen neuen Vertrag abzuschließen oder zu wechseln.'
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
        title="Stromgrundversorgung: Was Sie wissen müssen | Ratgeber"
        description="Alles über Stromgrundversorgung: Wie sie funktioniert, wer Ihr Grundversorger ist und wie Sie Geld sparen durch einen Wechsel."
        keywords="Stromgrundversorgung, Grundversorger, Stromwechsel, Grundversorgungstarif"
        ogTitle="Stromgrundversorgung erklärt"
        ogDescription="Verstehen Sie die Grundversorgung und sparen Sie Stromkosten"
      />
      <Header />

      {/* Article Header */}
      <section className="w-full bg-gradient-to-br from-blue-50 to-blue-100 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Ratgeber Strom</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4 leading-tight">
              Stromgrundversorgung: Was Sie wissen müssen
            </h1>
            <p className="font-paragraph text-lg text-gray-600">
              Veröffentlicht: 9. Januar 2026 | Lesezeit: 8 Minuten
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="prose prose-lg max-w-none"
          >
            {/* Kurzantwort */}
            <div className="bg-blue-50 border-l-4 border-l-blue-600 p-6 rounded-r-lg mb-8">
              <h2 className="font-heading text-xl font-bold text-primary mb-3">Kurzantwort</h2>
              <p className="font-paragraph text-gray-700 mb-2">
                Die Stromgrundversorgung ist ein gesetzlich geregeltes Angebot des Stromanbieters in Ihrer Region. Sie bietet Sicherheit, ist aber meist 10-30% teurer als alternative Tarife. Sie können jederzeit mit 2 Wochen Kündigungsfrist wechseln und durch einen Anbieterwechsel erheblich sparen.
              </p>
            </div>

            {/* Article Content */}
            <h2 className="font-heading text-3xl font-bold text-primary mt-8 mb-4">
              Was ist Stromgrundversorgung?
            </h2>
            <p className="font-paragraph text-gray-700 mb-4">
              Die Stromgrundversorgung ist ein gesetzlich geregeltes Angebot des Stromanbieters mit den meisten Kunden in Ihrer Region. Wenn Sie keinen anderen Stromvertrag haben oder dieser endet, werden Sie automatisch in die Grundversorgung aufgenommen. Dies ist eine Sicherheitsmaßnahme, um sicherzustellen, dass jeder Haushalt mit Strom versorgt wird.
            </p>
            <p className="font-paragraph text-gray-700 mb-4">
              Die Grundversorgung ist transparent und fair, aber nicht unbedingt günstig. Der Grundversorger muss seine Preise öffentlich machen und kann nicht diskriminieren. Allerdings bietet er in der Regel keine Rabatte oder Boni wie andere Anbieter.
            </p>

            <h2 className="font-heading text-3xl font-bold text-primary mt-8 mb-4">
              Wer ist mein Grundversorger?
            </h2>
            <p className="font-paragraph text-gray-700 mb-4">
              Ihr Grundversorger ist der Stromanbieter mit den meisten Kunden in Ihrer Region. In NRW sind das meist große Energieunternehmen wie Stadtwerke oder nationale Versorger. Um Ihren Grundversorger zu ermitteln, können Sie:
            </p>
            <ul className="font-paragraph text-gray-700 mb-4 space-y-2">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Ihre aktuelle Stromrechnung überprüfen</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Die Website Ihres Netzbetreibers besuchen</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Die Bundesnetzagentur-Website nutzen</span>
              </li>
            </ul>

            <h2 className="font-heading text-3xl font-bold text-primary mt-8 mb-4">
              Kosten der Grundversorgung
            </h2>
            <p className="font-paragraph text-gray-700 mb-4">
              Die Grundversorgung ist in der Regel 10-30% teurer als alternative Tarife. Ein 3-Personen-Haushalt mit 3.500 kWh Jahresverbrauch zahlt in der Grundversorgung oft 1.200-1.400 Euro pro Jahr, während alternative Tarife 900-1.100 Euro kosten können.
            </p>
            <p className="font-paragraph text-gray-700 mb-4">
              Die Preise in der Grundversorgung werden regelmäßig angepasst und können schnell steigen. Deshalb ist es wichtig, regelmäßig zu überprüfen, ob ein Wechsel sinnvoll ist.
            </p>

            <h2 className="font-heading text-3xl font-bold text-primary mt-8 mb-4">
              Wie wechsle ich aus der Grundversorgung?
            </h2>
            <p className="font-paragraph text-gray-700 mb-4">
              Ein Wechsel aus der Grundversorgung ist einfach und kostenlos. Die Kündigungsfrist beträgt 2 Wochen zum Ende eines Kalendermonats. Sie können:
            </p>
            <ol className="font-paragraph text-gray-700 mb-4 space-y-2 list-decimal list-inside">
              <li>Einen neuen Stromtarif bei unserem Vergleichsrechner auswählen</li>
              <li>Den Wechsel online abschließen</li>
              <li>Wir kümmern uns um die Kündigung bei Ihrem Grundversorger</li>
              <li>Nach 4-6 Wochen wird der neue Anbieter aktiv</li>
            </ol>

            <h2 className="font-heading text-3xl font-bold text-primary mt-8 mb-4">
              Wichtige Punkte zusammengefasst
            </h2>
            <div className="bg-green-50 border-l-4 border-l-green-600 p-6 rounded-r-lg mb-8">
              <ul className="font-paragraph text-gray-700 space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Grundversorgung ist teuer, aber sicher</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Kündigungsfrist: 2 Wochen zum Monatsende</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Wechsel ist kostenlos und sicher</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Sparpotenzial: 200-400 Euro pro Jahr</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-3xl font-bold text-primary mb-8">Häufig gestellte Fragen</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Was ist Stromgrundversorgung?',
                a: 'Die Stromgrundversorgung ist ein gesetzlich geregeltes Angebot des Stromanbieters in Ihrer Region. Sie müssen automatisch in die Grundversorgung aufgenommen werden, wenn Sie keinen anderen Stromvertrag haben. Die Grundversorgung bietet Sicherheit, ist aber meist teurer als alternative Tarife.'
              },
              {
                q: 'Wer ist mein Grundversorger?',
                a: 'Ihr Grundversorger ist der Stromanbieter mit den meisten Kunden in Ihrer Region. In NRW sind das meist große Energieunternehmen wie Stadtwerke oder nationale Versorger. Sie können Ihren Grundversorger auf der Website Ihres Netzbetreibers oder durch Ihre aktuelle Stromrechnung ermitteln.'
              },
              {
                q: 'Kann ich aus der Grundversorgung wechseln?',
                a: 'Ja, Sie können jederzeit aus der Grundversorgung wechseln. Die Kündigungsfrist beträgt 2 Wochen zum Ende eines Kalendermonats. Ein Wechsel ist kostenlos und Ihre Stromversorgung wird nicht unterbrochen.'
              },
              {
                q: 'Ist die Grundversorgung teuer?',
                a: 'Ja, die Grundversorgung ist in der Regel 10-30% teurer als alternative Tarife. Das liegt daran, dass der Grundversorger keine Rabatte gewährt und die Preise regelmäßig angepasst werden. Ein Wechsel zu einem anderen Anbieter kann Ihnen erhebliche Einsparungen bringen.'
              },
              {
                q: 'Was passiert, wenn mein Vertrag endet?',
                a: 'Wenn Ihr Stromvertrag endet und Sie keinen neuen abgeschlossen haben, fallen Sie automatisch in die Grundversorgung zurück. Deshalb ist es wichtig, rechtzeitig einen neuen Vertrag abzuschließen oder zu wechseln.'
              }
            ].map((item, index) => (
              <Accordion key={index} type="single" collapsible className="bg-white rounded-lg border">
                <AccordionItem value={`item-${index}`} className="border-none">
                  <AccordionTrigger className="font-heading font-bold text-lg hover:text-primary px-6 py-4">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-paragraph text-gray-600 px-6 pb-4">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links Section */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-2xl font-bold text-primary mb-8">Verwandte Artikel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link to="/ratgeber/strom/preisgarantie" className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                    Preisgarantie bei Stromtarifen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600">
                    Wie lange sind Sie vor Preiserhöhungen geschützt?
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/ratgeber/strom/laufzeit-kündigung" className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                    Laufzeit und Kündigung
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600">
                    Wie lange sind Sie an einen Vertrag gebunden?
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="w-full py-12 md:py-16 bg-blue-50 border-t">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <Card className="border-none bg-white shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardTitle className="font-heading text-2xl">Bereit zum Stromwechsel?</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <p className="font-paragraph text-gray-700 mb-6">
                Nutzen Sie unseren kostenlosen Vergleichsrechner und finden Sie den besten Stromtarif für Ihre Situation. Sparen Sie bis zu 400 Euro pro Jahr!
              </p>
              <Link to={ROUTES.stromvergleich}>
                <Button className="bg-primary text-white hover:bg-primary/90 h-12 px-8 font-bold">
                  Jetzt Stromtarife vergleichen
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Author Box */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <AuthorBox authorName="Peter Kohmann" updatedDate={new Date()} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
