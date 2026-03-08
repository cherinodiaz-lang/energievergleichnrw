import { useEffect } from 'react';
import { SEO_CONFIG } from '@/lib/seo-config';

export default function LocalBusinessSchema() {
  useEffect(() => {
    const localBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': SEO_CONFIG.organization.url,
      name: SEO_CONFIG.organization.name,
      image: SEO_CONFIG.organization.logo,
      description: SEO_CONFIG.siteDescription,
      url: SEO_CONFIG.organization.url,
      telephone: SEO_CONFIG.organization.contact.telephone,
      email: SEO_CONFIG.organization.contact.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SEO_CONFIG.organization.address.streetAddress,
        addressLocality: SEO_CONFIG.organization.address.addressLocality,
        addressRegion: SEO_CONFIG.organization.address.addressRegion,
        postalCode: SEO_CONFIG.organization.address.postalCode,
        addressCountry: SEO_CONFIG.organization.address.addressCountry,
      },
      geo: {
        '@type': 'GeoShape',
        box: '51.1657 5.8025 52.5200 9.4419', // NRW bounding box (south west north east)
      },
      areaServed: [
        {
          '@type': 'State',
          name: 'Nordrhein-Westfalen',
          url: 'https://de.wikipedia.org/wiki/Nordrhein-Westfalen',
        },
      ],
      sameAs: [
        SEO_CONFIG.social.facebook,
        SEO_CONFIG.social.twitter,
        SEO_CONFIG.social.linkedin,
      ],
      priceRange: '€€',
      serviceType: [
        'Energieberatung',
        'Stromvergleich',
        'Gasvergleich',
        'Photovoltaikberatung',
        'Gewerbeenergie',
      ],
      knowsAbout: [
        'Stromtarife',
        'Gastarife',
        'Photovoltaik',
        'Energiewechsel',
        'Energieberatung',
      ],
    };

    let script = document.getElementById('local-business-schema') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'local-business-schema';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(localBusinessSchema);
      document.head.appendChild(script);
    } else {
      script.textContent = JSON.stringify(localBusinessSchema);
    }
  }, []);

  return null;
}
