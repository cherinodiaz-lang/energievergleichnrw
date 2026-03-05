import { useEffect } from 'react';
import StromvergleichCityLayout from '@/components/pages/stromvergleich/StromvergleichCityLayout';
import RelatedCities from '@/components/RelatedCities';

export default function StromvergleichMuensterPage() {
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Welche Daten brauche ich für den Stromvergleich in Münster?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Für den Stromvergleich in Münster reichen Postleitzahl und Ihr Jahresverbrauch (kWh). Optional hilft die Zählernummer für die spätere Beauftragung.',
          },
        },
        {
          '@type': 'Question',
          name: 'Ist der Stromanbieterwechsel in Münster kostenlos?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja. Der Anbieterwechsel selbst ist kostenlos. Es fallen keine Gebühren für Kündigung oder Anmeldung an. Die Stromversorgung bleibt durchgehend gewährleistet.',
          },
        },
        {
          '@type': 'Question',
          name: 'Wie lange dauert ein Stromwechsel in Münster?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Das hängt von der Kündigungsfrist Ihres aktuellen Vertrags ab. In der Praxis dauert ein Wechsel häufig einige Wochen.',
          },
        },
      ],
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <StromvergleichCityLayout
      seo={{
        title: 'Stromvergleich Münster | Stromtarife vergleichen & einfach wechseln',
        description:
          'Stromvergleich Münster: Tarife vergleichen & bis zu 300€ jährlich sparen. ✓ Kostenlos ✓ Unabhängig ✓ TÜV-geprüft. Über 1000 Anbieter!',
        keywords:
          'Stromvergleich Münster, Stromtarife Münster, Stromanbieter Münster, Stromwechsel Münster',
        canonical: 'https://www.energievergleich.shop/stromvergleich-muenster',
        ogTitle: 'Stromvergleich Münster | Stromtarife vergleichen & wechseln',
        ogDescription:
          'Stromvergleich Münster: Tarife vergleichen & bis zu 300€ jährlich sparen. ✓ Kostenlos ✓ Unabhängig ✓ TÜV-geprüft. Über 1000 Anbieter!',
      }}
      breadcrumbLabel="Stromvergleich Münster"
      breadcrumbPath="/stromvergleich-muenster"
      breadcrumbAbsoluteUrl="https://www.energievergleich.shop/stromvergleich-muenster"
      cityName="Münster"
      citySlug="muenster"
    >
      <main className="min-h-screen bg-white">
        <section className="mx-auto w-full max-w-5xl px-4 py-10">
          <header className="mb-8">
            <p className="text-sm text-gray-500">Stromvergleich in NRW</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
              Stromvergleich Münster: Günstige Stromtarife für Ihre Region finden
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              Münster ist eine dynamische Stadt mit vielen Haushalten, Studierenden und Unternehmen.
              Ein regelmäßiger Stromvergleich hilft dir, Kosten zu optimieren und Konditionen wie
              Laufzeit oder Preisgarantie passend zu wählen.
            </p>
          </header>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Stromanbieter in Münster: Grundversorgung vs. Alternativtarife
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Wenn du keinen Tarif auswählst, erfolgt die Belieferung über die Grundversorgung. Ein
              Vergleich ermöglicht, bessere Konditionen zu finden und Tarife transparent zu
              bewerten.
            </p>

            <h3 className="text-xl font-semibold text-gray-900">
              So funktioniert der Stromvergleich in Münster
            </h3>
            <ol className="list-decimal pl-5 text-gray-700 space-y-2">
              <li>Postleitzahl in Münster eingeben.</li>
              <li>
                Jahresverbrauch aus der letzten Rechnung übernehmen (oder realistisch schätzen).
              </li>
              <li>Tarife nach Laufzeit, Preisgarantie und Ökostrom filtern.</li>
              <li>Tarifdetails prüfen (Bonusbedingungen, Kündigungsfristen, Service).</li>
              <li>Wechsel online vorbereiten – die Versorgung bleibt durchgehend gesichert.</li>
            </ol>

            <h2 className="text-2xl font-semibold text-gray-900">FAQ</h2>
            <div className="divide-y divide-gray-200 rounded-lg border border-gray-200">
              <details className="p-4">
                <summary className="cursor-pointer font-medium text-gray-900">
                  Lohnt sich ein Vergleich auch bei wenig Verbrauch?
                </summary>
                <p className="mt-2 text-gray-700">
                  Ja, gerade dann lohnt sich der Blick auf den Grundpreis. Bei niedrigem Verbrauch
                  kann ein hoher Grundpreis den Tarif unnötig verteuern.
                </p>
              </details>
              <details className="p-4">
                <summary className="cursor-pointer font-medium text-gray-900">
                  Kann ich Ökostrom in Münster wählen?
                </summary>
                <p className="mt-2 text-gray-700">
                  Ja. Viele Anbieter bieten Ökostrom-Tarife. Achte auf transparente Bedingungen und
                  nachvollziehbare Herkunftsnachweise.
                </p>
              </details>
            </div>
          </section>

          <footer className="mt-10 rounded-lg bg-gray-50 p-6">
            <h2 className="text-xl font-semibold text-gray-900">Nächster Schritt</h2>
            <p className="mt-2 text-gray-700">
              Der Tarifrechner wird später ergänzt. Dieses Grundkonstrukt ist bereits sauber
              strukturiert, damit wir danach intern verlinken, Sitemap/Indexierung stärken und die
              Vergleichsstrecke anbinden können.
            </p>
          </footer>
        </section>
      </main>

      <RelatedCities currentCity="muenster" />
    </StromvergleichCityLayout>
  );
}
