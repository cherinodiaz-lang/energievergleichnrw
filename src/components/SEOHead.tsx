import { useEffect } from "react";
import { useLocation } from "react-router-dom";

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

const SITE_URL = "https://www.energievergleich.shop";
const SITE_NAME = "energievergleich.shop";

const DEFAULT_IMAGE =
  "https://static.wixstatic.com/media/32e7c0_8cede5e338be484bb8dcaad81c053c82~mv2.png";

function getCanonicalUrl(canonical: string | undefined, pathname: string): string {
  const input = canonical ?? pathname;
  const parsed = new URL(input, SITE_URL);
  const normalizedPath = parsed.pathname === "/" ? "/" : parsed.pathname.replace(/\/+$/, "");
  return `${SITE_URL}${normalizedPath}`;
}

export default function SEOHead({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_IMAGE,
  ogType = "website",
  twitterCard = "summary_large_image",
  twitterTitle,
  twitterDescription,
  twitterImage = DEFAULT_IMAGE,
  keywords,
  robots = "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  author = "energievergleich.shop",
}: SEOHeadProps) {
  const location = useLocation();

  const canonicalUrl = getCanonicalUrl(canonical, location.pathname);

  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("name", name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    const setProperty = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("property", property);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    const setLink = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // Basic SEO
    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    setMeta("robots", robots);
    setMeta("author", author);

    // Canonical
    setLink("canonical", canonicalUrl);

    // Open Graph
    setProperty("og:title", ogTitle || title);
    setProperty("og:description", ogDescription || description);
    setProperty("og:image", ogImage);
    setProperty("og:url", canonicalUrl);
    setProperty("og:type", ogType);
    setProperty("og:site_name", SITE_NAME);

    // Twitter
    setMeta("twitter:card", twitterCard);
    setMeta("twitter:title", twitterTitle || title);
    setMeta("twitter:description", twitterDescription || description);
    setMeta("twitter:image", twitterImage);
  }, [
    title,
    description,
    canonical,
    ogTitle,
    ogDescription,
    ogImage,
    twitterTitle,
    twitterDescription,
    twitterImage,
    keywords,
    robots,
    author,
    location.pathname,
  ]);

  return null;
}
