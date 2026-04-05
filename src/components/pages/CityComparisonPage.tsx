import { ArrowRight, Building2, Euro, MapPin, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Breadcrumb from '@/components/Breadcrumb';
import DeferredFooter from '@/components/DeferredFooter';
import Header from '@/components/Header';
import PassendeRatgeber from '@/components/PassendeRatgeber';
import AffiliateCtaBanner from '@/components/AffiliateCtaBanner';
import VerivoxCalculatorEmbed from '@/components/VerivoxCalculatorEmbed';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CITIES,
  calcJahresersparnis,
  getGasCityFaqs,
  getGasCityPath,
  getStromCityFaqs,
  getStromCityPath,
  type CityData,
} from '@/lib/cities';
import { ROUTES } from '@/lib/routes';

interface CityComparisonPageProps {
  city: CityData;
  comparisonType: 'strom' | 'gas';
}

export default function CityComparisonPage({
  city,
  comparisonType,
}: CityComparisonPageProps) {
  const isStrom = comparisonType === 'strom';
  const pageLabel = `${isStrom ? 'Stromvergleich' : 'Gasvergleich'} ${city.name}`;
  const pagePath = isStrom ? getStromCityPath(city.slug) : getGasCityPath(city.slug);
  const parentPath = isStrom ? ROUTES.stromvergleich : ROUTES.gasvergleich;
  const parentLabel = isStrom ? 'Stromvergleich NRW' : 'Gasvergleich NRW';
  const faqItems = isStrom ? getStromCityFaqs(city) : getGasCityFaqs(city);
  const sampleConsumption = isStrom
    ? city.stromSampleConsumptionKwh
    : city.gasSampleConsumptionKwh;
  const savings = isStrom
    ? calcJahresersparnis(
        city.stromGrundversorgungCt,
        city.stromVergleichCt,
        city.stromSampleConsumptionKwh,
      )
    : calcJahresersparnis(
        city.gasGrundversorgungCt,
        city.gasVergleichCt,
        city.gasSampleConsumptionKwh,
      );
  const localProvider = isStrom ? city.stromGrundversorger : city.gasGrundversorger;
  const defaultPrice = isStrom ? city.stromGrundversorgungCt : city.gasGrundversorgungCt;
  const comparisonPrice = isStrom ? city.stromVergleichCt : city.gasVergleichCt;
  const moneyPageId = isStrom ? 'stromvergleich-nrw' : 'gasvergleich-nrw';
  const otherCities = CITIES.filter(({ slug }) => slug !== city.slug).slice(0, 6);

  const breadcrumbItems = [
    { label: 'Startseite', path: ROUTES.home },
    { label: parentLabel, path: parentPath },
    { label: pageLabel, path: pagePath },
  ];

  return (
    <div className="min-h-screen bg-background break-words leading-mobile">
      <Header />
      <main>
        <Breadcrumb items={breadcrumbItems} />

        <section className="w-full bg-primary py-20 md:py-28 text-primary-foreground">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                <MapPin className="h-4 w-4" />
                {city.name} · {city.postalCodeHint}
              </div>
              <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                {pageLabel} mit Live-Tarifen für {city.name}
              </h1>
              <p className="font-paragraph text-lg text-white/90 md:text-xl">
                {city.localIntro}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  onClick={() =>
                    document
                      .getElementById('vergleich')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="h-14 rounded-full bg-secondary px-8 text-lg font-semibold text-secondary-foreground hover:bg-secondary/90"
                >
                  {isStrom ? 'Strom live vergleichen' : 'Gas live vergleichen'}
                </Button>
                <Link
                  to={parentPath}
                  className="text-sm font-medium text-white/80 underline transition-colors hover:text-white"
                >
                  Zur NRW-Übersicht
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="vergleich" className="w-full bg-white py-20">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.9fr)] lg:px-8 lg:items-start">
            <AffiliateCtaBanner
              citySlug={city.slug}
              product={comparisonType}
              cityName={city.name}
              className="mb-6"
            />
            <VerivoxCalculatorEmbed
              title={`${isStrom ? 'Strom' : 'Gas'} live für ${city.name} vergleichen`}
              description={`Geben Sie Ihre Postleitzahl aus ${city.postalCodeHint} und Ihren Jahresverbrauch ein. Der Rechner zeigt aktuelle ${isStrom ? 'Strom' : 'Gas'}tarife mit Preisgarantie, Laufzeit und weiteren Tarifmerkmalen für ${city.name}.`}
              target={isStrom ? 'Energie_Strom_Privat_Rechner' : 'Energie_Gas_Privat_Rechner'}
              wmid={isStrom ? '104' : '102'}
              campaignId={`ev_${city.slug}_${comparisonType}`}
              trackingProductId={isStrom ? '93' : '99'}
            />

            <div className="space-y-6">
              <Card className="rounded-[1.75rem] border border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="font-heading text-xl text-primary">
                    Lokaler Marktüberblick für {city.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm leading-7 text-slate-600">
                  <div className="flex items-start gap-3">
                    <Building2 className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <p>
                      Lokal prägend ist häufig <strong>{localProvider}</strong>. Prüfen Sie den
                      konkreten Grundversorger zusätzlich immer anhand Ihrer Vertragsunterlagen.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Euro className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <p>
                      Beispielrechnung: rund <strong>{defaultPrice.toFixed(1)} ct/kWh</strong> in
                      der Grundversorgung gegenüber etwa{' '}
                      <strong>{comparisonPrice.toFixed(1)} ct/kWh</strong> im Vergleich.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <p>
                      Für belastbare Ergebnisse zählen vor allem echte PLZ, realistischer Verbrauch
                      und die Prüfung von Laufzeit, Bonus und Preisgarantie.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[1.75rem] border border-blue-100 bg-blue-50 shadow-sm">
                <CardHeader>
                  <CardTitle className="font-heading text-xl text-primary">
                    Beispielhafte Ersparnis in {city.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm leading-7 text-slate-700">
                  <p>
                    Für einen Beispielverbrauch von{' '}
                    <strong>{sampleConsumption.toLocaleString('de-DE')} kWh</strong> ergibt sich
                    rechnerisch ein Sparpotenzial von rund{' '}
                    <strong>{savings.toLocaleString('de-DE')} Euro pro Jahr</strong>.
                  </p>
                  <p>
                    Diese Orientierung ersetzt keine individuelle Tarifprüfung, zeigt aber, warum
                    ein Vergleich in {city.name} vor einem Vertragswechsel sinnvoll ist.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full bg-slate-50 py-20">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-start">
              <div className="space-y-6">
                <h2 className="font-heading text-3xl font-semibold tracking-tight text-primary">
                  Was für {city.name} besonders wichtig ist
                </h2>
                <div className="space-y-4">
                  {city.localHighlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                      <Zap className="mt-1 h-5 w-5 flex-shrink-0 text-secondary" />
                      <p className="font-paragraph text-sm leading-7 text-slate-700">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="rounded-[1.75rem] border border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="font-heading text-xl text-primary">
                    Weitere Städte in NRW
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {otherCities.map((otherCity) => {
                    const otherPath = isStrom
                      ? getStromCityPath(otherCity.slug)
                      : getGasCityPath(otherCity.slug);

                    return (
                      <Link
                        key={otherCity.slug}
                        to={otherPath}
                        className="group rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition-all hover:border-primary hover:bg-white hover:text-primary"
                      >
                        <span className="flex items-center justify-between gap-3">
                          {isStrom ? `${otherCity.name} Strom` : `${otherCity.name} Gas`}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </Link>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full bg-white py-20">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 space-y-3">
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-primary">
                Häufige Fragen zu {pageLabel}
              </h2>
              <p className="font-paragraph text-base text-slate-600">
                Kurz und praxisnah beantwortet für Haushalte in {city.name}.
              </p>
            </div>
            <Accordion type="single" collapsible className="rounded-[1.75rem] border border-slate-200 bg-white px-6 shadow-sm">
              {faqItems.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left font-heading text-lg text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-paragraph text-sm leading-7 text-slate-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <PassendeRatgeber moneyPageId={moneyPageId} limit={4} />
      </main>
      <DeferredFooter />
    </div>
  );
}
