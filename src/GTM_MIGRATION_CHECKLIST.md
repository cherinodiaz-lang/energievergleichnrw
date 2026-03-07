# GTM Migration Checklist - From Direct GA4 to GTM Only

This checklist ensures a complete migration from direct Google Analytics implementation to Google Tag Manager (GTM) with Consent Mode.

---

## Phase 1: Code Changes (✅ COMPLETED)

### ✅ 1.1 Updated form-submission.ts

**Changes Made:**
- ✅ `trackFormSubmission()` now sends events to GTM dataLayer only
- ✅ Removed `email` parameter (PII)
- ✅ Kept only: `form_type`, `page_location`, `timestamp`
- ✅ `trackCTAClick()` updated to use GTM dataLayer
- ✅ Updated JSDoc comments to reflect GTM-only tracking

**Verification:**
```typescript
// Before (REMOVED):
window.gtag('event', 'form_submit', {
  form_type: formType,
  user_email: email,  // ❌ PII - REMOVED
  timestamp: new Date().toISOString()
});

// After (CURRENT):
window.dataLayer.push({
  event: 'form_submit',
  form_type: formType,
  page_location: window.location.pathname,
  timestamp: new Date().toISOString()
});
```

### ✅ 1.2 Deprecated GoogleAnalytics.tsx

**Changes Made:**
- ✅ Component is now deprecated
- ✅ No longer loads direct GA4 script
- ✅ Returns null (does nothing)
- ✅ Added deprecation warning in console
- ✅ Clear instructions for removal

**Next Step:**
- [ ] Remove `GoogleAnalytics` import from Router.tsx
- [ ] Remove `<GoogleAnalytics measurementId={...} />` from Layout component

### ✅ 1.3 Updated Head.tsx

**Changes Made:**
- ✅ Added GTM script to `<head>`
- ✅ GTM script initializes dataLayer
- ✅ Placeholder: `GTM-XXXXXXX` (needs your actual Container ID)

**Next Step:**
- [ ] Replace `GTM-XXXXXXX` with your actual GTM Container ID

---

## Phase 2: GTM Container Setup (MANUAL - IN GTM DASHBOARD)

### 2.1 Create GTM Container

**Steps:**
- [ ] Go to https://tagmanager.google.com
- [ ] Create new account: `energievergleich.shop`
- [ ] Create new container: `energievergleich.shop - Web`
- [ ] Copy Container ID (format: `GTM-XXXXXXX`)
- [ ] Update Head.tsx with your Container ID

### 2.2 Enable Consent Mode

**Steps:**
- [ ] Go to Admin → Container Settings
- [ ] Enable **Consent Overview**
- [ ] Go to Admin → Consent Settings
- [ ] Create consent types:
  - [ ] `analytics` (default: denied)
  - [ ] `marketing` (default: denied)

### 2.3 Create Consent Initialization Tag

**Steps:**
- [ ] Create new tag: "Consent Mode - Initialize"
- [ ] Type: Custom HTML
- [ ] Add initialization script (see GTM_IMPLEMENTATION_GUIDE.md)
- [ ] Trigger: All Pages
- [ ] Priority: 1 (highest)

### 2.4 Create GA4 Configuration Tag

**Steps:**
- [ ] Create new tag: "GA4 - Page View"
- [ ] Type: Google Analytics: GA4 Configuration
- [ ] Measurement ID: Your GA4 ID (G-XXXXXXXXXX)
- [ ] Enable Consent Mode: ✓
- [ ] Trigger: Custom Event "consent_update" OR "page_view"
- [ ] Condition: consent.analytics = granted

### 2.5 Create GA4 Page View Event Tag

**Steps:**
- [ ] Create new tag: "GA4 - Page View Event"
- [ ] Type: Google Analytics: GA4 Event
- [ ] Event Name: `page_view`
- [ ] Parameters:
  - [ ] page_path: {{Page Path}}
  - [ ] page_title: {{Page Title}}
  - [ ] page_location: {{Page URL}}
- [ ] Trigger: Same as GA4 Configuration tag
- [ ] **IMPORTANT**: Fire once per page

### 2.6 Create Form Submission Event Tag

**Steps:**
- [ ] Create new tag: "GA4 - Form Submission"
- [ ] Type: Google Analytics: GA4 Event
- [ ] Event Name: `form_submit`
- [ ] Parameters (NO PII):
  - [ ] form_type: {{form_type}}
  - [ ] page_location: {{page_location}}
  - [ ] timestamp: {{timestamp}}
- [ ] Trigger: Custom Event "form_submit"
- [ ] Condition: consent.analytics = granted

### 2.7 Create CTA Click Event Tag

**Steps:**
- [ ] Create new tag: "GA4 - CTA Click"
- [ ] Type: Google Analytics: GA4 Event
- [ ] Event Name: `cta_click`
- [ ] Parameters:
  - [ ] button_name: {{button_name}}
  - [ ] page_location: {{page_location}}
  - [ ] timestamp: {{timestamp}}
- [ ] Trigger: Custom Event "cta_click"
- [ ] Condition: consent.analytics = granted

### 2.8 Create Data Layer Variables

