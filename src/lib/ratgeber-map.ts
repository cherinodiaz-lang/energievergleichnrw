/**
 * Ratgeber Article Map - Complete Article Metadata
 * Contains all 24 articles with metadata for listing, filtering, and SEO
 */

export interface RatgeberArticleMeta {
  id: string;
  slug: string;
  title: string;
  teaser: string;
  category: 'strom' | 'gas' | 'gewerbe' | 'photovoltaik' | 'wechselwissen';
  readingTime: number; // in minutes
  targetMoneyPage: 'stromvergleich-nrw' | 'gasvergleich-nrw' | 'photovoltaik-nrw' | 'gewerbestrom' | 'gewerbegas' | 'kontakt' | 'multiple';
  relatedUrls: string[];
  lastUpdated: string; // ISO date string
}

export const ratgeberArticles: RatgeberArticleMeta[] = [
  // STROM ARTICLES (7)
  {
    id: 'strom-grundversorgung',
    slug: 'ratgeber/strom/grundversorgung',
    title: 'Stromgrundversorgung: Was ist das?',
    teaser: 'Erfahren Sie, was Stromgrundversorgung ist und wie Sie davon profitieren können.',
    category: 'strom',
    readingTime: 5,
    targetMoneyPage: 'stromvergleich-nrw',
    relatedUrls: [
      '/ratgeber/strom/grundversorgung-vs-sondervertrag',
      '/ratgeber/wechselwissen/lieferantenwechsel-ablauf',
      '/stromvergleich-nrw'
    ],
    lastUpdated: '2026-01-09'
  },
  {
    id: 'strom-anbieterwechsel',
    slug: 'ratgeber/strom/stromanbieterwechsel-nrw',
    title: 'Stromanbieterwechsel in NRW: Schritt für Schritt',
    teaser: 'Wie Sie einfach und sicher Ihren Stromanbieter wechseln und Geld sparen.',
    category: 'strom',
    readingTime: 6,
    targetMoneyPage: 'stromvergleich-nrw',
    relatedUrls: [
      '/ratgeber/wechselwissen/lieferantenwechsel-ablauf',
      '/ratgeber/wechselwissen/kuendigungsfristen-strom-gas',
      '/stromvergleich-nrw'
    ],
    lastUpdated: '2026-01-09'
  },
  {
    id: 'strom-grundversorgung-vs-sondervertrag',
    slug: 'ratgeber/strom/grundversorgung-vs-sondervertrag',
    title: 'Grundversorgung vs. Sondervertrag: Der Unterschied',
    teaser: 'Vergleich zwischen Grundversorgung und Sonderverträgen - welcher ist besser für Sie?',
    category: 'strom',
    readingTime: 5,
    targetMoneyPage: 'stromvergleich-nrw',
    relatedUrls: [
      '/ratgeber/strom/grundversorgung',
      '/ratgeber/strom/stromanbieterwechsel-nrw',
      '/stromvergleich-nrw'
    ],
    lastUpdated: '2026-01-09'
  },
  {
    id: 'strom-neukundenboni',
    slug: 'ratgeber/strom/neukundenboni-fallen',
    title: 'Neukundenboni bei Strom: Fallen vermeiden',
    teaser: 'Worauf Sie bei Neukundenboni achten sollten und wie Sie die besten Angebote erkennen.',
    category: 'strom',
    readingTime: 5,
    targetMoneyPage: 'stromvergleich-nrw',
    relatedUrls: [
      '/ratgeber/strom/stromanbieterwechsel-nrw',
      '/ratgeber/wechselwissen/lieferantenwechsel-ablauf',
      '/stromvergleich-nrw'
    ],
    lastUpdated: '2026-01-09'
  },
  {
    id: 'strom-preiserhoeung',
    slug: 'ratgeber/strom/preiserhoeung-was-tun',
    title: 'Strompreiserhöhung: Was können Sie tun?',
    teaser: 'Ihre Rechte bei Strompreiserhöhungen und wie Sie reagieren sollten.',
    category: 'strom',
    readingTime: 5,
    targetMoneyPage: 'stromvergleich-nrw',
    relatedUrls: [
      '/ratgeber/wechselwissen/kuendigungsfristen-strom-gas',
      '/ratgeber/strom/stromanbieterwechsel-nrw',
      '/stromvergleich-nrw'
    ],
    lastUpdated: '2026-01-09'
  },
  {
    id: 'strom-umzug',
    slug: 'ratgeber/strom/umzug-stromvertrag',
    title: 'Stromvertrag bei Umzug: Das müssen Sie wissen',
    teaser: 'Wie Sie Ihren Stromvertrag bei einem Umzug richtig kündigen und wechseln.',
    category: 'strom',
    readingTime: 5,
    targetMoneyPage: 'stromvergleich-nrw',
    relatedUrls: [
      '/ratgeber/wechselwissen/kuendigungsfristen-strom-gas',
      '/ratgeber/wechselwissen/lieferantenwechsel-ablauf',
      '/stromvergleich-nrw'
    ],
    lastUpdated: '2026-01-09'
  },
  {
    id: 'strom-vertragslaufzeit',
    slug: 'ratgeber/strom/stromtarif-vertragslaufzeit',
    title: 'Stromtarif und Vertragslaufzeit: Was ist sinnvoll?',
    teaser: 'Erfahren Sie, welche Vertragslaufzeit für Ihre Situation am besten ist.',
    category: 'strom',
    readingTime: 5,
    targetMoneyPage: 'stromvergleich-nrw',
    relatedUrls: [
      '/ratgeber/strom/grundversorgung-vs-sondervertrag',
      '/ratgeber/wechselwissen/kuendigungsfristen-strom-gas',
      '/stromvergleich-nrw'
    ],
    lastUpdated: '2026-01-09'
  },
  {
    id: 'strom-malo-id',
    slug: 'ratgeber/strom/malo-id-zaehlernummer',
    title: 'MALO-ID und Zählernummer: Was ist das?',
    teaser: 'Erklärung von MALO-ID und Zählernummer und warum Sie diese benötigen.',
    category: 'strom',
    readingTime: 4,
    targetMoneyPage: 'stromvergleich-nrw',
    relatedUrls: [
      '/ratgeber/strom/stromanbieterwechsel-nrw',
      '/ratgeber/wechselwissen/lieferantenwechsel-ablauf',
      '/stromvergleich-nrw'
    ],
    lastUpdated: '2026-01-09'
  },

  // GAS ARTICLES (6)
  {
    id: 'gas-anbieterwechsel',
    slug: 'ratgeber/gas/gasanbieter-wechseln-nrw',
    title: 'Gasanbieter wechseln in NRW: Anleitung',
    teaser: 'Schritt-für-Schritt Anleitung zum Gasanbieterwechsel und Sparpotenziale.',
    category: 'gas',
    readingTime: 6,
    targetMoneyPage: 'gasvergleich-nrw',
    relatedUrls: [
      '/ratgeber/wechselwissen/lieferantenwechsel-ablauf',
      '/ratgeber/wechselwissen/kuendigungsfristen-strom-gas',
      '/gasvergleich-nrw'
    ],
    lastUpdated: '2026-01-09'
  },
  {
    id: 'gas-grundversorgung',
    slug: 'ratgeber/gas/grundversorgung-gas-sondervertrag',
    title: 'Gasgrundversorgung vs. Sondervertrag',
    teaser: 'Unterschiede zwischen Grundversorgung und Sonderverträgen bei Gas.',
    category: 'gas',
    readingTime: 5,
    targetMoneyPage: 'gasvergleich-nrw',
    relatedUrls: [
      '/ratgeber/gas/gasanbieter-wechseln-nrw',
      '/ratgeber/wechselwissen/lieferantenwechsel-ablauf',
      '/gasvergleich-nrw'
    ],
    lastUpdated: '2026-01-09'
  },
  {
    id: 'gas-preiserhoeung',
    slug: 'ratgeber/gas/preiserhoeung-gas-rechte',
    title: 'Gaspreiserhöhung: Ihre Rechte',
    teaser: 'Was Sie bei Gaspreiserhöhungen tun können und welche Rechte Sie haben.',
    category: 'gas',
    readingTime: 5,
    targetMoneyPage: 'gasvergleich-nrw',
    relatedUrls: [
      '/ratgeber/wechselwissen/kuendigungsfristen-strom-gas',
      '/ratgeber/gas/gasanbieter-wechseln-nrw',
      '/gasvergleich-nrw'
    ],
    lastUpdated: '2026-01-09'
  },
  {
    id: 'gas-umzug',
    slug: 'ratgeber/gas/umzug-gasvertrag',
    title: 'Gasvertrag bei Umzug: Kündigung und Wechsel',
    teaser: 'Wie Sie Ihren Gasvertrag bei einem Umzug richtig handhaben.',
    category: 'gas',
    readingTime: 5,
    targetMoneyPage: 'gasvergleich-nrw',
    relatedUrls: [
      '/ratgeber/wechselwissen/kuendigungsfristen-strom-gas',
      '/ratgeber/wechselwissen/lieferantenwechsel-ablauf',
      '/gasvergleich-nrw'
    ],
    lastUpdated: '2026-01-09'
  },
  {
    id: 'gas-heizungsart',
    slug: 'ratgeber/gas/heizungsart-verbrauch',
    title: 'Heizungsart und Gasverbrauch: Der Zusammenhang',
    teaser: 'Wie Ihre Heizungsart den Gasverbrauch beeinflusst und wie Sie sparen.',
    category: 'gas',
    readingTime: 5,
    targetMoneyPage: 'gasvergleich-nrw',
    relatedUrls: [
      '/ratgeber/gas/gasanbieter-wechseln-nrw',
      '/ratgeber/gas/gaspreisgarantie-worauf-achten',
      '/gasvergleich-nrw'
    ],
    lastUpdated: '2026-01-09'
  },
  {
    id: 'gas-preisgarantie',
    slug: 'ratgeber/gas/gaspreisgarantie-worauf-achten',
    title: 'Gaspreisgarantie: Worauf achten?',
    teaser: 'Preisgarantien verstehen und richtig bewerten.',
    category: 'gas',
    readingTime: 5,
    targetMoneyPage: 'gasvergleich-nrw',
    relatedUrls: [
      '/ratgeber/gas/gasanbieter-wechseln-nrw',
      '/ratgeber/gas/preiserhoeung-gas-rechte',
      '/gasvergleich-nrw'
    ],
    lastUpdated: '2026-01-09'
  },

  // GEWERBE ARTICLES (3)
  {
    id: 'gewerbe-stromvertrag',
    slug: 'ratgeber/gewerbe/gewerbestrom-vertrag-worauf-achten',
    title: 'Gewerbestromvertrag: Worauf achten?',
    teaser: 'Wichtige Kriterien für die Auswahl des richtigen Gewerbestromvertrags.',
    category: 'gewerbe',
    readingTime: 6,
    targetMoneyPage: 'gewerbestrom',
    relatedUrls: [
      '/ratgeber/gewerbe/lastprofil-leistungspreis-arbeitspreis',
      '/ratgeber/wechselwissen/lieferantenwechsel-ablauf',
      '/gewerbestrom'
    ],
    lastUpdated: '2026-01-09'
  },
  {
    id: 'gewerbe-gasbeschaffung',
    slug: 'ratgeber/gewerbe/gewerbegas-beschaffung-tipps',
    title: 'Gewerbegas Beschaffung: Tipps & Strategie',
    teaser: 'Tipps und Strategien zur optimalen Gasversorgung für Ihr Unternehmen.',
    category: 'gewerbe',
    readingTime: 6,
    targetMoneyPage: 'gewerbegas',
    relatedUrls: [
      '/ratgeber/gewerbe/gewerbestrom-vertrag-worauf-achten',
      '/ratgeber/wechselwissen/lieferantenwechsel-ablauf',
      '/gewerbegas'
    ],
    lastUpdated: '2026-01-09'
  },
  {
    id: 'gewerbe-lastprofil',
    slug: 'ratgeber/gewerbe/lastprofil-leistungspreis-arbeitspreis',
    title: 'Lastprofil & Leistungspreis: Erklärung',
    teaser: 'Verstehen Sie Lastprofil und Leistungspreis bei Stromtarifen.',
    category: 'gewerbe',
    readingTime: 6,
    targetMoneyPage: 'gewerbestrom',
    relatedUrls: [
      '/ratgeber/gewerbe/gewerbestrom-vertrag-worauf-achten',
      '/ratgeber/wechselwissen/lieferantenwechsel-ablauf',
      '/gewerbestrom'
    ],
    lastUpdated: '2026-01-09'
  },

  // PHOTOVOLTAIK ARTICLES (5)
  {
    id: 'pv-kosten',
    slug: 'ratgeber/photovoltaik/pv-kosten-nrw-wovon-abhaengig',
    title: 'PV-Kosten in NRW: Wovon hängen sie ab?',
    teaser: 'Photovoltaik-Kosten in NRW verstehen. Erfahren Sie, welche Faktoren die Preise beeinflussen.',
    category: 'photovoltaik',
    readingTime: 6,
    targetMoneyPage: 'photovoltaik-nrw',
    relatedUrls: [
      '/ratgeber/photovoltaik/pv-speicher-lohnt-sich',
      '/ratgeber/photovoltaik/einspeiseverguetung-verstehen',
      '/photovoltaik-nrw'
    ],
    lastUpdated: '2026-01-09'
  },
  {
    id: 'pv-speicher',
    slug: 'ratgeber/photovoltaik/pv-speicher-lohnt-sich',
    title: 'PV-Speicher: Lohnt sich das?',
    teaser: 'Stromspeicher für Solaranlagen: Kosten, Nutzen und Wirtschaftlichkeit.',
    category: 'photovoltaik',
    readingTime: 6,
    targetMoneyPage: 'photovoltaik-nrw',
    relatedUrls: [
      '/ratgeber/photovoltaik/pv-kosten-nrw-wovon-abhaengig',
      '/ratgeber/photovoltaik/einspeiseverguetung-verstehen',
      '/photovoltaik-nrw'
    ],
    lastUpdated: '2026-01-09'
  },
  {
    id: 'pv-einspeiseverguetung',
    slug: 'ratgeber/photovoltaik/einspeiseverguetung-verstehen',
    title: 'Einspeisevergütung verstehen',
    teaser: 'Wie die Einspeisevergütung funktioniert und wie Sie davon profitieren.',
    category: 'photovoltaik',
    readingTime: 5,
    targetMoneyPage: 'photovoltaik-nrw',
    relatedUrls: [
      '/ratgeber/photovoltaik/pv-kosten-nrw-wovon-abhaengig',
      '/ratgeber/photovoltaik/pv-speicher-lohnt-sich',
      '/photovoltaik-nrw'
    ],
    lastUpdated: '2026-01-09'
  },
  {
    id: 'pv-dacheignung',
    slug: 'ratgeber/photovoltaik/dach-eignung-checkliste',
    title: 'Dach-Eignung für Photovoltaik: Checkliste',
    teaser: 'Prüfen Sie, ob Ihr Dach für Solaranlagen geeignet ist.',
    category: 'photovoltaik',
    readingTime: 5,
    targetMoneyPage: 'photovoltaik-nrw',
    relatedUrls: [
      '/ratgeber/photovoltaik/pv-kosten-nrw-wovon-abhaengig',
      '/ratgeber/photovoltaik/angebote-vergleichen-fehler',
      '/photovoltaik-nrw'
    ],
    lastUpdated: '2026-01-09'
  },
  {
    id: 'pv-angebote',
    slug: 'ratgeber/photovoltaik/angebote-vergleichen-fehler',
    title: 'Solarangebote vergleichen: Fehler vermeiden',
    teaser: 'Erfahren Sie, wie Sie Solarangebote richtig vergleichen.',
    category: 'photovoltaik',
    readingTime: 6,
    targetMoneyPage: 'photovoltaik-nrw',
    relatedUrls: [
      '/ratgeber/photovoltaik/pv-kosten-nrw-wovon-abhaengig',
      '/ratgeber/photovoltaik/dach-eignung-checkliste',
      '/photovoltaik-nrw'
    ],
    lastUpdated: '2026-01-09'
  },

  // WECHSELWISSEN ARTICLES (3)
  {
    id: 'wechsel-kuendigungsfristen',
    slug: 'ratgeber/wechselwissen/kuendigungsfristen-strom-gas',
    title: 'Kündigungsfristen Strom & Gas: Übersicht',
    teaser: 'Alles über Kündigungsfristen bei Strom und Gas.',
    category: 'wechselwissen',
    readingTime: 5,
    targetMoneyPage: 'multiple',
    relatedUrls: [
      '/ratgeber/wechselwissen/lieferantenwechsel-ablauf',
      '/ratgeber/wechselwissen/was-tun-wenn-wechsel-schiefgeht',
      '/stromvergleich-nrw'
    ],
    lastUpdated: '2026-01-09'
  },
  {
    id: 'wechsel-ablauf',
    slug: 'ratgeber/wechselwissen/lieferantenwechsel-ablauf',
    title: 'Lieferantenwechsel: Ablauf & Tipps',
    teaser: 'Schritt-für-Schritt Anleitung zum Lieferantenwechsel.',
    category: 'wechselwissen',
    readingTime: 6,
    targetMoneyPage: 'multiple',
    relatedUrls: [
      '/ratgeber/wechselwissen/kuendigungsfristen-strom-gas',
      '/ratgeber/wechselwissen/was-tun-wenn-wechsel-schiefgeht',
      '/stromvergleich-nrw'
    ],
    lastUpdated: '2026-01-09'
  },
  {
    id: 'wechsel-probleme',
    slug: 'ratgeber/wechselwissen/was-tun-wenn-wechsel-schiefgeht',
    title: 'Wechsel schiefgegangen: Was tun?',
    teaser: 'Hilfe bei Problemen beim Lieferantenwechsel.',
    category: 'wechselwissen',
    readingTime: 5,
    targetMoneyPage: 'kontakt',
    relatedUrls: [
      '/ratgeber/wechselwissen/lieferantenwechsel-ablauf',
      '/ratgeber/wechselwissen/kuendigungsfristen-strom-gas',
      '/kontakt'
    ],
    lastUpdated: '2026-01-09'
  }
];

