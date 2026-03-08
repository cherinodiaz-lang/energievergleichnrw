import { useEffect } from 'react';

export default function WebsiteSchema() {
  useEffect(() => {
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'energievergleich.nrw',
      url: 'https://www.energievergleich.nrw',
      description: 'Vergleichen Sie Strom- und Gastarife in Nordrhein-Westfalen. Finden Sie die besten Angebote für Privat- und Gewerbekunden.',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://www.energievergleich.nrw/?q={search_term_string}',
        },
        query_input: 'required name=search_term_string',
      },
    };

    let script = document.getElementById('website-schema') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'website-schema';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(websiteSchema);
      document.head.appendChild(script);
    } else {
      script.textContent = JSON.stringify(websiteSchema);
    }
  }, []);

  return null;
}
