import type { SVGProps } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Mail, Phone, Globe } from 'lucide-react';
import { ROUTES, NAV_SERVICE, NAV_LEGAL, NAV_SECONDARY } from '@/lib/routes';

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.6 1.6-1.6H16V4.8c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5V11H8v3h2.6v7h2.9Z" />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.9 8.2a1.7 1.7 0 1 1 0-3.5 1.7 1.7 0 0 1 0 3.5ZM8.3 19H5.5V9.8h2.8V19Zm10.2 0h-2.8v-4.5c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4V19H9.6V9.8h2.7V11h0c.4-.7 1.3-1.5 2.7-1.5 2.9 0 3.5 1.9 3.5 4.4V19Z" />
    </svg>
  );
}

export default function Footer() {
  const comparisonLinks = [
    { key: 'stromvergleich', label: 'Stromvergleich NRW', to: ROUTES.stromvergleich },
    { key: 'gasvergleich', label: 'Gasvergleich NRW', to: ROUTES.gasvergleich },
    { key: 'photovoltaik', label: 'Photovoltaik NRW', to: ROUTES.photovoltaik },
    { key: 'gewerbestrom', label: 'Gewerbestrom', to: ROUTES.gewerbestrom },
    { key: 'gewerbegas', label: 'Gewerbegas', to: ROUTES.gewerbegas },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12">
          {/* Brand Section */}
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

          {/* Spalte 1 - Rechtliches */}
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

          {/* Spalte 2 - Service */}
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

          {/* Spalte 3 - Vergleich */}
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

          {/* Kontakt & Social Media */}
          <div>
            <h3 className="font-heading font-semibold text-base sm:text-lg mb-4 sm:mb-6">Kontakt & Social</h3>
            <ul className="space-y-3 sm:space-y-4 mb-6">
              <li className="flex items-start gap-2 sm:gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a
                  href="mailto:info@energievergleich.shop"
                  className="font-paragraph text-xs sm:text-sm opacity-90 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded px-1 py-0.5 transition-opacity break-all"
                >
                  info@energievergleich.shop
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

            {/* Social Media */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 opacity-90 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded transition-opacity"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 opacity-90 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded transition-opacity"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://xing.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 opacity-90 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded transition-opacity"
                aria-label="Xing"
              >
                <Globe className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
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
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
