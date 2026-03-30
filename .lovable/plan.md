

## Plan: Update Trial Pack to ₹999 and Add Business Basic ₹1,600

### Files to change

**1. `src/pages/Checkout.tsx`**
- **Line 19**: Update PlanType to include `business_basic`: `'starter' | 'business_basic' | 'business_pro' | 'corporate'`
- **Lines 31-37**: Update Trial Pack price from `699` to `999`, perVehicle to `'₹999/vehicle'`
- **After line 38**: Insert new `business_basic` plan: `{ name: 'Business Basic', price: 1600, tags: 2, recommended: false, isBusinessPlan: false, perVehicle: '₹800/vehicle' }`
- **Line 58**: Update starter link to new one (or keep same), add `business_basic: "https://u.payu.in/PAYUMN/rJAyWInVMJLz"`
- **Line 64**: Add `if (planKey === 'business_basic') return 0;` for driver cards logic
- Update plan selector UI to render 4 plans instead of 3

**2. `src/lib/generateInvoice.ts`**
- Update `699` breakdown entry to `999`: new breakdown for ₹999 (Activation ₹700 + AMC ₹300 - Discount ₹1 = ₹999)
- Verify `1600` breakdown already exists (it should from before)

**3. `supabase/functions/create-payment/index.ts`**
- Line 56: Update `sticker: 699` → `sticker: 999`

**4. `src/pages/SampleInvoice.tsx`**
- Update Trial Pack total from `699` to `999`
- Verify Business Basic entry exists at `1600`

**5. `src/pages/PayAtPump.tsx`**
- Update ₹699 references to ₹999

**6. `src/pages/CheckoutSuccess.tsx`**
- Update fallback `'699'` values to `'999'`

