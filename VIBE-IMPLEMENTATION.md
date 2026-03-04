# 🤖 WIX VIBE IMPLEMENTATION GUIDE

**Site Type:** Wix Vibe (AI-generated)
**Site ID:** `52dd1482-1ebb-4472-90a2-bce2af5d763f`
**Status:** ✅ CMS + Design System vollständig synchronisiert

---

## 🎯 WAS IST WIX VIBE?

Wix Vibe ist eine **AI-generierte Website-Plattform**, die sich von traditionellen Wix Editor Sites unterscheidet:

### Unterschiede zu Wix Editor:
- ❌ **Kein visueller Page Builder** (wie Wix Editor)
- ✅ **AI-gesteuerte Page-Generation** via Chat
- ✅ **Automatische Layout-Optimierung**
- ✅ **Code-basierte Anpassungen** (Velo/JavaScript SDK)
- ✅ **CMS-driven Content** (wie bei uns bereits implementiert)

---

## ✅ BEREITS SYNCHRONISIERT (100%)

### 1. CMS Infrastructure
- **Collection:** `SiteContent` ✅
- **8 Content Items:** global, home, stromvergleich-nrw, gasvergleich-nrw, photovoltaik-nrw, gewerbestrom, kontakt, ratgeber ✅

### 2. Design System (9 Custom Embeds)
- Design Tokens CSS ✅
- Button Components ✅
- Form Components ✅
- SEO Meta Tags ✅
- Schema.org Data ✅
- Cookie-Banner (DSGVO) ✅
- CMS Content Helper ✅
- Analytics Helper ✅

---

## 🚀 VIBE-SPEZIFISCHE IMPLEMENTIERUNG

### ANSATZ 1: AI Chat-basierte Page-Erstellung (EMPFOHLEN)

**Da Vibe AI-gesteuert ist, nutzen wir die Vibe AI um Pages zu erstellen:**

#### Schritt 1: Vibe Chat öffnen
```
1. Gehe zu: https://manage.wix.com/dashboard/52dd1482-1ebb-4472-90a2-bce2af5d763f
2. Öffne Vibe AI Chat (Icon unten rechts oder in der Toolbar)
```

#### Schritt 2: Pages via AI erstellen
**Prompt für Vibe AI:**
```
Erstelle folgende Pages für energievergleich.shop:

1. Homepage ("/")
   - Hero Section mit H1: "Energievergleich in NRW – Strom, Gas & Photovoltaik"
   - 3 Benefit Cards: Transparent, Schnell, Verständlich
   - FAQ Section mit 5 Fragen
   - CTA Button: "Jetzt Tarif prüfen"

2. Stromvergleich NRW ("/stromvergleich-nrw")
   - Hero mit H1: "Stromvergleich NRW – Tarife prüfen"
   - PLZ-Eingabefeld
   - Kriterien-Checkliste
   - FAQ Section

3. Gasvergleich NRW ("/gasvergleich-nrw")
   - Analog zu Stromvergleich

4. Photovoltaik NRW ("/photovoltaik-nrw")
   - Dachcheck-Tool-Hinweis
   - Kosten-Übersicht
   - FAQ

5. Gewerbestrom ("/gewerbestrom")
   - Leistungspreis-Erklärung
   - Angebots-Formular

6. Kontakt ("/kontakt")
   - Kontaktformular (Thema, Nachricht, E-Mail, Telefon, Consent)

7. Ratgeber ("/ratgeber")
   - 5 Kategorie-Karten: Strom, Gas, Gewerbe, Photovoltaik, Wechselwissen
```

#### Schritt 3: CMS-Bindung via Velo Code
**Nach Page-Erstellung durch Vibe AI:**

1. Öffne Velo Dev Mode: **Dashboard → Develop & Test → Velo**
2. Erstelle `public/pages/home.js`:

```javascript
import { fetch } from 'wix-fetch';
import wixData from 'wix-data';

$w.onReady(async () => {
  try {
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
      content.sections.benefits.cards.forEach((card, i) => {
        $w(`#benefit${i+1}Title`).text = card.title;
        $w(`#benefit${i+1}Text`).text = card.text;
      });
      
      // FAQ Section
      content.sections.faq.items.forEach((item, i) => {
        $w(`#faq${i+1}Question`).text = item.q;
        $w(`#faq${i+1}Answer`).text = item.a;
      });
    }
  } catch (error) {
    console.error('CMS Content Load Error:', error);
  }
});
```

3. Analog für alle anderen Pages: `stromvergleich-nrw.js`, `gasvergleich-nrw.js`, etc.

---

### ANSATZ 2: Programmatic Page Creation (FALLBACK)

**Falls Vibe AI nicht ausreicht, nutzen wir Custom Code:**

#### Backend-Modul für dynamisches Routing
**Datei: `backend/pages-router.jsw`**

```javascript
import wixData from 'wix-data';

