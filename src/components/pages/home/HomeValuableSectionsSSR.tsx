import { Building2, CheckCircle, ChevronDown, Download, Home, Leaf, Send, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ROUTES } from '@/lib/routes';

const SSR_VORTEILE = [
  {
    title: 'Bessere Orientierung',
    description:
      'Mit regelmäßigem Vergleich erkennen Sie Preisunterschiede bei Strom- und Gasangeboten.',
  },
  {
    title: 'Unabhängige Beratung',
    description:
      'Wir vergleichen transparent und helfen bei der Auswahl passender Tarife für Haushalt und Gewerbe.',
  },
  {
    title: 'Klare nächste Schritte',
    description:
      'Von der ersten Anfrage bis zur Rückmeldung begleiten wir Sie Schritt für Schritt.',
  },
];

const SSR_DOWNLOADS = [
  {
    title: 'Stromvergleich NRW',
    description: 'Wichtige Punkte für Tarifvergleich, Laufzeit und Preisgarantie auf einen Blick.',
    href: ROUTES.ratgeberStrom,
  },
  {
    title: 'Gasvergleich NRW',
    description: 'Leitfaden für Verbrauch, Vertragsbedingungen und Wechselablauf.',
    href: ROUTES.ratgeberGas,
  },
  {
    title: 'Photovoltaik in NRW',
    description: 'Grundlagen zu Kosten, Förderung und Wirtschaftlichkeit von PV-Anlagen.',
    href: ROUTES.ratgeberPhotovoltaik,
  },
];

const SSR_FAQS = [
  {
    question: 'Wie schnell kann ich den Energieanbieter wechseln?',
    answer:
      'In der Regel dauert der Wechsel 2 bis 6 Wochen. Die Versorgung bleibt dabei ohne Unterbrechung bestehen.',
  },
  {
    question: 'Entstehen beim Anbieterwechsel zusätzliche Kosten?',
    answer:
      'Der Wechsel selbst ist üblicherweise kostenlos. Relevante Kosten hängen vom gewählten Tarif und Vertragsbedingungen ab.',
  },
  {
    question: 'Lohnt sich Photovoltaik auch in NRW?',
    answer:
      'Ja, bei passender Dachfläche und Verbrauch kann eine Anlage die Stromkosten langfristig deutlich senken.',
  },
];

