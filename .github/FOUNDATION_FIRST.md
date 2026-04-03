# Foundation First – Grundkonstrukt-Dokument

> **Letzte Aktualisierung:** 2026-04-03  
> **Status:** ✅ Grundkonstrukt weitgehend erfüllt – Restlücken dokumentiert  
> **Bezug:** Issues #153, #154, #155, #156, #157

---

## Abschlusszusammenfassung

### ✅ Final abgeschlossen

| Bereich | Nachweis |
|---------|----------|
| Website live erreichbar | https://www.energievergleich.shop |
| Strom-Tarifrechner (live, Verivox-Embed) | `src/components/strom/` – Verivox-Integration aktiv |
| SEO-Basis: Canonicals, Sitemap, robots.txt | `src/lib/seo-config.ts`, `public/robots.txt`, `public/sitemap.xml` |
| CI/CD-Pipeline funktionsfähig | `.github/workflows/ci.yml` – Build + Tests grün |
| Agent/Copilot-Instruktionen vorhanden | `.github/copilot-instructions.md`, `agent.md` |
| Wix-Headless Integration (Client ID) | `wix.config.json`, `wix-local-env.mjs` |

### ⚠️ Offene Restlücken

| Bereich | Grund | Zuständiges Issue |
|---------|-------|-------------------|
| Wix Vibe Editor Ladeschleife | Externes Wix-Plattformproblem – nicht durch Code in diesem Repo lösbar | #155 |
| Gas-/Kombi-Rechner zeigt Beispielwerte | Verivox-Embed nur für Strom; Gas/Kombi benötigt separates Embed oder eigene API | #156 |
| Lead-Formular Validierung im Prod-Flow | Smoke-Tests prüfen Rendering, aber kein E2E-Lead-Test vorhanden | #156 |

### Entscheidung

> **✅ GRUNDKONSTRUKT ERFÜLLT**
>
> Das technische Fundament ist stabil: Website live, Strom-Rechner funktional, CI/CD grün, SEO-Basis konfiguriert, Wix-Integration aktiv. Die verbleibenden Lücken (Wix Editor, Gas-Embed, Lead-E2E) sind entweder externe Plattformprobleme oder geplante Ausbauschritte – sie blockieren das Grundkonstrukt nicht.

---

## 1. Baseline-Definition (Muss-Kriterien)

| ID | Kriterium | Prüfmethode | Status |
|----|-----------|-------------|--------|
| B1 | Wix-Kompatibilität: Code-Änderungen dürfen keine Darstellungsbrüche auf der Wix-gehosteten Seite verursachen | Smoke-Test in CI (`npm run test`), visuelle Prüfung nach Merge | ✅ |
| B2 | Editor nutzbar: Wix Vibe KI Editor muss nach Deploys bedienbar sein | Manuelle Prüfung nach jedem Release auf https://manage.wix.com | ⚠️ Externes Problem |
| B3 | Website live schaltbar: `npm run build` erfolgreich + Wix Release auslösbar | CI Build-Job grün; `wix release` ausführbar | ✅ |
| B4 | Stromrechner + Lead-Übergabe: Ergebnisanzeige korrekt, CTA sichtbar, Lead-Daten übergeben | Manuelle E2E-Prüfung des Rechner-Flows | ✅ Strom / ⚠️ Gas+Kombi |
| B5 | SEO-Basis verifiziert: Canonical-Tags gesetzt, robots.txt korrekt, Sitemap vollständig | `npm run validate:seo` + Lighthouse SEO-Score ≥ 90 | ✅ |

---

## 2. Verbindliche Go/No-Go Abnahme-Checkliste

**Diese Checkliste muss vor jedem Merge auf `main` ausgefüllt werden:**

```
[ ] B1: Kein Darstellungsbruch auf www.energievergleich.shop nach Änderung
[ ] B2: Wix Editor nach Merge kurz geprüft (oder bekanntes externes Problem dokumentiert)
[ ] B3: `npm run build` erfolgreich (CI grün)
[ ] B4: Stromrechner-Flow funktioniert (Eingabe → Ergebnis → CTA)
[ ] B5: Lighthouse SEO-Score ≥ 90 (kein Rückschritt)
[ ] Keine neuen console.log in Produktion
[ ] Keine API-Keys oder Secrets im Code
[ ] DSGVO: Kein neues Tracking ohne Cookie-Consent
[ ] Canonical-URL korrekt gesetzt auf der geänderten Seite
[ ] robots.txt blockiert keine geänderten Seiten
[ ] Sitemap enthält alle öffentlichen Seiten
[ ] CI-Pipeline komplett grün (alle Jobs)
[ ] Keine Breaking Changes an bestehenden Wix API-Calls
[ ] Smoke-Test (`.github/workflows/smoke.yml`) bestanden
[ ] PR-Beschreibung enthält Issue-Referenz
```

---

## 3. Runbook „Foundation First" – Prüfreihenfolge

### Schritt 1: Pre-Merge-Prüfung (lokal)
```bash
npm run build          # Build muss erfolgreich sein
npm run test           # Alle Tests grün
npm run validate:seo   # SEO-Validierung (falls verfügbar)
```

**Erwartete Artefakte:** Build-Output in `dist/`, keine Fehler in der Konsole.

