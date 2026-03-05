# 🤖 Automation Documentation

## Übersicht

Dieses Projekt ist **vollständig automatisiert** mit:

- ✅ **CI/CD Pipeline** - Auto-Build & Deploy
- ✅ **Dependabot** - Auto-Updates für Dependencies
- ✅ **Code Quality** - Auto-Linting & Formatting
- ✅ **Performance Monitoring** - Lighthouse CI
- ✅ **SEO Validation** - Auto-Checks
- ✅ **Wix Integration** - Auto-Sync

---

## 🚀 GitHub Actions Workflows

### 1. CI/CD Pipeline (`.github/workflows/ci-cd.yml`)

**Trigger:** Push zu `main` oder `develop`, Pull Requests

**Was passiert:**
- Checkout Code
- Install Dependencies
- Run Tests & Linting
- Build Project
- Deploy zu Production (bei Push zu `main`)
- Lighthouse Performance Check
- Security Scan

**Status Badge:**
```markdown
![CI/CD](https://github.com/cherinodiaz-lang/energievergleichnrw/actions/workflows/ci-cd.yml/badge.svg)
```

---

### 2. Code Quality (`.github/workflows/code-quality.yml`)

**Trigger:** Pull Requests, Push zu `main`/`develop`

**Was passiert:**
- ESLint Auto-Fix
- Prettier Auto-Format
- TypeScript Check
- Bundle Size Analysis
- Auto-Commit Fixes

---

### 3. Performance & SEO (`.github/workflows/performance-seo.yml`)

**Trigger:** Push zu `main`, Pull Requests, Täglich um 2:00 Uhr

**Was passiert:**
- Lighthouse CI für Hauptseiten
- SEO Meta-Tags Validation
- Sitemap Check
- Robots.txt Check
- Broken Links Check
- Image Size Validation

---

### 4. Wix Sync (`.github/workflows/wix-sync.yml`)

**Trigger:** Alle 6 Stunden, Manuell

**Was passiert:**
- Sync Form Submissions zu Wix CRM
- Sync Analytics Daten
- Update Wix Database

---

### 5. Dependency Review (`.github/workflows/dependency-review.yml`)

**Trigger:** Pull Requests

**Was passiert:**
- Check neue Dependencies auf Security Issues
- Comment Summary in PR
- Block bei kritischen Vulnerabilities

---

## 🔐 GitHub Secrets Setup

### Erforderliche Secrets:

Gehe zu: **Settings → Secrets and variables → Actions → New repository secret**

#### Wix Integration:
```bash
WIX_API_KEY=<dein_wix_api_key>
WIX_SITE_ID=<deine_wix_site_id>
WIX_ACCOUNT_ID=<deine_wix_account_id>
```

