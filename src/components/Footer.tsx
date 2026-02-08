import { Link, useNavigate } from 'react-router-dom';
import { Zap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';
import { ROUTES, NAV_SECONDARY, NAV_LEGAL } from '@/lib/routes';

export default function Footer() {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToSection = (sectionId: string) => {
    navigate(ROUTES.home);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Brand Section */}
          <div>
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

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-base sm:text-lg mb-4 sm:mb-6">Schnellzugriff</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  to={ROUTES.stromvergleich}
                  className="font-paragraph text-xs sm:text-sm opacity-90 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded px-1 py-0.5 transition-opacity"
                >
                  Stromvergleich
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.gasvergleich}
                  className="font-paragraph text-xs sm:text-sm opacity-90 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded px-1 py-0.5 transition-opacity"
                >
                  Gasvergleich
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.photovoltaik}
                  className="font-paragraph text-xs sm:text-sm opacity-90 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded px-1 py-0.5 transition-opacity"
                >
                  Photovoltaik
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.ratgeberHub}
                  className="font-paragraph text-xs sm:text-sm opacity-90 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded px-1 py-0.5 transition-opacity"
                >
                  Ratgeber
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.kontakt}
                  className="font-paragraph text-xs sm:text-sm opacity-90 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded px-1 py-0.5 transition-opacity"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Ratgeber & Links (from NAV_SECONDARY) */}
          <div>
            <h3 className="font-heading font-semibold text-base sm:text-lg mb-4 sm:mb-6">Ratgeber</h3>
            <ul className="space-y-2 sm:space-y-3">
              {NAV_SECONDARY.map((item) => (
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

          {/* Contact Information */}
          <div>
            <h3 className="font-heading font-semibold text-base sm:text-lg mb-4 sm:mb-6">Kontakt</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-2 sm:gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span className="font-paragraph text-xs sm:text-sm opacity-90">
                  Nordrhein-Westfalen, Deutschland
                </span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a
                  href="mailto:support@energievergleich.nrw"
                  className="font-paragraph text-xs sm:text-sm opacity-90 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded px-1 py-0.5 transition-opacity break-all"
                >
                  support@energievergleich.nrw
                </a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a
                  href="tel:+4921112345678"
                  className="font-paragraph text-xs sm:text-sm opacity-90 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded px-1 py-0.5 transition-opacity"
                >
                  +49 211 1234 5678
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex items-center gap-3 mt-4 sm:mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 opacity-90 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded transition-opacity"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 opacity-90 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded transition-opacity"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 opacity-90 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded transition-opacity"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
            <p className="font-paragraph text-xs sm:text-sm opacity-80">
              © {new Date().getFullYear()} energievergleich.shop. Alle Rechte vorbehalten.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-2 text-xs sm:text-sm leading-snug">
              {NAV_LEGAL.map((item) => (
                <Link
                  key={item.key}
                  to={item.to}
                  className="font-paragraph opacity-80 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded px-1 py-0.5 transition-opacity"
                >
                  {item.label}
                </Link>
              ))}
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
