> Statushinweis: Historisches Arbeitsdokument. Nicht als Source of Truth verwenden. Maßgeblich sind README.md, package.json, astro.config.mjs, src/lib/seo-config.ts, wix.config.json und die aktuellen dist-Artefakte.

# GA4 DEBUG GUIDE
## Troubleshooting "Echtzeit zeigt NICHTS" (Real-time shows nothing)

**Objective:** Debug why GA4 Real-time dashboard shows no data, even though Google Tag Manager appears to be sending data.

---

## ROOT CAUSE ANALYSIS

### Common Causes (Priority Order):

1. **Consent Not Granted** ⚠️ MOST LIKELY
   - GA4 initialized with `consent: 'denied'` by default
   - Events only sent AFTER user accepts analytics consent
   - Real-time won't show data until consent is granted

2. **Wrong Measurement ID**
   - GA4 ID in code doesn't match Wix Business Manager
   - Events sent to wrong property

3. **GA4 Script Not Loading**
   - Network error loading gtag.js
   - Browser blocking script

4. **Real-time Filter Issue**
   - Real-time dashboard has filters enabled
   - Events being sent but filtered out

5. **Timing Issue**
   - Real-time dashboard needs 30-60 seconds to show data
   - Events sent but not yet visible

---

## SOLUTION: STEP-BY-STEP DEBUG PLAN

### STEP 1: Verify Measurement ID in Wix

**Path in Wix Dashboard:**
```
Dashboard → Settings → Integrations → Google Analytics
```

**Action:**
1. Click **"Settings"** in left sidebar
2. Select **"Integrations"**
3. Find **"Google Analytics"** section
4. Check **Measurement ID** field
5. Copy the ID (format: `G-XXXXXXXXXX`)

**Expected:**
- ✅ Measurement ID: `G-X60BTL057V` (matches code in seo-config.ts line 49)

**If Different:**
- ❌ Update Wix to use: `G-X60BTL057V`
- ❌ Or update code to match Wix ID
- ❌ Wait 5-10 minutes for propagation

---

### STEP 2: Enable GA4 Debug Mode

**In Browser Console:**

1. Open website: `https://www.energievergleich.shop/?ga_debug=1`
2. Open browser DevTools: `F12` or `Ctrl+Shift+I`
3. Go to **"Console"** tab
4. Look for logs starting with `[GA4 DEBUG]`

**Expected Console Output:**
```
[GA4 DEBUG] Initialized with Measurement ID: G-X60BTL057V
[GA4 DEBUG] Consent updated: {analytics: false, marketing: false, timestamp: "..."}
```

**If No Logs:**
- ❌ Debug mode not working
- ❌ Check URL parameter: `?ga_debug=1` present?
- ❌ Check browser console for errors

---

### STEP 3: Accept Consent & Check Debug Logs

**Steps:**
1. Page should show consent banner at bottom
2. Click **"Akzeptieren"** (Accept All)
3. Check console for new logs

**Expected Console Output After Consent:**
```
[GA4 DEBUG] Consent updated: {analytics: true, marketing: true, timestamp: "..."}
[GA4 DEBUG] Debug ping sent
[GA4 DEBUG] Event sent: debug_ping {page_path: "/", page_url: "https://www.energievergleich.shop/?ga_debug=1", consent_status: "granted", debug_mode: true, timestamp: "..."}
```

**If No Logs After Consent:**
- ❌ Consent not being applied
- ❌ Check ConsentBanner.tsx for errors
- ❌ Check localStorage for consent data

---

### STEP 4: Check GA4 Real-time Dashboard

**Path in Google Analytics:**
```
Google Analytics → Reports → Real-time
```

**Action:**
1. Open Google Analytics: https://analytics.google.com
2. Select property: `energievergleich.shop`
3. Go to **"Reports"** → **"Real-time"**
4. Keep page open
5. In another tab, open: `https://www.energievergleich.shop/?ga_debug=1`
6. Accept consent
7. Watch Real-time dashboard for events

