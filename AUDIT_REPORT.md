# Audit-Bericht - energievergleich.shop
Datum: 2026-03-15

## 0. Environment Check

| Prüfung | Ergebnis | Status |
| --- | --- | --- |
| Node.js >= 22 | v25.8.1 | ✓ |
| npm >= 10 | 11.11.0 | ✓ |
| Git clean | Arbeitsbaum nicht vollständig clean während der Bearbeitung | ✗ |
| Branch | `audit/seo-performance-20260315` | ✓ |
| package-lock sync | `npm ci --dry-run` zuvor erfolgreich | ✓ |
| Astro Version | 5.18.0 | ✗ gegen Astro-6-Zielbild |

Bewertung:
- Die lokale Umgebung ist für das aktuelle Projekt lauffähig.
- Das Repository entspricht technisch nicht dem vorgegebenen Astro-6-Zielzustand, sondern einem produktiven Astro-5-/Wix-Stack.

## 1. Astro Build-Konfiguration

Aktueller Ist-Zustand in [astro.config.mjs](/Users/joelcherinodiaz/Downloads/energievergleichnrw-clean/astro.config.mjs):

- `output: "server"` statt `hybrid`
- Adapter: `@wix/cloud-provider-fetch-adapter`
- Integrationen: `@astrojs/tailwind`, `@wix/astro`, `@wix/monitoring-astro`, `@astrojs/react`
- `site` ist nicht gesetzt
- `security.checkOrigin: false`
- `image.domains` enthält nur `static.wixstatic.com`

Bewertung:

| Kriterium | Status | Hinweis |
| --- | --- | --- |
| site URL korrekt | ✗ | keine zentrale `site`-Property gesetzt |
| output: hybrid | ✗ | aktueller Modus ist `server` |
| adapter node | ✗ | Wix-Cloud-Adapter statt `@astrojs/node` |
| CSP aktiv | ✗ | experimentelle CSP nicht aktiviert |

Fazit:
- Kein automatischer Umbau auf `hybrid` oder Node-Adapter durchgeführt, weil das ein Breaking-Risiko für den Wix-Produktionspfad wäre.
- Build-Stabilität hatte Vorrang.

## 2. Wix Headless

Erkanntes Modell:
- Wix-managed Entwicklungs- und Build-Pfad über `wix dev`, `wix build`, `wix preview`, `wix release`
- Integration über `@wix/astro` und `@wix/cloud-provider-fetch-adapter`

Sicherheits- und Architekturstatus:

| Kriterium | Status | Hinweis |
| --- | --- | --- |
| Auth-Pfad dokumentiert | ✓ | Wix-managed statt manuell implementiert |
| Client-ID server-only verifiziert | ? | kein belastbarer lokaler Beleg für `WIX_CLIENT_ID`-Nutzung gefunden |
| Token-Refresh geprüft | ? | keine klare lokale OAuth-Implementierung im Repository |
| API-Caching | △ | `robots.txt` und `sitemap.xml` cachen, Tarif-API-Pfad nicht eindeutig vorhanden |
| SDK-Typen | △ | `@wix/data` installiert, aber mehrere `any`-Typen im Code |

Beobachtungen:
- Kein direkter Leak von `PUBLIC_WIX_CLIENT_ID` im Quellbestand gefunden.
- Keine klare serverseitige Tarif-API-Route wie `/api/tarife` identifiziert.
- Deshalb war eine End-to-End-Verifikation von Cache-Headern für Tarifdaten lokal nicht möglich.

## 3. Repository-Architektur

Verzeichnisstruktur:
- `src/pages`: Astro-Routen, API-Endpunkte, SEO-kritische SSR-Seiten
- `src/components/pages`: React-Seitenkomponenten
- `src/layouts`: gemeinsame Astro-Layouts
- `src/lib`: SEO- und Inhaltskonfiguration
- `src/services`: Formular- und Tracking-Logik
- `src/components/ui`: UI-Bausteine
- `src/components/__tests__`: Vitest-Komponententests

Routing-Map:
- Indexierbare Kernseiten sind jetzt echte Astro-Seiten unter `src/pages/*.astro`
- Ratgeber-Hubs und Artikel laufen über Astro-Routen unter `src/pages/ratgeber/**`
- `src/pages/[...slug].astro` fängt nur Restpfade ab und blockiert unbekannte URLs mit 404

Islands / Hydration:
- Viele Seiten binden `AstroRouterProvider` mit `client:load`
- Im alten Catch-all existiert weiterhin `client:only="react"` für Restpfade
- Dadurch ist die Haupt-SEO-Fläche server-rendered, aber nicht die gesamte Anwendung

Architektur-Risiken:
- Doppeltes Rendering-/SEO-Modell: Astro SSR plus bestehende React-Head-Mutationen
- Zentrale Router-Datei in React bleibt groß und wartungsintensiv
- Einige Inhalte und Schemas werden weiterhin clientseitig ergänzt

