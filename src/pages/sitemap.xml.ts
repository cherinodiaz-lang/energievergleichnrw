/**
 * Dynamische Sitemap Generator
 * Generiert sitemap.xml für besseres SEO
 */

import type { APIRoute } from 'astro';

const SITE_URL = 'https://energievergleichnrw.de';

// Statische Pages
const staticPages = [
  { url: '', priority: '1.0', changefreq: 'daily' },
  { url: '/stromvergleich-nrw', priority: '0.9', changefreq: 'daily' },
  { url: '/gasvergleich-nrw', priority: '0.9', changefreq: 'daily' },
  { url: '/impressum', priority: '0.3', changefreq: 'monthly' },
  { url: '/datenschutz', priority: '0.3', changefreq: 'monthly' },
];

// Städte (werden später dynamisch geladen)
const cities = [
  'koeln',
  'duesseldorf',
  'dortmund',
  'essen',
  'duisburg',
  'bochum',
  'wuppertal',
  'bielefeld',
  'bonn',
  'muenster',
];

function generateSitemap(): string {
  const lastmod = new Date().toISOString();

  const urls = [
    // Statische Pages
    ...staticPages.map(
      (page) => `
  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    ),
    // Stadt-Seiten
    ...cities.map(
      (city) => `
  <url>
    <loc>${SITE_URL}/${city}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    ),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}
</urlset>`;
}

export const GET: APIRoute = () => {
  return new Response(generateSitemap(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
