# SEO Implementation Guide (energievergleich.shop)

Ziel: Technische SEO-Basics stabil halten, damit Inhalte zuverlässig indexiert werden und keine vermeidbaren Crawl-/Redirect-Probleme entstehen.

## A) Domains & Redirects
- Primärdomain: https://www.energievergleich.shop
- 301: non-www → www
- 301: *.energievergleich.nrw → www.energievergleich.shop

## B) robots.txt
- `/robots.txt` erreichbar
- Wichtige Disallows (z. B. /admin, /private, /preview, /thank-you)
- Sitemap-Zeile: `Sitemap: https://www.energievergleich.shop/sitemap.xml`

## C) sitemap.xml
- `/sitemap.xml` als Endpoint oder statisch (nur **eine** Quelle, keine Duplikate)
- Enthält alle indexierbaren Seiten + Ratgeber-Artikel
- Korrekte Canonical-Domain (www)

## D) Canonicals
- Pro Seite genau 1 canonical
- Canonical immer auf die www-Version

## E) On-Page Basics
- Pro Seite: 1 eindeutiger Title + Description
- Saubere Überschriftenstruktur (H1 einmal)
- Interne Links zwischen Themenclustern (Ratgeber ↔ Vergleichsseiten)

## F) Monitoring
- Google Search Console (Sitemaps, Abdeckung, Verbesserungen)
- 404/Redirect-Ketten regelmäßig prüfen
