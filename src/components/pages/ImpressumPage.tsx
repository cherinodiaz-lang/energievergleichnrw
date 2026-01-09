import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Impressum - Energievergleich NRW"
        description="Impressum und rechtliche Informationen von Energievergleich NRW."
        keywords="Impressum, Rechtliche Informationen"
        ogTitle="Impressum - Energievergleich NRW"
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
              Rechtliche Informationen und Kontaktdaten
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
            className="prose prose-lg max-w-none"
          >
            <h2 className="font-heading text-3xl font-bold text-primary mb-6">Angaben gemäß § 5 TMG</h2>

            <div className="space-y-8">
              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Verantwortliche Person</h3>
                <p className="font-paragraph text-gray-700 mb-2">
                  [Name des Unternehmens]<br />
                  [Straße und Hausnummer]<br />
                  [Postleitzahl] [Stadt]<br />
                  Deutschland
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Kontaktinformationen</h3>
                <p className="font-paragraph text-gray-700">
                  Telefon: +49 211 1234567<br />
                  E-Mail: kontakt@energievergleich.nrw
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Umsatzsteuer-ID</h3>
                <p className="font-paragraph text-gray-700">
                  Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                  [USt-ID-Nummer]
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Haftung für Inhalte</h3>
                <p className="font-paragraph text-gray-700">
                  Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Haftung für Links</h3>
                <p className="font-paragraph text-gray-700">
                  Unsere Website enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Urheberrecht</h3>
                <p className="font-paragraph text-gray-700">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des Autors oder Urhebers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Datenschutz</h3>
                <p className="font-paragraph text-gray-700">
                  Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Streitbeilegung</h3>
                <p className="font-paragraph text-gray-700">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/. Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Verbraucherstreitbeilegung / Universalschiedsverfahren</h3>
                <p className="font-paragraph text-gray-700">
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
                <p className="font-paragraph text-sm text-gray-700">
                  <strong>Hinweis:</strong> Dieses Impressum ist ein Muster und muss mit den tatsächlichen Daten des Unternehmens aktualisiert werden. Bitte ergänzen Sie alle mit [Klammern] gekennzeichneten Felder mit den korrekten Informationen.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
