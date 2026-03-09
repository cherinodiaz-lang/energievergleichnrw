# Implementation Checklist: Wix Privacy Center & Form Submissions

This checklist guides you through implementing the Wix Privacy Center and form submissions system.

---

## Phase 1: Wix Privacy Center Setup (30 minutes)

### 1.1 Enable Privacy Center
- [ ] Go to Wix Dashboard → Settings → Privacy Center
- [ ] Toggle **Privacy Center** to ON
- [ ] Verify banner appears on your site (bottom of page)

### 1.2 Configure Consent Categories
- [ ] **Essential Category**
  - [ ] Name: "Essential" or "Notwendige Cookies"
  - [ ] Description: "Erforderlich für die Funktionalität der Website"
  - [ ] Status: Always enabled (cannot be disabled)

- [ ] **Analytics Category**
  - [ ] Name: "Analytics" or "Analyse-Cookies"
  - [ ] Description: "Helfen uns, die Website zu verbessern (Google Analytics)"
  - [ ] Cookies: `_ga`, `_gid`, `_gat`
  - [ ] Third-party services: Google Analytics
  - [ ] Status: Disabled by default

- [ ] **Marketing Category**
  - [ ] Name: "Marketing" or "Marketing-Cookies"
  - [ ] Description: "Für personalisierte Werbung und Retargeting"
  - [ ] Cookies: (add any retargeting cookies)
  - [ ] Third-party services: (add any ad services)
  - [ ] Status: Disabled by default

### 1.3 Add Privacy & Cookie Policies
- [ ] Set **Privacy Policy URL**: `/datenschutz`
- [ ] Set **Cookie Policy URL**: `/datenschutz`
- [ ] Verify `/datenschutz` page exists and has complete information

### 1.4 Customize Banner (Optional)
- [ ] Choose banner position: Bottom (default)
- [ ] Choose banner theme: Light or Dark
- [ ] Customize button colors to match brand
- [ ] Customize banner text (if desired)

### 1.5 Test Privacy Center
- [ ] Clear browser cookies and cache
- [ ] Visit your site
- [ ] Verify banner appears at bottom
- [ ] Test "Accept All" button
- [ ] Test "Reject All" button
- [ ] Test "Settings" button
- [ ] Toggle Analytics on/off in settings
- [ ] Verify choices are saved

---

## Phase 2: GA4 Integration (15 minutes)

### 2.1 Verify GA4 Measurement ID
- [ ] Go to Google Analytics 4 → Admin → Data Streams
- [ ] Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)
- [ ] Verify it's in `/src/lib/seo-config.ts`

### 2.2 Test GA4 Loading
- [ ] Clear browser cookies
- [ ] Visit your site
- [ ] Accept Analytics consent
- [ ] Open browser DevTools → Network tab
- [ ] Verify `gtag/js` script loads
- [ ] Go to GA4 → Real-time → Events
- [ ] Verify `page_view` event appears

### 2.3 Test GA4 Blocking
- [ ] Clear browser cookies
- [ ] Visit your site
- [ ] Reject Analytics consent
- [ ] Open browser DevTools → Network tab
- [ ] Verify `gtag/js` script does NOT load
- [ ] Go to GA4 → Real-time → Events
- [ ] Verify NO events appear

### 2.4 Verify GA4 Events
- [ ] Submit a form on your site
- [ ] Go to GA4 → Real-time → Events
- [ ] Verify `form_submit` event appears
- [ ] Click a CTA button
- [ ] Verify `cta_click` event appears

---

## Phase 3: Form Submissions Collection (30 minutes)

### 3.1 Create Collection
- [ ] Go to Wix Dashboard → Content Management → Collections
- [ ] Click **Create Collection**
- [ ] **Name**: `formsubmissions`
- [ ] **Display Name**: "Form Submissions"
- [ ] **Display Field**: `name` or `email`
- [ ] Click **Create**

### 3.2 Add Collection Fields
Add all fields from the table below:

