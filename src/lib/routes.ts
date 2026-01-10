/**
 * Routes Configuration
 * Centralized route definitions for the application
 */

// ============================================================================
// ROUTE DEFINITIONS
// ============================================================================

export const ROUTES = {
  // Main Pages
  HOME: '/',
  STROMVERGLEICH_NRW: '/stromvergleich-nrw',
  GASVERGLEICH_NRW: '/gasvergleich-nrw',
  PHOTOVOLTAIK_NRW: '/photovoltaik-nrw',
  GEWERBESTROM: '/gewerbestrom',
  GEWERBEGAS: '/gewerbegas',

  // Information Pages
  KONTAKT: '/kontakt',
  IMPRESSUM: '/impressum',
  DATENSCHUTZ: '/datenschutz',

  // Ratgeber (Guide) Pages
  RATGEBER: '/ratgeber',
  RATGEBER_STROM: '/ratgeber/strom',
  RATGEBER_GAS: '/ratgeber/gas',
  RATGEBER_GEWERBE: '/ratgeber/gewerbe',
  RATGEBER_PHOTOVOLTAIK: '/ratgeber/photovoltaik',
  RATGEBER_WECHSELWISSEN: '/ratgeber/wechselwissen',

  // Ratgeber Strom Articles
  RATGEBER_STROM_GRUNDVERSORGUNG: '/ratgeber/strom/grundversorgung',
  RATGEBER_STROM_ANBIETERWECHSEL: '/ratgeber/strom/stromanbieterwechsel-nrw',
  RATGEBER_STROM_GRUNDVERSORGUNG_VS_SONDERVERTRAG: '/ratgeber/strom/grundversorgung-vs-sondervertrag',
  RATGEBER_STROM_NEUKUNDENBONI: '/ratgeber/strom/neukundenboni-fallen',
  RATGEBER_STROM_PREISERHOEUNG: '/ratgeber/strom/preiserhoeung-was-tun',
  RATGEBER_STROM_UMZUG: '/ratgeber/strom/umzug-stromvertrag',
  RATGEBER_STROM_VERTRAGSLAUFZEIT: '/ratgeber/strom/stromtarif-vertragslaufzeit',
  RATGEBER_STROM_MALO_ID: '/ratgeber/strom/malo-id-zaehlernummer',

  // Ratgeber Gas Articles
  RATGEBER_GAS_ANBIETERWECHSEL: '/ratgeber/gas/gasanbieter-wechseln-nrw',
  RATGEBER_GAS_GRUNDVERSORGUNG_VS_SONDERVERTRAG: '/ratgeber/gas/grundversorgung-gas-sondervertrag',
  RATGEBER_GAS_PREISERHOEUNG: '/ratgeber/gas/preiserhoeung-gas-rechte',
  RATGEBER_GAS_UMZUG: '/ratgeber/gas/umzug-gasvertrag',
  RATGEBER_GAS_HEIZUNGSART: '/ratgeber/gas/heizungsart-verbrauch',
  RATGEBER_GAS_PREISGARANTIE: '/ratgeber/gas/gaspreisgarantie-worauf-achten',

  // Ratgeber Gewerbe Articles
  RATGEBER_GEWERBE_STROMVERTRAG: '/ratgeber/gewerbe/gewerbestrom-vertrag-worauf-achten',
  RATGEBER_GEWERBE_GASBESCHAFFUNG: '/ratgeber/gewerbe/gewerbegas-beschaffung-tipps',
  RATGEBER_GEWERBE_LASTPROFIL: '/ratgeber/gewerbe/lastprofil-leistungspreis-arbeitspreis',

  // Ratgeber Photovoltaik Articles
  RATGEBER_PHOTOVOLTAIK_KOSTEN: '/ratgeber/photovoltaik/pv-kosten-nrw-wovon-abhaengig',
  RATGEBER_PHOTOVOLTAIK_SPEICHER: '/ratgeber/photovoltaik/pv-speicher-lohnt-sich',
  RATGEBER_PHOTOVOLTAIK_EINSPEISEVERGUETUNG: '/ratgeber/photovoltaik/einspeiseverguetung-verstehen',
  RATGEBER_PHOTOVOLTAIK_DACHEIGNUNG: '/ratgeber/photovoltaik/dach-eignung-checkliste',
  RATGEBER_PHOTOVOLTAIK_ANGEBOTE: '/ratgeber/photovoltaik/angebote-vergleichen-fehler',

  // Ratgeber Wechselwissen Articles
  RATGEBER_WECHSELWISSEN_KUENDIGUNGSFRISTEN: '/ratgeber/wechselwissen/kuendigungsfristen-strom-gas',
  RATGEBER_WECHSELWISSEN_WECHSELABLAUF: '/ratgeber/wechselwissen/lieferantenwechsel-ablauf',
  RATGEBER_WECHSELWISSEN_PROBLEME: '/ratgeber/wechselwissen/was-tun-wenn-wechsel-schiefgeht',
} as const;

