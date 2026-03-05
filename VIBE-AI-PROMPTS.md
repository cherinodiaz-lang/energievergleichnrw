# 🤖 VIBE AI PROMPTS (Copy & Paste)

**Verwendung:** Kopiere diese Prompts **exakt** in den Vibe AI Chat.

---

## 📋 PROMPT 1: Alle 7 Pages auf einmal erstellen

```
Erstelle 7 Pages für energievergleich.shop mit folgender Struktur:

=== HOMEPAGE (/) ===
Layout:
- Hero Section:
  * H1 Text (ID: #heroTitle)
  * Untertitel Paragraph (ID: #heroSubline)
  * CTA Button (ID: #heroCTA)
- Benefits Grid (3 Spalten):
  * Card 1: Title (#benefit1Title), Text (#benefit1Text)
  * Card 2: Title (#benefit2Title), Text (#benefit2Text)
  * Card 3: Title (#benefit3Title), Text (#benefit3Text)
- FAQ Section:
  * Repeater (ID: #faqRepeater)
  * Question Text (ID: #faqQuestion)
  * Answer Text (ID: #faqAnswer)

=== STROMVERGLEICH NRW (/stromvergleich-nrw) ===
Layout:
- Hero Section:
  * H1 (ID: #pageTitle)
  * Subline (ID: #pageSubline)
  * CTA Button (ID: #primaryCTA)
- PLZ Eingabe:
  * Input Field (ID: #plzInput)
  * Submit Button (ID: #plzSubmit)
- FAQ Repeater (ID: #faqRepeater)

=== GASVERGLEICH NRW (/gasvergleich-nrw) ===
Identisch zu Stromvergleich (gleiche IDs)

=== PHOTOVOLTAIK NRW (/photovoltaik-nrw) ===
Identisch zu Stromvergleich (gleiche IDs)

=== GEWERBESTROM (/gewerbestrom) ===
Identisch zu Stromvergleich (gleiche IDs)

=== KONTAKT (/kontakt) ===
Layout:
- Hero Section:
  * H1 (ID: #pageTitle)
  * Subline (ID: #pageSubline)
- Kontaktformular (ID: #contactForm):
  * Dropdown Thema (ID: #topicInput, Label: #topicLabel)
  * Textarea Nachricht (ID: #messageInput, Label: #messageLabel)
  * Input E-Mail (ID: #emailInput, Label: #emailLabel)
  * Input Telefon (ID: #phoneInput, Label: #phoneLabel)
  * Checkbox Consent (ID: #consentCheckbox, Label: #consentLabel)
  * Submit Button (ID: #submitButton)
- Erfolgsmeldung (ID: #successMessage, hidden)
- Fehlermeldung (ID: #errorMessage, hidden)

=== RATGEBER (/ratgeber) ===
Layout:
- Hero Section:
  * H1 (ID: #pageTitle)
  * Subline (ID: #pageSubline)
- Category Cards (5 Karten):
  * Option 1 - Repeater (ID: #categoryRepeater)
    - Card Title (ID: #cardTitle)
    - Card Text (ID: #cardText)
    - Card Link (ID: #cardLink)
  * Option 2 - Static:
    - Card 1: Title (#card1Title), Text (#card1Text), Link (#card1Link)
    - Card 2: Title (#card2Title), Text (#card2Text), Link (#card2Link)
    - Card 3: Title (#card3Title), Text (#card3Text), Link (#card3Link)
    - Card 4: Title (#card4Title), Text (#card4Text), Link (#card4Link)
    - Card 5: Title (#card5Title), Text (#card5Text), Link (#card5Link)
- CTA Section:
  * Title (ID: #ctaTitle)
  * Text (ID: #ctaText)
  * Button (ID: #ctaButton)

=== DESIGN VORGABEN ===
- Farben:
  * Primär: #1d4ed8 (Blau)
  * Text: #1a1a1a (Dunkelgrau)
  * Background: #ffffff (Weiß)
  * Akzent: #f3f4f6 (Hellgrau)
- Buttons:
  * Min. Höhe: 44px (Touch-Target)
  * Border-Radius: 6px
  * Font Weight: 600
- Schrift:
  * H1: 32-48px, Bold
  * Body: 16-18px, Normal
  * Line-Height: 1.6
- Spacing:
  * Sections: 80px vertikal
  * Cards: 24px Gap
- Mobile:
  * Single Column auf <768px
  * Touch-Targets: Min. 44x44px

=== WICHTIG ===
- Alle Element-IDs EXAKT wie angegeben verwenden
- Repeater für FAQ verwenden (dynamische Inhalte)
- Mobile-First Design
- WCAG 2.1 AA konform (Kontraste, Focus States)
```

---