**Expected:**
- ✅ Within 30 seconds, you should see:
  - Active users: 1
  - Event: `debug_ping`
  - Page: `/`

**If Nothing Appears:**
- ❌ Check Measurement ID matches (Step 1)
- ❌ Check consent was actually granted (Step 3)
- ❌ Wait 60 seconds (Real-time can be slow)
- ❌ Refresh Real-time dashboard

---

### STEP 5: Check GA4 DebugView

**Path in Google Analytics:**
```
Google Analytics → Admin → DebugView
```

**Action:**
1. Go to Google Analytics
2. Click **"Admin"** (gear icon)
3. Select property: `energievergleich.shop`
4. Go to **"DebugView"** (under "Events")
5. In another tab, open: `https://www.energievergleich.shop/?ga_debug=1`
6. Accept consent
7. Watch DebugView for events

**Expected:**
- ✅ DebugView shows detailed event data:
  - Event name: `debug_ping`
  - Parameters: `page_path`, `consent_status`, `debug_mode`
  - Timestamp: Current time

**If Nothing Appears:**
- ❌ GA4 property not connected to website
- ❌ Measurement ID wrong
- ❌ GA4 script not loading

---

### STEP 6: Test Form Submission Event

**Steps:**
1. Open: `https://www.energievergleich.shop/?ga_debug=1`
2. Accept consent
3. Scroll to form section
4. Fill form with test data:
   - Name: "Test User"
   - Email: "test@example.com"
   - Postleitzahl: "40210"
5. Check privacy checkbox
6. Click "Anfrage senden"
7. Check console for event logs

**Expected Console Output:**
```
[GA4 DEBUG] Event sent: form_submit {page_path: "/", form_type: "stromvergleich", timestamp: "..."}
```

**Expected in GA4 Real-time:**
- ✅ Event: `form_submit`
- ✅ Parameter: `form_type: stromvergleich`

---

### STEP 7: Test CTA Click Event

**Steps:**
1. Open: `https://www.energievergleich.shop/?ga_debug=1`
2. Accept consent
3. Click "Kostenlos vergleichen" button in header
4. Check console for event logs

**Expected Console Output:**
```
[GA4 DEBUG] Event sent: cta_click {page_path: "/", cta_label: "Kostenlos vergleichen", timestamp: "..."}
```

**Expected in GA4 Real-time:**
- ✅ Event: `cta_click`
- ✅ Parameter: `cta_label: Kostenlos vergleichen`

---

## VERIFICATION CHECKLIST

### Pre-Deployment:
- [ ] Measurement ID in code: `G-X60BTL057V`
- [ ] Measurement ID in Wix: `G-X60BTL057V` (matches)
- [ ] Debug mode implemented (ga4-tracking.ts)
- [ ] Console logging added
- [ ] sendDebugPing() function created
- [ ] ConsentBanner calls sendDebugPing()

### Testing:
- [ ] Open site with `?ga_debug=1` parameter
- [ ] Check console for `[GA4 DEBUG]` logs
- [ ] Accept consent
- [ ] Check console for consent update logs
- [ ] Check GA4 Real-time for `debug_ping` event
- [ ] Check GA4 DebugView for detailed event data
- [ ] Test form submission event
- [ ] Test CTA click event
- [ ] Verify all events have correct parameters

### Post-Deployment:
- [ ] Monitor GA4 Real-time for 24 hours
- [ ] Check for form_submit events
- [ ] Check for cta_click events
- [ ] Check for methodik_click events
- [ ] Verify no events before consent
- [ ] Monitor error logs for GA4 issues

---

## COMMON ISSUES & FIXES

### Issue 1: "Real-time shows nothing, but DebugView shows events"

**Cause:** Real-time has 30-60 second delay

**Fix:**
- ✅ Wait 60 seconds
- ✅ Refresh Real-time dashboard
- ✅ Generate more traffic (multiple page views)

