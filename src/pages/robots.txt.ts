import type { APIRoute } from 'astro';

const ROBOTS_TXT = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /private
Disallow: /preview
Disallow: /danke
Disallow: /thank-you
Disallow: /checkout
Disallow: /cart
Disallow: /login
Disallow: /account

Sitemap: https://www.energievergleich.shop/sitemap.xml
`;

export const GET: APIRoute = () =>
  new Response(ROBOTS_TXT, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
