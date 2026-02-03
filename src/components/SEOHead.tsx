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
  author?: string;
}

const SITE_URL = 'https://www.energievergleich.shop';
const SITE_NAME = 'energievergleich.shop';
const DEFAULT_IMAGE = 'https://static.wixstatic.com/media/32e7c0_8cede5e338be484bb8dcaad81c053c82~mv2.png?originWidth=1920&originHeight=1024';

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
  author = 'energievergleich.shop',
}: SEOHeadProps) {
  const location = useLocation();

  useEffect(() => {
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

    // Set canonical URL - ALWAYS with www prefix
    const canonicalUrl = canonical || `${SITE_URL}${location.pathname}`;
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

    // Set robots - ALWAYS index, follow for content pages
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', robots);

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
    const ogTags = [
      { property: 'og:title', content: ogTitle || title },
      { property: 'og:description', content: ogDescription || description },
      { property: 'og:image', content: ogImage },
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
    const twitterTags = [
      { name: 'twitter:card', content: twitterCard },
      { name: 'twitter:title', content: twitterTitle || title },
      { name: 'twitter:description', content: twitterDescription || description },
      { name: 'twitter:image', content: twitterImage },
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
    let htmlLang = document.documentElement.getAttribute('lang');
    if (!htmlLang) {
      document.documentElement.setAttribute('lang', 'de');
    }
  }, [title, description, canonical, location.pathname, ogTitle, ogDescription, ogImage, ogType, twitterCard, twitterTitle, twitterDescription, twitterImage, keywords, robots, author]);

  return null;
}
