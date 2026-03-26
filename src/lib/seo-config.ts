/**
 * SEO Configuration
 * Centralized SEO settings and metadata
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
      title: 'Energievergleich NRW | Strom, Gas & Photovoltaik Orientierung 2026',
      description: 'Erstorientierung für Strom, Gas und Photovoltaik in NRW. Transparente Beispielrechner, Methodik und unverbindliche Anfragen für Privat- und Gewerbekunden.',
      keywords: SEO_CONFIG.keywords.home,
      ogTitle: 'Energievergleich NRW | Strom, Gas & Photovoltaik Orientierung 2026',
      ogDescription: 'Transparente Erstorientierung zu Strom, Gas und Photovoltaik in NRW. Kostenlos und unverbindlich.',
    },
    stromvergleich: {
      title: 'Stromvergleich NRW | Tarif-Orientierung 2026',
      description: 'Stromvergleich NRW 2026: Transparente Tarif-Orientierung mit Beispielvorschau, Methodik und unverbindlichem nächsten Schritt für Ihren Haushalt.',
      keywords: 'Stromvergleich NRW, Stromtarife 2026, günstige Stromangebote, Strom sparen, Stromanbieter wechseln',
      ogTitle: 'Stromvergleich NRW | Tarif-Orientierung 2026',
      ogDescription: 'Transparente Erstorientierung zu Stromtarifen in NRW mit Beispielvorschau und Methodik.',
    },
    gasvergleich: {
      title: 'Gasvergleich NRW | Tarif-Orientierung 2026',
      description: 'Gasvergleich NRW 2026: Erste Tarif-Orientierung mit Beispielvorschau, Methodik und unverbindlicher Anfrage für Ihren nächsten Schritt.',
      keywords: 'Gasvergleich NRW, Gastarife 2026, günstige Gasangebote, Gas sparen, Gasanbieter wechseln',
      ogTitle: 'Gasvergleich NRW | Tarif-Orientierung 2026',
      ogDescription: 'Transparente Erstorientierung zu Gastarifen in NRW mit Beispielvorschau und Methodik.',
    },
    photovoltaik: {
      title: 'Photovoltaik NRW | Beratung & Angebotsvergleich 2026',
      description: 'Photovoltaik NRW 2026: Orientierung zu Kosten, Förderung und Angebotsvergleich mit unverbindlicher Beratung für Ihr Dach.',
      keywords: 'Photovoltaik NRW, Solaranlage, PV-Anlage, Solarförderung, Einspeisevergütung, Solarkosten',
      ogTitle: 'Photovoltaik NRW | Beratung & Angebotsvergleich 2026',
      ogDescription: 'Orientierung zu Photovoltaik in NRW mit Kosten, Förderung und unverbindlicher Beratung.',
    },
    gewerbestrom: {
      title: 'Gewerbestrom NRW | Anfrage & Orientierung 2026',
      description: 'Gewerbestrom NRW 2026: Unverbindliche Anfrage und transparente Orientierung für Unternehmen in NRW, inklusive Methodik und persönlicher Beratung.',
      keywords: SEO_CONFIG.keywords.gewerbestrom,
      ogTitle: 'Gewerbestrom NRW | Anfrage & Orientierung 2026',
      ogDescription: 'Transparente Orientierung und unverbindliche Anfrage für Gewerbestrom in NRW.',
    },
    gewerbegas: {
      title: 'Gewerbegas NRW | Anfrage & Orientierung 2026',
      description: 'Gewerbegas NRW 2026: Unverbindliche Anfrage und transparente Orientierung für Betriebe in NRW, inklusive Methodik und Beratung.',
      keywords: SEO_CONFIG.keywords.gewerbegas,
      ogTitle: 'Gewerbegas NRW | Anfrage & Orientierung 2026',
      ogDescription: 'Transparente Orientierung und unverbindliche Anfrage für Gewerbegas in NRW.',
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
      description: 'Methodik: Erfahren Sie, wie wir Strom- und Gastarife transparent einordnen und welche Kriterien wir für Orientierung und Anfrage nutzen.',
      keywords: 'Methodik, Vergleichskriterien, Transparenz, Unabhängigkeit, Tarif-Orientierung',
      ogTitle: 'Methodik | Wie wir Strom- & Gastarife vergleichen',
      ogDescription: 'Erfahren Sie, wie wir Energietarife transparent einordnen und welche Kriterien wir verwenden.',
    },
  };

  return {
    ...baseConfig,
    ...pageConfigs[page],
  };
}
