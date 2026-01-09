import type { APIRoute } from 'astro';
import { ratgeberArticles } from '@/lib/ratgeber-map';

const DOMAIN = 'https://energievergleich.nrw';

// All indexable pages and routes
const pages = [
  // Main pages
  { url: '/', priority: '1.0', changefreq: 'weekly', lastmod: new Date().toISOString().split('T')[0] },
  { url: '/gewerbestrom', priority: '0.8', changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
  { url: '/gewerbegas', priority: '0.8', changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
  { url: '/stromvergleich-nrw', priority: '0.8', changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
  { url: '/gasvergleich-nrw', priority: '0.8', changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
  { url: '/photovoltaik-nrw', priority: '0.8', changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
  { url: '/kontakt', priority: '0.7', changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
  { url: '/impressum', priority: '0.5', changefreq: 'yearly', lastmod: new Date().toISOString().split('T')[0] },
  { url: '/datenschutz', priority: '0.5', changefreq: 'yearly', lastmod: new Date().toISOString().split('T')[0] },
  
  // Ratgeber main page
  { url: '/ratgeber', priority: '0.9', changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
  
  // Ratgeber category pages
  { url: '/ratgeber/strom', priority: '0.8', changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
  { url: '/ratgeber/gas', priority: '0.8', changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
  { url: '/ratgeber/gewerbe', priority: '0.8', changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
  { url: '/ratgeber/photovoltaik', priority: '0.8', changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
  { url: '/ratgeber/wechselwissen', priority: '0.8', changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
  
  // Dynamically add all articles from ratgeber-map
  ...ratgeberArticles.map(article => ({
    url: `/${article.slug}`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: article.lastUpdated
  }))
];

const generateSiteMap = (pages: Array<{ url: string; priority: string; changefreq: string; lastmod: string }>) =>
  `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${pages
       .map(({ url, priority, changefreq, lastmod }) =>
         `
     <url>
       <loc>${DOMAIN}${url}</loc>
       <lastmod>${lastmod}</lastmod>
       <changefreq>${changefreq}</changefreq>
       <priority>${priority}</priority>
     </url>
   `
       )
       .join('')}
   </urlset>
 `.trim();

export const GET: APIRoute = () => {
  return new Response(generateSiteMap(pages), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
