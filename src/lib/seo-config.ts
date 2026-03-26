/**
 * SEO Configuration
 * Centralized SEO settings and metadata
 * Optimiert: 26.03.2026 – Alle Seiten mit klaren Titles & Descriptions
 */
export const SEO_CONFIG = {
  // Site Information
  // PRIMARY DOMAIN: https://www.energievergleich.shop
  siteName: 'energievergleich.shop',
  siteUrl: 'https://www.energievergleich.shop',
  siteDescription: 'Erstorientierung zu Strom, Gas und Photovoltaik in Nordrhein-Westfalen. Transparente Beispielrechner, Beratung und unverbindliche Anfragen.',

  // Organization Information (complete details for schema)
  organization: {
    name: 'energievergleich.shop',
    legalName: 'energievergleich.shop',
    url: 'https://www.energievergleich.shop',
    logo: 'https://static.wixstatic.com/media/32e7c0_8cede5e338be484bb8dcaad81c053c82~mv2.png?originWidth=1920&originHeight=1024',
    areaServed: 'Nordrhein-Westfalen',
    contact: {
      email: 'support@energievergleich.nrw',
      telephone: '+49 (0) 2 01 - 1 03 - 39 39',
    },
    address: {
      streetAddress: '',
      addressLocality: 'Oelde',
      addressRegion: 'NRW',
      postalCode: '59302',
      addressCountry: 'DE',
    },
  },

  // Social Media
  social: {
    facebook: 'https://facebook.com/energievergleich',
    twitter: 'https://twitter.com/energievergleich',
    linkedin: 'https://linkedin.com/company/energievergleich',
    twitterHandle: '@energievergleich',
  },

  // Default OG Image
  defaultOgImage: 'https://static.wixstatic.com/media/32e7c0_8cede5e338be484bb8dcaad81c053c82~mv2.png?originWidth=1920&originHeight=1024',

  // Language
  language: 'de',

  // Search Console & Analytics (add your IDs here)
  googleSearchConsoleVerification: '', // Add your verification code
  googleAnalyticsId: 'G-X60BTL057V', // GA4 Measurement ID for www.energievergleich.shop
  clarityProjectId: import.meta.env.PUBLIC_CLARITY_ID ?? '', // Microsoft Clarity Project ID

  // Robots Meta
  robots: 'index, follow',

  // Keywords
  keywords: {
    home: 'Energievergleich NRW, Stromvergleich NRW, Gasvergleich NRW, Photovoltaik NRW, Energie sparen NRW 2026',
    gewerbestrom: 'Gewerbestrom NRW, Stromtarife Unternehmen NRW, Gewerbekunden Strom, Stromvergleich Gewerbe NRW 2026',
    gewerbegas: 'Gewerbegas NRW, Gastarife Unternehmen NRW, Gewerbekunden Gas, Gasvergleich Gewerbe NRW 2026',
  },
};

/**
 * Get page-specific SEO metadata
 */
