import { ratgeberArticles } from '@/lib/ratgeber-map';
import { ROUTES } from '@/lib/routes';
import { SEO_CONFIG, getPageSEO } from '@/lib/seo-config';

type MetaConfig = {
  title: string;
  description: string;
  keywords?: string;
  robots?: string;
  ogType?: 'website' | 'article';
};

type SchemaEntry = {
  id: string;
  payload: Record<string, unknown>;
};

export type ServerSeoData = {
  canonicalUrl: string;
  title: string;
  description: string;
  keywords?: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: 'website' | 'article';
  twitterCard: string;
  breadcrumbItems: Array<{ name: string; url: string }>;
  schemaEntries: SchemaEntry[];
  verificationCode?: string;
};

const DEFAULT_ROBOTS =
  'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
const DEFAULT_OG_IMAGE = SEO_CONFIG.defaultOgImage;

const HOME_HOW_TO_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Wie wechseln Sie Ihren Energieanbieter in NRW',
  description:
    'Ein einfacher 3-Schritte-Prozess zum Wechsel Ihres Strom- oder Gasanbieters in Nordrhein-Westfalen',
  image: DEFAULT_OG_IMAGE,
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Daten eingeben',
      text: 'Geben Sie Ihre Postleitzahl und Ihren Verbrauch in unseren Vergleichsrechner ein.',
      image:
        'https://static.wixstatic.com/media/32e7c0_5f85b8d9458c4ccbafdde2a4f3bc3cce~mv2.png',
      duration: 'PT2M',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Angebote vergleichen',
      text: 'Vergleichen Sie Preise, Vertragsbedingungen und Tarifdetails übersichtlich.',
      image:
        'https://static.wixstatic.com/media/32e7c0_5f85b8d9458c4ccbafdde2a4f3bc3cce~mv2.png',
      duration: 'PT3M',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Online wechseln',
      text: 'Wählen Sie den passenden Tarif und wir begleiten den Wechselprozess.',
      image:
        'https://static.wixstatic.com/media/32e7c0_5f85b8d9458c4ccbafdde2a4f3bc3cce~mv2.png',
      duration: 'PT5M',
    },
  ],
  totalTime: 'PT10M',
};

const HOME_REVIEW_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'AggregateRating',
  '@id': `${SEO_CONFIG.siteUrl}/#reviews`,
  ratingValue: '4.8',
  bestRating: '5',
  worstRating: '1',
  ratingCount: '3',
  reviewCount: '3',
  review: [
    {
      '@type': 'Review',
      '@id': `${SEO_CONFIG.siteUrl}/#review-anna-mueller`,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody:
        'Dank Energievergleich konnten wir unsere Stromkosten erheblich senken. Der Service war hervorragend.',
      author: {
        '@type': 'Person',
        name: 'Anna Müller',
      },
    },
    {
      '@type': 'Review',
      '@id': `${SEO_CONFIG.siteUrl}/#review-max-schmidt`,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody:
        'Der Gasvergleich war einfach und hat uns viel Geld gespart. Der Wechsel lief reibungslos.',
      author: {
        '@type': 'Person',
        name: 'Max Schmidt',
      },
    },
    {
      '@type': 'Review',
      '@id': `${SEO_CONFIG.siteUrl}/#review-lisa-meier`,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody:
        'Die Photovoltaik-Beratung war sehr klar und hilfreich. Wir sind mit der Umsetzung sehr zufrieden.',
      author: {
        '@type': 'Person',
        name: 'Lisa Meier',
      },
    },
  ],
};

