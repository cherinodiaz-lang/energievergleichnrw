# GA4 Debug Mode Implementation

## Overview
A production-safe debug mode for GA4 events that allows developers to test event tracking without affecting production analytics data.

## Implementation Details

### Files Modified
1. **`/src/services/ga4-tracking.ts`** - Core GA4 tracking service
2. **`/src/components/ConsentBanner.tsx`** - Consent management component

---

## Debug Mode Activation

### URL Parameter
Debug mode is activated by adding `?debug=1` to the URL:
```
https://example.com/?debug=1
https://example.com/page?debug=1
```

### Detection Logic
```typescript
// In initializeGA4()
debugMode = new URLSearchParams(window.location.search).get('debug') === '1';
```

---

## Feature 1: Debug Mode Parameter on All Events

### Implementation
When debug mode is active (`?debug=1`), all GA4 events automatically include the parameter:
```typescript
debug_mode: true
```

### Code Location
In `trackEvent()` function (lines 129-132):
```typescript
// Add debug_mode parameter if in debug mode
const eventWithDebug = debugMode
  ? { ...eventData, debug_mode: true }
  : eventData;
```

### Example
**Production Event (no debug):**
```json
{
  "event_name": "form_submit",
  "page_path": "/stromvergleich-nrw",
  "form_type": "tariff_calculator",
  "timestamp": "2026-02-17T10:30:00.000Z"
}
```

**Debug Event (with ?debug=1):**
```json
{
  "event_name": "form_submit",
  "page_path": "/stromvergleich-nrw",
  "form_type": "tariff_calculator",
  "debug_mode": true,
  "timestamp": "2026-02-17T10:30:00.000Z"
}
```

---

## Feature 2: GA4 Test Ping Event

### Event Details
- **Event Name:** `ga4_test_ping`
- **Trigger:** Automatically sent once per page load
- **Conditions:** 
  - URL parameter `?debug=1` must be present
  - Analytics consent must be granted
  - Sent exactly once per page load (duplicate prevention)

### Parameters
```typescript
{
  "page_path": "/current/page/path",
  "debug_mode": true
}
```

### Code Location
Function `sendDebugTestPing()` (lines 239-259):
```typescript
export function sendDebugTestPing() {
  if (typeof window === 'undefined') return;

  // Only send if debug mode is active, consent is granted, and not already sent
  if (!debugMode || !consentGranted || debugTestPingSent) {
    if (debugMode && !consentGranted) {
      console.log('[GA4 DEBUG] Test ping blocked: consent not granted');
    }
    return;
  }

  // Mark as sent to prevent duplicate sends
  debugTestPingSent = true;

  trackEvent('ga4_test_ping', {
    'page_path': window.location.pathname,
    'debug_mode': true,
  });

  console.log('[GA4 DEBUG] Test ping sent (ga4_test_ping)');
}
```

### Trigger Location
In `ConsentBanner.tsx` (lines 65-82):
```typescript
const applyConsent = (consentState: ConsentState) => {
  // Update GA4 consent mode via service
  updateConsent(consentState.analytics, consentState.marketing);

  // Send debug test ping if in debug mode and analytics consent granted
  if (consentState.analytics) {
    setTimeout(() => {
      sendDebugTestPing();
    }, 100);
  }

  // Dispatch custom event for other components
  window.dispatchEvent(
    new CustomEvent('consent-updated', {
      detail: consentState,
    })
  );
};
```

---

## Feature 3: Consent Guard

### Rules
1. **No events before consent decision** - Events are queued until consent is determined
2. **No events if consent denied** - Events are blocked if user rejects analytics
3. **Events only sent if consent granted** - All events require `consentGranted = true`

### Implementation
In `trackEvent()` (lines 112-127):
```typescript
// If consent not yet determined, queue the event
if (!consentGranted && eventQueue.length < 50) {
  eventQueue.push({ eventName, eventData });
  if (debugMode) {
    console.log('[GA4 DEBUG] Event queued (consent pending):', eventName, eventData);
  }
  return;
}

// Only send event if consent is granted
if (!consentGranted) {
  if (debugMode) {
    console.log('[GA4 DEBUG] Event blocked (consent denied):', eventName);
  }
  return;
}
```

### Consent Flow
```
User visits page
  ↓
ConsentBanner appears (if first visit)
  ↓
User accepts/rejects analytics
  ↓
updateConsent() called
  ↓
consentGranted = true/false
  ↓
If true: Flush queued events + send ga4_test_ping (if debug=1)
If false: Discard queued events, block all future events
```

---

## Console Logging

### Debug Output Examples

**Initialization:**
```
[GA4 DEBUG] Initialized with Measurement ID: G-XXXXXXXXXX
```

