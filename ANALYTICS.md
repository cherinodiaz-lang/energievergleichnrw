# Analytics & Tracking Documentation

## Overview

The application uses a custom analytics service for comprehensive event tracking and monitoring.

## Analytics Service

### Location

`src/services/analytics.ts`

### Usage

```typescript
import { analytics } from '@/services/analytics';

// Track custom event
analytics.track('custom_event', {
  property1: 'value1',
  property2: 'value2',
});

// Track form submission
analytics.trackFormSubmit('comparison', true, 'Cologne');

// Track CTA click
analytics.trackCtaClick('Jetzt vergleichen', 'hero_section');
```

## Standard Events

### Form Events

#### `form_submit_start`

Triggered when user submits a form.

**Properties:**

- `city`: string - City name
- `form_type`: string - Type of form
- `contract_type`: 'strom' | 'gas' | 'beide'

#### `form_submit_success`

Triggered on successful form submission.

**Properties:**

- `form_type`: string
- `city`: string
- `success`: true

#### `form_submit_error`

Triggered on form submission error.

**Properties:**

- `form_type`: string
- `city`: string
- `success`: false
- `error_message`: string

### Interaction Events

#### `cta_click`

Triggered when user clicks a call-to-action button.

**Properties:**

- `cta_text`: string - Button text
- `location`: string - Page section

#### `methodology_click`

Triggered when user interacts with methodology section.

**Properties:**

- `section`: string - Section identifier

#### `contact_click`

Triggered when user clicks contact element.

**Properties:**

- `contact_type`: 'phone' | 'email' | 'form'

### Page Events

#### `page_view`

Triggered on page load.

**Properties:**

- `page_path`: string
- `page_title`: string

### Error Events

#### `js_error`

Triggered on JavaScript errors.

**Properties:**

- `error_message`: string
- `error_stack`: string (truncated to 200 chars)
- `page_path`: string

#### `page_404`

Triggered when 404 page is loaded.

**Properties:**

- `requested_url`: string
- `referrer`: string

#### `error`

Generic error event.

**Properties:**

- `error_type`: string
- `error_message`: string
- Additional context properties

## Automatic Tracking

### Global Error Handler

All JavaScript errors are automatically tracked:

```javascript
window.addEventListener('error', function (event) {
  window.trackEvent?.('js_error', {
    error_message: event.error?.message,
    error_stack: event.error?.stack,
    page_path: window.location.pathname,
  });
});
```

### 404 Monitoring

All 404 pages automatically send tracking events:

```javascript
if (window.location.pathname.includes('404')) {
  window.trackEvent?.('page_404', {
    requested_url: window.location.href,
    referrer: document.referrer,
  });
}
```

## Integration with Google Analytics 4

### Setup

1. Create GA4 property
2. Add measurement ID to environment:

```env
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

3. Add GA4 script to BaseLayout:

```astro
<script
  async
  src={`https://www.googletagmanager.com/gtag/js?id=${import.meta.env.PUBLIC_GA_MEASUREMENT_ID}`}
></script>
<script is:inline define:vars={{ measurementId: import.meta.env.PUBLIC_GA_MEASUREMENT_ID }}>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', measurementId);
</script>
```

### Custom Events in GA4

All events are automatically sent to GA4 if gtag is available:

```typescript
if (typeof window.gtag === 'function') {
  window.gtag('event', event.name, event.properties);
}
```

## GDPR Compliance

### Consent Mode

Implement Google Consent Mode v2:

```javascript
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  wait_for_update: 500,
});

// After user consent
gtag('consent', 'update', {
  analytics_storage: 'granted',
});
```

### IP Anonymization

```javascript
gtag('config', measurementId, {
  anonymize_ip: true,
});
```

## Development Mode

In development, all events are logged to console:

```typescript
if (import.meta.env.DEV) {
  console.log('[Analytics Event]', event);
}
```

## Reports & Dashboards

### Recommended GA4 Reports

1. **Form Conversion Funnel**
   - form_submit_start → form_submit_success
   - Conversion rate by city

2. **Error Monitoring**
   - js_error events grouped by error_message
   - 404 pages by requested_url

3. **User Engagement**
   - cta_click events by location
   - methodology_click by section
   - contact_click by type

### Custom Dimensions

- City
- Form Type
- Contract Type
- Error Type

## Testing

### Test Events

```javascript
// Open browser console
window.trackEvent('test_event', { test: 'data' });

// Check GA4 DebugView
// https://analytics.google.com/analytics/web/#/debugview/
```

### Verify Integration

1. Enable GA4 DebugView
2. Navigate through site
3. Submit form
4. Check events in real-time
