# Foundation First — Grundkonstrukt-Standard

> **Verbindlicher Standard**: Alle aufgeführten Muss-Kriterien müssen vollständig erfüllt sein,  
> bevor weitere Roadmap-Punkte (neue Features, Design-Iterationen, Wachstumspläne) angegangen werden.  
> Dieses Dokument ersetzt jeden zeitgebundenen Plan (z. B. 7-Tage-Plan) solange das Fundament nicht stabil ist.

---

## 1. Baseline-Definition — Muss-Kriterien

| # | Kriterium | Beschreibung | Nachweis |
|---|-----------|--------------|----------|
| B1 | **Wix-Kompatibilität** | Jede Code-Änderung (Git/Codex) darf die Wix-Headless-Integration nicht brechen. `WIX_CLIENT_ID` muss gesetzt sein; `wix build` muss fehlerfrei durchlaufen. | CI-Build grün; `npm run build` lokal erfolgreich |
| B2 | **Wix Editor nutzbar** | Der Wix Vibe / Copilot-Editor darf keine Endloslade-Schleife zeigen. Design-Änderungen müssen im Editor anwendbar sein. | Screenshot: Editor lädt vollständig; kein Spinner nach 30 s |
| B3 | **Webseite live schaltbar** | `npm run release` muss ohne Fehler abschließen; die Produktions-URL (`https://www.energievergleich.shop`) muss einen HTTP 200 zurückgeben. | Smoke-Test-Log; `curl -I https://www.energievergleich.shop` → 200 |
| B4 | **Stromrechner-Grundflow + Lead-Übergabe** | Der Stromrechner auf der Startseite muss: (a) Tarife berechnen und anzeigen, (b) dem Nutzer klar kommunizieren, dass es sich um Beispielwerte handelt, (c) ein Lead-Formular aufrufen, (d) Kundendaten erfolgreich übermitteln. | Manueller E2E-Test mit Formular-Absende-Log |
| B5 | **SEO-Basis verifiziert** | Canonical-Tag auf jeder Seite korrekt gesetzt, `robots.txt` zugänglich und korrekt, Sitemap unter `/sitemap.xml` vorhanden und valide. | `npm run validate:seo` grün; Lighthouse SEO ≥ 90 |

---

## 2. Go / No-Go Abnahme-Checkliste

Führe diese Checkliste **vor jedem Merge in `main`** und **vor jeder neuen Roadmap-Phase** aus.  
Alle Punkte müssen `✅` zeigen. Ist auch nur ein Punkt `❌`, ist das Deployment **blockiert**.

```
FOUNDATION ABNAHME — Go / No-Go
================================

[ ] B1 — CI-Build grün (letzter Workflow-Run auf main: PASSED)
[ ] B1 — npm run build lokal erfolgreich (kein Build-Fehler, kein TypeScript-Fehler)
[ ] B1 — WIX_CLIENT_ID gesetzt (wix.config.json oder CI-Secret vorhanden)
[ ] B2 — Wix Editor öffnet ohne Endlosschleife (Screenshot als Nachweis)
[ ] B3 — npm run release ohne Fehler abgeschlossen
[ ] B3 — curl -I https://www.energievergleich.shop → HTTP 200
[ ] B3 — Smoke-Test bestanden (npm run smoke:runtime)
[ ] B4 — Stromrechner zeigt Tarifergebnisse nach Eingabe
[ ] B4 — Hinweis "Beispielwerte" sichtbar nach Berechnung
[ ] B4 — Lead-Formular öffnet nach Berechnung
[ ] B4 — Formular-Absende-Log ohne Fehler (Kontaktdaten übergeben)
[ ] B5 — npm run validate:seo: alle Checks grün
[ ] B5 — /robots.txt HTTP 200 + Inhalt korrekt
[ ] B5 — /sitemap.xml HTTP 200 + valide XML
[ ] B5 — Lighthouse SEO Score ≥ 90 (letzter Lighthouse-CI-Run)

ERGEBNIS: [ ] GO   [ ] NO-GO
Datum: ________________  Geprüft von: ________________
```

