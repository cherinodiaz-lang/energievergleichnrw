# ⚡ VIBE QUICK START

**Ziel:** energievergleich.shop in 30 Minuten live schalten  
**Status:** ✅ CMS + Design System fertig | 👉 Jetzt Pages hinzufügen

---

## 🚀 3-SCHRITTE-PLAN

### SCHRITT 1: Vibe Dashboard öffnen (2 Min)

```
https://manage.wix.com/dashboard/52dd1482-1ebb-4472-90a2-bce2af5d763f
```

1. Klicke auf **"Edit Site"** oder **"Develop & Test"**
2. Aktiviere **Velo Dev Mode** (wenn noch nicht aktiv)
3. Öffne **Code Panel** (links in der Toolbar)

---

### SCHRITT 2: Backend-Module hinzufügen (5 Min)

#### 2.1 Backend-Ordner erstellen

```
Code Panel → Backend → New File
```

#### 2.2 Datei: `pages-router.jsw`

**Kopiere aus GitHub:** [velo/backend/pages-router.jsw](https://github.com/cherinodiaz-lang/energievergleichnrw/blob/main/velo/backend/pages-router.jsw)

<details>
<summary>📋 Code zeigen</summary>

```javascript
import wixData from 'wix-data';

let cachedContent = {};

export async function getPageContent(pageKey) {
  if (cachedContent[pageKey]) {
    return cachedContent[pageKey];
  }

  try {
    const result = await wixData.query('SiteContent').eq('contentKey', pageKey).limit(1).find();

    if (result.items.length === 0) {
      console.error(`Content not found: ${pageKey}`);
      return null;
    }

    const content = result.items[0].data.contentData;
    cachedContent[pageKey] = content;
    return content;
  } catch (error) {
    console.error(`CMS Query Error:`, error);
    return null;
  }
}

export async function getGlobalContent() {
  return getPageContent('global');
}
```

</details>

#### 2.3 Datei: `seo-manager.jsw`

**Kopiere aus GitHub:** [velo/backend/seo-manager.jsw](https://github.com/cherinodiaz-lang/energievergleichnrw/blob/main/velo/backend/seo-manager.jsw)

<details>
<summary>📋 Code zeigen</summary>

```javascript
import wixSeoFrontend from 'wix-seo-frontend';
import { getPageContent } from './pages-router';

export async function setSEO(pageKey) {
  const content = await getPageContent(pageKey);

  if (!content?.meta) return;

  wixSeoFrontend.setTitle(content.meta.title);
  wixSeoFrontend.setDescription(content.meta.description);

  const baseUrl = 'https://energievergleich.shop';
  const pageUrl = pageKey === 'home' ? baseUrl : `${baseUrl}/${pageKey}`;

  wixSeoFrontend.setStructuredData([
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: content.meta.title,
      description: content.meta.description,
      url: pageUrl,
      inLanguage: 'de-DE',
    },
  ]);
}
```

</details>

---

### SCHRITT 3: Pages mit Vibe AI erstellen (20 Min)

#### 3.1 Vibe AI Chat öffnen

- Icon unten rechts ODER
- Toolbar → **"Ask Vibe AI"**

#### 3.2 AI-Prompt (kopiere genau so):

```
Erstelle folgende 7 Pages für meine Energie-Vergleichsplattform:

1. Homepage ("/")
   - Hero: H1 + Subline + CTA Button
   - 3 Benefit-Cards in Grid
   - FAQ Akkordeon (5 Fragen)
   - Footer mit Navigation

2-7. Weitere Pages ("/stromvergleich-nrw", "/gasvergleich-nrw", etc.)
   - Jede Page: Hero + PLZ-Eingabe + FAQ

Design:
- Farben: Blau (#1d4ed8) + Grau
- Buttons: Min. 44px Höhe (Touch-Target)
- Schrift: Klar, groß, lesbar
- Mobile-optimiert

Struktur:
- Repeater für FAQ (ID: #faqRepeater)
- Element-IDs wie beschrieben (z.B. #heroTitle, #pageTitle)
```

#### 3.3 Nach AI-Generierung: Velo Code hinzufügen

**Für jede Page:**

1. Page auswählen im Editor
2. Code Panel → Page Code (z.B. `Home.js`)
3. Code einfügen:

**Homepage (`Home.js`):**

```javascript
import { getPageContent } from 'backend/pages-router';
import { setSEO } from 'backend/seo-manager';

$w.onReady(async () => {
  await setSEO('home');
  const content = await getPageContent('home');

  if (!content) return;

  // Hero
  $w('#heroTitle').text = content.hero.h1;
  $w('#heroSubline').text = content.hero.subline;
  $w('#heroCTA').label = content.hero.primaryCta;

  // FAQ Repeater
  if (content.sections?.faq?.items) {
    $w('#faqRepeater').data = content.sections.faq.items;
    $w('#faqRepeater').onItemReady(($item, itemData) => {
      $item('#faqQuestion').text = itemData.q;
      $item('#faqAnswer').text = itemData.a;
    });
  }
});
```

**Stromvergleich NRW (`Stromvergleich-nrw.js`):**

```javascript
import { getPageContent } from 'backend/pages-router';
import { setSEO } from 'backend/seo-manager';

$w.onReady(async () => {
  await setSEO('stromvergleich-nrw');
  const content = await getPageContent('stromvergleich-nrw');

  if (!content) return;

  $w('#pageTitle').text = content.h1;
  $w('#pageSubline').text = content.subline;
  $w('#primaryCTA').label = content.primaryCta;

  if (content.faq?.items) {
    $w('#faqRepeater').data = content.faq.items;
    $w('#faqRepeater').onItemReady(($item, itemData) => {
      $item('#faqQuestion').text = itemData.q;
      $item('#faqAnswer').text = itemData.a;
    });
  }
});
```

**Analog für:**

- `Gasvergleich-nrw.js`
- `Photovoltaik-nrw.js`
- `Gewerbestrom.js`
- `Kontakt.js` (siehe [velo/public/pages/kontakt.js](https://github.com/cherinodiaz-lang/energievergleichnrw/blob/main/velo/public/pages/kontakt.js))
- `Ratgeber.js` (siehe [velo/public/pages/ratgeber.js](https://github.com/cherinodiaz-lang/energievergleichnrw/blob/main/velo/public/pages/ratgeber.js))

---

## ✅ FERTIG! Jetzt testen:

### Preview Mode

```
Vibe Editor → Preview Button (oben rechts)
```

### Browser Console prüfen

```
F12 → Console → Sollte zeigen:
✅ CMS loaded: home
✅ SEO set for: home
```

### Publish

```
Vibe Editor → Publish Button
→ Domain verbinden: energievergleich.shop
→ Veröffentlichen
```

---

## 🐛 TROUBLESHOOTING

### Content wird nicht angezeigt?

**1. Collection Permissions prüfen:**

```
Dashboard → CMS → SiteContent → Permissions
→ "Site members (read)"
```

**2. Element IDs prüfen:**

```
Vibe Editor → Element auswählen → Properties Panel → ID
→ Muss matchen: #heroTitle, #pageTitle, #faqRepeater
```

**3. Console Errors:**

```javascript
// In Browser Console testen:
await wixData.query('SiteContent').eq('contentKey', 'home').find();
```

### Vibe AI generiert falsche Struktur?

**→ AI-Prompt präzisieren:**

```
"Erstelle eine Page mit EXAKTEN Element-IDs:
- #heroTitle (Text)
- #heroSubline (Text)
- #heroCTA (Button)
- #faqRepeater (Repeater mit #faqQuestion + #faqAnswer)"
```

---

## 📚 RESSOURCEN

- **Alle Velo Codes:** [/velo/](https://github.com/cherinodiaz-lang/energievergleichnrw/tree/main/velo)
- **Detaillierte Anleitung:** [VIBE-IMPLEMENTATION.md](https://github.com/cherinodiaz-lang/energievergleichnrw/blob/main/VIBE-IMPLEMENTATION.md)
- **Deployment Guide:** [DEPLOYMENT-GUIDE.md](https://github.com/cherinodiaz-lang/energievergleichnrw/blob/main/DEPLOYMENT-GUIDE.md)

---

**🎉 READY TO GO!**  
Alles vorbereitet – jetzt nur noch Pages erstellen und live schalten!

**Last Updated:** 04.03.2026, 18:20 CET
