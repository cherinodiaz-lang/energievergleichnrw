import { useEffect } from 'react';

export default function OrganizationSchema() {
  useEffect(() => {
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'energievergleich.nrw',
      url: 'https://energievergleich.nrw',
      logo: 'https://energievergleich.nrw/logo.png',
      description: 'Der einfache Weg zu günstigerem Strom und Gas in NRW. Mit unserem Vergleichsrechner finden Sie schnell die besten Tarife.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Musterstraße 123',
        addressLocality: 'Düsseldorf',
        postalCode: '40210',
        addressCountry: 'DE',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        telephone: '+49-211-1234-5678',
        email: 'kontakt@energievergleich.nrw',
      },
      sameAs: [
        'https://facebook.com/energievergleich',
        'https://twitter.com/energievergleich',
        'https://linkedin.com/company/energievergleich',
      ],
      areaServed: {
        '@type': 'State',
        name: 'Nordrhein-Westfalen',
        url: 'https://de.wikipedia.org/wiki/Nordrhein-Westfalen',
      },
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