## 4. SEO-Ergebnisse

Bereits umgesetzt:
- SEO-kritische Seiten wurden von client-only auf servergerenderte Astro-Seiten umgestellt
- `lang="de"` ist für die kritischen Seiten gesetzt
- Catch-all erzeugt keine Soft-404s mehr für beliebige unbekannte URLs
- `SEOHead.test.tsx` und `seo-schema.test.tsx` prüfen Canonical-, Meta- und Schema-Grundlogik

Abdeckung öffentlicher Seiten:

| Bereich | Status | Hinweis |
| --- | --- | --- |
| Title SSR | ✓ | auf den migrierten Astro-Seiten vorhanden |
| Description SSR | ✓ | auf den migrierten Astro-Seiten vorhanden |
| Canonical SSR | ✓ | über `SeoPageLayout.astro` |
| Robots Meta | ✓ | Standard `index, follow` serverseitig |
| Viewport | ✓ | im SSR-Layout gesetzt |

JSON-LD / strukturierte Daten:

| Schema | Status | Hinweis |
| --- | --- | --- |
| Organization | ✓ | vorhanden |
| BreadcrumbList | ✓ | vorhanden |
| WebSite mit SearchAction | ✓ | vorhanden |
| FAQPage | △ | vorhanden, aber nicht durchgängig SSR-zentralisiert |
| LocalBusiness | △ | vorhanden, aber weiter React-getrieben |
| Product/Offer | ✗ | nicht als flächendeckendes SSR-Schema belegt |

YMYL / E-E-A-T:

| Kriterium | Status | Hinweis |
| --- | --- | --- |
| Impressum erreichbar | ✓ | vorhanden |
| Datenschutz erreichbar | ✓ | vorhanden |
| Autor-/Redaktionshinweis | △ | nur teilweise in Content-Komponenten |
| Letzte Aktualisierung | △ | in Ratgeberdaten vorhanden, nicht konsequent überall sichtbar |
| Quellenangaben Tarifpreise | ✗ | nicht konsistent belegt |

Offene SEO-Probleme:
- [src/lib/seo-config.ts](/Users/joelcherinodiaz/Downloads/energievergleichnrw-clean/src/lib/seo-config.ts) nutzt teils `www.energievergleich.shop`, obwohl das Zielbild `https://energievergleich.shop` ohne `www` fordert.
- Mehrere Meta-Titel enthalten starre Jahres- und Monatsangaben wie "Februar 2026".
- Kontakt- und Adressdaten wirken teilweise platzhalterartig und sollten fachlich verifiziert werden.
- `robots.txt` referenziert aktuell `https://www.energievergleich.shop/sitemap.xml`.
- Sitemap enthält nicht alle legalen und Utility-Seiten, die inzwischen als Astro-Seiten existieren.

## 5. Performance-Ergebnisse

Positiv:
- Der kritischste SEO-Blocker wurde beseitigt: indexierbare Hauptseiten sind nicht mehr komplett client-only.
- Server-Rendering verbessert Initial-HTML und Crawl-Barkeit.

Risiken:
- Viele Seiten hydratisieren den Router per `client:load`, obwohl nur Teilinteraktion nötig wäre.
- Große Client-Bundles bleiben wahrscheinlich bestehen, weil große React-Seiten weiter eingebunden werden.
- Externe Fonts kommen aus Wix-/Parastorage-URLs; Self-Hosting ist nicht umgesetzt.
- `astro:assets` wird nicht flächendeckend als Standard für Bilder erzwungen.

Bewertung:

| Bereich | Status | Hinweis |
| --- | --- | --- |
| LCP-Risiko reduziert | ✓ | durch SSR der Hauptseiten |
| CLS/INP systematisch gemessen | ✗ | keine lokalen CWV-Messläufe im Repository |
| Islands-Strategie optimal | ✗ | `client:load` dominiert |
| Bildpipeline modernisiert | ✗ | kein flächendeckender Wechsel auf `astro:assets` |
| Font-Optimierung | △ | `font-display: swap` teils vorhanden, aber keine Self-Hosting-Strategie |

## 6. Security-Ergebnisse

Kritische Befunde:
- [astro.config.mjs](/Users/joelcherinodiaz/Downloads/energievergleichnrw-clean/astro.config.mjs) setzt `security.checkOrigin: false`
- `server.allowedHosts: true` ist sehr permissiv
- Kein belastbarer Nachweis für explizite Host-Whitelist gegen Host-Header-Missbrauch

Weitere Punkte:
- `.env`-Dateien wurden in diesem Lauf nicht im Output gefunden, eine `.gitignore`-Verifikation ist im Bericht nicht nachgewiesen
- Für PLZ-/Input-Härtung gibt es Zod im Projekt, aber keine flächendeckend belegte serverseitige Validierung des Suchpfads
- `npm audit --audit-level=critical` wurde erfolgreich ausgeführt

