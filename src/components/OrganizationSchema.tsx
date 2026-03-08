import { useEffect } from 'react';
import { SEO_CONFIG } from '@/lib/seo-config';

export default function OrganizationSchema() {
  useEffect(() => {
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SEO_CONFIG.organization.name,
      legalName: SEO_CONFIG.organization.legalName,
      url: SEO_CONFIG.organization.url,
      logo: SEO_CONFIG.organization.logo,
      description: SEO_CONFIG.siteDescription,
      sameAs: [
        SEO_CONFIG.social.facebook,
        SEO_CONFIG.social.twitter,
        SEO_CONFIG.social.linkedin,
      ],
      areaServed: SEO_CONFIG.organization.areaServed,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        email: SEO_CONFIG.organization.contact.email,
        telephone: SEO_CONFIG.organization.contact.telephone,
        availableLanguage: ['de', 'en'],
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: SEO_CONFIG.organization.address.streetAddress,
        addressLocality: SEO_CONFIG.organization.address.addressLocality,
        addressRegion: SEO_CONFIG.organization.address.addressRegion,
        postalCode: SEO_CONFIG.organization.address.postalCode,
        addressCountry: SEO_CONFIG.organization.address.addressCountry,
      },
    };

    let script = document.getElementById('organization-schema') as HTMLScriptElement | null;
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
