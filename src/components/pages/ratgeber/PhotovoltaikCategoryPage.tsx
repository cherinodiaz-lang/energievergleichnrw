import React from 'react';
import { motion } from 'framer-motion';
import { Sun, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Link } from 'react-router-dom';

export default function PhotovoltaikCategoryPage() {
  const articles = [
    {
      id: 'photovoltaik-lohnt-sich',
      title: 'Lohnt sich Photovoltaik in NRW?',
      description: 'Wirtschaftlichkeitsanalyse und Amortisationsrechnung für Solaranlagen in Nordrhein-Westfalen.',
      date: '2026-01-09',
      readTime: '8 min'
    },
    {
      id: 'solaranlage-kosten-planung',
      title: 'Solaranlage: Kosten und Planung',
      description: 'Übersicht über Kosten, Größe und Planung einer Photovoltaikanlage für Ihr Dach.',
      date: '2026-01-08',
      readTime: '7 min'
    },
    {
      id: 'stromspeicher-sinnvoll',
      title: 'Stromspeicher: Sinnvoll oder nicht?',
      description: 'Analyse von Batteriespeichern und deren Einfluss auf Ihre Unabhängigkeit.',
      date: '2026-01-07',
      readTime: '7 min'
    },
    {
      id: 'einspeiseverguetung-erklaert',
      title: 'Einspeisevergütung erklärt',
      description: 'Wie die Einspeisevergütung funktioniert und wie Sie damit Geld verdienen.',
      date: '2026-01-06',
      readTime: '6 min'
    },
    {
      id: 'photovoltaik-foerderung-kfw',
      title: 'KfW-Förderung für Photovoltaik',
      description: 'Übersicht über KfW-Programme und Fördermöglichkeiten für Solaranlagen.',
      date: '2026-01-05',
      readTime: '6 min'
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
        title="Photovoltaik Ratgeber | Solaranlagen in NRW - Kosten & Förderung"
        description="Umfassender Ratgeber zu Photovoltaik und Solaranlagen in NRW. Erfahren Sie alles über Kosten, Förderung und Wirtschaftlichkeit."
        keywords="Photovoltaik, Solaranlage, Solarenergie, Kosten, Förderung, KfW, Einspeisevergütung"
        ogTitle="Photovoltaik Ratgeber | Energievergleich"
        ogDescription="Alles über Solaranlagen und Photovoltaik in NRW"
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
                <Sun className="w-6 h-6 text-secondary" />
              </div>
              <span className="text-secondary font-bold uppercase text-sm">Ratgeber</span>
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Photovoltaik & Solar
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
              Leitfaden zu Solaranlagen, Wirtschaftlichkeit und Förderungen. Alles was Sie über Photovoltaik in NRW wissen müssen.
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
              {articles.length} Artikel zu Photovoltaik
            </h2>
            <p className="font-paragraph text-lg text-gray-600">
              Alles über Solaranlagen, Kosten und Förderungen
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
                <Link to={`/ratgeber/photovoltaik/${article.id}`} className="group h-full">
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-none overflow-hidden">
                    <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 text-white">
                      <Sun className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
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
              Bereit für Ihre eigene Solaranlage?
            </h2>
            <p className="font-paragraph text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Erhalten Sie eine kostenlose Beratung und ein individuelles Angebot für Ihre Photovoltaikanlage.
            </p>
            <Button
              asChild
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 px-8 rounded-full font-semibold"
            >
              <Link to="/photovoltaik-nrw">
                Kostenlose Beratung anfragen
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
