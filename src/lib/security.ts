import { z } from "astro/zod";

export const ALLOWED_HOSTS = [
  "www.energievergleich.shop",
  "energievergleich.shop",
  "localhost",
] as const;
const DEVELOPMENT_HOSTS = ["127.0.0.1", "::1"] as const;
const PRIVATE_DEVELOPMENT_HOST_PATTERNS = [
  /^10(?:\.\d{1,3}){3}$/,
  /^192\.168(?:\.\d{1,3}){2}$/,
  /^172\.(1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2}$/,
] as const;
const WIX_FRAME_ANCESTORS = [
  "'self'",
  "https://*.wix.com",
  "https://*.wixstudio.com",
  "https://*.wixstudio.io",
  "https://*.editorx.com",
  "https://*.wixsite.com",
] as const;
const DEVELOPMENT_FRAME_ANCESTORS = [
  "http://localhost:*",
  "http://127.0.0.1:*",
] as const;

export const PLZSchema = z.string().regex(/^\d{5}$/);

export function normalizeHost(hostHeader: string | null): string | null {
  if (!hostHeader) {
    return null;
  }

  const normalized = hostHeader.trim().toLowerCase();

  if (normalized.startsWith("[")) {
    const closingBracketIndex = normalized.indexOf("]");
    if (closingBracketIndex === -1) {
      return null;
    }

    return normalized.slice(1, closingBracketIndex) || null;
  }

  return normalized.split(":")[0] ?? null;
}

function isDevelopmentHost(host: string): boolean {
  if (
    DEVELOPMENT_HOSTS.includes(host as (typeof DEVELOPMENT_HOSTS)[number])
  ) {
    return true;
  }

  return PRIVATE_DEVELOPMENT_HOST_PATTERNS.some((pattern) =>
    pattern.test(host)
  );
}

type SecurityOptions = {
  allowDevelopmentHosts?: boolean;
  includeDevelopmentFrameAncestors?: boolean;
};

export function isAllowedHost(
  hostHeader: string | null,
  options: SecurityOptions = {}
): boolean {
  const normalizedHost = normalizeHost(hostHeader);

  if (!normalizedHost) {
    return false;
  }

  if (
    ALLOWED_HOSTS.includes(normalizedHost as (typeof ALLOWED_HOSTS)[number])
  ) {
    return true;
  }

  const allowDevelopmentHosts =
    options.allowDevelopmentHosts ?? process.env.NODE_ENV !== "production";

  return allowDevelopmentHosts && isDevelopmentHost(normalizedHost);
}

export function getFrameAncestorsDirective(
  options: SecurityOptions = {}
): string {
  const includeDevelopmentFrameAncestors =
    options.includeDevelopmentFrameAncestors ??
    process.env.NODE_ENV !== "production";

  const sources = [...WIX_FRAME_ANCESTORS] as string[];

  if (includeDevelopmentFrameAncestors) {
    sources.push(...DEVELOPMENT_FRAME_ANCESTORS);
  }

  return `frame-ancestors ${sources.join(" ")}`;
}

export function getSecurityHeaders(
  options: SecurityOptions = {}
): Record<string, string> {
  return {
    "Content-Security-Policy": `${getFrameAncestorsDirective(options)};`,
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Strict-Transport-Security":
      "max-age=31536000; includeSubDomains; preload",
  };
}