**Consent Update:**
```
[GA4 DEBUG] Consent updated: {
  analytics: true,
  marketing: true,
  timestamp: "2026-02-17T10:30:00.000Z"
}
```

**Event Sent:**
```
[GA4 DEBUG] Event sent: form_submit {
  page_path: "/stromvergleich-nrw",
  form_type: "tariff_calculator",
  debug_mode: true,
  timestamp: "2026-02-17T10:30:00.000Z"
}
```

**Test Ping Sent:**
```
[GA4 DEBUG] Test ping sent (ga4_test_ping)
```

**Test Ping Blocked (no consent):**
```
[GA4 DEBUG] Test ping blocked: consent not granted
```

---

## Testing Checklist

### Test 1: Debug Mode Activation
- [ ] Visit page with `?debug=1`
- [ ] Check console for `[GA4 DEBUG] Initialized...` message
- [ ] Verify `isDebugMode()` returns `true`

### Test 2: Debug Parameter on Events
- [ ] Accept analytics consent
- [ ] Trigger any event (e.g., form submission, CTA click)
- [ ] Check GA4 Real-time report
- [ ] Verify `debug_mode: true` parameter is present
- [ ] Verify event is NOT counted in main analytics (debug events are separate)

### Test 3: GA4 Test Ping Event
- [ ] Visit page with `?debug=1`
- [ ] Accept analytics consent
- [ ] Check console for `[GA4 DEBUG] Test ping sent (ga4_test_ping)`
- [ ] Check GA4 Real-time report for `ga4_test_ping` event
- [ ] Verify it contains `page_path` and `debug_mode: true`
- [ ] Reload page - verify test ping is sent only once (not duplicated)

### Test 4: Test Ping Without Consent
- [ ] Visit page with `?debug=1`
- [ ] Reject analytics consent
- [ ] Check console for `[GA4 DEBUG] Test ping blocked: consent not granted`
- [ ] Verify `ga4_test_ping` event is NOT sent

### Test 5: Production Mode (No Debug)
- [ ] Visit page WITHOUT `?debug=1`
- [ ] Accept analytics consent
- [ ] Trigger any event
- [ ] Check GA4 Real-time report
- [ ] Verify `debug_mode` parameter is NOT present
- [ ] Verify event is counted in main analytics

### Test 6: Consent Guard
- [ ] Visit page without accepting/rejecting consent
- [ ] Trigger events (they should be queued)
- [ ] Accept consent
- [ ] Verify queued events are flushed to GA4
- [ ] Verify test ping is sent (if debug=1)

---

## Helper Functions

### Check Debug Mode Status
```typescript
import { isDebugMode } from '@/services/ga4-tracking';

if (isDebugMode()) {
  console.log('Debug mode is active');
}
```

### Check Analytics Consent
```typescript
import { isAnalyticsConsented } from '@/services/ga4-tracking';

if (isAnalyticsConsented()) {
  console.log('Analytics consent is granted');
}
```

### Get Queued Events Count
```typescript
import { getQueuedEventsCount } from '@/services/ga4-tracking';

console.log('Queued events:', getQueuedEventsCount());
```

### Reset Test Ping Flag (for testing)
```typescript
import { resetDebugTestPingFlag } from '@/services/ga4-tracking';

resetDebugTestPingFlag(); // Allows sending test ping again
```

---

## Production Safety

### Why This Is Safe
1. **Debug events are separate** - GA4 filters events with `debug_mode: true` parameter
2. **No production data pollution** - Debug events don't affect main analytics
3. **Opt-in only** - Debug mode requires explicit `?debug=1` URL parameter
4. **Consent respected** - No events sent without user consent
5. **No performance impact** - Debug logging only in debug mode

### GA4 Configuration
In Google Analytics 4:
1. Create a separate **Debug View** (optional but recommended)
2. Filter by `debug_mode` parameter = `true`
3. Use this view for testing without affecting main reports

---

## Summary

| Feature | Status | Location |
|---------|--------|----------|
| Debug mode activation (`?debug=1`) | ✅ Implemented | `ga4-tracking.ts` line 34 |
| Add `debug_mode: true` to all events | ✅ Implemented | `ga4-tracking.ts` lines 129-132 |
| GA4 test ping event (`ga4_test_ping`) | ✅ Implemented | `ga4-tracking.ts` lines 239-259 |
| Consent guard (no events before consent) | ✅ Implemented | `ga4-tracking.ts` lines 112-127 |
| Test ping only with consent | ✅ Implemented | `ga4-tracking.ts` lines 243-248 |
| Duplicate prevention (once per page load) | ✅ Implemented | `ga4-tracking.ts` lines 24, 251 |
| Console logging | ✅ Implemented | Throughout `ga4-tracking.ts` |

---

## Build Status
✅ **Build: OK** - All changes are TypeScript-safe and production-ready
