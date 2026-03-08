export type InternalLinkItem = {
  title: string;
  href: string;
  category: "strom" | "gas" | "photovoltaik" | "ratgeber" | "gewerbe" | "allgemein";
  keywords?: string[];
};

export interface RelatedPage {
  title: string;
  path: string;
  description: string;
}

export const INTERNAL_LINKS: InternalLinkItem[] = [
  {
    title: "Stromvergleich NRW",
    href: "/stromvergleich-nrw",
    category: "strom",
    keywords: ["strom", "stromvergleich", "stromanbieter", "stromtarif", "strompreis"]
  },
  {
    title: "Gasvergleich NRW",
    href: "/gasvergleich-nrw",
    category: "gas",
    keywords: ["gas", "gasvergleich", "gasanbieter", "gastarif", "gaspreis"]
  },
  {
    title: "Photovoltaik NRW",
    href: "/photovoltaik-nrw",
    category: "photovoltaik",
    keywords: ["photovoltaik", "pv", "solaranlage", "solarstrom", "einspeisevergütung"]
  },
  {
    title: "Gewerbestrom",
    href: "/gewerbestrom",
    category: "gewerbe",
    keywords: ["gewerbestrom", "betrieb", "unternehmen", "firma", "gewerbe"]
  },
  {
    title: "Gewerbegas",
    href: "/gewerbegas",
    category: "gewerbe",
    keywords: ["gewerbegas", "betrieb", "unternehmen", "firma", "gewerbe"]
  },
  {
    title: "Ratgeber",
    href: "/ratgeber",
    category: "ratgeber",
    keywords: ["ratgeber", "wissen", "tipps", "vergleich", "energie"]
  }
];

function scoreLink(input: string, item: InternalLinkItem): number {
  const text = input.toLowerCase();
  let score = 0;

  if (item.keywords) {
    for (const kw of item.keywords) {
      if (text.includes(kw.toLowerCase())) score += 2;
    }
  }

  if (text.includes(item.title.toLowerCase())) score += 3;

  return score;
}

export function getRelevantInternalLinks(
  currentPath: string,
  pageTitle: string,
  pageText = "",
  maxLinks = 4
): InternalLinkItem[] {
  const input = `${pageTitle} ${pageText}`.trim();

  return INTERNAL_LINKS
    .filter((item) => item.href !== currentPath)
    .map((item) => ({
      item,
      score: scoreLink(input, item)
    }))
    .sort((a, b) => b.score - a.score)
    .filter((entry) => entry.score > 0)
    .slice(0, maxLinks)
    .map((entry) => entry.item);
}

export function getFallbackInternalLinks(currentPath: string, maxLinks = 4): InternalLinkItem[] {
  return INTERNAL_LINKS
    .filter((item) => item.href !== currentPath)
    .slice(0, maxLinks);
}

const RELATED_PAGES_BY_CATEGORY: Record<InternalLinkItem["category"], RelatedPage[]> = {
  strom: [
    {
      title: "Gasvergleich NRW",
      path: "/gasvergleich-nrw",
      description: "Vergleichen Sie Gastarife in NRW und senken Sie Ihre Heizkosten."
    },
    {
      title: "Photovoltaik NRW",
      path: "/photovoltaik-nrw",
      description: "Erfahren Sie, wie Sie mit Solarstrom dauerhaft Kosten sparen."
    },
    {
      title: "Gewerbestrom",
      path: "/gewerbestrom",
      description: "Optimieren Sie Stromkosten für Ihr Unternehmen."
    }
  ],
  gas: [
    {
      title: "Stromvergleich NRW",
      path: "/stromvergleich-nrw",
      description: "Finden Sie günstige Stromtarife für Ihren Haushalt."
    },
    {
      title: "Photovoltaik NRW",
      path: "/photovoltaik-nrw",
      description: "Nutzen Sie Solarenergie als langfristige Ergänzung."
    },
    {
      title: "Gewerbegas",
      path: "/gewerbegas",
      description: "Gastarife für Unternehmen in NRW vergleichen."
    }
  ],
  photovoltaik: [
    {
      title: "Stromvergleich NRW",
      path: "/stromvergleich-nrw",
      description: "Kombinieren Sie PV mit einem günstigen Reststromtarif."
    },
    {
      title: "Gasvergleich NRW",
      path: "/gasvergleich-nrw",
      description: "Auch Heizkosten lassen sich effektiv optimieren."
    },
    {
      title: "Ratgeber",
      path: "/ratgeber",
      description: "Weitere Praxistipps rund um Energie und Wechsel."
    }
  ],
  ratgeber: [
    {
      title: "Stromvergleich NRW",
      path: "/stromvergleich-nrw",
      description: "Jetzt passende Stromtarife in NRW finden."
    },
    {
      title: "Gasvergleich NRW",
      path: "/gasvergleich-nrw",
      description: "Vergleichen Sie Gastarife und sparen Sie sofort."
    },
    {
      title: "Photovoltaik NRW",
      path: "/photovoltaik-nrw",
      description: "Alles über PV, Kosten und Förderung in NRW."
    }
  ],
  gewerbe: [
    {
      title: "Gewerbestrom",
      path: "/gewerbestrom",
      description: "Stromtarife für Betriebe transparent vergleichen."
    },
    {
      title: "Gewerbegas",
      path: "/gewerbegas",
      description: "Gastarife für Unternehmen mit Planungssicherheit."
    },
    {
      title: "Ratgeber Gewerbe",
      path: "/ratgeber/gewerbe",
      description: "Praxiswissen für Energieeinkauf im Unternehmen."
    }
  ],
  allgemein: [
    {
      title: "Stromvergleich NRW",
      path: "/stromvergleich-nrw",
      description: "Stromkosten senken durch Tarifvergleich."
    },
    {
      title: "Gasvergleich NRW",
      path: "/gasvergleich-nrw",
      description: "Gastarife prüfen und direkt wechseln."
    },
    {
      title: "Ratgeber",
      path: "/ratgeber",
      description: "Hintergrundwissen zu Tarifen, Wechsel und Rechten."
    }
  ]
};

export function getRelatedPages(currentPath: string, maxLinks = 3): RelatedPage[] {
  const matched = INTERNAL_LINKS.find((item) => currentPath.startsWith(item.href));
  const category = matched?.category ?? "allgemein";
  return RELATED_PAGES_BY_CATEGORY[category]
    .filter((page) => page.path !== currentPath)
    .slice(0, maxLinks);
}

export interface BreadcrumbItem {
  label: string;
  path: string;
}

export function getBreadcrumbItems(pathname: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { label: 'Startseite', path: '/' }
  ];

  // Remove leading/trailing slashes and split path
  const segments = pathname.split('/').filter(Boolean);

  let currentPath = '';
  for (const segment of segments) {
    currentPath += `/${segment}`;
    
    // Convert segment to readable label
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    items.push({ label, path: currentPath });
  }

  return items;
}
