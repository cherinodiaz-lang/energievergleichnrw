import { Link } from 'react-router-dom';
import { Mail, Phone, Zap } from 'lucide-react';
import { ROUTES, NAV_SERVICE, NAV_LEGAL, NAV_SECONDARY } from '@/lib/routes';

const comparisonLinks = [
  { key: 'stromvergleich', label: 'Stromvergleich NRW', to: ROUTES.stromvergleich },
  { key: 'gasvergleich', label: 'Gasvergleich NRW', to: ROUTES.gasvergleich },
  { key: 'photovoltaik', label: 'Photovoltaik NRW', to: ROUTES.photovoltaik },
  { key: 'gewerbestrom', label: 'Gewerbestrom', to: ROUTES.gewerbestrom },
  { key: 'gewerbegas', label: 'Gewerbegas', to: ROUTES.gewerbegas },
];

function FooterOptionalActions() {
  return (
    <button
      onClick={() => {
        localStorage.removeItem('energievergleich_consent');
        window.location.reload();
      }}
      className="font-paragraph opacity-80 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded px-1 py-0.5 transition-opacity"
      aria-label="Cookie-Einstellungen zurücksetzen"
    >
      Cookie-Einstellungen
    </button>
  );
}

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12">
          <div className="lg:col-span-1">
            <Link to={ROUTES.home} className="flex items-center gap-2 sm:gap-3 mb-6" aria-label="Energievergleich NRW - Startseite">
              <div className="bg-primary-foreground p-1.5 sm:p-2 rounded-lg flex-shrink-0">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-base sm:text-lg">energievergleich</span>
                <span className="font-paragraph text-xs opacity-80">.shop</span>
              </div>
            </Link>
            <p className="font-paragraph text-xs sm:text-sm opacity-90 leading-relaxed">
              Ihr vertrauenswürdiger Partner für Energievergleiche in Nordrhein-Westfalen. Sparen Sie Geld und schützen Sie die Umwelt.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-base sm:text-lg mb-4 sm:mb-6">Rechtliches</h3>
            <ul className="space-y-2 sm:space-y-3">
              {NAV_LEGAL.map((item) => (
                <li key={item.key}>
                  <Link
                    to={item.to}
                    className="font-paragraph text-xs sm:text-sm opacity-90 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded px-1 py-0.5 transition-opacity"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-base sm:text-lg mb-4 sm:mb-6">Service</h3>
            <ul className="space-y-2 sm:space-y-3">
              {NAV_SERVICE.map((item) => (
                <li key={item.key}>
                  <Link
                    to={item.to}
                    className="font-paragraph text-xs sm:text-sm opacity-90 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded px-1 py-0.5 transition-opacity"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-base sm:text-lg mb-4 sm:mb-6">Vergleiche</h3>
            <ul className="space-y-2 sm:space-y-3">
              {comparisonLinks.map((item) => (
                <li key={item.key}>
                  <Link
                    to={item.to}
                    className="font-paragraph text-xs sm:text-sm opacity-90 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded px-1 py-0.5 transition-opacity"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-base sm:text-lg mb-4 sm:mb-6">Kontakt</h3>
            <ul className="space-y-3 sm:space-y-4 mb-6">
              <li className="flex items-start gap-2 sm:gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a
                  href="mailto:support@energievergleich.nrw"
                  className="font-paragraph text-xs sm:text-sm opacity-90 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded px-1 py-0.5 transition-opacity break-all"
                  aria-label="E-Mail an support@energievergleich.nrw"
                >
                  support@energievergleich.nrw
                </a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a
                  href="tel:+492011033939"
                  className="font-paragraph text-xs sm:text-sm opacity-90 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded px-1 py-0.5 transition-opacity"
                >
                  +49 (0) 2 01 – 1 03 – 39 39
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <nav aria-label="Interne SEO Links" className="mb-4 sm:mb-6">
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm leading-snug">
              {NAV_SECONDARY.map((item) => (
                <li key={item.key}>
                  <Link
                    to={item.to}
                    className="font-paragraph opacity-80 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded px-1 py-0.5 transition-opacity"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
            <p className="font-paragraph text-xs sm:text-sm opacity-80">
              © 2026 energievergleich.shop - Alle Rechte vorbehalten.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-2 text-xs sm:text-sm leading-snug">
              <FooterOptionalActions />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