## 📋 PROMPT 2: Einzelne Pages nacheinander (falls Prompt 1 zu lang)

### Homepage

```
Erstelle eine Homepage (/) mit:
- Hero Section (H1 #heroTitle, Subline #heroSubline, Button #heroCTA)
- 3 Benefit Cards in Grid (#benefit1Title/Text, #benefit2Title/Text, #benefit3Title/Text)
- FAQ Repeater (#faqRepeater mit #faqQuestion, #faqAnswer)
- Farben: Blau #1d4ed8, Buttons min. 44px Höhe
```

### Stromvergleich

```
Erstelle Page /stromvergleich-nrw mit:
- Hero (H1 #pageTitle, Subline #pageSubline, Button #primaryCTA)
- PLZ Eingabe (#plzInput, #plzSubmit)
- FAQ Repeater (#faqRepeater mit #faqQuestion, #faqAnswer)
- Mobile-optimiert, Touch-Targets 44px
```

### Gasvergleich

```
Kopiere /stromvergleich-nrw nach /gasvergleich-nrw
(Gleiche Struktur und IDs)
```

### Photovoltaik

```
Kopiere /stromvergleich-nrw nach /photovoltaik-nrw
(Gleiche Struktur und IDs)
```

### Gewerbestrom

```
Kopiere /stromvergleich-nrw nach /gewerbestrom
(Gleiche Struktur und IDs)
```

### Kontakt

```
Erstelle Page /kontakt mit:
- Hero (#pageTitle, #pageSubline)
- Formular #contactForm:
  * Dropdown #topicInput + Label #topicLabel
  * Textarea #messageInput + Label #messageLabel
  * Input #emailInput + Label #emailLabel
  * Input #phoneInput + Label #phoneLabel
  * Checkbox #consentCheckbox + Label #consentLabel
  * Submit #submitButton
- Hidden Messages: #successMessage, #errorMessage
```

### Ratgeber

```
Erstelle Page /ratgeber mit:
- Hero (#pageTitle, #pageSubline)
- 5 Category Cards:
  * Repeater #categoryRepeater (#cardTitle, #cardText, #cardLink)
  * ODER Static #card1Title/Text/Link bis #card5Title/Text/Link
- CTA Section (#ctaTitle, #ctaText, #ctaButton)
```

---

## 🎯 NACH AI-GENERIERUNG: Velo Code hinzufügen

**Für jede Page:**

1. Page im Vibe Editor öffnen
2. Code Panel → Page Code (`Home.js`, `Stromvergleich-nrw.js`, etc.)
3. Code aus GitHub kopieren:

### Homepage

```
https://github.com/cherinodiaz-lang/energievergleichnrw/blob/main/velo/public/pages/home.js
```

### Stromvergleich NRW

```
https://github.com/cherinodiaz-lang/energievergleichnrw/blob/main/velo/public/pages/stromvergleich-nrw.js
```

### Alle anderen Pages

```
https://github.com/cherinodiaz-lang/energievergleichnrw/tree/main/velo/public/pages
```

---

## ✅ CHECKLISTE

### Phase 1: Vibe AI

- [ ] Vibe AI Chat öffnen
- [ ] Prompt kopieren und senden
- [ ] 7 Pages generiert
- [ ] Element IDs prüfen (Properties Panel)

### Phase 2: Velo Backend

- [ ] Dev Mode aktivieren
- [ ] `backend/pages-router.jsw` erstellen
- [ ] `backend/seo-manager.jsw` erstellen
- [ ] Code aus GitHub kopieren

### Phase 3: Page Code

- [ ] Jede Page: Code aus GitHub einfügen
- [ ] Preview Mode testen
- [ ] Console: "✅ CMS loaded" prüfen

### Phase 4: Publishing

- [ ] Alle Pages testen
- [ ] Domain verbinden: energievergleich.shop
- [ ] Site veröffentlichen

---

## 🐛 TROUBLESHOOTING

### Vibe AI ignoriert Element-IDs?

**→ Nachfrage-Prompt:**

```
Setze für alle Elemente die exakten IDs:
- Hero H1: #heroTitle
- Hero Subline: #heroSubline
- Hero Button: #heroCTA
- FAQ Repeater: #faqRepeater
  * Question: #faqQuestion
  * Answer: #faqAnswer

Prüfe Properties Panel ob IDs gesetzt sind.
```

### Pages werden nicht erstellt?

**→ Single-Page-Prompts verwenden** (Prompt 2)

### Element IDs fehlen?

**→ Manuell setzen:**

```
1. Element auswählen
2. Properties Panel (rechts)
3. Advanced → ID Settings
4. ID einfügen (ohne #)
```

---

**Last Updated:** 04.03.2026, 18:22 CET
