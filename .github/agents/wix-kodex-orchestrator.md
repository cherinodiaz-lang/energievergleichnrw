# Wix–Kodex Orchestrator Agent

> Verantwortlich für die Koordination von Änderungen zwischen Wix Headless, Codex und Git.\
> Dieses Dokument gilt für alle Agents, Copilot-Workflows und Entwickler, die an `cherinodiaz-lang/energievergleichnrw` arbeiten.

---

## 1. Verantwortlichkeiten

| Domäne | Verantwortung | Grenzen |
|--------|--------------|---------|
| **Git / Codex** | TypeScript/Astro-Code, Routing, Komponenten, SEO-Metadaten, CI-Workflows | Kein direkter Eingriff in Wix-seitige Seiten-IDs, Page-Slugs oder Editor-Konfiguration |
| **Wix Headless / Editor** | Design-Tokens, Seiten-Layouts, Wix-Collections, Wix Bookings/Forms | Kein Überschreiben von `src/`-Dateien oder Astro-Build-Artefakten |
| **CI / Agents** | Build-Validierung, SEO-Checks, Smoke-Tests, Lighthouse | Kein automatisches Merge ohne grüne Checks |

**Goldene Regel:** Jede Änderung in einer Domäne muss die anderen Domänen explizit prüfen, bevor sie gemergt wird.

---

## 2. Change-Safety-Checklist (vor jedem Merge)

Jeder PR muss folgende Punkte erfüllen, bevor er auf `main` gemergt wird:

### Allgemein
- [ ] CI ist grün (`npm run lint` + `npm test`)
- [ ] `npm run validate:release-readiness` läuft ohne Fehler
- [ ] Keine Secrets oder `.env`-Werte im Code committet
- [ ] `main` Branch ist up-to-date (kein Merge-Konflikt)

### Wix-Kompatibilität
- [ ] Keine Änderungen an Wix-seitigen Routing-Slugs ohne Abstimmung
- [ ] Wix `wix.config.json` (`appId`) unverändert, oder Änderung explizit dokumentiert
- [ ] Wix Editor nach lokalem `wix dev` getestet (kein Ladespinner)
- [ ] Wix Collections / Forms nicht ungewollt beeinflusst

### Design & Editor
- [ ] Visuelle Änderungen im Browser-Preview geprüft (keine Layout-Brüche)
- [ ] Tailwind-Klassen nicht mit Wix-Stilen kollidiert
- [ ] Fonts (`fonts.swap.css`) unverändert oder Änderung bewusst
- [ ] Responsivität auf Mobile und Desktop getestet

### SEO
- [ ] `npm run validate:seo` grün
- [ ] Canonical-URL korrekt (`https://www.energievergleich.shop`)
- [ ] Neue Seiten mit `<title>`, `description`, `og:*` ausgestattet
- [ ] Sitemap nicht beschädigt

### Stromrechner / Leadflow
- [ ] Stromrechner-Komponente rendert korrekt (kein weißer Screen)
- [ ] Tarifberechnung liefert Ergebnisse (kein „Beispiel"-Stub in Production)
- [ ] Lead-Formular sendet korrekt (Wix Form Collection erreichbar)
- [ ] CTA nach Berechnung sichtbar und funktional

---

## 3. Definition of Done – Design & SEO-sensitive Änderungen

Eine Änderung gilt als **fertig**, wenn:

1. **Code** – PR ist gemergt, alle Checks sind grün.
2. **Build** – `wix build` schlägt nicht fehl; statische Assets korrekt erzeugt.
3. **Wix Editor** – Editor öffnet sich ohne Endlosschleife; Seitenlayout unverändert.
4. **SEO** – `validate:seo` und Lighthouse Performance ≥ vorherigen Score.
5. **Stromrechner** – Berechnung liefert echte Tarife; Lead-CTA ist klickbar.
6. **Smoke** – `npm run smoke:runtime` bestätigt Erreichbarkeit aller Hauptseiten.
7. **Dokumentation** – Relevante Docs (`CHANGE_ORCHESTRATION.md`) aktualisiert.

---

## 4. Eskalationspfad bei Editor-Problemen

Tritt eine Endlosschleife oder ein nicht reagierender Wix-Editor auf:

```
Stufe 1 – Selbst-Diagnose (< 15 min)
  ├── Browser-Cache + Cookies löschen
  ├── Anderen Browser testen (Firefox / Safari)
  └── Wix Status Page prüfen: https://status.wix.com

Stufe 2 – Code-Analyse (< 30 min)
  ├── Letzten Merge auf main identifizieren (git log --oneline -10)
  ├── Prüfen: Hat der letzte Commit wix.config.json oder astro.config.mjs geändert?
  ├── Prüfen: Ist WIX_CLIENT_ID korrekt gesetzt? (wix-local-env.mjs)
  └── Revert-Kandidaten identifizieren (npm run validate:release-readiness)

Stufe 3 – Rollback (< 60 min)
  ├── PR-Revert auf GitHub erstellen (NICHT git reset --hard auf main)
  ├── Revert-PR mit Label "hotfix" öffnen
  └── CI muss grün sein, bevor Revert gemergt wird

Stufe 4 – Wix-Support
  └── Ticket an Wix Premium Support mit Screenshot der Ladeschleife und
      Browser-Console-Logs
```

---

## 5. Kommunikation zwischen Agents

Wenn ein Agent (Codex, Copilot, Dependabot) eine Änderung vorschlägt:

- **Codex-Änderungen** müssen immer einen PR erzeugen – kein direkter Push auf `main`.
- **Copilot-PRs** laufen durch `auto-merge-copilot.yml` nur wenn CI grün und Label `copilot` gesetzt.
- **Dependabot-PRs** werden durch `dependabot.yml` gesteuert; Breaking Changes manuell prüfen.
- **Kein Agent** darf `wix.config.json` oder `.env`-Dateien ohne explizite Freigabe verändern.
