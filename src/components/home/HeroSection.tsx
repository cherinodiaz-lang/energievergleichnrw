import { motion } from 'framer-motion';
import { ArrowRight, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative w-full bg-gradient-to-br from-primary via-primary to-primary py-10 sm:py-14 md:py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4 md:mb-6 border border-white/20">
            <TrendingDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-white">Transparente Orientierung fuer NRW</span>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight">
            Energie sparen,<br className="hidden sm:block" />
            <span className="text-secondary">Geld verdienen</span>
          </h1>

          <p className="font-paragraph text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto mb-5 sm:mb-6 md:mb-8 leading-relaxed">
            Vergleichen Sie Strom-, Gas- und Photovoltaikangebote in NRW. Finden Sie eine passende Orientierung fuer Zuhause oder Gewerbe.
          </p>

          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4 justify-center">
            <Link to="/stromvergleich-nrw" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-black font-semibold h-10 sm:h-11 md:h-12 text-sm sm:text-base">
                Jetzt vergleichen
                <ArrowRight className="ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 h-10 sm:h-11 md:h-12 text-sm sm:text-base">
              Mehr erfahren
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
