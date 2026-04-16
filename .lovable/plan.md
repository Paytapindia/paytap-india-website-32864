

## Plan: Remove All Meta Pixel Code

### Files to edit (7 files):

**1. `index.html`** — Remove the Meta Pixel base script (lines 65-78) and the noscript fallback (lines 336-339).

**2. `src/vite-env.d.ts`** — Remove the `fbq` type declaration from the Window interface.

**3. `src/components/ScrollToTop.tsx`** — Remove the `fbq('track', 'PageView')` block (lines 11-14).

**4. `src/components/ContactFormModal.tsx`** — Remove the `fbq('track', 'Lead')` block (lines 52-55).

**5. `src/pages/Checkout.tsx`** — Remove `fbq('track', 'AddToCart')` (lines 156-158) and `fbq('track', 'InitiateCheckout')` (lines 258-262).

**6. `src/pages/CheckoutSuccess.tsx`** — Remove `fbq('track', 'Purchase')` block (lines 92-99).

**7. `src/pages/PayAtPump.tsx`** — Remove `fbq('track', 'InitiateCheckout')` block (lines 44-49).

All Google Ads/GA4 tracking remains untouched.

