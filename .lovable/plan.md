

## Plan: Fix Business Basic to 2 Vehicles & Verify Invoice Alignment

### Analysis

**Invoice calculations are correct** with the GST-inclusive model. The checkout passes `subtotal` (back-calculated base) to the invoice, which then re-applies 18% GST — producing the correct totals:

| Plan | Total (inclusive) | Subtotal (base) | GST | Invoice Grand Total |
|------|------------------|-----------------|-----|-------------------|
| Starter | ₹999 | ₹847 | ₹152 | ₹999 |
| Business Basic | ₹1,999 | ₹1,694 | ₹305 | ₹1,999 |
| Business Pro | ₹4,999 | ₹4,236 | ₹763 | ₹4,999 |
| Corporate | ₹9,999 | ₹8,474 | ₹1,525 | ₹9,999 |

All invoice totals match the plan prices. No changes needed in `generateInvoice.ts`.

### Change

**File:** `src/pages/Checkout.tsx`, line 52

Change `tags: 3` → `tags: 2` for the Business Basic plan.

