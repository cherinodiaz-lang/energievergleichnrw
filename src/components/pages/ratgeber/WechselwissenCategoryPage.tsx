import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Link } from 'react-router-dom';

export default function WechselwissenCategoryPage() {
  const articles = [
    {
      id: 'anbieterwechsel-anleitung',
      title: 'Anbieterwechsel: Schritt-für-Schritt Anleitung',
      description: 'Komplette Anleitung zum Wechsel von Strom- und Gasanbietern in NRW.',
      date: '2026-01-09',
      readTime: '8 min'
    },
    {
      id: 'kuendigungsfristen-wechselfristen',
      title: 'Kündigungsfristen und Wechselfristen erklärt',
      description: 'Alles über Kündigungsfristen, Wechselfristen und gesetzliche Regelungen.',
      date: '2026-01-08',
      readTime: '6 min'
    },
    {
      id: 'sonderkuendigung-preiserhoehung',
      title: 'Sonderkündigung bei Preiserhöhung',
      description: 'Ihr Recht auf Sonderkündigung bei Preiserhöhungen und wie Sie es nutzen.',
      date: '2026-01-07',
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
      title: 'Gasvergleich & Heizung',
      link: '/ratgeber/gas',
      icon: '🔥'
    },
    {
      title: 'Gewerbeenergie',
      link: '/ratgeber/gewerbe',
      icon: '🏢'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Wechselwissen | Anbieterwechsel & Kündigungsfristen in NRW"
        description="Alles über Anbieterwechsel, Kündigungsfristen und Wechselfristen. Erfahren Sie Ihre Rechte beim Energiewechsel in NRW."
        keywords="Anbieterwechsel, Kündigungsfrist, Wechselfrist, Sonderkündigung, Preiserhöhung"
        ogTitle="Wechselwissen | Energievergleich"
        ogDescription="Alles über Anbieterwechsel und Kündigungsfristen"
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
                <BookOpen className="w-6 h-6 text-secondary" />
              </div>
              <span className="text-secondary font-bold uppercase text-sm">Ratgeber</span>
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Wechselwissen
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
              Wichtiges über Anbieterwechsel, Fristen und Besonderheiten. Alles was Sie wissen müssen.
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
              {articles.length} Artikel zum Wechsel
            </h2>
            <p className="font-paragraph text-lg text-gray-600">
              Alles über Anbieterwechsel und Ihre Rechte
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
                <Link to={`/ratgeber/wechselwissen/${article.id}`} className="group h-full">
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-none overflow-hidden">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white">
                      <BookOpen className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                        <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">
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
              Bereit zum Wechsel?
            </h2>
            <p className="font-paragraph text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Nutzen Sie unsere Vergleichsrechner und finden Sie die besten Tarife für Strom und Gas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 px-8 rounded-full font-semibold"
              >
                <Link to="/stromvergleich-nrw">
                  Strom vergleichen
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 h-12 px-8 rounded-full font-semibold"
              >
                <Link to="/gasvergleich-nrw">
                  Gas vergleichen
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
