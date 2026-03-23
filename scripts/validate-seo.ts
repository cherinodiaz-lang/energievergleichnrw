#!/usr/bin/env node

import { promises as fs } from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const EXPECTED_BASE_URL = 'https://www.energievergleich.shop';
const EXPECTED_SITEMAP_URL = `${EXPECTED_BASE_URL}/sitemap.xml`;
const INVALID_DOMAIN_PATTERNS = ['energievergleich.nrw', 'energiegleichen.com'];

type FileData = {
  relativePath: string;
  absolutePath: string;
  content: string;
  lines: string[];
};

type Finding = {
  file: string;
  line: number;
  message: string;
};

type CheckResult = {
  name: string;
  findings: Finding[];
};

function toProjectPath(filePath: string): string {
  return path.relative(PROJECT_ROOT, filePath).split(path.sep).join('/');
}

async function readFile(relativePath: string): Promise<FileData> {
  const absolutePath = path.join(PROJECT_ROOT, relativePath);
  const content = await fs.readFile(absolutePath, 'utf8');

  return {
    relativePath,
    absolutePath,
    content,
    lines: content.split(/\r?\n/),
  };
}

async function walk(directory: string): Promise<string[]> {
  const absoluteDirectory = path.join(PROJECT_ROOT, directory);
  const entries = await fs.readdir(absoluteDirectory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(absoluteDirectory, entry.name);
      if (entry.isDirectory()) {
        return walk(toProjectPath(entryPath));
      }

      return [toProjectPath(entryPath)];
    }),
  );

  return files.flat();
}

function getLineNumber(lines: string[], matcher: string | RegExp): number {
  if (typeof matcher === 'string') {
    const index = lines.findIndex((line) => line.includes(matcher));
    return index === -1 ? 1 : index + 1;
  }

  const index = lines.findIndex((line) => {
    matcher.lastIndex = 0;
    return matcher.test(line);
  });
  return index === -1 ? 1 : index + 1;
}

function createFinding(
  file: FileData,
  matcher: string | RegExp,
  message: string,
): Finding {
  return {
    file: file.relativePath,
    line: getLineNumber(file.lines, matcher),
    message,
  };
}

function findInvalidDomainLines(
  file: FileData,
  shouldInspect: (line: string) => boolean = () => true,
): Finding[] {
  const findings: Finding[] = [];

  file.lines.forEach((line, index) => {
    if (!shouldInspect(line)) {
      return;
    }

    const invalidDomain = INVALID_DOMAIN_PATTERNS.find((pattern) => line.includes(pattern));
    if (!invalidDomain) {
      return;
    }

    findings.push({
      file: file.relativePath,
      line: index + 1,
      message: `Unerwartete Domain-Referenz gefunden: "${invalidDomain}"`,
    });
  });

  return findings;
}

function printCheckResult(result: CheckResult): number {
  if (result.findings.length === 0) {
    console.log(`✅ ${result.name}`);
    return 0;
  }

  console.log(`❌ ${result.name}`);
  result.findings.forEach((finding) => {
    console.log(`   ${finding.file}:${finding.line} ${finding.message}`);
  });
  return result.findings.length;
}

async function validateWebsiteSchema(): Promise<CheckResult> {
  const seoSsr = await readFile('src/lib/seo-ssr.ts');
  const seoConfig = await readFile('src/lib/seo-config.ts');
  const findings: Finding[] = [];

  if (!seoSsr.content.includes("id: 'website-schema'")) {
    findings.push(
      createFinding(
        seoSsr,
        /website-schema/,
        'Serverseitiges WebSite-Schema muss in seo-ssr.ts definiert sein.',
      ),
    );
  }

  if (!seoSsr.content.includes('urlTemplate: `${SEO_CONFIG.siteUrl}/?q={search_term_string}`')) {
    findings.push(
      createFinding(
        seoSsr,
        /urlTemplate/,
        'Das serverseitige WebSite-Schema muss die SearchAction auf SEO_CONFIG.siteUrl aufbauen.',
      ),
    );
  }

  if (!seoConfig.content.includes("siteUrl: 'https://www.energievergleich.shop'")) {
    findings.push(
      createFinding(
        seoConfig,
        /siteUrl:/,
        `SEO_CONFIG.siteUrl muss exakt "${EXPECTED_BASE_URL}" sein.`,
      ),
    );
  }

  if (!seoConfig.content.includes("url: 'https://www.energievergleich.shop'")) {
    findings.push(
      createFinding(
        seoConfig,
        /url:/,
        'SEO_CONFIG.organization.url muss auf die .shop-Domain zeigen.',
      ),
    );
  }

  findings.push(...findInvalidDomainLines(seoSsr));
  findings.push(
    ...findInvalidDomainLines(
      seoConfig,
      (line) => /siteName|siteUrl|legalName|name:|url:/.test(line),
    ),
  );

  return {
    name: 'WebsiteSchema Domain-Prüfung',
    findings,
  };
}

