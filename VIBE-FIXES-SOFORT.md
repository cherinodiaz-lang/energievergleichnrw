# 🚨 VIBE SOFORT-FIXES

**Datum:** 04.03.2026, 18:39 CET  
**Status:** 🔴 KRITISCH - Site hat 3 Probleme

---

## ❌ Problem 1: Cookie-Banner doppelt

### Was ist kaputt:

- Wix-eigener Cookie-Banner UND Custom Embed beide sichtbar
- Nutzer sieht 2x Cookie-Consent
- DSGVO-Problem: Verwirrend

### Fix via Wix Vibe AI:

```
Deaktiviere den Wix Cookie Banner:
1. Öffne Site Settings
2. Cookie Consent Policy → Disabled
3. Behalte nur den Custom Cookie Banner (blauer Button unten rechts)
```

**ODER via Dashboard:**

```
Dashboard → Settings → Cookie Consent → "Show Cookie Banner" AUS
```

---

## ❌ Problem 2: Abstände zu eng (Benefits Section)

### Was ist kaputt:

- Benefits Cards haben zu wenig Padding
- Text klebt am Icon/Rand
- Sieht unprofessionell aus

### Fix via Vibe AI:

```
Vibe AI Prompt:

"Aktualisiere die Benefits Section auf der Homepage:

1. Finde die 3 Benefits Cards:
   - '100% Unabhängig'
   - 'Regional in NRW'
   - 'Einfacher Wechsel'

2. Erhöhe das Padding für jede Card:
   - Padding: 32px (alle Seiten)
   - Gap zwischen Icon und Text: 16px
   - Gap zwischen Title und Beschreibung: 8px

3. Stelle sicher:
   - Min-Height: 200px pro Card
   - Icon Size: 48x48px
   - Title: Font-Size 20px, Font-Weight 600
   - Text: Font-Size 16px, Line-Height 1.6

Behalte die aktuellen Farben und Fonts bei!"
```

---

## ❌ Problem 3: CTA-Buttons ohne Funktion

### Was ist kaputt:

- Button "Jetzt vergleichen" (gelb) → macht nichts
- Button "Photovoltaik Beratung" (grün) → macht nichts
- Link "So vergleichen wir (Methodik)" → macht nichts

### Fix via Vibe AI:

```
Vibe AI Prompt:

"Verlinke die Hero-Section Buttons auf der Homepage:

1. Button 'Jetzt vergleichen' (gelber Button):
   - Link zu: /stromvergleich-nrw
   - Element ID: heroCTA (falls noch nicht gesetzt)

2. Button 'Photovoltaik Beratung' (grüner Button):
   - Link zu: /photovoltaik-nrw
   - Element ID: heroSecondaryCTA

3. Link 'So vergleichen wir (Methodik)':
   - Link zu: /ratgeber (Anchor: #methodik)
   - Element ID: heroMethodikLink

Wichtig: Buttons müssen auf INTERNE Pages verlinken (keine externen URLs)!"
```

---

## 🎯 REIHENFOLGE DER FIXES:

### Phase 1: Cookie-Banner (5 Min)

1. Dashboard → Settings → Cookie Consent → OFF
2. Site neu laden → Nur noch 1 Banner sichtbar

### Phase 2: Spacing Fix (10 Min)

1. Vibe AI Prompt senden (Spacing)
2. Warten bis AI fertig
3. Preview prüfen

### Phase 3: CTA Links (5 Min)

1. Vibe AI Prompt senden (Links)
2. Warten bis AI fertig
3. Buttons testen

### Phase 4: Publish (2 Min)

1. Preview komplett testen
2. Publish klicken
3. Site neu laden

**GESAMT:** ~22 Minuten

---

## ✅ ERFOLGS-KRITERIEN:

```
[ ] Nur noch 1 Cookie-Banner sichtbar (blauer Button)
[ ] Benefits Cards: Padding 32px, kein Text am Rand
[ ] Button "Jetzt vergleichen" → /stromvergleich-nrw
[ ] Button "Photovoltaik Beratung" → /photovoltaik-nrw
[ ] Link "So vergleichen wir" → /ratgeber
[ ] Mobile View funktioniert
[ ] Site published
```

---

## 🐛 TROUBLESHOOTING:

### Vibe AI ignoriert Prompts?

**Lösung:** Einzelne Elemente manuell im Editor auswählen:

1. Element klicken
2. Properties Panel → Link Settings
3. Page auswählen
4. Save

### Cookie-Banner immer noch doppelt?

**Lösung:** Custom Code prüfen:

1. Dashboard → Settings → Custom Code
2. Embed für Cookie-Banner suchen
3. Prüfen ob `data-enabled="true"`
4. Falls Custom Code fehlt → aus GitHub `/src/components/cookie-banner.html` kopieren

### Spacing wird nicht übernommen?

**Lösung:** CSS direkt im Custom Code setzen:

```css
.benefits-card {
  padding: 32px !important;
  min-height: 200px !important;
}
```

---

## 📞 NEXT STEPS NACH FIXES:

1. **Element IDs setzen** (für Velo Code)
2. **Velo Backend/Frontend einfügen** (CMS-Bindung)
3. **FAQ Repeater testen**
4. **Alle 7 Pages durchgehen**

---

**Last Updated:** 04.03.2026, 18:39 CET
