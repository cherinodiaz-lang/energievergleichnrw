import type { APIRoute } from 'astro';

const DOMAIN = 'https://www.energievergleich.shop';

// All indexable pages and routes
const pages = [
  // Main pages
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/gewerbestrom', priority: '0.8', changefreq: 'monthly' },
  { url: '/gewerbegas', priority: '0.8', changefreq: 'monthly' },
  { url: '/stromvergleich-nrw', priority: '0.8', changefreq: 'monthly' },
  { url: '/gasvergleich-nrw', priority: '0.8', changefreq: 'monthly' },
  { url: '/photovoltaik-nrw', priority: '0.8', changefreq: 'monthly' },
  { url: '/kontakt', priority: '0.7', changefreq: 'monthly' },
  { url: '/impressum', priority: '0.5', changefreq: 'yearly' },
  { url: '/datenschutz', priority: '0.5', changefreq: 'yearly' },
  
  // Ratgeber main page
  { url: '/ratgeber', priority: '0.9', changefreq: 'monthly' },
  
  // Ratgeber category pages
  { url: '/ratgeber/strom', priority: '0.8', changefreq: 'monthly' },
  { url: '/ratgeber/gas', priority: '0.8', changefreq: 'monthly' },
  { url: '/ratgeber/gewerbe', priority: '0.8', changefreq: 'monthly' },
  { url: '/ratgeber/photovoltaik', priority: '0.8', changefreq: 'monthly' },
  { url: '/ratgeber/wechselwissen', priority: '0.8', changefreq: 'monthly' },
  
  // Strom articles
  { url: '/ratgeber/strom/grundversorgung', priority: '0.7', changefreq: 'monthly' },
  { url: '/ratgeber/strom/stromvergleich-wie-funktioniert', priority: '0.7', changefreq: 'monthly' },
  { url: '/ratgeber/strom/stromanbieter-wechsel-anleitung', priority: '0.7', changefreq: 'monthly' },
  { url: '/ratgeber/strom/strompreise-verstehen', priority: '0.7', changefreq: 'monthly' },
  { url: '/ratgeber/strom/oekostrom-tarife', priority: '0.7', changefreq: 'monthly' },
  { url: '/ratgeber/strom/stromverbrauch-berechnen', priority: '0.7', changefreq: 'monthly' },
  { url: '/ratgeber/strom/preisgarantie-strom-erklaert', priority: '0.7', changefreq: 'monthly' },
  { url: '/ratgeber/strom/nachtspeicherheizung', priority: '0.7', changefreq: 'monthly' },
  
  // Gas articles
  { url: '/ratgeber/gas/gasvergleich-wie-funktioniert', priority: '0.7', changefreq: 'monthly' },
  { url: '/ratgeber/gas/gasanbieter-wechsel-anleitung', priority: '0.7', changefreq: 'monthly' },
  { url: '/ratgeber/gas/gaspreise-verstehen', priority: '0.7', changefreq: 'monthly' },
  { url: '/ratgeber/gas/biogas-tarife-nachhaltig', priority: '0.7', changefreq: 'monthly' },
  { url: '/ratgeber/gas/gasverbrauch-berechnen', priority: '0.7', changefreq: 'monthly' },
  { url: '/ratgeber/gas/preisgarantie-gas-erklaert', priority: '0.7', changefreq: 'monthly' },
  
  // Gewerbe articles
  { url: '/ratgeber/gewerbe/gewerbestrom-sparen', priority: '0.7', changefreq: 'monthly' },
  { url: '/ratgeber/gewerbe/gewerbegas-optimieren', priority: '0.7', changefreq: 'monthly' },
  { url: '/ratgeber/gewerbe/energiemanagement-betrieb', priority: '0.7', changefreq: 'monthly' },
  
  // Photovoltaik articles
  { url: '/ratgeber/photovoltaik/photovoltaik-lohnt-sich', priority: '0.7', changefreq: 'monthly' },
  { url: '/ratgeber/photovoltaik/solaranlage-kosten-planung', priority: '0.7', changefreq: 'monthly' },
  { url: '/ratgeber/photovoltaik/stromspeicher-sinnvoll', priority: '0.7', changefreq: 'monthly' },
  { url: '/ratgeber/photovoltaik/einspeiseverguetung-erklaert', priority: '0.7', changefreq: 'monthly' },
  { url: '/ratgeber/photovoltaik/photovoltaik-foerderung-kfw', priority: '0.7', changefreq: 'monthly' },
  
  // Wechselwissen articles
  { url: '/ratgeber/wechselwissen/anbieterwechsel-anleitung', priority: '0.7', changefreq: 'monthly' },
  { url: '/ratgeber/wechselwissen/kuendigungsfristen-wechselfristen', priority: '0.7', changefreq: 'monthly' },
  { url: '/ratgeber/wechselwissen/sonderkuendigung-preiserhoehung', priority: '0.7', changefreq: 'monthly' },
];

const generateSiteMap = (pages: Array<{ url: string; priority: string; changefreq: string }>) =>
  `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${pages
       .map(({ url, priority, changefreq }) =>
         `
     <url>
       <loc>${DOMAIN}${url}</loc>
       <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
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
