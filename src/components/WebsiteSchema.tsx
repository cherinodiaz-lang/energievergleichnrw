import { useEffect } from 'react';
import { SEO_CONFIG } from '@/lib/seo-config';

export default function WebsiteSchema() {
  useEffect(() => {
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
      description: SEO_CONFIG.siteDescription,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SEO_CONFIG.siteUrl}/?q={search_term_string}`,
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
