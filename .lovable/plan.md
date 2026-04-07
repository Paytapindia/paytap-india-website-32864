

## Plan: Make Trial Pack ₹999 with PayU Payment

### File: `src/pages/Checkout.tsx`

### Changes

**1. Update starter plan price and label (lines 31-38)**
- Change `price: 0` → `price: 999`
- Change `perVehicle: 'Free'` → `perVehicle: '₹999/vehicle'`

**2. Starter PayU link already exists (line 66)** — `https://u.payu.in/PAYUMN/irvSRzjqTMEv` is already configured. No change needed.

**3. Remove free trial redirect logic (lines 271-283)** — Delete the `if (selectedPlan === 'starter')` early return block that saves a lead and redirects. Starter will now flow through the normal paid order + PayU path like other plans.

**4. Make starter require form + address like paid plans (line 323)** — Remove the `if (key !== 'starter')` guard so selecting starter also opens the form.

**5. Remove starter-specific button (lines 754-776)** — Delete the separate "Activate Free Trial" button branch. Starter will use the same "Pay ₹999 & Go Live →" button as other plans.

**6. Remove the "Discount Price" italic message (lines 524-529)** — Delete the second bullet that says "Create Account & Contact Support to Get the Vehicle Payment Tag at Discount Price".

**7. Update bottom text (line 807)** — Remove the starter ternary; use the same "Secure checkout · Takes 30 seconds" for all plans.

**8. Update "Free" price display (line 507)** — The `total === 0 ? 'Free'` branch will no longer trigger since price is 999, but clean it up for consistency.

**9. Hide "Payment Tag" line for starter (if applicable)** — Verify existing conditional still works correctly with starter at ₹999.

### Result
- Trial Pack shows ₹999, requires full form, opens PayU link on submit
- "Create Account & Contact Support…" text removed
- Starter behaves like any other paid plan

