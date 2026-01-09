/**
 * Ratgeber Article Mapping
 * Zentrale Konfiguration aller Ratgeber-Artikel mit Metadaten
 * Wird von Kategorie-Seiten und Money Pages verwendet
 */

export type RatgeberCategory = 'strom' | 'gas' | 'gewerbe' | 'photovoltaik' | 'wechselwissen';

export interface RatgeberArticleMeta {
  slug: string;
  title: string;
  description: string;
  category: RatgeberCategory;
  teaser: string;
  readingTime: number;
  lastUpdated: string;
  targetMoneyPage: string;
  relatedUrls: string[];
}

export const ratgeberArticles: RatgeberArticleMeta[] = [
  // STROM (7 Artikel)
  {
    slug: 'stromanbieter-wechseln-nrw',
    title: 'Stromanbieter wechseln in NRW',
    description: 'Schritt-für-Schritt Anleitung zum Stromanbieterwechsel in Nordrhein-Westfalen. Erfahren Sie, wie Sie richtig wechseln und Kosten sparen.',
    category: 'strom',
    teaser: 'Erfahren Sie, wie Sie in wenigen Schritten zu einem günstigeren Stromanbieter wechseln und dabei Geld sparen.',
    readingTime: 9,
    lastUpdated: '2026-01-09',
    targetMoneyPage: '/stromvergleich-nrw',
    relatedUrls: [
      '/ratgeber/strom/grundversorgung-vs-sondervertrag',
      '/ratgeber/wechselwissen/lieferantenwechsel-ablauf',
      '/ratgeber/wechselwissen/kuendigungsfristen-strom-gas'
    ]
  },
  {
    slug: 'grundversorgung-vs-sondervertrag',
    title: 'Grundversorgung vs. Sondervertrag',
    description: 'Unterschiede zwischen Stromgrundversorgung und Sonderverträgen. Welcher Tarif passt zu Ihnen? Vor- und Nachteile im Vergleich.',
    category: 'strom',
    teaser: 'Verstehen Sie die Unterschiede zwischen Grundversorgung und Sonderverträgen und treffen Sie die richtige Wahl.',
    readingTime: 8,
    lastUpdated: '2026-01-09',
    targetMoneyPage: '/stromvergleich-nrw',
    relatedUrls: [
      '/ratgeber/strom/stromanbieter-wechseln-nrw',
      '/ratgeber/strom/stromtarif-vertragslaufzeit',
      '/ratgeber/wechselwissen/lieferantenwechsel-ablauf'
    ]
  },
  {
    slug: 'neukundenbonus-fallen',
    title: 'Neukundenbonus und versteckte Fallen',
    description: 'Wie Neukundenboni funktionieren und welche Fallen Sie vermeiden sollten. Tipps für echte Ersparnisse beim Stromwechsel.',
    category: 'strom',
    teaser: 'Lernen Sie, Neukundenboni richtig zu bewerten und versteckte Fallen bei Stromtarifen zu erkennen.',
    readingTime: 8,
    lastUpdated: '2026-01-09',
    targetMoneyPage: '/stromvergleich-nrw',
    relatedUrls: [
      '/ratgeber/strom/stromtarif-vertragslaufzeit',
      '/ratgeber/strom/stromanbieter-wechseln-nrw',
      '/ratgeber/wechselwissen/was-tun-wenn-wechsel-schiefgeht'
    ]
  },
  {
    slug: 'preiserhoehung-was-tun',
    title: 'Strompreiserhöhung: Was können Sie tun?',
    description: 'Ihre Rechte bei Strompreiserhöhungen und wie Sie reagieren sollten. Sonderkündigungsrecht und Alternativen.',
    category: 'strom',
    teaser: 'Erfahren Sie, welche Rechte Sie bei Strompreiserhöhungen haben und wie Sie am besten reagieren.',
    readingTime: 8,
    lastUpdated: '2026-01-09',
    targetMoneyPage: '/stromvergleich-nrw',
    relatedUrls: [
      '/ratgeber/strom/stromanbieter-wechseln-nrw',
      '/ratgeber/wechselwissen/kuendigungsfristen-strom-gas',
      '/ratgeber/wechselwissen/was-tun-wenn-wechsel-schiefgeht'
    ]
  },
  {
    slug: 'umzug-stromvertrag',
    title: 'Stromvertrag beim Umzug',
    description: 'Was passiert mit Ihrem Stromvertrag beim Umzug? Kündigungsfristen, Neukunden-Angebote und wichtige Tipps.',
    category: 'strom',
    teaser: 'Alles Wichtige zum Stromvertrag beim Umzug: Kündigungsfristen, Neukunden-Angebote und praktische Tipps.',
    readingTime: 7,
    lastUpdated: '2026-01-09',
    targetMoneyPage: '/stromvergleich-nrw',
    relatedUrls: [
      '/ratgeber/strom/stromanbieter-wechseln-nrw',
      '/ratgeber/wechselwissen/kuendigungsfristen-strom-gas',
      '/ratgeber/strom/malo-id-zaehlernummer'
    ]
  },
  {
    slug: 'stromtarif-vertragslaufzeit',
    title: 'Stromtarif und Vertragslaufzeit',
    description: 'Wie lange sollte Ihre Stromvertragslaufzeit sein? Vor- und Nachteile von 12, 24 Monaten und flexiblen Verträgen.',
    category: 'strom',
    teaser: 'Erfahren Sie, welche Vertragslaufzeit für Ihren Stromtarif am besten passt und worauf Sie achten sollten.',
    readingTime: 7,
    lastUpdated: '2026-01-09',
    targetMoneyPage: '/stromvergleich-nrw',
    relatedUrls: [
      '/ratgeber/strom/grundversorgung-vs-sondervertrag',
      '/ratgeber/strom/neukundenbonus-fallen',
      '/ratgeber/wechselwissen/kuendigungsfristen-strom-gas'
    ]
  },
  {
    slug: 'malo-id-zaehlernummer',
    title: 'MALO-ID und Zählernummer erklärt',
    description: 'Was sind MALO-ID und Zählernummer? Warum brauchen Sie diese beim Stromwechsel und wo finden Sie sie?',
    category: 'strom',
    teaser: 'Verstehen Sie MALO-ID und Zählernummer und erfahren Sie, warum diese beim Stromwechsel wichtig sind.',
    readingTime: 6,
    lastUpdated: '2026-01-09',
    targetMoneyPage: '/stromvergleich-nrw',
    relatedUrls: [
      '/ratgeber/strom/stromanbieter-wechseln-nrw',
      '/ratgeber/strom/umzug-stromvertrag',
      '/ratgeber/wechselwissen/lieferantenwechsel-ablauf'
    ]
  },

  // GAS (6 Artikel)
  {
    slug: 'gasanbieter-wechseln-nrw',
    title: 'Gasanbieter wechseln in NRW',
    description: 'Schritt-für-Schritt Anleitung zum Gasanbieterwechsel in Nordrhein-Westfalen. Kosten sparen und Prozess verstehen.',
    category: 'gas',
    teaser: 'Erfahren Sie, wie Sie einfach und sicher zu einem günstigeren Gasanbieter wechseln und dabei Heizkosten sparen.',
    readingTime: 9,
    lastUpdated: '2026-01-09',
    targetMoneyPage: '/gasvergleich-nrw',
    relatedUrls: [
      '/ratgeber/gas/grundversorgung-gas-sondervertrag',
      '/ratgeber/wechselwissen/lieferantenwechsel-ablauf',
      '/ratgeber/wechselwissen/kuendigungsfristen-strom-gas'
    ]
  },
  {
    slug: 'grundversorgung-gas-sondervertrag',
    title: 'Gasgrundversorgung vs. Sondervertrag',
    description: 'Unterschiede zwischen Gasgrundversorgung und Sonderverträgen. Welcher Tarif ist günstiger und besser für Sie?',
    category: 'gas',
    teaser: 'Verstehen Sie die Unterschiede zwischen Gasgrundversorgung und Sonderverträgen und sparen Sie Heizkosten.',
    readingTime: 8,
    lastUpdated: '2026-01-09',
    targetMoneyPage: '/gasvergleich-nrw',
    relatedUrls: [
      '/ratgeber/gas/gasanbieter-wechseln-nrw',
      '/ratgeber/gas/gaspreisgarantie-worauf-achten',
      '/ratgeber/wechselwissen/lieferantenwechsel-ablauf'
    ]
  },
  {
    slug: 'gaspreisgarantie-worauf-achten',
    title: 'Gaspreisgarantie: Worauf sollten Sie achten?',
    description: 'Was ist eine Gaspreisgarantie und wie lange sollte sie sein? Unterschiede und worauf Sie achten müssen.',
    category: 'gas',
    teaser: 'Lernen Sie, Gaspreisgarantien richtig zu bewerten und versteckte Kosten bei Gastarifen zu vermeiden.',
    readingTime: 8,
    lastUpdated: '2026-01-09',
    targetMoneyPage: '/gasvergleich-nrw',
    relatedUrls: [
      '/ratgeber/gas/gasanbieter-wechseln-nrw',
      '/ratgeber/gas/preiserhoehung-gas-rechte',
      '/ratgeber/wechselwissen/kuendigungsfristen-strom-gas'
    ]
  },
  {
    slug: 'preiserhoehung-gas-rechte',
    title: 'Gaspreiserhöhung: Ihre Rechte',
    description: 'Was sind Ihre Rechte bei Gaspreiserhöhungen? Sonderkündigungsrecht und wie Sie richtig reagieren.',
    category: 'gas',
    teaser: 'Erfahren Sie, welche Rechte Sie bei Gaspreiserhöhungen haben und wie Sie am besten handeln.',
    readingTime: 8,
    lastUpdated: '2026-01-09',
    targetMoneyPage: '/gasvergleich-nrw',
    relatedUrls: [
      '/ratgeber/gas/gasanbieter-wechseln-nrw',
      '/ratgeber/wechselwissen/kuendigungsfristen-strom-gas',
      '/ratgeber/wechselwissen/was-tun-wenn-wechsel-schiefgeht'
    ]
  },
  {
    slug: 'umzug-gasvertrag',
    title: 'Gasvertrag beim Umzug',
    description: 'Was passiert mit Ihrem Gasvertrag beim Umzug? Kündigungsfristen, Neukunden-Angebote und praktische Tipps.',
    category: 'gas',
    teaser: 'Alles Wichtige zum Gasvertrag beim Umzug: Kündigungsfristen, Neukunden-Angebote und Sparpotenziale.',
    readingTime: 7,
    lastUpdated: '2026-01-09',
    targetMoneyPage: '/gasvergleich-nrw',
    relatedUrls: [
      '/ratgeber/gas/gasanbieter-wechseln-nrw',
      '/ratgeber/wechselwissen/kuendigungsfristen-strom-gas',
      '/ratgeber/gas/heizungsart-verbrauch-einschaetzen'
    ]
  },
  {
    slug: 'heizungsart-verbrauch-einschaetzen',
    title: 'Heizungsart und Gasverbrauch einschätzen',
    description: 'Wie beeinflussen Heizungsart und Wohnfläche Ihren Gasverbrauch? Tipps zur korrekten Einschätzung.',
    category: 'gas',
    teaser: 'Lernen Sie, Ihren Gasverbrauch richtig einzuschätzen und den passenden Tarif zu wählen.',
    readingTime: 7,
    lastUpdated: '2026-01-09',
    targetMoneyPage: '/gasvergleich-nrw',
    relatedUrls: [
      '/ratgeber/gas/gasanbieter-wechseln-nrw',
      '/ratgeber/gas/grundversorgung-gas-sondervertrag',
      '/ratgeber/wechselwissen/lieferantenwechsel-ablauf'
    ]
  },

  // GEWERBE (3 Artikel)
  {
    slug: 'gewerbestrom-vertrag-worauf-achten',
    title: 'Gewerbestrom-Vertrag: Worauf achten?',
    description: 'Wichtige Punkte bei Gewerbestrom-Verträgen. Lastprofil, Leistungspreis und Vertragsbedingungen verstehen.',
    category: 'gewerbe',
    teaser: 'Erfahren Sie, worauf Sie bei Gewerbestrom-Verträgen achten sollten und wie Sie Kosten sparen.',
    readingTime: 9,
    lastUpdated: '2026-01-09',
    targetMoneyPage: '/gewerbestrom',
    relatedUrls: [
      '/ratgeber/gewerbe/gewerbegas-beschaffung-tipps',
      '/ratgeber/gewerbe/lastprofil-leistungspreis-arbeitspreis',
      '/ratgeber/wechselwissen/lieferantenwechsel-ablauf'
    ]
  },
  {
    slug: 'gewerbegas-beschaffung-tipps',
    title: 'Gewerbegas-Beschaffung: Tipps für Unternehmen',
    description: 'Wie beschaffen Unternehmen Gewerbegas optimal? Verhandlungstipps und Vertragsbedingungen für Gewerbetreibende.',
    category: 'gewerbe',
    teaser: 'Tipps und Strategien zur optimalen Gewerbegas-Beschaffung für Ihr Unternehmen.',
    readingTime: 8,
    lastUpdated: '2026-01-09',
    targetMoneyPage: '/gewerbegas',
    relatedUrls: [
      '/ratgeber/gewerbe/gewerbestrom-vertrag-worauf-achten',
      '/ratgeber/gewerbe/lastprofil-leistungspreis-arbeitspreis',
      '/ratgeber/wechselwissen/lieferantenwechsel-ablauf'
    ]
  },
  {
    slug: 'lastprofil-leistungspreis-arbeitspreis',
    title: 'Lastprofil, Leistungspreis und Arbeitspreis',
    description: 'Verstehen Sie Lastprofil, Leistungspreis und Arbeitspreis bei Gewerbeenergie. Wie beeinflussen sie Ihre Kosten?',
    category: 'gewerbe',
    teaser: 'Lernen Sie die Unterschiede zwischen Lastprofil, Leistungspreis und Arbeitspreis und optimieren Sie Ihre Energiekosten.',
    readingTime: 8,
    lastUpdated: '2026-01-09',
    targetMoneyPage: '/gewerbestrom',
    relatedUrls: [
      '/ratgeber/gewerbe/gewerbestrom-vertrag-worauf-achten',
      '/ratgeber/gewerbe/gewerbegas-beschaffung-tipps',
      '/ratgeber/wechselwissen/lieferantenwechsel-ablauf'
    ]
  },

  // PHOTOVOLTAIK (5 Artikel)
  {
    slug: 'pv-kosten-nrw-wovon-abhaengig',
    title: 'PV-Kosten in NRW: Wovon hängt es ab?',
    description: 'Wie viel kostet eine Solaranlage in NRW? Faktoren, die die Kosten beeinflussen und Förderungsmöglichkeiten.',
    category: 'photovoltaik',
    teaser: 'Erfahren Sie, welche Faktoren die Kosten einer Solaranlage beeinflussen und wie Sie sparen können.',
    readingTime: 9,
    lastUpdated: '2026-01-09',
    targetMoneyPage: '/photovoltaik-nrw',
    relatedUrls: [
      '/ratgeber/photovoltaik/pv-speicher-lohnt-sich',
      '/ratgeber/photovoltaik/einspeiseverguetung-verstehen',
      '/ratgeber/photovoltaik/dach-eignung-checkliste'
    ]
  },
  {
    slug: 'pv-speicher-lohnt-sich',
    title: 'PV-Speicher: Lohnt sich die Investition?',
    description: 'Ist ein Stromspeicher für Ihre Solaranlage sinnvoll? Kosten, Nutzen und Wirtschaftlichkeit im Überblick.',
    category: 'photovoltaik',
    teaser: 'Erfahren Sie, ob ein Stromspeicher für Ihre Solaranlage wirtschaftlich sinnvoll ist.',
    readingTime: 8,
    lastUpdated: '2026-01-09',
    targetMoneyPage: '/photovoltaik-nrw',
    relatedUrls: [
      '/ratgeber/photovoltaik/pv-kosten-nrw-wovon-abhaengig',
      '/ratgeber/photovoltaik/einspeiseverguetung-verstehen',
      '/ratgeber/photovoltaik/angebote-vergleichen-fehler'
    ]
  },
  {
    slug: 'einspeiseverguetung-verstehen',
    title: 'Einspeisevergütung verstehen',
    description: 'Wie funktioniert die Einspeisevergütung? Aktuelle Sätze, Bedingungen und wie Sie davon profitieren.',
    category: 'photovoltaik',
    teaser: 'Verstehen Sie die Einspeisevergütung und wie Sie damit Ihre Solaranlage rentabel machen.',
    readingTime: 7,
    lastUpdated: '2026-01-09',
    targetMoneyPage: '/photovoltaik-nrw',
    relatedUrls: [
      '/ratgeber/photovoltaik/pv-kosten-nrw-wovon-abhaengig',
      '/ratgeber/photovoltaik/pv-speicher-lohnt-sich',
      '/ratgeber/photovoltaik/dach-eignung-checkliste'
    ]
  },
  {
    slug: 'dach-eignung-checkliste',
    title: 'Dach-Eignung für Solaranlage: Checkliste',
    description: 'Ist Ihr Dach für eine Solaranlage geeignet? Checkliste mit wichtigen Kriterien und Lösungen.',
    category: 'photovoltaik',
    teaser: 'Prüfen Sie mit unserer Checkliste, ob Ihr Dach für eine Solaranlage geeignet ist.',
    readingTime: 7,
    lastUpdated: '2026-01-09',
    targetMoneyPage: '/photovoltaik-nrw',
    relatedUrls: [
      '/ratgeber/photovoltaik/pv-kosten-nrw-wovon-abhaengig',
      '/ratgeber/photovoltaik/angebote-vergleichen-fehler',
      '/ratgeber/photovoltaik/einspeiseverguetung-verstehen'
    ]
  },
  {
    slug: 'angebote-vergleichen-fehler',
    title: 'Solarangebote vergleichen: Häufige Fehler',
    description: 'Wie vergleichen Sie Solarangebote richtig? Häufige Fehler und worauf Sie achten sollten.',
    category: 'photovoltaik',
    teaser: 'Lernen Sie, Solarangebote richtig zu vergleichen und häufige Fehler zu vermeiden.',
    readingTime: 8,
    lastUpdated: '2026-01-09',
    targetMoneyPage: '/photovoltaik-nrw',
    relatedUrls: [
      '/ratgeber/photovoltaik/pv-kosten-nrw-wovon-abhaengig',
      '/ratgeber/photovoltaik/dach-eignung-checkliste',
      '/ratgeber/photovoltaik/pv-speicher-lohnt-sich'
    ]
  },

  // WECHSELWISSEN (3 Artikel)
  {
    slug: 'kuendigungsfristen-strom-gas',
    title: 'Kündigungsfristen bei Strom und Gas',
    description: 'Wie lange sind Kündigungsfristen bei Strom und Gas? Sonderkündigungsrecht und Besonderheiten.',
    category: 'wechselwissen',
    teaser: 'Erfahren Sie alles über Kündigungsfristen bei Strom und Gas und Ihre Rechte beim Wechsel.',
    readingTime: 8,
    lastUpdated: '2026-01-09',
    targetMoneyPage: '/stromvergleich-nrw',
    relatedUrls: [
      '/ratgeber/wechselwissen/lieferantenwechsel-ablauf',
      '/ratgeber/strom/stromanbieter-wechseln-nrw',
      '/ratgeber/gas/gasanbieter-wechseln-nrw'
    ]
  },
  {
    slug: 'lieferantenwechsel-ablauf',
    title: 'Lieferantenwechsel: Ablauf und Dauer',
    description: 'Wie läuft ein Lieferantenwechsel ab? Dauer, Schritte und was Sie beachten müssen.',
    category: 'wechselwissen',
    teaser: 'Verstehen Sie den Ablauf eines Lieferantenwechsels und wie lange dieser dauert.',
    readingTime: 8,
    lastUpdated: '2026-01-09',
    targetMoneyPage: '/stromvergleich-nrw',
    relatedUrls: [
      '/ratgeber/wechselwissen/kuendigungsfristen-strom-gas',
      '/ratgeber/strom/stromanbieter-wechseln-nrw',
      '/ratgeber/wechselwissen/was-tun-wenn-wechsel-schiefgeht'
    ]
  },
  {
    slug: 'was-tun-wenn-wechsel-schiefgeht',
    title: 'Was tun, wenn der Wechsel schiefgeht?',
    description: 'Probleme beim Lieferantenwechsel? Lösungen und Ihre Rechte wenn etwas schief läuft.',
    category: 'wechselwissen',
    teaser: 'Erfahren Sie, was Sie tun können, wenn beim Lieferantenwechsel etwas schiefgeht.',
    readingTime: 7,
    lastUpdated: '2026-01-09',
    targetMoneyPage: '/stromvergleich-nrw',
    relatedUrls: [
      '/ratgeber/wechselwissen/lieferantenwechsel-ablauf',
      '/ratgeber/wechselwissen/kuendigungsfristen-strom-gas',
      '/ratgeber/strom/preiserhoehung-was-tun'
    ]
  }
];

/**
 * Hilfsfunktion: Artikel nach Kategorie filtern
 */
export function getArticlesByCategory(category: RatgeberCategory): RatgeberArticleMeta[] {
  return ratgeberArticles.filter(article => article.category === category);
}

/**
 * Hilfsfunktion: Artikel nach Slug finden
 */
export function getArticleBySlug(slug: string): RatgeberArticleMeta | undefined {
  return ratgeberArticles.find(article => article.slug === slug);
}

/**
 * Hilfsfunktion: Artikel nach Money Page filtern
 */
export function getArticlesByMoneyPage(moneyPagePath: string): RatgeberArticleMeta[] {
  return ratgeberArticles.filter(article => article.targetMoneyPage === moneyPagePath);
}