**So erhältst du die Keys:**
1. Gehe zu [Wix Developers](https://dev.wix.com/)
2. Erstelle eine App oder verwende bestehende
3. Kopiere API Key & Site ID

#### Security Scanning (Optional):
```bash
SNYK_TOKEN=<dein_snyk_token>
```

**So erhältst du Snyk Token:**
1. Registriere bei [Snyk.io](https://snyk.io/)
2. Gehe zu Account Settings → API Token
3. Kopiere Token

---

## 🤖 Dependabot Configuration

**File:** `.github/dependabot.yml`

**Features:**
- ✅ Wöchentliche Updates (Montag 04:00)
- ✅ Max 5 Open PRs
- ✅ Gruppierte Updates für Astro, React, UI
- ✅ Auto-Review Assignment
- ✅ Major Version Updates ignoriert für stabile Packages

**Verwendung:**
1. Dependabot erstellt automatisch PRs
2. Review die Changes
3. Merge wenn alles ok

---

## 🎨 Code Quality Tools

### Pre-Commit Hooks (Husky)

**Setup:**
```bash
npm install husky lint-staged --save-dev
npx husky install
```

**Was passiert beim Commit:**
- Auto-Lint geänderter Files
- Auto-Format mit Prettier
- TypeScript Check

### Manuelles Linting:
```bash
# Lint all files
npm run lint

# Auto-fix
npm run lint:fix

# Format with Prettier
npx prettier --write "**/*.{js,jsx,ts,tsx,astro,json,css,md}"
```

---

## 📊 Performance Monitoring

### Lighthouse CI

**Automatisch geprüft:**
- Performance Score
- Accessibility Score
- Best Practices Score
- SEO Score

**Thresholds:**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 95

**Reports verfügbar:**
- In GitHub Actions Artifacts
- Temporary Public Storage Link

---

## 🔗 Wix Integration

### Auto-Sync Features:

1. **Form Submissions**
   - Alle Formular-Daten werden zu Wix CRM gesynct
   - Alle 6 Stunden automatisch

2. **Analytics**
   - Page Views
   - Conversions
   - User Interactions

3. **Contact Management**
   - Neue Leads automatisch in Wix
   - Tagging & Segmentierung

### Manuelle Sync:
```bash
# Set environment variables
export WIX_API_KEY="your_key"
export WIX_SITE_ID="your_site_id"

# Run sync
node scripts/sync-wix.js
```

---

## 🐛 Troubleshooting

### Workflow schlägt fehl:

1. **Check Logs:**
   - Gehe zu Actions Tab
   - Klick auf fehlgeschlagene Workflow
   - Expand failed step

2. **Common Issues:**
   - Missing Secrets → Add in Settings
   - Build Errors → Check local build first
   - Permission Issues → Check token permissions

### Dependabot PRs:

1. **Zu viele PRs:**
   - Adjust `open-pull-requests-limit` in `.github/dependabot.yml`

2. **Major Updates blockiert:**
   - Check `ignore` section in dependabot.yml
   - Remove ignore für gewünschte updates

### Wix Sync Errors:

1. **Authentication Failed:**
   - Check `WIX_API_KEY` in Secrets
   - Verify Key ist aktiv in Wix Dashboard

2. **No Data Synced:**
   - Check `scripts/sync-wix.js` logic
   - Verify Wix Collections existieren

---

## 📝 Best Practices

### Commits:
- ✅ Use [Conventional Commits](https://www.conventionalcommits.org/)
- ✅ Example: `feat: add new feature`, `fix: bug fix`, `chore: update deps`

### PRs:
- ✅ Wait für alle Checks before merge
- ✅ Review Lighthouse scores
- ✅ Check Bundle size changes

### Dependencies:
- ✅ Review Dependabot PRs wöchentlich
- ✅ Group updates wo möglich
- ✅ Test nach major updates

---

## 🎯 Monitoring Dashboards

### GitHub Actions:
- **URL:** https://github.com/cherinodiaz-lang/energievergleichnrw/actions
- **View:** All workflows, success rates, run times

### Dependabot:
- **URL:** https://github.com/cherinodiaz-lang/energievergleichnrw/security/dependabot
- **View:** Open PRs, ignored updates, security alerts

### Insights:
- **URL:** https://github.com/cherinodiaz-lang/energievergleichnrw/pulse
- **View:** Activity, contributors, code frequency

---

## 🚀 Next Steps

1. **Add Secrets:**
   - Gehe zu Settings → Secrets
   - Add Wix & andere API Keys

2. **Review erste Workflows:**
   - Wait für ersten automatischen Run
   - Check ob alles grün ist

3. **Customize:**
   - Adjust Schedules in workflow files
   - Add custom checks
   - Configure Notifications

4. **Monitor:**
   - Check Actions Tab regelmäßig
   - Review Dependabot PRs
   - Watch Performance Trends

---

## 📚 Resources

- [GitHub Actions Docs](https://docs.github.com/actions)
- [Dependabot Docs](https://docs.github.com/code-security/dependabot)
- [Wix API Docs](https://dev.wix.com/docs/rest)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

---

**🎉 ALLES IST AUTOMATISIERT! LEHNE DICH ZURÜCK UND GENIEẞE! 🚀**
