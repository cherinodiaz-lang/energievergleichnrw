# DSGVO-Kritische Fixes - Sofort umsetzen!

**Erstellt:** 04.03.2026, 14:49 Uhr
**Branch:** `fix/dsgvo-critical-issues`
**Priorität:** 🔴 KRITISCH - HEUTE erledigen

## ⚠️ Abmahngefahr - Sofort handeln!

Dieser Branch behebt **4 kritische DSGVO-Verstöße** auf energievergleich.shop:

1. ✅ **Cookie-Banner Nudging** (5 Min)
2. ✅ **Datenschutzbeauftragter Musterangabe** (10 Min)
3. ✅ **Impressum unvollständig** (15 Min)
4. ✅ **Firmenbezeichnung inkonsistent** (10 Min)

---

## 📋 Checklist vor dem Merge

### 1. Cookie-Banner CSS (SOFORT)

- [x] `cookie-banner.css` erstellt
- [x] Beide Buttons identisch gestylt (kein Nudging)
- [ ] In `index.html` einbinden: `<link rel="stylesheet" href="/styles/cookie-banner.css">`
- [ ] `cookie-banner.html` Component in Layout einfügen

**Rechtliche Grundlage:** Art. 7 DSGVO - Freiwilligkeit der Einwilligung

---

### 2. Datenschutzbeauftragter (SOFORT)

- [x] Template `datenschutz-dsb-section.html` erstellt
- [ ] **ENTSCHEIDUNG TREFFEN:**
  - [ ] Option A: Externen DSB beauftragen (80-200 €/Monat)
  - [ ] Option B: Internen DSB benennen (Person qualifizieren)
  - [ ] Option C: Kein DSB nötig (wenn <20 MA mit Datenverarbeitung)
- [ ] Gewählte Option in `datenschutz.html` einfügen
- [ ] **MUSTERANGABE "Derzeit nicht benannt" LÖSCHEN**

**Rechtliche Grundlage:** Art. 37 DSGVO - Benennung eines DSB

---

### 3. Impressum (VOR MERGE KLÄREN!)

- [x] Template `impressum.html` erstellt
- [ ] **RECHTSFORM KLÄREN:**
  - [ ] GbR (P. Kohmann & A. Danos GbR)
  - [ ] Einzelunternehmen (nur 1 Person)
- [ ] **USt-IdNr. eintragen** (vom BZSt, 2-4 Wochen Wartezeit)
  - Online: https://www.bzst.de
  - Wenn noch nicht vorhanden: Beantragen UND "Auf Anfrage" entfernen
- [ ] **Steuernummer eintragen** (vom Finanzamt, steht auf Steuerbescheid)
- [ ] Platzhalter [...] durch echte Daten ersetzen

**Rechtliche Grundlage:** § 5 TMG - Allgemeine Informationspflichten

---

### 4. Firmenbezeichnung vereinheitlichen (SOFORT)

- [ ] Überall "ENERGIEVERGLEICH NRW" verwenden
- [ ] "Energievergleich Muster GmbH" in `datenschutz.html` ersetzen
- [ ] Footer, Header, alle Templates prüfen

---

## 🚀 Deployment-Reihenfolge

### Phase 1 - Sofort (HEUTE):

1. **Cookie-Banner CSS** → Keine Daten nötig, direkt deployen
2. **Firmenname** → Such & Replace in allen Dateien
3. **Datenschutzbeauftragter** → Entscheidung treffen, Text einfügen
4. **Impressum** → NUR wenn Daten vorliegen (sonst erst klären!)

### Phase 2 - Diese Woche:

- Cookie-Einwilligungsprotokoll implementieren
- Drittlandtransfer-Infos verbessern (Google Analytics)

---

## 💰 Kosten-Übersicht

| Maßnahme      | Kosten                |
| ------------- | --------------------- |
| Cookie-Banner | 0 € (nur CSS)         |
| DSB extern    | 960-2.400 €/Jahr      |
| DSB intern    | 0 € (Person benennen) |
| Impressum     | 0 € (Texte)           |
| **Minimum**   | **0 €**               |

---

## 📁 Erstellte Dateien

```
fix/dsgvo-critical-issues/
├── styles/
│   └── cookie-banner.css           # DSGVO-konformes Styling
├── components/
│   ├── cookie-banner.html          # HTML Component
│   └── datenschutz-dsb-section.html # DSB-Templates (3 Optionen)
├── impressum-template.html                   # Vollständiges Impressum-Template
└── DSGVO-FIXES-README.md           # Diese Datei
```

---

## ⚡ Quick-Start für Developer

```bash
# 1. Branch pullen
git checkout fix/dsgvo-critical-issues

# 2. Cookie-Banner einbinden
# In index.html:
<link rel="stylesheet" href="/styles/cookie-banner.css">
<!-- Vor </body>: -->
<?php include 'components/cookie-banner.html'; ?>

# 3. Datenschutz-Seite aktualisieren
# WICHTIG: Erst Entscheidung treffen (Option A/B/C)!
# Dann entsprechende Section aus datenschutz-dsb-section.html kopieren

# 4. Impressum-Platzhalter füllen
# WICHTIG: Rechtsform VOR Merge klären!
# Platzhalter in impressum.html ersetzen

# 5. Firmenname überall ersetzen
grep -r "Energievergleich Muster GmbH" .
# Alle Treffer durch "ENERGIEVERGLEICH NRW" ersetzen
```

---

## 🔒 Rechtliche Hinweise

**§ 5 TMG - Impressumspflicht:**

- Fehlende/falsche Angaben = Abmahngefahr
- Bußgeld bis 50.000 €

**Art. 37 DSGVO - DSB-Pflicht:**

- Falsche "Musterangabe" = Datenschutzverstoß
- Bußgeld bis 10 Mio. € oder 2% Jahresumsatz

**Art. 7 DSGVO - Cookie-Nudging:**

- Visuelles "Nudging" unzulässig
- Einwilligung muss freiwillig sein

---

## 📞 Support

Bei Fragen zu diesem Branch:

- **Erstellt von:** Perplexity AI (via cherinodiaz-lang)
- **Basis:** DSGVO-Analyse vom 04.03.2026
- **Rechtsstand:** März 2026

---

## ✅ Nach dem Merge

1. [ ] Website live testen
2. [ ] Cookie-Banner auf allen Seiten prüfen
3. [ ] Impressum auf Vollständigkeit prüfen
4. [ ] Datenschutzerklärung auf DSB-Angabe prüfen
5. [ ] Google PageSpeed Insights (sollte nicht negativ beeinflusst sein)

**Nächster Schritt:** Phase 2 - SEO-Optimierungen

```

---

**Wichtig:** Dieser Branch ist NICHT deploy-ready, solange Platzhalter nicht gefüllt sind!
```
