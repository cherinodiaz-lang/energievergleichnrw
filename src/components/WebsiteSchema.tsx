import { useEffect } from 'react';
import { SEO_CONFIG } from '@/lib/seo-config';

export default function WebsiteSchema() {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SEO_CONFIG.siteUrl}/ratgeber?query={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    };

    let script = document.getElementById('website-schema') as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.id = 'website-schema';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(schema);
  }, []);

  return null;
}
