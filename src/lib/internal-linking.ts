/**
 * Internal Linking Configuration
 * Manages breadcrumbs, related pages, and anchor text variations
 */

export interface BreadcrumbConfig {
  label: string;
  path: string;
}

export interface RelatedPage {
  title: string;
  description: string;
  path: string;
  icon?: string;
}

export interface AnchorTextVariation {
  primary: string;
  variations: string[];
}

// Breadcrumb configurations for each page
export const breadcrumbConfigs: Record<string, BreadcrumbConfig[]> = {
  '/stromvergleich-nrw': [
    { label: 'Startseite', path: '/' },
    { label: 'Stromvergleich NRW', path: '/stromvergleich-nrw' },
  ],
  '/stromvergleich-essen': [
    { label: 'Startseite', path: '/' },
    { label: 'Stromvergleich Essen', path: '/stromvergleich-essen' },
  ],
  '/stromvergleich-bochum': [
    { label: 'Startseite', path: '/' },
    { label: 'Stromvergleich Bochum', path: '/stromvergleich-bochum' },
  ],
  '/stromvergleich-duisburg': [
    { label: 'Startseite', path: '/' },
    { label: 'Stromvergleich Duisburg', path: '/stromvergleich-duisburg' },
  ],
  '/stromvergleich-koeln': [
    { label: 'Startseite', path: '/' },
    { label: 'Stromvergleich Köln', path: '/stromvergleich-koeln' },
  ],
  '/stromvergleich-duesseldorf': [
    { label: 'Startseite', path: '/' },
    { label: 'Stromvergleich Düsseldorf', path: '/stromvergleich-duesseldorf' },
  ],
  '/stromvergleich-dortmund': [
    { label: 'Startseite', path: '/' },
    { label: 'Stromvergleich Dortmund', path: '/stromvergleich-dortmund' },
  ],
  '/gasvergleich-nrw': [
    { label: 'Startseite', path: '/' },
    { label: 'Gasvergleich NRW', path: '/gasvergleich-nrw' },
  ],
  '/photovoltaik-nrw': [
    { label: 'Startseite', path: '/' },
    { label: 'Photovoltaik NRW', path: '/photovoltaik-nrw' },
  ],
  '/gewerbestrom': [
    { label: 'Startseite', path: '/' },
    { label: 'Gewerbestrom', path: '/gewerbestrom' },
  ],
  '/gewerbegas': [
    { label: 'Startseite', path: '/' },
    { label: 'Gewerbegas', path: '/gewerbegas' },
  ],
  '/kontakt': [
    { label: 'Startseite', path: '/' },
    { label: 'Kontakt', path: '/kontakt' },
  ],
  '/impressum': [
    { label: 'Startseite', path: '/' },
    { label: 'Impressum', path: '/impressum' },
  ],
  '/datenschutz': [
    { label: 'Startseite', path: '/' },
    { label: 'Datenschutz', path: '/datenschutz' },
  ],
  '/methodik': [
    { label: 'Startseite', path: '/' },
    { label: 'Methodik', path: '/methodik' },
  ],
  '/ratgeber': [
    { label: 'Startseite', path: '/' },
    { label: 'Ratgeber', path: '/ratgeber' },
  ],
  '/ratgeber/strom': [
    { label: 'Startseite', path: '/' },
    { label: 'Ratgeber', path: '/ratgeber' },
    { label: 'Strom', path: '/ratgeber/strom' },
  ],
  '/ratgeber/gas': [
    { label: 'Startseite', path: '/' },
    { label: 'Ratgeber', path: '/ratgeber' },
    { label: 'Gas', path: '/ratgeber/gas' },
  ],
  '/ratgeber/gewerbe': [
    { label: 'Startseite', path: '/' },
    { label: 'Ratgeber', path: '/ratgeber' },
    { label: 'Gewerbe', path: '/ratgeber/gewerbe' },
  ],
  '/ratgeber/photovoltaik': [
    { label: 'Startseite', path: '/' },
    { label: 'Ratgeber', path: '/ratgeber' },
    { label: 'Photovoltaik', path: '/ratgeber/photovoltaik' },
  ],
  '/ratgeber/wechselwissen': [
    { label: 'Startseite', path: '/' },
    { label: 'Ratgeber', path: '/ratgeber' },
    { label: 'Wechselwissen', path: '/ratgeber/wechselwissen' },
  ],
  '/blog': [
    { label: 'Startseite', path: '/' },
    { label: 'Blog', path: '/blog' },
  ],
};

