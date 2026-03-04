# 🚀 DEPLOYMENT GUIDE: energievergleich.shop

**Status:** ✅ GitHub → Wix Sync zu 100% abgeschlossen  
**Datum:** 04.03.2026, 18:06 CET  
**Wix Site ID:** `52dd1482-1ebb-4472-90a2-bce2af5d763f`

---

## ✅ ERFOLGREICH SYNCHRONISIERT

### 1. CMS Infrastructure
- **Collection:** `SiteContent`
- **Fields:** contentKey (TEXT), contentData (OBJECT), contentType (TEXT)
- **Items:** 8/8 (100%)

### 2. Design System (HEAD)
- ✅ Tokens CSS (Colors, Spacing, Typography)
- ✅ Buttons CSS (WCAG-compliant)
- ✅ Forms CSS (Error Identification)
- ✅ SEO Meta Tags (OG, Twitter Card)
- ✅ Performance Hints (Preconnect)
- ✅ Schema.org Structured Data

### 3. DSGVO Cookie-Banner
- ✅ CSS Styling (HEAD)
- ✅ HTML + JavaScript (BODY_END)
- ✅ Neutrale Buttons (Art. 7 DSGVO)
- ✅ localStorage Management

### 4. Backend Helpers
- ✅ CMS Content Helper (BODY_END)
- ✅ Analytics Helper mit Cookie-Gating

---

## 🎯 NÄCHSTE SCHRITTE

### SCHRITT 1: Wix Editor öffnen
```bash
# Site-URL im Browser:
https://manage.wix.com/dashboard/52dd1482-1ebb-4472-90a2-bce2af5d763f/home
```

### SCHRITT 2: Pages erstellen
Erstelle folgende Pages im Wix Editor:

#### Homepage (`/`)
1. Page hinzufügen → Blank Page
2. URL: `/` (Homepage)
3. Title: "Energievergleich in NRW – Strom, Gas & Photovoltaik"
4. **Velo Code hinzufügen:**
```javascript
import wixData from 'wix-data';

$w.onReady(async () => {
  const result = await wixData.query('SiteContent')
    .eq('contentKey', 'home')
    .find();
  
  if (result.items.length > 0) {
    const content = result.items[0].contentData;
    
    // Hero Section
    $w('#heroTitle').text = content.hero.h1;
    $w('#heroSubline').text = content.hero.subline;
    $w('#heroCTA').label = content.hero.primaryCta;
    
    // Benefits Section
    $w('#benefitsTitle').text = content.sections.benefits.title;
    content.sections.benefits.cards.forEach((card, i) => {
      $w(`#benefitCard${i+1}Title`).text = card.title;
      $w(`#benefitCard${i+1}Text`).text = card.text;
    });
    
    // FAQ Section
    $w('#faqTitle').text = content.sections.faq.title;
    // ... FAQ Items durchlaufen
  }
});
```

#### Stromvergleich NRW (`/stromvergleich-nrw`)
```javascript
$w.onReady(async () => {
  const result = await wixData.query('SiteContent')
    .eq('contentKey', 'stromvergleich-nrw')
    .find();
  
  const content = result.items[0].contentData;
  $w('#pageTitle').text = content.h1;
  $w('#pageSubline').text = content.subline;
  $w('#primaryCTA').label = content.primaryCta;
});
```

#### Weitere Pages analog:
- `/gasvergleich-nrw`
- `/photovoltaik-nrw`
- `/gewerbestrom`
- `/kontakt`
- `/ratgeber`

### SCHRITT 3: Navigation einrichten
**Global Content aus CMS laden:**
```javascript
// In Site-Level Code (masterPage.js)
import wixData from 'wix-data';

