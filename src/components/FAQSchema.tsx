import { useEffect } from 'react';

type FAQItem = {
  question: string;
  answer: string;
};

interface FAQSchemaProps {
  items: FAQItem[];
}

export default function FAQSchema({ items }: FAQSchemaProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!items || items.length === 0) return;

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      // Guard against race conditions if the element was removed externally.
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [items]);

  return null;
}
