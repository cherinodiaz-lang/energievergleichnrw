import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, CheckCircle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import TeamMemberCard from '@/components/TeamMemberCard';
import { getPageSEO } from '@/lib/seo-config';
import { BaseCrudService } from '@/integrations';
import { TeamMembers } from '@/entities';

export default function UeberUnsPage() {
  const pageSEO = getPageSEO('about');
  const [teamMembers, setTeamMembers] = useState<TeamMembers[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTeamMembers = async () => {
      try {
        const result = await BaseCrudService.getAll<TeamMembers>('teammembers');
        setTeamMembers(result.items || []);
      } catch (error) {
        if (typeof window !== 'undefined' && window.location.search.includes('debug=1')) {
          console.error('Error loading team members:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadTeamMembers();
  }, []);

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
              { label: 'Über uns', href: '/about', current: true },
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
              Über uns
            </h1>
            <p className="font-paragraph text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto">
              Ihr vertrauenswürdiger Partner für unabhängige Energievergleiche in
              Nordrhein-Westfalen
            </p>
          </motion.div>
        </section>

        {/* Company Info Section */}
        <section className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-6">
                ENERGIEVERGLEICH NRW
              </h2>
              <p className="font-paragraph text-base sm:text-lg text-foreground/80 mb-6 leading-relaxed">
                ENERGIEVERGLEICH NRW ist Ihr unabhängiger Partner für transparente und zuverlässige
                Energievergleiche in Nordrhein-Westfalen. Gegründet von P. Kohmann und A. Danos,
                verfolgen wir das Ziel, Verbrauchern dabei zu helfen, die besten Energietarife zu
                finden und dabei Geld zu sparen.
              </p>
              <p className="font-paragraph text-base sm:text-lg text-foreground/80 mb-6 leading-relaxed">
                Unser Ansatz basiert auf vollständiger Transparenz und Unabhängigkeit. Wir
                vergleichen ausschließlich offizielle Tarife von etablierten Energieanbietern – ohne
                unbelegte Sparversprechen oder versteckte Gebühren. Jeder Vergleich wird sorgfältig
                durchgeführt, um sicherzustellen, dass Sie die für Ihre Situation beste Lösung
                erhalten.
              </p>
              <p className="font-paragraph text-base sm:text-lg text-foreground/80 mb-8 leading-relaxed">
                Wir glauben daran, dass Energiewechsel einfach, sicher und vorteilhaft sein sollte.
                Mit unserem Service sparen Sie nicht nur Geld, sondern unterstützen auch die
                Energiewende durch bewusste Tarifwahl.
              </p>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-heading font-semibold text-foreground">Adresse</p>
                    <p className="font-paragraph text-foreground/80">Wasserstr. 48</p>
                    <p className="font-paragraph text-foreground/80">33378 Rheda-Wiedenbrück</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-heading font-semibold text-foreground">Telefon</p>
                    <a
                      href="tel:+491567855600"
                      className="font-paragraph text-primary hover:text-primary/80 transition-colors"
                    >
                      +49 156 78556004
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-heading font-semibold text-foreground">E-Mail</p>
                    <a
                      href="mailto:support@energievergleich.nrw"
                      className="font-paragraph text-primary hover:text-primary/80 transition-colors break-all"
                    >
                      support@energievergleich.nrw
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Methodology */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary/5 rounded-lg p-8 sm:p-10">
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-8">
                  Unsere Methodik
                </h3>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-primary-foreground">
                        <CheckCircle className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-foreground mb-2">
                        Unabhängige Tarifauswahl
                      </h4>
                      <p className="font-paragraph text-sm text-foreground/80">
                        Wir vergleichen Tarife von allen relevanten Energieanbietern in Ihrer Region
                        – objektiv und ohne Voreingenommenheit.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-primary-foreground">
                        <Zap className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-foreground mb-2">
                        Offizielle Tarife
                      </h4>
                      <p className="font-paragraph text-sm text-foreground/80">
                        Alle Tarife stammen direkt von den Energieanbietern und werden regelmäßig
                        aktualisiert, um Ihnen aktuelle Preise zu zeigen.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-primary-foreground">
                        <CheckCircle className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-foreground mb-2">
                        Transparente Berechnung
                      </h4>
                      <p className="font-paragraph text-sm text-foreground/80">
                        Alle Kosten werden transparent dargestellt – keine versteckten Gebühren,
                        keine überraschenden Zusatzkosten.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-primary-foreground">
                        <CheckCircle className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-foreground mb-2">
                        Realistische Einsparungen
                      </h4>
                      <p className="font-paragraph text-sm text-foreground/80">
                        Wir zeigen Ihnen echte Sparpotenziale basierend auf Ihrem individuellen
                        Verbrauch – ohne unrealistische Versprechen.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Team Members Section */}
        {!isLoading && teamMembers.length > 0 && (
          <section className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Unser Team
              </h2>
              <p className="font-paragraph text-lg text-foreground/80 max-w-2xl mx-auto">
                Erfahrene Experten für unabhängige Energievergleiche
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {teamMembers.map((member, index) => (
                <TeamMemberCard key={member._id} member={member} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* Values Section */}
        <section className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Unsere Werte
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 max-w-2xl mx-auto">
              Diese Prinzipien leiten unsere tägliche Arbeit
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: 'Transparenz',
                description:
                  'Vollständige Offenlegung aller Kosten und Bedingungen – keine versteckten Gebühren.',
              },
              {
                title: 'Unabhängigkeit',
                description:
                  'Wir arbeiten unabhängig und objektiv für Ihre Interessen – nicht für Energiekonzerne.',
              },
              {
                title: 'Datenschutz',
                description:
                  'Ihre Daten sind bei uns sicher. Wir behandeln Ihre Informationen vertraulich und verantwortungsvoll.',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-8 text-center border border-light-grey hover:border-primary transition-colors"
              >
                <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="font-paragraph text-foreground/80">{value.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Methodology Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center bg-primary/5 rounded-lg p-8"
          >
            <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
              Wie funktioniert unser Vergleich?
            </h3>
            <p className="font-paragraph text-foreground/80 mb-6 max-w-2xl mx-auto">
              Erfahren Sie mehr über unsere Methodik und wie wir sicherstellen, dass Sie die besten
              Energietarife erhalten.
            </p>
            <Link
              to="/methodik"
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-heading font-semibold hover:bg-primary/90 transition-colors"
            >
              Zur Methodik-Seite
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
