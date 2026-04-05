import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import DeferredFooter from '@/components/DeferredFooter';
import SEOHead from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';

const BLOG_ARTICLES = [
  {
    slug: ROUTES.blogStrompreiseNrw2026,
    title: 'Strompreise NRW 2026 – Aktueller Überblick',
    excerpt:
      'Wie entwickeln sich die Strompreise in NRW? Aktueller Überblick mit Trends und konkreten Spartipps für Haushalte.',
    category: 'Strom',
    readingTime: 6,
    date: 'März 2026',
    icon: '⚡',
  },
  {
    slug: ROUTES.blogGaspreiseVergleichenNrw,
    title: 'Gaspreise vergleichen NRW – So sparst du 2026',
    excerpt:
      'Gaspreise in NRW clever vergleichen. Wir erklären die aktuellen Gastarife und zeigen, wie Sie bares Geld sparen.',
    category: 'Gas',
    readingTime: 5,
    date: 'März 2026',
    icon: '🔥',
  },
  {
    slug: ROUTES.blogEnergievergleichKostenTipps,
    title: 'Energievergleich Kosten – Tipps für Haushalte',
    excerpt:
      'Praxisnah und übersichtlich: So optimieren Sie Ihre Energiekosten als Haushalt in NRW 2026.',
    category: 'Sparen',
    readingTime: 7,
    date: 'März 2026',
    icon: '💡',
  },
  {
    slug: ROUTES.blogStromanbieterWechselnNrw,
    title: 'Stromanbieter wechseln NRW – Schritt für Schritt',
    excerpt:
      'Schritt-für-Schritt-Anleitung: So wechseln Sie Ihren Stromanbieter in NRW einfach und sicher.',
    category: 'Strom',
    readingTime: 6,
    date: 'März 2026',
    icon: '🔄',
  },
  {
    slug: ROUTES.blogOekostromNrwAnbieter,
    title: 'Ökostrom NRW – Die besten Anbieter 2026',
    excerpt:
      'Klimafreundlich und günstig: Die besten Ökostromanbieter für NRW-Haushalte im Überblick.',
    category: 'Ökostrom',
    readingTime: 5,
    date: 'März 2026',
    icon: '🌿',
  },
];

export default function BlogHubPage() {
  return (
    <div className="min-h-screen bg-background break-words leading-mobile">
      <SEOHead
        title="Blog | Energie-Ratgeber NRW 2026 – Strom, Gas & Sparen"
        description="Aktuelle Fachbeitraege und Ratgeber rund um Strompreise, Gaspreise, Anbieterwechsel und Oekostrom in NRW. Tipps zum Energie sparen 2026."
        keywords="Energieblog NRW, Strompreise 2026, Gaspreise NRW, Oekostrom, Energiesparen NRW"
        canonical="/blog"
      />
      <Header />
      <main>
        <section className="w-full py-16 md:py-24 bg-gradient-to-br from-primary to-primary/80">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="text-center"
            >
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
                Energie-Blog NRW 2026
              </h1>
              <p className="font-paragraph text-lg text-white/90 max-w-2xl mx-auto">
                Aktuelle Artikel und Ratgeber zu Strompreisen, Gaskosten, Anbieterwechsel und
                Energiesparen in Nordrhein-Westfalen.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {BLOG_ARTICLES.map((article, index) => (
                <article
                  key={article.slug}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col overflow-hidden border"
                >
                  <div className="bg-primary/10 p-6 flex items-center gap-3">
                    <span className="text-4xl">{article.icon}</span>
                    <span className="inline-block text-xs font-heading font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="font-heading text-xl font-bold text-foreground mb-2 line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="font-paragraph text-sm text-foreground/70 mb-4 line-clamp-3 flex-grow">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-foreground/60 mb-4 border-t pt-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readingTime} Min.
                      </span>
                    </div>
                    <Link
                      to={article.slug}
                      className="inline-flex items-center gap-2 text-primary font-heading font-semibold text-sm hover:underline"
                    >
                      Artikel lesen <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary/5 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
              Direkt zum Vergleich
            </h2>
            <p className="font-paragraph text-foreground/70 mb-6">
              Wissen reicht nicht – handeln Sie jetzt und vergleichen Sie Ihre Energietarife.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to={ROUTES.stromvergleich}
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-heading font-semibold hover:bg-primary/90 transition-colors"
              >
                ⚡ Strom vergleichen
              </Link>
              <Link
                to={ROUTES.gasvergleich}
                className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-heading font-semibold hover:bg-orange-600 transition-colors"
              >
                🔥 Gas vergleichen
              </Link>
            </div>
          </div>
        </section>
      </main>
      <DeferredFooter />
    </div>
  );
}
