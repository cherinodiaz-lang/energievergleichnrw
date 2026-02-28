import StromvergleichCityLayout from '@/components/pages/stromvergleich/StromvergleichCityLayout';
import RelatedCities from '@/components/RelatedCities';
import FAQSchema from '@/components/FAQSchema';

const FAQ_ITEMS = [
  {
    question: 'Welche Daten brauche ich für den Stromvergleich in Bonn?',
    answer:
      'Für den Stromvergleich in Bonn reichen Postleitzahl und Ihr Jahresverbrauch (kWh). Optional hilft die Zählernummer für die spätere Beauftragung.',
  },
  {
    question: 'Ist der Stromanbieterwechsel in Bonn kostenlos?',
    answer:
      'Ja. Der Anbieterwechsel selbst ist kostenlos. Es fallen keine Gebühren für Kündigung oder Anmeldung an. Die Stromversorgung bleibt durchgehend gewährleistet.',
  },
  {
    question: 'Wie lange dauert ein Stromwechsel in Bonn?',
    answer:
      'Das hängt von der Kündigungsfrist Ihres aktuellen Vertrags ab. In der Praxis dauert ein Wechsel häufig einige Wochen.',
  },
] as const;

export default function StromvergleichBonnPage() {
  return (
    <StromvergleichCityLayout
      seo={{
        title: 'Stromvergleich Bonn | Stromtarife vergleichen & einfach wechseln',
        description:
          'Stromvergleich Bonn: Jetzt Tarife vergleichen & bis zu 300€ jährlich sparen. ✓ Kostenlos ✓ Unabhängig ✓ TÜV-geprüft. 1000+ Anbieter im Check!',
        keywords: 'Stromvergleich Bonn, Stromtarife Bonn, Stromanbieter Bonn, Stromwechsel Bonn',
        canonical: 'https://www.energievergleich.shop/stromvergleich-bonn',
        ogTitle: 'Stromvergleich Bonn | Stromtarife vergleichen & wechseln',
        ogDescription: 'Stromvergleich Bonn: Jetzt Tarife vergleichen & bis zu 300€ jährlich sparen. ✓ Kostenlos ✓ Unabhängig ✓ TÜV-geprüft. 1000+ Anbieter im Check!',
      }}
      breadcrumbLabel="Stromvergleich Bonn"
      breadcrumbPath="/stromvergleich-bonn"
      breadcrumbAbsoluteUrl="https://www.energievergleich.shop/stromvergleich-bonn"
      cityName="Bonn"
      citySlug="bonn"
    >
      <FAQSchema items={[...FAQ_ITEMS]} />

      <main className="min-h-screen bg-white">
        <section className="mx-auto w-full max-w-5xl px-4 py-10">
          <header className="mb-8">
            <p className="text-sm text-gray-500">Stromvergleich in NRW</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
              Stromvergleich Bonn: Günstige Stromtarife für Ihre Region finden
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              Bonn ist eine wachsende Stadt mit vielfältigen Wohn- und Gewerbestrukturen. Ein regelmäßiger Stromvergleich hilft dir,
              passende Konditionen zu finden – besonders nach Umzug oder wenn Preisgarantien auslaufen.
            </p>
          </header>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Stromanbieter in Bonn: Grundversorgung vs. Alternativtarife</h2>
            <p className="text-gray-700 leading-relaxed">
              Ohne aktive Tarifwahl erfolgt die Belieferung über die Grundversorgung. Das ist unkompliziert, aber nicht automatisch günstig.
              Mit einem Vergleich kannst du Tarife nach Laufzeiten, Preisgarantie und Service sortieren.
            </p>

            <h3 className="text-xl font-semibold text-gray-900">So funktioniert der Stromvergleich in Bonn</h3>
            <ol className="list-decimal pl-5 text-gray-700 space-y-2">
              <li>Postleitzahl in Bonn eingeben.</li>
              <li>Jahresverbrauch aus der letzten Rechnung übernehmen (oder realistisch schätzen).</li>
              <li>Tarife nach Laufzeit, Preisgarantie und Ökostrom filtern.</li>
              <li>Tarifdetails prüfen (Bonusbedingungen, Kündigungsfristen, Service).</li>
              <li>Wechsel online vorbereiten – die Versorgung bleibt durchgehend gesichert.</li>
            </ol>

            <h2 className="text-2xl font-semibold text-gray-900">Worauf Haushalte in Bonn beim Stromtarif achten sollten</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Transparente Konditionen ohne versteckte Bonus-Fallen.</li>
              <li>Preisgarantie und Laufzeit passend zur persönlichen Planung.</li>
              <li>Ökostrom möglich, wenn es für dich relevant ist.</li>
              <li>Guter Support und klare Kommunikation.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900">FAQ</h2>
            <div className="divide-y divide-gray-200 rounded-lg border border-gray-200">
              <details className="p-4">
                <summary className="cursor-pointer font-medium text-gray-900">Wie schnell kann ich in Bonn wechseln?</summary>
                <p className="mt-2 text-gray-700">
                  Das hängt von deinem aktuellen Vertrag und der Kündigungsfrist ab. Der neue Anbieter übernimmt üblicherweise die Kündigung
                  und koordiniert den Wechsel.
                </p>
              </details>
              <details className="p-4">
                <summary className="cursor-pointer font-medium text-gray-900">Bleibt die Stromversorgung gesichert?</summary>
                <p className="mt-2 text-gray-700">Ja. Die Versorgung läuft weiter; der Netzbetreiber bleibt derselbe.</p>
              </details>
              <details className="p-4">
                <summary className="cursor-pointer font-medium text-gray-900">Was brauche ich für den Vergleich?</summary>
                <p className="mt-2 text-gray-700">
                  Postleitzahl, Jahresverbrauch und idealerweise Daten aus der letzten Rechnung. Den Tarifrechner integrieren wir im nächsten
                  Schritt.
                </p>
              </details>
            </div>
          </section>

          <footer className="mt-10 rounded-lg bg-gray-50 p-6">
            <h2 className="text-xl font-semibold text-gray-900">Nächster Schritt</h2>
            <p className="mt-2 text-gray-700">
              Der Tarifrechner wird später ergänzt. Diese Seite bildet bereits das SEO- und Struktur-Fundament, damit wir danach sauber
              erweitern können.
            </p>
          </footer>
        </section>
      </main>
    </StromvergleichCityLayout>
  );
}
