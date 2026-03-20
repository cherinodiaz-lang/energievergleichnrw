import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative w-full bg-gradient-to-br from-primary via-primary to-primary-dark py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Zap className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-white">Bis zu 30% sparen</span>
          </div>

          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Energie sparen,<br />
            <span className="text-secondary">Geld verdienen</span>
          </h1>

          <p className="font-paragraph text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Vergleichen Sie Strom-, Gas- und Photovoltaikangebote in NRW. Finden Sie die beste Lösung für Ihr Zuhause oder Gewerbe.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/stromvergleich-nrw">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-black font-semibold">
                Jetzt vergleichen
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Mehr erfahren
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
