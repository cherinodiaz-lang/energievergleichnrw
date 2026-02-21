import type { APIRoute } from 'astro';

const CANONICAL_ORIGIN = 'https://www.energievergleich.shop';

const robotsTxt = () => `User-agent: *
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
Sitemap: ${CANONICAL_ORIGIN}/sitemap.xml
`;

export const GET: APIRoute = () => {
  return new Response(robotsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
