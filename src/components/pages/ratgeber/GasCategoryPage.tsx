import { motion } from 'framer-motion';
import { Flame, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import DeferredFooter from '@/components/DeferredFooter';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { Link } from 'react-router-dom';
import { getArticlesByCategory } from '@/lib/ratgeber-map';
import { ROUTES } from '@/lib/routes';

export default function GasCategoryPage() {
  const articles = getArticlesByCategory('gas');

  const breadcrumbItems = [
    { label: 'Startseite', path: '/' },
    { label: 'Ratgeber', path: '/ratgeber' },
    { label: 'Gas', path: '/ratgeber/gas' },
  ];

  const breadcrumbSchema = [
    { name: 'Startseite', url: `${typeof window !== 'undefined' ? window.location.origin : ''}${ROUTES.home}` },
    { name: 'Ratgeber', url: `${typeof window !== 'undefined' ? window.location.origin : ''}${ROUTES.ratgeber}` },
    { name: 'Gas', url: `${typeof window !== 'undefined' ? window.location.origin : ''}/ratgeber/gas` },
  ];

  return (
    <div className="min-h-screen bg-background break-words leading-mobile">
      <SEOHead
        title="Gasvergleich & Heizung | Ratgeber | Energievergleich"
        description="Ratgeber zu Gastarifen, Heizkosten und Wechseloptionen in NRW. Erfahren Sie alles über Gasversorger und Sparpotenziale."
        keywords="Gastarife, Gasvergleich, Gaswechsel, Heizkosten, Gasversorger"
        ogTitle="Gasvergleich & Heizung | Ratgeber"
        ogDescription="Umfassender Ratgeber zu Gastarifen und Gaswechsel in NRW"
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
            <div className="flex items-center gap-3 mb-6">
              <Flame className="w-8 h-8" />
              <span className="text-sm font-bold uppercase tracking-wider">Ratgeber</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 leading-tight max-w-[22ch] sm:max-w-none break-words">
              Gasvergleich & Heizung
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90">
              Ratgeber zu Gastarifen, Heizkosten und Wechseloptionen
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introductory Section */}
      <section className="w-full py-16 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-3xl">
              <p className="font-paragraph text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                Gaskosten sind ein wesentlicher Bestandteil der Nebenkosten für Haushalte und Unternehmen. Ob Sie gerade einen Gaswechsel planen, Ihre aktuelle Versorgung überprüfen möchten oder Fragen zu Verträgen und Heizungsoptionen haben – unser Ratgeber bietet Ihnen umfassende Informationen. Erfahren Sie, welche Faktoren Ihre Gasrechnung beeinflussen, wie Sie Kosten senken können und worauf Sie bei der Wahl eines Gasanbieters achten sollten.
              </p>

              <div className="mb-8 space-y-3">
                <h3 className="font-heading text-lg font-semibold text-primary mb-4">Häufige Fragen zum Gasvergleich:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-secondary font-bold mt-1">•</span>
                    <span className="font-paragraph text-gray-700">Wie kann ich meinen Gasanbieter wechseln und wie lange dauert das?</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary font-bold mt-1">•</span>
                    <span className="font-paragraph text-gray-700">Welche Unterschiede gibt es zwischen Grundversorgung und Sondervertrag?</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary font-bold mt-1">•</span>
                    <span className="font-paragraph text-gray-700">Was sollte ich bei Preiserhöhungen beachten und welche Rechte habe ich?</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary font-bold mt-1">•</span>
                    <span className="font-paragraph text-gray-700">Wie beeinflussen Heizungsart und Verbrauch meine Gaskosten?</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <a
                  href="https://www.energievergleich.shop/gasvergleich-nrw"
                  className="font-paragraph text-primary hover:text-primary/80 font-semibold underline transition-colors"
                >
                  Gasvergleich NRW starten →
                </a>
                <a
                  href="https://www.energievergleich.shop/methodik"
                  className="font-paragraph text-primary hover:text-primary/80 font-semibold underline transition-colors"
                >
                  So vergleichen wir (Methodik) →
                </a>
              </div>
            </div>
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
              Lesen Sie unsere Ratgeber und erfahren Sie, wie Sie bei Gas sparen können.
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
            Bereit für einen Gaswechsel?
          </h2>
          <p className="font-paragraph text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Nutzen Sie unseren Vergleichsrechner und finden Sie den besten Gastarif für Ihre Region.
          </p>
          <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 px-8 rounded-lg font-bold">
            <Link to={ROUTES.gasvergleich}>
              Gastarife vergleichen
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      <DeferredFooter />
    </div>
  );
}
