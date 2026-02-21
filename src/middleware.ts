import type { APIContext, MiddlewareResponse } from 'astro';

const PRIMARY_HOST = 'www.energievergleich.shop';
const PRIMARY_PROTOCOL = 'https:';

export const onRequest = async (
  context: APIContext,
  next: () => MiddlewareResponse
) => {
  const url = new URL(context.request.url);
  const host = url.hostname;

  // 1) Redirect any *.energievergleich.nrw to primary .shop host
  if (host.endsWith('energievergleich.nrw')) {
    url.hostname = PRIMARY_HOST;
    url.protocol = PRIMARY_PROTOCOL;
    return context.redirect(url.toString(), 301);
  }

  // 2) Redirect non-www .shop to www
  if (host === 'energievergleich.shop') {
    url.hostname = PRIMARY_HOST;
    url.protocol = PRIMARY_PROTOCOL;
    return context.redirect(url.toString(), 301);
  }

  // 3) Enforce https on primary host
  if (host === PRIMARY_HOST && url.protocol !== PRIMARY_PROTOCOL) {
    url.protocol = PRIMARY_PROTOCOL;
    return context.redirect(url.toString(), 301);
  }

  return next();
};
