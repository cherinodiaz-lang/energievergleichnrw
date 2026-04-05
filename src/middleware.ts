import { defineMiddleware } from "astro:middleware";
import {
  getFrameAncestorsDirective,
  isAllowedHost,
  PLZSchema,
} from "@/lib/security";

const PLZ_QUERY_KEYS = ["plz", "zip", "postcode", "postleitzahl"] as const;
const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "Content-Security-Policy": [
    "default-src 'self'",
    // GA4 + Clarity + Verivox loader scripts
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://static.wixstatic.com https://www.clarity.ms https://partner.vxcp.de",
    "style-src 'self' 'unsafe-inline' https://static.wixstatic.com https://fonts.googleapis.com",
    // Clarity tracking pixel + GA4 img beacon
    "img-src 'self' data: https://static.wixstatic.com https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://partner.verivox.de",
    "font-src 'self' https://static.wixstatic.com https://fonts.gstatic.com",
    // GA4 + Clarity + Verivox API connections
    "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://*.wix.com https://*.wixsite.com https://www.clarity.ms https://*.clarity.ms",
    // Verivox iframes (partner.vxcp.de renders the calculator iframe)
    "frame-src https://partner.vxcp.de https://*.verivox.de https://*.verivox.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    getFrameAncestorsDirective(),
  ].join("; "),
} as const;

function withSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);

  // Wix Editor renders the site inside a cross-origin iframe, so a legacy
  // X-Frame-Options policy would block the editor before the page can boot.
  headers.delete("X-Frame-Options");

  for (const [key, value] of Object.entries(SECURITY_HEADERS) as Array<
    [string, string]
  >) {
    headers.set(key, value);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export const onRequest = defineMiddleware(async ({ isPrerendered, url }, next) => {
  // 301 permanent redirect: strip trailing slash (except root "/")
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    const cleanUrl = new URL(url);
    cleanUrl.pathname = url.pathname.replace(/\/+$/, '');
    return withSecurityHeaders(
      new Response(null, {
        status: 301,
        headers: { Location: cleanUrl.toString() },
      })
    );
  }

  if (!isPrerendered && !isAllowedHost(url.hostname)) {
    return withSecurityHeaders(
      new Response("Unzulaessiger Host-Header.", { status: 400 })
    );
  }

  for (const key of PLZ_QUERY_KEYS) {
    const value = url.searchParams.get(key);

    if (value !== null && !PLZSchema.safeParse(value).success) {
      return withSecurityHeaders(
        new Response("Ungueltige PLZ.", { status: 400 })
      );
    }
  }

  const response = await next();
  return withSecurityHeaders(response);
});