// ============================================================================
// NAVIGATION MENUS
// ============================================================================

/**
 * Main Navigation Items
 * Primary navigation menu for the header
 */
export const NAV_MAIN = [
  {
    label: 'Stromvergleich',
    href: ROUTES.STROMVERGLEICH_NRW,
    description: 'Finden Sie den besten Stromtarif in NRW',
  },
  {
    label: 'Gasvergleich',
    href: ROUTES.GASVERGLEICH_NRW,
    description: 'Vergleichen Sie Gastarife und sparen Sie',
  },
  {
    label: 'Photovoltaik',
    href: ROUTES.PHOTOVOLTAIK_NRW,
    description: 'Solaranlagen für Ihr Zuhause',
  },
  {
    label: 'Gewerbe',
    href: '#',
    description: 'Lösungen für Unternehmen',
    submenu: [
      {
        label: 'Gewerbestrom',
        href: ROUTES.GEWERBESTROM,
      },
      {
        label: 'Gewerbegas',
        href: ROUTES.GEWERBEGAS,
      },
    ],
  },
  {
    label: 'Ratgeber',
    href: ROUTES.RATGEBER,
    description: 'Wissen und Tipps zu Energie',
  },
] as const;

/**
 * Secondary Navigation Items
 * Additional navigation for footer or secondary menu
 */
export const NAV_SECONDARY = [
  {
    label: 'Kontakt',
    href: ROUTES.KONTAKT,
  },
  {
    label: 'Über uns',
    href: ROUTES.HOME,
  },
  {
    label: 'Blog',
    href: ROUTES.RATGEBER,
  },
] as const;

/**
 * Legal Navigation Items
 * Footer legal links
 */
export const NAV_LEGAL = [
  {
    label: 'Impressum',
    href: ROUTES.IMPRESSUM,
  },
  {
    label: 'Datenschutz',
    href: ROUTES.DATENSCHUTZ,
  },
] as const;

// ============================================================================
// RATGEBER CATEGORIES
// ============================================================================

/**
 * Ratgeber Category Navigation
 * Organized by category for the guide section
 */
