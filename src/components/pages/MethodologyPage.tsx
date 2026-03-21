import { motion } from 'framer-motion';
import { CheckCircle, Shield, TrendingUp, BarChart3, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import RelatedPages from '@/components/RelatedPages';
import { Link } from 'react-router-dom';
import { getRelatedPages } from '@/lib/internal-linking';
import { ROUTES } from '@/lib/routes';
import { getPageSEO } from '@/lib/seo-config';

export default function MethodologyPage() {
  const seo = getPageSEO('methodik');

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
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 leading-tight">
              Methodik & Transparenz
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90 mb-4">
              Wie wir arbeiten, welche Daten wir nutzen und wie wir Unabhängigkeit gewährleisten.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full py-24 bg-white">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Responsible Person */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="font-heading text-3xl font-bold text-primary">Verantwortliche Person</h2>
              <Card className="border-l-4 border-secondary">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div>
                      <p className="font-paragraph font-bold text-gray-800">Name:</p>
                      <p className="font-paragraph text-gray-700">Joel Cherino</p>
                    </div>
                    <div>
                      <p className="font-paragraph font-bold text-gray-800">Rolle & Bio:</p>
                      <p className="font-paragraph text-gray-700">
                        Betreiber von energievergleich.shop mit Fokus auf Nordrhein-Westfalen. Ziel: einfache, transparente und nutzerorientierte Tarif- und PV-Vergleiche sowie unverbindliche Angebotsanfragen.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Data Sources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="font-heading text-3xl font-bold text-primary">Datenquellen & Nutzung</h2>
              <p className="font-paragraph text-lg text-gray-700">
                <strong>Transparenz ist unser Grundprinzip:</strong> Wir nutzen die in unserem Vergleich/Rechner hinterlegten Tarif- und Anbieterinformationen sowie öffentlich verfügbare Anbieter-Preisblätter und Produktinformationen. Es gibt keine versteckten Datenquellen.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading text-xl flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      Tarifinformationen
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-gray-700">
                      Aus den im Vergleich/Rechner hinterlegten Tarif- und Anbieterinformationen sowie öffentlich verfügbaren Anbieter-Preisblättern und Produktinformationen (wo vorhanden).
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading text-xl flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      Preisbestandteile
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-gray-700">
                      Grundpreis/Arbeitspreis, Vertragslaufzeit, Kündigungsfrist, Boni/Neukundenboni (wenn angegeben), Abrechnungs- und Zahlungsmodelle.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading text-xl flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Regionale Faktoren
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-gray-700">
                      PLZ-/Region-Zuordnung über die Nutzerangaben (PLZ) zur Darstellung passender Tarife und Optionen für Ihre genaue Region.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading text-xl flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Keine versteckten Quellen
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-gray-700">
                      Alle Daten stammen aus transparenten, öffentlich verfügbaren Quellen. Wir nutzen keine proprietären oder versteckten Datenbanken.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Update Frequency */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="font-heading text-3xl font-bold text-primary">Aktualisierungshäufigkeit</h2>
              <Card className="bg-blue-50 border-l-4 border-blue-500">
                <CardContent className="p-6">
                  <p className="font-paragraph text-gray-800 mb-4">
                    Wir überprüfen und aktualisieren die angezeigten Informationen regelmäßig – mindestens wöchentlich – und zusätzlich immer dann, wenn Anbieter Änderungen veröffentlichen.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="font-paragraph text-gray-700"><strong>Mindestens wöchentlich:</strong> Systematische Überprüfung aller Tarife</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="font-paragraph text-gray-700"><strong>Sofort bei Änderungen:</strong> Wenn Anbieter neue Tarife oder Preise veröffentlichen</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="font-paragraph text-gray-700"><strong>Qualitätskontrolle:</strong> Alle Daten werden vor Veröffentlichung überprüft</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Independence & Commissions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="font-heading text-3xl font-bold text-primary">Unabhängigkeit & Provisionen</h2>
              <div className="space-y-4">
                <Card className="bg-green-50 border-l-4 border-green-600">
                  <CardContent className="p-6">
                    <h3 className="font-heading font-bold text-lg text-green-900 mb-3">Unabhängige Bewertung</h3>
                    <p className="font-paragraph text-gray-800">
                      Der Vergleich ist unabhängig und basiert auf transparenten Kriterien: <strong>Preis + Vertragsbedingungen</strong>. Keine versteckten Vorlieben für bestimmte Anbieter.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-amber-50 border-l-4 border-amber-600">
                  <CardContent className="p-6">
                    <h3 className="font-heading font-bold text-lg text-amber-900 mb-3">Provisionen beeinflussen nicht die Rangfolge</h3>
                    <p className="font-paragraph text-gray-800 mb-3">
                      Falls Anbieterbeziehungen oder Provisionen für erfolgreiche Leads oder Wechsel bestehen, beeinflussen diese <strong>nicht</strong> die Rangfolge oder Darstellung der Tarife.
                    </p>
                    <p className="font-paragraph text-sm text-gray-700">
                      Die Tarife werden ausschließlich nach Preis und Bedingungen sortiert – unabhängig von möglichen Provisionsstrukturen.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 border-l-4 border-purple-600">
                  <CardContent className="p-6">
                    <h3 className="font-heading font-bold text-lg text-purple-900 mb-3">Gesponserte Platzierungen</h3>
                    <p className="font-paragraph text-gray-800">
                      Falls gesponserte Platzierungen jemals verwendet werden, werden diese <strong>deutlich gekennzeichnet</strong> und von organischen Ergebnissen getrennt.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Comparison Criteria */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="font-heading text-3xl font-bold text-primary">Vergleichskriterien</h2>
              <p className="font-paragraph text-gray-700">
                Unsere Vergleiche berücksichtigen folgende Faktoren:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {[
                  { title: 'Gesamtpreis', desc: 'Jahreskosten inklusive aller Gebühren' },
                  { title: 'Arbeitspreis', desc: 'Preis pro kWh Stromverbrauch' },
                  { title: 'Grundgebühr', desc: 'Monatliche Grundgebühr' },
                  { title: 'Vertragslaufzeit', desc: 'Bindungsdauer des Vertrags' },
                  { title: 'Kündigungsfrist', desc: 'Wie schnell können Sie kündigen?' },
                  { title: 'Preisgarantie', desc: 'Wie lange ist der Preis garantiert?' },
                  { title: 'Boni & Rabatte', desc: 'Neukundenboni und Wechselboni' },
                  { title: 'Ökostrom-Optionen', desc: 'Verfügbarkeit von Grüntarifen' },
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-heading font-bold text-primary mb-1">{item.title}</p>
                    <p className="font-paragraph text-sm text-gray-700">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quality Assurance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="font-heading text-3xl font-bold text-primary">Qualitätssicherung</h2>
              <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-paragraph text-gray-800"><strong>Datenvalidierung:</strong> Alle Tarife werden vor Veröffentlichung überprüft</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-paragraph text-gray-800"><strong>Regelmäßige Audits:</strong> Wir überprüfen unsere Datenquellen kontinuierlich</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-paragraph text-gray-800"><strong>Nutzer-Feedback:</strong> Wir berücksichtigen Rückmeldungen zur Verbesserung</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-paragraph text-gray-800"><strong>Transparente Fehlerbehandlung:</strong> Fehler werden schnell korrigiert und kommuniziert</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-secondary/10 border-l-4 border-secondary p-8 rounded mt-12"
            >
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">Haben Sie Fragen zu unserer Methodik?</h3>
              <p className="font-paragraph text-gray-700 mb-6">
                Wir sind stolz auf unsere Transparenz und Unabhängigkeit. Wenn Sie Fragen zu unseren Verfahren haben, kontaktieren Sie uns gerne.
              </p>
              <Link to={ROUTES.KONTAKT} className="inline-block">
                <button className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors">
                  Kontakt aufnehmen
                </button>
              </Link>
            </motion.div>

            <RelatedPages pages={getRelatedPages('/methodik')} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