// Related pages for comparison pages (cross-linking)
export const relatedPagesConfig: Record<string, RelatedPage[]> = {
  '/stromvergleich-nrw': [
    {
      title: 'Stromvergleich Essen',
      description: 'Stromtarife in Essen vergleichen und passende Angebote finden',
      path: '/stromvergleich-essen',
    },
    {
      title: 'Stromvergleich Bochum',
      description: 'Stromtarife in Bochum vergleichen und passende Angebote finden',
      path: '/stromvergleich-bochum',
    },
    {
      title: 'Stromvergleich Duisburg',
      description: 'Stromtarife in Duisburg vergleichen und passende Angebote finden',
      path: '/stromvergleich-duisburg',
    },
    {
      title: 'Stromvergleich Köln',
      description: 'Stromtarife in Köln vergleichen und passende Angebote finden',
      path: '/stromvergleich-koeln',
    },
    {
      title: 'Gasvergleich NRW',
      description: 'Finden Sie passende Gastarife in Nordrhein-Westfalen',
      path: '/gasvergleich-nrw',
    },
  ],
  '/stromvergleich-essen': [
    {
      title: 'Stromvergleich NRW',
      description: 'Stromtarife in NRW vergleichen – inkl. Tipps und Ratgeber',
      path: '/stromvergleich-nrw',
    },
    {
      title: 'Gasvergleich NRW',
      description: 'Auch Gastarife vergleichen und zusätzlich sparen',
      path: '/gasvergleich-nrw',
    },
    {
      title: 'Photovoltaik NRW',
      description: 'Photovoltaik: Kosten, Förderung und Beratung in NRW',
      path: '/photovoltaik-nrw',
    },
    {
      title: 'Stromvergleich Bochum',
      description: 'Stromtarife für Bochum vergleichen',
      path: '/stromvergleich-bochum',
    },
    {
      title: 'Stromvergleich Duisburg',
      description: 'Stromtarife für Duisburg vergleichen',
      path: '/stromvergleich-duisburg',
    },
  ],
  '/stromvergleich-bochum': [
    {
      title: 'Stromvergleich NRW',
      description: 'Stromtarife in NRW vergleichen – inkl. Tipps und Ratgeber',
      path: '/stromvergleich-nrw',
    },
    {
      title: 'Gasvergleich NRW',
      description: 'Auch Gastarife vergleichen und zusätzlich sparen',
      path: '/gasvergleich-nrw',
    },
    {
      title: 'Photovoltaik NRW',
      description: 'Photovoltaik: Kosten, Förderung und Beratung in NRW',
      path: '/photovoltaik-nrw',
    },
    {
      title: 'Stromvergleich Essen',
      description: 'Stromtarife für Essen vergleichen',
      path: '/stromvergleich-essen',
    },
    {
      title: 'Stromvergleich Duisburg',
      description: 'Stromtarife für Duisburg vergleichen',
      path: '/stromvergleich-duisburg',
    },
  ],
  '/stromvergleich-duisburg': [
    {
      title: 'Stromvergleich NRW',
      description: 'Stromtarife in NRW vergleichen – inkl. Tipps und Ratgeber',
      path: '/stromvergleich-nrw',
    },
    {
      title: 'Gasvergleich NRW',
      description: 'Auch Gastarife vergleichen und zusätzlich sparen',
      path: '/gasvergleich-nrw',
    },
    {
      title: 'Photovoltaik NRW',
      description: 'Photovoltaik: Kosten, Förderung und Beratung in NRW',
      path: '/photovoltaik-nrw',
    },
    {
      title: 'Stromvergleich Essen',
      description: 'Stromtarife für Essen vergleichen',
      path: '/stromvergleich-essen',
    },
    {
      title: 'Stromvergleich Bochum',
      description: 'Stromtarife für Bochum vergleichen',
      path: '/stromvergleich-bochum',
    },
  ],
  '/stromvergleich-koeln': [
    {
      title: 'Stromvergleich NRW',
      description: 'Stromtarife in NRW vergleichen – inkl. Tipps und Ratgeber',
      path: '/stromvergleich-nrw',
    },
    {
      title: 'Gasvergleich NRW',
      description: 'Gastarife in NRW vergleichen',
      path: '/gasvergleich-nrw',
    },
    {
      title: 'Photovoltaik NRW',
      description: 'Photovoltaik: Infos und Beratung in NRW',
      path: '/photovoltaik-nrw',
    },
    {
      title: 'Stromvergleich Essen',
      description: 'Stromtarife für Essen vergleichen',
      path: '/stromvergleich-essen',
    },
  ],
  '/stromvergleich-duesseldorf': [
    {
      title: 'Stromvergleich NRW',
      description: 'Stromtarife in NRW vergleichen – inkl. Tipps und Ratgeber',
      path: '/stromvergleich-nrw',
    },
    {
      title: 'Gasvergleich NRW',
      description: 'Gastarife in NRW vergleichen',
      path: '/gasvergleich-nrw',
    },
    {
      title: 'Photovoltaik NRW',
      description: 'Photovoltaik: Infos und Beratung in NRW',
      path: '/photovoltaik-nrw',
    },
    {
      title: 'Stromvergleich Essen',
      description: 'Stromtarife für Essen vergleichen',
      path: '/stromvergleich-essen',
    },
  ],
  '/stromvergleich-dortmund': [
    {
      title: 'Stromvergleich NRW',
      description: 'Stromtarife in NRW vergleichen – inkl. Tipps und Ratgeber',
      path: '/stromvergleich-nrw',
    },
    {
      title: 'Gasvergleich NRW',
      description: 'Gastarife in NRW vergleichen',
      path: '/gasvergleich-nrw',
    },
    {
      title: 'Photovoltaik NRW',
      description: 'Photovoltaik: Infos und Beratung in NRW',
      path: '/photovoltaik-nrw',
    },
    {
      title: 'Stromvergleich Essen',
      description: 'Stromtarife für Essen vergleichen',
      path: '/stromvergleich-essen',
    },
  ],
  '/gasvergleich-nrw': [
    {
      title: 'Stromvergleich NRW',
      description: 'Finden Sie passende Stromtarife in Nordrhein-Westfalen',
      path: '/stromvergleich-nrw',
    },
    {
      title: 'Photovoltaik NRW',
      description: 'Infos und Beratung rund um Photovoltaik in NRW',
      path: '/photovoltaik-nrw',
    },
    {
      title: 'Gewerbegas',
      description: 'Sparen Sie bei Ihren Gaskosten für Ihr Gewerbe',
      path: '/gewerbegas',
    },
  ],
  '/photovoltaik-nrw': [
    {
      title: 'Stromvergleich NRW',
      description: 'Finden Sie passende Stromtarife in Nordrhein-Westfalen',
      path: '/stromvergleich-nrw',
    },
    {
      title: 'Gasvergleich NRW',
      description: 'Finden Sie passende Gastarife in Nordrhein-Westfalen',
      path: '/gasvergleich-nrw',
    },
    {
      title: 'Gewerbestrom',
      description: 'Sparen Sie bei Ihren Stromkosten für Ihr Gewerbe',
      path: '/gewerbestrom',
    },
  ],
  '/gewerbestrom': [
    {
      title: 'Stromvergleich NRW',
      description: 'Finden Sie passende Stromtarife für Privathaushalte',
      path: '/stromvergleich-nrw',
    },
    {
      title: 'Gewerbegas',
      description: 'Sparen Sie bei Ihren Gaskosten für Ihr Gewerbe',
      path: '/gewerbegas',
    },
    {
      title: 'Photovoltaik NRW',
      description: 'Vergleichen Sie Solaranlagen und Photovoltaik-Angebote',
      path: '/photovoltaik-nrw',
    },
  ],
  '/gewerbegas': [
    {
      title: 'Gasvergleich NRW',
      description: 'Finden Sie passende Gastarife für Privathaushalte',
      path: '/gasvergleich-nrw',
    },
    {
      title: 'Gewerbestrom',
      description: 'Sparen Sie bei Ihren Stromkosten für Ihr Gewerbe',
      path: '/gewerbestrom',
    },
    {
      title: 'Photovoltaik NRW',
      description: 'Vergleichen Sie Solaranlagen und Photovoltaik-Angebote',
      path: '/photovoltaik-nrw',
    },
  ],
};

