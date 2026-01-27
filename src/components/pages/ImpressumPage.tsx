import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { ROUTES } from '@/lib/routes';

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-background break-words leading-mobile">
      <SEOHead
        title="Impressum | Energievergleich"
        description="Impressum und rechtliche Informationen von Energievergleich"
        keywords="Impressum, Rechtliche Informationen, Kontakt"
        ogTitle="Impressum | Energievergleich"
        ogDescription="Impressum und rechtliche Informationen."
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
          <div className="space-y-8 break-words">
            {/* Hinweis */}
            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
              <p className="font-paragraph text-sm text-blue-800">
                <strong>Hinweis:</strong> Dieses Impressum enthält Platzhalter. Bitte ersetzen Sie diese mit den tatsächlichen Unternehmensdaten.
              </p>
            </div>

            {/* 1. Betreiber */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">1. Angaben gemäß § 5 TMG</h2>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 font-paragraph text-slate-900 break-words">
                <div>
                  <p className="font-bold mb-2">Betreiber der Website:</p>
                  <p>[UNTERNEHMEN_NAME]</p>
                  <p>Rechtsform: [RECHTSFORM]</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Anschrift:</p>
                  <p>[STRASSE] [HAUSNUMMER]<br />[POSTLEITZAHL] [STADT]<br />[LAND]</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Kontaktinformationen:</p>
                  <p>Telefon: [TELEFON]<br />E-Mail: [EMAIL]<br />Website: [WEBSITE]</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Geschäftsführer/Inhaber:</p>
                  <p>[GESCHAEFTSFUEHRER_NAME]</p>
                </div>
              </div>
            </div>

            {/* 2. Registrierung */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">2. Registrierung und Steuernummern</h2>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 font-paragraph text-slate-900 break-words">
                <div>
                  <p className="font-bold mb-2">Umsatzsteuer-Identifikationsnummer (gemäß § 27 a UStG):</p>
                  <p>[UST_ID_NUMMER]</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Handelsregister-Eintrag:</p>
                  <p>[AMTSGERICHT], [HANDELSREGISTER_NUMMER]</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Steuernummer:</p>
                  <p>[STEUERNUMMER]</p>
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
                  <p>[REDAKTION_NAME]</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Anschrift:</p>
                  <p>[STRASSE] [HAUSNUMMER]<br />[POSTLEITZAHL] [STADT]<br />[LAND]</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Erreichbarkeit:</p>
                  <p>Telefon: [TELEFON]<br />E-Mail: [EMAIL]</p>
                </div>
              </div>
            </div>

            {/* 4. Berufsrechtliche Angaben */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">4. Berufsrechtliche Angaben</h2>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 font-paragraph text-slate-900 break-words">
                <p className="text-sm text-gray-500 mb-4">Berufsrechtliche Regelungen und Zugehörigkeiten:</p>
                <p>[BERUFSRECHTLICHE_INFORMATIONEN]</p>
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

            {/* 9. Online-Streitbeilegung */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">9. Online-Streitbeilegung (EU-OS)</h2>
              
              <p className="font-paragraph text-slate-900 leading-relaxed mb-4 py-2">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
              </p>
              
              <p className="font-paragraph text-slate-900 mb-4 py-2">
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold break-all">
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              
              <p className="font-paragraph text-slate-900 leading-relaxed py-2">
                Unsere E-Mail-Adresse für Kontaktaufnahmen finden Sie oben in den Kontaktinformationen.
              </p>
            </div>

            {/* 10. Verbraucherstreitbeilegung */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">10. Verbraucherstreitbeilegung / Universalschiedsverfahren</h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 font-paragraph text-slate-900 break-words">
                <p className="font-bold mb-2">Teilnahme an Verbraucherstreitbeilegung:</p>
                <p>[VERBRAUCHERSTREITBEILEGUNG_INFO]</p>
              </div>
            </div>

            {/* Hinweis */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <p className="font-paragraph text-sm text-slate-900">
                <strong>Hinweis:</strong> Dieses Impressum ist ein rechtlich verbindliches Dokument. Bitte stellen Sie sicher, dass alle Platzhalter mit den tatsächlichen Daten ersetzt werden. Im Zweifelsfall konsultieren Sie einen Rechtsanwalt.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
