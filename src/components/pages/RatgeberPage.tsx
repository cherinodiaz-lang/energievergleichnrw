import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Zap, Flame, Building2, Sun, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Link } from 'react-router-dom';

export default function RatgeberPage() {
  const categories = [
    {
      id: 'strom',
      title: 'Stromvergleich & Tarife',
      description: 'Alles über Stromtarife, Wechsel und Sparpotenziale in NRW',
      icon: Zap,
      color: 'from-blue-500 to-blue-600',
      articles: 8,
      link: '/ratgeber/strom'
    },
    {
      id: 'gas',
      title: 'Gasvergleich & Heizung',
      description: 'Ratgeber zu Gastarifen, Heizkosten und Wechseloptionen',
      icon: Flame,
      color: 'from-orange-500 to-orange-600',
      articles: 6,
      link: '/ratgeber/gas'
    },
    {
      id: 'gewerbe',
      title: 'Gewerbeenergie',
      description: 'Spezielle Informationen für Unternehmen und Gewerbetreibende',
      icon: Building2,
      color: 'from-green-500 to-green-600',
      articles: 3,
      link: '/ratgeber/gewerbe'
    },
    {
      id: 'photovoltaik',
      title: 'Photovoltaik & Solar',
      description: 'Leitfaden zu Solaranlagen, Wirtschaftlichkeit und Förderungen',
      icon: Sun,
      color: 'from-yellow-500 to-yellow-600',
      articles: 5,
      link: '/ratgeber/photovoltaik'
    },
    {
      id: 'wechselwissen',
      title: 'Wechselwissen',
      description: 'Wichtiges über Anbieterwechsel, Fristen und Besonderheiten',
      icon: BookOpen,
      color: 'from-purple-500 to-purple-600',
      articles: 3,
      link: '/ratgeber/wechselwissen'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Ratgeber | Energievergleich NRW - Tipps & Wissen"
        description="Umfassender Ratgeber zu Strom, Gas, Photovoltaik und Gewerbeenergie. Erfahren Sie alles über Tarife, Wechsel und Sparpotenziale in NRW."
        keywords="Ratgeber, Energievergleich, Stromtarife, Gastarife, Photovoltaik, Gewerbeenergie"
        ogTitle="Ratgeber | Energievergleich"
        ogDescription="Kostenloser Ratgeber zu Energie, Strom und Gas in NRW"
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
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Ratgeber & Wissen
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
              Umfassende Guides zu Strom, Gas, Photovoltaik und Gewerbeenergie. Lernen Sie, wie Sie Energiekosten sparen und die richtige Wahl treffen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="w-full py-24 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={category.link} className="group h-full">
                    <Card className="h-full hover:shadow-xl transition-all duration-300 border-none overflow-hidden">
                      <div className={`bg-gradient-to-br ${category.color} p-8 text-white`}>
                        <IconComponent className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
                        <h2 className="font-heading text-2xl font-bold">{category.title}</h2>
                      </div>
                      <CardContent className="p-6">
                        <p className="font-paragraph text-gray-600 mb-6">{category.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-primary">{category.articles} Artikel</span>
                          <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-2 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="w-full py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
              Warum unser Ratgeber?
            </h2>
            <p className="font-paragraph text-lg text-gray-600">
              Unabhängige, verständliche Informationen für bessere Energieentscheidungen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Unabhängig',
                description: 'Neutrale Informationen ohne Verkaufsabsicht. Wir erklären die Fakten.'
              },
              {
                title: 'Verständlich',
                description: 'Komplexe Themen einfach erklärt. Keine unnötigen Fachbegriffe.'
              },
              {
                title: 'Praktisch',
                description: 'Mit konkreten Tipps und Checklisten zum Umsetzen.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading text-xl text-primary">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
