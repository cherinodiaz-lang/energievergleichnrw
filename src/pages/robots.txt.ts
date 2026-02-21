import type { APIRoute } from 'astro';

const robotsTxt = (origin: string) => `User-agent: *
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
Sitemap: ${origin}/sitemap.xml
`;

export const GET: APIRoute = ({ request }) => {
  const origin = new URL(request.url).origin;

  return new Response(robotsTxt(origin), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
