import { useEffect } from 'react';
import { Leaf, CheckCircle, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import DeferredFooter from '@/components/DeferredFooter';
import SEOHead from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';

export default function OekostromNrwAnbieterArticle() {
  useEffect(() => {
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Oekostrom NRW – Die besten Anbieter 2026',
      description:
        'Die besten Oekostromanbieter in NRW 2026: Vergleich, Preise und Empfehlungen fuer klimafreundlichen Strom.',
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
          name: 'Was ist Oekostrom?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Oekostrom ist Strom, der aus erneuerbaren Energiequellen wie Wind, Sonne, Wasser oder Biomasse gewonnen wird. Er verursacht im Betrieb keine CO2-Emissionen und schont das Klima.',
          },
        },
        {
          '@type': 'Question',
          name: 'Ist Oekostrom teurer als normaler Strom?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nicht mehr unbedingt. Inzwischen gibt es viele Oekostrom-Tarife, die genauso guenstig oder sogar billiger als konventionelle Tarife sind. Ein Preisvergleich lohnt sich.',
          },
        },
        {
          '@type': 'Question',
          name: 'Worauf sollte ich bei Oekostrom achten?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Achten Sie auf Zertifizierungen wie ok-power oder Gruener Strom Label. Diese garantieren echten Oekostrom und foerdern den Ausbau erneuerbarer Energien.',
          },
        },
        {
          '@type': 'Question',
          name: 'Wie wechsle ich zu Oekostrom?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Genau wie bei einem normalen Stromanbieter. Tarif auswaehlen, online anmelden, fertig. Den Wechselprozess uebernimmt der neue Anbieter.',
          },
        },
        {
          '@type': 'Question',
          name: 'Gibt es guenstigen Oekostrom in NRW?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja. Viele Oekostromanbieter sind wettbewerbsfaehig und bieten guenstige Tarife fuer NRW. Nutzen Sie unseren Vergleich, um die besten Angebote zu finden.',
          },
        },
      ],
    };

    const schemas = [articleSchema, faqSchema];
    schemas.forEach((schema, i) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `blog-oekostrom-schema-${i}`;
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      schemas.forEach((_, i) => {
        const el = document.getElementById(`blog-oekostrom-schema-${i}`);
        if (el) document.head.removeChild(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background break-words leading-mobile">
      <SEOHead
        title="Oekostrom NRW – Die besten Anbieter 2026 | energievergleich.shop"
        description="Die besten Oekostromanbieter in NRW 2026: Vergleich, Preise und Empfehlungen fuer klimafreundlichen Strom aus erneuerbaren Energien in Nordrhein-Westfalen."
        keywords="Oekostrom NRW 2026, Oekostrom Anbieter NRW, Gruener Strom NRW, Erneuerbarer Strom NRW"
        ogType="article"
        canonical="/blog/oekostrom-nrw-anbieter"
      />
      <Header />
      <main>
        <section className="w-full py-12 md:py-20 bg-gradient-to-br from-emerald-700 to-green-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
            >
              <div className="flex items-center gap-2 text-white/80 text-sm mb-4">
                <Link to={ROUTES.blog} className="hover:text-white">
                  Blog
                </Link>
                <span>/</span>
                <span>Ökostrom NRW Anbieter</span>
              </div>
              <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
                Ökostrom NRW – Die besten Anbieter 2026
              </h1>
              <p className="font-paragraph text-lg text-white/90 max-w-2xl">
                Klimafreundlich Strom beziehen und dabei sparen: Die besten Ökostromanbieter für
                Haushalte in Nordrhein-Westfalen.
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
              Warum Ökostrom in NRW?
            </h2>
            <p className="font-paragraph text-foreground/80 mb-6">
              NRW war lange für Kohle bekannt – heute boomt die Windkraft und Solarenergie. Immer
              mehr Verbraucher wechseln zu Ökostromtarifen, ohne mehr zu zahlen. Das Angebot ist
              größer und günstiger denn je.
            </p>

            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
              Worauf beim Ökostrom achten?
            </h2>
            <ul className="space-y-3 mb-8">
              {[
                'Zertifizierungen: ok-power oder Grüner Strom Label für echten Ökostrom',
                'Direkte Investitionen in neue Erneuerbare-Energien-Anlagen',
                'Transparente Herkunftsnachweise (HKN)',
                'Faire Vertragsbedingungen: Keine versteckten Preiserhöhungen',
                'Preisgarantie: Schutz vor Preisschwankungen',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 font-paragraph text-foreground/80">
                  <Leaf className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
              Typen von Ökostromprodukten
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                {
                  title: 'Windstrom',
                  icon: '💨',
                  desc: 'Strom aus Windenergieanlagen – in NRW besonders häufig.',
                  rating: 5,
                },
                {
                  title: 'Solarstrom',
                  icon: '☀️',
                  desc: 'Strom aus Photovoltaikanlagen – ideal mit eigenem Balkonkraftwerk.',
                  rating: 5,
                },
                {
                  title: 'Wasserkraft',
                  icon: '💧',
                  desc: 'Klimafreundlich und konstant verfügbar – gute Ergänzung zum Mix.',
                  rating: 4,
                },
              ].map((item) => (
                <Card key={item.title}>
                  <CardHeader>
                    <div className="text-3xl mb-1">{item.icon}</div>
                    <CardTitle className="font-heading text-base">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-foreground/70 mb-2">{item.desc}</p>
                    <div className="flex gap-1">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
              Ökostrom-Tarife in NRW vergleichen
            </h2>
            <p className="font-paragraph text-foreground/80 mb-6">
              Mit unserem Vergleichsrechner finden Sie die günstigsten Ökostromanbieter in Ihrer
              Region. Geben Sie einfach Ihre Postleitzahl und Ihren Jahresverbrauch ein und filtern
              Sie nach Ökostrom.
            </p>

            <div className="space-y-3 mb-8">
              {[
                'Viele Ökostromanbieter sind heute günstiger als konventionelle Tarife',
                'Kurze Laufzeiten von 12 Monaten sind üblich',
                'Oft gibt es attraktive Neukundenboni',
                'Preisgarantien für mindestens 12 Monate schützen vor Erhöhungen',
              ].map((point) => (
                <div key={point} className="flex items-start gap-3 font-paragraph text-foreground/80">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="bg-green-50 rounded-xl p-6 text-center border border-green-200">
              <Leaf className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                Jetzt Ökostromanbieter vergleichen
              </h3>
              <p className="font-paragraph text-foreground/70 mb-4">
                Klimafreundlich und günstig – finden Sie den besten Ökostromanbieter in NRW.
              </p>
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <Link to={ROUTES.stromvergleich}>
                  Ökostrom vergleichen <ArrowRight className="ml-2 w-4 h-4" />
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
                  title: 'Stromanbieter wechseln NRW',
                  href: ROUTES.blogStromanbieterWechselnNrw,
                },
                {
                  title: 'Energievergleich Kosten – Tipps',
                  href: ROUTES.blogEnergievergleichKostenTipps,
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
