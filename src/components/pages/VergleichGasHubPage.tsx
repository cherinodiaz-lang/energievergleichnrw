import { Flame, CheckCircle, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import DeferredFooter from '@/components/DeferredFooter';
import SEOHead from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';

const GAS_LINKS = [
  {
    title: 'Gasvergleich NRW',
    href: ROUTES.gasvergleich,
    desc: 'Aktuelle Gastarife für NRW vergleichen und günstigsten Anbieter finden.',
    icon: '🔥',
  },
  {
    title: 'Gewerbegas NRW',
    href: ROUTES.gewerbegas,
    desc: 'Gastarife für Unternehmen und Gewerbebetriebe in NRW vergleichen.',
    icon: '🏭',
  },
  {
    title: 'Gaspreise vergleichen NRW',
    href: ROUTES.blogGaspreiseVergleichenNrw,
    desc: 'Aktuelle Gaspreisentwicklungen und Spartipps für NRW-Haushalte 2026.',
    icon: '📊',
  },
  {
    title: 'Gasanbieter wechseln NRW',
    href: '/ratgeber/gas/gasanbieter-wechseln-nrw',
    desc: 'Schritt-für-Schritt-Anleitung zum Gasanbieterwechsel in NRW.',
    icon: '🔄',
  },
  {
    title: 'Energievergleich Kosten Tipps',
    href: ROUTES.blogEnergievergleichKostenTipps,
    desc: 'Praktische Tipps zur Senkung Ihrer Energiekosten als Haushalt.',
    icon: '💡',
  },
  {
    title: 'Ratgeber Gas',
    href: ROUTES.ratgeberGas,
    desc: 'Wissen rund um Gastarife, Grundversorgung, Wechsel und Sparmöglichkeiten.',
    icon: '📚',
  },
];

const GAS_FAQ = [
  {
    q: 'Welcher Gasanbieter ist der günstigste in NRW?',
    a: 'Die günstigsten Gasanbieter variieren je nach Region und Verbrauch. Nutzen Sie unseren Vergleich, um für Ihre PLZ und Ihren Jahresverbrauch die günstigsten Tarife zu finden.',
  },
  {
    q: 'Wie finde ich den besten Gastarif für mich?',
    a: 'Geben Sie Ihre Postleitzahl und Ihren Jahresverbrauch ein. Achten Sie auf Laufzeit, Preisgarantie und ob es sich um konventionelles Erdgas oder Biogas handelt.',
  },
  {
    q: 'Wann lohnt sich ein Gasanbieter-Wechsel in NRW?',
    a: 'Fast immer. Besonders wenn Sie noch in der Grundversorgung sind oder Ihr Vertrag ausläuft. Ein Wechsel spart oft 100–300 Euro im Jahr.',
  },
  {
    q: 'Gibt es Biogas-Tarife in NRW?',
    a: 'Ja. Viele NRW-Gasanbieter bieten Biogas-Tarife an. Diese sind oft nicht teurer als konventionelle Tarife und sind klimafreundlicher.',
  },
];

export default function VergleichGasHubPage() {
  return (
    <div className="min-h-screen bg-background break-words leading-mobile">
      <SEOHead
        title="Gasvergleich NRW – Alle Angebote & Tarife 2026 | energievergleich.shop"
        description="Der vollstaendige Gasvergleich fuer NRW 2026: Alle Gasanbieter, Tarife und Sparmoelichkeiten auf einen Blick. Jetzt vergleichen und Gaskosten senken."
        keywords="Gasvergleich NRW Hub, Gasangebote NRW, alle Gasanbieter NRW, Gastarife Uebersicht NRW 2026"
        canonical="/vergleich/gas"
      />
      <Header />
      <main>
        <section className="w-full py-16 md:py-24 bg-gradient-to-br from-orange-600 to-orange-500">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2 text-white/80 text-sm mb-4">
                <Link to="/" className="hover:text-white">
                  Startseite
                </Link>
                <span>/</span>
                <span>Gasvergleich</span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
                Gasvergleich NRW 2026
              </h1>
              <p className="font-paragraph text-lg text-white/90 max-w-2xl mx-auto mb-8">
                Alle Gasangebote, Tarife und Ratgeber für Nordrhein-Westfalen. Finden Sie den
                günstigsten Gasanbieter für Ihren Haushalt oder Betrieb.
              </p>
              <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-white/90">
                <Link to={ROUTES.gasvergleich}>
                  <Flame className="mr-2 w-5 h-5" />
                  Jetzt Gas vergleichen
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-16">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-2 text-center">
              Alle Gas-Themen in NRW
            </h2>
            <p className="font-paragraph text-foreground/70 text-center mb-10">
              Umfassende Informationen und Vergleichstools rund um Gas in Nordrhein-Westfalen.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {GAS_LINKS.map((item, index) => (
                <div
                  key={item.href}
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
                    <span className="inline-flex items-center gap-1 text-orange-500 font-semibold text-sm">
                      Mehr erfahren <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-orange-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8 text-center">
              Warum Gas vergleichen in NRW?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                'Viele Gasanbieter im Wettbewerb in NRW',
                'Grundversorgung oft 20–30 % teurer als Alternativtarife',
                'Wechsel dauert nur wenige Minuten online',
                'Keine Versorgungsunterbrechung beim Wechsel',
                'Biogas-Tarife oft zum gleichen Preis verfügbar',
                'Preisgarantien schützen vor Preiserhöhungen',
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-foreground/80">{point}</span>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
                <Link to={ROUTES.gasvergleich}>
                  Gas vergleichen <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8">
              Häufige Fragen zum Gasvergleich NRW
            </h2>
            <div className="space-y-4">
              {GAS_FAQ.map((item) => (
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
                to={ROUTES.stromvergleich}
                className="inline-flex items-center gap-2 bg-white border rounded-lg px-4 py-2 font-heading text-sm font-medium hover:shadow-md transition-shadow"
              >
                <BookOpen className="w-4 h-4 text-primary" />
                Stromvergleich NRW
              </Link>
              <Link
                to={ROUTES.vergleichStrom}
                className="inline-flex items-center gap-2 bg-white border rounded-lg px-4 py-2 font-heading text-sm font-medium hover:shadow-md transition-shadow"
              >
                <BookOpen className="w-4 h-4 text-primary" />
                Strom Hub NRW
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
