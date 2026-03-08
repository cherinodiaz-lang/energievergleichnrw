import { useEffect } from 'react';

export default function ReviewSchema() {
  useEffect(() => {
    const reviewSchema = {
      '@context': 'https://schema.org',
      '@type': 'AggregateRating',
      '@id': 'https://www.energievergleich.shop/#reviews',
      ratingValue: '4.8',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '3',
      reviewCount: '3',
      review: [
        {
          '@type': 'Review',
          '@id': 'https://www.energievergleich.shop/#review-anna-mueller',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5',
            bestRating: '5',
            worstRating: '1',
          },
          reviewBody: 'Dank EnergievergleichNRW konnten wir unsere Stromkosten erheblich senken. Der Service war hervorragend und die Beratung sehr kompetent. Absolut empfehlenswert!',
          author: {
            '@type': 'Person',
            name: 'Anna Müller',
          },
          datePublished: new Date().toISOString().split('T')[0],
        },
        {
          '@type': 'Review',
          '@id': 'https://www.energievergleich.shop/#review-max-schmidt',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5',
            bestRating: '5',
            worstRating: '1',
          },
          reviewBody: 'Der Gasvergleich war super einfach und hat uns viel Geld gespart. Wir sind sehr zufrieden mit dem neuen Anbieter und dem reibungslosen Wechsel.',
          author: {
            '@type': 'Person',
            name: 'Max Schmidt',
          },
          datePublished: new Date().toISOString().split('T')[0],
        },
        {
          '@type': 'Review',
          '@id': 'https://www.energievergleich.shop/#review-lisa-meier',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5',
            bestRating: '5',
            worstRating: '1',
          },
          reviewBody: 'Die Photovoltaik-Beratung war top! Wir haben jetzt unsere eigene Solaranlage und sind begeistert von der Unabhängigkeit und den Einsparungen.',
          author: {
            '@type': 'Person',
            name: 'Lisa Meier',
          },
          datePublished: new Date().toISOString().split('T')[0],
        },
      ],
    };

    let script = document.getElementById('review-schema') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'review-schema';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(reviewSchema);
      document.head.appendChild(script);
    } else {
      script.textContent = JSON.stringify(reviewSchema);
    }
  }, []);

  return null;
}
