

## Plan: Update Business Pro Price to ₹4,998

Single change in `src/pages/Checkout.tsx`:

- **Line 61**: Change `price: 5040` → `price: 4998`

The "Only ₹720 per vehicle" label and 7 vehicles stay as-is — the per-vehicle text is a marketing display value, not dynamically calculated from the total price.

