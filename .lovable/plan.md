

## Plan: Revamp Checkout Step 1 — Premium Apple-like Plan Selection

### Overview
Simplify Step 1 to a single decision (fleet size), remove product selection, update copy, replace feature checklist, and improve CTA button text.

### Changes in `src/pages/Checkout.tsx`

**1. Update PLANS data (lines 37-78)**
- Remove `subtitle` text ("For individuals", "For scaling fleets", etc.)
- Update prices: Starter ₹999, Business Basic ₹1,998, Business Pro ₹4,998, Corporate ₹9,999
- Remove `features` arrays and `BASELINE_ITEMS` constant (lines 87-93) — no longer needed

**2. Update STEP_LABELS (line 115)**
- Change `'Plan & Product'` to `'Choose Plan'`

**3. Rewrite `renderStep1()` (lines 370-473)**

New structure:
- **Header**: "Activate Smart Payments For Your Vehicles" + subtitle about controlling fuel, tolls, expenses
- **Section title**: "Choose Your Fleet Size" (instead of "Select Your Activation Plan")
- **Plan cards**: Clean cards showing only name, price, "X Vehicle(s) Activated". Remove subtitle line. Keep "Most Popular" badge on Business Pro. Keep selected state styling.
- **Note below cards**: "Additional vehicles can be added anytime."
- **Remove**: Entire "Choose Your Product" section (lines 420-459)
- **Replace checklist** with "What Your Activation Includes" block containing 6 items with icons:
  - NFC PayTap Tag for every vehicle
  - Driver Prepaid Expense Card
  - PayTap Fleet Dashboard Access
  - Real-Time Expense Tracking
  - 1 Year Platform Access Included
  - 3–5 Day Delivery

**4. Update sticky bottom nav CTA (lines 783-790)**
- Change "Next" button text to "Activate My Fleet" (on step 1 only)
- Add micro-line "Setup takes less than 2 minutes." below

**5. Remove `productType` state usage in step 1**
- Keep `productType` state as-is (default `'sticker'`) since it's used in order submission and invoice — just remove the UI selector

**6. Remove AMC display**
- Remove `amcYear2` references from plan cards if any are shown in step 1 (currently they're in the review step — will leave review step unchanged)

### Files Changed

| File | Change |
|------|--------|
| `src/pages/Checkout.tsx` | Rewrite step 1 UI, update plans data, remove product selector, update CTA text |

