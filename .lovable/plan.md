

## Plan: Update Checkout Pricing, Payment Links & Make GST Inclusive

### Summary
Change pricing to GST-inclusive (the displayed price IS the total — no extra 18% added). Update plan prices, vehicle counts, and all PayU payment links.

### 1. Update Plan Prices & Vehicle Counts (lines 38-77)

| Plan | Current Price | New Price | Vehicles | Change |
|------|--------------|-----------|----------|--------|
| Starter | 999 | 999 | 1 | No change |
| Business Basic | 1,998 | 1,999 | 2→3 | Price + vehicles |
| Business Pro | 4,998 | 4,999 | 7 | Price only |
| Corporate | 9,999 | 9,999 | 15 | No change |

### 2. Update PayU Payment Links (lines 80-85)

```
starter:        https://u.payu.in/PAYUMN/irvSRzjqTMEv
business_basic: https://u.payu.in/PAYUMN/8JuydIyfE1kv
business_pro:   https://u.payu.in/PAYUMN/uIDRzUuMnhY0
corporate:      https://u.payu.in/PAYUMN/gI8lQYCFpedp
```

### 3. Make GST Inclusive (lines 202-205)

Change the pricing math so the plan price IS the total (GST included within):

```typescript
const total = plan.price;  // price is now GST-inclusive
const gstAmount = Math.round(total - (total / 1.18));  // back-calculate GST portion
const subtotal = total - gstAmount;  // base amount
```

### 4. Update "per vehicle" label for Business Pro (line 436)

With price 4,999 and 7 vehicles: ₹4,999/7 ≈ ₹714. Update label from "Only ₹720 per vehicle" → "Only ₹714 per vehicle".

### 5. Update Step 4 summary text (line 464)

Change "Incl. 18% GST" text to reflect inclusive pricing — keep as "Incl. 18% GST · GST Invoice Provided" (still accurate since GST is included).

### 6. Update invoice generation if needed

Check `src/lib/generateInvoice.ts` — the invoice back-calculates GST from the total, so it should work correctly with the new inclusive model.

| File | Changes |
|------|---------|
| `src/pages/Checkout.tsx` | Plans pricing, payment links, GST calculation logic, per-vehicle label |

