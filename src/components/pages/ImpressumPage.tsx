import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { ROUTES } from '@/lib/routes';
import { getPageSEO } from '@/lib/seo-config';

export default function ImpressumPage() {
  const seo = getPageSEO('impressum');

  return (
    <div className="min-h-screen bg-background break-words leading-mobile">
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        ogTitle={seo.ogTitle}
        ogDescription={seo.ogDescription}
      />
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-primary text-primary-foreground py-20 md:py-32">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Impressum
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90">
              Rechtliche Informationen gemäß § 5 TMG und § 18 MStV
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="space-y-8 break-words overflow-x-hidden min-w-0">

            {/* 1. Betreiber */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">1. Angaben gemäß § 5 TMG</h2>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 font-paragraph text-slate-900 break-words">
                <div>
                  <p className="font-bold mb-2">Betreiber der Website:</p>
                  <p>Energievergleich.shop</p>
                  <p>Rechtsform: Einzelunternehmen</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Anschrift:</p>
                  <p>Energievergleich.shop<br />Geschäftsstelle<br />Deutschland</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Kontaktinformationen:</p>
                  <p>E-Mail: <a href="mailto:support@energievergleich.nrw" className="text-primary hover:underline font-bold">support@energievergleich.nrw</a><br />Website: <a href="https://www.energievergleich.shop" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">https://www.energievergleich.shop</a></p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Inhaber/Geschäftsführer:</p>
                  <p>Energievergleich.shop</p>
                </div>
              </div>
            </div>

            {/* 2. Registrierung */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">2. Registrierung und Steuernummern</h2>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 font-paragraph text-slate-900 break-words">
                <div>
                  <p className="font-bold mb-2">Umsatzsteuer-Identifikationsnummer (gemäß § 27 a UStG):</p>
                  <p>Auf Anfrage verfügbar</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Handelsregister-Eintrag:</p>
                  <p>Nicht erforderlich für Einzelunternehmen ohne Kaufmannseigenschaft</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Steuernummer:</p>
                  <p>Auf Anfrage verfügbar</p>
                </div>
              </div>
            </div>

            {/* 3. Verantwortlich i.S.d. § 18 MStV */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">3. Verantwortlich i.S.d. § 18 MStV (Medienstaatsvertrag)</h2>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 font-paragraph text-slate-900 break-words">
                <p className="text-sm text-gray-500 mb-4">Redaktionell verantwortliche Person für die Inhalte dieser Website:</p>
                <div>
                  <p className="font-bold mb-2">Name:</p>
                  <p>Energievergleich.shop</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Erreichbarkeit:</p>
                  <p>E-Mail: <a href="mailto:info@energievergleich.shop" className="text-primary hover:underline font-bold">info@energievergleich.shop</a></p>
                </div>
              </div>
            </div>

            {/* 4. Berufsrechtliche Angaben */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">4. Berufsrechtliche Angaben</h2>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 font-paragraph text-slate-900 break-words">
                <p className="text-sm text-gray-500 mb-4">Berufsrechtliche Regelungen und Zugehörigkeiten:</p>
                <p>Energievergleich.shop ist ein Informations- und Vergleichsportal für Energieversorgung. Es unterliegen keine speziellen berufsrechtlichen Regelungen für diese Tätigkeit.</p>
              </div>
            </div>

            {/* 5. Haftung für Inhalte */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">5. Haftung für Inhalte</h2>

              <p className="font-paragraph text-slate-900 leading-relaxed py-2">
                Die Inhalte unserer Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
            </div>

            {/* 6. Haftung für Links */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">6. Haftung für Links</h2>

              <p className="font-paragraph text-slate-900 leading-relaxed py-2">
                Unsere Website enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Sollten wir von rechtswidrigen Inhalten auf verlinkten Seiten erfahren, werden wir den Link unverzüglich entfernen.
              </p>
            </div>

            {/* 7. Urheberrecht */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">7. Urheberrecht und Nutzungsrechte</h2>

              <p className="font-paragraph text-slate-900 leading-relaxed mb-4 py-2">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des Autors oder Urhebers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
              </p>

              <p className="font-paragraph text-slate-900 leading-relaxed py-2">
                Soweit Inhalte auf dieser Seite nicht von uns erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
              </p>
            </div>

            {/* 8. Datenschutz */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">8. Datenschutz</h2>

              <p className="font-paragraph text-slate-900 leading-relaxed py-2">
                Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben. Weitere Informationen finden Sie in unserer <a href={ROUTES.datenschutz} className="text-primary hover:underline font-bold py-2 inline-block">Datenschutzerklärung</a>.
              </p>
            </div>

            {/* 9. Hinweis nach § 36 VSBG */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">9. Hinweis nach § 36 VSBG (Verbraucherstreitbeilegungsgesetz)</h2>

              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 font-paragraph text-slate-900 break-words">
                <p className="font-bold mb-4">Teilnahme an Verbraucherstreitbeilegung:</p>
                <p className="mb-4">
                  <strong>NEIN</strong> – Energievergleich.shop nimmt nicht an einem Verbraucherstreitbeilegungsverfahren teil.
                </p>
                <p className="text-sm text-gray-700">
                  Energievergleich.shop ist nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. Für Beschwerden und Reklamationen kontaktieren Sie uns bitte direkt unter <a href="mailto:info@energievergleich.shop" className="text-primary hover:underline font-bold">info@energievergleich.shop</a>.
                </p>
              </div>
            </div>

            {/* 11. Verbraucherstreitbeilegung */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">11. Verbraucherstreitbeilegung / Universalschiedsverfahren</h2>

              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 font-paragraph text-slate-900 break-words">
                <p className="font-bold mb-4">Teilnahme an Verbraucherstreitbeilegung:</p>
                <p className="mb-4">
                  <strong>NEIN</strong> – Energievergleich.shop nimmt nicht an einem Verbraucherstreitbeilegungsverfahren teil.
                </p>
                <p className="text-sm text-gray-700">
                  Energievergleich.shop ist nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. Für Beschwerden und Reklamationen kontaktieren Sie uns bitte direkt unter <a href="mailto:kontakt@energievergleich.shop" className="text-primary hover:underline font-bold">kontakt@energievergleich.shop</a>.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
