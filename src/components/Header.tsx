import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Zap, Menu, X, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { NAV_MAIN, ROUTES } from '@/lib/routes';
import { trackCTAClick } from '@/services/form-submission';
import Breadcrumb from '@/components/Breadcrumb';
import { getBreadcrumbItems } from '@/lib/internal-linking';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuDialogRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenSubmenu(null);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileMenuOpen || typeof document === 'undefined') {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusableSelector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    const focusFirstElement = () => {
      const dialog = mobileMenuDialogRef.current;
      if (!dialog) {
        return;
      }

      const focusableElements = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector));
      focusableElements[0]?.focus();
    };

    const frameId = window.requestAnimationFrame(focusFirstElement);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMobileMenuOpen(false);
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const dialog = mobileMenuDialogRef.current;
      if (!dialog) {
        return;
      }

      const focusableElements = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector));
      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(frameId);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      mobileMenuTriggerRef.current?.focus();
    };
  }, [mobileMenuOpen]);

  const isActiveLink = (path: string): boolean => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
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

  // Get breadcrumb items for current page (only show on non-homepage)
  const breadcrumbItems = location.pathname !== '/' ? getBreadcrumbItems(location.pathname) : [];

  return (
    <>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 h-14 sm:h-16 lg:h-20">
        <div className="max-w-[120rem] mx-auto px-3 sm:px-6 lg:px-12 h-full">
          <div className="flex items-center justify-between h-full">
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
                <span className="font-heading text-xs sm:text-sm lg:text-lg text-primary font-bold">
                  NRW
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Hauptnavigation">
              {NAV_MAIN.map((item) => (
                <div key={item.key} className="relative group">
                  <Link
                    to={item.to}
                    className={`font-paragraph text-sm xl:text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1 transition-colors flex items-center gap-1 min-h-12 ${
                      isActiveLink(item.to)
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-foreground hover:text-primary'
                    }`}
                  >
                    {item.label}
                    {item.submenu && (
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" aria-hidden="true" />
                    )}
                  </Link>

                  {/* Desktop Submenu */}
                  {item.submenu && (
                    <div className="absolute left-0 mt-0 w-56 bg-white border border-gray-100 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.key}
                          to={subitem.to}
                          className={`block px-4 py-3 font-paragraph text-sm font-medium transition-colors min-h-12 flex items-center ${
                            isActiveLink(subitem.to)
                              ? 'bg-primary/10 text-primary'
                              : 'text-foreground hover:bg-primary/5 hover:text-primary'
                          }`}
                        >
                          {subitem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop CTA Button */}
            <Button
              onClick={handleCtaClick}
              className="hidden lg:flex bg-secondary hover:bg-secondary/90 text-black font-paragraph font-semibold px-4 xl:px-6 py-2 rounded-lg transition-colors h-10 xl:h-12 text-sm xl:text-base focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
              aria-label="Kostenlos vergleichen - Tarifrechner starten"
            >
              Kostenlos vergleichen
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              ref={mobileMenuTriggerRef}
              className="lg:hidden p-2 text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded transition-colors min-h-12 min-w-12"
              aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>

        </div>
      </header>
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/45"
            aria-label="Menü schließen"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            ref={mobileMenuDialogRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
            className="absolute inset-x-0 top-0 max-h-screen overflow-y-auto border-b border-gray-200 bg-white shadow-2xl"
          >
            <div className="mx-auto max-w-[120rem] px-3 sm:px-6 lg:px-12">
              <div className="flex min-h-14 items-center justify-between border-b border-gray-100 sm:min-h-16">
                <p id="mobile-menu-title" className="font-heading text-base font-semibold text-primary">
                  Navigation
                </p>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded transition-colors min-h-12 min-w-12"
                  aria-label="Menü schließen"
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <nav className="py-3 sm:py-4" aria-label="Mobile Navigation">
                <ul className="flex flex-col divide-y divide-gray-100">
                  {NAV_MAIN.map((item) => (
                    <li key={item.key}>
                      <>
                        {item.submenu ? (
                          <div className="flex items-center justify-between py-3 sm:py-4 px-3 sm:px-4 min-h-12">
                            <Link
                              to={item.to}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`font-paragraph font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset rounded transition-colors ${
                                isActiveLink(item.to)
                                  ? 'text-primary'
                                  : 'text-foreground hover:text-primary'
                              }`}
                            >
                              {item.label}
                            </Link>
                            <button
                              onClick={() => setOpenSubmenu(openSubmenu === item.key ? null : item.key)}
                              className="p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset rounded"
                              aria-label={`${item.label} Untermenü ${openSubmenu === item.key ? 'schließen' : 'öffnen'}`}
                              aria-expanded={openSubmenu === item.key}
                            >
                              <ChevronDown
                                className={`w-4 h-4 transition-transform ${openSubmenu === item.key ? 'rotate-180' : ''}`}
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        ) : (
                          <Link
                            to={item.to}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block w-full text-left font-paragraph font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset transition-colors py-3 sm:py-4 px-3 sm:px-4 min-h-12 ${
                              isActiveLink(item.to)
                                ? 'text-primary bg-primary/5'
                                : 'text-foreground hover:text-primary'
                            }`}
                          >
                            {item.label}
                          </Link>
                        )}

                        {item.submenu && openSubmenu === item.key && (
                          <ul className="bg-gray-50 divide-y divide-gray-100">
                            {item.submenu.map((subitem) => (
                              <li key={subitem.key}>
                                <Link
                                  to={subitem.to}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className={`block font-paragraph text-sm font-medium transition-colors py-3 sm:py-4 px-6 sm:px-8 min-h-12 flex items-center ${
                                    isActiveLink(subitem.to)
                                      ? 'text-primary bg-primary/10'
                                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                                  }`}
                                >
                                  {subitem.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 sm:mt-4 px-3 sm:px-4 pt-3 sm:pt-4 border-t border-gray-100">
                  <Button
                    onClick={handleCtaClick}
                    className="w-full bg-secondary hover:bg-secondary/90 text-black font-paragraph font-semibold py-3 sm:py-4 rounded-lg transition-colors h-11 sm:h-12 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                  >
                    Kostenlos vergleichen
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
      {/* Breadcrumb Navigation - Only on non-homepage */}
      {breadcrumbItems.length > 0 && <Breadcrumb items={breadcrumbItems} />}
    </>
  );
}
