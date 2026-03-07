

## Plan: Rework Checkout Plan Pricing & Copy

### Changes in `src/pages/Checkout.tsx`

**1. Update PLANS data (lines 37-78)**

| Plan | Vehicles | Price | Per Vehicle | Cards |
|------|----------|-------|-------------|-------|
| Starter | 1 | ₹699 | ₹699 | 0 |
| Business Basic | 3 | ₹1,799 | ₹599 | 0 |
| Business Pro | 7 | ₹3,999 | ₹571 | 2 |
| Corporate | 15 | ₹7,499 | ₹499 | 5 |

**2. Update plan box UI (lines 400-446)**

- Remove the hardcoded "Only ₹720 per vehicle" from recommended plan
- Instead, show per-vehicle price on **every** plan box: `"₹{perVehicle}/vehicle"` — dynamically calculated
- Add a tagline under each plan:
  - Starter: `"Your vehicle gets its own payment identity. Forever."`
  - Business Basic: `"Save ₹100/vehicle vs Starter"`
  - Business Pro (recommended): `"Best Value · ₹571/vehicle"`
  - Corporate: `"Lowest cost at ₹499/vehicle"`

**3. Update disclaimer text (lines 448-449)**

Keep "Additional vehicles can be added anytime." and "You Pay One Time Activation Fee / Vehicle" as-is.

**4. Everything else stays untouched**

- "What Your Activation Includes" box — no changes
- Dashboard includes — no changes  
- Form steps 2/3/4 — no changes
- Dynamic selection summary — no changes (it already uses `plan.tags` and `formatINR(total)` dynamically)
- PayU payment links will need updating separately (different URLs for new prices)

| File | Section | Change |
|------|---------|--------|
| `src/pages/Checkout.tsx` | Lines 37-78 | Update prices: 699/1799/3999/7499, tags: 1/3/7/15 |
| `src/pages/Checkout.tsx` | Lines 400-446 | Per-vehicle price on all boxes, unique taglines per plan |