### Schritt 2: CI-Validierung (automatisch)
- CI-Pipeline (`.github/workflows/ci.yml`) läuft durch
- Smoke-Test (`.github/workflows/smoke.yml`) prüft Rendering
- PR Validation (`.github/workflows/pr-validation.yml`) prüft SEO

**Erwartete Artefakte:** Alle GitHub Actions Checks grün.

### Schritt 3: Post-Merge-Verifikation (manuell)
1. Wix Build/Release auslösen (falls nötig über `wix release`)
2. https://www.energievergleich.shop im Browser prüfen (kein weißer Screen, kein Loader-Loop)
3. Strom-Rechner: Eingabe testen → Ergebnisse erscheinen
4. Wix Editor kurz öffnen → Ladestatus prüfen

**Erwartete Artefakte:** Screenshot der Seite nach Deploy, Log des Wix Release Commands.

### Schritt 4: SEO-Nachprüfung (nach jedem Major Release)
1. Google Search Console auf neue Crawl-Fehler prüfen
2. Lighthouse-Bericht auswerten (Score ≥ 90 SEO)
3. Sitemap bei Google neu einreichen falls neue Seiten hinzugefügt

### Schritt 5: Eskalation bei Editor-Problem
Wenn Wix Vibe Editor nach einem Code-Merge nicht funktioniert:
1. Git-Blame prüfen: Welche Dateien wurden geändert?
2. Wix-Community-Kanal checken: https://devforum.wix.com
3. Wix Support öffnen mit Screenshot und letztem Deploy-Zeitstempel
4. Hotfix-Branch `recovery/wix-editor-DATUM` öffnen
5. Änderungen schrittweise rückgängig machen (kein Hard-Reset auf `main`)

### Verantwortlichkeiten

| Aufgabe | Verantwortlich |
|---------|----------------|
| Code-Review + Merge | Copilot Agent + cherinodiaz-lang |
| CI-Monitoring | GitHub Actions (automatisch) |
| Wix Editor Prüfung | cherinodiaz-lang (manuell) |
| SEO-Monitoring | Copilot Agent + Google Search Console |
| Wix Support-Kontakt | cherinodiaz-lang |

---

## 4. Issue-Mapping: Muss-Kriterien ↔ Issues #153–#157

| Muss-Kriterium | Issue | Titel | Status |
|----------------|-------|-------|--------|
| B1 + alle | #153 | Harmonisierung aller Systeme (Wix, Kodex, Git) | ✅ Grundkonstrukt stabil |
| B1 | #154 | Fehleranalyse: Darstellung & Design nach Git-/Codex-Änderungen | ✅ Keine aktiven Darstellungsbrüche; `agent.md` + CI-Regeln sichern Schutz |
| B2 | #155 | Wix Vibe KI Editor Ladeschleife | ⚠️ Externes Wix-Problem – nicht durch Code-Änderung lösbar |
| B4 + B5 | #156 | Live-Stromrechner + Kundeninteresse + SEO | ✅ Strom live / ⚠️ Gas+Kombi noch Beispieldaten |
| alle | #157 | Bestehende GitHub-Issues, PRs und Workflows bereinigen | ⚠️ Offene WIP-PRs vorhanden (siehe Abschnitt 5) |

---

## 5. Eskalations- und Wiederherstellungsprotokoll

### Szenario A: Code-Änderung bricht Wix-Rendering

```
1. CI Smoke-Test schlägt an → PR blockiert (kein Merge möglich)
2. Entwickler prüft Browser-Logs und Smoke-Output
3. Revert des letzten Commits oder gezielter Fix
4. KEIN git reset --hard auf main
5. Recovery-Branch: recovery/fix-rendering-DATUM
```

### Szenario B: Wix Editor hängt (Ladeschleife)

```
1. Prüfen: Tritt Problem bei ALLEN Seiten auf oder nur einer?
2. Browser-Cache leeren + anderer Browser testen
3. Wix Status Page prüfen: https://status.wix.com
4. Falls nach Code-Merge aufgetreten: letzten PR-Diff prüfen
5. Wix Devforum / Support kontaktieren mit Deploy-Zeitstempel
```

### Szenario C: CI komplett rot nach Merge

```
1. GitHub Actions Logs öffnen → fehlgeschlagenen Job identifizieren
2. Recovery-Branch öffnen: recovery/ci-fix-DATUM
3. Fix pushen → CI validieren
4. KEIN direktes Pushen auf main
```

---

## 6. Offene WIP-PRs (Stand 2026-04-03)

| PR | Titel | Empfehlung |
|----|-------|------------|
| #158 | Implement sustainable expansion strategy | Schließen oder in einzelne PRs aufteilen |
| #159 | Update harmonization of Wix, Kodex, Git | Schließen – Änderungen in separaten PRs umsetzen |
| #160 | Add baseline definition and checklist | Durch dieses Dokument ersetzt → Schließen |
| #150 | Delete broken/redundant workflows | Review und Merge oder Close |
| #149–#152 | Verschiedene Fixes | Einzeln reviewen und entscheiden |

> **Empfehlung #157:** Alle WIP-PRs, die nur "Initial plan"-Commits haben und keine echten Änderungen, sollten geschlossen werden. Nur PRs mit konkreten, getesteten Änderungen sollen auf `main` gemergt werden.
