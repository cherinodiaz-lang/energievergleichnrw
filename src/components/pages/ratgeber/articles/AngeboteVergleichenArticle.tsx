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

export default function AngeboteVergleichenArticle() {
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Wie viele Angebote sollte ich einholen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Holen Sie mindestens 3-5 Angebote ein. So können Sie Preise und Leistungen vergleichen. Mehr Angebote geben Ihnen mehr Sicherheit.'
          }
        },
        {
          '@type': 'Question',
          name: 'Worauf sollte ich beim Vergleich achten?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Vergleichen Sie: Anlagengröße, Modulqualität, Wechselrichter, Garantie, Preis und Service. Achten Sie auch auf versteckte Kosten.'
          }
        },
        {
          '@type': 'Question',
          name: 'Welche Fehler sollte ich vermeiden?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Vermeiden Sie: Nur auf den Preis achten, Garantiebedingungen ignorieren, Versteckte Kosten übersehen, Zu schnell entscheiden.'
          }
        },
        {
          '@type': 'Question',
          name: 'Ist der günstigste Anbieter immer die beste Wahl?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nein. Ein günstiger Preis ist wichtig, aber auch Qualität, Garantie und Service zählen. Das beste Angebot ist nicht immer das günstigste.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie lange sollte ich mir Zeit für die Entscheidung nehmen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nehmen Sie sich mindestens 1-2 Wochen Zeit. Lesen Sie die Angebote sorgfältig, stellen Sie Fragen und vergleichen Sie in Ruhe.'
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
        title="Solarangebote vergleichen: Fehler vermeiden | Energievergleich"
        description="Wie Sie Solarangebote richtig vergleichen und häufige Fehler vermeiden. Tipps für die beste Entscheidung."
        keywords="Solarangebote vergleichen, Photovoltaik Angebote, Solaranlage Vergleich"
        ogTitle="Solarangebote vergleichen: Fehler vermeiden"
        ogDescription="Erfahren Sie, wie Sie Solarangebote richtig vergleichen."
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
              Solarangebote vergleichen
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90">
              Häufige Fehler vermeiden und die beste Entscheidung treffen
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
                Der Vergleich von Solarangeboten ist wichtig, um die beste Anlage zum besten Preis zu finden. Erfahren Sie, worauf Sie achten sollten.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <div className="space-y-4">
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Mehrere Angebote einholen
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Holen Sie mindestens 3-5 Angebote von verschiedenen Anbietern ein. So können Sie Preise und Leistungen vergleichen. Mehr Angebote geben Ihnen mehr Sicherheit bei der Entscheidung.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Vergleichskriterien
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Anlagengröße und Leistung</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Modulqualität und Hersteller</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Wechselrichter und Zubehör</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Garantie und Gewährleistung</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Gesamtpreis und versteckte Kosten</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Häufige Fehler vermeiden
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Vermeiden Sie, nur auf den Preis zu achten. Achten Sie auch auf Qualität, Garantie und Service. Lesen Sie die Angebote sorgfältig und fragen Sie nach versteckten Kosten. Nehmen Sie sich Zeit für die Entscheidung.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Die beste Entscheidung treffen
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Das beste Angebot ist nicht immer das günstigste. Berücksichtigen Sie alle Faktoren: Preis, Qualität, Garantie, Service und Referenzen. Vertrauen Sie auf Ihr Bauchgefühl und wählen Sie einen Anbieter, dem Sie vertrauen.
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
                q: 'Wie viele Angebote sollte ich einholen?',
                a: 'Holen Sie mindestens 3-5 Angebote ein. So können Sie Preise und Leistungen vergleichen. Mehr Angebote geben Ihnen mehr Sicherheit.'
              },
              {
                q: 'Worauf sollte ich beim Vergleich achten?',
                a: 'Vergleichen Sie: Anlagengröße, Modulqualität, Wechselrichter, Garantie, Preis und Service. Achten Sie auch auf versteckte Kosten.'
              },
              {
                q: 'Welche Fehler sollte ich vermeiden?',
                a: 'Vermeiden Sie: Nur auf den Preis achten, Garantiebedingungen ignorieren, Versteckte Kosten übersehen, Zu schnell entscheiden.'
              },
              {
                q: 'Ist der günstigste Anbieter immer die beste Wahl?',
                a: 'Nein. Ein günstiger Preis ist wichtig, aber auch Qualität, Garantie und Service zählen. Das beste Angebot ist nicht immer das günstigste.'
              },
              {
                q: 'Wie lange sollte ich mir Zeit für die Entscheidung nehmen?',
                a: 'Nehmen Sie sich mindestens 1-2 Wochen Zeit. Lesen Sie die Angebote sorgfältig, stellen Sie Fragen und vergleichen Sie in Ruhe.'
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
              Nutzen Sie unsere kostenlose Beratung und erhalten Sie mehrere Angebote zum Vergleich.
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
              <Link to="/ratgeber/photovoltaik/dach-eignung-checkliste" className="group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                      Dach-Eignung prüfen
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-gray-600">
                      Ist Ihr Dach für Solaranlagen geeignet?
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
