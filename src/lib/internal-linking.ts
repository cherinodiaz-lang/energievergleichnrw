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
      title: 'Gasvergleich NRW',
      description: 'Finden Sie die günstigsten Gastarife in Nordrhein-Westfalen',
      path: '/gasvergleich-nrw',
    },
    {
      title: 'Photovoltaik NRW',
      description: 'Vergleichen Sie Solaranlagen und Photovoltaik-Angebote',
      path: '/photovoltaik-nrw',
    },
    {
      title: 'Gewerbestrom',
      description: 'Sparen Sie bei Ihren Stromkosten für Ihr Gewerbe',
      path: '/gewerbestrom',
    },
  ],
  '/gasvergleich-nrw': [
    {
      title: 'Stromvergleich NRW',
      description: 'Finden Sie die günstigsten Stromtarife in Nordrhein-Westfalen',
      path: '/stromvergleich-nrw',
    },
    {
      title: 'Photovoltaik NRW',
      description: 'Vergleichen Sie Solaranlagen und Photovoltaik-Angebote',
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
      description: 'Finden Sie die günstigsten Stromtarife in Nordrhein-Westfalen',
      path: '/stromvergleich-nrw',
    },
    {
      title: 'Gasvergleich NRW',
      description: 'Finden Sie die günstigsten Gastarife in Nordrhein-Westfalen',
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
      description: 'Finden Sie die günstigsten Stromtarife für Privathaushalte',
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
      description: 'Finden Sie die günstigsten Gastarife für Privathaushalte',
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