Bewertung:

| Kriterium | Status | Hinweis |
| --- | --- | --- |
| CVE-2026-25545 adressiert | ✗ | SSRF-Risiko über `@astrojs/cloudflare` ist laut Audit noch in der Abhängigkeitskette vorhanden |
| Security Headers zentral | ✗ | nicht zentral konfiguriert belegt |
| Input-Sanitization vollständig | △ | partiell, nicht vollständig auditierbar |
| npm audit kritisch = 0 | ✓ | 0 kritische Findings, aber 4 hohe und 11 mittlere |

`npm audit` Ergebnis:
- 0 kritische Schwachstellen
- 4 hohe Schwachstellen
- 11 mittlere Schwachstellen
- Betroffen sind vor allem `@astrojs/cloudflare`, `@wix/cloud-provider-fetch-adapter`, `undici`, `esbuild`, `devalue` und transitive Tooling-Abhängigkeiten
- Für einen Teil gibt es nur Fixes mit möglichem Breaking Change; für `undici` wurde lokal kein Fix angeboten

## 7. Code-Qualität

Status:
- `astro check` läuft aktuell ohne Fehler
- Vitest läuft aktuell ohne Fehler
- Es existieren weiterhin mehrere `any`-Typen in Formular-, Tracking- und Blog-Code
- SEO-Logik ist noch teilweise aufgeteilt zwischen serverseitigem Layout und clientseitigen React-Komponenten

Bewertung:

| Kriterium | Status | Hinweis |
| --- | --- | --- |
| TypeScript strict funktionsfähig | ✓ | Check grün |
| `any` eliminiert | ✗ | mehrere Vorkommen im Codebestand |
| SEO-Typen zentralisiert | △ | teilweise vorhanden, nicht vollständig |
| Dead Code bereinigt | ✗ | zahlreiche historische Markdown-Berichte und Altpfade im Repo |

## 8. Test-Ergebnisse

Verifiziert am 2026-03-15:
- `npm run test` -> PASS
- `npm run build` -> SUCCESS
- `npx astro check` -> 0 Fehler, 0 Warnungen
- `npm audit --audit-level=critical` -> 0 kritische, 4 hohe, 11 mittlere

Hinweise:
- Der Build meldet weiterhin nicht-blockierende Warnungen aus der Wix-/CSS-Pipeline.
- `astro check` meldet weiterhin 201 Hints; das sind keine Build-Blocker, aber relevanter technischer Schuldenbestand.

## 9. Nächste empfohlene Schritte

1. `astro.config.mjs` fachlich auf Produktionssicherheit bringen: `site` setzen, Host-/Origin-Prüfung härten, CSP-Konzept sauber einführen.
2. Domain-Entscheidung vereinheitlichen: `energievergleich.shop` ohne `www` oder mit `www`, dann konsequent in Canonical, Sitemap, robots.txt und `seo-config`.
3. Clientseitige SEO-Duplikate entfernen und JSON-LD vollständig serverseitig zentralisieren.
4. Sitemap auf alle tatsächlichen öffentlichen Astro-Seiten erweitern und `/api/`, Danke-/Systempfade explizit ausschließen.
5. Tarif-/PLZ-Suchpfad serverseitig mit Zod absichern und Cache-Strategie dokumentieren.
6. `client:load` auf `client:visible` oder `client:idle` reduzieren, wo keine Above-the-Fold-Interaktion nötig ist.
7. Offene `any`-Typen in `src/services`, `src/lib` und Blog-Komponenten abbauen.
8. Netzwerkgültigen Sicherheitslauf außerhalb der Sandbox ergänzen: `npm audit`, echte HTTP-Header-Prüfung und Production Smoke Test.

## Astro 6 Upgrade - Blocker (Stand: 15.03.2026)

Status: BLOCKIERT - kein Upgrade durchgeführt

Ursache (extern, nicht behebbar):
- `@wix/astro` 2.32.0 unterstützt nur `astro ^5.0.0`
- `@wix/cloud-provider-fetch-adapter` verlangt `@astrojs/cloudflare ~12.5.3`
- Astro 6 benötigt `@astrojs/cloudflare >= 13.x`
- Fehlermeldung: `Missing "./entrypoints/middleware.js" in "@astrojs/cloudflare"`

Aktueller Stand:
- `astro`: 5.18.1 (stabil, Build SUCCESS)
- `@astrojs/cloudflare`: 12.6.13
- Branch `upgrade/astro-6`: zurückgesetzt, kein Merge

Nächste Aktion:
- `npm view @wix/astro` beobachten
- Upgrade erneut starten sobald `@wix/astro >= 3.x` erscheint
- GitHub Issue beim Wix-Repo öffnen:
  `https://github.com/wix/wix-headless-astro/issues`
