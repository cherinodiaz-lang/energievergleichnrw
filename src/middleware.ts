import { defineMiddleware } from 'astro:middleware';

const PRIMARY_HOST = 'www.energievergleich.shop';

export const onRequest = defineMiddleware((context, next) => {
  const url = context.url;
  const hostname = url.hostname;

  // Redirect any .nrw domain (root or www) to the primary .shop domain
  if (hostname === 'energievergleich.nrw' || hostname === 'www.energievergleich.nrw' || hostname.endsWith('.energievergleich.nrw')) {
    const newUrl = new URL(url);
    newUrl.hostname = PRIMARY_HOST;
    newUrl.protocol = 'https:';
    return context.redirect(newUrl.toString(), 301);
  }

  // Redirect non-www .shop to www
  if (hostname === 'energievergleich.shop') {
    const newUrl = new URL(url);
    newUrl.hostname = PRIMARY_HOST;
    newUrl.protocol = 'https:';
    return context.redirect(newUrl.toString(), 301);
  }

  return next();
});
