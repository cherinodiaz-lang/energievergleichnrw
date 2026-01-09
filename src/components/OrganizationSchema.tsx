import { useEffect } from 'react';
import { SEO_CONFIG } from '@/lib/seo-config';

export default function OrganizationSchema() {
  useEffect(() => {
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SEO_CONFIG.organization.name,
      url: SEO_CONFIG.siteUrl,
      sameAs: [
        SEO_CONFIG.social.facebook,
        SEO_CONFIG.social.twitter,
        SEO_CONFIG.social.linkedin,
      ],
      areaServed: SEO_CONFIG.organization.areaServed,
    };

    let script = document.getElementById('organization-schema');
    if (!script) {
      script = document.createElement('script');
      script.id = 'organization-schema';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(organizationSchema);
      document.head.appendChild(script);
    } else {
      script.textContent = JSON.stringify(organizationSchema);
    }
  }, []);

  return null;
}
