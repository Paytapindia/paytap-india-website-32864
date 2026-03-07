

## Plan: Update Business Basic to 2 Vehicles at ₹1,600

### Change in `src/pages/Checkout.tsx`

**Line 51-52:** Update Business Basic plan:
- `price: 2399` → `price: 1600`
- `tags: 3` → `tags: 2`

That's it — one file, two values. GST-inclusive logic and invoice generation will automatically adjust since they derive from the plan price.

| File | Change |
|------|--------|
| `src/pages/Checkout.tsx` | Update Business Basic price to 1600, tags to 2 |

**Note:** The PayU payment link for Business Basic will need updating to match the new ₹1,600 amount.