---

### Issue 2: "Console shows [GA4 DEBUG] but Real-time is empty"

**Cause:** Consent not actually granted

**Fix:**
1. Check localStorage: `localStorage.getItem('energievergleich_consent')`
2. Should show: `{"analytics":true,"marketing":true,...}`
3. If empty or false, consent not saved
4. Check ConsentBanner.tsx for errors
5. Try accepting consent again

---

### Issue 3: "No [GA4 DEBUG] logs in console"

**Cause:** Debug mode not enabled

**Fix:**
1. Check URL: Must have `?ga_debug=1` parameter
2. Check ga4-tracking.ts line 31: `debugMode = new URLSearchParams(...).has('ga_debug')`
3. If not present, add it
4. Refresh page with `?ga_debug=1`

---

### Issue 4: "Measurement ID doesn't match"

**Cause:** Code uses different ID than Wix

**Fix:**
1. Check Wix Dashboard: Settings → Integrations → Google Analytics
2. Copy Measurement ID
3. Update seo-config.ts line 49: `googleAnalyticsId: 'G-XXXXXXXXXX'`
4. Rebuild and redeploy
5. Wait 5-10 minutes for propagation

---

### Issue 5: "Events show in DebugView but not in Real-time"

**Cause:** Real-time filter or delay

**Fix:**
1. Check Real-time filters (top of dashboard)
2. Remove any active filters
3. Wait 60 seconds
4. Refresh dashboard
5. Generate new traffic (page view)

---

## ADVANCED DEBUGGING

### Check Network Tab:

1. Open DevTools → **"Network"** tab
2. Filter by: `gtag` or `google`
3. Reload page
4. Look for requests to:
   - `https://www.googletagmanager.com/gtag/js?id=G-X60BTL057V`
   - `https://www.google-analytics.com/collect`

**Expected:**
- ✅ Status: 200 (successful)
- ✅ Size: > 0 bytes

**If 404 or blocked:**
- ❌ GA4 script not loading
- ❌ Browser blocking script
- ❌ Network error

---

### Check dataLayer:

1. Open DevTools → **"Console"** tab
2. Type: `window.dataLayer`
3. Press Enter
4. Should show array of events

**Expected:**
```javascript
[
  ["js", Date],
  ["config", "G-X60BTL057V", {...}],
  ["event", "debug_ping", {...}],
  ...
]
```

**If Empty:**
- ❌ GA4 not initialized
- ❌ Check initializeGA4() called in Router.tsx

---

## FINAL CHECKLIST

- [ ] Measurement ID verified
- [ ] Debug mode working (`?ga_debug=1`)
- [ ] Console logs showing `[GA4 DEBUG]`
- [ ] Consent acceptance triggers logs
- [ ] GA4 Real-time shows events
- [ ] GA4 DebugView shows detailed data
- [ ] Form submission event tracked
- [ ] CTA click event tracked
- [ ] No events before consent
- [ ] All parameters correct

---

## NEXT STEPS

1. **If all tests pass:**
   - ✅ GA4 is working correctly
   - ✅ Deploy to production
   - ✅ Monitor for 24 hours

2. **If tests fail:**
   - ❌ Check specific issue above
   - ❌ Apply fix
   - ❌ Re-test
   - ❌ If still failing, check browser console for errors

3. **Production Monitoring:**
   - Monitor GA4 Real-time daily
   - Check for form submissions
   - Check for CTA clicks
   - Monitor error logs

---

## SUPPORT RESOURCES

- **GA4 Setup Guide:** https://support.google.com/analytics/answer/10089681
- **GA4 DebugView:** https://support.google.com/analytics/answer/7201382
- **GA4 Real-time:** https://support.google.com/analytics/answer/9271563
- **Consent Mode:** https://support.google.com/analytics/answer/9976101

---

**Last Updated:** 2026-02-17
**Status:** Ready for Testing
