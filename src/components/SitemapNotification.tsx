import { useEffect } from 'react';

/**
 * Adds sitemap and robots.txt references to the head
 * These files should be placed in the public folder
 */
export default function SitemapNotification() {
  useEffect(() => {
    // Add sitemap link
    let sitemapLink = document.querySelector('link[rel="sitemap"]');
    if (!sitemapLink) {
      sitemapLink = document.createElement('link');
      sitemapLink.setAttribute('rel', 'sitemap');
      sitemapLink.setAttribute('type', 'application/xml');
      sitemapLink.setAttribute('href', '/sitemap.xml');
      document.head.appendChild(sitemapLink);
    }

    // Log robots.txt location (it should be in public folder)
    if (typeof window !== 'undefined' && window.location.search.includes('debug=1')) {
      console.log('robots.txt should be available at: /robots.txt');
    }
  }, []);

  return null;
}
