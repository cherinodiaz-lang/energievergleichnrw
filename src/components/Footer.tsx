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
    // Navigate to home first, then scroll to section
    navigate(ROUTES.home);
    // Use setTimeout to ensure navigation completes before scrolling
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div>
            <Link to={ROUTES.home} className="flex items-center gap-3 mb-6">
              <div className="bg-primary-foreground p-2 rounded-lg">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl">energievergleich</span>
                <span className="font-paragraph text-xs opacity-80">.nrw</span>
              </div>
            </Link>
            <p className="font-paragraph text-sm opacity-90 leading-relaxed">
              Ihr vertrauenswürdiger Partner für Energievergleiche in Nordrhein-Westfalen. Sparen Sie Geld und schützen Sie die Umwelt.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Schnellzugriff</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => navigateToSection('vergleichsrechner')}
                  className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity"
                >
                  Vergleichsrechner
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToSection('vorteile')}
                  className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity"
                >
                  Vorteile
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToSection('photovoltaik')}
                  className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity"
                >
                  Photovoltaik
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToSection('informationsmaterial')}
                  className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity"
                >
                  Informationsmaterial
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToSection('faq')}
                  className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Ratgeber & Links (from NAV_SECONDARY) */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Ratgeber</h3>
            <ul className="space-y-3">
              {NAV_SECONDARY.map((item) => (
                <li key={item.key}>
                  <Link
                    to={item.to}
                    className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Kontakt</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="font-paragraph text-sm opacity-90">
                  Nordrhein-Westfalen, Deutschland
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:info@energievergleich.nrw"
                  className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity"
                >
                  info@energievergleich.nrw
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <a
                  href="tel:+4921112345678"
                  className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity"
                >
                  +49 211 1234 5678
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-90 hover:opacity-100 transition-opacity"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-90 hover:opacity-100 transition-opacity"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-90 hover:opacity-100 transition-opacity"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm opacity-80">
              © {new Date().getFullYear()} energievergleich.nrw. Alle Rechte vorbehalten.
            </p>
            <div className="flex items-center gap-6">
              {NAV_LEGAL.map((item) => (
                <Link
                  key={item.key}
                  to={item.to}
                  className="font-paragraph text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  localStorage.removeItem('energievergleich_consent');
                  window.location.reload();
                }}
                className="font-paragraph text-sm opacity-80 hover:opacity-100 transition-opacity"
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
