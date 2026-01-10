import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Impressum | Energievergleich"
        description="Impressum und rechtliche Informationen von Energievergleich.shop"
        keywords="Impressum, Rechtliche Informationen, Kontakt"
        ogTitle="Impressum | Energievergleich"
        ogDescription="Impressum und rechtliche Informationen."
      />
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-primary text-primary-foreground py-20 md:py-32">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Impressum
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90">
              Rechtliche Informationen gemäß § 5 TMG und § 18 MStV
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Hinweis */}
            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
              <p className="font-paragraph text-sm text-blue-800">
                <strong>Hinweis:</strong> Dies ist eine Muster-Vorlage. Unternehmensdaten werden ergänzt.
              </p>
            </div>

            {/* 1. Betreiber */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">1. Angaben gemäß § 5 DDG</h2>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 font-paragraph text-gray-700">
                <div>
                  <p className="font-bold mb-2">Betreiber der Website:</p>
                  <p>Energievergleich Muster GmbH</p>
                  <p>Rechtsform: Gesellschaft mit beschränkter Haftung (GmbH)</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Anschrift:</p>
                  <p>Musterstraße 1<br />40210 Düsseldorf<br />Deutschland</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Kontaktinformationen:</p>
                  <p>Telefon: +49 000 0000000<br />E-Mail: kontakt@energievergleich.shop<br />Website: energievergleich.shop</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Geschäftsführer:</p>
                  <p>Max Mustermann</p>
                </div>
              </div>
            </div>

            {/* 2. Registrierung */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">2. Registrierung und Steuernummern</h2>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 font-paragraph text-gray-700">
                <div>
                  <p className="font-bold mb-2">Umsatzsteuer-Identifikationsnummer (gemäß § 27 a UStG):</p>
                  <p>DE000000000</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Handelsregister-Eintrag:</p>
                  <p>Amtsgericht Düsseldorf, HRB 00000</p>
                </div>
              </div>
            </div>

            {/* 3. Verantwortlich i.S.d. § 18 MStV */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">3. Verantwortlich i.S.d. § 18 MStV (Medienstaatsvertrag)</h2>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 font-paragraph text-gray-700">
                <p className="text-sm text-gray-500 mb-4">Redaktionell verantwortliche Person für die Inhalte dieser Website:</p>
                <div>
                  <p className="font-bold mb-2">Name:</p>
                  <p>Max Mustermann</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Anschrift:</p>
                  <p>Musterstraße 1<br />40210 Düsseldorf<br />Deutschland</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-2">Erreichbarkeit:</p>
                  <p>Telefon: +49 000 0000000<br />E-Mail: kontakt@energievergleich.shop</p>
                </div>
              </div>
            </div>

            {/* 4. Berufsrechtliche Angaben (optional) */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">4. Berufsrechtliche Angaben</h2>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 font-paragraph text-gray-700">
                <p className="text-sm text-gray-500 mb-4">Energievergleich Muster GmbH ist nicht Mitglied einer Handwerkskammer oder Industrie- und Handelskammer und unterliegt keinen besonderen berufsrechtlichen Regelungen.</p>
              </div>
            </div>

            {/* 5. Haftung */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">5. Haftung für Inhalte</h2>
              
              <p className="font-paragraph text-gray-700 leading-relaxed">
                Die Inhalte unserer Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
            </div>

            {/* 6. Haftung für Links */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">6. Haftung für Links</h2>
              
              <p className="font-paragraph text-gray-700 leading-relaxed">
                Unsere Website enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Sollten wir von rechtswidrigen Inhalten auf verlinkten Seiten erfahren, werden wir den Link unverzüglich entfernen.
              </p>
            </div>

            {/* 7. Urheberrecht */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">7. Urheberrecht und Nutzungsrechte</h2>
              
              <p className="font-paragraph text-gray-700 leading-relaxed mb-4">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des Autors oder Urhebers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
              </p>
              
              <p className="font-paragraph text-gray-700 leading-relaxed">
                Soweit Inhalte auf dieser Seite nicht von uns erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
              </p>
            </div>

            {/* 8. Datenschutz */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">8. Datenschutz</h2>
              
              <p className="font-paragraph text-gray-700 leading-relaxed">
                Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben. Weitere Informationen finden Sie in unserer <a href="/datenschutz" className="text-primary hover:underline font-bold">Datenschutzerklärung</a>.
              </p>
            </div>

            {/* 9. Online-Streitbeilegung */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">9. Online-Streitbeilegung (EU-OS)</h2>
              
              <p className="font-paragraph text-gray-700 leading-relaxed mb-4">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
              </p>
              
              <p className="font-paragraph text-gray-700 mb-4">
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              
              <p className="font-paragraph text-gray-700 leading-relaxed">
                Unsere E-Mail-Adresse für Kontaktaufnahmen finden Sie oben in den Kontaktinformationen.
              </p>
            </div>

            {/* 10. Verbraucherstreitbeilegung */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">10. Verbraucherstreitbeilegung / Universalschiedsverfahren</h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 font-paragraph text-gray-700">
                <p className="font-bold mb-2">Teilnahme an Verbraucherstreitbeilegung:</p>
                <p>Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
              </div>
            </div>

            {/* Hinweis */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <p className="font-paragraph text-sm text-gray-700">
                <strong>Hinweis:</strong> Dieses Impressum ist ein rechtlich verbindliches Dokument. Bitte stellen Sie sicher, dass alle Angaben korrekt und vollständig sind. Im Zweifelsfall konsultieren Sie einen Rechtsanwalt.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
