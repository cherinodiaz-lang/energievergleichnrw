import { motion } from 'framer-motion';
import { Zap, ArrowRight, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import RelatedPages from '@/components/RelatedPages';
import PassendeRatgeber from '@/components/PassendeRatgeber';
import CalculatorForm from '@/components/strom/CalculatorForm';
import InfoSections from '@/components/strom/InfoSections';
import { getRelatedPages } from '@/lib/internal-linking';
import { ROUTES } from '@/lib/routes';
import { Link } from 'react-router-dom';

export default function StromvergleichNrwPage() {
  const relatedPages = getRelatedPages('stromvergleich-nrw', 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full bg-gradient-to-br from-primary via-primary to-primary-dark py-8 sm:py-10 md:py-12 lg:py-16 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-secondary rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-secondary rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Breadcrumb />
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 mt-3 sm:mt-4 leading-tight">
                Stromvergleich für NRW
              </h1>
              <p className="font-paragraph text-base sm:text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
                Finden Sie die besten Stromtarife in Nordrhein-Westfalen und sparen Sie bis zu 30% bei Ihren Stromkosten.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Calculator Section - Above the Fold */}
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 md:-mt-10 relative z-10 mb-10 sm:mb-12 md:mb-16">
          <CalculatorForm />
        </div>

        {/* Info Sections */}
        <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
            <InfoSections />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-primary text-white">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                Bereit zu wechseln?
              </h2>
              <p className="font-paragraph text-base sm:text-lg text-white/90 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed">
                Nutzen Sie unseren Stromrechner oben, um die besten Tarife zu finden und sofort zu sparen.
              </p>
              <Link to="#vergleich">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-black font-semibold">
                  Zum Rechner
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Related Pages */}
        {relatedPages.length > 0 && (
          <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-white">
            <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
              <RelatedPages pages={relatedPages} />
            </div>
          </section>
        )}

        {/* Ratgeber Section */}
        <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
            <PassendeRatgeber />
          </div>
        </section>
      </main>
      <BreadcrumbSchema />
      <Footer />
    </div>
  );
}
