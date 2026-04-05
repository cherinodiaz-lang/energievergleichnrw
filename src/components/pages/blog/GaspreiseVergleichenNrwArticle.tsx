import { useEffect } from 'react';
import { Flame, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import DeferredFooter from '@/components/DeferredFooter';
import SEOHead from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';

export default function GaspreiseVergleichenNrwArticle() {
  useEffect(() => {
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Gaspreise vergleichen NRW – So sparst du 2026',
      description:
        'Gaspreise in NRW vergleichen und 2026 sparen: Tipps zum Gasanbieter wechseln und aktuelle Preisentwicklungen.',
      datePublished: '2026-01-01',
      dateModified: '2026-03-01',
      author: {
        '@type': 'Organization',
        name: 'energievergleich.shop',
        url: 'https://www.energievergleich.shop',
      },
      publisher: {
        '@type': 'Organization',
        name: 'energievergleich.shop',
        logo: {
          '@type': 'ImageObject',
          url: 'https://static.wixstatic.com/media/32e7c0_8cede5e338be484bb8dcaad81c053c82~mv2.png',
        },
      },
    };

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Wie hoch sind die Gaspreise in NRW 2026?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Die Gaspreise in NRW liegen 2026 je nach Anbieter zwischen 8 und 14 Cent pro kWh. Grundversorger-Kunden zahlen oft 20–30 % mehr als Kunden mit einem Sondervertrag.',
          },
        },
        {
          '@type': 'Question',
          name: 'Lohnt sich ein Gaspreisvergleich in NRW?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja, ein Gaspreisvergleich lohnt sich fast immer. Viele Haushalte in NRW zahlen noch immer den teuren Grundversorgungstarif, obwohl günstigere Alternativen verfügbar sind.',
          },
        },
        {
          '@type': 'Question',
          name: 'Wie wechsle ich meinen Gasanbieter in NRW?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tarif vergleichen, neuen Anbieter wählen und online anmelden. Der neue Anbieter kündigt den alten Vertrag für Sie. Der Wechsel dauert ca. 4–6 Wochen und ist kostenlos.',
          },
        },
        {
          '@type': 'Question',
          name: 'Ist Biogas eine gute Alternative?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Biogas ist eine klimafreundlichere Alternative zu Erdgas. Viele Biogastarife sind heute preislich vergleichbar mit konventionellen Tarifen und teilweise sogar günstiger.',
          },
        },
        {
          '@type': 'Question',
          name: 'Was kostet mich Heizen mit Gas im Jahr?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ein durchschnittlicher Haushalt verbraucht ca. 10.000–15.000 kWh Gas im Jahr. Bei einem Arbeitspreis von 10 ct/kWh wären das 1.000–1.500 Euro jährlich plus Grundpreis.',
          },
        },
      ],
    };

    const schemas = [articleSchema, faqSchema];
    schemas.forEach((schema, i) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `blog-gas-schema-${i}`;
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      schemas.forEach((_, i) => {
        const el = document.getElementById(`blog-gas-schema-${i}`);
        if (el) document.head.removeChild(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background break-words leading-mobile">
      <SEOHead
        title="Gaspreise vergleichen NRW – So sparst du 2026 | energievergleich.shop"
        description="Gaspreise in NRW vergleichen und 2026 sparen: Tipps zum Gasanbieter wechseln, aktuelle Preisentwicklungen und Spartricks fuer Haushalte in Nordrhein-Westfalen."
        keywords="Gaspreise NRW 2026, Gaspreisvergleich NRW, Gaskosten senken, Gasanbieter NRW"
        ogType="article"
        canonical="/blog/gaspreise-vergleichen-nrw"
      />
      <Header />
      <main>
        <section className="w-full py-12 md:py-20 bg-gradient-to-br from-orange-600 to-orange-500">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
            >
              <div className="flex items-center gap-2 text-white/80 text-sm mb-4">
                <Link to={ROUTES.blog} className="hover:text-white">
                  Blog
                </Link>
                <span>/</span>
                <span>Gaspreise vergleichen NRW</span>
              </div>
              <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
                Gaspreise vergleichen NRW – So sparst du 2026
              </h1>
              <p className="font-paragraph text-lg text-white/90 max-w-2xl">
                Gaspreise in NRW clever vergleichen und mit dem richtigen Tarif bares Geld sparen.
                Wir zeigen Ihnen, wie es geht.
              </p>
              <div className="flex flex-wrap gap-3 mt-6 text-sm text-white/80">
                <span>📅 Aktualisiert: März 2026</span>
                <span>⏱ 5 Min. Lesezeit</span>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
              Gaspreisniveau in NRW 2026
            </h2>
            <p className="font-paragraph text-foreground/80 mb-6">
              Die Gaspreise in Nordrhein-Westfalen haben sich in den letzten Jahren stark verändert.
              2026 gibt es wieder attraktive Tarife für Wechselwillige – vor allem Neukunden
              profitieren von günstigen Angeboten.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              {[
                { label: 'Grundversorgung', price: '~13 ct/kWh', color: 'text-red-600' },
                { label: 'Sondervertrag', price: '~10–11 ct/kWh', color: 'text-yellow-600' },
                { label: 'Neukundentarif', price: '~8–10 ct/kWh', color: 'text-green-600' },
              ].map((item) => (
                <Card key={item.label} className="text-center">
                  <CardHeader>
                    <CardTitle className="font-heading text-sm text-foreground/60">
                      {item.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`font-heading text-2xl font-bold ${item.color}`}>{item.price}</p>
                    <p className="font-paragraph text-xs text-foreground/60 mt-1">Arbeitspreis</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
              Schritt für Schritt zum günstigeren Gastarif
            </h2>
            <ol className="space-y-4 mb-8">
              {[
                {
                  step: '1.',
                  title: 'Jahresverbrauch ermitteln',
                  desc: 'Schauen Sie auf Ihre letzte Gasrechnung oder schätzen Sie den Verbrauch anhand Ihrer Wohnfläche (ca. 100 kWh/m² Wohnfläche pro Jahr).',
                },
                {
                  step: '2.',
                  title: 'Tarife vergleichen',
                  desc: 'Nutzen Sie unseren Vergleichsrechner und geben Sie Ihre PLZ und Ihren Jahresverbrauch ein.',
                },
                {
                  step: '3.',
                  title: 'Neuen Anbieter wählen',
                  desc: 'Wählen Sie ein Angebot, das zu Ihren Anforderungen passt: Laufzeit, Preisgarantie, Biogas-Option.',
                },
                {
                  step: '4.',
                  title: 'Online anmelden',
                  desc: 'Melden Sie sich beim neuen Anbieter an. Kündigung beim alten Anbieter übernimmt der neue.',
                },
                {
                  step: '5.',
                  title: 'Fertig – sparen!',
                  desc: 'Nach ca. 4–6 Wochen beliefert Sie der neue Anbieter zu günstigeren Konditionen.',
                },
              ].map((item) => (
                <li key={item.step} className="flex items-start gap-4">
                  <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">{item.title}</h3>
                    <p className="font-paragraph text-sm text-foreground/70">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="bg-orange-50 rounded-xl p-6 text-center border border-orange-200">
              <Flame className="w-12 h-12 text-orange-500 mx-auto mb-3" />
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                Jetzt Gaspreise vergleichen
              </h3>
              <p className="font-paragraph text-foreground/70 mb-4">
                Finden Sie den günstigsten Gastarif in Ihrer Region und sparen Sie dauerhaft.
              </p>
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
                <Link to={ROUTES.gasvergleich}>
                  Gasvergleich starten <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-xl font-bold text-foreground mb-4">
              Weitere Artikel
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'Strompreise NRW 2026', href: ROUTES.blogStrompreiseNrw2026 },
                {
                  title: 'Energievergleich Kosten – Tipps',
                  href: ROUTES.blogEnergievergleichKostenTipps,
                },
                {
                  title: 'Stromanbieter wechseln NRW',
                  href: ROUTES.blogStromanbieterWechselnNrw,
                },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow font-heading font-medium text-primary hover:text-primary/80"
                >
                  {link.title} →
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <DeferredFooter />
    </div>
  );
}
