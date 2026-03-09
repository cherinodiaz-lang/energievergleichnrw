# Wix Privacy Center & Form Submissions Setup Guide

This guide walks you through setting up the Wix Privacy Center (Usercentrics) and configuring the form submissions collection with automations.

---

## Part 1: Wix Privacy Center Setup

### Step 1: Enable Privacy Center

1. **Go to Wix Dashboard**
   - Click **Settings** (bottom left)
   - Select **Privacy Center**

2. **Enable Privacy Center**
   - Toggle **Privacy Center** to ON
   - This automatically adds a consent banner to your site

### Step 2: Configure Consent Categories

1. **In Privacy Center Settings:**
   - You'll see three default categories:
     - **Essential** (always enabled, cannot be disabled)
     - **Analytics** (for GA4 tracking)
     - **Marketing** (for retargeting/ads)

2. **For Each Category, Configure:**
   - **Name**: Keep default or customize
   - **Description**: Explain what cookies are used
   - **Cookies**: List the cookies used (e.g., `_ga`, `_gid` for Analytics)

3. **Analytics Category Setup:**
   - **Name**: "Analytics" or "Analyse-Cookies"
   - **Description**: "Helfen uns, die Website zu verbessern (Google Analytics)"
   - **Cookies**: Add `_ga`, `_gid`, `_gat`
   - **Third-party services**: Google Analytics

4. **Marketing Category Setup:**
   - **Name**: "Marketing" or "Marketing-Cookies"
   - **Description**: "Für personalisierte Werbung und Retargeting"
   - **Cookies**: Add any retargeting cookies
   - **Third-party services**: Facebook Pixel, Google Ads, etc. (if used)

### Step 3: Add Privacy Policy & Cookie Policy

1. **In Privacy Center Settings:**
   - **Privacy Policy URL**: `/datenschutz`
   - **Cookie Policy URL**: `/datenschutz` (or separate page)

2. **Make sure these pages exist:**
   - `/datenschutz` page is already created in your app
   - Update it with complete privacy and cookie information

### Step 4: Customize Banner Appearance (Optional)

1. **In Privacy Center Settings:**
   - **Banner Position**: Bottom (default)
   - **Banner Theme**: Light or Dark
   - **Button Colors**: Match your brand colors
   - **Text**: Customize banner text

### Step 5: Verify Banner is Working

1. **Clear browser cookies and cache**
2. **Visit your site**
3. **You should see the Wix Privacy Center banner at the bottom**
4. **Test:**
   - Click "Accept All" → GA4 should load
   - Click "Reject All" → GA4 should NOT load
   - Click "Settings" → Toggle Analytics on/off

---

## Part 2: Form Submissions Collection Setup

### Step 1: Create the Collection

1. **Go to Wix Dashboard**
   - Click **Content Management** (left sidebar)
   - Click **Collections**

2. **Create New Collection**
   - Click **Create Collection**
   - **Name**: `formsubmissions`
   - **Display Name**: "Form Submissions"
   - **Display Field**: `name` (or `email`)

### Step 2: Add Collection Fields

Add the following fields to your collection:

| Field Name | Field Type | Required | Notes |
|-----------|-----------|----------|-------|
| `type` | Text | Yes | kontakt, stromvergleich, gasvergleich, photovoltaik, gewerbestrom, gewerbegas |
| `name` | Text | Yes | User's name |
| `email` | Email | Yes | User's email address |
| `phone` | Text | No | User's phone number |
| `message` | Text | No | User's message/inquiry |
| `subject` | Text | No | Subject of inquiry |
| `postleitzahl` | Text | No | Postal code |
| `verbrauch` | Text | No | Energy consumption |
| `eigentumsart` | Text | No | Property type (for PV forms) |
| `dachform` | Text | No | Roof type (for PV forms) |
| `personen` | Text | No | Number of people |
| `strasse` | Text | No | Street address |
| `hausnummer` | Text | No | House number |
| `ort` | Text | No | City |
| `companyName` | Text | No | Company name (for business forms) |
| `companyType` | Text | No | Company type/industry |
| `consumption` | Text | No | Energy consumption amount |
| `heatingType` | Text | No | Heating type (for gas/gewerbegas) |
| `_createdDate` | Date | Auto | Automatically set |
| `_updatedDate` | Date | Auto | Automatically set |

### Step 3: Set Collection Permissions

1. **In Collection Settings:**
   - Click **Permissions** (gear icon)

2. **Set Permissions:**
   - **Insert**: "Anyone" (allows visitors to submit forms)
   - **Update**: "Owner only" (only you can edit submissions)
   - **Remove**: "Owner only" (only you can delete submissions)
   - **Read**: "Owner only" (only you can view submissions)

3. **Save Permissions**

### Step 4: Verify Collection is Ready

1. **Go to Collections**
2. **You should see `formsubmissions` in the list**
3. **Click on it to view the collection**
4. **You should see all the fields you created**

---

## Part 3: Wix Automations Setup

### Automation 1: Email Notification to Team

1. **Go to Wix Dashboard**
   - Click **Settings** (bottom left)
   - Select **Automations**

2. **Create New Automation**
   - Click **Create Automation**
   - **Trigger**: "Collection item is created"
   - **Select Collection**: `formsubmissions`

3. **Add Action: Send Email**
   - Click **Add Action**
   - Select **Send Email**

