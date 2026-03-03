

## Make All Checkout Prices Inclusive of 18% GST

### Changes to `src/pages/Checkout.tsx`

**1. Update plan prices to GST-inclusive amounts**

| Plan | Current (ex-GST) | New (incl. GST) |
|------|------------------|-----------------|
| Starter | ₹999 | ₹1,179 |
| Business Basic | ₹1,998 | ₹2,358 |
| Business Pro | ₹4,998 | ₹5,898 |
| Corporate | ₹9,999 | ₹11,799 |

**2. Remove separate GST calculation** (lines 133-135)
- Remove `subtotal`, `gst`, `total` logic — price is now the final amount

**3. Update plan card display** (line 348)
- Add "incl. GST" label below the price: `₹1,179 incl. GST`

**4. Simplify order summary** (lines 260-291)
- Remove the separate "Activation Fee" and "GST (18%)" rows
- Show single "Activation Fee (incl. GST)" row with the plan price
- "Total Payable Today" = plan price directly

**5. Update sticky bottom bar** — use `plan.price` directly instead of `total`

Single file: `src/pages/Checkout.tsx`

