import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
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
        <section className="relative w-full bg-gradient-to-br from-primary via-primary to-primary-dark py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Breadcrumb />
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 mt-4">
                Stromvergleich für NRW
              </h1>
              <p className="font-paragraph text-lg md:text-xl text-white/90 max-w-2xl">
                Finden Sie die besten Stromtarife in Nordrhein-Westfalen und sparen Sie bis zu 30% bei Ihren Stromkosten.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Calculator Section - Above the Fold */}
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10 mb-16">
          <CalculatorForm />
        </div>

        {/* Info Sections */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
            <InfoSections />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-white">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                Bereit zu wechseln?
              </h2>
              <p className="font-paragraph text-lg text-white/90 max-w-2xl mx-auto mb-8">
                Nutzen Sie unseren Stromrechner oben, um die besten Tarife zu finden und sofort zu sparen.
              </p>
              <Link to="#vergleich">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-black font-semibold">
                  Zum Rechner
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Related Pages */}
        {relatedPages.length > 0 && (
          <section className="py-16 md:py-24 bg-white">
            <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
              <RelatedPages pages={relatedPages} />
            </div>
          </section>
        )}

        {/* Ratgeber Section */}
        <section className="py-16 md:py-24 bg-gray-50">
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