**Steps:**
- [ ] Create variable: "form_type" (Data Layer Variable)
- [ ] Create variable: "page_location" (Data Layer Variable)
- [ ] Create variable: "timestamp" (Data Layer Variable)
- [ ] Create variable: "button_name" (Data Layer Variable)
- [ ] Create variable: "consent.analytics" (Data Layer Variable)

---

## Phase 3: Code Cleanup (MANUAL)

### 3.1 Remove GoogleAnalytics Component from Router.tsx

**Current Code:**
```typescript
import GoogleAnalytics from '@/components/GoogleAnalytics';

function Layout() {
  return (
    <>
      <GoogleAnalytics measurementId={SEO_CONFIG.googleAnalyticsId} />
      {/* ... rest of layout ... */}
    </>
  );
}
```

**Updated Code:**
```typescript
// Remove: import GoogleAnalytics from '@/components/GoogleAnalytics';

function Layout() {
  return (
    <>
      {/* Removed: <GoogleAnalytics measurementId={...} /> */}
      {/* All tracking is now handled by GTM */}
      {/* ... rest of layout ... */}
    </>
  );
}
```

**Steps:**
- [ ] Remove GoogleAnalytics import from Router.tsx
- [ ] Remove `<GoogleAnalytics measurementId={...} />` from Layout component
- [ ] Verify app still builds without errors

### 3.2 Verify No Direct GA4 Calls

**Search for these patterns and remove:**
- [ ] `window.gtag('event', ...)`
- [ ] `window.gtag('config', ...)`
- [ ] Direct GA4 script loading

**Allowed patterns:**
- ✅ `window.dataLayer.push(...)` (GTM dataLayer)
- ✅ `trackFormSubmission()` (uses dataLayer)
- ✅ `trackCTAClick()` (uses dataLayer)

---

## Phase 4: Testing & Validation

### 4.1 Verify GTM Script is Loading

**Steps:**
- [ ] Open your website
- [ ] Open DevTools → Console
- [ ] Type: `window.dataLayer`
- [ ] Should show array with GTM events
- [ ] Should NOT show any errors

**Expected Output:**
```javascript
[
  { 'gtm.start': 1234567890, event: 'gtm.js' },
  { event: 'consent_init', consent: { analytics: 'denied', marketing: 'denied' } },
  ...
]
```

### 4.2 Test Consent Mode

**Steps:**
- [ ] Open your website
- [ ] Check Privacy Center banner
- [ ] Reject Analytics consent
- [ ] Check dataLayer: `consent.analytics` should be `denied`
- [ ] Accept Analytics consent
- [ ] Check dataLayer: `consent.analytics` should be `granted`

**Expected in Console:**
```javascript
// After rejecting:
{ event: 'consent_update', consent: { analytics: 'denied', marketing: 'denied' } }

// After accepting:
{ event: 'consent_update', consent: { analytics: 'granted', marketing: 'denied' } }
```

### 4.3 Test Page Views

**Steps:**
- [ ] Accept Analytics consent
- [ ] Open your website
- [ ] Check dataLayer for `page_view` event
- [ ] Navigate to different page
- [ ] Verify ONLY ONE `page_view` event per page load
- [ ] Check GA4 Real-time events

**Expected:**
```javascript
{
  event: 'page_view',
  page_path: '/stromvergleich-nrw',
  page_title: 'Stromvergleich NRW | Energievergleich',
  page_location: 'https://energievergleich.shop/stromvergleich-nrw'
}
```

### 4.4 Test Form Submission

**Steps:**
- [ ] Accept Analytics consent
- [ ] Submit a test form
- [ ] Check dataLayer for `form_submit` event
- [ ] **VERIFY NO EMAIL, NAME, OR PHONE in event**
- [ ] Check GA4 Real-time events

**Expected:**
```javascript
{
  event: 'form_submit',
  form_type: 'kontakt',
  page_location: '/kontakt',
  timestamp: '2024-01-09T10:30:00.000Z'
}
```

**NOT Expected (PII):**
```javascript
// ❌ WRONG - Contains PII
{
  event: 'form_submit',
  form_type: 'kontakt',
  user_email: 'user@example.com',  // ❌ PII
  user_name: 'Max Mustermann',      // ❌ PII
  user_phone: '+49 211 1234567'     // ❌ PII
}
```

### 4.5 Test CTA Clicks

**Steps:**
- [ ] Accept Analytics consent
- [ ] Click a CTA button (e.g., "Jetzt Tarife vergleichen")
- [ ] Check dataLayer for `cta_click` event
- [ ] Check GA4 Real-time events

**Expected:**
```javascript
{
  event: 'cta_click',
  button_name: 'hero-tarife-vergleichen',
  page_location: '/',
  timestamp: '2024-01-09T10:30:00.000Z'
}
```

### 4.6 Test Consent Rejection

**Steps:**
- [ ] Clear browser cookies
- [ ] Reject Analytics consent
- [ ] Submit form / click CTA
- [ ] Check dataLayer
- [ ] **Verify NO events are sent to GA4**
- [ ] Check GA4 Real-time: should show NO events

