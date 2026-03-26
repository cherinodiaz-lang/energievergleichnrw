import { defineMiddleware } from "astro:middleware";
import { isAllowedHost, PLZSchema } from "@/lib/security";

const PLZ_QUERY_KEYS = ["plz", "zip", "postcode", "postleitzahl"] as const;
const SECURITY_HEADERS = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
} as const;

function withSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);

  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(key, value);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export const onRequest = defineMiddleware(async ({ isPrerendered, url }, next) => {
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
