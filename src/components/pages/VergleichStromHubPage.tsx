import { motion } from 'framer-motion';
import { Zap, CheckCircle, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import DeferredFooter from '@/components/DeferredFooter';
import SEOHead from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';

const STROM_LINKS = [
  {
    title: 'Stromvergleich NRW',
    href: ROUTES.stromvergleich,
    desc: 'Aktuelle Stromtarife für NRW vergleichen und günstigsten Anbieter finden.',
    icon: '⚡',
  },
  {
    title: 'Gewerbestrom NRW',
    href: ROUTES.gewerbestrom,
    desc: 'Stromtarife für Unternehmen und Gewerbebetriebe in NRW vergleichen.',
    icon: '🏭',
  },
  {
    title: 'Ökostrom NRW',
    href: ROUTES.blogOekostromNrwAnbieter,
    desc: 'Die besten Ökostromanbieter in NRW 2026 im Überblick.',
    icon: '🌿',
  },
  {
    title: 'Stromanbieter wechseln NRW',
    href: ROUTES.blogStromanbieterWechselnNrw,
    desc: 'Schritt-für-Schritt-Anleitung zum Stromanbieterwechsel in NRW.',
    icon: '🔄',
  },
  {
    title: 'Strompreise NRW 2026',
    href: ROUTES.blogStrompreiseNrw2026,
    desc: 'Aktueller Überblick über Strompreise und Trends in Nordrhein-Westfalen.',
    icon: '📊',
  },
  {
    title: 'Ratgeber Strom',
    href: ROUTES.ratgeberStrom,
    desc: 'Wissen rund um Stromtarife, Grundversorgung, Wechsel und Sparmöglichkeiten.',
    icon: '📚',
  },
];

const STROM_FAQ = [
  {
    q: 'Welcher Stromanbieter ist der günstigste in NRW?',
    a: 'Die günstigsten Stromanbieter variieren je nach Region und Verbrauch. Nutzen Sie unseren Vergleich, um für Ihre PLZ und Ihren Jahresverbrauch die günstigsten Tarife zu finden.',
  },
  {
    q: 'Wie finde ich den besten Stromtarif für mich?',
    a: 'Geben Sie Ihre Postleitzahl und Ihren Jahresverbrauch ein. Achten Sie auf Laufzeit, Preisgarantie und ob es sich um Öko- oder konventionellen Strom handelt.',
  },
  {
    q: 'Wann lohnt sich ein Stromanbieter-Wechsel in NRW?',
    a: 'Fast immer. Besonders wenn Sie noch in der Grundversorgung sind oder Ihr Vertrag ausläuft. Ein Wechsel spart oft 100–400 Euro im Jahr.',
  },
  {
    q: 'Gibt es Ökostrom-Tarife in NRW?',
    a: 'Ja. Viele NRW-Stromanbieter bieten Ökostromanbieter-Tarife an. Diese sind oft günstiger als konventionelle Tarife und fördern erneuerbare Energien.',
  },
];

export default function VergleichStromHubPage() {
  return (
    <div className="min-h-screen bg-background break-words leading-mobile">
      <SEOHead
        title="Stromvergleich NRW – Alle Angebote & Tarife 2026 | energievergleich.shop"
        description="Der vollstaendige Stromvergleich fuer NRW 2026: Alle Stromanbieter, Tarife und Sparmoelichkeiten auf einen Blick. Jetzt vergleichen und Stromkosten senken."
        keywords="Stromvergleich NRW Hub, Stromangebote NRW, alle Stromanbieter NRW, Stromtarife Uebersicht NRW 2026"
        canonical="/vergleich/strom"
      />
      <Header />
      <main>
        <section className="w-full py-16 md:py-24 bg-gradient-to-br from-primary to-primary/80">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2 text-white/80 text-sm mb-4">
                <Link to="/" className="hover:text-white">
                  Startseite
                </Link>
                <span>/</span>
                <span>Stromvergleich</span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
                Stromvergleich NRW 2026
              </h1>
              <p className="font-paragraph text-lg text-white/90 max-w-2xl mx-auto mb-8">
                Alle Stromangebote, Tarife und Ratgeber für Nordrhein-Westfalen. Finden Sie den
                günstigsten Stromanbieter für Ihren Haushalt oder Betrieb.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link to={ROUTES.stromvergleich}>
                  <Zap className="mr-2 w-5 h-5" />
                  Jetzt Strom vergleichen
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        <section className="w-full py-16">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-2 text-center">
              Alle Strom-Themen in NRW
            </h2>
            <p className="font-paragraph text-foreground/70 text-center mb-10">
              Umfassende Informationen und Vergleichstools rund um Strom in Nordrhein-Westfalen.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {STROM_LINKS.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                >
                  <Link
                    to={item.href}
                    className="block bg-white rounded-xl border hover:shadow-md transition-shadow p-6 h-full"
                  >
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="font-paragraph text-sm text-foreground/70 mb-3">{item.desc}</p>
                    <span className="inline-flex items-center gap-1 text-primary font-semibold text-sm">
                      Mehr erfahren <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary/5 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8 text-center">
              Warum Strom vergleichen in NRW?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                'Über 100 Stromanbieter in NRW im Wettbewerb',
                'Preisunterschiede von bis zu 50 % zwischen Tarifen',
                'Wechsel dauert nur 15 Minuten online',
                'Keine Versorgungsunterbrechung beim Wechsel',
                'Neue Tarife oft mit attraktiven Boni',
                'Ökostrom meist nicht teurer als konventionell',
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80">{point}</span>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button asChild size="lg">
                <Link to={ROUTES.stromvergleich}>
                  Strom vergleichen <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8">
              Häufige Fragen zum Stromvergleich NRW
            </h2>
            <div className="space-y-4">
              {STROM_FAQ.map((item) => (
                <div key={item.q} className="border rounded-xl p-5">
                  <h3 className="font-heading font-semibold text-foreground mb-2">{item.q}</h3>
                  <p className="font-paragraph text-sm text-foreground/70">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-xl font-bold text-foreground mb-4">
              Verwandte Vergleiche
            </h2>
            <div className="flex flex-wrap gap-4">
              <Link
                to={ROUTES.gasvergleich}
                className="inline-flex items-center gap-2 bg-white border rounded-lg px-4 py-2 font-heading text-sm font-medium hover:shadow-md transition-shadow"
              >
                <BookOpen className="w-4 h-4 text-primary" />
                Gasvergleich NRW
              </Link>
              <Link
                to={ROUTES.vergleichGas}
                className="inline-flex items-center gap-2 bg-white border rounded-lg px-4 py-2 font-heading text-sm font-medium hover:shadow-md transition-shadow"
              >
                <BookOpen className="w-4 h-4 text-primary" />
                Gas Hub NRW
              </Link>
              <Link
                to={ROUTES.photovoltaik}
                className="inline-flex items-center gap-2 bg-white border rounded-lg px-4 py-2 font-heading text-sm font-medium hover:shadow-md transition-shadow"
              >
                <BookOpen className="w-4 h-4 text-primary" />
                Photovoltaik NRW
              </Link>
            </div>
          </div>
        </section>
      </main>
      <DeferredFooter />
    </div>
  );
}
