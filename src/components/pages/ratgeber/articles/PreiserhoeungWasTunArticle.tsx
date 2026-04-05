import { useEffect } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/Header';
import DeferredFooter from '@/components/DeferredFooter';
import SEOHead from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';

export default function PreiserhoeungWasTunArticle() {
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Wann kann mein Stromanbieter die Preise erhöhen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ihr Stromanbieter kann die Preise erhöhen, wenn die Preisgarantie abläuft oder bei außergewöhnlichen Marktveränderungen. Sie müssen mindestens 6 Wochen vorher informiert werden.'
          }
        },
        {
          '@type': 'Question',
          name: 'Habe ich ein Sonderkündigungsrecht?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja, bei Preiserhöhungen haben Sie ein Sonderkündigungsrecht. Sie können mit einer Frist von 2 Wochen zum Zeitpunkt der Preiserhöhung kündigen.'
          }
        },
        {
          '@type': 'Question',
          name: 'Wie nutze ich das Sonderkündigungsrecht?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Schreiben Sie eine schriftliche Kündigung an Ihren Anbieter. Achten Sie auf die 2-Wochen-Frist ab dem Zeitpunkt der Preiserhöhung. Wechseln Sie gleichzeitig zu einem neuen Anbieter.'
          }
        },
        {
          '@type': 'Question',
          name: 'Kann ich die Preiserhöhung anfechten?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nein, Sie können die Preiserhöhung nicht anfechten. Sie haben aber das Recht zu kündigen und zu einem anderen Anbieter zu wechseln.'
          }
        },
        {
          '@type': 'Question',
          name: 'Was sollte ich nach einer Preiserhöhung tun?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nutzen Sie das Sonderkündigungsrecht und wechseln Sie zu einem günstigeren Anbieter. Vergleichen Sie die Tarife und wechseln Sie innerhalb der 2-Wochen-Frist.'
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
        title="Strompreiserhöhung: Was können Sie tun? | Energievergleich"
        description="Ihre Rechte bei Strompreiserhöhungen und wie Sie reagieren sollten. Sonderkündigungsrecht und Alternativen."
        keywords="Preiserhöhung, Strompreis, Sonderkündigung, Wechsel"
        ogTitle="Strompreiserhöhung: Was können Sie tun?"
        ogDescription="Erfahren Sie, welche Rechte Sie bei Strompreiserhöhungen haben."
      />
      <Header />

      <section className="w-full bg-primary text-primary-foreground py-20 md:py-32">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div
            className="max-w-3xl"
          >
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Strompreiserhöhung: Was können Sie tun?
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90">
              Ihre Rechte bei Strompreiserhöhungen und wie Sie am besten reagieren
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div
          >
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
              <p className="font-paragraph text-gray-700 leading-relaxed">
                Bei einer Strompreiserhöhung haben Sie ein Sonderkündigungsrecht. Sie können mit einer Frist von 2 Wochen kündigen und zu einem günstigeren Anbieter wechseln. Nutzen Sie dieses Recht, um Kosten zu sparen.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Ihre Rechte bei Preiserhöhungen
                </h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Das Gesetz schützt Sie vor überraschenden Preiserhöhungen. Ihr Stromanbieter muss Sie mindestens 6 Wochen vorher informieren. Sie haben dann ein Sonderkündigungsrecht mit einer Frist von 2 Wochen.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  So nutzen Sie das Sonderkündigungsrecht
                </h2>
                <ol className="space-y-4 list-decimal list-inside">
                  <li className="font-paragraph text-gray-700">
                    <strong>Preiserhöhung erhalten:</strong> Ihr Anbieter teilt Ihnen die Preiserhöhung schriftlich mit.
                  </li>
                  <li className="font-paragraph text-gray-700">
                    <strong>Frist beachten:</strong> Sie haben 2 Wochen ab dem Zeitpunkt der Preiserhöhung Zeit zu kündigen.
                  </li>
                  <li className="font-paragraph text-gray-700">
                    <strong>Kündigung schreiben:</strong> Schreiben Sie eine schriftliche Kündigung an Ihren Anbieter.
                  </li>
                  <li className="font-paragraph text-gray-700">
                    <strong>Neuen Anbieter wählen:</strong> Vergleichen Sie Tarife und wechseln Sie zu einem günstigeren Anbieter.
                  </li>
                </ol>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Tipps zum Sparen
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Nutzen Sie einen Vergleichsrechner, um die besten Tarife zu finden</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Achten Sie auf lange Preisgarantien (mindestens 12 Monate)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Vergleichen Sie nicht nur den Preis, sondern auch die Konditionen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-gray-700">Wechseln Sie regelmäßig, um immer den besten Tarif zu haben</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  Häufige Fragen
                </h2>
              </div>
            </div>
          </div>

          <div className="space-y-4 mt-12">
            {[
              {
                q: 'Wann kann mein Stromanbieter die Preise erhöhen?',
                a: 'Ihr Stromanbieter kann die Preise erhöhen, wenn die Preisgarantie abläuft oder bei außergewöhnlichen Marktveränderungen. Sie müssen mindestens 6 Wochen vorher informiert werden.'
              },
              {
                q: 'Habe ich ein Sonderkündigungsrecht?',
                a: 'Ja, bei Preiserhöhungen haben Sie ein Sonderkündigungsrecht. Sie können mit einer Frist von 2 Wochen zum Zeitpunkt der Preiserhöhung kündigen.'
              },
              {
                q: 'Wie nutze ich das Sonderkündigungsrecht?',
                a: 'Schreiben Sie eine schriftliche Kündigung an Ihren Anbieter. Achten Sie auf die 2-Wochen-Frist ab dem Zeitpunkt der Preiserhöhung. Wechseln Sie gleichzeitig zu einem neuen Anbieter.'
              },
              {
                q: 'Kann ich die Preiserhöhung anfechten?',
                a: 'Nein, Sie können die Preiserhöhung nicht anfechten. Sie haben aber das Recht zu kündigen und zu einem anderen Anbieter zu wechseln.'
              },
              {
                q: 'Was sollte ich nach einer Preiserhöhung tun?',
                a: 'Nutzen Sie das Sonderkündigungsrecht und wechseln Sie zu einem günstigeren Anbieter. Vergleichen Sie die Tarife und wechseln Sie innerhalb der 2-Wochen-Frist.'
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
              <Link to="/ratgeber/strom/stromanbieterwechsel-nrw" className="group">
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
              <Link to="/ratgeber/wechselwissen/kuendigungsfristen-strom-gas" className="group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
                      Kündigungsfristen bei Strom und Gas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-gray-600">
                      Erfahren Sie alles über Kündigungsfristen und Ihre Rechte.
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