---

## 3. Runbook „Foundation First"

### 3.1 Prüfreihenfolge

Die Prüfungen sind **in dieser Reihenfolge** auszuführen — jede Stufe muss bestanden sein, bevor die nächste beginnt.

```
Stufe 1 — Build-Integrität
│
├─ 1a. Repository aktuell (git pull / kein Merge-Konflikt)
├─ 1b. npm ci  ──►  kein Fehler
└─ 1c. npm run build  ──►  kein TypeScript-/Build-Fehler

Stufe 2 — Wix-Integration
│
├─ 2a. wix.config.json: appId vorhanden
├─ 2b. WIX_CLIENT_ID in CI-Secret oder .env gesetzt
└─ 2c. wix build (oder npm run release ohne publish)  ──►  kein Fehler

Stufe 3 — Wix Editor
│
├─ 3a. Editor-URL öffnen: https://manage.wix.com/...
├─ 3b. Ladezeit ≤ 30 s, kein Endlosschleife-Symbol
└─ 3c. Testweise ein Element bewegen/speichern  ──►  kein Fehler

Stufe 4 — Live-Schaltung & Smoke-Test
│
├─ 4a. npm run release  ──►  Deployment abgeschlossen
├─ 4b. curl -I https://www.energievergleich.shop  ──►  HTTP 200
└─ 4c. npm run smoke:runtime  ──►  alle Assertions bestanden

Stufe 5 — Stromrechner & Lead-Flow
│
├─ 5a. Startseite öffnen  ──►  Stromrechner-Widget sichtbar
├─ 5b. Verbrauchswert eingeben → Berechnen klicken  ──►  Tarifliste erscheint
├─ 5c. Hinweis "Beispielwerte" / Demo-Hinweis sichtbar
├─ 5d. CTA "Angebot anfordern" / Lead-Formular öffnen
└─ 5e. Testformular absenden  ──►  Bestätigungs-Log / kein 4xx-/5xx-Fehler

Stufe 6 — SEO-Basis
│
├─ 6a. npm run validate:seo  ──►  alle Checks grün
├─ 6b. /robots.txt prüfen  ──►  "Allow: /" vorhanden, kein "Disallow: /"
├─ 6c. /sitemap.xml prüfen  ──►  valides XML, alle Kernseiten enthalten
└─ 6d. Lighthouse SEO ≥ 90 (manuell oder via GitHub Actions Lighthouse-Workflow)
```

### 3.2 Erwartete Artefakte / Nachweise

| Stufe | Artefakt | Format |
|-------|----------|--------|
| 1 | Build-Log (CI-Run-Link) | GitHub Actions URL |
| 2 | `wix.config.json` appId nicht leer | Code-Review / Screenshot |
| 3 | Editor-Screenshot (Editor vollständig geladen) | PNG |
| 4 | `curl`-Output oder Smoke-Test-Log | Text / CI-Log |
| 5 | Formular-Absende-Log (Browser-Konsole oder Server-Log) | Screenshot / Log-Datei |
| 6 | `npm run validate:seo`-Output; Lighthouse-HTML-Report | CI-Log / HTML |

### 3.3 Verantwortlichkeiten

| Rolle | Aufgabe |
|-------|---------|
| **Entwickler / Coding Agent** | Stufen 1, 2, 5, 6 ausführen und Nachweise bereitstellen |
| **Wix-Seitenverantwortlicher** | Stufe 3 (Editor-Test) durchführen und Screenshot liefern |
| **Deployment-Verantwortlicher** | Stufe 4 (Release + Smoke-Test) ausführen und bestätigen |
| **Projektinhaber** | Go/No-Go-Entscheidung auf Basis aller Nachweise treffen |

---

## 4. Issue-Mapping — Foundation-Kriterien ↔ Issues #153–#157

Diese Tabelle zeigt, welches Muss-Kriterium von welchem Issue adressiert wird.

