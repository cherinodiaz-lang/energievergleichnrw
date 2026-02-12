import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Zap, Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { NAV_MAIN, ROUTES } from '@/lib/routes';
import { trackCTAClick } from '@/services/form-submission';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [mobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  const getCtaLink = () => {
    const pathname = location.pathname;
    if (pathname.includes('strom')) return ROUTES.stromvergleich;
    if (pathname.includes('gas')) return ROUTES.gasvergleich;
    if (pathname.includes('photovoltaik')) return ROUTES.photovoltaik;
    if (pathname.includes('gewerbe')) return ROUTES.gewerbestrom;
    return ROUTES.stromvergleich;
  };

  const handleCtaClick = () => {
    trackCTAClick('Kostenlos vergleichen');
    navigate(getCtaLink());
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-[120rem] mx-auto px-3 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <Link 
            to={ROUTES.home} 
            className="flex items-center gap-2 sm:gap-3 group min-w-0 flex-shrink-0"
            aria-label="Energievergleich NRW - Startseite"
          >
            <div className="bg-primary p-1.5 sm:p-2 rounded-lg group-hover:bg-primary/90 transition-colors flex-shrink-0">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary-foreground" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex flex-col leading-tight">
              <span className="font-heading font-semibold text-xs sm:text-sm lg:text-lg text-primary">
                Energievergleich
              </span>
              <span className="font-heading font-semibold text-xs sm:text-sm lg:text-lg text-primary">
                NRW
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Hauptnavigation">
            {NAV_MAIN.map((item) => (
              <div key={item.key} className="relative group">
                {item.to.startsWith('http') ? (
                  <a
                    href={item.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-paragraph text-sm xl:text-base text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1 transition-colors flex items-center gap-1"
                  >
                    {item.label}
                    {item.submenu && (
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" aria-hidden="true" />
                    )}
                  </a>
                ) : (
                  <Link
                    to={item.to}
                    className="font-paragraph text-sm xl:text-base text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1 transition-colors flex items-center gap-1"
                  >
                    {item.label}
                    {item.submenu && (
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" aria-hidden="true" />
                    )}
                  </Link>
                )}
                
                {/* Desktop Submenu */}
                {item.submenu && (
                  <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-100 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
                    {item.submenu.map((subitem) => (
                      <a
                        key={subitem.key}
                        href={subitem.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 font-paragraph text-sm text-foreground hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        {subitem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <Button
            onClick={handleCtaClick}
            className="hidden lg:flex bg-secondary hover:bg-secondary/90 text-secondary-foreground font-paragraph font-semibold px-4 xl:px-6 py-2 rounded-lg transition-colors h-10 xl:h-12 text-sm xl:text-base focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
            aria-label="Kostenlos vergleichen - Tarifrechner starten"
          >
            Kostenlos vergleichen
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded transition-colors"
            aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav 
            id="mobile-menu"
            className="lg:hidden py-3 sm:py-4 border-t border-gray-100"
            aria-label="Mobile Navigation"
          >
            <ul className="flex flex-col divide-y divide-gray-100">
              {NAV_MAIN.map((item) => (
                <li key={item.key}>
                  {item.to.startsWith('http') && !item.submenu ? (
                    <a
                      href={item.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block font-paragraph font-medium text-sm sm:text-base text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset transition-colors py-3 sm:py-4 px-3 sm:px-4"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          if (item.submenu) {
                            setOpenSubmenu(openSubmenu === item.key ? null : item.key);
                          } else {
                            setMobileMenuOpen(false);
                          }
                        }}
                        className="w-full text-left font-paragraph font-medium text-sm sm:text-base text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset transition-colors py-3 sm:py-4 px-3 sm:px-4 flex items-center justify-between"
                      >
                        <span>{item.label}</span>
                        {item.submenu && (
                          <ChevronDown 
                            className={`w-4 h-4 transition-transform ${openSubmenu === item.key ? 'rotate-180' : ''}`}
                            aria-hidden="true"
                          />
                        )}
                      </button>
                      
                      {/* Mobile Submenu */}
                      {item.submenu && openSubmenu === item.key && (
                        <ul className="bg-gray-50 divide-y divide-gray-100">
                          {item.submenu.map((subitem) => (
                            <li key={subitem.key}>
                              <a
                                href={subitem.to}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block font-paragraph text-sm text-foreground hover:text-primary hover:bg-primary/5 transition-colors py-3 sm:py-4 px-6 sm:px-8"
                              >
                                {subitem.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
            {/* Mobile CTA Button */}
            <div className="mt-3 sm:mt-4 px-3 sm:px-4 pt-3 sm:pt-4 border-t border-gray-100">
              <Button
                onClick={handleCtaClick}
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-paragraph font-semibold py-3 sm:py-4 rounded-lg transition-colors h-11 sm:h-12 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
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
