/**
 * Internal Linking Configuration
 * Manages breadcrumbs, related pages, and anchor text variations
 *
 * City-Cluster Strategy (Issue #21)
 * - City pages (/stromvergleich-<city>) should primarily link to 4–6 other relevant city pages.
 * - Clusters define the "closest" set first (e.g., Ruhrgebiet, Rheinland), then we fill remaining slots
 *   with nearby clusters to reach 4–6 links while avoiding duplicates.
 * - Edit CITY_PAGES and CITY_CLUSTERS to adjust the city network.
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
  '/stromvergleich-wuppertal': [
    { label: 'Startseite', path: '/' },
    { label: 'Stromvergleich Wuppertal', path: '/stromvergleich-wuppertal' },
  ],
  '/stromvergleich-bielefeld': [
    { label: 'Startseite', path: '/' },
    { label: 'Stromvergleich Bielefeld', path: '/stromvergleich-bielefeld' },
  ],
  '/stromvergleich-bonn': [
    { label: 'Startseite', path: '/' },
    { label: 'Stromvergleich Bonn', path: '/stromvergleich-bonn' },
  ],
  '/stromvergleich-muenster': [
    { label: 'Startseite', path: '/' },
    { label: 'Stromvergleich Münster', path: '/stromvergleich-muenster' },
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

type CityClusterKey = 'ruhrgebiet' | 'rheinland' | 'muensterland' | 'owl' | 'bergisches';

type CityPageMeta = {
  path: string;
  cityName: string;
  cluster: CityClusterKey;
};

const CITY_PAGES: CityPageMeta[] = [
  { path: '/stromvergleich-bochum', cityName: 'Bochum', cluster: 'ruhrgebiet' },
  { path: '/stromvergleich-dortmund', cityName: 'Dortmund', cluster: 'ruhrgebiet' },
  { path: '/stromvergleich-duisburg', cityName: 'Duisburg', cluster: 'ruhrgebiet' },
  { path: '/stromvergleich-essen', cityName: 'Essen', cluster: 'ruhrgebiet' },

  { path: '/stromvergleich-koeln', cityName: 'Köln', cluster: 'rheinland' },
  { path: '/stromvergleich-duesseldorf', cityName: 'Düsseldorf', cluster: 'rheinland' },
  { path: '/stromvergleich-bonn', cityName: 'Bonn', cluster: 'rheinland' },

  { path: '/stromvergleich-muenster', cityName: 'Münster', cluster: 'muensterland' },
  { path: '/stromvergleich-bielefeld', cityName: 'Bielefeld', cluster: 'owl' },
  { path: '/stromvergleich-wuppertal', cityName: 'Wuppertal', cluster: 'bergisches' },
];

const CITY_BY_PATH: Record<string, CityPageMeta> = CITY_PAGES.reduce(
  (acc, item) => {
    acc[item.path] = item;
    return acc;
  },
  {} as Record<string, CityPageMeta>
);

const CITY_CLUSTERS: Record<CityClusterKey, string[]> = {
  ruhrgebiet: ['/stromvergleich-bochum', '/stromvergleich-dortmund', '/stromvergleich-duisburg', '/stromvergleich-essen'],
  rheinland: ['/stromvergleich-koeln', '/stromvergleich-duesseldorf', '/stromvergleich-bonn'],
  muensterland: ['/stromvergleich-muenster'],
  owl: ['/stromvergleich-bielefeld'],
  bergisches: ['/stromvergleich-wuppertal'],
};

const CLUSTER_FALLBACKS: Record<CityClusterKey, CityClusterKey[]> = {
  ruhrgebiet: ['rheinland', 'bergisches', 'muensterland', 'owl'],
  rheinland: ['bergisches', 'ruhrgebiet', 'muensterland', 'owl'],
  bergisches: ['rheinland', 'ruhrgebiet', 'muensterland', 'owl'],
  muensterland: ['owl', 'ruhrgebiet', 'rheinland', 'bergisches'],
  owl: ['muensterland', 'ruhrgebiet', 'rheinland', 'bergisches'],
};

function isCityStromvergleichPath(pathname: string): boolean {
  return pathname.startsWith('/stromvergleich-') && pathname !== '/stromvergleich-nrw' && Boolean(CITY_BY_PATH[pathname]);
}

function uniquePaths(paths: string[]): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const p of paths) {
    if (!p) continue;
    if (seen.has(p)) continue;
    seen.add(p);
    out.push(p);
  }
  return out;
}

function buildCityClusterLinks(sourcePath: string, limit: number = 6): string[] {
  const meta = CITY_BY_PATH[sourcePath];
  if (!meta) return [];

  const primary = CITY_CLUSTERS[meta.cluster] || [];
  const fallbacks = CLUSTER_FALLBACKS[meta.cluster] || [];

  const candidateBuckets: string[][] = [
    primary,
    ...fallbacks.map((k) => CITY_CLUSTERS[k] || []),
  ];

  const candidates: string[] = [];
  for (const bucket of candidateBuckets) {
    for (const p of bucket) {
      if (p !== sourcePath) candidates.push(p);
    }
  }

  const unique = uniquePaths(candidates);
  return unique.slice(0, Math.max(0, limit));
}

function toCityRelatedPage(destPath: string, index: number): RelatedPage {
  const meta = CITY_BY_PATH[destPath];
  const cityName = meta?.cityName || '';

  const title = getAnchorText(destPath, index + 1) || `Stromvergleich ${cityName}`;

  return {
    title,
    description: `Stromtarife in ${cityName} vergleichen und passende Angebote finden`,
    path: destPath,
  };
}

function getCityRelatedPages(sourcePath: string): RelatedPage[] {
  const destPaths = buildCityClusterLinks(sourcePath, 6);
  return destPaths.map((p, i) => toCityRelatedPage(p, i));
}

// Related pages for comparison pages (cross-linking)
// Note: City pages (/stromvergleich-<city>) use cluster logic above and are NOT in this config.
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
      title: 'Stromvergleich Wuppertal',
      description: 'Stromtarife in Wuppertal vergleichen und passende Angebote finden',
      path: '/stromvergleich-wuppertal',
    },
    {
      title: 'Stromvergleich Bielefeld',
      description: 'Stromtarife in Bielefeld vergleichen und passende Angebote finden',
      path: '/stromvergleich-bielefeld',
    },
    {
      title: 'Stromvergleich Bonn',
      description: 'Stromtarife in Bonn vergleichen und passende Angebote finden',
      path: '/stromvergleich-bonn',
    },
    {
      title: 'Stromvergleich Münster',
      description: 'Stromtarife in Münster vergleichen und passende Angebote finden',
      path: '/stromvergleich-muenster',
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
  '/stromvergleich-wuppertal': {
    primary: 'Stromvergleich Wuppertal',
    variations: [
      'Stromtarife Wuppertal',
      'Stromanbieter in Wuppertal vergleichen',
      'Strom wechseln in Wuppertal',
      'Stromkosten in Wuppertal senken',
      'Stromvergleich für Wuppertal',
    ],
  },
  '/stromvergleich-bielefeld': {
    primary: 'Stromvergleich Bielefeld',
    variations: [
      'Stromtarife Bielefeld',
      'Stromanbieter in Bielefeld vergleichen',
      'Strom wechseln in Bielefeld',
      'Stromkosten in Bielefeld senken',
      'Stromvergleich für Bielefeld',
    ],
  },
  '/stromvergleich-bonn': {
    primary: 'Stromvergleich Bonn',
    variations: [
      'Stromtarife Bonn',
      'Stromanbieter in Bonn vergleichen',
      'Strom wechseln in Bonn',
      'Stromkosten in Bonn senken',
      'Stromvergleich für Bonn',
    ],
  },
  '/stromvergleich-muenster': {
    primary: 'Stromvergleich Münster',
    variations: [
      'Stromtarife Münster',
      'Stromanbieter in Münster vergleichen',
      'Strom wechseln in Münster',
      'Stromkosten in Münster senken',
      'Stromvergleich für Münster',
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
  if (isCityStromvergleichPath(pathname)) {
    return getCityRelatedPages(pathname);
  }

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
