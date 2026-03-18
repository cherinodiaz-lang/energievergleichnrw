# energievergleich.shop

Produktionsnahe Astro-/React-Website fuer `https://www.energievergleich.shop` mit Wix-Headless-Integration, Cloudflare-Adapter, technischer SEO, Formular-/Lead-Strecken und CI-Checks fuer Build, SEO und Lighthouse.

## Stack

- Astro 5
- React 18
- TypeScript
- Tailwind CSS
- Wix Headless / `@wix/astro`
- Cloudflare Worker Output
- Vitest
- ESLint
- Lighthouse CI
- Sentry

## Lokale Entwicklung

Voraussetzungen:

- Node.js 22
- npm
- gueltige lokale Umgebungsvariablen in `.env.local`

Wichtige Scripts:

```bash
npm run dev
npm run lint
npm run check
npm run test
npm run validate:seo
npm run audit:stromrechner
npm run build
npm run preview:worker
npm run lhci:collect
npm run lhci:assert
```

## Umgebungsvariablen

Beispielwerte stehen in [.env.example](/Users/joelcherinodiaz/Downloads/energievergleichnrw-clean/.env.example).

Relevante Gruppen:

- Wix: `WIX_CLIENT_ID`, `WIX_ACCOUNT_ID`, `WIX_SITE_ID`
- Public SEO/Analytics: `PUBLIC_GA4_MEASUREMENT_ID`, `PUBLIC_GOOGLE_SITE_VERIFICATION`, `PUBLIC_SENTRY_DSN`
- Tarifrechner: `STROM_TARIFF_API_BASE_URL`, `STROM_TARIFF_API_KEY`, `STROM_TARIFF_API_PATH`, `STROM_TARIFF_API_AUTH_HEADER`
- Sentry: `PUBLIC_SENTRY_DSN`, `SENTRY_DSN`, `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT_FRONTEND`, `SENTRY_PROJECT_SERVER`

Hinweis:
Ohne `SENTRY_AUTH_TOKEN` bleibt der Build erfolgreich, erstellt aber lokal keine Releases und laedt keine Sourcemaps hoch.

Ohne `STROM_TARIFF_API_BASE_URL` bleibt der Stromrechner technisch funktionsfaehig und liefert transparente Kosten- und Vergleichsszenarien auf Basis der Nutzereingaben statt erfundener Anbieterangebote.

## QA-Gate

Der erwartete Minimalstandard vor einem Merge ist:

```bash
npm run lint
npm run check
npm run test
npm run validate:seo
npm run audit:stromrechner
npm run build
```

CI:

- PR Validation: Lint, SEO-Validation, Tests, Production Build
- Lighthouse CI: Build + Wrangler Preview + LHCI Collect/Assert/Upload

Lokale Lighthouse-Reihenfolge:

```bash
npm run build
npm run preview:worker
npm run audit:stromrechner
npm run lhci:collect
npm run lhci:assert

## Stromtarifrechner

Die oeffentliche Route [src/pages/stromvergleich-nrw.astro](/Users/joelcherinodiaz/Downloads/energievergleichnrw-clean/src/pages/stromvergleich-nrw.astro) nutzt den React-Rechner in [src/components/pages/StromvergleichNrwPage.tsx](/Users/joelcherinodiaz/Downloads/energievergleichnrw-clean/src/components/pages/StromvergleichNrwPage.tsx) und den serverseitigen Endpoint [src/pages/api/stromtarife.ts](/Users/joelcherinodiaz/Downloads/energievergleichnrw-clean/src/pages/api/stromtarife.ts).

Live-Tarifquelle:

- `STROM_TARIFF_API_BASE_URL` auf den echten Provider setzen
- optional `STROM_TARIFF_API_KEY` und `STROM_TARIFF_API_AUTH_HEADER` setzen
- optional `STROM_TARIFF_API_PATH` anpassen, Standard ist `/rates`

Der Endpoint sendet `POST` JSON in diesem Format an die externe Quelle:

```json
{
  "energyType": "electricity",
  "postcode": "40210",
  "annualConsumption": 3500,
  "householdSize": 3,
  "ecoOnly": true,
  "bonusOnly": false
}
```

Ohne diese Konfiguration zeigt die UI keine Platzhalter-Ergebnisse, sondern berechnet ehrliche Stromkosten-Szenarien mit offengelegter Modellbasis aus Verbrauch, Haushaltsgroesse und Filtereinstellungen.
```

## Projektstruktur

```text
src/pages/                  Astro-Routen
src/components/             React- und Astro-Komponenten
src/components/pages/       aktive React-Seitenlogik
src/components/ui/          UI-Layer auf Radix-Basis
src/layouts/                Astro-Layouts
src/lib/                    Routing, SEO, Security, Utility-Code
src/services/               Formular- und Tracking-Services
integrations/               Wix CMS / Members / Error Handling
scripts/                    projektinterne Validierungs-Skripte
.github/workflows/          CI-Workflows
```

## Architekturhinweise

- Die indexierbaren Hauptseiten werden ueber Astro-Routen ausgeliefert.
- Der React-Router bedient nur die verbleibenden clientseitigen Pfade wie Blog-Details und Danke-Seite.
- SEO-Metadaten, Canonicals und strukturierte Daten laufen zentral ueber [src/layouts/SeoPageLayout.astro](/Users/joelcherinodiaz/Downloads/energievergleichnrw-clean/src/layouts/SeoPageLayout.astro) und [src/components/SEOHead.tsx](/Users/joelcherinodiaz/Downloads/energievergleichnrw-clean/src/components/SEOHead.tsx).
- Sicherheitspruefungen fuer Host-Header und PLZ-Query-Parameter liegen in [src/middleware.ts](/Users/joelcherinodiaz/Downloads/energievergleichnrw-clean/src/middleware.ts).

## Deployment

Der Production-Build erzeugt einen Cloudflare-kompatiblen Server-Output ueber den Wix Cloud Provider Fetch Adapter. [wrangler.jsonc](/Users/joelcherinodiaz/Downloads/energievergleichnrw-clean/wrangler.jsonc) bildet dafuer den repo-seitig belastbaren lokalen Preview-Stand mit `ASSETS`-Binding, `nodejs_compat` und fixer `compatibility_date` ab.

Wenn du den Worker mit echten Cloudflare-Bindings deployen oder lokal mit Session-KV testen willst, erweitere [wrangler.jsonc](/Users/joelcherinodiaz/Downloads/energievergleichnrw-clean/wrangler.jsonc) nach der Vorlage in [wrangler.jsonc.example](/Users/joelcherinodiaz/Downloads/energievergleichnrw-clean/wrangler.jsonc.example) um die realen `kv_namespaces` fuer `SESSION`.
