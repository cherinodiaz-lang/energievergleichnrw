import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, BarChart3, RefreshCw, Shield, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { getPageSEO } from '@/lib/seo-config';

export default function MethodologyPage() {
  const pageSEO = getPageSEO('methodik');

  const methodologySteps = [
    {
      icon: BarChart3,
      title: 'Recherche aus offiziellen Datenbanken',
      description:
        'Wir recherchieren Tarife direkt aus offiziellen Datenbanken wie der Bundesnetzagentur und den Energieanbietern. Dies gewährleistet, dass Sie nur aktuelle und verifizierte Tarife sehen.',
    },
    {
      icon: CheckCircle,
      title: 'Objektive Vergleichskriterien',
      description:
        'Unsere Vergleiche basieren auf objektiven Kriterien: Preis pro kWh, Vertragslaufzeit, Kündigungsfristen, Servicequalität und Kundenbewertungen. Keine versteckten Gebühren, keine Überraschungen.',
    },
    {
      icon: RefreshCw,
      title: 'Regelmäßige Aktualisierung',
      description:
        'Die Energiemärkte ändern sich ständig. Wir aktualisieren unsere Daten regelmäßig, um sicherzustellen, dass Sie immer die aktuellsten Tarife und Preise erhalten.',
    },
    {
      icon: Shield,
      title: 'Keine unbelegten Sparversprechen',
      description:
        'Wir machen keine unrealistischen Versprechungen über Einsparungen. Alle Sparpotenziale basieren auf realen Daten und Ihrem individuellen Verbrauch.',
    },
  ];

  const trustedSources = [
    {
      name: 'Bundesnetzagentur',
      description:
        'Offizielle Regulierungsbehörde für Strom, Gas, Telekommunikation, Post und Eisenbahnen',
      url: 'https://www.bundesnetzagentur.de/',
    },
    {
      name: 'Verbraucherzentrale NRW',
      description: 'Unabhängige Beratung und Informationen für Verbraucher in Nordrhein-Westfalen',
      url: 'https://www.verbraucherzentrale.nrw/',
    },
    {
      name: 'Energieverbände',
      description: 'Offizielle Informationen von Energieanbietern und Branchenverbänden',
      url: 'https://www.bdew.de/',
    },
  ];

  return (
    <>
      <SEOHead
        title={pageSEO.title}
        description={pageSEO.description}
        canonical={pageSEO.canonical}
        ogImage={pageSEO.ogImage}
      />
      <BreadcrumbSchema />
      <Header />

      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-6">
          <Breadcrumb
            items={[
              { label: 'Startseite', href: '/' },
              { label: 'Methodik', href: '/methodik', current: true },
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Unsere Methodik
            </h1>
            <p className="font-paragraph text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto">
              Transparenz und Objektivität sind die Grundlagen unserer Energievergleiche. Erfahren
              Sie, wie wir arbeiten.
            </p>
          </motion.div>
        </section>

        {/* Methodology Steps */}
        <section className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {methodologySteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg p-8 border border-light-grey hover:border-primary transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                        {step.title}
                      </h3>
                      <p className="font-paragraph text-foreground/80">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Key Principles */}
        <section className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-primary/5 rounded-lg p-8 sm:p-12"
          >
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-8">
              Unsere Grundprinzipien
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">
                    Keine unbelegten Sparversprechen
                  </h3>
                  <p className="font-paragraph text-foreground/80">
                    Wir zeigen Ihnen realistische Sparpotenziale basierend auf Ihrem individuellen
                    Verbrauch. Alle Berechnungen sind nachvollziehbar und transparent.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">
                    Unabhängigkeit von Energiekonzernen
                  </h3>
                  <p className="font-paragraph text-foreground/80">
                    Wir arbeiten unabhängig und objektiv. Unsere Empfehlungen basieren
                    ausschließlich auf Ihren Interessen, nicht auf Provisionen oder Partnerschaften
                    mit Energieanbietern.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">
                    Datenschutz und Sicherheit
                  </h3>
                  <p className="font-paragraph text-foreground/80">
                    Ihre persönlichen Daten sind bei uns sicher. Wir behandeln Ihre Informationen
                    vertraulich und gemäß der DSGVO. Lesen Sie unsere{' '}
                    <Link to="/datenschutz" className="text-primary hover:underline">
                      Datenschutzerklärung
                    </Link>{' '}
                    für weitere Details.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">
                    Aktuelle und verifizierte Daten
                  </h3>
                  <p className="font-paragraph text-foreground/80">
                    Alle Tarife werden regelmäßig aktualisiert und aus offiziellen Quellen
                    verifiziert. Sie erhalten immer die aktuellsten Informationen.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Trusted Sources */}
        <section className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Verlässliche Quellen
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 max-w-2xl mx-auto">
              Wir nutzen offizielle und vertrauenswürdige Quellen für unsere Informationen
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustedSources.map((source, index) => (
              <motion.a
                key={index}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-8 border border-light-grey hover:border-primary transition-colors group"
              >
                <h3 className="font-heading text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                  {source.name}
                  <ExternalLink className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="font-paragraph text-foreground/80 mb-4">{source.description}</p>
                <span className="text-primary font-semibold text-sm">Zur Website →</span>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Navigation Links */}
        <section className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-background rounded-lg p-8 text-center border border-light-grey"
          >
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
              Weitere Informationen
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/ueber-uns"
                className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-heading font-semibold hover:bg-primary/90 transition-colors"
              >
                Über uns
              </Link>
              <Link
                to="/datenschutz"
                className="inline-block bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-heading font-semibold hover:bg-secondary/90 transition-colors"
              >
                Datenschutz
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
