import { useLocation } from 'react-router-dom';
import { Zap, CheckCircle, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import DeferredFooter from '@/components/DeferredFooter';
import Breadcrumb from '@/components/Breadcrumb';
import VerivoxCalculatorEmbed from '@/components/VerivoxCalculatorEmbed';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';
import { getCityBySlug } from '@/lib/cities-nrw';

export default function CityStromvergleichPage() {
  const location = useLocation();
  // pathname is like /koeln or /muenster
  const slug = location.pathname.replace(/^\//, '').replace(/\/$/, '');
  const city = getCityBySlug(slug);

  if (!city) {
    return null;
  }

  const breadcrumbItems = [
    { label: 'Startseite', path: '/' },
    { label: 'Stromvergleich NRW', path: ROUTES.stromvergleich },
    { label: `Stromvergleich ${city.name}`, path: `/${city.slug}` },
  ];

  return (
    <div className="min-h-screen bg-background break-words leading-mobile">
      <Header />
      <main>
        <Breadcrumb items={breadcrumbItems} />

        {/* Hero Section */}
        <section className="w-full bg-primary text-primary-foreground py-20 md:py-32">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div
              className="max-w-3xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-secondary" aria-hidden="true" />
                <span className="font-paragraph text-sm text-white/80">
                  {city.name} · PLZ {city.plzRange}
                </span>
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 leading-tight max-w-[22ch] sm:max-w-none break-words">
                Stromvergleich {city.name} 2026
              </h1>
              <p className="font-paragraph text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
                Vergleichen Sie aktuelle Stromtarife für {city.name} direkt im Live-Rechner. Kostenlos, transparent
                und ohne Anmeldung.
              </p>
              <div className="flex flex-col gap-4">
                <Button
                  onClick={() => document.getElementById('vergleich')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-14 px-8 rounded-full text-lg font-semibold shadow-lg self-start"
                >
                  Zum Live-Rechner
                </Button>
                <Link
                  to="/methodik"
                  className="text-white/80 hover:text-white transition-colors text-sm font-medium underline"
                >
                  So vergleichen wir (Methodik)
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="w-full py-16 bg-slate-50">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-primary mb-4">
                  Stromtarife in {city.name} vergleichen
                </h2>
                <p className="font-paragraph text-base leading-7 text-slate-600">
                  {city.intro}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="border-blue-100 bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-heading text-lg text-primary flex items-center gap-2">
                      <Zap className="w-5 h-5 text-secondary" aria-hidden="true" />
                      Grundversorger
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-slate-600">{city.grundversorger}</p>
                  </CardContent>
                </Card>
                <Card className="border-blue-100 bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-heading text-lg text-primary flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-secondary" aria-hidden="true" />
                      PLZ-Bereich
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-slate-600">{city.plzRange}</p>
                  </CardContent>
                </Card>
                <Card className="border-green-100 bg-white sm:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-heading text-lg text-primary flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" aria-hidden="true" />
                      Gasvergleich {city.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-slate-600 mb-3">
                      Suchen Sie auch nach günstigen Gastarifen für {city.name}? Nutzen Sie unseren allgemeinen
                      Gasvergleich für NRW.
                    </p>
                    <Link
                      to={ROUTES.gasvergleich}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                    >
                      Zum Gasvergleich NRW
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section id="vergleich" className="w-full py-24 bg-white">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.9fr)] lg:items-start">
              <VerivoxCalculatorEmbed
                title={`Live-Stromtarife für ${city.name} vergleichen`}
                description={`Geben Sie Ihre Postleitzahl in ${city.name} (${city.plzRange}) und Ihren Jahresverbrauch ein. Der Rechner zeigt aktuelle Tarife, Preisgarantien, Boni und Laufzeiten direkt von Verivox.`}
                target="Energie_Strom_Privat_Rechner"
                wmid="104"
                campaignId={`stromvergleich_${city.slug.replace(/-/g, '_')}`}
                trackingProductId="93"
              />
              <div className="space-y-6">
                <div className="rounded-[1.75rem] border border-blue-100 bg-blue-50 p-6 shadow-sm">
                  <h3 className="font-heading text-xl font-semibold text-primary mb-4">
                    Warum jetzt vergleichen?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="font-paragraph text-sm">
                        Aktuelle Tarifdaten direkt aus dem Verivox-Partnerrechner.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="font-paragraph text-sm">
                        Für private Haushalte in {city.name} optimiert – PLZ {city.plzRange}.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="font-paragraph text-sm">
                        Preisgarantie, Laufzeit, Bonus und Gesamtkosten im Blick.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="font-paragraph text-sm">
                        Kostenlos, unverbindlich und ohne sichtbare Platzhalterlogik.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="font-heading text-lg font-semibold text-primary mb-3">
                    So einfach geht's
                  </h3>
                  <ol className="space-y-2 list-decimal list-inside">
                    <li className="font-paragraph text-sm text-slate-600">
                      PLZ eingeben (z. B. {city.plz})
                    </li>
                    <li className="font-paragraph text-sm text-slate-600">
                      Jahresverbrauch in kWh angeben
                    </li>
                    <li className="font-paragraph text-sm text-slate-600">
                      Tarife vergleichen und auswählen
                    </li>
                    <li className="font-paragraph text-sm text-slate-600">
                      Direkt beim Anbieter abschließen
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-20 bg-slate-50">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-primary mb-10">
              Häufige Fragen zum Stromvergleich in {city.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  q: `Wie viel kann ich mit einem Stromwechsel in ${city.name} sparen?`,
                  a: `Die mögliche Ersparnis hängt von Ihrem Jahresverbrauch, der gewählten Postleitzahl in ${city.name} und dem aktuellen Tarif ab. Ein durchschnittlicher Haushalt in ${city.name} mit etwa 3.500 kWh Jahresverbrauch kann durch einen Wechsel vom Grundversorgungstarif der ${city.grundversorger} zu einem günstigen Sondervertrag zwischen 150 und 400 Euro jährlich sparen.`,
                },
                {
                  q: `Welcher Stromanbieter ist Grundversorger in ${city.name}?`,
                  a: `Der Grundversorger für Strom in ${city.name} ist ${city.grundversorger}. Wenn Sie keinen aktiven Liefervertrag abgeschlossen haben, werden Sie automatisch über die Grundversorgung beliefert – zu Preisen, die oft über dem Marktdurchschnitt liegen. Mit unserem Vergleich finden Sie günstigere Alternativen.`,
                },
                {
                  q: `Wie lange dauert ein Stromanbieter-Wechsel in ${city.name}?`,
                  a: `Ein Anbieterwechsel in ${city.name} dauert in der Regel 2 bis 6 Wochen. Der neue Anbieter übernimmt die Kündigung beim alten Versorger. Ihre Stromversorgung wird dabei nicht unterbrochen – selbst wenn es zu Verzögerungen kommt, springt der Grundversorger ${city.grundversorger} automatisch ein.`,
                },
                {
                  q: `Welche Postleitzahl gebe ich für ${city.name} in den Rechner ein?`,
                  a: `${city.name} umfasst den PLZ-Bereich ${city.plzRange}. Geben Sie Ihre genaue Postleitzahl ein, da Tarife und Verfügbarkeit je nach Netzgebiet leicht variieren können. Für die meisten Stadtteile von ${city.name} stehen gleiche oder sehr ähnliche Angebote zur Verfügung.`,
                },
                {
                  q: `Kann ich als Mieter in ${city.name} den Stromanbieter wechseln?`,
                  a: `Ja, als Mieter in ${city.name} können Sie Ihren Stromanbieter jederzeit wechseln – sofern der Strom über Ihren eigenen Zähler läuft und nicht über ein Mieterstrommodell abgerechnet wird. Sie schließen einfach einen neuen Liefervertrag ab. Ihr Vermieter muss nicht einbezogen werden.`,
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="rounded-[1.5rem] bg-white border border-slate-200 p-6 shadow-sm"
                >
                  <h3 className="font-heading text-base font-semibold text-primary mb-2">{faq.q}</h3>
                  <p className="font-paragraph text-sm leading-7 text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className="w-full py-16 bg-white">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-xl font-semibold text-primary mb-6">Weitere Vergleiche</h2>
            <div className="flex flex-wrap gap-4">
              <Link
                to={ROUTES.gasvergleich}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-primary shadow-sm hover:border-primary hover:shadow-md transition-all"
              >
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
                Gasvergleich NRW
              </Link>
              <Link
                to={ROUTES.stromvergleich}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-primary shadow-sm hover:border-primary hover:shadow-md transition-all"
              >
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
                Stromvergleich NRW
              </Link>
              <Link
                to={ROUTES.ratgeber}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-primary shadow-sm hover:border-primary hover:shadow-md transition-all"
              >
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
                Energie-Ratgeber
              </Link>
            </div>
          </div>
        </section>
      </main>
      <DeferredFooter />
    </div>
  );
}
