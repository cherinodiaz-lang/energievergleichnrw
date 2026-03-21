import { motion } from 'framer-motion';
import { ShieldCheck, Award, Users, TrendingUp } from 'lucide-react';

const trustItems = [
  {
    icon: ShieldCheck,
    number: '100%',
    label: 'Sicher & Zertifiziert',
  },
  {
    icon: Award,
    number: '15+',
    label: 'Jahre Erfahrung',
  },
  {
    icon: Users,
    number: '500K+',
    label: 'Zufriedene Kunden',
  },
  {
    icon: TrendingUp,
    number: '€2B+',
    label: 'Ersparnisse',
  },
];

export default function TrustSection() {
  return (
    <section className="py-16 md:py-24 bg-primary text-white">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Vertrauen Sie unserer Expertise
          </h2>
          <p className="font-paragraph text-lg text-white/80 max-w-2xl mx-auto">
            Millionen von Kunden vertrauen uns bereits
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Icon className="w-12 h-12 mx-auto mb-4 text-secondary" />
                <div className="font-heading text-3xl md:text-4xl font-bold mb-2">
                  {item.number}
                </div>
                <p className="font-paragraph text-white/80">{item.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
