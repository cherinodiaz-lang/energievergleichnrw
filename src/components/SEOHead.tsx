import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
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
  noindex?: boolean;
  author?: string;
}

// Preferred production origin (used as canonical target when possible)
const PREFERRED_ORIGIN = 'https://www.energievergleich.shop';
const SITE_NAME = 'energievergleich.shop';
const DEFAULT_IMAGE =
  'https://static.wixstatic.com/media/32e7c0_8cede5e338be484bb8dcaad81c053c82~mv2.png?originWidth=1920&originHeight=1024';

const getCanonicalOrigin = () => {
  if (typeof window === 'undefined') return PREFERRED_ORIGIN;

  const origin = window.location.origin;

  // Normalize known production variants to preferred host
  if (origin === 'https://energievergleich.shop' || origin === 'http://energievergleich.shop')
    return PREFERRED_ORIGIN;
  if (origin === 'http://www.energievergleich.shop') return PREFERRED_ORIGIN;

  // For preview/staging environments, keep the current origin to avoid mismatches
  return origin;
};

const toAbsoluteUrl = (origin: string, value: string) => {
  if (!value) return value;
  if (value.startsWith('http://') || value.startsWith('https://')) return value;
  if (value.startsWith('/')) return `${origin}${value}`;
  return `${origin}/${value}`;
};

export default function SEOHead({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  twitterTitle,
  twitterDescription,
  twitterImage = DEFAULT_IMAGE,
  keywords,
  robots = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  noindex = false,
  author = 'energievergleich.nrw',
}: SEOHeadProps) {
  const location = useLocation();

  useEffect(() => {
    const canonicalOrigin = getCanonicalOrigin();

    // PHASE 7: Preload critical fonts for better performance
    const preloadFonts = () => {
      const fonts = [
        {
          href: '//static.parastorage.com/tag-bundler/api/v1/fonts-cache/googlefont/woff2/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2',
          as: 'font',
          type: 'font/woff2',
          crossOrigin: 'anonymous',
        },
        {
          href: '//static.parastorage.com/tag-bundler/api/v1/fonts-cache/googlefont/woff2/s/poppins/v22/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2',
          as: 'font',
          type: 'font/woff2',
          crossOrigin: 'anonymous',
        },
      ];

      fonts.forEach((font) => {
        if (!document.querySelector(`link[href="${font.href}"]`)) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = font.href;
          link.as = font.as;
          link.type = font.type;
          link.crossOrigin = font.crossOrigin;
          document.head.appendChild(link);
        }
      });
    };
    preloadFonts();

    // PHASE 7: DNS Prefetch for external resources (Tarifrechner API)
    const dnsPrefetchDomains = ['https://api.tarifrechner.de', 'https://static.parastorage.com'];

    dnsPrefetchDomains.forEach((domain) => {
      if (!document.querySelector(`link[href="${domain}"]`)) {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = domain;
        document.head.appendChild(link);
      }
    });

    // Set title
    document.title = title;

    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Canonical URL
    const canonicalUrl = canonical
      ? toAbsoluteUrl(canonicalOrigin, canonical)
      : `${canonicalOrigin}${location.pathname}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Set keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // Set robots
    const robotsContent = noindex ? 'noindex, nofollow' : robots;
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', robotsContent);

    // Set author
    let metaAuthor = document.querySelector('meta[name="author"]');
    if (!metaAuthor) {
      metaAuthor = document.createElement('meta');
      metaAuthor.setAttribute('name', 'author');
      document.head.appendChild(metaAuthor);
    }
    metaAuthor.setAttribute('content', author);

    // Set viewport
    let metaViewport = document.querySelector('meta[name="viewport"]');
    if (!metaViewport) {
      metaViewport = document.createElement('meta');
      metaViewport.setAttribute('name', 'viewport');
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
      document.head.appendChild(metaViewport);
    }

    // Set charset
    let metaCharset = document.querySelector('meta[charset]');
    if (!metaCharset) {
      metaCharset = document.createElement('meta');
      metaCharset.setAttribute('charset', 'UTF-8');
      document.head.appendChild(metaCharset);
    }

    // OpenGraph tags
    const absoluteOgImage = toAbsoluteUrl(canonicalOrigin, ogImage);
    const ogTags = [
      { property: 'og:title', content: ogTitle || title },
      { property: 'og:description', content: ogDescription || description },
      { property: 'og:image', content: absoluteOgImage },
      { property: 'og:type', content: ogType },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:site_name', content: SITE_NAME },
    ];

    ogTags.forEach(({ property, content }) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    });

    // Twitter Card tags
    const absoluteTwitterImage = toAbsoluteUrl(canonicalOrigin, twitterImage);
    const twitterTags = [
      { name: 'twitter:card', content: twitterCard },
      { name: 'twitter:title', content: twitterTitle || title },
      { name: 'twitter:description', content: twitterDescription || description },
      { name: 'twitter:image', content: absoluteTwitterImage },
      { name: 'twitter:site', content: '@energievergleich' },
    ];

    twitterTags.forEach(({ name, content }) => {
      let metaTag = document.querySelector(`meta[name="${name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    });

    // Google Site Verification
    let metaGoogleVerification = document.querySelector('meta[name="google-site-verification"]');
    if (!metaGoogleVerification) {
      metaGoogleVerification = document.createElement('meta');
      metaGoogleVerification.setAttribute('name', 'google-site-verification');
      metaGoogleVerification.setAttribute('content', 'DTgXuzzEJV2pPqM4FoF_kIkhnUXVuVgmblskXZzdrpQ');
      document.head.appendChild(metaGoogleVerification);
    }

    // Language
    const htmlLang = document.documentElement.getAttribute('lang');
    if (!htmlLang) {
      document.documentElement.setAttribute('lang', 'de');
    }
  }, [
    title,
    description,
    canonical,
    location.pathname,
    ogTitle,
    ogDescription,
    ogImage,
    ogType,
    twitterCard,
    twitterTitle,
    twitterDescription,
    twitterImage,
    keywords,
    robots,
    noindex,
    author,
  ]);

  return null;
}
