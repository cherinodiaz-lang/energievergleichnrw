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
  googleAnalyticsId: 'G-XXXXXXXXXX', // Add your GA4 Measurement ID (format: G-XXXXXXXXXX)
  
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
      title: 'Stromvergleich & Gasvergleich NRW - Bis 30% sparen',
      description: 'Stromvergleich und Gasvergleich für NRW. Finden Sie günstige Tarife für Privat- und Gewerbekunden. Kostenlos, unabhängig und sicher.',
      keywords: SEO_CONFIG.keywords.home,
      ogTitle: 'Energievergleich NRW - Strom & Gas Tarife vergleichen',
      ogDescription: 'Sparen Sie bis zu 30% bei Strom und Gas. Kostenlos und unabhängig vergleichen.',
    },
    stromvergleich: {
      title: 'Stromvergleich NRW - Günstige Tarife für Privatkunden',
      description: 'Stromvergleich NRW: Finden Sie die besten Stromtarife und sparen Sie Geld. Kostenlos vergleichen, wechseln und profitieren.',
      keywords: 'Stromvergleich NRW, Stromtarife, günstige Stromangebote, Strom sparen',
      ogTitle: 'Stromvergleich NRW - Beste Tarife finden',
      ogDescription: 'Vergleichen Sie Stromtarife in NRW und sparen Sie bis zu 30%.',
    },
    gasvergleich: {
      title: 'Gasvergleich NRW - Beste Gastarife für Privatkunden',
      description: 'Gasvergleich NRW: Vergleichen Sie Gastarife und sparen Sie monatlich. Kostenlos, unabhängig und schnell zum besseren Tarif.',
      keywords: 'Gasvergleich NRW, Gastarife, günstige Gasangebote, Gas sparen',
      ogTitle: 'Gasvergleich NRW - Günstige Gastarife finden',
      ogDescription: 'Vergleichen Sie Gastarife in NRW und sparen Sie bis zu 25%.',
    },
    photovoltaik: {
      title: 'Photovoltaik NRW - Solaranlagen Kosten & Förderung',
      description: 'Photovoltaik in NRW: Informationen zu Solaranlagen, Kosten, Förderung und Einspeisevergütung. Jetzt kostenlosen Ratgeber nutzen.',
      keywords: 'Photovoltaik NRW, Solaranlage, PV-Anlage, Solarförderung, Einspeisevergütung',
      ogTitle: 'Photovoltaik NRW - Solaranlagen Ratgeber',
      ogDescription: 'Alles über Photovoltaik in NRW: Kosten, Förderung und Rentabilität.',
    },
    gewerbestrom: {
      title: 'Gewerbestrom NRW - Stromtarife für Unternehmen',
      description: 'Gewerbestrom NRW: Maßgeschneiderte Stromtarife für Ihr Unternehmen. Sparen Sie bis zu 30% und sichern Sie Ihre Energieversorgung.',
      keywords: SEO_CONFIG.keywords.gewerbestrom,
      ogTitle: 'Gewerbestrom NRW - Tarife für Unternehmen',
      ogDescription: 'Sparen Sie bis zu 30% bei Gewerbestrom. Kostenlose Beratung für Unternehmen in NRW.',
    },
    gewerbegas: {
      title: 'Gewerbegas NRW - Gastarife für Unternehmen',
      description: 'Gewerbegas NRW: Günstige Gastarife für Ihr Unternehmen. Maßgeschneiderte Lösungen mit Kostenersparnis und Planungssicherheit.',
      keywords: SEO_CONFIG.keywords.gewerbegas,
      ogTitle: 'Gewerbegas NRW - Tarife für Unternehmen',
      ogDescription: 'Sparen Sie bis zu 25% bei Gewerbegas. Kostenlose Beratung für Unternehmen in NRW.',
    },
    kontakt: {
      title: 'Kontakt - energievergleich.shop',
      description: 'Kontaktieren Sie uns für Fragen zu Strom-, Gas- und Solarangeboten. Wir helfen Ihnen gerne weiter.',
      keywords: 'Kontakt, Kundenservice, Energievergleich, Support',
      ogTitle: 'Kontakt - energievergleich.shop',
      ogDescription: 'Nehmen Sie Kontakt mit uns auf. Wir helfen Ihnen bei Ihren Energiefragen.',
    },
    ratgeber: {
      title: 'Ratgeber - Strom, Gas & Photovoltaik Tipps',
      description: 'Ratgeber zu Stromvergleich, Gasvergleich, Photovoltaik und Energiewechsel. Kostenlose Tipps und Informationen für NRW.',
      keywords: 'Ratgeber, Energiewechsel, Stromtarife, Gastarife, Photovoltaik, Tipps',
      ogTitle: 'Ratgeber - Energie sparen mit Tipps',
      ogDescription: 'Lesen Sie unseren Ratgeber zu Strom, Gas und Solaranlagen.',
    },
    datenschutz: {
      title: 'Datenschutz - energievergleich.shop',
      description: 'Datenschutzerklärung von energievergleich.shop. Wir schützen Ihre Daten und informieren Sie transparent über die Datenverarbeitung.',
      keywords: 'Datenschutz, Datenschutzerklärung, Datenschutzrichtlinie',
      ogTitle: 'Datenschutz - energievergleich.shop',
      ogDescription: 'Lesen Sie unsere Datenschutzerklärung.',
    },
    impressum: {
      title: 'Impressum - energievergleich.shop',
      description: 'Impressum von energievergleich.shop. Hier finden Sie alle rechtlichen Informationen und Kontaktdaten des Anbieters.',
      keywords: 'Impressum, Rechtliche Informationen, Kontakt',
      ogTitle: 'Impressum - energievergleich.shop',
      ogDescription: 'Lesen Sie unser Impressum mit allen rechtlichen Informationen.',
    },
    methodik: {
      title: 'Methodik - Wie wir Tarife vergleichen',
      description: 'Methodik von energievergleich.shop: Erfahren Sie, wie wir Strom- und Gastarife unabhängig und transparent vergleichen.',
      keywords: 'Methodik, Vergleichskriterien, Transparenz, Unabhängigkeit',
      ogTitle: 'Methodik - Unser Vergleichsverfahren',
      ogDescription: 'Erfahren Sie, wie wir Energietarife unabhängig vergleichen.',
    },
  };

  return {
    ...baseConfig,
    ...pageConfigs[page],
  };
}
