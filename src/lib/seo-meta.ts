/**
 * SEO Meta Descriptions Generator
 * Generiert keyword-reiche, unique Meta-Descriptions für jede City-Page
 */

interface CityMeta {
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  ogTitle: string;
  ogDescription: string;
}

const cityData: Record<string, { population: string; region: string; highlight: string }> = {
  koeln: {
    population: '1,1 Mio.',
    region: 'Rheinland',
    highlight: 'Domstadt am Rhein',
  },
  duesseldorf: {
    population: '620.000',
    region: 'Rheinland',
    highlight: 'Landeshauptstadt NRW',
  },
  dortmund: {
    population: '590.000',
    region: 'Ruhrgebiet',
    highlight: 'größte Stadt im Ruhrgebiet',
  },
  essen: {
    population: '580.000',
    region: 'Ruhrgebiet',
    highlight: 'Grüne Hauptstadt Europas',
  },
  duisburg: {
    population: '500.000',
    region: 'Ruhrgebiet',
    highlight: 'größter Binnenhafen Europas',
  },
  bochum: {
    population: '365.000',
    region: 'Ruhrgebiet',
    highlight: 'Universitätsstadt im Ruhrgebiet',
  },
  wuppertal: {
    population: '355.000',
    region: 'Bergisches Land',
    highlight: 'Stadt der Schwebebahn',
  },
  bielefeld: {
    population: '335.000',
    region: 'Ostwestfalen-Lippe',
    highlight: 'größte Stadt in OWL',
  },
  bonn: {
    population: '330.000',
    region: 'Rheinland',
    highlight: 'ehemalige Bundeshauptstadt',
  },
  muenster: {
    population: '315.000',
    region: 'Münsterland',
    highlight: 'Fahrradstadt und Universitätsstadt',
  },
};

export function generateCityMeta(city: string): CityMeta {
  const cityKey = city.toLowerCase().replace(/ü/g, 'ue').replace(/ö/g, 'oe').replace(/ä/g, 'ae');
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);
  const data = cityData[cityKey] || { population: '', region: 'NRW', highlight: '' };
  const currentYear = new Date().getFullYear();

  return {
    title: `Stromvergleich ${cityName} ${currentYear} – Günstige Stromanbieter finden`,

    description: `⚡ Stromvergleich ${cityName}: Jetzt Stromanbieter vergleichen und bis zu 800€/Jahr sparen! ${data.highlight ? `${data.highlight} – ` : ''}Kostenlos, unabhängig & in nur 2 Minuten. 🚀 ${currentYear} aktuell!`,

    keywords: [
      `stromvergleich ${city.toLowerCase()}`,
      `stromanbieter ${city.toLowerCase()}`,
      `strom wechseln ${city.toLowerCase()}`,
      `günstiger strom ${city.toLowerCase()}`,
      `strompreise ${city.toLowerCase()}`,
      `ökostrom ${city.toLowerCase()}`,
      `stromtarife ${city.toLowerCase()} ${currentYear}`,
      `energievergleich ${city.toLowerCase()}`,
    ],

    h1: `Stromvergleich ${cityName} – Die besten Tarife ${currentYear}`,

    ogTitle: `💡 Stromvergleich ${cityName} | Bis zu 800€ sparen ${currentYear}`,

    ogDescription: `Vergleichen Sie jetzt Stromanbieter in ${cityName} (${data.population} Einwohner). Kostenlos, schnell & transparent. Finden Sie den perfekten Tarif für Ihren Haushalt!`,
  };
}

export function generateBreadcrumbs(city: string) {
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);
  const citySlug = city.toLowerCase().replace(/ü/g, 'ue').replace(/ö/g, 'oe').replace(/ä/g, 'ae');

  return [
    { name: 'Startseite', url: '/' },
    { name: 'Stromvergleich NRW', url: '/stromvergleich' },
    { name: `Stromvergleich ${cityName}`, url: `/stromvergleich-${citySlug}` },
  ];
}

export const citySEOConfig = {
  defaultImage: '/images/og-stromvergleich.jpg',
  twitterCard: 'summary_large_image',
  locale: 'de_DE',
  type: 'website',
};
