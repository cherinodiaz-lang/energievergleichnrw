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

export default function MaloIdZaehlernummerArticle() {
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Was ist eine MALO-ID?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Die MALO-ID ist eine 33-stellige Identifikationsnummer für Ihren Stromzähler. Sie wird vom Messstellenbetreiber vergeben und ist eindeutig für Ihre Adresse.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wo finde ich meine MALO-ID?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sie finden die MALO-ID auf Ihrer Stromrechnung, im Schreiben des Messstellenbetreibers oder auf dem Stromzähler selbst. Sie ist auch als "Zählernummer" bekannt.'
          }
        },
        {
          '@type': 'Question',
          name: 'Warum brauche ich die MALO-ID beim Stromwechsel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Der neue Stromanbieter benötigt die MALO-ID, um Sie eindeutig zu identifizieren und den Wechsel durchzuführen. Ohne MALO-ID kann der Wechsel nicht abgeschlossen werden.'
          }
        },
        {
          '@type': 'Question',
          name: 'Ist die MALO-ID dasselbe wie die Zählernummer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nein, aber beide Nummern werden oft verwendet. Die MALO-ID ist die 33-stellige Identifikationsnummer, die Zählernummer ist kürzer. Beide finden Sie auf Ihrer Rechnung.'
          }
        },
        {
          '@type': 'Question',
          name: 'Kann ich meinen Stromwechsel ohne MALO-ID durchführen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Technisch ist es möglich, aber es wird kompliziert. Der neue Anbieter kann Sie ohne MALO-ID schwerer identifizieren. Geben Sie die MALO-ID an, um Verzögerungen zu vermeiden.'
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
        title="MALO-ID und Zählernummer erklärt | Energievergleich"
        description="Was sind MALO-ID und Zählernummer? Warum brauchen Sie diese beim Stromwechsel und wo finden Sie sie?"
        keywords="MALO-ID, Zählernummer, Stromwechsel, Identifikation"
        ogTitle="MALO-ID und Zählernummer erklärt"
        ogDescription="Verstehen Sie MALO-ID und Zählernummer beim Stromwechsel."
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
              MALO-ID und Zählernummer erklärt
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90">
              Verstehen Sie diese wichtigen Nummern beim Stromwechsel
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
                Die MALO-ID und Zählernummer sind wichtige Identifikationsnummern für Ihren Stromzähler. Sie benötigen diese Nummern beim Stromwechsel. Wir zeigen Ihnen, wo Sie diese finden.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Was ist die MALO-ID?
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Die MALO-ID ist eine 33-stellige Identifikationsnummer für Ihren Stromzähler. Sie wird vom Messstellenbetreiber vergeben und ist eindeutig für Ihre Adresse. MALO steht für "Marktlokation".
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Was ist die Zählernummer?
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Die Zählernummer ist eine kürzere Nummer, die auf Ihrem Stromzähler eingraviert ist. Sie ist ebenfalls eindeutig für Ihren Zähler. Beide Nummern werden beim Stromwechsel verwendet.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Wo finde ich diese Nummern?
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700"><strong>Stromrechnung:</strong> MALO-ID und Zählernummer sind auf Ihrer Rechnung aufgeführt</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700"><strong>Stromzähler:</strong> Die Zählernummer ist auf dem Zähler eingraviert</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700"><strong>Messstellenbetreiber:</strong> Der Messstellenbetreiber kann Ihnen die MALO-ID mitteilen</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Warum brauche ich diese Nummern beim Stromwechsel?
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Der neue Stromanbieter benötigt die MALO-ID und Zählernummer, um Sie eindeutig zu identifizieren. Mit diesen Nummern kann der Wechsel schnell und sicher durchgeführt werden. Ohne diese Nummern kann es zu Verzögerungen kommen.
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
                q: 'Was ist eine MALO-ID?',
                a: 'Die MALO-ID ist eine 33-stellige Identifikationsnummer für Ihren Stromzähler. Sie wird vom Messstellenbetreiber vergeben und ist eindeutig für Ihre Adresse.'
              },
              {
                q: 'Wo finde ich meine MALO-ID?',
                a: 'Sie finden die MALO-ID auf Ihrer Stromrechnung, im Schreiben des Messstellenbetreibers oder auf dem Stromzähler selbst. Sie ist auch als "Zählernummer" bekannt.'
              },
              {
                q: 'Warum brauche ich die MALO-ID beim Stromwechsel?',
                a: 'Der neue Stromanbieter benötigt die MALO-ID, um Sie eindeutig zu identifizieren und den Wechsel durchzuführen. Ohne MALO-ID kann der Wechsel nicht abgeschlossen werden.'
              },
              {
                q: 'Ist die MALO-ID dasselbe wie die Zählernummer?',
                a: 'Nein, aber beide Nummern werden oft verwendet. Die MALO-ID ist die 33-stellige Identifikationsnummer, die Zählernummer ist kürzer. Beide finden Sie auf Ihrer Rechnung.'
              },
              {
                q: 'Kann ich meinen Stromwechsel ohne MALO-ID durchführen?',
                a: 'Technisch ist es möglich, aber es wird kompliziert. Der neue Anbieter kann Sie ohne MALO-ID schwerer identifizieren. Geben Sie die MALO-ID an, um Verzögerungen zu vermeiden.'
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
              <Link to="/ratgeber/strom/umzug-stromvertrag" className="group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                      Stromvertrag beim Umzug
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-gray-600">
                      Was Sie beim Umzug beachten müssen.
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
