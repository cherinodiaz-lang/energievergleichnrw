import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { getArticlesByCategory } from '@/lib/ratgeber-map';

export default function GewerbeCategoryPage() {
  const articles = getArticlesByCategory('gewerbe');

  return (
    <div className="min-h-screen bg-background break-words leading-mobile">
      <SEOHead
        title="Gewerbeenergie | Ratgeber | Energievergleich"
        description="Ratgeber für Gewerbekunden: Gewerbestrom, Gewerbegas und Energieoptimierung für Unternehmen in NRW."
        keywords="Gewerbeenergie, Gewerbestrom, Gewerbegas, Unternehmen, Energiekosten"
        ogTitle="Gewerbeenergie | Ratgeber"
        ogDescription="Ratgeber für Gewerbekunden und Unternehmen"
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
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-8 h-8" />
              <span className="text-sm font-bold uppercase tracking-wider">Ratgeber</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 leading-tight max-w-[22ch] sm:max-w-none break-words">
              Gewerbeenergie
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90">
              Spezielle Informationen für Unternehmen und Gewerbetreibende
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="w-full py-24 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-primary mb-4">
              {articles.length} Artikel in dieser Kategorie
            </h2>
            <p className="font-paragraph text-gray-600">
              Lesen Sie unsere Ratgeber für Gewerbekunden und Unternehmen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/${article.slug}`} className="group h-full">
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-none overflow-hidden flex flex-col">
                    <CardHeader className="pb-3">
                      <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col pb-6">
                      <p className="font-paragraph text-sm text-gray-600 mb-6 line-clamp-3 flex-1">
                        {article.teaser}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{article.readingTime} Min. Lesezeit</span>
                        </div>
                        <span className="text-gray-400">
                          {new Date(article.lastUpdated).toLocaleDateString('de-DE')}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 bg-primary text-primary-foreground">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-6">
            Energiekosten für Ihr Unternehmen senken?
          </h2>
          <p className="font-paragraph text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Kontaktieren Sie uns für eine individuelle Beratung zu Gewerbestrom und Gewerbegas.
          </p>
          <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 px-8 rounded-lg font-bold">
            <Link to="/kontakt">
              Jetzt anfragen
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