| Field Name | Type | Required |
|-----------|------|----------|
| `type` | Text | Yes |
| `name` | Text | Yes |
| `email` | Email | Yes |
| `phone` | Text | No |
| `message` | Text | No |
| `subject` | Text | No |
| `postleitzahl` | Text | No |
| `verbrauch` | Text | No |
| `eigentumsart` | Text | No |
| `dachform` | Text | No |
| `personen` | Text | No |
| `strasse` | Text | No |
| `hausnummer` | Text | No |
| `ort` | Text | No |
| `companyName` | Text | No |
| `companyType` | Text | No |
| `consumption` | Text | No |
| `heatingType` | Text | No |

**Steps for each field:**
- [ ] Click **Add Field**
- [ ] Enter **Field Name** (exactly as shown)
- [ ] Select **Field Type**
- [ ] Toggle **Required** if needed
- [ ] Click **Add**

### 3.3 Set Collection Permissions
- [ ] Click **Permissions** (gear icon)
- [ ] **Insert**: Set to "Anyone"
- [ ] **Update**: Set to "Owner only"
- [ ] **Remove**: Set to "Owner only"
- [ ] **Read**: Set to "Owner only"
- [ ] Click **Save**

### 3.4 Verify Collection
- [ ] Go to Collections list
- [ ] Verify `formsubmissions` appears
- [ ] Click on it
- [ ] Verify all fields are listed
- [ ] Verify permissions are correct

---

## Phase 4: Wix Automations Setup (30 minutes)

### 4.1 Create Team Notification Automation

**Step 1: Create Automation**
- [ ] Go to Wix Dashboard → Settings → Automations
- [ ] Click **Create Automation**
- [ ] **Trigger**: "Collection item is created"
- [ ] **Collection**: `formsubmissions`
- [ ] Click **Next**

**Step 2: Add Email Action**
- [ ] Click **Add Action**
- [ ] Select **Send Email**
- [ ] **To**: Your email (e.g., `kontakt@energievergleich.shop`)
- [ ] **Subject**: `Neue Anfrage: {type}`

**Step 3: Configure Email Body**
- [ ] Click in **Body** field
- [ ] Copy and paste this template:

```
Neue Anfrage eingegangen!

Name: {name}
E-Mail: {email}
Telefon: {phone}
Anfrage-Typ: {type}

Nachricht:
{message}

Zusätzliche Informationen:
Postleitzahl: {postleitzahl}
Verbrauch: {verbrauch}

Eingangsdatum: {_createdDate}

---
Bitte antworten Sie dem Kunden schnellstmöglich.
```

**Step 4: Save Automation**
- [ ] **Name**: "New Form Submission - Team Notification"
- [ ] Toggle **Enabled** to ON
- [ ] Click **Save**

### 4.2 Create User Auto-Reply Automation

**Step 1: Create Automation**
- [ ] Go to Wix Dashboard → Settings → Automations
- [ ] Click **Create Automation**
- [ ] **Trigger**: "Collection item is created"
- [ ] **Collection**: `formsubmissions`
- [ ] Click **Next**

**Step 2: Add Email Action**
- [ ] Click **Add Action**
- [ ] Select **Send Email**
- [ ] **To**: `{email}` (from form data)
- [ ] **Subject**: `Vielen Dank für Ihre Anfrage!`

**Step 3: Configure Email Body**
- [ ] Click in **Body** field
- [ ] Copy and paste this template:

```
Liebe/r {name},

vielen Dank für Ihre Anfrage! Wir haben Ihre Nachricht erhalten und werden uns in Kürze bei Ihnen melden.

Ihre Anfrage wird von unserem Team bearbeitet. Sie erhalten eine Antwort innerhalb von 24 Stunden.

Falls Sie Fragen haben, kontaktieren Sie uns unter:
E-Mail: kontakt@energievergleich.shop
Telefon: +49 211 1234567

Beste Grüße,
Das Energievergleich Team
```