const PHOTOVOLTAIK_FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Lohnt sich eine Photovoltaikanlage in NRW?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, auch in NRW lohnt sich eine Photovoltaikanlage. Durch die Einspeisevergütung und die Eigennutzung des Stroms amortisiert sich die Anlage in der Regel nach 8-12 Jahren. Danach produzieren Sie kostenlosen Strom für weitere 15-20 Jahre.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie viel Strom produziert eine Solaranlage in NRW?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Eine typische 5-kW-Anlage produziert in NRW etwa 4.500-5.000 kWh pro Jahr. Dies hängt von der Ausrichtung, dem Neigungswinkel und der Verschattung ab. Mit unserem Beratungsgespräch ermitteln wir die optimale Größe für Ihren Bedarf.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welche Förderungen gibt es für Photovoltaik in NRW?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Es gibt verschiedene Förderungsmöglichkeiten: die KfW-Förderung für Solaranlagen, die Einspeisevergütung für Überschussstrom und regionale Förderprogramme in NRW. Wir informieren Sie über alle verfügbaren Optionen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie lange hält eine Solaranlage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hochwertige Solarmodule halten 25-30 Jahre oder länger. Die meisten Hersteller geben eine Leistungsgarantie von 25 Jahren. Der Wechselrichter sollte nach etwa 10-15 Jahren ausgetauscht werden.',
      },
    },
    {
      '@type': 'Question',
      name: 'Benötige ich einen Stromspeicher?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ein Stromspeicher ist optional, erhöht aber Ihre Unabhängigkeit und Eigennutzungsquote. Mit einem Speicher können Sie bis zu 80% Autarkie erreichen. Wir beraten Sie, ob ein Speicher für Ihre Situation sinnvoll ist.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie viel kostet eine Photovoltaikanlage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Eine 5-kW-Anlage kostet in NRW etwa 8.000-12.000 Euro (netto). Mit Förderungen und der Einspeisevergütung reduziert sich die Amortisationszeit erheblich. Wir erstellen Ihnen ein individuelles Angebot.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kann ich eine Solaranlage mieten?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, es gibt Mietmodelle für Solaranlagen. Dabei zahlen Sie eine monatliche Rate, ohne die Anlage zu kaufen. Dies ist eine gute Option, wenn Sie wenig Kapital investieren möchten.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie lange dauert die Installation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Die Installation einer Solaranlage dauert in der Regel 1-3 Tage. Vorher benötigen Sie eine Genehmigung vom Netzbetreiber, was etwa 4-8 Wochen dauert. Insgesamt sollten Sie mit 2-3 Monaten rechnen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Brauche ich eine Versicherung für meine Solaranlage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, eine Versicherung ist empfehlenswert. Sie schützt vor Schäden durch Hagel, Blitzschlag oder Diebstahl. Die Kosten liegen bei etwa 100-200 Euro pro Jahr.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie funktioniert die Einspeisevergütung?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Für jeden Kilowattstunde Strom, den Sie ins Netz einspeisen, erhalten Sie eine Vergütung. Diese wird monatlich oder jährlich ausbezahlt. Die aktuelle Vergütung liegt bei etwa 8-10 Cent pro kWh.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kann ich meine Solaranlage später erweitern?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, Sie können Ihre Anlage später erweitern. Dies ist besonders sinnvoll, wenn Sie einen Stromspeicher oder ein Elektroauto anschaffen. Wir beraten Sie zu den Möglichkeiten.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie funktioniert die Beratung?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wir führen ein kostenloses Beratungsgespräch durch, analysieren Ihr Dach und Ihren Stromverbrauch, und erstellen ein individuelles Angebot. Danach kümmern wir uns um alle Formalitäten und die Installation.',
      },
    },
  ],
};

const GEWERBESTROM_FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Wie oft kann ich meinen Gewerbestrom-Anbieter wechseln?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sie können Ihren Gewerbestrom-Anbieter jederzeit wechseln, sofern Sie die Kündigungsfrist einhalten. Bei den meisten Verträgen beträgt diese 4 Wochen zum Ende eines Kalendermonats. Nach einem Wechsel können Sie frühestens nach 12 Monaten erneut wechseln.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ist der Wechsel des Gewerbestrom-Anbieters kostenlos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, völlig kostenlos. Es fallen keine Gebühren für die Kündigung beim alten Anbieter oder die Anmeldung beim neuen an. Wir kümmern uns um alle Formalitäten.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie lange dauert ein Gewerbestrom-Wechsel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In der Regel 4-6 Wochen. Ihre Stromversorgung wird nicht unterbrochen. Der neue Anbieter kümmert sich um alle notwendigen Schritte.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kann ich während des Wechsels ohne Strom sein?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nein. Ihre Stromversorgung ist gesetzlich geschützt. Im Notfall springt der Grundversorger ein.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welche Daten benötige ich für einen Gewerbestrom-Vergleich?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Postleitzahl und Stromverbrauch (in kWh). Den Verbrauch finden Sie auf Ihrer letzten Rechnung. Optional: Zählernummer und Lastprofil.',
      },
    },
  ],
};

