

## Fix Invoice Breakdowns: New AMC/Activation Splits + Discount Line

### New Breakdowns (GST-Inclusive)

| Plan | Base | AMC | Activation/unit | ×Qty | Discount | Final |
|------|------|-----|-----------------|------|----------|-------|
| Starter | ₹1,000 | ₹300 | ₹700 | ×1 | ₹1 | ₹999 |
| Business Basic | ₹1,600 | ₹300 | ₹650 | ×2 | — | ₹1,600 |
| Business Pro | ₹3,750 | ₹1,250 | ₹500 | ×5 | ₹1 | ₹3,749 |
| Corporate | ₹7,000 | ₹2,400 | ₹460 | ×10 | ₹1 | ₹6,999 |

### Invoice Calculation (Verified Math, Karnataka Intra-State)

| Plan | Act Rate | ×Qty | Act Amt | AMC Rate | AMC Amt | Disc | Subtotal | CGST | SGST | Calc | Round Off |
|------|----------|------|---------|----------|---------|------|----------|------|------|------|-----------|
| ₹999 | 593.22 | ×1 | 593.22 | 254.24 | 254.24 | 0.85 | 846.61 | 76.19 | 76.19 | 998.99 | +0.01 |
| ₹1,600 | 550.85 | ×2 | 1,101.70 | 254.24 | 254.24 | — | 1,355.94 | 122.03 | 122.03 | 1,600.00 | 0 |
| ₹3,749 | 423.73 | ×5 | 2,118.65 | 1,059.32 | 1,059.32 | 0.85 | 3,177.12 | 285.94 | 285.94 | 3,749.00 | 0 |
| ₹6,999 | 389.83 | ×10 | 3,898.30 | 2,033.90 | 2,033.90 | 0.85 | 5,931.35 | 533.82 | 533.82 | 6,998.99 | +0.01 |

### What Changes in `src/lib/generateInvoice.ts`

1. **Update `PLAN_BREAKDOWNS`** with new AMC/Activation/Discount values
2. **Add "Discount" as a 3rd line item** (negative amount, shown only when discount exists)
3. **Subtract discount from subtotal** before computing GST
4. Existing Round Off logic handles any remaining rounding

### What Changes in `src/pages/Checkout.tsx`

Update `CHECKOUT_BREAKDOWNS` to match new AMC/Activation values (no discount shown on checkout UI — only total breakdown).

### Files Modified

| File | Change |
|------|--------|
| `src/lib/generateInvoice.ts` | New breakdowns, discount line item |
| `src/pages/Checkout.tsx` | Update CHECKOUT_BREAKDOWNS to match |

