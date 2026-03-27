# Page Type Mapping

| Page type | Route pattern | Indexing expectation | Primary SEO requirements | Recovery priority |
| --- | --- | --- | --- | --- |
| Homepage | `/` | Index | Canonical `/`, visible `<main>`, stable hero heading, website and organization signals | P0 |
| Money page | `/stromvergleich-nrw`, `/gasvergleich-nrw`, `/photovoltaik-nrw`, `/gewerbestrom`, `/gewerbegas` | Index | Unique title/description, visible primary CTA, clean canonical, related links, FAQ or breadcrumb support where present | P0 |
| Ratgeber hub | `/ratgeber` | Index | Hub metadata, visible category overview, internal links to categories and money pages | P1 |
| Ratgeber category | `/ratgeber/<category>` | Index | Category metadata, article links, breadcrumb continuity, visible headings | P1 |
| Ratgeber article | `/ratgeber/<category>/<article>` | Index | Unique article metadata, canonical, breadcrumb support, visible article body, related navigation | P1 |
| Legal page | `/impressum`, `/datenschutz`, `/agb`, `/widerruf`, `/kontakt`, `/methodik`, `/sitemap` | Usually index | Accurate metadata, no broken links, no rendering regressions | P1 |
| Thank-you page | `/danke` | Usually noindex | Stable confirmation rendering, noindex if configured, no blocking scripts | P1 |
| Catch-all fallback | unmatched routes via `[...slug]` | Noindex | Safe fallback copy, canonical consistency, noindex/nofollow | P0 |

## Critical Smoke Route Set

- `/`
- `/stromvergleich-nrw`
- `/gasvergleich-nrw`
- `/photovoltaik-nrw`
- `/ratgeber`

## Notes

- If a route is indexable, it must render visible content without waiting for client-only hydration.
- If a route is noindex, it still must render a stable visible fallback.
- Page-type decisions must remain aligned with `robots.txt`, `sitemap.xml`, canonical logic, and browser smoke coverage.