async function validateSitemap(): Promise<CheckResult> {
  const sitemap = await readFile('src/pages/sitemap.xml.ts');
  const findings: Finding[] = [];

  if (!sitemap.content.includes("const DOMAIN = 'https://www.energievergleich.shop';")) {
    findings.push(
      createFinding(
        sitemap,
        /const DOMAIN/,
        `Sitemap-Domain muss exakt "${EXPECTED_BASE_URL}" sein.`,
      ),
    );
  }

  if (!sitemap.content.includes('<loc>${DOMAIN}${url}</loc>')) {
    findings.push(
      createFinding(
        sitemap,
        /<loc>/,
        'Sitemap muss alle <loc>-Einträge aus dem zentralen DOMAIN-Wert erzeugen.',
      ),
    );
  }

  findings.push(...findInvalidDomainLines(sitemap));

  return {
    name: 'Sitemap Domain-Prüfung',
    findings,
  };
}

async function validateCanonicals(): Promise<CheckResult> {
  const astroPage = await readFile('src/pages/[...slug].astro');
  const seoSsr = await readFile('src/lib/seo-ssr.ts');
  const findings: Finding[] = [];

  if (!astroPage.content.includes('<link rel="canonical" href={seo.canonicalUrl} />')) {
    findings.push(
      createFinding(
        astroPage,
        /canonical/,
        'Canonical-Link muss serverseitig im Astro-Head auf seo.canonicalUrl gesetzt werden.',
      ),
    );
  }

  if (!seoSsr.content.includes('const canonicalUrl = toAbsoluteUrl(normalizedPath);')) {
    findings.push(
      createFinding(
        seoSsr,
        /canonicalUrl/,
        'Canonical-URL muss serverseitig aus dem normalisierten Pfad erzeugt werden.',
      ),
    );
  }

  findings.push(...findInvalidDomainLines(astroPage, (line) => /canonical/i.test(line)));
  findings.push(...findInvalidDomainLines(seoSsr, (line) => /canonicalUrl|siteUrl|toAbsoluteUrl/i.test(line)));

  return {
    name: 'Canonical-Prüfung',
    findings,
  };
}

async function validateRobots(): Promise<CheckResult> {
  const robots = await readFile('src/pages/robots.txt.ts');
  const findings: Finding[] = [];

  if (!robots.content.includes(`Sitemap: ${EXPECTED_SITEMAP_URL}`)) {
    findings.push(
      createFinding(
        robots,
        /Sitemap:/,
        `robots.txt muss auf "${EXPECTED_SITEMAP_URL}" verweisen.`,
      ),
    );
  }

  findings.push(...findInvalidDomainLines(robots));

  return {
    name: 'robots.txt Sitemap-Prüfung',
    findings,
  };
}

async function validateOgUrls(): Promise<CheckResult> {
  const astroPage = await readFile('src/pages/[...slug].astro');
  const seoSsr = await readFile('src/lib/seo-ssr.ts');
  const findings: Finding[] = [];

  if (!astroPage.content.includes('<meta property="og:url" content={seo.ogUrl} />')) {
    findings.push(
      createFinding(
        astroPage,
        /og:url/,
        'og:url muss serverseitig im Astro-Head gesetzt werden.',
      ),
    );
  }

  if (!seoSsr.content.includes('ogUrl: canonicalUrl')) {
    findings.push(
      createFinding(
        seoSsr,
        /ogUrl:/,
        'og:url muss auf dieselbe serverseitige Canonical-URL zeigen.',
      ),
    );
  }

  findings.push(...findInvalidDomainLines(astroPage, (line) => /og:url|og:site_name/i.test(line)));
  findings.push(...findInvalidDomainLines(seoSsr, (line) => /ogUrl|canonicalUrl/i.test(line)));

  const sourceFiles = await walk('src');
  const metaFiles = sourceFiles.filter((file) => /\.(astro|ts|tsx|js|jsx)$/.test(file));

  for (const relativePath of metaFiles) {
    const file = await readFile(relativePath);
    file.lines.forEach((line, index) => {
      if (!/og:url/.test(line)) {
        return;
      }

      const matches = line.match(/https?:\/\/[^"'`\s<>)]+/g) ?? [];
      matches.forEach((url) => {
        if (!url.startsWith(EXPECTED_BASE_URL)) {
          findings.push({
            file: file.relativePath,
            line: index + 1,
            message: `og:url verweist auf unerwartete URL "${url}".`,
          });
        }
      });
    });
  }

  return {
    name: 'og:url Domain-Prüfung',
    findings,
  };
}

async function main(): Promise<void> {
  const checks = await Promise.all([
    validateWebsiteSchema(),
    validateSitemap(),
    validateCanonicals(),
    validateRobots(),
    validateOgUrls(),
  ]);

  let errorCount = 0;
  checks.forEach((check) => {
    errorCount += printCheckResult(check);
  });

  const passedChecks = checks.filter((check) => check.findings.length === 0).length;
  const failedChecks = checks.length - passedChecks;

  console.log('📊 Summary Report');
  console.log(`   Checks: ${checks.length}`);
  console.log(`   Bestanden: ${passedChecks}`);
  console.log(`   Fehlgeschlagen: ${failedChecks}`);
  console.log(`   Fehler: ${errorCount}`);

  if (errorCount > 0) {
    process.exitCode = 1;
    return;
  }

  console.log('✅ SEO-Validierung erfolgreich abgeschlossen.');
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error('❌ SEO-Validierung konnte nicht ausgeführt werden.');
  console.error(`   ${message}`);
  process.exit(1);
});