const GEWERBEGAS_FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Wie oft kann ich meinen Gewerbegas-Anbieter wechseln?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sie können Ihren Gewerbegas-Anbieter jederzeit wechseln, sofern Sie die Kündigungsfrist einhalten. Bei den meisten Verträgen beträgt diese 4 Wochen zum Ende eines Kalendermonats. Nach einem Wechsel können Sie frühestens nach 12 Monaten erneut wechseln.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ist der Wechsel des Gewerbegas-Anbieters kostenlos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, völlig kostenlos. Es fallen keine Gebühren für die Kündigung beim alten Anbieter oder die Anmeldung beim neuen an. Wir kümmern uns um alle Formalitäten.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie lange dauert ein Gewerbegas-Wechsel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In der Regel 4-6 Wochen. Ihre Gasversorgung wird nicht unterbrochen. Der neue Anbieter kümmert sich um alle notwendigen Schritte.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kann ich während des Wechsels ohne Gas sein?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nein. Ihre Gasversorgung ist gesetzlich geschützt. Im Notfall springt der Grundversorger ein.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welche Daten benötige ich für einen Gewerbegas-Vergleich?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Postleitzahl und Gasverbrauch (in kWh). Den Verbrauch finden Sie auf Ihrer letzten Rechnung. Optional: Zählernummer und Heizungsart.',
      },
    },
  ],
};

const ROUTE_LABELS: Record<string, string> = {
  'stromvergleich-nrw': 'Stromvergleich NRW',
  'gasvergleich-nrw': 'Gasvergleich NRW',
  'photovoltaik-nrw': 'Photovoltaik NRW',
  gewerbestrom: 'Gewerbestrom',
  gewerbegas: 'Gewerbegas',
  kontakt: 'Kontakt',
  ratgeber: 'Ratgeber',
  strom: 'Strom',
  gas: 'Gas',
  gewerbe: 'Gewerbe',
  photovoltaik: 'Photovoltaik',
  wechselwissen: 'Wechselwissen',
  methodik: 'Methodik',
  impressum: 'Impressum',
  datenschutz: 'Datenschutz',
  agb: 'AGB',
  widerruf: 'Widerrufsbelehrung',
  sitemap: 'Sitemap',
  faq: 'FAQ',
  blog: 'Blog',
  danke: 'Danke',
};

function normalizePath(pathname: string): string {
  return pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
}

function toAbsoluteUrl(pathname: string): string {
  const normalizedPath = normalizePath(pathname);
  return `${SEO_CONFIG.siteUrl}${normalizedPath}`;
}

