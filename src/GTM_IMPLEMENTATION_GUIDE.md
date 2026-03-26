> Statushinweis: Historisches Arbeitsdokument. Nicht als Source of Truth verwenden. Maßgeblich sind README.md, package.json, astro.config.mjs, src/lib/seo-config.ts, wix.config.json und die aktuellen dist-Artefakte.

# Google Tag Manager (GTM) Implementation Guide

This guide walks you through setting up Google Tag Manager with Consent Mode, GA4 integration, and proper event tracking without PII.

---

## Part 1: GTM Container Setup

### Step 1: Create GTM Container

1. **Go to Google Tag Manager**: https://tagmanager.google.com
2. **Create New Account**
   - Account Name: `energievergleich.shop`
   - Container Name: `energievergleich.shop - Web`
   - Target Platform: **Web**
   - Click **Create**

3. **Copy Container ID**
   - Format: `GTM-XXXXXXX`
   - You'll need this for the GTM script

### Step 2: Install GTM Script

The GTM script is already installed in your app via the `Head.tsx` component. Verify it contains:

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->
```

Replace `GTM-XXXXXXX` with your actual GTM Container ID.

---

## Part 2: Consent Mode Setup in GTM

### Step 1: Enable Consent Mode

1. **In GTM Container**
   - Go to **Admin** → **Container Settings**
   - Enable **Consent Overview**
   - Click **Save**

### Step 2: Configure Consent Types

1. **Go to Admin → Consent Settings**
2. **Create Consent Types:**
   - **analytics** (required)
   - **marketing** (required)
   - **functional** (optional)

3. **For each type, set:**
   - **Display Name**: e.g., "Analytics"
   - **Description**: "Allows us to measure site usage"
   - **Default Value**: `Denied` (important!)

### Step 3: Set Up Consent Initialization Tag

1. **Create New Tag**
   - **Tag Name**: "Consent Mode - Initialize"
   - **Tag Type**: Custom HTML
   - **HTML Content**:

```html
<script>
  window.dataLayer = window.dataLayer || [];

  // Initialize with default consent state (all denied)
  window.dataLayer.push({
    'event': 'consent_init',
    'consent': {
      'analytics': 'denied',
      'marketing': 'denied'
    }
  });

  // Listen for Wix Privacy Center consent updates
  if (window.consentManager) {
    window.consentManager.addEventListener('consent', function(consentData) {
      const analyticsConsent = consentData?.categories?.analytics?.consent === true ? 'granted' : 'denied';
      const marketingConsent = consentData?.categories?.marketing?.consent === true ? 'granted' : 'denied';

      // Update GTM consent mode
      window.dataLayer.push({
        'event': 'consent_update',
        'consent': {
          'analytics': analyticsConsent,
          'marketing': marketingConsent
        }
      });
    });
  }
