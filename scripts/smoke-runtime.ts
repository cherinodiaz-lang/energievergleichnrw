#!/usr/bin/env node

type SmokeResult = {
  path: string;
  statusOk: boolean;
  noopOk: boolean;
  mainOk: boolean;
  canonicalOk: boolean;
  statusCode: number;
  xAstroNoop: string | null;
};

const DEFAULT_BASE_URL = "https://www.energievergleich.shop";
const REQUIRED_PATHS = ["/", "/stromvergleich-nrw", "/photovoltaik-nrw", "/ratgeber"];

function getArgValue(flag: string): string | undefined {
  const index = process.argv.indexOf(flag);
  if (index === -1) {
    return undefined;
  }
  return process.argv[index + 1];
}

function hasMainTag(html: string): boolean {
  return /<main[\s>]/i.test(html);
}

function hasCanonicalTag(html: string): boolean {
  return /<link\s+rel=["']canonical["']/i.test(html);
}

async function run(): Promise<void> {
  const baseUrl = getArgValue("--base-url") || process.env.SMOKE_BASE_URL || DEFAULT_BASE_URL;
  const results: SmokeResult[] = [];

  for (const path of REQUIRED_PATHS) {
    const url = new URL(path, baseUrl).toString();
    const response = await fetch(url, {
      headers: {
        accept: "text/html",
        "user-agent": "energievergleich-runtime-smoke/1.0",
      },
      redirect: "follow",
    });

    const html = await response.text();
    const xAstroNoop = response.headers.get("x-astro-noop");

    results.push({
      path,
      statusOk: response.status === 200,
      noopOk: xAstroNoop == null || xAstroNoop.trim() === "",
      mainOk: hasMainTag(html),
      canonicalOk: hasCanonicalTag(html),
      statusCode: response.status,
      xAstroNoop,
    });
  }

  let hasFailures = false;
  console.log(`Runtime smoke check base URL: ${baseUrl}`);

  for (const result of results) {
    const rowPassed = result.statusOk && result.noopOk && result.mainOk && result.canonicalOk;
    if (!rowPassed) {
      hasFailures = true;
    }

    console.log(
      `${rowPassed ? "PASS" : "FAIL"} ${result.path} | status=${result.statusCode} | x-astro-noop=${result.xAstroNoop ?? "-"} | <main>=${result.mainOk} | canonical=${result.canonicalOk}`,
    );
  }

  if (hasFailures) {
    process.exit(1);
  }
}

run().catch((error) => {
  console.error("FAIL: Runtime smoke check failed:", error);
  process.exit(1);
});