**Step 4: Save Automation**
- [ ] **Name**: "New Form Submission - User Auto-Reply"
- [ ] Toggle **Enabled** to ON
- [ ] Click **Save**

### 4.3 Verify Automations
- [ ] Go to Settings → Automations
- [ ] Verify both automations are listed
- [ ] Verify both are **Enabled** (toggle ON)

---

## Phase 5: Testing (30 minutes)

### 5.1 Test Form Submission

**Step 1: Submit Test Form**
- [ ] Go to your website
- [ ] Navigate to a page with a form (e.g., Contact page)
- [ ] Fill out the form with test data
- [ ] Submit the form
- [ ] Verify thank you message appears

**Step 2: Check Team Email**
- [ ] Check your email inbox
- [ ] Verify team notification email received
- [ ] Verify all form data is in the email
- [ ] Verify subject line is correct

**Step 3: Check User Email**
- [ ] Check the test email address used in form
- [ ] Verify auto-reply email received
- [ ] Verify email is personalized with user's name
- [ ] Verify contact information is correct

**Step 4: Check Wix Dashboard**
- [ ] Go to Wix Dashboard → Content Management → Collections
- [ ] Click on `formsubmissions`
- [ ] Verify test submission appears in the list
- [ ] Click on the submission
- [ ] Verify all form data is captured correctly

### 5.2 Test Privacy Center

**Step 1: Test Accept All**
- [ ] Clear browser cookies
- [ ] Visit your site
- [ ] Click "Accept All" on Privacy Center banner
- [ ] Verify banner disappears
- [ ] Open DevTools → Network tab
- [ ] Verify `gtag/js` script loads
- [ ] Go to GA4 → Real-time → Events
- [ ] Verify page_view event appears

**Step 2: Test Reject All**
- [ ] Clear browser cookies
- [ ] Visit your site
- [ ] Click "Reject All" on Privacy Center banner
- [ ] Verify banner disappears
- [ ] Open DevTools → Network tab
- [ ] Verify `gtag/js` script does NOT load
- [ ] Go to GA4 → Real-time → Events
- [ ] Verify NO events appear

**Step 3: Test Settings**
- [ ] Clear browser cookies
- [ ] Visit your site
- [ ] Click "Settings" on Privacy Center banner
- [ ] Verify detailed options appear
- [ ] Toggle Analytics on/off
- [ ] Click "Save Settings"
- [ ] Verify banner disappears
- [ ] Verify choices are saved (reload page)

### 5.3 Test GA4 Events

**Step 1: Form Submission Event**
- [ ] Submit a form on your site
- [ ] Go to GA4 → Real-time → Events
- [ ] Verify `form_submit` event appears
- [ ] Verify event has correct parameters:
  - [ ] `form_type`
  - [ ] `user_email`
  - [ ] `timestamp`

**Step 2: CTA Click Event**
- [ ] Click a CTA button (e.g., "Jetzt Tarife vergleichen")
- [ ] Go to GA4 → Real-time → Events
- [ ] Verify `cta_click` event appears
- [ ] Verify event has correct parameters:
  - [ ] `button_name`
  - [ ] `page_location`
  - [ ] `timestamp`

**Step 3: Page View Event**
- [ ] Navigate to different pages
- [ ] Go to GA4 → Real-time → Events
- [ ] Verify `page_view` events appear
- [ ] Verify events have correct parameters:
  - [ ] `page_path`
  - [ ] `page_title`

---

## Phase 6: Verification & Monitoring (15 minutes)

### 6.1 Verify All Systems Working

- [ ] **Privacy Center**
  - [ ] Banner appears on all pages
  - [ ] Consent choices are saved
  - [ ] GA4 respects consent

- [ ] **GA4**
  - [ ] Loads when Analytics consent given
  - [ ] Doesn't load when Analytics consent rejected
  - [ ] Events are tracked correctly
  - [ ] Data appears in Real-time

