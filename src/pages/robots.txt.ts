import type { APIRoute } from 'astro';

const robotsTxt = `User-agent: *
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
Disallow: *.pdf$

# Sitemap location
Sitemap: https://www.energievergleich.shop/sitemap.xml
`;

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