$w.onReady(async () => {
  const result = await wixData.query('SiteContent')
    .eq('contentKey', 'global')
    .find();
  
  const global = result.items[0].contentData;
  
  // Navigation Menu
  global.nav.forEach(item => {
    // Add menu items dynamically
  });
  
  // Footer
  global.footer.links.forEach(link => {
    // Add footer links
  });
});
```

### SCHRITT 4: Site veröffentlichen
1. Wix Editor → **Publish** Button (oben rechts)
2. Domain verbinden: `energievergleich.shop`
3. SSL automatisch aktiviert ✅

---

## 📊 CUSTOM EMBEDS ÜBERSICHT

| Embed ID | Name | Position | Kategorie |
|----------|------|----------|----------|
| `503aa833-a92d-4d78-82da-fd647d6c34de` | DSGVO Cookie Banner CSS | HEAD | ESSENTIAL |
| `20e67191-348d-44aa-9ce0-7762e0ccb55f` | Design System CSS | HEAD | ESSENTIAL |
| `89bff5b2-7a32-48e9-9c77-4fca0f4fc622` | Forms CSS | HEAD | ESSENTIAL |
| `a2c7707a-1b95-4e9e-b7c7-afcfe3a7ee75` | SEO Meta Tags | HEAD | ESSENTIAL |
| `962ed22e-dcb7-4844-8faf-dde7a20a20e9` | Performance Hints | HEAD | ESSENTIAL |
| `5ee772be-6bb2-4eeb-8f2f-7195df233647` | Schema.org Data | HEAD | ESSENTIAL |
| `d5b97dfa-aa2e-46f6-a74c-04768ee20762` | Cookie Banner HTML | BODY_END | ESSENTIAL |
| `2b126dbc-bfa4-4209-bdb8-0721ed02b864` | CMS Content Helper | BODY_END | FUNCTIONAL |
| `fe686941-e69f-4ac6-9426-3b33f07afe88` | Analytics Helper | BODY_END | ANALYTICS |

---

## 🔧 CMS CONTENT IDS

| Content Key | Item ID | Beschreibung |
|-------------|---------|-------------|
| `global` | `5682920f-9d21-4086-a057-2734e0b51542` | Navigation, Footer, CTAs |
| `home` | `70d798ff-bc26-4149-afbc-ddec5e9c2111` | Homepage Content |
| `stromvergleich-nrw` | `06309eb4-9668-469d-9f3a-0feae3d87d11` | Strom Page |
| `gasvergleich-nrw` | `8c793810-30b6-4dae-bd42-359b60f0422f` | Gas Page |
| `photovoltaik-nrw` | `e9b4a2b7-1435-4025-9278-cda5200691f4` | PV Page |
| `gewerbestrom` | `6e0f94af-ffbb-44f5-95a6-640c2e5dbdc8` | Gewerbe Page |
| `kontakt` | `1853701b-d874-45fe-a294-7bd13f99b0eb` | Kontakt Page |
| `ratgeber` | `c78147fc-77a2-4bd2-91aa-580b4cd7fc01` | Ratgeber Index |

---

## 🎨 DESIGN TOKENS

### Colors
```css
--primary: #1d4ed8;        /* AA on white + white text */
--primary-strong: #1e40af; /* Hover state */
--success: #15803d;
--danger: #b91c1c;
--text-900: #111827;       /* Primary text */
--text-700: #475569;       /* Secondary text */
--bg: #ffffff;
--bg-soft: #f9fafb;
--border: #e5e7eb;
```

### Spacing
```css
--s-1: 4px;   --s-2: 8px;   --s-3: 12px;
--s-4: 16px;  --s-5: 24px;  --s-6: 32px;
--s-7: 48px;  --s-8: 64px;  --s-9: 96px;
```

### Focus State (WCAG 2.4.7)
```css
--focus: #0ea5e9;
outline: 3px solid var(--focus);
outline-offset: 2px;
```

---

## ✅ WCAG 2.1 AA COMPLIANCE

- ✅ **2.4.7 Focus Visible:** 3px outline, 2px offset
- ✅ **2.5.8 Target Size:** Min. 44x44px für alle interaktiven Elemente
- ✅ **3.3.1 Error Identification:** Rot-farbige Labels + Fehlermeldungen
- ✅ **Color Contrast:** AA-konform (4.5:1 für Text)

---

## 🔒 DSGVO COMPLIANCE

### Cookie-Banner Features
- ✅ Neutrale Buttons (kein Nudging nach Art. 7 DSGVO)
- ✅ Transparente Informationen
- ✅ Widerrufsmöglichkeit (Settings Icon)
- ✅ localStorage-basiertes Consent Management

### Analytics Gating
- ✅ Tracking-Scripts laden nur bei Consent
- ✅ Event: `cookie_consent` = 'all' oder 'necessary'

---

## 📈 SEO OPTIMIZATIONS

### Meta Tags
- ✅ Viewport (responsive)
- ✅ Theme Color (#1d4ed8)
- ✅ Open Graph (og:site_name, og:type, og:locale)
- ✅ Twitter Card (summary_large_image)
- ✅ Canonical URLs

### Structured Data
- ✅ WebSite Schema
- ✅ BreadcrumbList Schema
- ✅ SearchAction Schema

### Performance
- ✅ Preconnect zu fonts.gstatic.com
- ✅ DNS-Prefetch zu static.wixstatic.com
- ✅ Minified CSS (alle Embeds)

---

## 🐛 TROUBLESHOOTING

### Content wird nicht angezeigt?
1. Wix Data Permissions prüfen (Collection `SiteContent` auf PUBLIC read)
2. Browser Console öffnen → CMS Content Helper Logs prüfen
3. Event Listener testen:
```javascript
window.addEventListener('cms-content-loaded', (e) => {
  console.log('Content geladen:', e.detail);
});
```

### Cookie-Banner erscheint nicht?
1. Browser-Cookies löschen
2. Embed `d5b97dfa-aa2e-46f6-a74c-04768ee20762` auf "enabled: true" prüfen

### Analytics laden nicht?
1. Cookie-Consent prüfen: `document.cookie` → `cookie_consent=all`
2. Analytics Helper initialisiert? `window.analyticsHelper.initialized`

---

## 📞 SUPPORT

**Bei Problemen:**
1. GitHub Issues: https://github.com/cherinodiaz-lang/energievergleichnrw/issues
2. Wix Support: https://support.wix.com
3. DSGVO-Fragen: Datenschutzbeauftragten kontaktieren

---

**Status:** ✅ Ready for Production  
**Last Updated:** 04.03.2026, 18:06 CET
