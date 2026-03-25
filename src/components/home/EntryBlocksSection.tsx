import { motion } from 'framer-motion';
import { Zap, Flame, Sun, Building2, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const blocks = [
  {
    icon: Zap,
    title: 'Stromvergleich',
    description: 'Finden Sie den besten Stromtarif für Ihr Zuhause',
    link: '/stromvergleich-nrw',
    color: 'text-blue-600',
  },
  {
    icon: Flame,
    title: 'Gasvergleich',
    description: 'Sparen Sie bei Ihren Gaskosten mit unserem Vergleich',
    link: '/gasvergleich-nrw',
    color: 'text-orange-600',
  },
  {
    icon: Sun,
    title: 'Photovoltaik',
    description: 'Nutzen Sie Solarenergie und verdienen Sie Geld',
    link: '/photovoltaik-nrw',
    color: 'text-yellow-600',
  },
  {
    icon: Building2,
    title: 'Gewerbe',
    description: 'Spezielle Lösungen für Ihr Geschäft',
    link: '/gewerbegas',
    color: 'text-green-600',
  },
];

export default function EntryBlocksSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Unsere Vergleichsservices
          </h2>
          <p className="font-paragraph text-lg text-gray-600 max-w-2xl mx-auto">
            Wählen Sie den Service, der zu Ihnen passt
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blocks.map((block, index) => {
            const Icon = block.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={block.link}>
                  <Card className="h-full hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                    <CardContent className="pt-6">
                      <Icon className={`w-12 h-12 ${block.color} mb-4`} />
                      <h3 className="font-heading font-semibold text-lg mb-2">
                        {block.title}
                      </h3>
                      <p className="font-paragraph text-gray-600 text-sm mb-4">
                        {block.description}
                      </p>
                      <div className="flex items-center text-primary font-semibold text-sm">
                        Jetzt vergleichen
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
