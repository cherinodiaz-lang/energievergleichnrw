# Domain Redirect Setup Guide
## www.energievergleich.shop as Primary Domain (with non-www + energievergleich.nrw redirect)

**Last Updated:** February 21, 2026  
**Status:** Ready for Implementation

---

## 🎯 Objective

Set **https://www.energievergleich.shop** as the *primary* domain and redirect:

- `https://energievergleich.shop/*` → `https://www.energievergleich.shop/*` (301)
- `https://energievergleich.nrw/*` → `https://www.energievergleich.shop/*` (301)

This ensures only the **www** domain is indexed and avoids duplicate-content signals.

---

## ✅ Current Configuration Status

### Code-Level Configuration
- ✅ **Canonical URLs**: Canonical tags are generated with a preferred production origin (`https://www.energievergleich.shop`) and keep preview/staging origins intact.
- ✅ **Robots.txt**: Served dynamically via `/robots.txt` and includes a `Sitemap:` line.
- ✅ **Sitemap.xml**: Served dynamically via `/sitemap.xml` and generates absolute `<loc>` URLs based on request origin.

### What Still Needs Configuration
- ⚠️ **Wix Domain Settings**: Set primary domain and configure 301 redirects (domain-level)
- ⚠️ **Google Search Console**: Add/verify properties and submit sitemap
- ⚠️ **Google Analytics**: Ensure GA4 stream is aligned to the primary domain

---

## 📋 Step-by-Step Implementation

### Step 1: Configure Domains in Wix Dashboard

#### 1.1 Set Primary Domain
1. Log in to Wix Dashboard
2. Go to **Settings** → **Domains & URLs**
3. Find **www.energievergleich.shop** (or energievergleich.shop with www option)
4. Click the **three-dot menu** next to it
5. Select **"Set as Primary Domain"**
6. Confirm

#### 1.2 Redirect non-www to www (301)
1. In **Domains & URLs**, locate **energievergleich.shop** (non-www)
2. Click the **three-dot menu**
3. Select **"Redirect to Another Domain"**
4. Target: **https://www.energievergleich.shop**
5. Redirect type: **301 (Permanent Redirect)**
6. Save

#### 1.3 Redirect energievergleich.nrw to www (301)
1. In **Domains & URLs**, locate **energievergleich.nrw**
2. If not listed, click **"Connect Domain"** and add it
3. Click the **three-dot menu**
4. Select **"Redirect to Another Domain"**
5. Target: **https://www.energievergleich.shop**
6. Redirect type: **301 (Permanent Redirect)**
7. Save

#### 1.4 Verify SSL/HTTPS
- Ensure SSL is active for all connected domains
- Wix typically provisions certificates automatically

---

### Step 2: Google Search Console

#### 2.1 Add properties
Add and verify:
- `https://www.energievergleich.shop`
- `https://energievergleich.shop`
- `https://energievergleich.nrw`

#### 2.2 Submit sitemap (primary only)
Submit:
- `https://www.energievergleich.shop/sitemap.xml`

---

## 🔍 Verification Checklist

### Technical tests
```bash
# Expect 301/308 to www
curl -I https://energievergleich.shop
curl -I https://energievergleich.nrw

# Expect robots to include sitemap line
curl -s https://www.energievergleich.shop/robots.txt | grep -i sitemap

# Expect sitemap to return XML
curl -I https://www.energievergleich.shop/sitemap.xml
```

---

## ✨ Summary

Everything in the codebase is aligned to support a single primary domain.
The only remaining work is the **Wix dashboard domain redirect configuration** + GSC submission.