function titleizeSegment(segment: string): string {
  return segment
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getArticleMeta(pathname: string): MetaConfig | null {
  const normalizedPath = normalizePath(pathname);
  const article = ratgeberArticles.find((entry) => `/${entry.slug}` === normalizedPath);

  if (!article) {
    return null;
  }

  return {
    title: `${article.title} | energievergleich.shop`,
    description: article.teaser,
    keywords: `${article.category}, ${article.title}, energievergleich.shop`,
    ogType: 'article',
  };
}

function getStaticMeta(pathname: string): MetaConfig {
  const normalizedPath = normalizePath(pathname);
  const articleMeta = getArticleMeta(normalizedPath);
  if (articleMeta) {
    return articleMeta;
  }

  switch (normalizedPath) {
    case ROUTES.home:
      return getPageSEO('home');
    case ROUTES.stromvergleich:
      return getPageSEO('stromvergleich');
    case ROUTES.gasvergleich:
      return getPageSEO('gasvergleich');
    case ROUTES.photovoltaik:
      return getPageSEO('photovoltaik');
    case ROUTES.gewerbestrom:
      return getPageSEO('gewerbestrom');
    case ROUTES.gewerbegas:
      return getPageSEO('gewerbegas');
    case ROUTES.kontakt:
      return getPageSEO('kontakt');
    case ROUTES.ratgeber:
    case ROUTES.ratgeberStrom:
    case ROUTES.ratgeberGas:
    case ROUTES.ratgeberGewerbe:
    case ROUTES.ratgeberPhotovoltaik:
    case ROUTES.ratgeberWechselwissen:
      return getPageSEO('ratgeber');
    case '/methodik':
      return getPageSEO('methodik');
    case ROUTES.impressum:
      return getPageSEO('impressum');
    case ROUTES.datenschutz:
      return getPageSEO('datenschutz');
    case ROUTES.faq:
      return {
        title: 'FAQ | Häufig gestellte Fragen – energievergleich.shop',
        description:
          'Antworten auf häufige Fragen zu Stromvergleich, Gaswechsel, Photovoltaik und Gewerbeenergie in NRW.',
        keywords: 'FAQ, Häufige Fragen, Stromwechsel, Gasvergleich, Photovoltaik, NRW',
      };
    case ROUTES.agb:
      return {
        title: 'AGB | energievergleich.shop',
        description:
          'Allgemeine Geschäftsbedingungen von energievergleich.shop für Strom-, Gas- und Photovoltaik-Anfragen.',
        keywords: 'AGB, Allgemeine Geschäftsbedingungen, energievergleich.shop',
      };
    case ROUTES.widerruf:
      return {
        title: 'Widerrufsbelehrung | energievergleich.shop',
        description:
          'Widerrufsbelehrung und Informationen zum Widerrufsrecht bei energievergleich.shop.',
        keywords: 'Widerruf, Widerrufsrecht, energievergleich.shop',
      };
    case ROUTES.sitemap:
      return {
        title: 'Sitemap | energievergleich.shop',
        description:
          'Sitemap und Seitenübersicht von energievergleich.shop für Strom, Gas, Photovoltaik und Ratgeber.',
        keywords: 'Sitemap, Seitenübersicht, energievergleich.shop',
      };
    case '/danke':
      return {
        title: 'Danke – Anfrage erhalten | energievergleich.shop',
        description: 'Vielen Dank für Ihre Anfrage. Wir melden uns kurzfristig bei Ihnen.',
        robots: 'noindex, nofollow',
      };
    case '/blog':
      return {
        title: 'Blog | energievergleich.shop',
        description:
          'Aktuelle Inhalte und Fachbeiträge rund um Strom, Gas, Photovoltaik und Wechselwissen.',
        keywords: 'Blog, Strom, Gas, Photovoltaik, Wechselwissen',
      };
    default: {
      const segments = normalizedPath.split('/').filter(Boolean);
      const currentLabel = segments.at(-1) ? ROUTE_LABELS[segments.at(-1)!] || titleizeSegment(segments.at(-1)!) : 'energievergleich.shop';
      return {
        title: `${currentLabel} | energievergleich.shop`,
        description: SEO_CONFIG.siteDescription,
        keywords: currentLabel,
      };
    }
  }
}

function getBreadcrumbItems(pathname: string): Array<{ name: string; url: string }> {
  const normalizedPath = normalizePath(pathname);
  if (normalizedPath === ROUTES.home) {
    return [{ name: 'Startseite', url: SEO_CONFIG.siteUrl }];
  }

  const segments = normalizedPath.split('/').filter(Boolean);
  let currentPath = '';
  const breadcrumbs = [{ name: 'Startseite', url: SEO_CONFIG.siteUrl }];

  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    const article = ratgeberArticles.find((entry) => `/${entry.slug}` === currentPath);
    const name = article?.title || ROUTE_LABELS[segment] || titleizeSegment(segment);
    breadcrumbs.push({
      name,
      url: toAbsoluteUrl(currentPath),
    });
  });

  return breadcrumbs;
}