4. **Configure Email:**
   - **To**: Your email address (e.g., `kontakt@energievergleich.shop`)
   - **Subject**: `Neue Anfrage: {type}`
   - **Body**: Use the template below

5. **Email Template:**
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

6. **Save Automation**
   - Name: "New Form Submission - Team Notification"
   - Toggle **Enabled** to ON

### Automation 2: Auto-Reply to User

1. **Create Another Automation**
   - Click **Create Automation**
   - **Trigger**: "Collection item is created"
   - **Select Collection**: `formsubmissions`

2. **Add Action: Send Email**
   - Click **Add Action**
   - Select **Send Email**

3. **Configure Email:**
   - **To**: `{email}` (from form data)
   - **Subject**: `Vielen Dank für Ihre Anfrage!`
   - **Body**: Use the template below

4. **Email Template:**
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

5. **Save Automation**
   - Name: "New Form Submission - User Auto-Reply"
   - Toggle **Enabled** to ON

### Step 5: Test Automations

1. **Submit a test form** on your website
2. **Check your email** for the team notification
3. **Check the test email address** for the auto-reply
4. **Go to Collections → formsubmissions** to verify the submission was created

---

## Part 4: Verify Everything is Working

### Checklist:

- [ ] **Privacy Center Banner**
  - [ ] Banner appears at bottom of page
  - [ ] "Accept All" button works
  - [ ] "Reject All" button works
  - [ ] "Settings" button opens detailed options
  - [ ] Analytics toggle works

- [ ] **GA4 Integration**
  - [ ] GA4 loads when Analytics consent is given
  - [ ] GA4 does NOT load when Analytics consent is rejected
  - [ ] Page views are tracked in GA4
  - [ ] Custom events are tracked (form submissions, CTA clicks)

- [ ] **Form Submissions Collection**
  - [ ] Collection exists in Wix Dashboard
  - [ ] All fields are created
  - [ ] Permissions are set correctly
  - [ ] Visitors can submit forms

- [ ] **Automations**
  - [ ] Team receives email notification on new submission
  - [ ] User receives auto-reply email
  - [ ] Submission appears in Collections dashboard
  - [ ] All form data is captured correctly

---

## Part 5: Troubleshooting

### Privacy Center Banner Not Showing

**Problem**: Banner doesn't appear on your site

**Solutions**:
1. Clear browser cache and cookies
2. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
3. Check Privacy Center is enabled in Wix Dashboard
4. Check Privacy Policy URL is set
5. Check your site's Privacy Center settings

### GA4 Not Loading

**Problem**: GA4 script doesn't load even with Analytics consent

**Solutions**:
1. Verify Measurement ID is correct in `seo-config.ts`
2. Check Wix Privacy Center is enabled
3. Check Analytics category is configured
4. Check browser console for errors
5. Wait 24-48 hours for GA4 to show data

### Form Submissions Not Appearing

**Problem**: Forms are submitted but don't appear in collection

**Solutions**:
1. Check collection permissions are set to "Anyone" for Insert
2. Check collection name is exactly `formsubmissions`
3. Check all required fields are being submitted
4. Check browser console for errors
5. Verify form submission service is working

### Automations Not Triggering

**Problem**: Emails not being sent on form submission

**Solutions**:
1. Check automations are enabled (toggle ON)
2. Check email addresses are correct
3. Check spam folder for emails
4. Verify collection is correctly selected in automation trigger
5. Test automation manually in Wix Dashboard

---

## Part 6: GA4 Event Tracking

Your app automatically tracks these events:

### Form Submission Event
```javascript
gtag('event', 'form_submit', {
  form_type: 'kontakt' | 'stromvergleich' | 'gasvergleich' | 'photovoltaik',
  user_email: 'user@example.com',
  timestamp: '2024-01-09T08:33:29.293Z'
});
```

### CTA Click Event
```javascript
gtag('event', 'cta_click', {
  button_name: 'hero-tarife-vergleichen' | 'hero-photovoltaik',
  page_location: '/src/components/pages/HomePage.tsx',
  timestamp: '2024-01-09T08:33:29.293Z'
});
```

### Page View Event
```javascript
gtag('event', 'page_view', {
  page_path: '/stromvergleich-nrw',
  page_title: 'Stromvergleich NRW | Energievergleich'
});
```

---

## Part 7: Privacy & Compliance

### GDPR Compliance Checklist

- [x] Consent banner shows before tracking
- [x] Users can reject analytics
- [x] Users can customize consent
- [x] Privacy policy is linked
- [x] GA4 respects consent
- [x] Form data is protected
- [x] Only necessary cookies are set without consent

### Data Protection

- All form submissions are stored in Wix Collections
- Only you can view submissions (permissions set to "Owner only")
- Submissions are automatically timestamped
- User emails are stored for contact purposes
- Consider implementing data retention policies

---

## Part 8: Next Steps

1. **Set up Privacy Center** (Part 1)
2. **Create form submissions collection** (Part 2)
3. **Configure automations** (Part 3)
4. **Test everything** (Part 4)
5. **Monitor GA4** for tracking data
6. **Review form submissions** regularly in Wix Dashboard

---

## Support & Resources

- **Wix Privacy Center**: https://www.wix.com/en/privacy-center
- **Usercentrics**: https://usercentrics.com/
- **Google Analytics 4**: https://analytics.google.com
- **GDPR Compliance**: https://gdpr-info.eu/

---

**Last Updated**: January 9, 2024
**Version**: 2.0 (Wix Privacy Center Integration)
