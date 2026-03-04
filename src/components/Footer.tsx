import { Link, useNavigate } from 'react-router-dom';
import { Zap, Mail, Phone, MapPin, Facebook, Linkedin, Globe } from 'lucide-react';
import { ROUTES, NAV_SERVICE, NAV_LEGAL } from '@/lib/routes';
import { CONTACT } from '@/config/contact';

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

          {/* Kontakt & Social Media */}
          <div>
            <h3 className="font-heading font-semibold text-base sm:text-lg mb-4 sm:mb-6">Kontakt & Social</h3>
            <ul className="space-y-3 sm:space-y-4 mb-6">
              <li className="flex items-start gap-2 sm:gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div className="font-paragraph text-xs sm:text-sm opacity-90">
                  {CONTACT.addressLines.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                  className="font-paragraph text-xs sm:text-sm opacity-90 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded px-1 py-0.5 transition-opacity"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="font-paragraph text-xs sm:text-sm opacity-90 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded px-1 py-0.5 transition-opacity break-all"
                >
                  {CONTACT.email}
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
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
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
