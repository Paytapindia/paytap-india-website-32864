

## Update Checkout Pricing

### Changes

**File: `src/pages/Checkout.tsx`**

1. **Product prices**: Change from ₹499 to ₹999 per unit for both sticker and card plans (lines 45, 51)

2. **Quantity selector display**: Update the price labels shown on the quantity buttons:
   - 1 Tag/Card: ₹499 → ₹999 (line 365)
   - 2 Tags/Cards: ₹998 → ₹1,998 (line 377)

3. **"What's Included" section**:
   - Tag/Card value display: already shows `₹{999 * quantity} value` — this stays correct as-is
   - Lifetime Platform Access: change from `₹4,000 value` to `₹10,000 value` (line 402)

4. **PayU payment links**: The existing links point to ₹499/₹998 amounts. These will need new PayU links for ₹999/₹1,998. For now, the links will remain as placeholders — you'll need to generate new PayU payment links for the updated amounts.

5. **Edge function (`supabase/functions/create-payment/index.ts`)**: Update the server-side price map from `sticker: 499, card: 499` to `sticker: 999, card: 999` so the backend amount calculation matches.

### Summary of price changes

| Item | Before | After |
|------|--------|-------|
| Unit price (sticker/card) | ₹499 | ₹999 |
| 2-unit price | ₹998 | ₹1,998 |
| Tag hardware value shown | ₹999/unit | ₹999/unit (no change) |
| Lifetime Platform Access value | ₹4,000 | ₹10,000 |

