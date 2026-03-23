// @vitest-environment node

import { JSDOM } from "jsdom";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { ensurePreviewBuild, startPreviewWorker } from "@/test-utils/preview-worker";

const SITE_ORIGIN = "https://www.energievergleich.shop";
const REQUIRED_ROUTES = ["/", "/stromvergleich-nrw", "/robots.txt"] as const;
const HTML_CONTENT_TYPE = "text/html";
const TEXT_CONTENT_TYPE = "text/plain";
const SKIPPED_PROTOCOLS = ["mailto:", "tel:", "javascript:"];
const ASSET_EXTENSIONS = [
  ".css",
  ".js",
  ".mjs",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".avif",
  ".svg",
  ".ico",
  ".xml",
  ".json",
  ".pdf",
  ".zip",
  ".txt",
  ".woff",
  ".woff2",
] as const;

type CheckedRoute = {
  path: string;
  status: number;
  contentType: string;
};

type BrokenRoute = CheckedRoute & {
  reason: string;
};

function isIgnoredHref(href: string): boolean {
  return (
    href.length === 0 ||
    href.startsWith("#") ||
    SKIPPED_PROTOCOLS.some((protocol) => href.startsWith(protocol))
  );
}

function isPageRoute(pathname: string): boolean {
  return !ASSET_EXTENSIONS.some((extension) => pathname.toLowerCase().endsWith(extension));
}

function normalizePagePath(href: string, baseUrl: string): string | null {
  if (isIgnoredHref(href)) {
    return null;
  }

  const url = new URL(href, `${baseUrl}/`);
  const previewOrigin = new URL(baseUrl).origin;

  if (url.origin !== previewOrigin && url.origin !== SITE_ORIGIN) {
    return null;
  }

  if (!isPageRoute(url.pathname)) {
    return null;
  }

  if (url.pathname !== "/") {
    url.pathname = url.pathname.replace(/\/+$/, "");
  }

  url.hash = "";
  url.search = "";

  return url.pathname || "/";
}

