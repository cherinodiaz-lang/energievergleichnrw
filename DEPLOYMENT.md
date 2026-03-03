# Deployment Guide

## Vercel Deployment (Recommended)

### Prerequisites

- GitHub account
- Vercel account
- Repository access

### Automatic Deployment

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import repository: `cherinodiaz-lang/energievergleichnrw`

2. **Configure Project**
   ```
   Framework Preset: Astro
   Root Directory: ./
   Build Command: npm run build
   Output Directory: dist
   ```

3. **Environment Variables**
   ```env
   PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   PUBLIC_SITE_URL=https://energievergleich-nrw.de
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Access preview URL

### Continuous Deployment

Every push to `main` triggers automatic deployment:

```bash
git push origin main
# Vercel automatically deploys
```

### Preview Deployments

Every pull request gets a preview deployment:

```bash
git checkout -b feature/new-feature
git push origin feature/new-feature
# Create PR → Vercel creates preview
```

## Environment Variables

### Required

```env
# Google Analytics
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Site Configuration
PUBLIC_SITE_URL=https://energievergleich-nrw.de
```

### Optional

```env
# API Keys (if needed)
API_KEY=your-api-key

# Database (if needed)
DATABASE_URL=your-database-url

# Email Service (if needed)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASSWORD=password
```

## Build Process

### Local Build

```bash
npm run build
npm run preview
```

### Production Build

```bash
NODE_ENV=production npm run build
```

### Verify Build

1. Check bundle sizes:
   ```bash
   npm run build
   # Check dist/ folder size
   ```

2. Test production build:
   ```bash
   npm run preview
   # Open http://localhost:4321
   ```

3. Run Lighthouse:
   ```bash
   npx lighthouse http://localhost:4321 --view
   ```

## Domain Configuration

### Add Custom Domain

1. Go to Vercel Project Settings
2. Click "Domains"
3. Add domain: `energievergleich-nrw.de`
4. Configure DNS:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### SSL Certificate

Vercel automatically provisions SSL certificates.

## Performance Optimization

### Edge Functions

Enabled by default with `@astrojs/vercel/serverless`.

### Image Optimization

```javascript
adapter: vercel({
  imageService: true
})
```

### Analytics

```javascript
adapter: vercel({
  webAnalytics: { enabled: true },
  speedInsights: { enabled: true }
})
```

## Monitoring

### Vercel Analytics

- Web Analytics: Enabled
- Speed Insights: Enabled
- Access in Vercel Dashboard

### Error Tracking

Integrate Sentry (optional):

```bash
npm install @sentry/astro
```

```javascript
// astro.config.mjs
import sentry from '@sentry/astro';

export default defineConfig({
  integrations: [
    sentry({
      dsn: process.env.SENTRY_DSN
    })
  ]
});
```

## Rollback

### Via Vercel Dashboard

1. Go to Deployments
2. Find previous deployment
3. Click "..." → "Promote to Production"

### Via CLI

```bash
vercel rollback
```

## Health Checks

### Endpoint

`GET /api/health`

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-03-03T22:00:00.000Z",
  "version": "1.0.0",
  "uptime": 12345
}
```

### Monitoring

Set up uptime monitoring:
- UptimeRobot
- Pingdom
- StatusPage

## Troubleshooting

### Build Fails

1. Check build logs in Vercel
2. Verify dependencies:
   ```bash
   npm install
   npm run build
   ```

### 404 Errors

1. Check routing configuration
2. Verify file structure
3. Check `vercel.json` redirects

### Performance Issues

1. Run Lighthouse audit
2. Check bundle sizes
3. Verify image optimization
4. Review Core Web Vitals

## Checklist

- [ ] Repository connected to Vercel
- [ ] Environment variables configured
- [ ] Custom domain added
- [ ] SSL certificate active
- [ ] Analytics enabled
- [ ] Health check endpoint working
- [ ] Performance targets met
- [ ] Error tracking configured
- [ ] Monitoring set up
- [ ] Rollback tested