// Anchor text variations for SEO diversity
export const anchorTextVariations: Record<string, AnchorTextVariation> = {
  '/stromvergleich-nrw': {
    primary: 'Stromvergleich NRW',
    variations: [
      'Stromvergleich NRW',
      'Günstige Stromtarife in NRW',
      'Strom wechseln in Nordrhein-Westfalen',
      'NRW Stromtarife vergleichen',
      'Stromtarife NRW',
    ],
  },
  '/stromvergleich-essen': {
    primary: 'Stromvergleich Essen',
    variations: [
      'Stromtarife Essen',
      'Stromanbieter in Essen vergleichen',
      'Strom wechseln in Essen',
      'Stromkosten in Essen senken',
      'Stromvergleich für Essen',
    ],
  },
  '/stromvergleich-bochum': {
    primary: 'Stromvergleich Bochum',
    variations: [
      'Stromtarife Bochum',
      'Stromanbieter in Bochum vergleichen',
      'Strom wechseln in Bochum',
      'Stromkosten in Bochum senken',
      'Stromvergleich für Bochum',
    ],
  },
  '/stromvergleich-duisburg': {
    primary: 'Stromvergleich Duisburg',
    variations: [
      'Stromtarife Duisburg',
      'Stromanbieter in Duisburg vergleichen',
      'Strom wechseln in Duisburg',
      'Stromkosten in Duisburg senken',
      'Stromvergleich für Duisburg',
    ],
  },
  '/stromvergleich-koeln': {
    primary: 'Stromvergleich Köln',
    variations: [
      'Stromtarife Köln',
      'Stromanbieter in Köln vergleichen',
      'Strom wechseln in Köln',
      'Stromkosten in Köln senken',
      'Stromvergleich für Köln',
    ],
  },
  '/stromvergleich-duesseldorf': {
    primary: 'Stromvergleich Düsseldorf',
    variations: [
      'Stromtarife Düsseldorf',
      'Stromanbieter in Düsseldorf vergleichen',
      'Strom wechseln in Düsseldorf',
      'Stromkosten in Düsseldorf senken',
      'Stromvergleich für Düsseldorf',
    ],
  },
  '/stromvergleich-dortmund': {
    primary: 'Stromvergleich Dortmund',
    variations: [
      'Stromtarife Dortmund',
      'Stromanbieter in Dortmund vergleichen',
      'Strom wechseln in Dortmund',
      'Stromkosten in Dortmund senken',
      'Stromvergleich für Dortmund',
    ],
  },
  '/gasvergleich-nrw': {
    primary: 'Gasvergleich NRW',
    variations: [
      'Gasvergleich NRW',
      'Günstige Gastarife in NRW',
      'Gas wechseln in Nordrhein-Westfalen',
      'NRW Gastarife vergleichen',
      'Gastarife NRW',
    ],
  },
  '/photovoltaik-nrw': {
    primary: 'Photovoltaik NRW',
    variations: [
      'Photovoltaik NRW',
      'Solaranlagen in NRW',
      'Photovoltaik Vergleich NRW',
      'PV-Anlagen NRW',
      'Solaranlage vergleichen',
    ],
  },
  '/gewerbestrom': {
    primary: 'Gewerbestrom',
    variations: [
      'Gewerbestrom',
      'Gewerbestrom Vergleich',
      'Stromtarife für Gewerbe',
      'Günstige Gewerbestromtarife',
      'Gewerbestrom sparen',
    ],
  },
  '/gewerbegas': {
    primary: 'Gewerbegas',
    variations: [
      'Gewerbegas',
      'Gewerbegas Vergleich',
      'Gastarife für Gewerbe',
      'Günstige Gewerbegas-Tarife',
      'Gewerbegas sparen',
    ],
  },
};

