#!/usr/bin/env node

import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

type BrowserRouteCheck = {
  path: string;
  expectedText: string;
  minBodyTextLength: number;
};

const DEFAULT_BASE_URL = "http://127.0.0.1:4321";
const DEFAULT_TIMEOUT_MS = 30_000;
const LOADER_PATTERNS = [
  /\bloading\b/i,
  /\bwird geladen\b/i,
  /\bgeladen\b/i,
  /\bplease wait\b/i,
  /\bbitte warten\b/i,
  /\binitializing\b/i,
  /\bpreparing\b/i,
];
const ROUTE_CHECKS: BrowserRouteCheck[] = [
  { path: "/", expectedText: "Energie wechseln.", minBodyTextLength: 400 },
  { path: "/stromvergleich-nrw", expectedText: "Stromvergleich für NRW", minBodyTextLength: 250 },
  { path: "/gasvergleich-nrw", expectedText: "Gasvergleich für NRW", minBodyTextLength: 250 },
  { path: "/photovoltaik-nrw", expectedText: "Photovoltaik für NRW", minBodyTextLength: 250 },
  { path: "/ratgeber", expectedText: "Ratgeber & Wissen", minBodyTextLength: 250 },
];

function getArgValue(flag: string): string | undefined {
  const index = process.argv.indexOf(flag);
  if (index === -1) {
    return undefined;
  }

  return process.argv[index + 1];
}

function resolveChromePath(): string {
  const explicitPath = getArgValue("--chrome-path") || process.env.CHROME_PATH;

  if (explicitPath) {
    return explicitPath;
  }

  const knownPaths = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
  ];

  const availablePath = knownPaths.find((candidate) => existsSync(candidate));

  if (availablePath) {
    return availablePath;
  }

  throw new Error(
    "Chrome executable not found. Pass --chrome-path or set CHROME_PATH for the browser smoke check.",
  );
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function getBodyText(html: string): string {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyContent = bodyMatch?.[1] ?? html;

  return decodeHtmlEntities(
    bodyContent
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim(),
  );
}

function isLoaderOnly(bodyText: string, html: string, minBodyTextLength: number): boolean {
  const normalizedText = bodyText.trim().toLowerCase();
  const loaderMarkupPresent = /(progressbar|spinner|skeleton|aria-busy=["']true["'])/i.test(html);
  const shortText = normalizedText.length > 0 && normalizedText.length < Math.min(minBodyTextLength, 200);

  return shortText && (loaderMarkupPresent || LOADER_PATTERNS.some((pattern) => pattern.test(normalizedText)));
}

function dumpDom(chromePath: string, url: string): { html: string; stderr: string } {
  const result = spawnSync(
    chromePath,
    [
      "--headless=new",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--no-sandbox",
      "--allow-insecure-localhost",
      "--run-all-compositor-stages-before-draw",
      "--virtual-time-budget=10000",
      "--dump-dom",
      url,
    ],
    {
      encoding: "utf8",
      timeout: DEFAULT_TIMEOUT_MS,
      maxBuffer: 10 * 1024 * 1024,
    },
  );

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(
      `Chrome exited with status ${result.status} for ${url}.\n${(result.stderr || "").trim()}`.trim(),
    );
  }

  return {
    html: result.stdout || "",
    stderr: result.stderr || "",
  };
}

async function run(): Promise<void> {
  const chromePath = resolveChromePath();
  const baseUrl = getArgValue("--base-url") || process.env.SMOKE_BASE_URL || DEFAULT_BASE_URL;
  let hasFailures = false;

  console.log(`Browser smoke check base URL: ${baseUrl}`);
  console.log(`Browser smoke check chrome path: ${chromePath}`);

  for (const routeCheck of ROUTE_CHECKS) {
    const url = new URL(routeCheck.path, baseUrl).toString();
    const { html, stderr } = dumpDom(chromePath, url);
    const bodyText = getBodyText(html);
    const bodyTextLength = bodyText.length;
    const hasMain = /<main[\s>]/i.test(html);
    const hasExpectedText = bodyText.includes(routeCheck.expectedText);
    const whiteScreen = bodyTextLength === 0;
    const nearlyEmpty = bodyTextLength < routeCheck.minBodyTextLength;
    const loaderOnly = isLoaderOnly(bodyText, html, routeCheck.minBodyTextLength);
    const routePassed = hasMain && hasExpectedText && !whiteScreen && !nearlyEmpty && !loaderOnly;

    if (!routePassed) {
      hasFailures = true;
    }

    console.log(
      `${routePassed ? "PASS" : "FAIL"} ${routeCheck.path} | <main>=${hasMain} | expected="${routeCheck.expectedText}"=${hasExpectedText} | whiteScreen=${whiteScreen} | loaderOnly=${loaderOnly} | nearlyEmpty=${nearlyEmpty} | bodyTextLength=${bodyTextLength}`,
    );

    if (!routePassed) {
      const stderrExcerpt = stderr.trim().slice(0, 400);
      const htmlExcerpt = html.replace(/\s+/g, " ").trim().slice(0, 400);

      if (stderrExcerpt) {
        console.log(`stderr excerpt (${routeCheck.path}): ${stderrExcerpt}`);
      }

      console.log(`html excerpt (${routeCheck.path}): ${htmlExcerpt}`);
    }
  }

  if (hasFailures) {
    process.exit(1);
  }
}

run().catch((error) => {
  console.error("FAIL: Browser smoke check failed:", error);
  process.exit(1);
});