**Expected:**
- Events in dataLayer but NOT sent to GA4
- GA4 Real-time shows no new events

---

## Phase 5: GTM Preview & Publishing

### 5.1 Use GTM Preview Mode

**Steps:**
- [ ] In GTM Container, click **Preview**
- [ ] Enter your website URL
- [ ] Click **Connect**
- [ ] Open website in preview tab
- [ ] Check GTM debug panel at bottom

### 5.2 Verify All Tags Fire Correctly

**In GTM Debug Panel:**
- [ ] ✅ "Consent Mode - Initialize" fires on all pages
- [ ] ✅ "GA4 - Page View" fires after consent granted
- [ ] ✅ "GA4 - Page View Event" fires once per page
- [ ] ✅ "GA4 - Form Submission" fires on form submit
- [ ] ✅ "GA4 - CTA Click" fires on button click

### 5.3 Publish GTM Container

**Steps:**
- [ ] Click **Submit** in GTM
- [ ] **Version Name**: "Initial GA4 + Consent Mode Setup"
- [ ] **Version Description**: "Migrate from direct GA4 to GTM with Consent Mode"
- [ ] Review all changes
- [ ] Click **Publish**

---

## Phase 6: Post-Migration Verification

### 6.1 Verify in GA4

**Steps:**
- [ ] Go to Google Analytics 4
- [ ] Check Real-time events
- [ ] Verify page_view events appear
- [ ] Verify form_submit events appear
- [ ] Verify cta_click events appear
- [ ] **Verify NO PII in events**

### 6.2 Check GA4 Event Count

**Expected:**
- Page views: ~1 per page load
- Form submissions: 1 per form submit
- CTA clicks: 1 per button click
- **NO duplicate events**

### 6.3 Monitor for 24 Hours

**Steps:**
- [ ] Check GA4 reports after 24 hours
- [ ] Verify data is flowing correctly
- [ ] Check for any anomalies
- [ ] Monitor error logs

---

## Phase 7: Cleanup & Documentation

### 7.1 Remove Deprecated Code

**Steps:**
- [ ] Delete GoogleAnalytics.tsx (optional - keep as reference)
- [ ] Remove unused imports from Router.tsx
- [ ] Remove SEO_CONFIG.googleAnalyticsId usage (if not needed)

### 7.2 Update Documentation

**Steps:**
- [ ] Update README.md with GTM setup instructions
- [ ] Document GTM Container ID location
- [ ] Document event tracking implementation
- [ ] Add troubleshooting guide

### 7.3 Archive Old Implementation

**Steps:**
- [ ] Keep GTM_IMPLEMENTATION_GUIDE.md for reference
- [ ] Keep GTM_MIGRATION_CHECKLIST.md for future migrations
- [ ] Document any custom changes made

---

## Final Verification Checklist

### ✅ Code Level
- [ ] GoogleAnalytics component is deprecated
- [ ] form-submission.ts uses GTM dataLayer only
- [ ] No direct GA4 calls (window.gtag)
- [ ] No PII in event parameters
- [ ] Head.tsx includes GTM script

### ✅ GTM Level
- [ ] GTM Container created and configured
- [ ] Consent Mode enabled
- [ ] All required tags created
- [ ] All required triggers created
- [ ] All required variables created
- [ ] GTM published to production

### ✅ Testing Level
- [ ] Page views tracked correctly
- [ ] Only ONE page_view per page load
- [ ] Form submissions tracked without PII
- [ ] CTA clicks tracked correctly
- [ ] Consent Mode working (events only after consent)
- [ ] GA4 receiving events correctly

### ✅ Compliance Level
- [ ] No PII in analytics events
- [ ] Consent Mode respects user choices
- [ ] Privacy Center integration working
- [ ] GDPR compliant tracking

---

## Troubleshooting

### Issue: GTM Script Not Loading

**Solution:**
1. Check Head.tsx for GTM script
2. Verify GTM Container ID is correct
3. Check browser console for errors
4. Clear browser cache and reload

### Issue: No Events in GA4

**Solution:**
1. Verify Consent Mode is enabled in GTM
2. Check Analytics consent is granted
3. Verify GA4 Configuration tag is firing
4. Check GA4 Measurement ID is correct
5. Wait 24-48 hours for data to appear

### Issue: Multiple Page Views

**Solution:**
1. Verify only ONE "GA4 - Page View Event" tag exists
2. Check trigger is set to "Fire once per page"
3. Remove GoogleAnalytics component from Router.tsx
4. Verify no other GA4 scripts are loading

### Issue: PII in Events

**Solution:**
1. Check trackFormSubmission() doesn't include email
2. Verify GTM event parameters don't include PII
3. Check GA4 event parameters in GTM tags
4. Review dataLayer push calls in code

---

## Support & Resources

- **GTM Implementation Guide**: See GTM_IMPLEMENTATION_GUIDE.md
- **GTM Help**: https://support.google.com/tagmanager
- **GA4 Help**: https://support.google.com/analytics
- **Consent Mode Guide**: https://support.google.com/analytics/answer/9976101

---

**Status**: Ready for Implementation
**Last Updated**: January 9, 2024
**Version**: 1.0