/**
 * Get breadcrumb items for a given path
 */
export function getBreadcrumbItems(pathname: string): BreadcrumbConfig[] {
  return breadcrumbConfigs[pathname] || [];
}

/**
 * Get related pages for a given path
 */
export function getRelatedPages(pathname: string): RelatedPage[] {
  return relatedPagesConfig[pathname] || [];
}

/**
 * Get anchor text variation for a given path
 * Rotates through variations for SEO diversity
 */
export function getAnchorText(pathname: string, index: number = 0): string {
  const variation = anchorTextVariations[pathname];
  if (!variation) return '';

  const allVariations = [variation.primary, ...variation.variations];
  return allVariations[index % allVariations.length];
}

/**
 * Get all anchor text variations for a given path
 */
export function getAllAnchorTexts(pathname: string): string[] {
  const variation = anchorTextVariations[pathname];
  if (!variation) return [];

  return [variation.primary, ...variation.variations];
}

/**
 * Map article categories to relevant comparison pages
 */
export const articleToComparatorMapping: Record<string, string[]> = {
  'strom': ['/stromvergleich-nrw'],
  'gas': ['/gasvergleich-nrw'],
  'photovoltaik': ['/photovoltaik-nrw'],
  'gewerbe': ['/gewerbestrom', '/gewerbegas'],
  'wechselwissen': ['/stromvergleich-nrw', '/gasvergleich-nrw'],
};

/**
 * Get comparison pages for an article category
 */
export function getComparatorPagesForCategory(category: string): string[] {
  return articleToComparatorMapping[category.toLowerCase()] || [];
}
