import { useContext, useEffect } from 'react';
import { UNSAFE_LocationContext } from 'react-router-dom';
import { SEO_CONFIG } from '@/lib/seo-config';

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

const DEFAULT_ROBOTS =
  'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
}

function upsertLink(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
}

function buildCanonicalUrl(pathOrUrl: string) {
  const canonicalUrl = new URL(pathOrUrl, SEO_CONFIG.siteUrl);
  canonicalUrl.hash = '';
  canonicalUrl.search = '';

  if (canonicalUrl.pathname !== '/') {
    canonicalUrl.pathname = canonicalUrl.pathname.replace(/\/+$/, '');
  }

  return canonicalUrl.toString();
}

export default function SEOHead({
  title,
  description,
  canonical,
  noindex = false,
  ogTitle,
  ogDescription,
  ogImage = SEO_CONFIG.defaultOgImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  twitterTitle,
  twitterDescription,
  twitterImage = ogImage,
  keywords,
  robots,
  author = 'energievergleich.shop',
}: SEOHeadProps) {
  const locationContext = useContext(UNSAFE_LocationContext);
  const currentPath =
    canonical ??
    locationContext?.location.pathname ??
    (typeof window !== 'undefined' ? window.location.pathname : '/');

  useEffect(() => {
    const canonicalUrl = buildCanonicalUrl(currentPath);
    const resolvedRobots = noindex ? 'noindex, nofollow' : robots ?? DEFAULT_ROBOTS;
    const resolvedOgTitle = ogTitle ?? title;
    const resolvedOgDescription = ogDescription ?? description;
    const resolvedTwitterTitle = twitterTitle ?? resolvedOgTitle;
    const resolvedTwitterDescription = twitterDescription ?? resolvedOgDescription;

    document.title = title;

    upsertMeta('meta[name="description"]', {
      name: 'description',
      content: description,
    });
    upsertMeta('meta[name="robots"]', {
      name: 'robots',
      content: resolvedRobots,
    });
    upsertMeta('meta[name="author"]', {
      name: 'author',
      content: author,
    });

    if (keywords) {
      upsertMeta('meta[name="keywords"]', {
        name: 'keywords',
        content: keywords,
      });
    } else {
      document.head.querySelector('meta[name="keywords"]')?.remove();
    }

    upsertLink('link[rel="canonical"]', {
      rel: 'canonical',
      href: canonicalUrl,
    });

    upsertMeta('meta[property="og:title"]', {
      property: 'og:title',
      content: resolvedOgTitle,
    });
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: resolvedOgDescription,
    });
    upsertMeta('meta[property="og:image"]', {
      property: 'og:image',
      content: ogImage,
    });
    upsertMeta('meta[property="og:url"]', {
      property: 'og:url',
      content: canonicalUrl,
    });
    upsertMeta('meta[property="og:type"]', {
      property: 'og:type',
      content: ogType,
    });
    upsertMeta('meta[property="og:site_name"]', {
      property: 'og:site_name',
      content: SEO_CONFIG.siteName,
    });
    upsertMeta('meta[property="og:locale"]', {
      property: 'og:locale',
      content: 'de_DE',
    });

    upsertMeta('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: twitterCard,
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: 'twitter:title',
      content: resolvedTwitterTitle,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: resolvedTwitterDescription,
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: 'twitter:image',
      content: twitterImage,
    });
  }, [
    author,
    canonical,
    currentPath,
    description,
    keywords,
    noindex,
    ogDescription,
    ogImage,
    ogTitle,
    ogType,
    robots,
    title,
    twitterCard,
    twitterDescription,
    twitterImage,
    twitterTitle,
  ]);

  return null;
}
