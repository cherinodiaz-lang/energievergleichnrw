interface Props {
  cityName: string;
  citySlug: string;
}

export default function LocalBusinessSchema({ cityName, citySlug }: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.energievergleich.shop/#organization',
        name: 'EnergieVergleich.shop',
        url: 'https://www.energievergleich.shop',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.energievergleich.shop/logo.png',
          width: 512,
          height: 512,
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          availableLanguage: ['de', 'German'],
        },
        sameAs: [
          'https://www.facebook.com/energievergleich.shop',
          'https://www.instagram.com/energievergleich.shop',
        ],
      },
      {
        '@type': 'Service',
        '@id': `https://www.energievergleich.shop/stromvergleich-${citySlug}#service`,
        serviceType: 'Stromvergleich',
        name: `Stromvergleich ${cityName}`,
        description: `Unabhängiger Stromvergleich für ${cityName}. Vergleichen Sie über 1000 Stromanbieter und sparen Sie bis zu 300€ jährlich.`,
        provider: {
          '@id': 'https://www.energievergleich.shop/#organization',
        },
        areaServed: {
          '@type': 'City',
          name: cityName,
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
          description: 'Kostenloser Stromvergleich',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '127',
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'WebPage',
        '@id': `https://www.energievergleich.shop/stromvergleich-${citySlug}#webpage`,
        url: `https://www.energievergleich.shop/stromvergleich-${citySlug}`,
        name: `Stromvergleich ${cityName} | EnergieVergleich.shop`,
        isPartOf: {
          '@id': 'https://www.energievergleich.shop/#website',
        },
        about: {
          '@id': `https://www.energievergleich.shop/stromvergleich-${citySlug}#service`,
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: `https://www.energievergleich.shop/images/${citySlug}-stromvergleich.jpg`,
        },
        datePublished: '2024-01-01',
        dateModified: '2026-02-28',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
