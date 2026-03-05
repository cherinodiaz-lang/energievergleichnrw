# 🚀 Deployment Guide

## Voraussetzungen

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git
- Account bei Vercel/Netlify/Cloudflare (optional)

## 🔐 GitHub Secrets konfigurieren

Für die CI/CD Pipeline müssen folgende Secrets in GitHub konfiguriert werden:

### 1. GitHub Settings → Secrets and variables → Actions

```bash
# Lighthouse CI (Optional - für Performance Monitoring)
LHCI_GITHUB_APP_TOKEN=<your-token>

# Snyk Security Scanner (Optional - für Security Audits)
SNYK_TOKEN=<your-snyk-token>

# Deployment Token (abhängig vom Provider)
DEPLOY_TOKEN=<vercel-token|netlify-token|cloudflare-token>
VERCEL_TOKEN=<your-vercel-token>
NETLIFY_AUTH_TOKEN=<your-netlify-token>
```

### 2. Tokens generieren

#### Vercel Token:
```bash
1. Gehe zu https://vercel.com/account/tokens
2. Erstelle neuen Token
3. Kopiere und füge in GitHub Secrets ein
```

#### Netlify Token:
```bash
1. Gehe zu https://app.netlify.com/user/applications
2. New Access Token
3. Kopiere und füge in GitHub Secrets ein
```

#### Lighthouse CI Token:
```bash
1. Install: npm install -g @lhci/cli
2. Setup: lhci wizard
3. Folge den Anweisungen
```

## 📦 Deployment Optionen

### Option 1: Vercel (Empfohlen)

#### CLI Deployment:
```bash
# Vercel CLI installieren
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

#### GitHub Integration:
```bash
1. Gehe zu https://vercel.com/new
2. Import Git Repository
3. Wähle dein Repository
4. Configure:
   - Framework Preset: Astro
   - Build Command: npm run build
   - Output Directory: dist
5. Deploy
```

#### Umgebungsvariablen:
```bash
NODE_VERSION=18
PUBLIC_SITE_URL=https://energievergleichnrw.de
PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

### Option 2: Netlify

#### CLI Deployment:
```bash
# Netlify CLI installieren
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

#### netlify.toml erstellen:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

---

### Option 3: Cloudflare Pages

```bash
1. Gehe zu https://dash.cloudflare.com/
2. Pages → Create a project
3. Connect Git repository
4. Configure:
   - Build command: npm run build
   - Build output directory: dist
   - Environment variables:
     NODE_VERSION=18
5. Save and Deploy
```

---

### Option 4: Docker

#### Dockerfile erstellen:
```dockerfile
# Build Stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production Stage
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package*.json ./

RUN npm ci --production

EXPOSE 4321

CMD ["npm", "run", "preview"]
```

#### Build & Run:
```bash
# Image bauen
docker build -t energievergleichnrw .

# Container starten
docker run -p 4321:4321 energievergleichnrw

# Mit Docker Compose:
docker-compose up -d
```

---

## 🔍 Post-Deployment Checks

### 1. Lighthouse Audit
```bash
npm run build
npm run preview
# In neuem Terminal:
lighthouse http://localhost:4321 --view
```

### 2. Security Headers testen
```bash
curl -I https://energievergleichnrw.de
```

Überprüfe:
- ✅ Strict-Transport-Security
- ✅ X-Frame-Options
- ✅ X-Content-Type-Options
- ✅ Content-Security-Policy

### 3. PWA testen
```bash
# Chrome DevTools → Application → Manifest
# Chrome DevTools → Application → Service Workers
```

### 4. Performance testen
```bash
# PageSpeed Insights
https://pagespeed.web.dev/analysis?url=https://energievergleichnrw.de

# WebPageTest
https://www.webpagetest.org/
```

---

## 🔄 Continuous Deployment

### GitHub Actions

Die Pipeline läuft automatisch bei:
- Push zu `main` Branch → Production Deploy
- Push zu `develop` Branch → Staging Deploy
- Pull Requests → Preview Deploy

### Manual Deployment
```bash
# Triggere manuell über GitHub Actions UI:
Actions → CI/CD Pipeline → Run workflow
```

---

## 🐛 Troubleshooting

### Build fails auf Vercel/Netlify
```bash
# Lösung 1: Node Version checken
"engines": {
  "node": ">=18.0.0"
}

# Lösung 2: Build Command überprüfen
build = "npm run build"

# Lösung 3: Dependencies installieren
npm ci statt npm install
```

### Service Worker funktioniert nicht
```bash
# Stelle sicher:
- HTTPS ist aktiv
- sw.js ist im public/ Ordner
- Keine CSP-Blockierung
```

### Images laden nicht
```bash
# Sharp installation prüfen:
npm rebuild sharp

# Alternative: @astrojs/image nutzen
```

---

## 📊 Monitoring

### Performance Monitoring
- Google Analytics 4
- Vercel Analytics
- Cloudflare Web Analytics

### Error Tracking
- Sentry
- LogRocket
- Rollbar

### Uptime Monitoring
- UptimeRobot
- Pingdom
- StatusCake

---

## 🔒 Security Best Practices

1. **Environment Variables niemals committen**
2. **Secrets in GitHub Actions verwenden**
3. **CSP Headers korrekt konfigurieren**
4. **HTTPS erzwingen**
5. **Dependencies regelmäßig updaten**

```bash
# Security Audit
npm audit
npm audit fix

# Dependencies updaten
npm update
```

---

## ✅ Pre-Launch Checklist

- [ ] Lighthouse Score > 95
- [ ] Security Headers konfiguriert
- [ ] PWA installierbar
- [ ] SEO Meta Tags vollständig
- [ ] Analytics konfiguriert
- [ ] Error Tracking aktiv
- [ ] Sitemap.xml generiert
- [ ] robots.txt konfiguriert
- [ ] 404 & 500 Pages erstellt
- [ ] Favicon & Icons vorhanden
- [ ] SSL Zertifikat aktiv
- [ ] DNS korrekt konfiguriert

---

**Deployment erfolgreich?** 🎉

Überprüfe deine Seite:
- https://energievergleichnrw.de
- https://pagespeed.web.dev/
- https://observatory.mozilla.org/
