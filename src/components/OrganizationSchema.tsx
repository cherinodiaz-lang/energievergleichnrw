import { useEffect } from 'react';
import { SEO_CONFIG } from '@/lib/seo-config';

export default function OrganizationSchema() {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SEO_CONFIG.organization.name,
      url: SEO_CONFIG.organization.url,
      logo: SEO_CONFIG.organization.logo,
      contactPoint: {
        '@type': 'ContactPoint',
        email: SEO_CONFIG.organization.contact.email,
        telephone: SEO_CONFIG.organization.contact.telephone,
        contactType: 'customer support',
        areaServed: SEO_CONFIG.organization.areaServed,
      },
    };

    let script = document.getElementById('organization-schema') as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.id = 'organization-schema';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(schema);
  }, []);

  return null;
}
