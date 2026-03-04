# Design-System Implementation Guide

## 🎨 **Overview**

Dieses Design-System basiert auf dem **Design-Audit für energievergleich.shop** und implementiert:

- ✅ **WCAG 2.1 AA Compliance** (Kontrast, Focus, Error Identification)
- ✅ **Performance-Optimierung** (CSS Variables, Minimal Bundle Size)
- ✅ **Responsive Design** (Mobile-First, Fluid Typography)
- ✅ **Accessibility** (Skip Links, ARIA, Keyboard Navigation)

---

## 📚 **File Structure**

```
src/styles/
├── tokens.css              # Design Tokens (Colors, Spacing, Typography)
├── components/
│   ├── buttons.css        # Button Styles (Primary, Secondary, Ghost)
│   ├── forms.css          # Form Fields (Input, Select, Textarea, Error States)
│   ├── card.css           # Card Component
│   └── skip-link.css      # Skip Link (WCAG Bypass Blocks)
└── global.css             # Global Imports
```

---

## 🔧 **Usage in Astro**

### **1. Import in `BaseLayout.astro`**

```astro
---
import '@/styles/tokens.css';
import '@/styles/components/buttons.css';
import '@/styles/components/forms.css';
import '@/styles/components/card.css';
import '@/styles/components/skip-link.css';
---
```

### **2. Button Example**

```html
<a href="/stromvergleich-nrw" class="btn btn-primary">
  Jetzt Tarif prüfen
</a>

<button class="btn btn-secondary" type="button">
  Mehr erfahren
</button>
```

### **3. Form Example (WCAG-compliant)**

```html
<div class="field">
  <label class="label" for="zip" data-required="true">
    Postleitzahl (PLZ)
  </label>
  <input 
    class="input" 
    id="zip" 
    name="zip" 
    type="text"
    inputmode="numeric"
    autocomplete="postal-code"
    placeholder="z. B. 45127"
    required
    aria-describedby="zip-help zip-error"
  />
  <p class="help" id="zip-help">
    Wir nutzen die PLZ, um regionale Preisbestandteile zu berücksichtigen.
  </p>
  <!-- Error State (only shown on validation) -->
  <p class="error" id="zip-error" role="alert" hidden>
    Bitte gib eine 5-stellige deutsche PLZ ein.
  </p>
</div>
```

### **4. Card Grid Example**

```html
<div class="grid-3">
  <div class="card">
    <p class="card-title">Preisbestandteile</p>
    <p class="card-text">
      Arbeitspreis, Grundpreis und regionale Bestandteile verständlich erklärt.
    </p>
  </div>
  
  <div class="card">
    <p class="card-title">Laufzeit & Kündigung</p>
    <p class="card-text">
      Kurz und flexibel ist oft besser – wir zeigen dir die Stellschrauben.
    </p>
  </div>
  
  <div class="card">
    <p class="card-title">Bonus & Preisgarantie</p>
    <p class="card-text">
      Wir erklären Vor- und Nachteile, damit du sauber vergleichen kannst.
    </p>
  </div>
</div>
```

### **5. Skip Link Example**

```html
<a class="skip" href="#main">Zum Inhalt springen</a>

<header>
  <!-- Navigation -->
</header>

<main id="main">
  <!-- Content -->
</main>
```

---

## ✅ **WCAG Compliance Checklist**

### **Contrast (1.4.3)**
- ✅ Text: 4.5:1 minimum (`--text-900` on `--bg`)
- ✅ Large Text: 3:1 minimum (`--text-700` on `--bg`)
- ✅ Non-Text: 3:1 minimum (Buttons, Borders, Icons)

### **Focus Visible (2.4.7)**
- ✅ All interactive elements have visible focus state (`outline: 3px solid var(--focus)`)

### **Target Size (2.5.8)**
- ✅ All clickable elements: min 44px height/width

### **Error Identification (3.3.1)**
- ✅ Form errors are textual, not just color-coded
- ✅ Errors linked via `aria-describedby`

### **Bypass Blocks (2.4.1)**
- ✅ Skip link allows keyboard users to jump to main content

---

## 🚀 **Performance Optimizations**

### **CSS Variables**
- ✅ Centralized tokens for easy theming
- ✅ No runtime CSS-in-JS overhead

### **Minimal Bundle Size**
- ✅ Component-based CSS (tree-shakeable)
- ✅ No unused styles shipped

### **Responsive Images (Next Step)**
```html
<img 
  src="/images/hero.jpg" 
  srcset="/images/hero-400.jpg 400w, /images/hero-800.jpg 800w"
  sizes="(max-width: 600px) 400px, 800px"
  alt="Stromvergleich NRW"
  loading="lazy"
  width="800"
  height="600"
/>
```

---

## 📊 **Lighthouse Score Targets**

**Expected Results:**
- 🟢 **Performance:** 95+ (with image optimization)
- 🟢 **Accessibility:** 100
- 🟢 **Best Practices:** 100
- 🟢 **SEO:** 100

**Test Command:**
```bash
npx lighthouse https://energievergleich.shop --only-categories=accessibility,seo --view
```

---

## 📝 **Copy Integration**

Dieses Design-System ist bereit für die **Copy-Daten aus dem Audit-PDF**:

1. **Global Copy** (`content/de/global.json`)
2. **Page Copy** (`content/de/pages/*.json`)
3. **Template Copy** (`content/de/templates/*.json`)

**Next PR:** Ich erstelle die JSON-Struktur für alle Copy-Texte.

---

## ⚠️ **Browser Support**

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Fallback:** CSS Variables werden von allen modernen Browsern unterstützt (IE11 not supported).

---

## 🔗 **References**

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [BITV-Test](https://bik-fuer-alle.de/bitv-test.html)
- [Lighthouse CI](https://developer.chrome.com/docs/lighthouse/overview/)
- [axe-core](https://www.deque.com/axe/core-documentation/)

---

**Created by:** Perplexity AI  
**Based on:** Design-Audit energievergleich.shop (PDF)  
**Date:** 2026-03-04
