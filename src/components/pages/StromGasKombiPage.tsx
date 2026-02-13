import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import TrustRow from '@/components/TrustRow';
import { trackMethodikClick } from '@/services/form-submission';

export default function StromGasKombiPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      <Helmet>
        <title>Strom & Gas Kombi vergleichen – Tarife in NRW</title>
        <meta name="description" content="Strom und Gas im Kombi-Vergleich: Tarife prüfen, Konditionen vergleichen, kostenlos & unverbindlich starten." />
        <meta property="og:title" content="Strom & Gas Kombi vergleichen – Tarife in NRW" />
        <meta property="og:description" content="Strom und Gas im Kombi-Vergleich: Tarife prüfen, Konditionen vergleichen, kostenlos & unverbindlich starten." />
        <link rel="canonical" href="https://www.energievergleich.shop/strom-gas-kombi" />
      </Helmet>

      <Header />
      <Breadcrumb />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-b from-primary/5 to-white py-12 md:py-16">
          <div className="max-w-[100rem] mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6">
                Strom & Gas vergleichen – Kombi-Tarife finden
              </h1>
              <p className="font-paragraph text-lg text-gray-700 max-w-3xl">
                Viele Haushalte zahlen für Strom und Gas bei verschiedenen Anbietern – dabei bieten Kombi-Tarife oft bessere Konditionen und mehr Komfort. Erfahre, wann sich ein gemeinsamer Vertrag lohnt und wie du die besten Kombi-Angebote findest.
              </p>
              <div className="flex flex-col gap-4 mt-8">
                <Link to="/stromvergleich-nrw" className="inline-block">
                  <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-14 px-8 rounded-full text-lg font-semibold shadow-lg">
                    Jetzt vergleichen
                  </Button>
                </Link>
                <Link to="/methodik" onClick={trackMethodikClick} className="text-primary hover:text-primary/80 transition-colors text-sm font-medium underline">
                  So vergleichen wir (Methodik)
                </Link>
              </div>
              <TrustRow />
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="w-full py-12 md:py-16">
          <div className="max-w-[100rem] mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="prose prose-lg max-w-4xl mx-auto"
            >
              {/* Kurz erklärt */}
              <motion.div variants={itemVariants}>
                <h2 className="font-heading text-3xl font-bold text-primary mt-8 mb-4">Kurz erklärt</h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Ein Kombi-Tarif verbindet Strom und Gas in einem einzigen Vertrag bei demselben Anbieter. Das bedeutet: eine Rechnung, ein Ansprechpartner und oft attraktive Rabatte für die Bundlung. Besonders in Nordrhein-Westfalen gibt es zahlreiche Kombi-Angebote, die speziell auf regionale Bedürfnisse zugeschnitten sind. Der Vorteil liegt nicht nur in der Vereinfachung, sondern auch in potenziellen Einsparungen – viele Energieversorger gewähren Treue- oder Kombi-Rabatte.
                </p>
              </motion.div>

              {/* Vorteile Kombi vs. getrennt */}
              <motion.div variants={itemVariants}>
                <h2 className="font-heading text-3xl font-bold text-primary mt-8 mb-4">Vorteile Kombi vs. getrennt</h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Kombi-Tarife bieten mehrere konkrete Vorteile gegenüber separaten Verträgen:
                </p>
                <ul className="font-paragraph text-gray-700 space-y-2 ml-6">
                  <li><strong>Rabatte:</strong> Viele Anbieter gewähren 5–15 % Rabatt auf die Gesamtrechnung, wenn du Strom und Gas bundeln.</li>
                  <li><strong>Eine Rechnung:</strong> Statt zwei Rechnungen erhältst du eine übersichtliche Abrechnung – weniger Verwaltungsaufwand.</li>
                  <li><strong>Vereinfachter Kundenservice:</strong> Ein Ansprechpartner für beide Energiearten – schnellere Problemlösung.</li>
                  <li><strong>Flexible Kündigungsfristen:</strong> Oft sind Kombi-Verträge mit besseren Kündigungsbedingungen verbunden.</li>
                  <li><strong>Digitale Verwaltung:</strong> Viele Anbieter bieten ein gemeinsames Online-Portal für beide Verträge.</li>
                </ul>
              </motion.div>

              {/* Wann lohnt es sich NICHT? */}
              <motion.div variants={itemVariants}>
                <h2 className="font-heading text-3xl font-bold text-primary mt-8 mb-4">Wann lohnt es sich NICHT?</h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  Kombi-Tarife sind nicht immer die beste Wahl. Folgende Szenarien sprechen gegen einen Kombi-Vertrag:
                </p>
                <ul className="font-paragraph text-gray-700 space-y-2 ml-6">
                  <li><strong>Unterschiedliche Kündigungsfristen:</strong> Wenn dein aktueller Strom- oder Gasvertrag noch lange läuft, kann ein Kombi-Wechsel teuer werden.</li>
                  <li><strong>Spezialisierte Angebote:</strong> Manchmal bietet ein Ökostromanbieter bessere Konditionen als ein Kombi-Angebot – hier lohnt sich die Trennung.</li>
                  <li><strong>Sehr niedriger Verbrauch:</strong> Bei sehr kleinen Haushalten fallen Kombi-Rabatte prozentual weniger ins Gewicht.</li>
                  <li><strong>Regionale Besonderheiten:</strong> In manchen Regionen gibt es bessere Einzeltarife als Kombi-Angebote.</li>
                </ul>
              </motion.div>

              {/* Worauf achten */}
              <motion.div variants={itemVariants}>
                <h2 className="font-heading text-3xl font-bold text-primary mt-8 mb-4">Worauf du achten solltest</h2>
                <p className="font-paragraph text-gray-700 leading-relaxed mb-4">
                  Beim Vergleich von Kombi-Tarifen sind folgende Faktoren entscheidend:
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2">Preisgarantie</h3>
                    <p className="font-paragraph text-gray-700">
                      Achte auf die Dauer der Preisgarantie. Mindestens 12 Monate sollten es sein – idealerweise 24 Monate. So schützt du dich vor Preiserhöhungen.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2">Laufzeit</h3>
                    <p className="font-paragraph text-gray-700">
                      Kurze Laufzeiten (12 Monate) bieten mehr Flexibilität. Längere Verträge (24 Monate) können bessere Rabatte bringen – hier musst du abwägen.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2">Bonus und Rabatte</h3>
                    <p className="font-paragraph text-gray-700">
                      Unterscheide zwischen Neukundenbonus (einmalig) und Kombi-Rabatt (dauerhaft). Der Kombi-Rabatt ist oft wichtiger für deine langfristige Ersparnis.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2">Abschlag</h3>
                    <p className="font-paragraph text-gray-700">
                      Der monatliche Abschlag sollte realistisch zu deinem Verbrauch passen. Zu hohe Abschläge führen zu Nachzahlungen, zu niedrige zu Rückzahlungen.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2">Kündigungsfrist</h3>
                    <p className="font-paragraph text-gray-700">
                      Standard sind 4 Wochen zum Ende eines Kalendermonats. Manche Anbieter bieten kürzere Fristen – das erhöht deine Flexibilität.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* So gehst du vor – 5 Schritte */}
              <motion.div variants={itemVariants}>
                <h2 className="font-heading text-3xl font-bold text-primary mt-8 mb-4">So gehst du vor – 5 Schritte</h2>
                <ol className="font-paragraph text-gray-700 space-y-3 ml-6 list-decimal">
                  <li>
                    <strong>Verbrauch ermitteln:</strong> Schau auf deine letzten Jahresabrechnungen für Strom und Gas. Notiere dir die kWh-Mengen – diese brauchst du für den Vergleich.
                  </li>
                  <li>
                    <strong>Kombi-Tarife vergleichen:</strong> Nutze einen <a href="https://www.energievergleich.shop/stromvergleich-nrw" className="text-primary font-semibold hover:underline">Stromvergleich NRW</a> und <a href="https://www.energievergleich.shop/gasvergleich-nrw" className="text-primary font-semibold hover:underline">Gasvergleich NRW</a>, um gezielt nach Kombi-Angeboten zu filtern. Vergleiche mindestens 5–10 Angebote.
                  </li>
                  <li>
                    <strong>Konditionen prüfen:</strong> Achte auf Preisgarantie, Laufzeit, Kündigungsfrist und versteckte Gebühren. Lies die Vertragsbedingungen sorgfältig durch.
                  </li>
                  <li>
                    <strong>Kündigungstermine beachten:</strong> Prüfe, wann deine aktuellen Verträge enden. Der Wechsel sollte nahtlos erfolgen, um Versorgungslücken zu vermeiden.
                  </li>
                  <li>
                    <strong>Wechsel einleiten:</strong> Der neue Anbieter kümmert sich meist um die Kündigung deiner alten Verträge. Bestätige alles schriftlich und behalte Unterlagen.
                  </li>
                </ol>
              </motion.div>

              {/* Häufige Fehler */}
              <motion.div variants={itemVariants}>
                <h2 className="font-heading text-3xl font-bold text-primary mt-8 mb-4">Häufige Fehler beim Kombi-Wechsel</h2>
                <ul className="font-paragraph text-gray-700 space-y-2 ml-6">
                  <li><strong>Nur auf den Bonus schauen:</strong> Der Neukundenbonus ist einmalig. Wichtiger ist der dauerhafte Kombi-Rabatt auf deine monatliche Rechnung.</li>
                  <li><strong>Kündigungsfristen ignorieren:</strong> Wer zu früh kündigt, zahlt Strafgebühren. Berechne genau, wann deine Verträge enden.</li>
                  <li><strong>Verbrauch falsch schätzen:</strong> Ein zu niedriger Verbrauch führt zu Nachzahlungen. Nutze deine echten Jahreswerte aus den Abrechnungen.</li>
                  <li><strong>Keine Preisgarantie:</strong> Verträge ohne Preisgarantie können jederzeit teurer werden – das ist ein großes Risiko.</li>
                  <li><strong>Versteckte Gebühren übersehen:</strong> Achte auf Kontoführungsgebühren, Zahlungsgebühren oder Wechselgebühren.</li>
                </ul>
              </motion.div>

              {/* NRW-Hinweis */}
              <motion.div variants={itemVariants}>
                <h2 className="font-heading text-3xl font-bold text-primary mt-8 mb-4">Kombi-Tarife in Nordrhein-Westfalen</h2>
                <p className="font-paragraph text-gray-700 leading-relaxed">
                  NRW ist einer der größten Energiemärkte in Deutschland – das bedeutet viele Angebote und starker Wettbewerb. Große Anbieter wie E.ON, Vattenfall und Stadtwerke in Köln, Düsseldorf und Dortmund bieten attraktive Kombi-Pakete an. Nutze diese Vielfalt zu deinem Vorteil: Vergleiche gezielt nach regionalen Anbietern und lokalen Stadtwerken, die oft besonders gute Konditionen für ihre Regionen haben. Beachte auch, dass manche Stadtwerke exklusive Kombi-Rabatte nur für ihre Versorgungsgebiete anbieten.
                </p>
              </motion.div>

              {/* Mini-CTA */}
              <motion.div variants={itemVariants} className="mt-10 p-6 bg-primary/5 rounded-lg border border-primary/20">
                <p className="font-paragraph text-lg text-gray-800">
                  Bereit für einen Wechsel? <a href="https://www.energievergleich.shop/stromvergleich-nrw" className="text-primary font-semibold hover:underline">Jetzt kostenlos vergleichen</a> und die besten Kombi-Tarife in NRW finden – unverbindlich und in wenigen Minuten.
                </p>
              </motion.div>

              {/* Methodologie Link */}
              <motion.div variants={itemVariants} className="mt-8 pt-8 border-t border-gray-200">
                <p className="font-paragraph text-sm text-gray-600">
                  Möchtest du wissen, wie wir Tarife bewerten? Schau dir unsere <a href="https://www.energievergleich.shop/methodik" className="text-primary font-semibold hover:underline">So vergleichen wir (Methodik)</a> an.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
