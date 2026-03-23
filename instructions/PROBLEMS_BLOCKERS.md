# Problems and Blockers (Verified)

Last verified: 2026-03-24 (Europe/Berlin)

Verification commands:
- `npm run check`
- `npm run test:run`
- `npm run build`

Observed command status:
- `npm run check`: failed
- `npm run test:run`: failed
- `npm run build`: passed (with warnings)

## P0 Blockers (must fix first)

1. Type-check is red (`astro check` reports 35 errors).
- Error-heavy files:
  - `src/components/pages/__tests__/StromvergleichNrwPage.test.tsx` (13)
  - `src/components/__tests__/SEOHead.test.tsx` (12)
  - `src/components/strom/CalculatorForm.tsx` (6)
  - `src/components/__tests__/seo-schema.test.tsx` (4)

2. SEO/schema component contract is broken by placeholder implementations.
- These files currently return `null` only:
  - `src/components/SEOHead.tsx`
  - `src/components/OrganizationSchema.tsx`
  - `src/components/WebsiteSchema.tsx`
  - `src/components/BreadcrumbSchema.tsx`
  - `src/components/LocalBusinessSchema.tsx`
  - `src/components/FAQPageSchema.tsx`
  - `src/components/HowToSchema.tsx`
  - `src/components/ReviewSchema.tsx`
  - `src/components/SearchConsoleVerification.tsx`
- Impact:
  - Existing tests fail.
  - Components keep API shape but provide no runtime behavior.

3. Missing named export expected by tests.
- Test imports `StromTarifCalculator` from:
  - `src/components/pages/__tests__/StromvergleichNrwPage.test.tsx`
- Source file only exports default page:
  - `src/components/pages/StromvergleichNrwPage.tsx`
- Impact: invalid React element in tests (component is `undefined`).

4. `CalculatorForm` uses outdated field names against `StromTariffResult`.
- File: `src/components/strom/CalculatorForm.tsx`
- Invalid properties used:
  - `provider` vs expected `providerName`
  - `name` vs expected `tariffName`
  - `monthlyPrice` vs expected `monthlyCost`
  - `annualPrice` vs expected `annualCost`
  - `baseFee` vs expected `basePriceMonthly`
  - `workPrice` vs expected `workPriceCt`

5. Host allowlist expectation mismatch.
- Implementation allows `www.energievergleich.shop`:
  - `src/lib/security.ts`
- Test expects it to be blocked:
  - `src/lib/__tests__/security.test.ts`
- Impact: security test is red and policy intent is unclear.

## P1 Problems (important, not immediate release blocker if isolated)

1. SSR homepage test drift.
- Test expects old hero copy (`"Energie wechseln."`):
  - `src/__tests__/ssr/homepage-ssr.test.tsx`
- Current SSR HTML no longer contains that exact string.

2. Architecture duplication risk in routing/article mapping.
- Ratgeber slugs are defined in multiple places:
  - `src/lib/ratgeber-map.ts`
  - `src/components/Router.tsx`
  - `src/pages/ratgeber/[category]/[article].astro`
- Current data is mostly aligned, but maintenance cost and drift risk are high.

3. Tooling/type hygiene issues.
- Many deprecated type hints (`React.ElementRef`, `React.FormEvent`) and unused imports.
- These currently appear as hints, but increase noise and regression risk.

## Performance Findings (from production build artifacts)

Largest client assets observed:
- `dist/_astro/seo-config.*.js` ~228 KB
- `dist/_astro/index.*.js` ~132 KB
- `dist/_astro/proxy.*.js` ~120 KB
- `dist/_astro/agb.*.css` ~128 KB
- `dist/_astro/entry.*.css` ~108 KB

Implication:
- Initial client payload is heavier than necessary.
- Candidate areas: SEO payload partitioning, page-level lazy boundaries, CSS scope pruning.

## Build Warnings to Track

1. Cloudflare session binding warning.
- Build mentions required `SESSION` KV binding for production runtime.

2. Vite externalization warnings for Node built-ins from Wix packages.
- Build succeeds, but warnings should be monitored for runtime compatibility.

## Fix Order (recommended)

1. Restore test/runtime contract for SEO + schema components.
2. Reintroduce or replace `StromTarifCalculator` export used by tests.
3. Fix `CalculatorForm` field mapping to `StromTariffResult`.
4. Resolve host allowlist policy mismatch (code vs test) explicitly.
5. Update outdated SSR assertions.
6. Start bundle-size reduction pass (high-impact chunks first).
