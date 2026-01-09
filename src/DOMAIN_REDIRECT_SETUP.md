# Domain Redirect Setup Guide
## energievergleich.nrw as Primary Domain with energievergleich.shop Redirect

**Last Updated:** January 9, 2026  
**Status:** Ready for Implementation

---

## 🎯 Objective

Set **energievergleich.nrw** as the primary domain and redirect **energievergleich.shop** to it with a 301 permanent redirect, ensuring only energievergleich.nrw is indexed by search engines.

---

## ✅ Current Configuration Status

### Code-Level Configuration
- ✅ **SEO Config**: Primary domain set to `energievergleich.nrw`
- ✅ **Canonical URLs**: All pages use `https://energievergleich.nrw`
- ✅ **Robots.txt**: References `energievergleich.nrw` only
- ✅ **Sitemap.xml**: All URLs point to `energievergleich.nrw`
- ✅ **SEO Head Component**: Generates canonical tags for `energievergleich.nrw`

### What Still Needs Configuration
- ⚠️ **Wix Domain Settings**: Set primary domain and configure redirect
- ⚠️ **Google Search Console**: Configure preferred domain
- ⚠️ **Google Analytics**: Update domain tracking

---

## 📋 Step-by-Step Implementation

### Step 1: Configure Domains in Wix Dashboard

#### 1.1 Set Primary Domain
1. Log in to Wix Dashboard
2. Go to **Settings** → **Domains & URLs**
3. Find **energievergleich.nrw**
4. Click the **three-dot menu** next to it
5. Select **"Set as Primary Domain"**
6. Confirm the action

#### 1.2 Configure Domain Redirect
1. In **Domains & URLs**, look for **energievergleich.shop**
2. If not listed, click **"Connect Domain"** and add it
3. Once added, click the **three-dot menu** next to energievergleich.shop
4. Select **"Redirect to Another Domain"**
5. Choose **energievergleich.nrw** as the target
6. Ensure the redirect type is **301 (Permanent Redirect)**
7. Save the configuration

#### 1.3 Verify SSL/HTTPS
- Ensure both domains have valid SSL certificates
- Both should show a **green lock icon** in the browser
- Wix typically handles this automatically

---

### Step 2: Configure Google Search Console

#### 2.1 Add Both Domains as Properties
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **"Add Property"**
3. Add **https://energievergleich.nrw** (if not already added)
4. Add **https://energievergleich.shop** (if not already added)
5. Verify ownership for both domains

#### 2.2 Set Preferred Domain
1. In the **energievergleich.nrw** property:
   - Go to **Settings** → **Preferred Domain**
   - Select **"Include www"** or **"Don't include www"** (choose one)
   - Save

2. In the **energievergleich.shop** property:
   - Go to **Settings** → **Crawl Stats**
   - Monitor for any crawl errors
   - After 2-4 weeks, you can remove this property

#### 2.3 Submit Sitemap
1. In the **energievergleich.nrw** property:
   - Go to **Sitemaps**
   - Click **"Add/Test Sitemap"**
   - Enter: `https://energievergleich.nrw/sitemap.xml`
   - Click **"Submit"**

#### 2.4 Monitor Redirect
1. Go to **Coverage** in the energievergleich.nrw property
2. Look for redirect notices
3. Verify that Google recognizes the 301 redirect from energievergleich.shop

---

### Step 3: Configure Google Analytics

