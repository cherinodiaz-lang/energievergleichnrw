interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  noindex?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  keywords?: string;
  robots?: string;
  author?: string;
}

export default function SEOHead(_: SEOHeadProps) {
  // Head-Tags werden serverseitig in src/pages/[...slug].astro erzeugt.
  // Der Komponentenvertrag bleibt bestehen, damit bestehende Seiten nicht brechen.
  return null;
}
