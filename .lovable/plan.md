

## Plan: Fix Meta Pixel Event Detection

### Problem Analysis

The Meta Pixel base code (lines 56-68 in `index.html`) is correctly installed and fires `PageView` on initial load. However, there are issues that may prevent Meta Events Manager from detecting events:

1. **SPA PageView tracking is production-only** — the `ScrollToTop` component checks `window.location.hostname === 'paytap.co.in'` before firing `fbq('track', 'PageView')` on route changes. This is correct for production but prevents Meta's test tools from seeing events on preview domains.

2. **Missing `InitiateCheckout` event** on the Checkout page — only `AddToCart` is fired when landing on checkout. No `InitiateCheckout` is fired when the user clicks "Pay".

3. **Missing `Lead` event** — no lead tracking when users submit the contact form.

### Proposed Changes

**File: `src/pages/Checkout.tsx`**
- Add `fbq('track', 'InitiateCheckout', ...)` when the user clicks "Proceed to Pay" and the form is valid (right before redirecting to PayU)

**File: `src/components/ContactFormModal.tsx`**
- Add `fbq('track', 'Lead')` on successful form submission

**File: `src/components/ScrollToTop.tsx`**
- Keep production-only check for `gtag` (Google Ads costs money per click)
- **Remove** the production-only check for `fbq('track', 'PageView')` so Meta can detect events on any domain during testing — Meta Pixel doesn't incur costs from test events

### No changes to `index.html`
The base pixel code is already correctly placed inside `<head>`. No modifications needed there.

### Technical Notes
- Meta's Event Setup Tool and Test Events feature require events to fire on the domain being tested — removing the hostname check for `fbq` allows Meta to verify events on preview/test URLs
- The `noscript` fallback (line 322-325) is correctly placed in `<body>`

