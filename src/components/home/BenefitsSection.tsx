import { motion } from 'framer-motion';
import { TrendingDown, Zap, Leaf, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const benefits = [
  {
    icon: TrendingDown,
    title: 'Bis zu 30% sparen',
    description: 'Finden Sie die günstigsten Tarife für Strom und Gas',
  },
  {
    icon: Zap,
    title: 'Schneller Wechsel',
    description: 'Unkomplizierter Wechsel in nur wenigen Minuten',
  },
  {
    icon: Leaf,
    title: 'Grüne Optionen',
    description: 'Nachhaltige Energielösungen für die Zukunft',
  },
  {
    icon: Clock,
    title: 'Kostenlos & unverbindlich',
    description: 'Keine versteckten Gebühren oder Verpflichtungen',
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Warum energievergleich.nrw?
          </h2>
          <p className="font-paragraph text-lg text-gray-600 max-w-2xl mx-auto">
            Vertrauen Sie auf unsere Expertise und Transparenz
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Icon className="w-10 h-10 text-primary mb-4" />
                    <h3 className="font-heading font-semibold text-lg mb-2">
                      {benefit.title}
                    </h3>
                    <p className="font-paragraph text-gray-600 text-sm">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
