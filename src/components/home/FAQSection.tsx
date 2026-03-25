import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BaseCrudService } from '@/integrations';
import { HufiggestellteFragen } from '@/entities';

export default function FAQSection() {
  const [faqs, setFaqs] = useState<HufiggestellteFragen[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFaqs = async () => {
      try {
        const result = await BaseCrudService.getAll<HufiggestellteFragen>('faq');
        const featured = result.items
          .filter(faq => faq.isFeatured)
          .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
          .slice(0, 5);
        setFaqs(featured);
      } catch (error) {
        console.error('Error loading FAQs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFaqs();
  }, []);

  if (loading || faqs.length === 0) return null;

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
            Häufig gestellte Fragen
          </h2>
          <p className="font-paragraph text-lg text-gray-600 max-w-2xl mx-auto">
            Finden Sie Antworten auf die wichtigsten Fragen
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq._id} value={`faq-${index}`}>
                <AccordionTrigger className="font-heading font-semibold text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-paragraph text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
