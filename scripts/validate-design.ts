#!/usr/bin/env tsx
/**
 * Design Integrity Validator
 *
 * Verifies that design-critical tokens, font references, and layout
 * imports are intact after any code change. This guard prevents
 * automated agents (Codex, Copilot) from silently breaking the
 * visual design of the site.
 *
 * Run via:  npm run validate:design
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

interface CheckResult {
  name: string;
  passed: boolean;
  message: string;
}

const results: CheckResult[] = [];

function check(name: string, passed: boolean, message: string): void {
  results.push({ name, passed, message });
}

function readFile(relPath: string): string {
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) {
    return "";
  }
  return fs.readFileSync(abs, "utf-8");
}

// ---------------------------------------------------------------------------
// 1. Tailwind config: brand colours and font families
// ---------------------------------------------------------------------------
const tailwindSrc = readFile("src/tailwind.config.mjs");

check(
  "tailwind: primary brand colour (#2C6E49)",
  tailwindSrc.includes("#2C6E49"),
  'primary: "#2C6E49" must be present in src/tailwind.config.mjs'
);

check(
  "tailwind: secondary brand colour (#ebb630ff)",
  tailwindSrc.includes("#ebb630ff"),
  'secondary: "#ebb630ff" must be present in src/tailwind.config.mjs'
);

check(
  "tailwind: heading font family (montserrat)",
  tailwindSrc.includes('"montserrat"') || tailwindSrc.includes("'montserrat'"),
  "fontFamily.heading must reference 'montserrat' in src/tailwind.config.mjs"
);

check(
  "tailwind: paragraph font family (poppins-v2)",
  tailwindSrc.includes('"poppins-v2"') || tailwindSrc.includes("'poppins-v2'"),
  "fontFamily.paragraph must reference 'poppins-v2' in src/tailwind.config.mjs"
);

check(
  "tailwind: background colour (#F5F7F9)",
  tailwindSrc.includes("#F5F7F9"),
  'background: "#F5F7F9" must be present in src/tailwind.config.mjs'
);

check(
  "tailwind: destructive colour (#D32F2F)",
  tailwindSrc.includes("#D32F2F"),
  'destructive: "#D32F2F" must be present in src/tailwind.config.mjs'
);

// ---------------------------------------------------------------------------
// 2. Root tailwind.config.mjs re-exports src config
// ---------------------------------------------------------------------------
const tailwindRoot = readFile("tailwind.config.mjs");

check(
  "tailwind: root config imports from src/tailwind.config.mjs",
  tailwindRoot.includes("src/tailwind.config.mjs"),
  "tailwind.config.mjs must import/export from ./src/tailwind.config.mjs"
);

// ---------------------------------------------------------------------------
// 3. Global CSS: imports fonts.swap.css and Tailwind directives
// ---------------------------------------------------------------------------
const globalCss = readFile("src/styles/global.css");

check(
  "global.css: imports fonts.swap.css",
  globalCss.includes("fonts.swap.css"),
  "src/styles/global.css must @import './fonts.swap.css'"
);

check(
  "global.css: @tailwind base directive",
  globalCss.includes("@tailwind base"),
  "src/styles/global.css must contain '@tailwind base'"
);

check(
  "global.css: @tailwind components directive",
  globalCss.includes("@tailwind components"),
  "src/styles/global.css must contain '@tailwind components'"
);

check(
  "global.css: @tailwind utilities directive",
  globalCss.includes("@tailwind utilities"),
  "src/styles/global.css must contain '@tailwind utilities'"
);

// ---------------------------------------------------------------------------
// 4. fonts.swap.css: contains @font-face for both families
// ---------------------------------------------------------------------------
const fontsCss = readFile("src/styles/fonts.swap.css");

check(
  "fonts.swap.css: exists and is non-empty",
  fontsCss.length > 0,
  "src/styles/fonts.swap.css must exist and be non-empty"
);

check(
  "fonts.swap.css: @font-face for montserrat",
  fontsCss.includes("montserrat"),
  "src/styles/fonts.swap.css must contain @font-face rules for 'montserrat'"
);

check(
  "fonts.swap.css: @font-face for poppins-v2",
  fontsCss.includes("poppins-v2"),
  "src/styles/fonts.swap.css must contain @font-face rules for 'poppins-v2'"
);

check(
  "fonts.swap.css: font-display: swap",
  fontsCss.includes("font-display: swap"),
  "src/styles/fonts.swap.css must use font-display: swap for performance"
);

// ---------------------------------------------------------------------------
// 5. SeoPageLayout.astro: imports global.css and has correct HTML structure
// ---------------------------------------------------------------------------
const layoutSrc = readFile("src/layouts/SeoPageLayout.astro");

check(
  "SeoPageLayout: imports global.css",
  layoutSrc.includes("global.css"),
  'src/layouts/SeoPageLayout.astro must import "@/styles/global.css"'
);

check(
  "SeoPageLayout: html lang=de",
  layoutSrc.includes('lang="de"'),
  'src/layouts/SeoPageLayout.astro must set lang="de" on <html>'
);

check(
  "SeoPageLayout: viewport meta tag",
  layoutSrc.includes("viewport"),
  "src/layouts/SeoPageLayout.astro must have a viewport meta tag"
);

check(
  "SeoPageLayout: canonical link",
  layoutSrc.includes("canonical"),
  "src/layouts/SeoPageLayout.astro must output a canonical <link>"
);

// ---------------------------------------------------------------------------
// 6. astro.config.mjs: site URL is correct
// ---------------------------------------------------------------------------
const astroCfg = readFile("astro.config.mjs");

check(
  "astro.config: site URL (energievergleich.shop)",
  astroCfg.includes("energievergleich.shop"),
  "astro.config.mjs must set site to 'https://www.energievergleich.shop'"
);

check(
  "astro.config: output is static",
  astroCfg.includes('output: "static"') || astroCfg.includes("output: 'static'"),
  "astro.config.mjs must use output: 'static'"
);

check(
  "astro.config: tailwind integration present",
  astroCfg.includes("tailwind"),
  "astro.config.mjs must include the tailwind integration"
);

// ---------------------------------------------------------------------------
// 7. postcss.config.mjs: tailwindcss and autoprefixer plugins
// ---------------------------------------------------------------------------
const postcssCfg = readFile("postcss.config.mjs");

check(
  "postcss.config: tailwindcss plugin",
  postcssCfg.includes("tailwindcss"),
  "postcss.config.mjs must include tailwindcss plugin"
);

check(
  "postcss.config: autoprefixer plugin",
  postcssCfg.includes("autoprefixer"),
  "postcss.config.mjs must include autoprefixer plugin"
);

// ---------------------------------------------------------------------------
// Print results
// ---------------------------------------------------------------------------
let failures = 0;

console.log("\n🎨  Design Integrity Validation\n" + "=".repeat(40));

for (const r of results) {
  const icon = r.passed ? "✅" : "❌";
  console.log(`${icon}  ${r.name}`);
  if (!r.passed) {
    console.log(`    ↳ ${r.message}`);
    failures++;
  }
}

console.log("=".repeat(40));
console.log(
  `\n${results.length - failures}/${results.length} checks passed${failures > 0 ? `, ${failures} FAILED` : "."}\n`
);

if (failures > 0) {
  console.error(
    "❌  Design integrity check FAILED.\n" +
      "   Automated changes must NOT modify design-critical files:\n" +
      "   • src/styles/fonts.swap.css\n" +
      "   • src/styles/global.css\n" +
      "   • src/tailwind.config.mjs / tailwind.config.mjs\n" +
      "   • src/layouts/SeoPageLayout.astro\n" +
      "   • postcss.config.mjs\n" +
      "   • astro.config.mjs (site/output fields)\n"
  );
  process.exit(1);
}

console.log("✅  All design integrity checks passed.\n");
