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
      title: 'Stromvergleich NRW - Bis 30% Energiekosten sparen',
      description: 'Stromvergleich & Gasvergleich NRW: Finden Sie günstige Tarife für Privat- und Gewerbekunden. Kostenlos, unabhängig und sicher wechseln.',
      keywords: SEO_CONFIG.keywords.home,
      ogTitle: 'Energievergleich NRW - Strom & Gas Tarife vergleichen',
      ogDescription: 'Sparen Sie bis zu 30% bei Strom und Gas. Kostenlos und unabhängig vergleichen.',
    },
    stromvergleich: {
      title: 'Stromvergleich NRW - Günstige Tarife für Privat',
      description: 'Stromvergleich NRW: Vergleichen Sie Stromtarife kostenlos und sparen Sie monatlich. Wechsel in 5 Minuten - TÜV-zertifiziert.',
      keywords: 'Stromvergleich NRW, Stromtarife, günstige Stromangebote, Strom sparen',
      ogTitle: 'Stromvergleich NRW - Beste Tarife finden',
      ogDescription: 'Vergleichen Sie Stromtarife in NRW und sparen Sie bis zu 30%.',
    },
    gasvergleich: {
      title: 'Gasvergleich NRW - Beste Gastarife für Privat',
      description: 'Gasvergleich NRW: Finden Sie günstige Gastarife und sparen Sie monatlich. Kostenlos vergleichen, schnell wechseln.',
      keywords: 'Gasvergleich NRW, Gastarife, günstige Gasangebote, Gas sparen',
      ogTitle: 'Gasvergleich NRW - Günstige Gastarife finden',
      ogDescription: 'Vergleichen Sie Gastarife in NRW und sparen Sie bis zu 25%.',
    },
    photovoltaik: {
      title: 'Photovoltaik NRW - Solaranlage Kosten & Förderung',
      description: 'Photovoltaik NRW: Erfahren Sie Kosten, Förderung und Einspeisevergütung für Solaranlagen. Kostenloser Ratgeber & Checkliste.',
      keywords: 'Photovoltaik NRW, Solaranlage, PV-Anlage, Solarförderung, Einspeisevergütung',
      ogTitle: 'Photovoltaik NRW - Solaranlagen Ratgeber',
      ogDescription: 'Alles über Photovoltaik in NRW: Kosten, Förderung und Rentabilität.',
    },
    gewerbestrom: {
      title: 'Gewerbestrom NRW - Stromtarife für Unternehmen',
      description: 'Gewerbestrom NRW: Sparen Sie bis zu 30% mit maßgeschneiderten Stromtarifen. Kostenlose Beratung für Ihr Unternehmen.',
      keywords: SEO_CONFIG.keywords.gewerbestrom,
      ogTitle: 'Gewerbestrom NRW - Tarife für Unternehmen',
      ogDescription: 'Sparen Sie bis zu 30% bei Gewerbestrom. Kostenlose Beratung für Unternehmen in NRW.',
    },
    gewerbegas: {
      title: 'Gewerbegas NRW - Gastarife für Unternehmen',
      description: 'Gewerbegas NRW: Günstige Gastarife mit Planungssicherheit. Sparen Sie bis zu 25% - kostenlose Beratung für Betriebe.',
      keywords: SEO_CONFIG.keywords.gewerbegas,
      ogTitle: 'Gewerbegas NRW - Tarife für Unternehmen',
      ogDescription: 'Sparen Sie bis zu 25% bei Gewerbegas. Kostenlose Beratung für Unternehmen in NRW.',
    },
    kontakt: {
      title: 'Kontakt - Energievergleich NRW Support',
      description: 'Kontaktieren Sie uns für Fragen zu Strom-, Gas- und Solarangeboten. Schnelle Antworten von unseren Energieexperten.',
      keywords: 'Kontakt, Kundenservice, Energievergleich, Support',
      ogTitle: 'Kontakt - energievergleich.shop',
      ogDescription: 'Nehmen Sie Kontakt mit uns auf. Wir helfen Ihnen bei Ihren Energiefragen.',
    },
    ratgeber: {
      title: 'Ratgeber - Strom, Gas & Photovoltaik Tipps',
      description: 'Ratgeber NRW: Kostenlose Tipps zu Stromvergleich, Gasvergleich, Photovoltaik und Energiewechsel. Jetzt informieren.',
      keywords: 'Ratgeber, Energiewechsel, Stromtarife, Gastarife, Photovoltaik, Tipps',
      ogTitle: 'Ratgeber - Energie sparen mit Tipps',
      ogDescription: 'Lesen Sie unseren Ratgeber zu Strom, Gas und Solaranlagen.',
    },
    datenschutz: {
      title: 'Datenschutz - energievergleich.shop',
      description: 'Datenschutzerklärung: Wir schützen Ihre Daten transparent und sicher. Erfahren Sie, wie wir Ihre Informationen verarbeiten.',
      keywords: 'Datenschutz, Datenschutzerklärung, Datenschutzrichtlinie',
      ogTitle: 'Datenschutz - energievergleich.shop',
      ogDescription: 'Lesen Sie unsere Datenschutzerklärung.',
    },
    impressum: {
      title: 'Impressum - energievergleich.shop',
      description: 'Impressum: Rechtliche Informationen und Kontaktdaten von energievergleich.shop. Transparenz und Vertrauen für Sie.',
      keywords: 'Impressum, Rechtliche Informationen, Kontakt',
      ogTitle: 'Impressum - energievergleich.shop',
      ogDescription: 'Lesen Sie unser Impressum mit allen rechtlichen Informationen.',
    },
    methodik: {
      title: 'Methodik - Wie wir Tarife vergleichen',
      description: 'Methodik: Erfahren Sie, wie wir Strom- und Gastarife unabhängig, transparent und TÜV-zertifiziert vergleichen.',
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
