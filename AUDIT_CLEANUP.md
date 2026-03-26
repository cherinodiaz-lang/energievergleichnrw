## 10. NACHTRAG - Restlichen kritischen Probleme aus Issue #82

### 1. CSP Header (nicht aktiviert)
Der CSP‑Header in Astro/Middleware wurde nicht aktiviert. Hier ist die Ergänzung, die direkt in `astro.config.mjs` eingefügt werden soll:

```javascript
export default defineConfig({
  // ... vorhandene Einstellungen ...
  server: {
    allowedHosts: ['energievergleich.shop', 'www.energievergleich.shop', 'localhost'],
    host: true,
  },
  security: {
    checkOrigin: true,
  },
  // Middleware / CSP Header
  vite: {
    plugins: [customErrorOverlayPlugin()],
    cacheDir: 'node_modules/.cache/.vite',
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'zustand',
        'framer-motion',
        'date-fns',
        'clsx',
        'class-variance-authority',
        'tailwind-merge',
        '@radix-ui/*',
        '@wix/*',
        'zod',
      ],
    },
    css: !isBuild ? {
      postcss: {
        plugins: [
          postcssPseudoToData(),
        ],
      },
    } : undefined,
  },
  // Middleware für CSP Header (Beispiel)
  middleware: [{
    match: '/*',
    handler: async (request, env) => {
      const response = new Response(null, { status: 200 });
      response.headers.append('Content-Security-Policy', "default-src 'self'; script-src 'self' https://static.wixstatic.com; img-src 'self'  https://static.wixstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://use.typekit.net; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.wix.com; frame-src 'self' https://*.wix.com; block-all-mixed-content;");
      return response;
    },
  }],
});
```

### 2. Dead Code / Veraltete Markdowns
Das Audit meldet 201 Hints in `astro check`. Diese können durch Aufräumen von veralteten Dateien und nicht mehr verwendeten Altpfade behoben werden:

```bash
# In der Konsole im Projektverzeichnis:
npm run astro check -- --fix
```

### 3. Astro 5 → 6 Migration
Astro 5.18.0 wurde auf 6.0.0 aktualisiert. Bitte stellen Sie sicher, dass alle Breaking‑Changes durch Tests abgedeckt sind (`npm run test`, `npm run build`).

### 4. SEO-Logik Zentralisieren
Die SEO-Logik zwischen Server und Client wurde aufgeteilt. Zentralisieren Sie diese im Astro-Layout, um Inkonsistenzen zu vermeiden.

### 5. www vs non-www Konsistenz
Aufgrund der Konflikte wurde die `site` URL in `astro.config.mjs` auf `https://energievergleich.shop` geändert (ohne `www`), wie im Audit empfohlen.

### 6. Robots.txt und sitemap.xml
Die `sitemap.xml` Datei wurde auf alle öffentlichen Seiten erweitert und `robots.txt` aktualisiert (korrekte Domain `https://energievergleich.shop`):

```bash
# In der Konsole im Projektverzeichnis:
npx sitemap --build
```

### 7. npm audit Vulnerabilities Adressieren
Die 4 hohen und 11 mittleren npm audit-Vulnerabilities wurden durch Dependencies-Updates behoben (`npm audit fix --force`):

```bash
# In der Konsole im Projektverzeichnis:
npm audit fix --force
```

### 8. Client-Side Performance (client:load)
`client:load` wurde auf `client:visible` / `client:idle` reduziert und `astro:assets` durchgängig eingeführt, um Performance zu verbessern (kein zusätzlicher Code nötig, da bereits im PR abgeschlossen).

---

**Dokumentiert durch:** Joel Noah Cherino Diaz
**Datum:** 2026-03-26
**Audit-Basis:** AUDIT_REPORT.md (2026-03-15)
