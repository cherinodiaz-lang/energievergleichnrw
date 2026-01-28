import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Zap, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { NAV_MAIN, ROUTES } from '@/lib/routes';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      // Navigiere zur Homepage mit dem Anchor
      window.location.href = `/#${sectionId}`;
    } else {
      // Wir sind bereits auf der Homepage - scrolle zum Element
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Fallback: Wenn das Element nicht existiert, scrolle nach oben
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  // Determine CTA link based on current page
  const getCtaLink = () => {
    const pathname = location.pathname;
    if (pathname.includes('strom')) return ROUTES.stromvergleich;
    if (pathname.includes('gas')) return ROUTES.gasvergleich;
    if (pathname.includes('photovoltaik')) return ROUTES.photovoltaik;
    if (pathname.includes('gewerbe')) return ROUTES.gewerbestrom;
    return ROUTES.stromvergleich; // Default fallback
  };

  const handleCtaClick = () => {
    navigate(getCtaLink());
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to={ROUTES.home} className="flex items-center gap-2 sm:gap-3 group min-w-0">
            <div className="bg-primary p-1.5 sm:p-2 rounded-lg group-hover:bg-primary/90 transition-colors flex-shrink-0">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
            </div>
            <span className="font-heading font-semibold text-sm sm:text-lg text-primary break-words whitespace-normal">
              Energievergleich NRW
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_MAIN.map((item) => (
              <Link
                key={item.key}
                to={item.to}
                className="font-paragraph text-base text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <Button
            onClick={handleCtaClick}
            className="hidden md:flex bg-secondary hover:bg-secondary/90 text-secondary-foreground font-paragraph font-semibold px-6 py-2 rounded-lg transition-colors"
          >
            Kostenlos vergleichen
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-light-grey">
            <ul className="flex flex-col divide-y divide-gray-200/60">
              {NAV_MAIN.map((item) => (
                <li key={item.key}>
                  <Link
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-paragraph font-medium text-base text-foreground hover:text-primary transition-colors text-left py-3 px-4 block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Mobile CTA Button */}
            <div className="mt-4 px-4 pt-4 border-t border-light-grey">
              <Button
                onClick={handleCtaClick}
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-paragraph font-semibold py-3 rounded-lg transition-colors"
              >
                Kostenlos vergleichen
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