export async function getPageContent(pageKey) {
  try {
    const result = await wixData.query('SiteContent')
      .eq('contentKey', pageKey)
      .find();
    
    return result.items[0]?.data?.contentData || null;
  } catch (error) {
    console.error('CMS Query Error:', error);
    return null;
  }
}

export async function getAllPages() {
  try {
    const result = await wixData.query('SiteContent')
      .eq('contentType', 'page')
      .find();
    
    return result.items.map(item => ({
      key: item.data.contentKey,
      url: `/${item.data.contentKey}`,
      title: item.data.contentData.meta?.title
    }));
  } catch (error) {
    console.error('Pages Query Error:', error);
    return [];
  }
}
```

#### Universal Page Component
**Datei: `public/pages/[dynamic].js`**

```javascript
import { getPageContent } from 'backend/pages-router';

$w.onReady(async () => {
  const pathname = $w('#dynamicPageDataset').getCurrentItem()?.url || window.location.pathname;
  const pageKey = pathname.replace('/', '') || 'home';
  
  const content = await getPageContent(pageKey);
  
  if (!content) {
    $w('#errorMessage').text = 'Seite nicht gefunden';
    return;
  }
  
  // Dynamic Content Rendering
  renderHero(content.hero);
  renderSections(content.sections);
  renderFAQ(content.sections?.faq);
});

function renderHero(hero) {
  if (!hero) return;
  $w('#heroTitle').text = hero.h1;
  $w('#heroSubline').text = hero.subline;
  $w('#heroCTA').label = hero.primaryCta;
}

function renderSections(sections) {
  if (!sections) return;
  
  Object.entries(sections).forEach(([key, section]) => {
    if (section.cards) {
      section.cards.forEach((card, i) => {
        $w(`#${key}Card${i+1}Title`).text = card.title;
        $w(`#${key}Card${i+1}Text`).text = card.text;
      });
    }
  });
}

function renderFAQ(faq) {
  if (!faq?.items) return;
  
  faq.items.forEach((item, i) => {
    $w(`#faq${i+1}Question`).text = item.q;
    $w(`#faq${i+1}Answer`).text = item.a;
  });
}
```

---

## 🎨 VIBE DESIGN-ANPASSUNGEN

### CSS Override für Vibe-Themes
**Falls Vibe AI eigene Styles generiert, überschreiben wir sie:**

**Custom Embed hinzufügen:**
```javascript
// Position: HEAD
<style>
/* Vibe Override: Verwende unsere Design Tokens */
:root {
  --vibe-primary: var(--primary) !important;
  --vibe-text: var(--text-900) !important;
  --vibe-bg: var(--bg) !important;
  --vibe-spacing: var(--s-4) !important;
}

/* Vibe Button Override */
.vibe-button,
[data-vibe-button] {
  background: var(--primary);
  color: white;
  border-radius: var(--r-1);
  padding: 12px 24px;
  min-height: 44px;
  font-weight: 650;
  transition: background 0.2s ease;
}

.vibe-button:hover,
[data-vibe-button]:hover {
  background: var(--primary-strong);
}

/* Vibe Focus Override (WCAG) */
.vibe-button:focus-visible,
[data-vibe-button]:focus-visible {
  outline: 3px solid var(--focus);
  outline-offset: 2px;
}
</style>
```

---

## 📱 VIBE MOBILE OPTIMIZATION

**Vibe optimiert automatisch für Mobile, aber wir stellen sicher:**

```css
/* Custom Embed: Mobile Override */
@media (max-width: 768px) {
  .hero-title {
    font-size: clamp(24px, 6vw, 32px);
    line-height: 1.2;
  }
  
  .card-grid {
    grid-template-columns: 1fr;
    gap: var(--s-4);
  }
  
  .cta-button {
    width: 100%;
    min-height: 48px; /* Größer für Touch */
  }
}
```

---

## 🔍 SEO FÜR VIBE

**Vibe generiert automatisch Meta-Tags, aber wir ergänzen:**

### Dynamic SEO via Velo
**Datei: `backend/seo-manager.jsw`**

```javascript
import wixSeoFrontend from 'wix-seo-frontend';
import { getPageContent } from './pages-router';