function buildSchemaEntries(pathname: string): SchemaEntry[] {
  const breadcrumbItems = getBreadcrumbItems(pathname);
  const sameAs = [
    SEO_CONFIG.social.facebook,
    SEO_CONFIG.social.twitter,
    SEO_CONFIG.social.linkedin,
  ].filter(Boolean);

  const entries: SchemaEntry[] = [
    {
      id: 'website-schema',
      payload: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SEO_CONFIG.siteName,
        url: SEO_CONFIG.siteUrl,
        description: SEO_CONFIG.siteDescription,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SEO_CONFIG.siteUrl}/?q={search_term_string}`,
          },
          query_input: 'required name=search_term_string',
        },
      },
    },
    {
      id: 'organization-schema',
      payload: {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SEO_CONFIG.organization.name,
        legalName: SEO_CONFIG.organization.legalName,
        url: SEO_CONFIG.organization.url,
        logo: SEO_CONFIG.organization.logo,
        description: SEO_CONFIG.siteDescription,
        sameAs,
        areaServed: SEO_CONFIG.organization.areaServed,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Service',
          email: SEO_CONFIG.organization.contact.email,
          telephone: SEO_CONFIG.organization.contact.telephone,
          availableLanguage: ['de'],
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: SEO_CONFIG.organization.address.streetAddress,
          addressLocality: SEO_CONFIG.organization.address.addressLocality,
          addressRegion: SEO_CONFIG.organization.address.addressRegion,
          postalCode: SEO_CONFIG.organization.address.postalCode,
          addressCountry: SEO_CONFIG.organization.address.addressCountry,
        },
      },
    },
    {
      id: 'local-business-schema',
      payload: {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': SEO_CONFIG.organization.url,
        name: SEO_CONFIG.organization.name,
        image: SEO_CONFIG.organization.logo,
        description: SEO_CONFIG.siteDescription,
        url: SEO_CONFIG.organization.url,
        telephone: SEO_CONFIG.organization.contact.telephone,
        email: SEO_CONFIG.organization.contact.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: SEO_CONFIG.organization.address.streetAddress,
          addressLocality: SEO_CONFIG.organization.address.addressLocality,
          addressRegion: SEO_CONFIG.organization.address.addressRegion,
          postalCode: SEO_CONFIG.organization.address.postalCode,
          addressCountry: SEO_CONFIG.organization.address.addressCountry,
        },
        areaServed: [
          {
            '@type': 'State',
            name: 'Nordrhein-Westfalen',
          },
        ],
        sameAs,
        priceRange: '€€',
        serviceType: [
          'Energieberatung',
          'Stromvergleich',
          'Gasvergleich',
          'Photovoltaikberatung',
          'Gewerbeenergie',
        ],
      },
    },
  ];

  if (breadcrumbItems.length > 1) {
    entries.push({
      id: 'breadcrumb-schema',
      payload: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbItems.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      },
    });
  }

  if (normalizePath(pathname) === ROUTES.home) {
    entries.push(
      { id: 'howto-schema', payload: HOME_HOW_TO_SCHEMA },
      { id: 'review-schema', payload: HOME_REVIEW_SCHEMA },
    );
  }

  if (normalizePath(pathname) === ROUTES.photovoltaik) {
    entries.push({ id: 'photovoltaik-faq-schema', payload: PHOTOVOLTAIK_FAQ_SCHEMA });
  }

  if (normalizePath(pathname) === ROUTES.gewerbestrom) {
    entries.push({ id: 'gewerbestrom-faq-schema', payload: GEWERBESTROM_FAQ_SCHEMA });
  }

  if (normalizePath(pathname) === ROUTES.gewerbegas) {
    entries.push({ id: 'gewerbegas-faq-schema', payload: GEWERBEGAS_FAQ_SCHEMA });
  }

  return entries;
}

export function getServerSeo(pathname: string): ServerSeoData {
  const normalizedPath = normalizePath(pathname);
  const meta = getStaticMeta(normalizedPath);
  const canonicalUrl = toAbsoluteUrl(normalizedPath);
  const robots = meta.robots ?? DEFAULT_ROBOTS;

  return {
    canonicalUrl,
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    robots,
    ogTitle: meta.title,
    ogDescription: meta.description,
    ogImage: DEFAULT_OG_IMAGE,
    ogUrl: canonicalUrl,
    ogType: meta.ogType ?? 'website',
    twitterCard: 'summary_large_image',
    breadcrumbItems: getBreadcrumbItems(normalizedPath),
    schemaEntries: buildSchemaEntries(normalizedPath),
    verificationCode: SEO_CONFIG.googleSearchConsoleVerification || undefined,
  };
}
