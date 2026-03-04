# ⚡ energievergleich.shop

**Transparente Energie-Vergleichsplattform für NRW**  
👉 **Status:** ✅ Production-Ready | Wix + GitHub Sync abgeschlossen

---

## 🎯 Projektübersicht

**energievergleich.shop** ist eine nutzerfreundliche Plattform zum Vergleich von:
- ⚡ **Stromtarifen** in NRW
- 🔥 **Gastarifen** in NRW
- ☀️ **Photovoltaik-Angeboten** (Dach-Check bis Angebotsvergleich)
- 🏭 **Gewerbestrom** (Leistungspreis + Arbeitspreis)

### ✨ Besonderheiten
- **WCAG 2.1 AA-konform** (Barrierefreiheit)
- **DSGVO-compliant** (neutrale Cookie-Consent nach Art. 7)
- **SEO-optimiert** (Schema.org Structured Data)
- **Performance-optimiert** (Preconnect, Minified CSS)
- **CMS-driven** (Wix Data API + Dynamic Content)

---

## 🚀 Quick Start

### 1. Wix Site öffnen
```bash
https://manage.wix.com/dashboard/52dd1482-1ebb-4472-90a2-bce2af5d763f
```

### 2. Pages erstellen (Wix Editor)
Erstelle 7 Pages mit folgenden URLs:
- `/` (Home)
- `/stromvergleich-nrw`
- `/gasvergleich-nrw`
- `/photovoltaik-nrw`
- `/gewerbestrom`
- `/kontakt`
- `/ratgeber`

### 3. CMS Content einbinden
Füge in jede Page folgenden **Velo Code** ein:

```javascript
import wixData from 'wix-data';

$w.onReady(async () => {
  // Content Key = Page URL ohne /
  const pageKey = window.location.pathname.replace('/', '') || 'home';
  
  const result = await wixData.query('SiteContent')
    .eq('contentKey', pageKey)
    .find();
  
  if (result.items.length > 0) {
    const content = result.items[0].contentData;
    
    // Daten in UI binden
    $w('#pageTitle').text = content.hero?.h1 || content.h1;
    $w('#pageSubline').text = content.hero?.subline || content.subline;
    // ... weitere Bindings
  }
});
```

### 4. Site veröffentlichen
Wix Editor → **Publish** Button (oben rechts)

---

## 📚 Dokumentation

### Haupt-Dokumente
- **[DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)** → Vollständige Deployment-Anleitung mit allen IDs
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** → System-Architektur & Datenmodell
- **[content/de/](./content/de/)** → Alle JSON Content-Dateien

### Design System
- **[src/styles/design-system/](./src/styles/design-system/)** → Tokens, Buttons, Forms
- **[src/components/](./src/components/)** → Cookie-Banner, Navigation

---

## 🛠️ Technologie-Stack

### Frontend
- **Wix Editor** (Visual Page Builder)
- **Velo by Wix** (JavaScript Backend/Frontend)
- **Wix Data API** (CMS Content Management)

### Backend/CMS
- **Wix CMS** (Collection: `SiteContent`)
- **Custom Embeds** (9 Embeds für CSS/JS/Analytics)

### Design & Compliance
- **CSS Custom Properties** (Design Tokens)
- **WCAG 2.1 AA** (Accessibility)
- **DSGVO Art. 7** (Cookie-Consent)
- **Schema.org JSON-LD** (SEO)

---

## 📊 CMS Content Structure

### Collection: `SiteContent`

| Field | Type | Beschreibung |
|-------|------|-------------|
| `contentKey` | TEXT | Unique identifier (z.B. `home`, `stromvergleich-nrw`) |
| `contentType` | TEXT | Typ (z.B. `page`, `global`) |
| `contentData` | OBJECT | JSON mit Hero, Sections, FAQ, etc. |

**Beispiel-Query:**
```javascript
const result = await wixData.query('SiteContent')
  .eq('contentKey', 'home')
  .find();

const content = result.items[0].contentData;
console.log(content.hero.h1); // "Energievergleich in NRW"
```

---

## ✅ Features

### ♻️ Accessibility (WCAG 2.1 AA)
- ✅ Focus Visible (2.4.7): 3px outline mit 2px offset
- ✅ Target Size (2.5.8): Min. 44x44px für alle Buttons
- ✅ Error Identification (3.3.1): Farbige Labels + Fehlermeldungen
- ✅ Color Contrast: AA-konform (4.5:1)

### 🔒 Datenschutz (DSGVO)
- ✅ Neutrale Cookie-Buttons (kein Nudging)
- ✅ Transparente Datenschutzhinweise
- ✅ Widerrufsmöglichkeit (Settings Icon)
- ✅ localStorage Consent Management

### 📈 SEO
- ✅ Open Graph Tags (Social Sharing)
- ✅ Structured Data (WebSite, BreadcrumbList)
- ✅ Canonical URLs
- ✅ Responsive Viewport Meta

### ⚡ Performance
- ✅ Minified CSS (alle Embeds)
- ✅ Preconnect zu fonts.gstatic.com
- ✅ DNS-Prefetch zu static.wixstatic.com
- ✅ Load-once Strategy

---

## 📝 Content Management

### Content aktualisieren

**Option 1: GitHub (Source of Truth)**
1. JSON-Datei in `content/de/pages/` bearbeiten
2. Commit + Push
3. Wix CMS manuell aktualisieren (siehe DEPLOYMENT-GUIDE.md)

**Option 2: Direkt in Wix CMS**
1. Wix Dashboard → CMS → `SiteContent`
2. Item auswählen → `contentData` bearbeiten
3. Save

**💡 Empfehlung:** GitHub als Single Source of Truth nutzen!

---

## 🐛 Troubleshooting

### Content wird nicht angezeigt?
```javascript
// Browser Console:
window.addEventListener('cms-content-loaded', (e) => {
  console.log('Content geladen:', e.detail);
});
```

### Cookie-Banner fehlt?
1. Browser-Cookies löschen
2. Wix Dashboard → Settings → Custom Code → Embed `d5b97dfa-...` prüfen

### Analytics laden nicht?
```javascript
// Cookie-Consent prüfen:
console.log(document.cookie); // Muss "cookie_consent=all" enthalten
```

---

## 📞 Support & Kontakt

- **GitHub Issues:** [energievergleichnrw/issues](https://github.com/cherinodiaz-lang/energievergleichnrw/issues)
- **Wix Support:** [support.wix.com](https://support.wix.com)
- **DSGVO-Fragen:** Datenschutzbeauftragten kontaktieren

---

## 📄 Lizenz

© 2026 energievergleich.shop - Alle Rechte vorbehalten

---

## 🎉 Status

**✅ GitHub → Wix Sync:** 100% Complete  
**✅ CMS Content:** 8/8 Items importiert  
**✅ Design System:** CSS Tokens + Components  
**✅ DSGVO:** Cookie-Banner + Analytics-Gating  
**✅ SEO:** Meta Tags + Structured Data  
**✅ Accessibility:** WCAG 2.1 AA  

**🚀 Ready for Production!**

---

**Last Updated:** 04.03.2026, 18:10 CET
