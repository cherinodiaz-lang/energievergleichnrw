# SEO Checklist

## Technical Baseline

- Confirm `site` remains `https://www.energievergleich.shop`.
- Keep one canonical tag per indexable page.
- Keep one `og:url` per indexable page.
- Keep `robots.txt` and `sitemap.xml` reachable and aligned.
- Keep Astro telemetry disabled in CI to reduce noise in automation.

## Route-Level Checks

- Homepage: unique title, description, canonical, visible `<main>`.
- Money pages: `/stromvergleich-nrw`, `/gasvergleich-nrw`, `/photovoltaik-nrw`, `/gewerbestrom`, `/gewerbegas`.
- Ratgeber hub and category pages: unique metadata, crawlable links, visible headings.
- Article pages: unique title/description, canonical, breadcrumb support, clean route rendering.
- Legal pages: unique metadata and no broken internal links.
- Catch-all or error pages: noindex and stable fallback rendering.

## Structured Data Checks

- Website schema present on site-level pages.
- Organization schema present where expected.
- Breadcrumb schema stays aligned with visible breadcrumbs.
- FAQ schema must match visible FAQ content.

## Internal Linking Checks

- Critical routes linked from homepage, nav, footer, or related sections.
- No broken internal links in sitemap-seeded routes.
- Category and article pages link back into the hub and related money pages where relevant.

## CI Checks

- `npm run validate:seo`
- browser smoke for critical routes
- Lighthouse SEO assertions

## Release Gate

Do not release if any critical route has:

- missing `<main>`
- white-screen rendering
- loader-only output
- nearly empty body text
- duplicate or conflicting canonical metadata
