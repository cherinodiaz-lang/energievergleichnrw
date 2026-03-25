# Form Submission & GDPR Compliance Implementation Guide

## Overview

This guide explains the complete form submission system, GDPR compliance, and GA4 integration implemented in the Energievergleich application.

---

## 1. Form Submission System

### Architecture

The form submission system consists of:

1. **FormSubmissionDialog** (`/src/components/FormSubmissionDialog.tsx`)
   - Reusable modal component for all form submissions
   - Handles privacy checkbox (GDPR compliant)
   - Shows thank you state after successful submission
   - Integrates with GA4 tracking

2. **Form Submission Service** (`/src/services/form-submission.ts`)
   - Handles data validation
   - Submits to Wix Collections
   - Triggers email automations
   - Tracks events in GA4

3. **Integration Points**
   - HomePage.tsx (Contact & PV forms)
   - KontaktPage.tsx (Contact form)
   - StromvergleichNrwPage.tsx (Comparison forms)
   - GasvergleichNrwPage.tsx (Comparison forms)
   - PhotovoltaikNrwPage.tsx (PV consultation form)

### How It Works

#### Step 1: User Fills Form
```typescript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  message: '',
  type: 'kontakt'
});
```

#### Step 2: User Submits
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setShowDialog(true); // Opens FormSubmissionDialog
};
```

#### Step 3: Dialog Validates & Submits
```typescript
// FormSubmissionDialog handles:
// - Privacy checkbox validation (GDPR)
// - Field validation
// - Form submission to Wix Collection
// - GA4 event tracking
// - Thank you state display
```

#### Step 4: Wix Automations Trigger
- Email notification to team
- Auto-reply to user
- Submission visible in Wix Dashboard

---

## 2. GDPR Compliance

### Privacy Checkbox

Every form includes a mandatory privacy checkbox:

```typescript
<div className="flex items-start gap-3">
  <Checkbox
    id="privacy-consent"
    checked={privacyConsent}
    onCheckedChange={(checked) => setPrivacyConsent(checked as boolean)}
  />
  <Label htmlFor="privacy-consent">
    Ich habe die{' '}
    <Link to="/datenschutz" target="_blank">
      Datenschutzhinweise
    </Link>
    {' '}gelesen und akzeptiert. *
  </Label>