| Baseline-Kriterium | Issues | Beschreibung des Zusammenhangs |
|--------------------|--------|-------------------------------|
| **B1 — Wix-Kompatibilität** | [#153](https://github.com/cherinodiaz-lang/energievergleichnrw/issues/153), [#154](https://github.com/cherinodiaz-lang/energievergleichnrw/issues/154) | #153 (Gesamt-Harmonisierung) koordiniert die übergeordnete Wix+Kodex-Integration. #154 analysiert konkret, ob Codex/Git-Änderungen den Basis-Code der Wix-Site korrumpieren. |
| **B2 — Editor nutzbar** | [#155](https://github.com/cherinodiaz-lang/energievergleichnrw/issues/155) | #155 befasst sich ausschließlich mit dem Wix Vibe KI Editor-Bug (Endlosschleife) — direkte 1:1-Abdeckung. |
| **B3 — Webseite live schaltbar** | [#153](https://github.com/cherinodiaz-lang/energievergleichnrw/issues/153), [#157](https://github.com/cherinodiaz-lang/energievergleichnrw/issues/157) | #153 definiert die nachhaltige Funktionsfähigkeit der Website als übergeordnetes Ziel. #157 (Bereinigung aller Issues/PRs/Workflows) stellt sicher, dass kein blockierender offener PR oder Workflow den Release verhindert. |
| **B4 — Stromrechner + Lead-Übergabe** | [#156](https://github.com/cherinodiaz-lang/energievergleichnrw/issues/156) | #156 deckt den Stromrechner-Flow vollständig ab: Berechnung, Demo-Hinweis, Lead-Generierung und SEO-Optimierung des Rechners. |
| **B5 — SEO-Basis** | [#156](https://github.com/cherinodiaz-lang/energievergleichnrw/issues/156), [#153](https://github.com/cherinodiaz-lang/energievergleichnrw/issues/153) | #156 enthält SEO-Label und adressiert organischen Traffic. #153 definiert die nachhaltige Qualitätssicherung für alle Systemkomponenten inkl. SEO. |

### Vollständiges Mapping

```
Issue #153 — Harmonisierung aller Systeme
  └─ Betrifft: B1 (Wix-Kompatibilität), B3 (Live-Schaltung), B5 (SEO-Basis)
     Typ: Übergeordnetes Tracking-Issue

Issue #154 — Fehleranalyse: Darstellung & Design nach Git-/Codex-Änderungen
  └─ Betrifft: B1 (Wix-Kompatibilität)
     Typ: Bug-Analyse — muss vor jedem Merge abgeschlossen sein

Issue #155 — Wix Vibe KI Editor Ladeschleife
  └─ Betrifft: B2 (Editor nutzbar)
     Typ: Bug-Fix — blockiert alle Design-Änderungen

Issue #156 — Live-Stromrechner: Funktion, Lead & SEO
  └─ Betrifft: B4 (Stromrechner + Lead-Übergabe), B5 (SEO-Basis)
     Typ: Feature-Validierung — muss vor Go-Live bestanden sein

Issue #157 — Bestehende Issues, PRs & Workflows bereinigen
  └─ Betrifft: B3 (Webseite live schaltbar)
     Typ: Hygiene — verhindert blockierende technische Schulden
```

---

## 5. Eskalations- und Wiederherstellungsprotokoll

Wenn ein Muss-Kriterium trotz wiederholter Versuche nicht erfüllt werden kann:

1. **Issue kommentieren** mit genauen Fehlerlogs und dem betroffenen Baseline-Kriterium (B1–B5).
2. **Kein Merge auf `main`** bis das Kriterium erfüllt ist.
3. **Wix-Support kontaktieren** bei B2 (Editor-Problem), da dies außerhalb des Codebases liegt.
4. **Recovery-Workflow auslösen** (`.github/workflows/recovery.yml`) bei kritischem Build-Versagen (B1/B3).

---

*Dieses Dokument ist verbindlich für alle Beiträge zu `cherinodiaz-lang/energievergleichnrw`.*  
*Letzte Aktualisierung: 2026-04-03 — Referenz-Issues: #153, #154, #155, #156, #157*
