import type { APIRoute } from 'astro';
import { ratgeberArticles } from '@/lib/ratgeber-map';
import { CITIES_NRW } from '@/lib/cities-nrw';

/**
 * Sitemap Generator for Energievergleich.shop
 * Generates a complete XML sitemap with all static pages, dynamic ratgeber articles, and legal pages
 * Updated: 2026-01-13
 */

const DOMAIN = 'https://www.energievergleich.shop';

// Helper function to get today's date in ISO format (YYYY-MM-DD)
const todayISO = () => new Date().toISOString().slice(0, 10);

// Static lastmod date for all static URLs (YYYY-MM-DD)
const LASTMOD_STATIC = todayISO();

// All indexable pages and routes
const pages = [
  // ===== MAIN PAGES (Priority: 1.0 - 0.7) =====
  {
    url: '/',
    priority: '1.0',
    changefreq: 'weekly',
    lastmod: LASTMOD_STATIC
  },

  // ===== COMPARISON PAGES (Priority: 0.8) =====
  {
    url: '/stromvergleich-nrw',
    priority: '0.8',
    changefreq: 'weekly',
    lastmod: LASTMOD_STATIC
  },
  {
    url: '/gasvergleich-nrw',
    priority: '0.8',
    changefreq: 'weekly',
    lastmod: LASTMOD_STATIC
  },
  {
    url: '/photovoltaik-nrw',
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: LASTMOD_STATIC
  },

  // ===== BUSINESS PAGES (Priority: 0.8) =====
  {
    url: '/gewerbestrom',
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: LASTMOD_STATIC
  },
  {
    url: '/gewerbegas',
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: LASTMOD_STATIC
  },

  // ===== UTILITY PAGES (Priority: 0.7) =====
  {
    url: '/kontakt',
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: LASTMOD_STATIC
  },
  {
    url: '/methodik',
    priority: '0.6',
    changefreq: 'yearly',
    lastmod: LASTMOD_STATIC
  },
  {
    url: '/faq',
    priority: '0.6',
    changefreq: 'monthly',
    lastmod: LASTMOD_STATIC
  },
  {
    url: '/agb',
    priority: '0.5',
    changefreq: 'yearly',
    lastmod: LASTMOD_STATIC
  },
  {
    url: '/widerruf',
    priority: '0.5',
    changefreq: 'yearly',
    lastmod: LASTMOD_STATIC
  },
  {
    url: '/sitemap',
    priority: '0.4',
    changefreq: 'monthly',
    lastmod: LASTMOD_STATIC
  },

  // ===== RATGEBER HUB (Priority: 0.9) =====
  {
    url: '/ratgeber',
    priority: '0.9',
    changefreq: 'monthly',
    lastmod: LASTMOD_STATIC
  },

  // ===== RATGEBER CATEGORY PAGES (Priority: 0.8) =====
  {
    url: '/ratgeber/strom',
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: LASTMOD_STATIC
  },
  {
    url: '/ratgeber/gas',
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: LASTMOD_STATIC
  },
  {
    url: '/ratgeber/gewerbe',
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: LASTMOD_STATIC
  },
  {
    url: '/ratgeber/photovoltaik',
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: LASTMOD_STATIC
  },
  {
    url: '/ratgeber/wechselwissen',
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: LASTMOD_STATIC
  },

  // ===== DYNAMIC RATGEBER ARTICLES (Priority: 0.7) =====
  // Automatically generated from ratgeber-map.ts
  ...ratgeberArticles.map(article => ({
    url: `/${article.slug}`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: article.lastUpdated?.slice(0, 10) ?? todayISO()
  })),

  // ===== CITY LANDING PAGES (Priority: 0.8) =====
  // Automatically generated from cities-nrw.ts
  ...CITIES_NRW.map(city => ({
    url: `/${city.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: LASTMOD_STATIC
  })),

  // ===== LEGAL PAGES (Priority: 0.5) =====
  {
    url: '/impressum',
    priority: '0.5',
    changefreq: 'yearly',
    lastmod: LASTMOD_STATIC
  },
  {
    url: '/datenschutz',
    priority: '0.5',
    changefreq: 'yearly',
    lastmod: LASTMOD_STATIC
  }
];

/**
 * Generate XML sitemap from pages array
 * Ensures proper XML formatting and valid structure
 */
const generateSiteMap = (
  pages: Array<{ url: string; priority: string; changefreq: string; lastmod: string }>
): string => {
  const urlEntries = pages
    .map(
      ({ url, priority, changefreq, lastmod }) => `  <url>
    <loc>${DOMAIN}${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
};

/**
 * Astro API Route for sitemap.xml
 * Returns properly formatted XML with correct headers
 */
export const GET: APIRoute = () => {
  const sitemapXml = generateSiteMap(pages);

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
