import React from 'react';
import { motion } from 'framer-motion';
import { Flame, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Link } from 'react-router-dom';

export default function GasCategoryPage() {
  const articles = [
    {
      id: 'gasvergleich-wie-funktioniert',
      title: 'Gasvergleich: Wie funktioniert er?',
      description: 'Schritt-für-Schritt Erklärung, wie Sie Gastarife vergleichen und den besten Anbieter finden.',
      date: '2026-01-09',
      readTime: '5 min'
    },
    {
      id: 'gasanbieter-wechsel-anleitung',
      title: 'Gasanbieter wechseln: Komplette Anleitung',
      description: 'Alles über Kündigungsfristen, Wechselfristen und was Sie beim Wechsel beachten müssen.',
      date: '2026-01-08',
      readTime: '7 min'
    },
    {
      id: 'gaspreise-verstehen',
      title: 'Gaspreise verstehen: Arbeitspreis und Grundpreis',
      description: 'Erklärung der Gaspreiskomponenten und wie Sie Ihre Gasrechnung richtig lesen.',
      date: '2026-01-07',
      readTime: '6 min'
    },
    {
      id: 'biogas-tarife-nachhaltig',
      title: 'Biogas-Tarife: Nachhaltig heizen',
      description: 'Alles über Biogas, Klimaneutralität und ob Biogas-Tarife teurer sind.',
      date: '2026-01-06',
      readTime: '5 min'
    },
    {
      id: 'gasverbrauch-berechnen',
      title: 'Gasverbrauch berechnen und optimieren',
      description: 'Wie Sie Ihren Gasverbrauch ermitteln und durch einfache Maßnahmen sparen.',
      date: '2026-01-05',
      readTime: '6 min'
    },
    {
      id: 'preisgarantie-gas-erklart',
      title: 'Preisgarantie bei Gas: Was Sie wissen müssen',
      description: 'Erklärung von Preisgarantien, deren Dauer und Grenzen.',
      date: '2026-01-04',
      readTime: '5 min'
    }
  ];

  const relatedCategories = [
    {
      title: 'Stromvergleich & Tarife',
      link: '/ratgeber/strom',
      icon: '⚡'
    },
    {
      title: 'Wechselwissen',
      link: '/ratgeber/wechselwissen',
      icon: '🔄'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Gas Ratgeber | Gasvergleich, Tarife & Sparen in NRW"
        description="Umfassender Ratgeber zu Gastarifen, Gasvergleich und Heizkosten sparen. Erfahren Sie alles über Gasanbieter-Wechsel in NRW."
        keywords="Gasratgeber, Gasvergleich, Gastarife, Gas sparen, Gasanbieter wechseln, Heizkosten"
        ogTitle="Gas Ratgeber | Energievergleich"
        ogDescription="Alles über Gasvergleich und Gastarife in NRW"
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
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <Flame className="w-6 h-6 text-secondary" />
              </div>
              <span className="text-secondary font-bold uppercase text-sm">Ratgeber</span>
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Gasvergleich & Heizung
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
              Alles über Gasvergleiche, Tarife und wie Sie Ihre Heizkosten senken. Praktische Tipps und Erklärungen für NRW.
            </p>
            <Button
              onClick={() => document.getElementById('artikel')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 px-6 rounded-full font-semibold"
            >
              Artikel durchsuchen
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Articles Section */}
      <section id="artikel" className="w-full py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
              {articles.length} Artikel zum Thema Gas
            </h2>
            <p className="font-paragraph text-lg text-gray-600">
              Erfahren Sie alles über Gasvergleiche, Tarife und Sparpotenziale
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/ratgeber/gas/${article.id}`} className="group h-full">
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-none overflow-hidden">
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white">
                      <Flame className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
                      <h3 className="font-heading text-xl font-bold group-hover:text-secondary transition-colors">
                        {article.title}
                      </h3>
                    </div>
                    <CardContent className="p-6">
                      <p className="font-paragraph text-gray-600 mb-6 line-clamp-2">
                        {article.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{article.readTime} Lesezeit</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Categories Section */}
      <section className="w-full py-24 bg-background">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-12">
            Verwandte Kategorien
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={category.link} className="group">
                  <Card className="h-full hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">{category.icon}</span>
                        <CardTitle className="font-heading text-xl group-hover:text-primary transition-colors">
                          {category.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" size="sm" className="group-hover:border-primary group-hover:text-primary">
                        Zur Kategorie
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Bereit, Ihre Gaskosten zu senken?
            </h2>
            <p className="font-paragraph text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Nutzen Sie unseren Gasvergleichsrechner und finden Sie den besten Tarif für Ihre Region.
            </p>
            <Button
              asChild
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 px-8 rounded-full font-semibold"
            >
              <Link to="/gasvergleich-nrw">
                Gastarife vergleichen
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
