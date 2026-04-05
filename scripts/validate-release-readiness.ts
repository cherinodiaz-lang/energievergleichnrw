#!/usr/bin/env node
/**
 * validate-release-readiness.ts
 *
 * Bundles all pre-release checks so they can be run locally and in CI with a
 * single command: `npm run validate:release-readiness`
 *
 * Checks performed (in order):
 *   1. wix.config.json appId is present and non-empty
 *   2. No obvious secrets / placeholder values committed
 *   3. SEO validation (delegates to validate-seo.ts logic inline)
 *   4. Key source files exist (Stromrechner, Lead form)
 *   5. Canonical URL is correct everywhere
 *
 * Exit code 0 = all checks pass
 * Exit code 1 = one or more checks failed
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = process.cwd();
const CANONICAL_DOMAIN = 'https://www.energievergleich.shop';

type CheckResult = {
  name: string;
  passed: boolean;
  message: string;
};

const results: CheckResult[] = [];

function pass(name: string, message = 'OK'): void {
  results.push({ name, passed: true, message });
}

function fail(name: string, message: string): void {
  results.push({ name, passed: false, message });
}

// ─── 1. wix.config.json appId ─────────────────────────────────────────────

async function checkWixConfig(): Promise<void> {
  const configPath = path.join(ROOT, 'wix.config.json');
  try {
    const raw = await fs.readFile(configPath, 'utf-8');
    const config = JSON.parse(raw) as Record<string, unknown>;
    const appId = config['appId'];
    if (typeof appId === 'string' && appId.trim().length > 0) {
      pass('wix.config.json appId', `appId="${appId}"`);
    } else {
      fail('wix.config.json appId', 'appId is missing or empty – Wix build will fail');
    }
  } catch {
    fail('wix.config.json appId', `Cannot read wix.config.json at ${configPath}`);
  }
}

// ─── 2. No obvious secrets / placeholders ─────────────────────────────────

async function checkNoPlaceholders(): Promise<void> {
  const PATTERNS = [
    /YOUR_API_KEY/i,
    /REPLACE_ME/i,
    /TODO.*secret/i,
    /password\s*=\s*["'][^"']{1,20}["']/i,
  ];
  const EXTENSIONS = ['.ts', '.tsx', '.astro', '.mjs', '.json'];
  const EXCLUDE_DIRS = ['node_modules', '.git', 'dist', '.wix'];
  const EXCLUDE_FILES = ['scripts/validate-release-readiness.ts'];

  const findings: string[] = [];

  async function scan(dir: string): Promise<void> {
    let entries: string[];
    try {
      entries = await fs.readdir(dir);
    } catch {
      return;
    }
    for (const entry of entries) {
      if (EXCLUDE_DIRS.includes(entry)) continue;
      const full = path.join(dir, entry);
      let stat;
      try {
        stat = await fs.stat(full);
      } catch {
        continue;
      }
      if (stat.isDirectory()) {
        await scan(full);
      } else if (EXTENSIONS.some((ext) => entry.endsWith(ext))) {
        const rel = path.relative(ROOT, full).split(path.sep).join('/');
        if (EXCLUDE_FILES.includes(rel)) continue;
        const content = await fs.readFile(full, 'utf-8').catch(() => '');
        const lines = content.split('\n');
        lines.forEach((line, i) => {
          if (PATTERNS.some((p) => p.test(line))) {
            findings.push(`${path.relative(ROOT, full)}:${i + 1}`);
          }
        });
      }
    }
  }

  await scan(ROOT);

  if (findings.length === 0) {
    pass('No placeholder / secret patterns', 'Clean');
  } else {
    fail(
      'No placeholder / secret patterns',
      `Found suspicious patterns in: ${findings.slice(0, 5).join(', ')}${findings.length > 5 ? ` (+${findings.length - 5} more)` : ''}`,
    );
  }
}

// ─── 3. SEO validate:seo script ───────────────────────────────────────────

function checkSeoScript(): void {
  try {
    execSync('npm run validate:seo --silent', { stdio: 'pipe', cwd: ROOT });
    pass('validate:seo', 'All SEO checks passed');
  } catch (err) {
    const output =
      err instanceof Error && 'stdout' in err
        ? (err as NodeJS.ErrnoException & { stdout: Buffer }).stdout?.toString().slice(0, 300)
        : String(err).slice(0, 300);
    fail('validate:seo', `SEO validation failed: ${output}`);
  }
}

// ─── 4. Key source files exist ────────────────────────────────────────────

async function checkKeyFiles(): Promise<void> {
  const REQUIRED = [
    'src/components/strom/CalculatorForm.tsx',
    'src/lib/strom-tariff-provider.ts',
    'src/lib/seo-config.ts',
    'astro.config.mjs',
    'wix.config.json',
  ];

  const missing: string[] = [];
  for (const rel of REQUIRED) {
    try {
      await fs.access(path.join(ROOT, rel));
    } catch {
      missing.push(rel);
    }
  }

  if (missing.length === 0) {
    pass('Key source files exist', `All ${REQUIRED.length} required files present`);
  } else {
    fail('Key source files exist', `Missing: ${missing.join(', ')}`);
  }
}

// ─── 5. Canonical URL consistency ─────────────────────────────────────────

async function checkCanonicalUrl(): Promise<void> {
  const seoConfigPath = path.join(ROOT, 'src/lib/seo-config.ts');
  try {
    const content = await fs.readFile(seoConfigPath, 'utf-8');
    // Match the exact canonical URL as a quoted string literal in the source file
    const canonicalPattern = new RegExp(
      `['"\`]${CANONICAL_DOMAIN.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"\`]`,
    );
    if (canonicalPattern.test(content)) {
      pass('Canonical URL in seo-config.ts', CANONICAL_DOMAIN);
    } else {
      fail('Canonical URL in seo-config.ts', `Expected "${CANONICAL_DOMAIN}" not found as a literal in seo-config.ts`);
    }
  } catch {
    fail('Canonical URL in seo-config.ts', 'Cannot read src/lib/seo-config.ts');
  }
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log('🚀 Release-Readiness Validation\n');

  await Promise.all([
    checkWixConfig(),
    checkNoPlaceholders(),
    checkKeyFiles(),
    checkCanonicalUrl(),
  ]);

  // SEO script must run synchronously (spawns a subprocess)
  checkSeoScript();

  const passed = results.filter((r) => r.passed);
  const failed = results.filter((r) => !r.passed);

  console.log('');
  results.forEach((r) => {
    const icon = r.passed ? '✅' : '❌';
    console.log(`${icon} ${r.name}: ${r.message}`);
  });

  console.log(`\n📊 ${passed.length}/${results.length} checks passed`);

  if (failed.length > 0) {
    console.log(`\n❌ ${failed.length} check(s) failed – not ready for release.`);
    process.exit(1);
  }

  console.log('\n✅ All checks passed – ready for release.');
}

main().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err);
  console.error(`\n❌ Unexpected error: ${message}`);
  process.exit(1);
});