async function fetchRoute(baseUrl: string, route: string): Promise<{ response: Response; body: string }> {
  const targetUrl = new URL(route, baseUrl);
  let lastError: unknown;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(targetUrl, {
        headers: {
          "user-agent": "Vitest Link Integrity Runner",
        },
      });

      const body = await response.text();
      return { response, body };
    } catch (error) {
      lastError = error;
      if (attempt < 3) {
        await new Promise((resolve) => setTimeout(resolve, 250 * attempt));
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}

async function fetchSitemapRoutes(baseUrl: string): Promise<string[]> {
  const { response, body } = await fetchRoute(baseUrl, "/sitemap.xml");

  if (!response.ok) {
    throw new Error(`Sitemap request failed with status ${response.status}.`);
  }

  const matches = Array.from(body.matchAll(/<loc>([^<]+)<\/loc>/gi));

  return matches
    .map((match) => normalizePagePath(match[1] ?? "", baseUrl))
    .filter((value): value is string => Boolean(value));
}

describe.sequential("site link integrity", () => {
  const cwd = path.resolve(process.cwd());
  let baseUrl = "";
  let stopPreview: (() => Promise<void>) | null = null;

  beforeAll(async () => {
    ensurePreviewBuild(cwd);
    const preview = await startPreviewWorker(cwd);
    baseUrl = preview.baseUrl;
    stopPreview = preview.stop;
  }, 120_000);

  afterAll(async () => {
    await stopPreview?.();
  });

  it("serves required routes and keeps stromvergleich metadata unique", async () => {
    const root = await fetchRoute(baseUrl, "/");
    const stromvergleich = await fetchRoute(baseUrl, "/stromvergleich-nrw");
    const robots = await fetchRoute(baseUrl, "/robots.txt");

    expect(root.response.status).toBe(200);
    expect(root.response.headers.get("content-type")).toContain(HTML_CONTENT_TYPE);

    expect(stromvergleich.response.status).toBe(200);
    expect(stromvergleich.response.headers.get("content-type")).toContain(HTML_CONTENT_TYPE);

    expect(robots.response.status).toBe(200);
    expect(robots.response.headers.get("content-type")).toContain(TEXT_CONTENT_TYPE);

    const document = new JSDOM(stromvergleich.body).window.document;
    const canonicalLinks = document.querySelectorAll('link[rel="canonical"]');
    const ogUrlMetas = document.querySelectorAll('meta[property="og:url"]');

    expect(canonicalLinks).toHaveLength(1);
    expect(ogUrlMetas).toHaveLength(1);
    expect(canonicalLinks[0]?.getAttribute("href")).toBe(`${SITE_ORIGIN}/stromvergleich-nrw`);
    expect(ogUrlMetas[0]?.getAttribute("content")).toBe(`${SITE_ORIGIN}/stromvergleich-nrw`);
  }, 30_000);

  it("crawls internal pages recursively without broken routes", async () => {
    const queue = ["/"];
    const visited = new Set<string>();
    const checkedRoutes = new Map<string, CheckedRoute>();
    const brokenRoutes: BrokenRoute[] = [];
    let checkedInternalLinks = 0;
    let sitemapRoutes = 0;

    for (const route of REQUIRED_ROUTES) {
      if (!queue.includes(route)) {
        queue.push(route);
      }
    }

    for (const route of await fetchSitemapRoutes(baseUrl)) {
      sitemapRoutes += 1;
      if (!queue.includes(route)) {
        queue.push(route);
      }
    }

    while (queue.length > 0) {
      const currentRoute = queue.shift();

      if (!currentRoute || visited.has(currentRoute)) {
        continue;
      }

      visited.add(currentRoute);

      const { response, body } = await fetchRoute(baseUrl, currentRoute);
      const contentType = response.headers.get("content-type") ?? "";

      checkedRoutes.set(currentRoute, {
        path: currentRoute,
        status: response.status,
        contentType,
      });

      if (response.status >= 400) {
        brokenRoutes.push({
          path: currentRoute,
          status: response.status,
          contentType,
          reason: "route returned error status",
        });
        continue;
      }

      const expectsHtml = currentRoute !== "/robots.txt";
      const expectedContentType = expectsHtml ? HTML_CONTENT_TYPE : TEXT_CONTENT_TYPE;

      if (!contentType.includes(expectedContentType)) {
        brokenRoutes.push({
          path: currentRoute,
          status: response.status,
          contentType,
          reason: `unexpected content-type, expected ${expectedContentType}`,
        });
      }

      if (!expectsHtml) {
        continue;
      }

      const document = new JSDOM(body).window.document;
      const links = Array.from(
        document.querySelectorAll("a[href]"),
        (link) => link as HTMLAnchorElement
      );

      for (const link of links) {
        const href = link.getAttribute("href") ?? "";
        const normalizedPath = normalizePagePath(href, baseUrl);

        if (!normalizedPath) {
          continue;
        }

        checkedInternalLinks += 1;

        if (!checkedRoutes.has(normalizedPath) && !visited.has(normalizedPath) && !queue.includes(normalizedPath)) {
          queue.push(normalizedPath);
        }
      }
    }

    const summary = {
      crawledPages: visited.size,
      checkedInternalLinks,
      brokenRoutes,
      checkedRoutes: Array.from(checkedRoutes.values()).sort((left, right) => left.path.localeCompare(right.path)),
    };

    console.log(
      `Link integrity summary: ${summary.crawledPages} pages crawled, ${summary.checkedInternalLinks} internal links checked, ${sitemapRoutes} sitemap routes seeded.`
    );

    if (summary.brokenRoutes.length > 0) {
      console.log(`Broken routes:\n${summary.brokenRoutes.map((entry) => JSON.stringify(entry)).join("\n")}`);
    }

    expect(summary.crawledPages).toBeGreaterThanOrEqual(REQUIRED_ROUTES.length);
    expect(sitemapRoutes).toBeGreaterThan(0);
    expect(summary.brokenRoutes).toEqual([]);
  }, 120_000);
});