export async function setSEO(pageKey) {
  const content = await getPageContent(pageKey);
  
  if (!content?.meta) return;
  
  wixSeoFrontend.setTitle(content.meta.title);
  wixSeoFrontend.setDescription(content.meta.description);
  
  // Structured Data
  wixSeoFrontend.setStructuredData([
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': content.meta.title,
      'description': content.meta.description,
      'url': `https://energievergleich.shop/${pageKey}`
    }
  ]);
}
```

**In jeder Page:**
```javascript
import { setSEO } from 'backend/seo-manager';

$w.onReady(async () => {
  await setSEO('home'); // pageKey anpassen
});
```

---

## ⚡ PERFORMANCE OPTIMIZATION

### Velo Lazy Loading
```javascript
// Nur FAQ-Items laden, die sichtbar sind
$w('#faqRepeater').onItemReady(($item, itemData, index) => {
  $item('#faqQuestion').text = itemData.q;
  $item('#faqAnswer').text = itemData.a;
});

$w('#faqRepeater').data = content.sections.faq.items;
```

### CMS Query Caching
```javascript
let cachedContent = null;

export async function getPageContent(pageKey) {
  if (cachedContent?.[pageKey]) {
    return cachedContent[pageKey];
  }
  
  const result = await wixData.query('SiteContent')
    .eq('contentKey', pageKey)
    .find();
  
  cachedContent = cachedContent || {};
  cachedContent[pageKey] = result.items[0]?.data?.contentData;
  
  return cachedContent[pageKey];
}
```

---

## 🧪 TESTING

### Vibe Preview Mode
```
1. Dashboard → Site → Preview
2. Teste alle 7 Pages
3. Prüfe Mobile Ansicht (Toggle in Vibe Preview)
4. Console öffnen → CMS Content Logs prüfen
```

### CMS Content Validation
```javascript
// In Browser Console:
window.addEventListener('cms-content-loaded', (e) => {
  console.log('✅ Content geladen:', e.detail);
});

// Oder manuell testen:
await wixData.query('SiteContent').eq('contentKey', 'home').find();
```

---

## 📋 CHECKLISTE

### Phase 1: Vibe AI Pages
- [ ] Vibe Chat öffnen
- [ ] 7 Pages via AI-Prompt erstellen lassen
- [ ] Pages in Vibe Editor visuell prüfen

### Phase 2: CMS-Bindung
- [ ] Velo Dev Mode aktivieren
- [ ] `pages/*.js` Dateien erstellen
- [ ] CMS Query Code hinzufügen
- [ ] Content-Bindung testen

### Phase 3: Design Override
- [ ] CSS Override Custom Embed hinzufügen
- [ ] Design Tokens Konsistenz prüfen
- [ ] Mobile Ansicht testen

### Phase 4: SEO & Analytics
- [ ] SEO Manager implementieren
- [ ] Analytics Helper testen (Cookie-Consent)
- [ ] Structured Data validieren (Google Rich Results Test)

### Phase 5: Publishing
- [ ] Alle Pages testen
- [ ] Domain verbinden: energievergleich.shop
- [ ] Site veröffentlichen

---

## 🆘 TROUBLESHOOTING

### Vibe generiert falsche Layouts?
**→ AI-Prompt präzisieren:**
```
"Erstelle eine minimalistische Homepage mit:
- Hero Section (H1 + Subline + CTA Button)
- 3-spaltige Card-Grid für Benefits
- Akkordeon-FAQ Section
- Footer mit Links

Verwende neutrale Farben (Grau + Blau) und große Touch-Targets (44px)."
```

### CMS Content wird nicht geladen?
**→ Collection Permissions prüfen:**
```javascript
// Test Query in Browser Console:
await fetch('/_api/wix-data/v2/items/query', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    dataCollectionId: 'SiteContent',
    query: {filter: {contentKey: 'home'}}
  })
}).then(r => r.json());
```

### Design Tokens werden nicht angewendet?
**→ Custom Embed Reihenfolge prüfen:**
1. Design System CSS (HEAD) - MUSS ZUERST LADEN
2. Vibe Override CSS (HEAD)
3. Component CSS (Forms, Buttons)

---

## 📞 SUPPORT

- **Vibe Docs:** https://support.wix.com/en/article/wix-vibe-an-overview
- **Velo Docs:** https://dev.wix.com/docs/velo
- **GitHub Issues:** https://github.com/cherinodiaz-lang/energievergleichnrw/issues

---

**Status:** ✅ Vibe-Ready | CMS 100% | Design System 100%  
**Last Updated:** 04.03.2026, 18:14 CET
