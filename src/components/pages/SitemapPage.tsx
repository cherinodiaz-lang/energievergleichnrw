import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import { ROUTES } from '@/lib/routes';

const sections = [
  {
    title: 'Hauptseiten',
    links: [
      { label: 'Startseite', to: ROUTES.home },
      { label: 'Stromvergleich NRW', to: ROUTES.stromvergleich },
      { label: 'Gasvergleich NRW', to: ROUTES.gasvergleich },
      { label: 'Photovoltaik NRW', to: ROUTES.photovoltaik },
      { label: 'Gewerbestrom', to: ROUTES.gewerbestrom },
      { label: 'Gewerbegas', to: ROUTES.gewerbegas },
      { label: 'Kontakt', to: ROUTES.kontakt },
      { label: 'So vergleichen wir', to: '/methodik' },
    ],
  },
  {
    title: 'Ratgeber',
    links: [
      { label: 'Ratgeber-Übersicht', to: ROUTES.ratgeberHub },
      { label: 'Ratgeber Strom', to: ROUTES.ratgeberStrom },
      { label: 'Ratgeber Gas', to: ROUTES.ratgeberGas },
      { label: 'Ratgeber Gewerbe', to: ROUTES.ratgeberGewerbe },
      { label: 'Ratgeber Photovoltaik', to: ROUTES.ratgeberPhotovoltaik },
      { label: 'Ratgeber Wechselwissen', to: ROUTES.ratgeberWechselwissen },
    ],
  },
  {
    title: 'Rechtliches',
    links: [
      { label: 'Impressum', to: ROUTES.impressum },
      { label: 'Datenschutz', to: ROUTES.datenschutz },
      { label: 'AGB', to: ROUTES.agb },
      { label: 'Widerrufsbelehrung', to: ROUTES.widerruf },
    ],
  },
];

export default function SitemapPage() {
  const breadcrumbItems = [
    { label: 'Startseite', path: '/' },
    { label: 'Sitemap', path: '/sitemap' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Sitemap | energievergleich.shop"
        description="Übersicht aller Seiten von energievergleich.shop."
        keywords="Sitemap, Seitenübersicht"
        robots="noindex, follow"
      />
      <Header />
      <Breadcrumb items={breadcrumbItems} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-primary mb-12">
          Sitemap
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 border-b pb-2">
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="font-paragraph text-sm text-primary hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
