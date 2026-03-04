# 🎨 Open Graph Image Export Instructions

Das OG-Image `og-image.svg` muss noch zu JPG exportiert werden für optimale Social Media Performance.

## ✅ Export-Optionen

### Option 1: Figma (Empfohlen)
1. SVG in Figma importieren
2. Frame auf 1200×630 px setzen
3. Export → JPG mit 85% Qualität
4. Datei als `og-image.jpg` speichern

### Option 2: Canva
1. SVG in Canva hochladen
2. Als JPG downloaden (Qualität: Hoch)
3. Datei als `og-image.jpg` speichern

### Option 3: CLI (Sharp)
```bash
cd public
npx sharp-cli --input og-image.svg --output og-image.jpg --jpeg-quality 85
```

## 📋 Nach Export

1. `og-image.jpg` nach `public/` kopieren
2. `og-image.svg` löschen
3. Datei-Größe prüfen: Sollte < 300 KB sein
4. Commit + Push:

```bash
git add public/og-image.jpg
git rm public/og-image.svg
git commit -m "feat: add exported OG image (JPG)"
git push
```

## ✅ Verifizierung

### Meta Tags prüfen:
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- Facebook Debugger: https://developers.facebook.com/tools/debug/
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

### Lighthouse SEO:
```bash
npx lighthouse https://energievergleich.shop --only-categories=seo --view
```

**Expected Result:** 100/100 SEO Score ✅
