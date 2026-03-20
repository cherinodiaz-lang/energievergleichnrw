import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { ROUTES } from '@/lib/routes';

export default function ThankYouPage() {
  return (
    <>
      <SEOHead
        title="Danke – Anfrage erhalten"
        description="Vielen Dank für Ihre Anfrage. Wir melden uns kurzfristig bei Ihnen."
        noindex={true}
      />
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
              <CheckCircle className="relative w-20 h-20 text-primary" strokeWidth={1.5} />
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-center text-foreground mb-6">
            Danke – wir melden uns kurzfristig.
          </h1>

          {/* Subheadline */}
          <p className="font-paragraph text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Ihre Anfrage wurde erfolgreich übermittelt. Unser Team wird sich in Kürze mit Ihnen in Verbindung setzen.
          </p>

          {/* Next Steps Section */}
          <div className="bg-white rounded-lg border border-light-grey p-8 sm:p-10 mb-12">
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-8">
              Das können Sie jetzt tun:
            </h2>

            <ul className="space-y-6">
              {/* Step 1 */}
              <li className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10">
                    <span className="text-primary font-heading font-semibold">1</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">
                    Unterlagen bereitlegen
                  </h3>
                  <p className="font-paragraph text-gray-600">
                    Halten Sie Ihre letzte Rechnung und Ihren Jahresverbrauch bereit – das beschleunigt den Vergleich.
                  </p>
                </div>
              </li>

              {/* Step 2 */}
              <li className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10">
                    <span className="text-primary font-heading font-semibold">2</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">
                    Rückrufzeitfenster nennen
                  </h3>
                  <p className="font-paragraph text-gray-600">
                    Teilen Sie uns mit, wann wir Sie am besten erreichen können – wir richten uns nach Ihrem Zeitplan.
                  </p>
                </div>
              </li>

              {/* Step 3 */}
              <li className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10">
                    <span className="text-primary font-heading font-semibold">3</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">
                    Ratgeber entdecken
                  </h3>
                  <p className="font-paragraph text-gray-600">
                    Informieren Sie sich in unserem Ratgeber über Strom, Gas, Photovoltaik oder Gewerbeenergie.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Link to={ROUTES.ratgeberStrom}>
                      <Button variant="outline" size="sm" className="text-xs">
                        Strom-Ratgeber
                      </Button>
                    </Link>
                    <Link to={ROUTES.ratgeberGas}>
                      <Button variant="outline" size="sm" className="text-xs">
                        Gas-Ratgeber
                      </Button>
                    </Link>
                    <Link to={ROUTES.ratgeberPhotovoltaik}>
                      <Button variant="outline" size="sm" className="text-xs">
                        PV-Ratgeber
                      </Button>
                    </Link>
                    <Link to={ROUTES.ratgeberGewerbe}>
                      <Button variant="outline" size="sm" className="text-xs">
                        Gewerbe-Ratgeber
                      </Button>
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Link to={ROUTES.home}>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-semibold"
              >
                Zur Startseite
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-16 pt-12 border-t border-light-grey">
            <p className="font-paragraph text-center text-gray-600 text-sm">
              Haben Sie Fragen? Kontaktieren Sie uns jederzeit unter{' '}
              <a href="mailto:support@energievergleich.nrw" className="text-primary font-semibold hover:underline">
                support@energievergleich.nrw
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
