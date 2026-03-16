import { defineMiddleware } from "astro:middleware";
import { isAllowedHost, isLocalHost, PLZSchema } from "@/lib/security";

const PLZ_QUERY_KEYS = ["plz", "zip", "postcode", "postleitzahl"] as const;
const LHCI_HEAD_PATHS = new Set(["/", "/stromvergleich-nrw", "/gasvergleich-nrw"]);
const SECURITY_HEADERS = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
} as const;

function withSecurityHeaders(response: Response, hostHeader: string | null): Response {
  const headers = new Headers(response.headers);

  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    if (key === "Strict-Transport-Security" && isLocalHost(hostHeader)) {
      continue;
    }

    headers.set(key, value);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export const onRequest = defineMiddleware(async ({ request, url }, next) => {
  const hostHeader = request.headers.get("host");

  if (!isAllowedHost(hostHeader)) {
    return withSecurityHeaders(
      new Response("Unzulaessiger Host-Header.", { status: 400 }),
      hostHeader
    );
  }

  if (request.method === "HEAD" && LHCI_HEAD_PATHS.has(url.pathname)) {
    return withSecurityHeaders(new Response(null, { status: 200 }), hostHeader);
  }

  for (const key of PLZ_QUERY_KEYS) {
    const value = url.searchParams.get(key);

    if (value !== null && !PLZSchema.safeParse(value).success) {
      return withSecurityHeaders(
        new Response("Ungueltige PLZ.", { status: 400 }),
        hostHeader
      );
    }
  }

  const response = await next();
  return withSecurityHeaders(response, hostHeader);
});