export function getPageSEO(page: 'home' | 'gewerbestrom' | 'gewerbegas' | 'stromvergleich' | 'gasvergleich' | 'photovoltaik' | 'kontakt' | 'ratgeber' | 'datenschutz' | 'impressum' | 'methodik') {
  const baseConfig = {
    siteName: SEO_CONFIG.siteName,
    siteUrl: SEO_CONFIG.siteUrl,
    defaultImage: SEO_CONFIG.defaultOgImage,
  };

  const pageConfigs = {
    home: {
      title: 'Energievergleich NRW 2026 | Strom, Gas & Photovoltaik – kostenlos orientieren',
      description: 'Strom, Gas & Photovoltaik in NRW vergleichen: Transparente Tariforientierung, Beispielrechner und unverbindliche Beratung für Privat- und Gewerbekunden. Jetzt kostenlos starten.',
      keywords: SEO_CONFIG.keywords.home,
      ogTitle: 'Energievergleich NRW 2026 | Strom, Gas & Photovoltaik kostenlos vergleichen',
      ogDescription: 'Transparente Tariforientierung für Strom, Gas & Photovoltaik in NRW. Kostenlos, unverbindlich und ohne Anmeldung.',
    },
    stromvergleich: {
      title: 'Stromvergleich NRW 2026 | Günstige Stromanbieter finden & wechseln',
      description: 'Jetzt Stromanbieter in NRW vergleichen: Aktuelle Tarife 2026, transparente Beispielrechner und unverbindliche Anfrage für Ihren Haushalt. In 3 Minuten zum günstigeren Strom.',
      keywords: 'Stromvergleich NRW 2026, Stromanbieter wechseln NRW, günstige Stromtarife, Strom sparen NRW, bester Stromanbieter NRW',
      ogTitle: 'Stromvergleich NRW 2026 | Günstige Stromanbieter vergleichen',
      ogDescription: 'Stromanbieter in NRW vergleichen und bis zu 400 € sparen. Transparente Tarife, kostenlose Anfrage.',
    },
    gasvergleich: {
      title: 'Gasvergleich NRW 2026 | Günstige Gasanbieter finden & wechseln',
      description: 'Gasanbieter in NRW vergleichen: Aktuelle Gastarife 2026, Beispielrechner und unverbindliche Anfrage für Ihren Haushalt oder Betrieb. Jetzt Gaskosten senken.',
      keywords: 'Gasvergleich NRW 2026, Gasanbieter wechseln NRW, günstige Gastarife, Gas sparen NRW, bester Gasanbieter NRW',
      ogTitle: 'Gasvergleich NRW 2026 | Günstige Gasanbieter vergleichen',
      ogDescription: 'Gasanbieter in NRW vergleichen und Gaskosten senken. Transparente Tarife 2026, kostenlose Anfrage.',
    },
    photovoltaik: {
      title: 'Photovoltaik NRW 2026 | Solaranlage Kosten, Förderung & Vergleich',
      description: 'Photovoltaik in NRW: Kosten, Förderung und Angebotsvergleich 2026. Kostenlose Beratung, Wirtschaftlichkeitsrechner und unverbindliche Anfrage für Ihre Solaranlage.',
      keywords: 'Photovoltaik NRW 2026, Solaranlage NRW, PV-Anlage Kosten, Solarförderung NRW, Einspeisevergütung 2026, Photovoltaik Vergleich NRW',
      ogTitle: 'Photovoltaik NRW 2026 | Kosten, Förderung & Angebotsvergleich',
      ogDescription: 'Solaranlage in NRW: Kosten, Förderung und kostenlose Beratung. Jetzt Angebote vergleichen und Strom selbst erzeugen.',
    },
    gewerbestrom: {
      title: 'Gewerbestrom NRW 2026 | Stromtarife für Unternehmen vergleichen',
      description: 'Gewerbestrom NRW 2026: Günstige Stromtarife für Unternehmen, Handwerker und Gewerbebetriebe. Transparente Orientierung, persönliche Beratung und unverbindliche Anfrage.',
      keywords: SEO_CONFIG.keywords.gewerbestrom,
      ogTitle: 'Gewerbestrom NRW 2026 | Günstige Tarife für Unternehmen',
      ogDescription: 'Gewerbestrom in NRW günstig vergleichen. Persönliche Beratung und unverbindliche Anfrage für Ihr Unternehmen.',
    },
    gewerbegas: {
      title: 'Gewerbegas NRW 2026 | Gastarife für Betriebe & Unternehmen vergleichen',
      description: 'Gewerbegas NRW 2026: Günstige Gastarife für Betriebe, Handwerker und Gewerbetreibende. Transparente Orientierung, persönliche Beratung und unverbindliche Anfrage.',
      keywords: SEO_CONFIG.keywords.gewerbegas,
      ogTitle: 'Gewerbegas NRW 2026 | Günstige Gastarife für Unternehmen',
      ogDescription: 'Gewerbegas in NRW günstig vergleichen. Persönliche Beratung und unverbindliche Anfrage für Ihren Betrieb.',
    },
    kontakt: {
      title: 'Kontakt | Energieberatung NRW – Jetzt Anfrage stellen',
      description: 'Kontakt zu energievergleich.shop: Stellen Sie Ihre unverbindliche Anfrage zu Strom, Gas oder Photovoltaik. Unser Energieteam in NRW antwortet schnell und kompetent.',
      keywords: 'Kontakt Energievergleich NRW, Energieberatung Anfrage, Strom Gas Beratung NRW, Support energievergleich.shop',
      ogTitle: 'Kontakt | energievergleich.shop – Energieberatung NRW',
      ogDescription: 'Stellen Sie Ihre unverbindliche Anfrage. Unser Team berät Sie zu Strom, Gas und Photovoltaik in NRW.',
    },
    ratgeber: {
      title: 'Energieratgeber NRW 2026 | Tipps zu Strom, Gas & Photovoltaik',
      description: 'Kostenloser Energieratgeber für NRW: Tipps zum Strom- und Gasanbieter wechseln, Photovoltaik lohnt sich und Energiekosten sparen. Aktuelle Artikel 2026.',
      keywords: 'Energieratgeber NRW, Stromwechsel Tipps, Gasvergleich Wissen, Photovoltaik Ratgeber, Energie sparen NRW 2026',
      ogTitle: 'Energieratgeber NRW 2026 | Strom, Gas & Photovoltaik Tipps',
      ogDescription: 'Kostenlose Ratgeber-Artikel zu Strom, Gas und Photovoltaik. Aktuelle Tipps für NRW-Haushalte und Betriebe.',
    },
    datenschutz: {
      title: 'Datenschutzerklärung | energievergleich.shop – DSGVO-konform',
      description: 'Datenschutzerklärung von energievergleich.shop: Transparente Informationen zur Verarbeitung Ihrer personenbezogenen Daten gemäß DSGVO. Ihre Daten sind bei uns sicher.',
      keywords: 'Datenschutz energievergleich.shop, Datenschutzerklärung, DSGVO, personenbezogene Daten',
      ogTitle: 'Datenschutzerklärung | energievergleich.shop',
      ogDescription: 'DSGVO-konforme Datenschutzerklärung von energievergleich.shop. Transparenz beim Umgang mit Ihren Daten.',
    },
    impressum: {
      title: 'Impressum | energievergleich.shop – Rechtliche Informationen',
      description: 'Impressum von energievergleich.shop: Alle rechtlich notwendigen Angaben zu Anbieter, Kontakt und Verantwortlichen gemäß § 5 TMG.',
      keywords: 'Impressum energievergleich.shop, Anbieter, Kontakt, TMG, Rechtliche Informationen',
      ogTitle: 'Impressum | energievergleich.shop',
      ogDescription: 'Rechtliche Informationen und Kontaktdaten von energievergleich.shop gemäß § 5 TMG.',
    },
    methodik: {
      title: 'Methodik | Wie energievergleich.shop Tarife einordnet & vergleicht',
      description: 'Unsere Methodik: So funktioniert der Energievergleich bei energievergleich.shop. Transparente Kriterien, unabhängige Einordnung und nachvollziehbare Empfehlungen für NRW.',
      keywords: 'Methodik Energievergleich, Vergleichskriterien Strom Gas, Transparenz Tariforientierung, unabhängiger Energievergleich NRW',
      ogTitle: 'Methodik | Wie wir Energietarife transparent einordnen',
      ogDescription: 'Transparente Methodik: So vergleicht und bewertet energievergleich.shop Strom- und Gastarife in NRW.',
    },
  };

  return {
    ...baseConfig,
    ...pageConfigs[page],
  };
}