export default function HomeValuableSectionsSSR() {
  return (
    <>
      <section id="vorteile" className="w-full py-24 sm:py-32 bg-primary text-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-4 sm:mb-6">
              Warum wechseln?
            </h2>
            <p className="font-paragraph text-base sm:text-xl text-white/80 max-w-2xl mx-auto">
              Der Energiemarkt in NRW bietet viele Möglichkeiten. Wir helfen Ihnen bei einer realistischen Einordnung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SSR_VORTEILE.map((item) => (
              <div
                key={item.title}
                className="group bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full"
              >
                <div className="mb-4 sm:mb-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-secondary/20 flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-secondary" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-lg sm:text-2xl font-bold mb-3 sm:mb-4 text-secondary">
                  {item.title}
                </h3>
                <p className="font-paragraph text-sm sm:text-base text-white/80 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="photovoltaik" className="w-full bg-white pt-16 sm:pt-24 pb-24 sm:pb-32">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <div>
              <div className="inline-block px-3 sm:px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-bold text-xs sm:text-sm mb-4 sm:mb-6">
                Zukunftstechnologie
              </div>
              <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary mb-6 sm:mb-8 leading-tight">
                Ihre eigene <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-orange-500">
                  Energiequelle.
                </span>
              </h2>
              <p className="font-paragraph text-base sm:text-xl text-gray-600 mb-8 sm:mb-10 leading-relaxed">
                Machen Sie sich unabhängig von steigenden Strompreisen. Mit einer Photovoltaik-Anlage produzieren Sie Ihren
                eigenen grünen Strom direkt auf Ihrem Dach in NRW.
              </p>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-50">
                  <Sun className="w-6 h-6 sm:w-8 sm:h-8 text-secondary flex-shrink-0" aria-hidden="true" />
                  <span className="font-bold text-sm sm:text-base text-gray-800">Bis zu 80% Autarkie möglich</span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-50">
                  <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-secondary flex-shrink-0" aria-hidden="true" />
                  <span className="font-bold text-sm sm:text-base text-gray-800">Wertsteigerung Ihrer Immobilie</span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-50">
                  <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-secondary flex-shrink-0" aria-hidden="true" />
                  <span className="font-bold text-sm sm:text-base text-gray-800">Aktiver Klimaschutz</span>
                </div>
              </div>
            </div>

            <Card className="border-none shadow-2xl overflow-hidden">
              <div className="bg-primary p-4 sm:p-6 text-white">
                <h3 className="font-heading text-lg sm:text-2xl font-bold">Kostenlose Beratung</h3>
                <p className="text-white/80 text-xs sm:text-sm">Details werden nachgeladen.</p>
              </div>
              <CardContent className="p-6 sm:p-8">
                <p className="font-paragraph text-sm sm:text-base text-gray-600 mb-6">
                  Inhalte des Beratungsformulars sind verfügbar, sobald der Interaktionsbereich geladen wurde.
                </p>
                <Button asChild className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <a href="#kontakt">Zur Kontaktanfrage</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="informationsmaterial" className="w-full py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-12 sm:mb-16">
            <div className="space-y-3 text-left">
              <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary">
                Wissen zum <br />Downloaden
              </h2>
            </div>
            <p className="font-paragraph text-base sm:text-lg text-gray-600 max-w-md text-left md:text-right">
              Unsere Experten haben die wichtigsten Informationen für Sie zusammengefasst.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SSR_DOWNLOADS.map((item) => (
              <Link key={item.title} to={item.href} className="block h-full">
                <Card className="h-full border-none bg-white overflow-hidden">
                  <CardHeader className="p-4 sm:p-6">
                    <span className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">PDF Guide</span>
                    <CardTitle className="font-heading text-base sm:text-xl text-gray-900">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <p className="font-paragraph text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6">{item.description}</p>
                    <Button variant="outline" className="w-full border-gray-200 text-xs sm:text-sm h-9 sm:h-10">
                      <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                      Jetzt ansehen
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="w-full py-24 sm:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary mb-3 sm:mb-4">
              Häufige Fragen
            </h2>
            <p className="font-paragraph text-base sm:text-lg text-gray-600">Alles was Sie über den Wechsel wissen müssen.</p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {SSR_FAQS.map((faq) => (
              <details key={faq.question} className="group rounded-lg bg-gray-50 px-4 sm:rounded-2xl sm:px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-heading text-sm font-medium text-left hover:text-primary sm:py-6 sm:text-lg [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <ChevronDown
                    className="h-5 w-5 flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <div className="pb-4 font-paragraph text-sm leading-relaxed text-gray-600 sm:pb-6 sm:text-base">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="kontakt" className="w-full py-24 sm:py-32 bg-primary relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}
        />
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="text-white">
              <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-6 sm:mb-8">
                Wir sind für <br />Sie da.
              </h2>
              <p className="font-paragraph text-base sm:text-xl text-white/80 mb-8 sm:mb-12 max-w-lg">
                Haben Sie Fragen zu Ihrem Tarif oder interessieren Sie sich für eine Solaranlage? Schreiben Sie uns.
              </p>

              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/20 flex-shrink-0">
                    <Home className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-white/60 uppercase tracking-wider font-bold">Anschrift</p>
                    <p className="text-base sm:text-xl font-medium">59302 Oelde, NRW</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/20 flex-shrink-0">
                    <Send className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-white/60 uppercase tracking-wider font-bold">E-Mail</p>
                    <a
                      href="mailto:support@energievergleich.nrw"
                      className="text-base sm:text-xl font-medium underline-offset-4 hover:underline"
                      aria-label="E-Mail an support@energievergleich.nrw"
                    >
                      support@energievergleich.nrw
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <Card className="border-none shadow-2xl bg-white/95 backdrop-blur-sm p-2">
              <CardContent className="pt-6 sm:pt-8 px-4 sm:px-8 pb-6 sm:pb-8">
                <p className="font-paragraph text-sm sm:text-base text-gray-600 mb-6">
                  Das Formular wird nachgeladen, damit der Initialpfad leicht bleibt.
                </p>
                <Button asChild className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-11 sm:h-14 text-sm sm:text-lg font-bold rounded-lg sm:rounded-xl">
                  <a href="mailto:support@energievergleich.nrw">Kontakt aufnehmen</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
