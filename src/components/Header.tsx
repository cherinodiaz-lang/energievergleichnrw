import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Zap, Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { NAV_MAIN, ROUTES } from '@/lib/routes';
import { trackCTAClick } from '@/services/form-submission';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setOpenDropdown(null);
      }
    };
    if (mobileMenuOpen || openDropdown) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [mobileMenuOpen, openDropdown]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [openDropdown]);

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

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const toggleDropdown = (key: string) => {
    setOpenDropdown(openDropdown === key ? null : key);
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
                Energie
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
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.key)}
                      onMouseEnter={() => setOpenDropdown(item.key)}
                      className={`font-paragraph text-sm xl:text-base flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1 transition-colors ${
                        isActive(item.to) ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.key ? 'rotate-180' : ''}`} />
                    </button>
                    {/* Desktop Dropdown */}
                    <div
                      ref={dropdownRef}
                      onMouseLeave={() => setOpenDropdown(null)}
                      className={`absolute left-0 mt-0 w-48 bg-white border border-gray-100 rounded-lg shadow-lg transition-all duration-200 ${
                        openDropdown === item.key
                          ? 'opacity-100 visible'
                          : 'opacity-0 invisible'
                      }`}
                    >
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.key}
                          to={subitem.to}
                          onClick={() => setOpenDropdown(null)}
                          className={`block px-4 py-3 font-paragraph text-sm first:rounded-t-lg last:rounded-b-lg transition-colors ${
                            isActive(subitem.to)
                              ? 'bg-primary/10 text-primary font-semibold'
                              : 'text-foreground hover:bg-gray-50'
                          }`}
                        >
                          {subitem.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.to}
                    className={`font-paragraph text-sm xl:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1 transition-colors ${
                      isActive(item.to) ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'
                    }`}
                  >
                    {item.label}
                  </Link>
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
                  <Link
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-paragraph font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset transition-colors text-left py-3 sm:py-4 px-3 sm:px-4 block ${
                      isActive(item.to) ? 'text-primary' : 'text-foreground hover:text-primary'
                    }`}
                  >
                    {item.label}
                  </Link>
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
