> Statushinweis: Historisches Arbeitsdokument. Nicht als Source of Truth verwenden. Maßgeblich sind README.md, package.json, astro.config.mjs, src/lib/seo-config.ts, wix.config.json und die aktuellen dist-Artefakte.

# DOMAIN REDIRECT SETUP GUIDE
## energievergleich.nrw → energievergleich.shop (301 Redirect)

**Objective:** Configure Wix Dashboard to redirect all traffic from `energievergleich.nrw` to `https://www.energievergleich.shop` with 301 (permanent) redirects.

---

## PROBLEM STATEMENT

Currently: `energievergleich.nrw` returns 404 instead of 301 redirect
Goal: `https://energievergleich.nrw/` → `https://www.energievergleich.shop/` (1 hop)

---

## SOLUTION: WIX DASHBOARD CONFIGURATION

### STEP 1: Set Primary Domain

**Path in Wix Dashboard:**
```
Dashboard → Settings → Domains → Primary Domain
```

**Action:**
1. Click **"Settings"** in left sidebar
2. Select **"Domains"**
3. Under **"Primary Domain"**, select: `www.energievergleich.shop`
4. Click **"Save"**

**Result:** `https://www.energievergleich.shop` becomes the canonical domain

---

### STEP 2: Add Parked Domain with 301 Redirect

**Path in Wix Dashboard:**
```
Dashboard → Settings → Domains → Add Domain
```

**Action:**
1. Click **"Add Domain"** button
2. Select **"I already own this domain"**
3. Enter domain: `energievergleich.nrw`
4. Click **"Next"**
5. Complete domain verification (DNS records)
6. Once verified, select **"Redirect this domain"**
7. Choose redirect type: **"Permanent (301)"**
8. Enter target: `https://www.energievergleich.shop`
9. Click **"Save"**

**Result:** All traffic to `energievergleich.nrw` → 301 redirects to `www.energievergleich.shop`

---

### STEP 3: Add Non-WWW Domain with 301 Redirect (Optional but Recommended)

**Path in Wix Dashboard:**
```
Dashboard → Settings → Domains → Add Domain
```

**Action:**
1. Click **"Add Domain"** button
2. Select **"I already own this domain"**
3. Enter domain: `energievergleich.shop` (without www)
4. Click **"Next"**
5. Complete domain verification
6. Once verified, select **"Redirect this domain"**
7. Choose redirect type: **"Permanent (301)"**
8. Enter target: `https://www.energievergleich.shop` (with www)
9. Click **"Save"**

**Result:** `energievergleich.shop` → 301 redirects to `www.energievergleich.shop`

---

## VERIFICATION STEPS

### Test 1: Check .nrw Domain Redirect

**Command (Terminal/PowerShell):**
```bash
curl -I https://energievergleich.nrw/
```

**Expected Output:**
```
HTTP/2 301
Location: https://www.energievergleich.shop/
```

**What to look for:**
- ✅ Status: `301` (not 404, not 302)
- ✅ Location header: `https://www.energievergleich.shop/`

---

### Test 2: Check Non-WWW Domain Redirect

**Command (Terminal/PowerShell):**
```bash
curl -I https://energievergleich.shop/
```

**Expected Output:**
```
HTTP/2 301
Location: https://www.energievergleich.shop/
```

**What to look for:**
- ✅ Status: `301`
- ✅ Location header: `https://www.energievergleich.shop/`

---

### Test 3: Check Subpath Redirect (Optional)

**Command (Terminal/PowerShell):**
```bash
curl -I https://energievergleich.nrw/stromvergleich-nrw
```

**Expected Output:**
```
HTTP/2 301
Location: https://www.energievergleich.shop/stromvergleich-nrw
```

**What to look for:**
- ✅ Status: `301`
- ✅ Path preserved in redirect

---

### Test 4: Browser Test

**Steps:**
1. Open browser
2. Navigate to: `https://energievergleich.nrw/`
3. Check address bar → Should show: `https://www.energievergleich.shop/`
4. Check page loads correctly

**Expected:**
- ✅ Redirects automatically
- ✅ No 404 error
- ✅ Page content loads

---

## TROUBLESHOOTING

### Issue: Still Getting 404

**Cause:** Domain not verified or redirect not saved

**Fix:**
1. Go to **Settings → Domains**
2. Check if `energievergleich.nrw` shows **"Verified"** status
3. If not verified, complete DNS verification steps
4. If verified, check redirect settings are saved
5. Wait 5-10 minutes for DNS propagation

---

### Issue: Redirect is 302 Instead of 301

**Cause:** Wrong redirect type selected

**Fix:**
1. Go to **Settings → Domains**
2. Click on `energievergleich.nrw`
3. Edit redirect settings
4. Select **"Permanent (301)"** (not "Temporary (302)")
5. Save changes
6. Wait 5-10 minutes for propagation

---

### Issue: Redirect Loop

**Cause:** Primary domain not set correctly

**Fix:**
1. Go to **Settings → Domains**
2. Verify **Primary Domain** is set to `www.energievergleich.shop`
3. Verify `.nrw` domain is set to redirect to `www.energievergleich.shop` (not just `energievergleich.shop`)
4. Clear browser cache (Ctrl+Shift+Delete)
5. Test again

---

## VERIFICATION CHECKLIST

- [ ] Primary domain set to `www.energievergleich.shop`
- [ ] `energievergleich.nrw` added as parked domain
- [ ] `energievergleich.nrw` redirect type: **301 (Permanent)**
- [ ] `energievergleich.nrw` target: `https://www.energievergleich.shop`
- [ ] `energievergleich.shop` (non-www) added as parked domain
- [ ] `energievergleich.shop` redirect type: **301 (Permanent)**
- [ ] `energievergleich.shop` target: `https://www.energievergleich.shop`
- [ ] DNS verified for all domains
- [ ] Test 1: `curl -I https://energievergleich.nrw/` → 301
- [ ] Test 2: `curl -I https://energievergleich.shop/` → 301
- [ ] Test 3: Browser test → No 404, page loads
- [ ] Test 4: GA4 tracking working on redirected traffic

---

## ADDITIONAL NOTES

### SEO Impact:
- ✅ 301 redirects preserve SEO value
- ✅ Google will recognize `.nrw` as redirect to `.shop`
- ✅ Update Search Console to reflect new domain
- ✅ Old `.nrw` backlinks will pass authority to `.shop`

### Search Console:
1. Add `https://www.energievergleich.shop` as primary property
2. Add `https://energievergleich.nrw` as secondary property
3. Set `.nrw` to redirect to `.shop` in Search Console settings
4. Monitor redirect traffic in Search Console

### GA4:
- ✅ Code already configured for `.shop` domain
- ✅ Redirected traffic will be tracked correctly
- ✅ No additional GA4 configuration needed

---

## SUPPORT RESOURCES

- **Wix Domain Help:** https://support.wix.com/en/article/managing-your-domains
- **301 Redirect Guide:** https://support.wix.com/en/article/redirecting-your-domain
- **DNS Verification:** https://support.wix.com/en/article/adding-a-domain-you-own-to-wix

---

## TIMELINE

| Step | Time | Status |
|------|------|--------|
| Set primary domain | 5 min | Immediate |
| Add .nrw parked domain | 10 min | Immediate |
| DNS verification | 24-48 hours | Varies by registrar |
| Redirect activation | 5-10 min | After verification |
| Search Console update | 1-2 days | Crawl + index |
| Full propagation | 24-48 hours | Complete |

---

**Last Updated:** 2026-02-17
**Status:** Ready for Implementation
