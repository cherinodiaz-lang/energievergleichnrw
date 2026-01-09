/**
 * SEO Configuration
 * Centralized SEO settings and metadata
 */

export const SEO_CONFIG = {
  // Site Information
  siteName: 'energievergleich.shop',
  siteUrl: 'https://energievergleich.shop',
  siteDescription: 'Vergleichen Sie Strom- und Gastarife in Nordrhein-Westfalen. Finden Sie die besten Angebote für Privat- und Gewerbekunden. Kostenlos und unabhängig.',
  
  // Organization Information (NO postal address - only essential fields)
  organization: {
    name: 'energievergleich.shop',
    areaServed: 'Nordrhein-Westfalen',
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
  googleAnalyticsId: '', // Add your GA4 ID
  
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
export function getPageSEO(page: 'home' | 'gewerbestrom' | 'gewerbegas') {
  const baseConfig = {
    siteName: SEO_CONFIG.siteName,
    siteUrl: SEO_CONFIG.siteUrl,
    defaultImage: SEO_CONFIG.defaultOgImage,
  };

  const pageConfigs = {
    home: {
      title: 'Energievergleich NRW - Strom & Gas Tarife vergleichen und sparen',
      description: 'Vergleichen Sie Strom- und Gastarife in Nordrhein-Westfalen. Finden Sie die besten Angebote für Privat- und Gewerbekunden. Kostenlos und unabhängig.',
      keywords: SEO_CONFIG.keywords.home,
      ogTitle: 'Energievergleich NRW - Die beste Wahl für Ihre Energieversorgung',
      ogDescription: 'Sparen Sie bis zu 30% bei Strom und Gas. Kostenlos und unabhängig vergleichen.',
    },
    gewerbestrom: {
      title: 'Gewerbestrom NRW - Stromtarife für Unternehmen vergleichen',
      description: 'Gewerbestrom für Ihr Unternehmen in Nordrhein-Westfalen. Maßgeschneiderte Tarife mit Kostenersparnis und Planungssicherheit. Jetzt Angebot anfordern.',
      keywords: SEO_CONFIG.keywords.gewerbestrom,
      ogTitle: 'Gewerbestrom NRW - Maßgeschneiderte Tarife für Ihr Unternehmen',
      ogDescription: 'Sparen Sie bis zu 30% bei Gewerbestrom. Kostenlose Beratung für Unternehmen in NRW.',
    },
    gewerbegas: {
      title: 'Gewerbegas NRW - Gastarife für Unternehmen vergleichen',
      description: 'Gewerbegas für Ihr Unternehmen in Nordrhein-Westfalen. Maßgeschneiderte Gastarife mit Kostenersparnis und Planungssicherheit. Jetzt Angebot anfordern.',
      keywords: SEO_CONFIG.keywords.gewerbegas,
      ogTitle: 'Gewerbegas NRW - Maßgeschneiderte Tarife für Ihr Unternehmen',
      ogDescription: 'Sparen Sie bis zu 25% bei Gewerbegas. Kostenlose Beratung für Unternehmen in NRW.',
    },
  };

  return {
    ...baseConfig,
    ...pageConfigs[page],
  };
}
