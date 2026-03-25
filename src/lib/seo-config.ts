/**
 * SEO Configuration
 * Centralized SEO settings and metadata
 */

export const SEO_CONFIG = {
  // Site Information
  // PRIMARY DOMAIN: https://www.energievergleich.shop
  siteName: 'www.energievergleich.shop',
  siteUrl: 'https://www.energievergleich.shop',
  siteDescription: 'Vergleichen Sie Strom- und Gastarife in Nordrhein-Westfalen. Finden Sie die besten Angebote für Privat- und Gewerbekunden. Kostenlos und unabhängig.',

  // Organization Information (complete details for schema)
  organization: {
    name: 'energievergleich.shop',
    legalName: 'energievergleich.shop',
    url: 'https://www.energievergleich.shop',
    logo: 'https://static.wixstatic.com/media/32e7c0_8cede5e338be484bb8dcaad81c053c82~mv2.png?originWidth=1920&originHeight=1024',
    areaServed: 'Nordrhein-Westfalen',
    contact: {
      email: 'info@energievergleich.nrw',
      telephone: '+49 (0) 2 01 - 1 03 - 39 39',
    },
    address: {
      streetAddress: 'Energiestraße 1',
      addressLocality: 'Düsseldorf',
      addressRegion: 'NRW',
      postalCode: '40210',
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
  googleAnalyticsId: 'G-X60BTL057V', // GA4 Measurement ID for energievergleich.shop

  // Robots Meta
  robots: 'index, follow',

  // Keywords
  keywords: {
    home: 'Energievergleich NRW, Stromvergleich, Gasvergleich, Strom sparen, Gas sparen, Tarife NRW',
    gewerbestrom: 'Gewerbestrom NRW, Stromtarife Unternehmen, Gewerbekunden, Stromvergleich Gewerbe',
    gewerbegas: 'Gewerbegas NRW, Gastarife Unternehmen, Gewerbekunden, Gasvergleich Gewerbe',
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
      title: 'Stromvergleich NRW 2026 | Bis 30% bei Strom & Gas sparen',
      description: 'Stromvergleich & Gasvergleich NRW: Finden Sie günstige Tarife für Privat- und Gewerbekunden. Kostenlos, unabhängig und sicher wechseln. Sparen Sie bis zu 30%.',
      keywords: SEO_CONFIG.keywords.home,
      ogTitle: 'Stromvergleich NRW 2026 | Bis 30% bei Strom & Gas sparen',
      ogDescription: 'Vergleichen Sie Strom- und Gastarife in NRW. Sparen Sie bis zu 30%. Kostenlos und unabhängig.',
    },
    stromvergleich: {
      title: 'Stromvergleich NRW | Günstige Stromtarife vergleichen 2026',
      description: 'Stromvergleich NRW 2026: Vergleichen Sie Stromtarife kostenlos und sparen Sie monatlich. Wechsel in 5 Minuten - TÜV-zertifiziert und unabhängig.',
      keywords: 'Stromvergleich NRW, Stromtarife 2026, günstige Stromangebote, Strom sparen, Stromanbieter wechseln',
      ogTitle: 'Stromvergleich NRW | Günstige Stromtarife vergleichen 2026',
      ogDescription: 'Vergleichen Sie Stromtarife in NRW und sparen Sie bis zu 30%. Kostenlos und unabhängig.',
    },
    gasvergleich: {
      title: 'Gasvergleich NRW | Günstige Gastarife im Februar 2026',
      description: 'Gasvergleich NRW Februar 2026: Finden Sie günstige Gastarife und sparen Sie monatlich. Kostenlos vergleichen, schnell wechseln - TÜV-zertifiziert.',
      keywords: 'Gasvergleich NRW, Gastarife 2026, günstige Gasangebote, Gas sparen, Gasanbieter wechseln',
      ogTitle: 'Gasvergleich NRW | Günstige Gastarife im Februar 2026',
      ogDescription: 'Vergleichen Sie Gastarife in NRW und sparen Sie bis zu 25%. Kostenlos und unabhängig.',
    },
    photovoltaik: {
      title: 'Photovoltaik NRW | Solaranlage Kosten & Förderung 2026',
      description: 'Photovoltaik NRW 2026: Erfahren Sie Kosten, Förderung und Einspeisevergütung für Solaranlagen. Kostenloser Ratgeber & Checkliste.',
      keywords: 'Photovoltaik NRW, Solaranlage, PV-Anlage, Solarförderung, Einspeisevergütung, Solarkosten',
      ogTitle: 'Photovoltaik NRW | Solaranlage Kosten & Förderung 2026',
      ogDescription: 'Alles über Photovoltaik in NRW: Kosten, Förderung und Rentabilität. Kostenloser Ratgeber.',
    },
    gewerbestrom: {
      title: 'Gewerbestrom NRW | Stromtarife für Unternehmen 2026',
      description: 'Gewerbestrom NRW 2026: Sparen Sie bis zu 30% mit maßgeschneiderten Stromtarifen. Kostenlose Beratung für Ihr Unternehmen.',
      keywords: SEO_CONFIG.keywords.gewerbestrom,
      ogTitle: 'Gewerbestrom NRW | Stromtarife für Unternehmen 2026',
      ogDescription: 'Sparen Sie bis zu 30% bei Gewerbestrom. Kostenlose Beratung für Unternehmen in NRW.',
    },
    gewerbegas: {
      title: 'Gewerbegas NRW | Gastarife für Unternehmen 2026',
      description: 'Gewerbegas NRW 2026: Günstige Gastarife mit Planungssicherheit. Sparen Sie bis zu 25% - kostenlose Beratung für Betriebe.',
      keywords: SEO_CONFIG.keywords.gewerbegas,
      ogTitle: 'Gewerbegas NRW | Gastarife für Unternehmen 2026',
      ogDescription: 'Sparen Sie bis zu 25% bei Gewerbegas. Kostenlose Beratung für Unternehmen in NRW.',
    },
    kontakt: {
      title: 'Kontakt | Energievergleich NRW Support & Beratung',
      description: 'Kontaktieren Sie unseren Support für Fragen zu Strom-, Gas- und Solarangeboten. Schnelle Antworten von Energieexperten.',
      keywords: 'Kontakt, Kundenservice, Energievergleich, Support, Beratung',
      ogTitle: 'Kontakt | Energievergleich NRW Support & Beratung',
      ogDescription: 'Nehmen Sie Kontakt mit uns auf. Wir helfen Ihnen bei Ihren Energiefragen.',
    },
    ratgeber: {
      title: 'Ratgeber | Strom, Gas & Photovoltaik Tipps & Wissen',
      description: 'Ratgeber NRW: Kostenlose Tipps zu Stromvergleich, Gasvergleich, Photovoltaik und Energiewechsel. Jetzt informieren.',
      keywords: 'Ratgeber, Energiewechsel, Stromtarife, Gastarife, Photovoltaik, Tipps, Wissen',
      ogTitle: 'Ratgeber | Strom, Gas & Photovoltaik Tipps & Wissen',
      ogDescription: 'Lesen Sie unseren Ratgeber zu Strom, Gas und Solaranlagen. Kostenlose Tipps.',
    },
    datenschutz: {
      title: 'Datenschutz | energievergleich.shop Datenschutzerklärung',
      description: 'Datenschutzerklärung: Wir schützen Ihre Daten transparent und sicher. Erfahren Sie, wie wir Ihre Informationen verarbeiten.',
      keywords: 'Datenschutz, Datenschutzerklärung, Datenschutzrichtlinie, DSGVO',
      ogTitle: 'Datenschutz | energievergleich.shop Datenschutzerklärung',
      ogDescription: 'Lesen Sie unsere Datenschutzerklärung und wie wir Ihre Daten schützen.',
    },
    impressum: {
      title: 'Impressum | energievergleich.shop Rechtliche Informationen',
      description: 'Impressum: Rechtliche Informationen und Kontaktdaten von energievergleich.shop. Transparenz und Vertrauen für Sie.',
      keywords: 'Impressum, Rechtliche Informationen, Kontakt, Herausgeber',
      ogTitle: 'Impressum | energievergleich.shop Rechtliche Informationen',
      ogDescription: 'Lesen Sie unser Impressum mit allen rechtlichen Informationen.',
    },
    methodik: {
      title: 'Methodik | Wie wir Strom- & Gastarife vergleichen',
      description: 'Methodik: Erfahren Sie, wie wir Strom- und Gastarife unabhängig, transparent und TÜV-zertifiziert vergleichen.',
      keywords: 'Methodik, Vergleichskriterien, Transparenz, Unabhängigkeit, TÜV-zertifiziert',
      ogTitle: 'Methodik | Wie wir Strom- & Gastarife vergleichen',
      ogDescription: 'Erfahren Sie, wie wir Energietarife unabhängig und transparent vergleichen.',
    },
  };

  return {
    ...baseConfig,
    ...pageConfigs[page],
  };
}