export const RATGEBER_CATEGORIES = [
  {
    id: 'strom',
    label: 'Stromvergleich & Tarife',
    href: ROUTES.RATGEBER_STROM,
    icon: 'Zap',
    articles: [
      {
        label: 'Stromgrundversorgung',
        href: ROUTES.RATGEBER_STROM_GRUNDVERSORGUNG,
      },
      {
        label: 'Stromanbieterwechsel NRW',
        href: ROUTES.RATGEBER_STROM_ANBIETERWECHSEL,
      },
      {
        label: 'Grundversorgung vs. Sondervertrag',
        href: ROUTES.RATGEBER_STROM_GRUNDVERSORGUNG_VS_SONDERVERTRAG,
      },
      {
        label: 'Neukundenboni Fallen',
        href: ROUTES.RATGEBER_STROM_NEUKUNDENBONI,
      },
      {
        label: 'Preiserhöhung Was tun',
        href: ROUTES.RATGEBER_STROM_PREISERHOEUNG,
      },
      {
        label: 'Umzug Stromvertrag',
        href: ROUTES.RATGEBER_STROM_UMZUG,
      },
      {
        label: 'Stromtarif Vertragslaufzeit',
        href: ROUTES.RATGEBER_STROM_VERTRAGSLAUFZEIT,
      },
      {
        label: 'MALO ID Zählernummer',
        href: ROUTES.RATGEBER_STROM_MALO_ID,
      },
    ],
  },
  {
    id: 'gas',
    label: 'Gasvergleich & Heizung',
    href: ROUTES.RATGEBER_GAS,
    icon: 'Flame',
    articles: [
      {
        label: 'Gasanbieter wechseln NRW',
        href: ROUTES.RATGEBER_GAS_ANBIETERWECHSEL,
      },
      {
        label: 'Grundversorgung Gas Sondervertrag',
        href: ROUTES.RATGEBER_GAS_GRUNDVERSORGUNG_VS_SONDERVERTRAG,
      },
      {
        label: 'Preiserhöhung Gas Rechte',
        href: ROUTES.RATGEBER_GAS_PREISERHOEUNG,
      },
      {
        label: 'Umzug Gasvertrag',
        href: ROUTES.RATGEBER_GAS_UMZUG,
      },
      {
        label: 'Heizungsart Verbrauch',
        href: ROUTES.RATGEBER_GAS_HEIZUNGSART,
      },
      {
        label: 'Gaspreisgarantie',
        href: ROUTES.RATGEBER_GAS_PREISGARANTIE,
      },
    ],
  },
  {
    id: 'gewerbe',
    label: 'Gewerbeenergie',
    href: ROUTES.RATGEBER_GEWERBE,
    icon: 'Building2',
    articles: [
      {
        label: 'Gewerbestrom Vertrag',
        href: ROUTES.RATGEBER_GEWERBE_STROMVERTRAG,
      },
      {
        label: 'Gewerbegas Beschaffung',
        href: ROUTES.RATGEBER_GEWERBE_GASBESCHAFFUNG,
      },
      {
        label: 'Lastprofil Leistungspreis',
        href: ROUTES.RATGEBER_GEWERBE_LASTPROFIL,
      },
    ],
  },
  {
    id: 'photovoltaik',
    label: 'Photovoltaik & Solar',
    href: ROUTES.RATGEBER_PHOTOVOLTAIK,
    icon: 'Sun',
    articles: [
      {
        label: 'PV Kosten NRW',
        href: ROUTES.RATGEBER_PHOTOVOLTAIK_KOSTEN,
      },
      {
        label: 'PV Speicher',
        href: ROUTES.RATGEBER_PHOTOVOLTAIK_SPEICHER,
      },
      {
        label: 'Einspeisevergütung',
        href: ROUTES.RATGEBER_PHOTOVOLTAIK_EINSPEISEVERGUETUNG,
      },
      {
        label: 'Dach Eignung',
        href: ROUTES.RATGEBER_PHOTOVOLTAIK_DACHEIGNUNG,
      },
      {
        label: 'Angebote vergleichen',
        href: ROUTES.RATGEBER_PHOTOVOLTAIK_ANGEBOTE,
      },
    ],
  },
  {
    id: 'wechselwissen',
    label: 'Wechselwissen',
    href: ROUTES.RATGEBER_WECHSELWISSEN,
    icon: 'BookOpen',
    articles: [
      {
        label: 'Kündigungsfristen',
        href: ROUTES.RATGEBER_WECHSELWISSEN_KUENDIGUNGSFRISTEN,
      },
      {
        label: 'Lieferantenwechsel Ablauf',
        href: ROUTES.RATGEBER_WECHSELWISSEN_WECHSELABLAUF,
      },
      {
        label: 'Was tun wenn Wechsel schiefgeht',
        href: ROUTES.RATGEBER_WECHSELWISSEN_PROBLEME,
      },
    ],
  },
] as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all routes as an array
 */
export function getAllRoutes(): string[] {
  return Object.values(ROUTES);
}

/**
 * Check if a path is a valid route
 */
export function isValidRoute(path: string): boolean {
  return getAllRoutes().includes(path);
}

/**
 * Get ratgeber category by ID
 */
export function getRatgeberCategory(categoryId: string) {
  return RATGEBER_CATEGORIES.find(cat => cat.id === categoryId);
}

/**
 * Get all ratgeber articles
 */
export function getAllRatgeberArticles() {
  return RATGEBER_CATEGORIES.flatMap(cat => cat.articles);
}

/**
 * Find article by href
 */
export function findArticleByHref(href: string) {
  return getAllRatgeberArticles().find(article => article.href === href);
}