</script>
```

4. **Trigger**: All Pages
5. **Priority**: 1 (highest)
6. **Save**

---

## Part 3: GA4 Configuration in GTM

### Step 1: Create GA4 Configuration Tag

1. **Create New Tag**
   - **Tag Name**: "GA4 - Page View"
   - **Tag Type**: Google Analytics: GA4 Configuration
   - **Measurement ID**: Your GA4 ID (format: `G-XXXXXXXXXX`)

2. **Configuration Settings**:
   - **Enable Consent Mode**: ✓ (checked)
   - **Anonymize IP**: ✓ (checked)
   - **Allow Google Signals**: ☐ (unchecked)

3. **Trigger**:
   - Create new trigger: "Consent - Analytics Granted"
   - **Trigger Type**: Custom Event
   - **Event Name**: `consent_update` or `page_view`
   - **Condition**: `consent.analytics` equals `granted`

4. **Save**

### Step 2: Create Page View Event Tag

1. **Create New Tag**
   - **Tag Name**: "GA4 - Page View Event"
   - **Tag Type**: Google Analytics: GA4 Event
   - **Measurement ID**: Your GA4 ID
   - **Event Name**: `page_view`

2. **Event Parameters**:
   - **page_path**: `{{Page Path}}`
   - **page_title**: `{{Page Title}}`
   - **page_location**: `{{Page URL}}`

3. **Trigger**:
   - Use the same "Consent - Analytics Granted" trigger
   - **Additional Condition**: Fire once per page

4. **Save**

---

## Part 4: Custom Event Tags (Form Submission, CTA Clicks)

### Step 1: Create Form Submission Event Tag

1. **Create New Tag**
   - **Tag Name**: "GA4 - Form Submission"
   - **Tag Type**: Google Analytics: GA4 Event
   - **Measurement ID**: Your GA4 ID
   - **Event Name**: `form_submit`

2. **Event Parameters** (NO PII):
   - **form_type**: `{{form_type}}`
   - **page_location**: `{{page_location}}`
   - **timestamp**: `{{timestamp}}`

3. **Trigger**:
   - Create new trigger: "Custom Event - Form Submit"
   - **Trigger Type**: Custom Event
   - **Event Name**: `form_submit`
   - **Condition**: `consent.analytics` equals `granted`

4. **Save**

### Step 2: Create CTA Click Event Tag

1. **Create New Tag**
   - **Tag Name**: "GA4 - CTA Click"
   - **Tag Type**: Google Analytics: GA4 Event
   - **Measurement ID**: Your GA4 ID
   - **Event Name**: `cta_click`

2. **Event Parameters**:
   - **button_name**: `{{button_name}}`
   - **page_location**: `{{page_location}}`
   - **timestamp**: `{{timestamp}}`

3. **Trigger**:
   - Create new trigger: "Custom Event - CTA Click"
   - **Trigger Type**: Custom Event
   - **Event Name**: `cta_click`
   - **Condition**: `consent.analytics` equals `granted`

4. **Save**

---

## Part 5: Data Layer Variables Setup

### Step 1: Create Variables for Event Parameters

1. **Go to Variables → User-Defined Variables**

2. **Create Variable: "form_type"**
   - **Variable Type**: Data Layer Variable
   - **Data Layer Variable Name**: `form_type`
   - **Save**

3. **Create Variable: "page_location"**
   - **Variable Type**: Data Layer Variable
   - **Data Layer Variable Name**: `page_location`
   - **Save**

4. **Create Variable: "timestamp"**
   - **Variable Type**: Data Layer Variable
   - **Data Layer Variable Name**: `timestamp`
   - **Save**

5. **Create Variable: "button_name"**
   - **Variable Type**: Data Layer Variable
   - **Data Layer Variable Name**: `button_name`
   - **Save**

6. **Create Variable: "consent.analytics"**
   - **Variable Type**: Data Layer Variable
   - **Data Layer Variable Name**: `consent.analytics`
   - **Save**

---

## Part 6: Testing & Validation

### Step 1: Preview Mode

1. **In GTM Container**
   - Click **Preview** (top right)
   - Enter your website URL
   - Click **Connect**

2. **Test on Your Site**:
   - Open your website in the preview tab
   - You should see GTM debug panel at bottom
   - Check that tags fire correctly

### Step 2: Verify Consent Mode

1. **In GTM Debug Panel**:
   - Look for `consent_init` event
   - Verify consent state is `denied` initially
   - Accept Analytics in Privacy Center
   - Verify consent state changes to `granted`

### Step 3: Verify Page Views

1. **In GTM Debug Panel**:
   - Check that `page_view` event fires
   - Verify it only fires ONCE per page load
   - Check that `page_path` and `page_title` are correct

### Step 4: Verify Form Submission Events

1. **Submit a test form**:
   - In GTM Debug Panel, look for `form_submit` event
   - Verify parameters: `form_type`, `page_location`, `timestamp`
   - **Verify NO email, name, or phone is included**

### Step 5: Verify CTA Click Events

1. **Click a CTA button**:
   - In GTM Debug Panel, look for `cta_click` event
   - Verify parameters: `button_name`, `page_location`, `timestamp`

---

## Part 7: Publish GTM Container

### Step 1: Review Changes

1. **In GTM Container**
   - Click **Submit** (top right)
   - **Version Name**: "Initial GA4 + Consent Mode Setup"
   - **Version Description**: "GA4 configuration with Consent Mode and event tracking"

2. **Review all changes**:
   - ✓ Consent Mode - Initialize tag
   - ✓ GA4 - Page View tag
   - ✓ GA4 - Page View Event tag
   - ✓ GA4 - Form Submission tag
   - ✓ GA4 - CTA Click tag

### Step 2: Publish

1. **Click Publish**
2. **Confirm publication**
3. **GTM is now live!**

---

## Part 8: GA4 Configuration

### Step 1: Verify GA4 Property

1. **Go to Google Analytics 4**
2. **Admin → Data Streams**
3. **Verify your web stream exists**
4. **Copy Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 2: Configure GA4 Events

1. **Admin → Custom Definitions**
2. **Create Custom Event: "form_submit"**
   - **Event Name**: `form_submit`
   - **Description**: "User submitted a form"
   - **Scope**: Event

3. **Create Custom Event: "cta_click"**
   - **Event Name**: `cta_click`
   - **Description**: "User clicked a CTA button"
   - **Scope**: Event

### Step 3: Create Custom Dimensions (Optional)

1. **Admin → Custom Definitions → Custom Dimensions**
2. **Create Dimension: "form_type"**
   - **Dimension Name**: `form_type`
   - **Scope**: Event
   - **Description**: "Type of form submitted"

3. **Create Dimension: "button_name"**
   - **Dimension Name**: `button_name`
   - **Scope**: Event
   - **Description**: "Name of CTA button clicked"

---

## Part 9: Verify No Direct GA4 Loading

### Checklist

- [ ] **GoogleAnalytics.tsx component is DISABLED** (no direct GA4 script loading)
- [ ] **All tracking goes through GTM only**
- [ ] **Consent Mode is enabled in GTM**
- [ ] **GA4 tags only fire after Analytics consent is granted**
- [ ] **Form submission events contain NO PII** (no email, name, phone)
- [ ] **Only ONE page_view event per page load**
- [ ] **All custom events use GTM data layer**

---

## Part 10: Troubleshooting

### Issue: GA4 Tags Not Firing

**Checklist**:
- [ ] GTM Container ID is correct in Head.tsx
- [ ] Consent Mode is enabled in GTM
- [ ] GA4 Configuration tag has correct Measurement ID
- [ ] Trigger conditions are correct (consent.analytics = granted)
- [ ] Analytics consent is granted in Privacy Center

**Solution**:
1. Check GTM Preview mode
2. Verify consent state in dataLayer
3. Check GA4 Real-time events
4. Review GTM tag firing order

### Issue: Multiple Page Views

**Checklist**:
- [ ] Only ONE "GA4 - Page View Event" tag exists
- [ ] GoogleAnalytics.tsx is disabled
- [ ] No other GA4 scripts are loaded

**Solution**:
1. Remove GoogleAnalytics.tsx from Router.tsx
2. Verify only GTM page_view tag fires
3. Check GTM Preview for duplicate events

### Issue: PII in Events

**Checklist**:
- [ ] Form submission events have NO email parameter
- [ ] Form submission events have NO name parameter
- [ ] Form submission events have NO phone parameter
- [ ] Only form_type, page_location, timestamp are sent

**Solution**:
1. Update trackFormSubmission() in form-submission.ts
2. Remove user_email parameter
3. Verify in GTM Preview

---

## Part 11: Monitoring & Maintenance

### Weekly Checks

- [ ] Check GA4 Real-time events
- [ ] Verify page_view count matches traffic
- [ ] Check form_submit events are tracked
- [ ] Verify no PII in event parameters

### Monthly Checks

- [ ] Review GA4 reports
- [ ] Check conversion rates
- [ ] Verify consent rates
- [ ] Review GTM tag performance

### Quarterly Reviews

- [ ] Update GTM tags if needed
- [ ] Review GA4 custom events
- [ ] Audit for PII leakage
- [ ] Update documentation

---

## Resources

- **Google Tag Manager**: https://tagmanager.google.com
- **GA4 Setup Guide**: https://support.google.com/analytics/answer/10089681
- **Consent Mode Guide**: https://support.google.com/analytics/answer/9976101
- **GTM Best Practices**: https://support.google.com/tagmanager/answer/6107056

---

**Status**: Ready for Implementation
**Last Updated**: January 9, 2024
**Version**: 1.0
