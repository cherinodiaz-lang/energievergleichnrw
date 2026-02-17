import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Zap, Flame, Building2, Sun, ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { Link } from 'react-router-dom';
import { getPageSEO } from '@/lib/seo-config';
import { ROUTES } from '@/lib/routes';

export default function RatgeberPage() {
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    
    const query = searchQuery.toLowerCase();
    return categories.filter(category =>
      category.title.toLowerCase().includes(query) ||
      category.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const seo = getPageSEO('ratgeber');

  const breadcrumbItems = [
    { label: 'Startseite', path: '/' },
    { label: 'Ratgeber', path: '/ratgeber' },
  ];

  const breadcrumbSchema = [
    { name: 'Startseite', url: `${typeof window !== 'undefined' ? window.location.origin : ''}${ROUTES.home}` },
    { name: 'Ratgeber', url: `${typeof window !== 'undefined' ? window.location.origin : ''}${ROUTES.ratgeber}` },
  ];

  return (
    <div className="min-h-screen bg-background break-words leading-mobile">
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
      />
      <BreadcrumbSchema items={breadcrumbSchema} />
      <Header />
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="w-full bg-primary text-primary-foreground py-20 md:py-32">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 leading-tight max-w-[22ch] sm:max-w-none break-words">
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
          {/* Search Bar */}
          <div className="flex gap-3 mb-12">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Kategorien durchsuchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 text-base pl-12 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredCategories.map((category, index) => {
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

          {/* No Results Message */}
          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <p className="font-paragraph text-lg text-gray-600">
                Keine Kategorien gefunden. Bitte versuchen Sie eine andere Suche.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="w-full py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
              Beliebte Themen
            </h2>
            <p className="font-paragraph text-lg text-gray-600">
              Schneller Zugang zu den wichtigsten Ratgeber-Kategorien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <Link to="/ratgeber/strom" className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">Strom-Ratgeber</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">Alles über Stromtarife und Wechsel.</p>
                  <Button variant="outline" size="sm">Mehr erfahren</Button>
                </CardContent>
              </Card>
            </Link>
            <Link to="/ratgeber/gas" className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">Gas-Ratgeber</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">Ratgeber zu Gastarifen und Heizung.</p>
                  <Button variant="outline" size="sm">Mehr erfahren</Button>
                </CardContent>
              </Card>
            </Link>
            <Link to="/ratgeber/photovoltaik" className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">Photovoltaik-Ratgeber</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">Leitfaden zu Solaranlagen.</p>
                  <Button variant="outline" size="sm">Mehr erfahren</Button>
                </CardContent>
              </Card>
            </Link>
            <Link to="/ratgeber/gewerbe" className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">Gewerbe-Ratgeber</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">Energie für Unternehmen.</p>
                  <Button variant="outline" size="sm">Mehr erfahren</Button>
                </CardContent>
              </Card>
            </Link>
            <Link to="/ratgeber/wechselwissen" className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">Wechselwissen</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">Wichtiges über Anbieterwechsel.</p>
                  <Button variant="outline" size="sm">Mehr erfahren</Button>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
              Top-Artikel
            </h2>
            <p className="font-paragraph text-lg text-gray-600">
              Die beliebtesten Artikel aus unserem Ratgeber
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/ratgeber/strom/grundversorgung" className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">Grundversorgung: Was bedeutet das?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">Verstehen Sie die Grundversorgung.</p>
                  <Button variant="outline" size="sm">Mehr erfahren</Button>
                </CardContent>
              </Card>
            </Link>
            <Link to="/ratgeber/gas/gasanbieter-wechseln-nrw" className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">Gasanbieter wechseln in NRW</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">Schritt-für-Schritt Anleitung.</p>
                  <Button variant="outline" size="sm">Mehr erfahren</Button>
                </CardContent>
              </Card>
            </Link>
            <Link to="/ratgeber/photovoltaik/pv-speicher-lohnt-sich" className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors">PV-Speicher: Lohnt sich das?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">Wirtschaftlichkeit von Stromspeichern.</p>
                  <Button variant="outline" size="sm">Mehr erfahren</Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="w-full py-24 bg-white">
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
