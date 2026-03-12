

## Invoice Fix: Two-Line Breakup + Remove Balance Due

### What Changes

**Invoice PDF only** — no changes to the checkout page or website UI.

### 1. Remove "Payment Made" and "Balance Due" from invoice

Lines 322-331 in `generateInvoice.ts` — delete the "Payment Made: (-) ₹X" and "Balance Due: ₹0.00" text.

### 2. Split into two line items with separate HSN codes

Replace the single line item with two rows:

| Line Item | HSN | Calculation |
|-----------|-----|-------------|
| One Time Activation & NFC Installation Charges | 997159 | Per-unit rate × vehicle count |
| Annual Maintenance Charges (AMC) | 998313 | Fixed AMC amount |

**Breakdowns per plan** (GST-inclusive amounts, pre-tax shown on invoice):

| Plan | Total | AMC | Activation (total - AMC) | Vehicles | Activation/unit |
|------|-------|-----|--------------------------|----------|-----------------|
| Starter (₹999) | ₹999 | ₹300 | ₹699 | 1 | ₹699 |
| Business Basic (₹1,600) | ₹1,600 | ₹600 | ₹1,000 | 2 | ₹500 |
| Business Pro (₹3,749) | ₹3,749 | ₹1,199 | ₹2,550 | 5 | ₹510 |
| Corporate (₹6,999) | ₹6,999 | ₹2,400 | ₹4,599 | 10 | ₹459.90 |

The invoice will show pre-tax amounts (÷1.18) for each line, with GST calculated in the summary section. Both lines total to the package price.

### 3. Fix Admin Orders PLAN_MAP

The `PLAN_MAP` in `AdminOrders.tsx` has outdated prices (499/899/1999/4999). Update to match current prices (999/1600/3749/6999) so admin invoice downloads work correctly.

### Files Modified

| File | Change |
|------|--------|
| `src/lib/generateInvoice.ts` | Add AMC breakdown config, render two line items, remove balance due lines |
| `src/pages/admin/AdminOrders.tsx` | Fix PLAN_MAP with correct prices |
| `src/pages/SampleInvoice.tsx` | Update sample data to match new format |