#### 3.1 Update GA4 Property Settings
1. Go to [Google Analytics](https://analytics.google.com)
2. Select your GA4 property
3. Go to **Admin** → **Data Streams**
4. Click on your web data stream
5. Verify the domain is set to **energievergleich.nrw**

#### 3.2 Update Referral Exclusion List (Optional)
1. Go to **Admin** → **Data Settings** → **Referral Exclusion List**
2. Add **energievergleich.shop** to exclude it from referral traffic
3. This prevents internal redirects from being counted as referral traffic

---

### Step 4: Update Application Configuration

The following files are already configured correctly:

#### `/src/lib/seo-config.ts`
```typescript
export const SEO_CONFIG = {
  siteName: 'energievergleich.nrw',
  siteUrl: 'https://energievergleich.nrw',
  // ... rest of config
};
```

#### `/src/lib/seo-redirects.ts`
```typescript
export function getCanonicalUrl(pathname: string): string {
  const baseUrl = 'https://energievergleich.nrw';
  return `${baseUrl}${pathname}`;
}
```

#### `/src/public/robots.txt`
```
Sitemap: https://energievergleich.nrw/sitemap.xml
```

#### `/src/public/sitemap.xml`
All URLs reference `https://energievergleich.nrw/`

#### `/src/components/SEOHead.tsx`
Generates canonical tags pointing to `energievergleich.nrw`

---

## 🔍 Verification Checklist

### Before Going Live
- [ ] Primary domain set to energievergleich.nrw in Wix
- [ ] 301 redirect configured from energievergleich.shop to energievergleich.nrw
- [ ] Both domains have valid SSL certificates
- [ ] robots.txt references energievergleich.nrw
- [ ] sitemap.xml references energievergleich.nrw
- [ ] Canonical tags point to energievergleich.nrw
- [ ] Google Search Console has both properties added
- [ ] Preferred domain set in GSC
- [ ] Sitemap submitted to GSC for energievergleich.nrw

### After Going Live (2-4 Weeks)
- [ ] Google Search Console shows 301 redirects recognized
- [ ] energievergleich.nrw appears in search results
- [ ] energievergleich.shop traffic redirects properly
- [ ] No duplicate content warnings in GSC
- [ ] Analytics shows traffic from energievergleich.nrw
- [ ] No crawl errors in GSC

---

## 📊 Expected Timeline

| Phase | Timeline | Action |
|-------|----------|--------|
| **Configuration** | Day 1 | Set up Wix domains and GSC |
| **Propagation** | Days 2-7 | DNS propagation and Google crawl |
| **Indexing** | Days 7-14 | Google re-indexes energievergleich.nrw |
| **Consolidation** | Weeks 2-4 | Old domain traffic fully redirects |
| **Cleanup** | Week 4+ | Can remove energievergleich.shop from GSC |

---

## 🚨 Important Notes

### SEO Impact
- **Positive**: Consolidates domain authority to single domain
- **Temporary**: May see slight traffic dip during transition (1-2 weeks)
- **Recovery**: Traffic typically recovers within 2-4 weeks
- **Long-term**: Stronger SEO performance with single canonical domain

### Redirect Type
- **301 Permanent Redirect**: Tells search engines the move is permanent
- **Passes Authority**: 90-99% of link juice transfers to new domain
- **Updates Index**: Google will update its index to reflect the change

### Monitoring
- Check GSC daily for the first week
- Monitor Analytics for traffic patterns
- Watch for crawl errors in GSC
- Verify redirect is working: `curl -I https://energievergleich.shop`

---

## 🔧 Troubleshooting

### Issue: Redirect Not Working
**Solution:**
1. Clear browser cache
2. Check Wix domain settings again
3. Wait 24-48 hours for DNS propagation
4. Test with: `curl -I https://energievergleich.shop`

### Issue: GSC Shows Duplicate Content
**Solution:**
1. Ensure 301 redirect is properly configured
2. Submit sitemap for energievergleich.nrw only
3. Set preferred domain in GSC
4. Wait 1-2 weeks for Google to re-crawl

### Issue: Traffic Drop After Redirect
**Solution:**
1. This is normal for 1-2 weeks
2. Verify redirect is working
3. Check GSC for crawl errors
4. Monitor Analytics for traffic recovery
5. Contact Google Search Console support if issue persists

---

## 📞 Support Resources

- **Wix Support**: https://support.wix.com/en/article/connecting-a-domain
- **Google Search Console Help**: https://support.google.com/webmasters
- **Google Analytics Help**: https://support.google.com/analytics
- **SEO Best Practices**: https://developers.google.com/search/docs

---

## ✨ Summary

Your application is **fully configured** for the domain redirect. All code-level settings are correct. You only need to:

1. ✅ Set energievergleich.nrw as primary domain in Wix
2. ✅ Configure 301 redirect from energievergleich.shop in Wix
3. ✅ Update Google Search Console settings
4. ✅ Monitor the transition

The redirect will ensure that:
- All traffic from energievergleich.shop goes to energievergleich.nrw
- Search engines recognize this as a permanent move
- Only energievergleich.nrw appears in search results
- Domain authority consolidates to the primary domain

**Status**: Ready for Wix configuration ✅
