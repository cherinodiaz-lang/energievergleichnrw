import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { ROUTES } from '@/lib/routes';
import { getPageSEO } from '@/lib/seo-config';

export default function WiderrufPage() {
  const seo = getPageSEO('widerruf');
  const breadcrumbItems = [
    { label: 'Startseite', path: '/' },
    { label: 'Widerrufsbelehrung', path: '/widerruf' },
  ];

  const breadcrumbSchema = [
    { name: 'Startseite', url: `${typeof window !== 'undefined' ? window.location.origin : ''}${ROUTES.home}` },
    { name: 'Widerrufsbelehrung', url: `${typeof window !== 'undefined' ? window.location.origin : ''}${ROUTES.widerruf}` },
  ];

  return (
    <div className="min-h-screen bg-background break-words leading-mobile">
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        ogTitle={seo.ogTitle}
        ogDescription={seo.ogDescription}
      />
      <BreadcrumbSchema items={breadcrumbSchema} />
      <Header />
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="w-full bg-primary text-primary-foreground py-20 md:py-32">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 leading-tight max-w-[22ch] sm:max-w-none break-words">
              Widerrufsbelehrung
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90">
              Ihr Widerrufsrecht bei Verträgen mit Energievergleich.shop
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full py-24 bg-white">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 break-words overflow-x-hidden min-w-0">

            {/* Info Box */}
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
              <h3 className="font-heading text-lg font-bold text-yellow-900 mb-4">⚠️ Wichtiger Hinweis</h3>
              <p className="font-paragraph text-sm text-yellow-800">
                Diese Widerrufsbelehrung informiert Sie über Ihr Widerrufsrecht gemäß § 312g BGB und § 355 BGB.
              </p>
            </div>

            {/* 1. Widerrufsrecht */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">1. Widerrufsrecht</h2>
              <p className="font-paragraph text-gray-700 leading-relaxed mb-4">
                Sie haben das Recht, Verträge, die Sie mit Energievergleich.shop geschlossen haben, innerhalb von 14 Tagen ohne Angabe von Gründen zu widerrufen.
              </p>
              <p className="font-paragraph text-gray-700 leading-relaxed">
                Die Widerrufsfrist beträgt 14 Tage ab dem Tag des Vertragsabschlusses. Zur Wahrung der Frist genügt die rechtzeitige Absendung des Widerrufs.
              </p>
            </div>

            {/* 2. Widerrufsformular */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">2. Widerrufsformular</h2>
              <p className="font-paragraph text-gray-700 leading-relaxed mb-4">
                Um Ihr Widerrufsrecht auszuüben, teilen Sie uns Ihren Widerruf schriftlich mit:
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 font-paragraph text-gray-700 space-y-3 break-words">
                <p><strong>Energievergleich.shop</strong></p>
                <p>E-Mail: <a href="mailto:widerruf@energievergleich.shop" className="text-primary hover:underline font-bold">widerruf@energievergleich.shop</a></p>
                <p>Postanschrift: Energievergleich.shop, Deutschland</p>
                <p className="text-sm text-gray-500 pt-3 border-t">Bitte geben Sie in Ihrer Mitteilung Ihre Vertragsnummer oder Bestellnummer an.</p>
              </div>
            </div>

            {/* 3. Musterformular */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">3. Musterformular für den Widerruf</h2>
              <p className="font-paragraph text-gray-700 leading-relaxed mb-4">
                Sie können folgendes Musterformular verwenden:
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 font-paragraph text-gray-700 space-y-3 break-words">
                <p className="font-bold">--- Beginn des Musters ---</p>
                <p>
                  Hiermit widerrufe ich den von mir abgeschlossenen Vertrag vom [Datum] für [Beschreibung der Leistung].
                </p>
                <p>
                  Meine Vertragsnummer: [Vertragsnummer]<br />
                  Mein Name: [Ihr Name]<br />
                  Meine Adresse: [Ihre Adresse]<br />
                  Meine E-Mail: [Ihre E-Mail]
                </p>
                <p className="font-bold">--- Ende des Musters ---</p>
              </div>
            </div>

            {/* 4. Folgen des Widerrufs */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">4. Folgen des Widerrufs</h2>
              <p className="font-paragraph text-gray-700 leading-relaxed mb-4">
                Im Falle eines wirksamen Widerrufs werden die beiderseitig empfangenen Leistungen rückgängig gemacht. Sollten Sie bereits Leistungen in Anspruch genommen haben, können Sie zur Zahlung einer angemessenen Vergütung verpflichtet sein.
              </p>
              <p className="font-paragraph text-gray-700 leading-relaxed">
                Alle Zahlungen werden unverzüglich, spätestens innerhalb von 14 Tagen nach Mitteilung des Widerrufs, erstattet.
              </p>
            </div>

            {/* 5. Ausnahmen */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">5. Ausnahmen vom Widerrufsrecht</h2>
              <p className="font-paragraph text-gray-700 leading-relaxed mb-4">
                Das Widerrufsrecht besteht nicht für:
              </p>
              <ul className="font-paragraph text-gray-700 space-y-2 list-disc list-inside">
                <li>Verträge, die vollständig erfüllt wurden, bevor Sie den Widerruf mitgeteilt haben</li>
                <li>Verträge für die Lieferung von Waren, die nach Kundenspezifikation angefertigt wurden</li>
                <li>Verträge für Dienstleistungen, wenn die Leistung bereits vollständig erbracht wurde</li>
              </ul>
            </div>

            {/* 6. Kontakt */}
            <div className="bg-blue-50 border-l-4 border-primary p-6 rounded">
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">6. Fragen zum Widerrufsrecht</h2>
              <p className="font-paragraph text-gray-700 leading-relaxed mb-4">
                Bei Fragen zu Ihrem Widerrufsrecht kontaktieren Sie uns:
              </p>
              <div className="font-paragraph text-gray-700">
                <p className="font-bold">Energievergleich.shop</p>
                <p>E-Mail: <a href="mailto:support@energievergleich.nrw" className="text-primary hover:underline font-bold">support@energievergleich.nrw</a></p>
                <p>Telefon: +49 211 1234567</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
