import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { ROUTES } from '@/lib/routes';
import { getPageSEO } from '@/lib/seo-config';

export default function AgbPage() {
  const seo = getPageSEO('agb');
  const breadcrumbItems = [
    { label: 'Startseite', path: '/' },
    { label: 'AGB', path: '/agb' },
  ];

  const breadcrumbSchema = [
    { name: 'Startseite', url: `${typeof window !== 'undefined' ? window.location.origin : ''}${ROUTES.home}` },
    { name: 'AGB', url: `${typeof window !== 'undefined' ? window.location.origin : ''}${ROUTES.agb}` },
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
              Allgemeine Geschäftsbedingungen
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90">
              Rechtliche Bedingungen für die Nutzung unserer Website und Services
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full py-24 bg-white">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 break-words overflow-x-hidden min-w-0">

            {/* 1. Geltungsbereich */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">1. Geltungsbereich und Vertragsparteien</h2>
              <p className="font-paragraph text-gray-700 leading-relaxed mb-4">
                Diese Allgemeinen Geschäftsbedingungen (AGB) regeln die Nutzung der Website energievergleich.shop und aller damit verbundenen Services. Mit der Nutzung unserer Website erkennen Sie diese Bedingungen an.
              </p>
              <p className="font-paragraph text-gray-700 leading-relaxed">
                Vertragspartner ist Energievergleich.shop. Die Nutzung der Website ist kostenlos. Wir behalten uns das Recht vor, diese Bedingungen jederzeit zu ändern.
              </p>
            </div>

            {/* 2. Nutzungsrechte */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">2. Nutzungsrechte und Beschränkungen</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-heading text-xl font-bold text-primary mb-2">2.1 Erlaubte Nutzung</h3>
                  <p className="font-paragraph text-gray-700 leading-relaxed">
                    Sie dürfen unsere Website nur für persönliche, nicht-kommerzielle Zwecke nutzen. Die Inhalte dürfen heruntergeladen und für den privaten Gebrauch verwendet werden.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-primary mb-2">2.2 Untersagte Nutzung</h3>
                  <p className="font-paragraph text-gray-700 leading-relaxed mb-3">Folgende Handlungen sind untersagt:</p>
                  <ul className="font-paragraph text-gray-700 space-y-2 list-disc list-inside">
                    <li>Vervielfältigung oder Verbreitung von Inhalten ohne Genehmigung</li>
                    <li>Automatisiertes Auslesen oder Scraping von Daten</li>
                    <li>Reverse Engineering oder Dekompilierung</li>
                    <li>Störung oder Beeinträchtigung der Website-Funktionalität</li>
                    <li>Verbreitung von Malware oder Schadsoftware</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 3. Vergleichsservice */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">3. Vergleichsservice und Informationen</h2>
              <p className="font-paragraph text-gray-700 leading-relaxed mb-4">
                Unser Vergleichsservice stellt Informationen über Energietarife zur Verfügung. Diese Informationen werden mit größter Sorgfalt zusammengestellt, sind aber ohne Gewähr. Wir übernehmen keine Haftung für die Richtigkeit, Vollständigkeit oder Aktualität der Tarife.
              </p>
              <p className="font-paragraph text-gray-700 leading-relaxed">
                Die angezeigten Tarife können sich jederzeit ändern. Für verbindliche Angebote wenden Sie sich bitte direkt an die Energieversorger.
              </p>
            </div>

            {/* 4. Formularübermittlung */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">4. Formularübermittlung und Kontaktaufnahme</h2>
              <p className="font-paragraph text-gray-700 leading-relaxed mb-4">
                Durch die Übermittlung eines Formulars auf unserer Website erklären Sie sich damit einverstanden, dass Ihre Daten an Energieversorger und Partner weitergeleitet werden können, um Ihnen Angebote zu unterbreiten.
              </p>
              <p className="font-paragraph text-gray-700 leading-relaxed">
                Sie können der Weitergabe Ihrer Daten jederzeit widersprechen. Weitere Informationen finden Sie in unserer Datenschutzerklärung.
              </p>
            </div>

            {/* 5. Haftungsbeschränkung */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">5. Haftungsbeschränkung</h2>
              <p className="font-paragraph text-gray-700 leading-relaxed mb-4">
                Energievergleich.shop haftet nicht für:
              </p>
              <ul className="font-paragraph text-gray-700 space-y-2 list-disc list-inside mb-4">
                <li>Fehler oder Ausfälle der Website</li>
                <li>Verlust oder Beschädigung von Daten</li>
                <li>Indirekte oder Folgeschäden</li>
                <li>Inhalte von verlinkten Websites</li>
                <li>Unterbrechungen oder Verzögerungen</li>
              </ul>
              <p className="font-paragraph text-gray-700 leading-relaxed">
                Diese Haftungsbeschränkung gilt nicht für Schäden aus Vorsatz oder grober Fahrlässigkeit.
              </p>
            </div>

            {/* 6. Externe Links */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">6. Externe Links und Verweise</h2>
              <p className="font-paragraph text-gray-700 leading-relaxed">
                Unsere Website kann Links zu externen Websites enthalten. Wir sind nicht verantwortlich für den Inhalt dieser Websites. Die Verlinkung erfolgt ohne Gewähr und ohne Haftung für die Inhalte der verlinkten Seiten.
              </p>
            </div>

            {/* 7. Änderungen */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">7. Änderungen dieser Bedingungen</h2>
              <p className="font-paragraph text-gray-700 leading-relaxed">
                Wir behalten uns das Recht vor, diese AGB jederzeit zu ändern. Änderungen werden auf dieser Seite veröffentlicht. Die weitere Nutzung der Website nach Veröffentlichung von Änderungen gilt als Zustimmung zu den neuen Bedingungen.
              </p>
            </div>

            {/* 8. Kontakt */}
            <div className="bg-blue-50 border-l-4 border-primary p-6 rounded">
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">8. Kontakt und Fragen</h2>
              <p className="font-paragraph text-gray-700 leading-relaxed">
                Bei Fragen zu diesen AGB kontaktieren Sie uns unter:
              </p>
              <div className="mt-4 font-paragraph text-gray-700">
                <p className="font-bold">Energievergleich.shop</p>
                <p>E-Mail: <a href="mailto:support@energievergleich.nrw" className="text-primary hover:underline font-bold">support@energievergleich.nrw</a></p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
