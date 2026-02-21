import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const url = context.url;
  const host = url.hostname;

  const isNrw = host === "energievergleich.nrw" || host === "www.energievergleich.nrw";
  const isNonWwwShop = host === "energievergleich.shop";
  const isTarget = host === "www.energievergleich.shop";

  if (isNrw || isNonWwwShop) {
    const newUrl = new URL(url);
    newUrl.hostname = "www.energievergleich.shop";
    return context.redirect(newUrl.toString(), 301);
  }

  if (isTarget) return next();
  return next();
});