- [ ] **Form Submissions**
  - [ ] Forms submit successfully
  - [ ] Data appears in Wix Collection
  - [ ] Team receives notification email
  - [ ] Users receive auto-reply email

- [ ] **Automations**
  - [ ] Both automations are enabled
  - [ ] Emails are sent on form submission
  - [ ] Emails contain correct data

### 6.2 Set Up Monitoring

- [ ] **GA4 Dashboard**
  - [ ] Bookmark: https://analytics.google.com
  - [ ] Check Real-time events daily
  - [ ] Review form submission events weekly

- [ ] **Wix Collections**
  - [ ] Bookmark: Wix Dashboard → Collections → formsubmissions
  - [ ] Review new submissions daily
  - [ ] Archive old submissions monthly

- [ ] **Email Monitoring**
  - [ ] Check team notification emails
  - [ ] Respond to user inquiries within 24 hours
  - [ ] Track response times

---

## Phase 7: Troubleshooting

### Issue: Privacy Center Banner Not Showing

**Checklist:**
- [ ] Privacy Center is enabled in Wix Dashboard
- [ ] Privacy Policy URL is set
- [ ] Browser cookies are cleared
- [ ] Hard refresh (Ctrl+Shift+R)
- [ ] Check browser console for errors

**Solution:**
1. Go to Settings → Privacy Center
2. Verify toggle is ON
3. Verify Privacy Policy URL is set
4. Clear browser cache completely
5. Hard refresh your site

### Issue: GA4 Not Loading

**Checklist:**
- [ ] Measurement ID is correct in `seo-config.ts`
- [ ] Privacy Center is enabled
- [ ] Analytics consent is given
- [ ] Browser console shows no errors
- [ ] GA4 property exists in Google Analytics

**Solution:**
1. Verify Measurement ID format: `G-XXXXXXXXXX`
2. Check Privacy Center Analytics category is configured
3. Clear browser cookies and cache
4. Hard refresh your site
5. Wait 24-48 hours for GA4 to show data

### Issue: Form Submissions Not Appearing

**Checklist:**
- [ ] Collection name is exactly `formsubmissions`
- [ ] Collection permissions: Insert = "Anyone"
- [ ] All required fields are being submitted
- [ ] Browser console shows no errors
- [ ] Form submission service is working

**Solution:**
1. Verify collection exists: Collections → formsubmissions
2. Check permissions: Insert = "Anyone"
3. Check form is submitting (check browser console)
4. Verify all required fields have values
5. Check form submission service in `/src/services/form-submission.ts`

### Issue: Automations Not Triggering

**Checklist:**
- [ ] Both automations are enabled (toggle ON)
- [ ] Email addresses are correct
- [ ] Collection is correctly selected
- [ ] Form is actually submitting
- [ ] Check spam folder for emails

**Solution:**
1. Go to Settings → Automations
2. Verify both automations are enabled
3. Verify email addresses are correct
4. Test automation manually in Wix Dashboard
5. Check spam folder for emails
6. Wait a few minutes for email to arrive

---

## Final Checklist

- [ ] Privacy Center is enabled and working
- [ ] GA4 loads only with Analytics consent
- [ ] Form submissions collection is created
- [ ] All collection fields are added
- [ ] Collection permissions are set correctly
- [ ] Team notification automation is working
- [ ] User auto-reply automation is working
- [ ] Test form submission was successful
- [ ] All emails were received
- [ ] Submission appears in Wix Dashboard
- [ ] GA4 events are being tracked
- [ ] Privacy Center banner appears on all pages
- [ ] All systems are monitored and working

---

## Next Steps

1. **Complete all phases** (1-7)
2. **Monitor GA4** for tracking data
3. **Review form submissions** regularly
4. **Respond to user inquiries** within 24 hours
5. **Update Privacy Policy** as needed
6. **Archive old submissions** monthly
7. **Review automations** quarterly

---

**Status**: Ready for Implementation
**Last Updated**: January 9, 2024
**Version**: 1.0
