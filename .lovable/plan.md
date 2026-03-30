

## Plan: Add Trial Pack (₹499) Invoice Breakdown + Update Edge Function

### Problem
- `generateInvoice.ts` has no `PLAN_BREAKDOWNS` entry for `499`, so invoices for the Trial Pack will fail
- `create-payment` edge function still has `sticker: 999` hardcoded
- `SampleInvoice.tsx` still references the old Starter at ₹999

### Changes

**1. `src/lib/generateInvoice.ts` (line 40)**
Add a new entry for the ₹499 Trial Pack breakdown:
```
499: { amcInclGst: 150, perUnitActivation: 350, vehicles: 1, discountInclGst: 1 },
```
(Activation ₹350 + AMC ₹150 - Discount ₹1 = ₹499)

**2. `supabase/functions/create-payment/index.ts` (line 56)**
Update the sticker price from `999` to `499`

**3. `src/pages/SampleInvoice.tsx` (line 33)**
Update the Starter plan in the `plans` array: rename to `'Trial Pack'` and change total from `999` to `499`

**4. `src/pages/Checkout.tsx`**
No changes needed — already updated to ₹499 Trial Pack

