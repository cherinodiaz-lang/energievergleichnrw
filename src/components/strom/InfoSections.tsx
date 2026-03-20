import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: 'Welche Angaben sind für den Stromvergleich notwendig?',
    a: 'Für belastbare Tarifergebnisse benötigen Sie mindestens Ihre Postleitzahl und Ihren Jahresverbrauch in kWh. Optional können Sie Filter wie Ökostrom oder Bonusangebote setzen.',
  },
  {
    q: 'Werden echte Tarife angezeigt?',
    a: 'Ja. Wenn eine Live-Tarifdatenquelle aktiv ist, werden echte Tarife ausgegeben. Ohne Live-Quelle berechnet der Rechner stattdessen transparente Stromkosten-Szenarien auf Basis Ihrer Eingaben.',
  },
  {
    q: 'Wie funktioniert der Rechner ohne Live-Tarifquelle?',
    a: 'Dann rechnet das System ehrliche Vergleichsszenarien mit offen ausgewiesenen Annahmen. Sie erhalten reale Kosten- und Sparpotenzialwerte aus Ihrem Verbrauch, aber keine als live getarnten Anbieterangebote.',
  },
  {
    q: 'Kann ich nur Ökostrom anzeigen lassen?',
    a: 'Ja. Über den Ökostrom-Filter werden Live-Tarife entsprechend gefiltert oder die Modellrechnung auf grüne Szenarien umgestellt.',
  },
  {
    q: 'Wie oft sollte ich Stromtarife neu vergleichen?',
    a: 'Mindestens einmal pro Jahr oder sobald eine Preisgarantie ausläuft. So erkennen Sie schnell, ob ein Anbieterwechsel wieder Einsparpotenzial bringt.',
  },
];

const whyCompare = [
  'Sparen Sie bis zu 30% bei Ihren Stromkosten',
  'Vergleichen Sie alle verfügbaren Anbieter in Ihrer Region',
  'Finden Sie Tarife, die zu Ihren Bedürfnissen passen',
  'Wechseln Sie unkompliziert zu einem besseren Angebot',
];

const whatToConsider = [
  'Grundgebühr und Arbeitspreis',
  'Preisgarantie und Vertragslaufzeit',
  'Kundenbewertungen und Servicequalität',
  'Ökostrom-Optionen und Bonusangebote',
];

export default function InfoSections() {
  return (
    <div className="space-y-16">
      {/* Why Compare Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-12 bg-background rounded-lg"
      >
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold mb-8 text-foreground">
            Warum Stromtarife vergleichen?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whyCompare.map((item, index) => (
              <div key={index} className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <p className="font-paragraph text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* What to Consider Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-12 bg-white rounded-lg"
      >
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold mb-8 text-foreground">
            Worauf sollte ich achten?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whatToConsider.map((item, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex gap-3">
                    <AlertCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
                    <p className="font-paragraph text-gray-700">{item}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-12"
      >
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold mb-8 text-foreground">
            Häufig gestellte Fragen
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="font-heading font-semibold text-left hover:text-primary">
                  <div className="flex gap-2 items-start">
                    <HelpCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{item.q}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="font-paragraph text-gray-700 ml-7">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.section>
    </div>
  );
}
