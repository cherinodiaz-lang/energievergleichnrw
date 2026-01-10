import { Link, useLocation } from 'react-router-dom';
import { Zap, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/routes';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
            <div className="bg-primary p-1.5 sm:p-2 rounded-lg group-hover:bg-primary/90 transition-colors">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col hidden sm:flex">
              <span className="font-heading font-bold text-lg sm:text-xl text-primary">energievergleich</span>
              <span className="font-paragraph text-xs text-foreground/60">.nrw</span>
            </div>
            <div className="flex flex-col sm:hidden">
              <span className="font-heading font-bold text-sm text-primary">energie</span>
              <span className="font-paragraph text-xs text-foreground/60">.nrw</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('vergleichsrechner')}
              className="font-paragraph text-base text-foreground hover:text-primary transition-colors"
            >
              Vergleichsrechner
            </button>
            <button
              onClick={() => scrollToSection('vorteile')}
              className="font-paragraph text-base text-foreground hover:text-primary transition-colors"
            >
              Vorteile
            </button>
            <button
              onClick={() => scrollToSection('photovoltaik')}
              className="font-paragraph text-base text-foreground hover:text-primary transition-colors"
            >
              Photovoltaik
            </button>
            <Link to={ROUTES.RATGEBER} className="font-paragraph text-base text-foreground hover:text-primary transition-colors">
              Ratgeber
            </Link>
            <Link to={ROUTES.GEWERBESTROM} className="font-paragraph text-base text-foreground hover:text-primary transition-colors">
              Gewerbestrom
            </Link>
            <Link to={ROUTES.GEWERBEGAS} className="font-paragraph text-base text-foreground hover:text-primary transition-colors">
              Gewerbegas
            </Link>
            <button
              onClick={() => scrollToSection('faq')}
              className="font-paragraph text-base text-foreground hover:text-primary transition-colors"
            >
              FAQ
            </button>
          </nav>

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
            <div className="flex flex-col gap-3">
              <button
                onClick={() => scrollToSection('vergleichsrechner')}
                className="font-paragraph text-sm text-foreground hover:text-primary transition-colors text-left py-2"
              >
                Vergleichsrechner
              </button>
              <button
                onClick={() => scrollToSection('vorteile')}
                className="font-paragraph text-sm text-foreground hover:text-primary transition-colors text-left py-2"
              >
                Vorteile
              </button>
              <button
                onClick={() => scrollToSection('photovoltaik')}
                className="font-paragraph text-sm text-foreground hover:text-primary transition-colors text-left py-2"
              >
                Photovoltaik
              </button>
              <Link to={ROUTES.RATGEBER} onClick={() => setMobileMenuOpen(false)} className="font-paragraph text-sm text-foreground hover:text-primary transition-colors text-left py-2">
                Ratgeber
              </Link>
              <Link to={ROUTES.GEWERBESTROM} onClick={() => setMobileMenuOpen(false)} className="font-paragraph text-sm text-foreground hover:text-primary transition-colors text-left py-2">
                Gewerbestrom
              </Link>
              <Link to={ROUTES.GEWERBEGAS} onClick={() => setMobileMenuOpen(false)} className="font-paragraph text-sm text-foreground hover:text-primary transition-colors text-left py-2">
                Gewerbegas
              </Link>
              <button
                onClick={() => scrollToSection('faq')}
                className="font-paragraph text-sm text-foreground hover:text-primary transition-colors text-left py-2"
              >
                FAQ
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
