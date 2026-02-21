/**
 * SEO Configuration
 * Centralized SEO settings and metadata
 */

import { CONTACT } from '@/config/contact';

const parseGermanPlzCity = (line?: string) => {
  const value = (line || '').trim();
  const match = value.match(/^(\d{5})\s+(.+)$/);
  return {
    postalCode: match?.[1] || '33378',
    addressLocality: match?.[2] || 'Rheda-Wiedenbrück',
  };
};

export const SEO_CONFIG = {
  // Site Information
  // PRIMARY DOMAIN: https://www.energievergleich.shop
  siteName: 'www.energievergleich.shop',
  siteUrl: 'https://www.energievergleich.shop',
  siteDescription: 'Vergleichen Sie Strom- und Gastarife in Nordrhein-Westfalen. Finden Sie passende Angebote für Privat- und Gewerbekunden. Kostenlos und unabhängig.',
  
  // Organization Information (complete details for schema)
  organization: {
    name: 'energievergleich.shop',
    legalName: 'energievergleich.shop',
    url: 'https://www.energievergleich.shop',
    logo: 'https://static.wixstatic.com/media/32e7c0_8cede5e338be484bb8dcaad81c053c82~mv2.png?originWidth=1920&originHeight=1024',
    areaServed: 'Nordrhein-Westfalen',
    contact: {
      email: CONTACT.email,
      telephone: CONTACT.phone,
    },
    address: {
      streetAddress: CONTACT.addressLines[1],
      addressLocality: parseGermanPlzCity(CONTACT.addressLines[2]).addressLocality,
      addressRegion: 'Nordrhein-Westfalen',
      postalCode: parseGermanPlzCity(CONTACT.addressLines[2]).postalCode,
      addressCountry: 'DE',
    },
  },
  
  // Social Media
  // NOTE: Leave empty unless you have verified, real profiles (keeps schema clean)
  social: {
    facebook: '',
    twitter: '',
    linkedin: '',
    twitterHandle: '',
  },
  
  // Default OG Image
  defaultOgImage: 'https://static.wixstatic.com/media/32e7c0_8cede5e338be484bb8dcaad81c053c82~mv2.png?originWidth=1920&originHeight=1024',
  
  // Language
  language: 'de',
  
  // Search Console & Analytics
  // Set env var: PUBLIC_GOOGLE_SITE_VERIFICATION=xxxx (Vite/Astro public env)
  googleSearchConsoleVerification: import.meta.env.PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  googleAnalyticsId: 'G-R782H397LV', // GA4 Measurement ID for energievergleich.shop
  
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
      title: 'Strom & Gas vergleichen in NRW | Energievergleich',
      description: 'Stromvergleich & Gasvergleich für NRW: Tarife vergleichen, sparen und bequem wechseln. Kostenlos, unabhängig und transparent – auch für Gewerbe.',
      keywords: SEO_CONFIG.keywords.home,
      ogTitle: 'Strom & Gas vergleichen in NRW | Energievergleich',
      ogDescription: 'Strom- und Gastarife in NRW vergleichen, sparen und bequem wechseln. Kostenlos und unabhängig.',
    },
    stromvergleich: {
      title: 'Stromvergleich NRW | Stromtarife vergleichen & sparen',
      description: 'Stromtarife in NRW vergleichen: passende Angebote finden, Kosten senken und unkompliziert wechseln. Kostenloser Vergleich inkl. Tipps & Ratgeber.',
      keywords: 'Stromvergleich NRW, Stromtarife, günstige Stromangebote, Strom sparen, Stromanbieter wechseln',
      ogTitle: 'Stromvergleich NRW | Stromtarife vergleichen & sparen',
      ogDescription: 'Stromtarife in NRW vergleichen und sparen. Kostenlos und unabhängig.',
    },
    gasvergleich: {
      title: 'Gasvergleich NRW | Gastarife vergleichen & sparen',
      description: 'Gastarife in NRW vergleichen: Tarife prüfen, Kosten senken und einfach wechseln. Kostenloser Vergleich inkl. Tipps zu Laufzeit & Preisgarantie.',
      keywords: 'Gasvergleich NRW, Gastarife, günstige Gasangebote, Gas sparen, Gasanbieter wechseln',
      ogTitle: 'Gasvergleich NRW | Gastarife vergleichen & sparen',
      ogDescription: 'Gastarife in NRW vergleichen und sparen. Kostenlos und unabhängig.',
    },
    photovoltaik: {
      title: 'Photovoltaik NRW | Kosten, Förderung & Beratung',
      description: 'Photovoltaik in NRW: Infos zu Kosten, Förderung, Einspeisevergütung und Planung. Kostenloser Ratgeber + Anfrage für Beratung.',
      keywords: 'Photovoltaik NRW, Solaranlage, PV-Anlage, Solarförderung, Einspeisevergütung, Solarkosten',
      ogTitle: 'Photovoltaik NRW | Kosten, Förderung & Beratung',
      ogDescription: 'Photovoltaik in NRW: Kosten, Förderung und Planung verständlich erklärt.',
    },
    gewerbestrom: {
      title: 'Gewerbestrom NRW | Stromtarife für Unternehmen',
      description: 'Gewerbestrom in NRW: Tarife für Unternehmen vergleichen und Beratung anfragen. Transparent, effizient und auf Ihren Betrieb abgestimmt.',
      keywords: SEO_CONFIG.keywords.gewerbestrom,
      ogTitle: 'Gewerbestrom NRW | Stromtarife für Unternehmen',
      ogDescription: 'Gewerbestrom in NRW vergleichen und Beratung anfragen.',
    },
    gewerbegas: {
      title: 'Gewerbegas NRW | Gastarife für Unternehmen',
      description: 'Gewerbegas in NRW: Tarife vergleichen, Konditionen prüfen und Beratung anfragen. Planungssicherheit für Ihren Betrieb.',
      keywords: SEO_CONFIG.keywords.gewerbegas,
      ogTitle: 'Gewerbegas NRW | Gastarife für Unternehmen',
      ogDescription: 'Gewerbegas in NRW vergleichen und Beratung anfragen.',
    },
    kontakt: {
      title: 'Kontakt | Beratung für Strom, Gas & Photovoltaik',
      description: 'Kontakt: Stellen Sie Ihre Anfrage zu Strom, Gas, Gewerbeenergie oder Photovoltaik. Wir melden uns schnellstmöglich zurück.',
      keywords: 'Kontakt, Energieberatung, Strom, Gas, Photovoltaik, Gewerbe',
      ogTitle: 'Kontakt | Beratung für Strom, Gas & Photovoltaik',
      ogDescription: 'Kontaktieren Sie uns – wir helfen bei Strom, Gas und Photovoltaik.',
    },
    ratgeber: {
      title: 'Ratgeber: Strom, Gas & Photovoltaik | Energievergleich',
      description: 'Ratgeber und Guides zu Strom, Gas, Photovoltaik und Gewerbeenergie: Wechselwissen, Spartipps und Checklisten – verständlich erklärt.',
      keywords: 'Ratgeber, Energiewechsel, Stromtarife, Gastarife, Photovoltaik, Tipps, Wissen',
      ogTitle: 'Ratgeber: Strom, Gas & Photovoltaik | Energievergleich',
      ogDescription: 'Ratgeber, Spartipps und Checklisten rund um Strom, Gas und Photovoltaik.',
    },
    datenschutz: {
      title: 'Datenschutz | energievergleich.shop',
      description: 'Datenschutzerklärung: Informationen zur Verarbeitung Ihrer Daten, Cookies und Ihren Rechten nach DSGVO.',
      keywords: 'Datenschutz, Datenschutzerklärung, DSGVO, Cookies',
      ogTitle: 'Datenschutz | energievergleich.shop',
      ogDescription: 'Informationen zur Verarbeitung Ihrer Daten und Ihren Rechten.',
    },
    impressum: {
      title: 'Impressum | energievergleich.shop',
      description: 'Impressum: Anbieterkennzeichnung und Kontaktdaten von energievergleich.shop.',
      keywords: 'Impressum, Anbieterkennzeichnung, Kontakt',
      ogTitle: 'Impressum | energievergleich.shop',
      ogDescription: 'Anbieterkennzeichnung und Kontaktdaten.',
    },
    methodik: {
      title: 'Methodik | So vergleichen wir Strom- & Gastarife',
      description: 'Methodik: So läuft unser Tarifvergleich ab – transparent, nachvollziehbar und mit klaren Kriterien.',
      keywords: 'Methodik, Vergleichskriterien, Transparenz, Unabhängigkeit',
      ogTitle: 'Methodik | So vergleichen wir Strom- & Gastarife',
      ogDescription: 'So läuft unser Tarifvergleich ab – transparent und nachvollziehbar.',
    },
  };

  return {
    ...baseConfig,
    ...pageConfigs[page],
  };
}
