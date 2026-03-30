

## Plan: Update Trial Pack to ₹699

### Files to change

**1. `src/pages/Checkout.tsx`**
- Line 33: `price: 499` → `price: 699`
- Line 37: `'₹499/vehicle'` → `'₹699/vehicle'`
- Line 58: payment link → `"https://u.payu.in/PAYUMN/Xr1SVwoifsmy"`

**2. `src/lib/generateInvoice.ts`**
- Line 40: Replace the `499` breakdown with a new `699` entry. New breakdown: Activation ₹500 + AMC ₹200 - Discount ₹1 = ₹699 (preserving the pattern)

**3. `supabase/functions/create-payment/index.ts`**
- Line 56: `sticker: 499` → `sticker: 699`

**4. `src/pages/SampleInvoice.tsx`**
- Line 33: `total: 499` → `total: 699`

**5. `src/pages/PayAtPump.tsx`**
- Update all ₹499 references to ₹699 (prices in analytics events, schema markup, button labels, meta description)

**6. `src/pages/CheckoutSuccess.tsx`**
- Update fallback `'499'` values to `'699'` in analytics tracking

