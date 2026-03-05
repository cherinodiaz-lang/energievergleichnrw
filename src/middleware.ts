import { defineMiddleware } from 'astro:middleware';

const PRIMARY_HOST = 'www.energievergleich.shop';
const PRIMARY_PROTOCOL = 'https:';

export const onRequest = defineMiddleware((context, next) => {
  const url = context.url;
  const host = url.hostname;

  const isNrw =
    host === 'energievergleich.nrw' ||
    host === 'www.energievergleich.nrw' ||
    host.endsWith('.energievergleich.nrw');

  const isNonWwwShop = host === 'energievergleich.shop';
  const isPrimaryHost = host === PRIMARY_HOST;

  // 1) Redirect any *.energievergleich.nrw and non-www .shop to primary host (keep path + query)
  if (isNrw || isNonWwwShop) {
    const newUrl = new URL(url);
    newUrl.hostname = PRIMARY_HOST;
    newUrl.protocol = PRIMARY_PROTOCOL;
    return context.redirect(newUrl.toString(), 301);
  }

  // 2) Enforce https on primary host
  if (isPrimaryHost && url.protocol !== PRIMARY_PROTOCOL) {
    const newUrl = new URL(url);
    newUrl.protocol = PRIMARY_PROTOCOL;
    return context.redirect(newUrl.toString(), 301);
  }

  return next();
});
