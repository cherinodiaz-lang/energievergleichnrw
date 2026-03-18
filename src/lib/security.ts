import { z } from "astro/zod";

export const ALLOWED_HOSTS = ["www.energievergleich.shop", "energievergleich.shop", "localhost", "127.0.0.1"] as const;

export const PLZSchema = z.string().regex(/^\d{5}$/);

export function normalizeHost(hostHeader: string | null): string | null {
  if (!hostHeader) {
    return null;
  }

  const normalized = hostHeader.trim().toLowerCase();
  return normalized.split(":")[0] ?? null;
}

export function isAllowedHost(hostHeader: string | null): boolean {
  const normalizedHost = normalizeHost(hostHeader);

  if (!normalizedHost) {
    return false;
  }

  return ALLOWED_HOSTS.includes(normalizedHost as (typeof ALLOWED_HOSTS)[number]);
}

export function isLocalHost(hostHeader: string | null): boolean {
  const normalizedHost = normalizeHost(hostHeader);
  return normalizedHost === "localhost" || normalizedHost === "127.0.0.1";
}
