import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, CheckCircle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/routes';

export default function AboutPage() {
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
      <SEOHead
        title="Über uns - ENERGIEVERGLEICH NRW"
        description="Erfahren Sie mehr über ENERGIEVERGLEICH NRW. Unabhängige Energievergleiche mit offiziellen Tarifen für Strom, Gas und Photovoltaik in Nordrhein-Westfalen."
        canonical="https://energievergleich.shop/uber-uns"
      />
      <Header />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 sm:py-24 lg:py-32">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Über uns
              </h1>
              <p className="font-paragraph text-lg sm:text-xl opacity-90 max-w-2xl mx-auto">
                Ihr vertrauenswürdiger Partner für unabhängige Energievergleiche in Nordrhein-Westfalen
              </p>
            </motion.div>
          </div>
        </section>

        {/* Company Info Section */}
        <section className="w-full py-16 sm:py-24 lg:py-32 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            >
              {/* Left Content */}
              <motion.div variants={itemVariants} className="space-y-6">
                <div>
                  <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary mb-4">
                    ENERGIEVERGLEICH NRW
                  </h2>
                  <p className="font-paragraph text-lg text-gray-600 mb-4">
                    <strong>Geschäftsführer:</strong> P. Kohmann und A. Danos
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="font-paragraph text-base sm:text-lg text-gray-700 leading-relaxed">
                    ENERGIEVERGLEICH NRW ist Ihr unabhängiger Partner für transparente und verlässliche Energievergleiche. Wir nutzen ausschließlich offizielle Tarife von zertifizierten Energieversorgern und bieten Ihnen einen objektiven Überblick über die besten Angebote in Ihrer Region. Unser Ziel ist es, Ihnen dabei zu helfen, Geld zu sparen, ohne dabei Kompromisse bei der Qualität oder Sicherheit einzugehen.
                  </p>
                  <p className="font-paragraph text-base sm:text-lg text-gray-700 leading-relaxed">
                    Mit jahrelanger Erfahrung im Energiemarkt verstehen wir die Komplexität von Stromtarifen, Gasverträgen und Photovoltaik-Lösungen. Wir arbeiten nach höchsten Standards der Transparenz und Unabhängigkeit – ohne versteckte Provisionen oder unbelegte Sparversprechen. Jeder Vergleich wird sorgfältig durchgeführt, um Ihnen die genauesten und realistischsten Ergebnisse zu liefern.
                  </p>
                </div>

                {/* Contact Info */}
                <div className="space-y-4 pt-6 border-t border-gray-200">
                  <h3 className="font-heading text-xl font-semibold text-primary">Kontaktieren Sie uns</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-1" aria-hidden="true" />
                      <div>
                        <p className="font-paragraph font-semibold text-gray-900">Adresse</p>
                        <p className="font-paragraph text-gray-700">
                          Wasserstr. 48<br />
                          33378 Rheda-Wiedenbrück<br />
                          Deutschland
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-secondary flex-shrink-0 mt-1" aria-hidden="true" />
                      <div>
                        <p className="font-paragraph font-semibold text-gray-900">Telefon</p>
                        <a
                          href="tel:+4915678556004"
                          className="font-paragraph text-primary hover:underline"
                        >
                          +49 156 78556004
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-secondary flex-shrink-0 mt-1" aria-hidden="true" />
                      <div>
                        <p className="font-paragraph font-semibold text-gray-900">E-Mail</p>
                        <a
                          href="mailto:support@energievergleich.nrw"
                          className="font-paragraph text-primary hover:underline"
                        >
                          support@energievergleich.nrw
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Visual */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center min-h-[400px]"
              >
                <div className="bg-primary rounded-full p-6 mb-6">
                  <Zap className="w-16 h-16 text-primary-foreground" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-center text-primary mb-4">
                  Unabhängig & Transparent
                </h3>
                <p className="font-paragraph text-center text-gray-700">
                  Wir arbeiten nach höchsten Standards der Transparenz und Unabhängigkeit für Ihre Energieeinsparungen.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Methodology Section */}
        <section className="w-full py-16 sm:py-24 lg:py-32 bg-light-grey">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary mb-4">
                  So vergleichen wir
                </h2>
                <p className="font-paragraph text-lg text-gray-700 max-w-2xl mx-auto">
                  Unsere Methodik basiert auf Transparenz, Genauigkeit und Ihrem Vertrauen
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Offizielle Tarife",
                    description: "Wir nutzen nur zertifizierte und aktuelle Tarife von anerkannten Energieversorgern. Keine Schätzungen oder veraltete Daten.",
                  },
                  {
                    title: "Unabhängige Bewertung",
                    description: "Unsere Vergleiche sind frei von Provisionsabhängigkeiten. Wir empfehlen das beste Angebot für Sie, nicht das lukrativste für uns.",
                  },
                  {
                    title: "Realistische Einsparungen",
                    description: "Wir machen keine unbelegten Sparversprechen. Alle Berechnungen basieren auf Ihren tatsächlichen Verbrauchsdaten und aktuellen Marktpreisen.",
                  },
                  {
                    title: "Individuelle Analyse",
                    description: "Jeder Haushalt und jedes Unternehmen ist unterschiedlich. Wir berücksichtigen Ihre spezifische Situation für maßgeschneiderte Empfehlungen.",
                  },
                  {
                    title: "Transparente Kommunikation",
                    description: "Alle Gebühren, Vertragsbedingungen und Besonderheiten werden klar kommuniziert. Keine versteckten Kosten oder überraschenden Klauseln.",
                  },
                  {
                    title: "Kontinuierliche Aktualisierung",
                    description: "Der Energiemarkt ändert sich ständig. Wir aktualisieren unsere Daten regelmäßig, um Ihnen immer die neuesten Informationen zu bieten.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" aria-hidden="true" />
                      <h3 className="font-heading text-lg font-semibold text-primary">
                        {item.title}
                      </h3>
                    </div>
                    <p className="font-paragraph text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 sm:py-24 lg:py-32 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary mb-6">
                Bereit zu sparen?
              </h2>
              <p className="font-paragraph text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                Starten Sie jetzt Ihren unabhängigen Energievergleich und finden Sie die besten Tarife für Ihre Situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={ROUTES.stromvergleich}>
                  <Button size="lg" className="w-full sm:w-auto">
                    Stromvergleich starten
                  </Button>
                </Link>
                <Link to={ROUTES.gasvergleich}>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Gasvergleich starten
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
