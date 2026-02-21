import type { MiddlewareResponse, APIContext } from 'astro';

export const onRequest = async (context: APIContext, next: () => MiddlewareResponse) => {
  const url = new URL(context.request.url);
  const host = url.hostname;
  const targetHost = 'www.energievergleich.shop';
  const protocol = url.protocol;

  // Preserve path and query parameters
  const pathWithQuery = `${url.pathname}${url.search}`;

  // Redirect from .nrw domains (both www and non-www)
  if (host.endsWith('energievergleich.nrw') || host === 'www.energievergleich.nrw') {
    return context.redirect(`${protocol}//${targetHost}${pathWithQuery}`, 301);
  }

  // Redirect from non-www .shop domain
  if (host === 'energievergleich.shop') {
    return context.redirect(`${protocol}//${targetHost}${pathWithQuery}`, 301);
  }

  // If already on the target host, proceed normally
  if (host === targetHost) {
    return next();
  }

  // For any other cases (local development, other domains), proceed without redirect
  return next();
};
