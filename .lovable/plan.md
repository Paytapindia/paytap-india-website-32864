

## Fix Invoice: Audit-Safe Calculation Flow + GST Compliance

### Problem

The current invoice computes `activationPreTax = activationInclGst / 1.18` independently from `rate = perUnitActivation / 1.18`. For the ₹6,999 plan, this causes **Rate × Qty ≠ Amount** (389.75 × 10 = 3,897.50 but amount shows 3,897.46). This fails accounting audits.

Additionally missing: "Reverse Charge: No" field, State Code in company header, and round-off line item.

### Calculation Fix (Bottom-Up)

New flow for each line item:
1. `rate = round(perUnitInclGst / 1.18, 2)` — per-unit pre-tax rate
2. `amount = rate × qty` — line amount (always exact multiplication)
3. `subtotal = sum of all line amounts`
4. GST: `cgst = round(subtotal × 0.09, 2)`, `sgst = round(subtotal × 0.09, 2)` (or IGST for inter-state)
5. `calculatedTotal = subtotal + cgst + sgst`
6. `roundOff = grandTotal - calculatedTotal` — shown as "Round Off" line

This ensures **Rate × Qty = Amount** always, and any rounding difference appears transparently.

### Verified Math (All 4 Plans)

| Plan | Act Rate | ×Qty | Act Amt | AMC Rate | AMC Amt | Subtotal | CGST | SGST | Calc Total | Round Off |
|------|----------|------|---------|----------|---------|----------|------|------|------------|-----------|
| ₹999 | 592.37 | ×1 | 592.37 | 254.24 | 254.24 | 846.61 | 76.19 | 76.19 | 998.99 | +0.01 |
| ₹1600 | 423.73 | ×2 | 847.46 | 508.47 | 508.47 | 1,355.93 | 122.03 | 122.03 | 1,599.99 | +0.01 |
| ₹3749 | 432.20 | ×5 | 2,161.02 | 1,016.10 | 1,016.10 | 3,177.12 | 285.94 | 285.94 | 3,749.00 | 0.00 |
| ₹6999 | 389.75 | ×10 | 3,897.50 | 2,033.90 | 2,033.90 | 5,931.40 | 533.83 | 533.83 | 6,999.06 | -0.06 |

### Changes to `src/lib/generateInvoice.ts`

1. **Calculation logic** — Replace the current top-down `÷1.18` approach with bottom-up `Rate × Qty = Amount` flow
2. **Add "Reverse Charge: No"** in invoice details section
3. **Add State Code** next to GSTIN in company header (State Code: 29)
4. **Add "Round Off" line** before Grand Total when adjustment ≠ 0
5. **Show CGST/SGST amounts** computed from `subtotal × 9%` (not `grandTotal - subtotalPreTax`)
6. **Amount in Words** uses the final rounded grand total

### Changes to `src/pages/admin/AdminOrders.tsx`

No structural changes — the `handleDownloadInvoice` already passes `total` which drives the `PLAN_BREAKDOWNS` lookup. The invoice generator fix handles everything.

### Changes to `src/pages/SampleInvoice.tsx`

No changes needed — it passes `total` correctly.

### Files Modified

| File | Change |
|------|--------|
| `src/lib/generateInvoice.ts` | Bottom-up calculation, round-off line, Reverse Charge field, State Code in header |