/**
 * Get articles by category
 */
export function getArticlesByCategory(category: RatgeberArticleMeta['category']): RatgeberArticleMeta[] {
  return ratgeberArticles.filter(article => article.category === category);
}

/**
 * Get articles by target money page
 */
export function getArticlesByMoneyPage(targetMoneyPage: RatgeberArticleMeta['targetMoneyPage']): RatgeberArticleMeta[] {
  if (targetMoneyPage === 'multiple') {
    return ratgeberArticles.filter(article => article.targetMoneyPage === 'multiple');
  }
  return ratgeberArticles.filter(article => 
    article.targetMoneyPage === targetMoneyPage || article.targetMoneyPage === 'multiple'
  );
}

/**
 * Get related articles for a specific article
 */
export function getRelatedArticles(articleId: string, limit: number = 3): RatgeberArticleMeta[] {
  const article = ratgeberArticles.find(a => a.id === articleId);
  if (!article) return [];

  // Get articles from same category first
  const sameCategoryArticles = ratgeberArticles.filter(
    a => a.category === article.category && a.id !== articleId
  );

  // If we have enough from same category, return those
  if (sameCategoryArticles.length >= limit) {
    return sameCategoryArticles.slice(0, limit);
  }

  // Otherwise, supplement with other categories
  const otherArticles = ratgeberArticles.filter(
    a => a.category !== article.category && a.id !== articleId
  );

  return [...sameCategoryArticles, ...otherArticles].slice(0, limit);
}

/**
 * Get passende ratgeber for money pages
 * Filters by targetMoneyPage, supplements with Wechselwissen if needed
 */
export function getPassendeRatgeber(
  moneyPageId: RatgeberArticleMeta['targetMoneyPage'],
  limit: number = 5
): RatgeberArticleMeta[] {
  // Get articles specifically for this money page
  const primaryArticles = ratgeberArticles.filter(
    a => a.targetMoneyPage === moneyPageId
  );

  // If we have enough, return them
  if (primaryArticles.length >= limit) {
    return primaryArticles.slice(0, limit);
  }

  // Supplement with 'multiple' category articles (Wechselwissen)
  const supplementArticles = ratgeberArticles.filter(
    a => a.targetMoneyPage === 'multiple' && !primaryArticles.includes(a)
  );

  return [...primaryArticles, ...supplementArticles].slice(0, limit);
}