</div>
```

**Features:**
- Links to `/datenschutz` page
- Mandatory (prevents form submission without consent)
- Clear, user-friendly language
- Accessible (proper label association)

### Consent Banner

The `ConsentBanner` component (`/src/components/ConsentBanner.tsx`) manages:

1. **Initial Display**
   - Shows on first visit if no consent preferences saved
   - Allows users to accept all, reject all, or customize

2. **Consent Types**
   - **Necessary**: Always enabled (required for site functionality)
   - **Analytics**: GA4 tracking (optional)
   - **Marketing**: Retargeting & ads (optional)

3. **Storage**
   - Saves preferences to `localStorage` under key: `wix-consent-preferences`
   - Persists across sessions

4. **GA4 Integration**
   - Only loads GA4 if analytics consent is given
   - Updates consent mode dynamically
   - Dispatches custom event for other components to listen

---

## 3. GA4 Integration

### Setup Instructions

#### Step 1: Get Your Measurement ID

1. Go to [Google Analytics 4](https://analytics.google.com)
2. Create a new property for your website
3. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

#### Step 2: Add to SEO Config

File: `/src/lib/seo-config.ts`

```typescript
export const SEO_CONFIG = {
  googleAnalyticsId: 'G-YOUR_MEASUREMENT_ID', // ← Add here
  googleSearchConsoleVerification: 'your-verification-code',
  // ... other config
};
```

#### Step 3: Verify in Google Analytics

1. Go to Admin → Data Streams
2. Select your web stream
3. Check "Measurement Protocol API secret" (for server-side tracking if needed)

### Event Tracking

#### Form Submission Events

Automatically tracked when forms are submitted:

```typescript
// Event: form_submit
{
  form_type: 'kontakt' | 'stromvergleich' | 'gasvergleich' | 'photovoltaik',
  user_email: 'user@example.com',
  timestamp: '2024-01-09T08:33:29.293Z'
}
```

#### CTA Click Events

Tracked when users click hero buttons:

```typescript
// Event: cta_click
{
  button_name: 'hero-tarife-vergleichen' | 'hero-photovoltaik',
  page_location: '/src/components/pages/HomePage.tsx',
  timestamp: '2024-01-09T08:33:29.293Z'
}
```

### Consent-Aware Loading

GA4 only loads if user gives analytics consent:

```typescript
// In GoogleAnalytics.tsx
useEffect(() => {
  if (!measurementId || !hasConsent) return; // Only load if consent given

  // Load GA4 script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}, [measurementId, hasConsent]);
```

---

## 4. Google Search Console Integration

### Setup Instructions

#### Step 1: Verify Domain

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (energievergleich.shop)
3. Choose verification method:
   - **HTML file upload** (recommended)
   - **HTML tag** (easiest)
   - **DNS record**
   - **Google Analytics**

#### Step 2: Get Verification Code

If using HTML tag method:

```html
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
```

#### Step 3: Add to SEO Config

File: `/src/lib/seo-config.ts`

```typescript
export const SEO_CONFIG = {
  googleAnalyticsId: 'G-YOUR_MEASUREMENT_ID',
  googleSearchConsoleVerification: 'YOUR_VERIFICATION_CODE', // ← Add here
  // ... other config
};
```

#### Step 4: Verify in GSC

1. Go back to Search Console
2. Click "Verify"
3. Wait for verification (usually instant)

### Monitoring

Once verified, you can:
- View search performance
- Monitor indexing status
- Check for crawl errors
- Submit sitemaps
- View Core Web Vitals

---

## 5. Wix Form Submissions & Automations

### Creating the Collection

1. **Go to Wix Dashboard**
   - Content Management → Collections

2. **Create New Collection**
   - Name: `formsubmissions`
   - Fields:
     - `type` (Text): kontakt, stromvergleich, gasvergleich, photovoltaik, gewerbestrom, gewerbegas
     - `name` (Text): User's name
     - `email` (Email): User's email
     - `phone` (Text, optional): User's phone
     - `message` (Text, optional): User's message
     - `postleitzahl` (Text, optional): Postal code
     - `verbrauch` (Text, optional): Energy consumption
     - Plus any other fields specific to form types

3. **Set Permissions**
   - Insert: Anyone
   - Update: Owner only
   - Remove: Owner only
   - Read: Owner only

### Setting Up Automations

#### Automation 1: Email Notification to Team

1. **Go to Automations**
   - Settings → Automations

2. **Create New Automation**
   - Trigger: "Collection item is created"
   - Select collection: `formsubmissions`

3. **Add Action: Send Email**
   - To: `team@energievergleich.shop`
   - Subject: `Neue Anfrage: {type}`
   - Body:
     ```
     Neue Anfrage eingegangen:

     Name: {name}
     E-Mail: {email}
     Telefon: {phone}
     Typ: {type}

     Nachricht:
     {message}

     Postleitzahl: {postleitzahl}
     Verbrauch: {verbrauch}

     Eingangsdatum: {_createdDate}
     ```

#### Automation 2: Auto-Reply to User

1. **Create Another Automation**
   - Trigger: "Collection item is created"
   - Select collection: `formsubmissions`

2. **Add Action: Send Email**
   - To: `{email}` (from form data)
   - Subject: `Vielen Dank für Ihre Anfrage!`
   - Body:
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

### Viewing Submissions

1. **Go to Collections**
   - Content Management → Collections → formsubmissions

2. **View All Submissions**
   - See all form submissions
   - Filter by type, date, etc.
   - Export data if needed

---

## 6. Form Validation

### Built-in Validations

The form submission service includes validation for:

```typescript
// Required fields
- name (required)
- email (required, must be valid email)
- phone (optional, but if provided must be valid)
- postleitzahl (optional, but if provided must be 5 digits)
- message (required for contact forms)
- privacy checkbox (required)
```

### Custom Validation

Add custom validation in `FormSubmissionDialog`:

```typescript
const validation = validateForm(formData, requiredFields);
if (!validation.valid) {
  setErrors(validation.errors);
  return;
}
```

---

## 7. Error Handling

### User-Facing Errors

Errors are displayed in the dialog:

```typescript
{Object.keys(errors).length > 0 && (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
    {Object.entries(errors).map(([field, error]) => (
      <div key={field} className="flex items-start gap-2 text-red-700 text-sm">
        <AlertCircle className="w-4 h-4 mt-0.5" />
        <span>{error}</span>
      </div>
    ))}
  </div>
)}
```

### Server-Side Errors

If submission fails:

```typescript
{
  success: false,
  message: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
  error: 'Detailed error message'
}
```

---

## 8. Testing

### Test Form Submission

1. **Fill out any form** (e.g., Contact form on HomePage)
2. **Check privacy checkbox**
3. **Click submit**
4. **Verify:**
   - Dialog appears with thank you message
   - Dialog auto-closes after 3 seconds
   - Form resets
   - Check Wix Dashboard → Collections → formsubmissions for new entry
   - Check email inbox for auto-reply

### Test GA4 Tracking

1. **Open Google Analytics**
2. **Go to Real-time → Events**
3. **Submit a form**
4. **Verify `form_submit` event appears** with correct data

### Test Consent Banner

1. **Clear localStorage** (DevTools → Application → Local Storage)
2. **Refresh page**
3. **Verify consent banner appears**
4. **Test:**
   - Accept all → GA4 loads
   - Reject all → GA4 doesn't load
   - Custom settings → GA4 loads only if analytics enabled

---

## 9. Troubleshooting

### GA4 Not Tracking

**Problem:** Events not appearing in GA4

**Solutions:**
1. Check Measurement ID is correct in `seo-config.ts`
2. Verify consent is given (check localStorage)
3. Check browser console for errors
4. Wait 24-48 hours for data to appear in GA4

### Forms Not Submitting

**Problem:** Form submission fails

**Solutions:**
1. Check Wix Collection `formsubmissions` exists
2. Verify collection permissions are set to "Anyone" for insert
3. Check browser console for errors
4. Verify email format is valid

### Consent Banner Not Showing

**Problem:** Consent banner doesn't appear

**Solutions:**
1. Clear localStorage: `localStorage.removeItem('wix-consent-preferences')`
2. Hard refresh page (Ctrl+Shift+R)
3. Check ConsentBanner is imported in Router.tsx

### Automations Not Triggering

**Problem:** Emails not being sent

**Solutions:**
1. Go to Wix Automations → Check automation is enabled
2. Verify email addresses are correct
3. Check spam folder for emails
4. Test automation manually in Wix Dashboard

---

## 10. Future Enhancements

### Planned Features

1. **reCAPTCHA Integration**
   - Add spam protection to forms
   - Implement in FormSubmissionDialog

2. **Advanced Analytics**
   - Track form field interactions
   - Monitor form abandonment rates
   - A/B test form variations

3. **CRM Integration**
   - Sync form submissions to CRM
   - Automatic lead scoring
   - Follow-up automation

4. **Multi-Language Support**
   - Translate forms to English
   - Localize error messages
   - Regional consent requirements

---

## 11. Compliance Checklist

- [x] Privacy checkbox on all forms
- [x] Link to Datenschutz page
- [x] GDPR-compliant consent banner
- [x] Consent-aware GA4 loading
- [x] Email automations for submissions
- [x] Form validation
- [x] Error handling
- [x] GA4 event tracking
- [x] GSC verification ready
- [x] Wix Collection setup ready

---

## 12. Contact & Support

For questions or issues:

- **Email:** kontakt@energievergleich.shop
- **Phone:** +49 211 1234567
- **Wix Support:** https://support.wix.com

---

**Last Updated:** January 9, 2024
**Version:** 1.0
