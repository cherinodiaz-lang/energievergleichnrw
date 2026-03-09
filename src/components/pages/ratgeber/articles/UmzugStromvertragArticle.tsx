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

export default function UmzugStromvertragArticle() {
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Was passiert mit meinem Stromvertrag beim Umzug?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sie können Ihren Stromvertrag beim Umzug kündigen. Die Kündigungsfrist beträgt 4 Wochen zum Ende eines Kalendermonats. Sie müssen den Umzug dem Anbieter mitteilen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Kann ich meinen Vertrag mitnehmen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nein, Stromverträge sind an den Wohnort gebunden. Sie müssen einen neuen Vertrag für die neue Adresse abschließen. Dies ist eine gute Gelegenheit, zu einem günstigeren Anbieter zu wechseln.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie lange dauert die Anmeldung beim neuen Anbieter?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Die Anmeldung dauert etwa 2-4 Wochen. Der neue Anbieter kümmert sich um die Abmeldung beim alten Anbieter. Ihre Stromversorgung wird nicht unterbrochen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Kann ich beim Umzug sparen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja, beim Umzug können Sie zu einem günstigeren Anbieter wechseln. Nutzen Sie die Gelegenheit und vergleichen Sie die Tarife in Ihrer neuen Region.'
          }
        },
        {
          '@type': 'Question',
          name: 'Was brauche ich für die Anmeldung?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sie benötigen Ihre neue Adresse, Ihre Zählernummer und den geschätzten Jahresverbrauch. Diese Informationen finden Sie auf Ihrer letzten Stromrechnung.'
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
        title="Stromvertrag beim Umzug | Energievergleich"
        description="Was passiert mit Ihrem Stromvertrag beim Umzug? Kündigungsfristen, Neukunden-Angebote und wichtige Tipps."
        keywords="Umzug, Stromvertrag, Kündigung, Neuer Anbieter"
        ogTitle="Stromvertrag beim Umzug"
        ogDescription="Alles Wichtige zum Stromvertrag beim Umzug."
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
              Stromvertrag beim Umzug
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90">
              Was Sie beachten müssen und wie Sie sparen können
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
                Beim Umzug können Sie Ihren Stromvertrag kündigen und zu einem neuen Anbieter wechseln. Dies ist eine gute Gelegenheit, Kosten zu sparen. Wir zeigen Ihnen, worauf Sie achten müssen.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Kündigungsfristen beim Umzug
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Sie können Ihren Stromvertrag beim Umzug mit einer Frist von 4 Wochen zum Ende eines Kalendermonats kündigen. Dies gilt auch für Verträge mit längerer Laufzeit. Sie müssen den Umzug dem Anbieter mitteilen.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Checkliste für den Umzug
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Teilen Sie Ihrem Anbieter den Umzugstermin mit</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Kündigen Sie rechtzeitig (4 Wochen vorher)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Vergleichen Sie Tarife in Ihrer neuen Region</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Melden Sie sich beim neuen Anbieter an</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Geben Sie Zählerstände an beiden Adressen an</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Sparpotenzial beim Umzug
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Beim Umzug können Sie oft zu einem günstigeren Anbieter wechseln. Nutzen Sie die Gelegenheit und vergleichen Sie die Tarife in Ihrer neuen Region. Mit Neukunden-Angeboten können Sie zusätzlich sparen.
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
                q: 'Was passiert mit meinem Stromvertrag beim Umzug?',
                a: 'Sie können Ihren Stromvertrag beim Umzug kündigen. Die Kündigungsfrist beträgt 4 Wochen zum Ende eines Kalendermonats. Sie müssen den Umzug dem Anbieter mitteilen.'
              },
              {
                q: 'Kann ich meinen Vertrag mitnehmen?',
                a: 'Nein, Stromverträge sind an den Wohnort gebunden. Sie müssen einen neuen Vertrag für die neue Adresse abschließen. Dies ist eine gute Gelegenheit, zu einem günstigeren Anbieter zu wechseln.'
              },
              {
                q: 'Wie lange dauert die Anmeldung beim neuen Anbieter?',
                a: 'Die Anmeldung dauert etwa 2-4 Wochen. Der neue Anbieter kümmert sich um die Abmeldung beim alten Anbieter. Ihre Stromversorgung wird nicht unterbrochen.'
              },
              {
                q: 'Kann ich beim Umzug sparen?',
                a: 'Ja, beim Umzug können Sie zu einem günstigeren Anbieter wechseln. Nutzen Sie die Gelegenheit und vergleichen Sie die Tarife in Ihrer neuen Region.'
              },
              {
                q: 'Was brauche ich für die Anmeldung?',
                a: 'Sie benötigen Ihre neue Adresse, Ihre Zählernummer und den geschätzten Jahresverbrauch. Diese Informationen finden Sie auf Ihrer letzten Stromrechnung.'
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

          <div className="border-t pt-12">
            <h3 className="font-heading text-2xl font-bold text-primary mb-6">
              Verwandte Artikel
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link to="/ratgeber/strom/stromanbieter-wechseln-nrw" className="group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                      Stromanbieter wechseln in NRW
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-gray-600">
                      Schritt-für-Schritt Anleitung zum Stromanbieterwechsel.
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/ratgeber/strom/malo-id-zaehlernummer" className="group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                      MALO-ID und Zählernummer erklärt
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-gray-600">
                      Verstehen Sie MALO-ID und Zählernummer.
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
