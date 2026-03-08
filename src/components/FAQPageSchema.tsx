import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { HufiggestellteFragen } from '@/entities';

export default function FAQPageSchema() {
  const [faqs, setFaqs] = useState<HufiggestellteFragen[]>([]);

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      const faqData = await BaseCrudService.getAll<HufiggestellteFragen>('faq');
      const sortedFaqs = faqData.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
      setFaqs(sortedFaqs);
    } catch (error) {
      console.error('Error loading FAQs for schema:', error);
    }
  };

  useEffect(() => {
    if (faqs.length === 0) return;

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };

    let script = document.getElementById('faq-page-schema') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'faq-page-schema';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(faqSchema);
      document.head.appendChild(script);
    } else {
      script.textContent = JSON.stringify(faqSchema);
    }
  }, [faqs]);

  return null;
}
