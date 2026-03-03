

## Add Product Type Selector (NFC Tag vs Prepaid Card)

### What we're building
A product type selector with two visually appealing cards (NFC Tag and Prepaid Card) placed between the Hero section and the Plan Cards section. Each card shows the product image, name, and a brief description. The selected product gets a highlighted border.

### Design
- Two side-by-side cards with product images (`paytap-tag-sticker-v2.png` for NFC Tag, `paytap-card-product.png` for Prepaid Card)
- Matches existing checkout styling: `#021a42` color palette, rounded-xl borders, clean minimal look
- Selected card gets `border-[#021a42]` with a check indicator (same pattern as plan cards)
- Unselected card gets `border-[#021a42]/10` with hover effect

### Technical changes

**File: `src/pages/Checkout.tsx`**

1. Add imports for product images at top:
   ```typescript
   import paytapTag from '@/assets/paytap-tag-sticker-v2.png';
   import paytapCard from '@/assets/paytap-card-product.png';
   ```

2. Add a `productType` state (`'sticker' | 'card'`, default `'sticker'`) alongside existing state variables.

3. Insert a product selector section between the Hero and Plan Cards sections (around line 317). Two clickable cards in a `grid-cols-2` layout:
   - **NFC Payment Tag** — image, title, short description ("Tap-to-pay sticker for your vehicle")
   - **Prepaid Card** — image, title, short description ("Prepaid card for driver expenses")
   - Section heading: "Choose Your Product"

4. Update the order insert (line 232) to use the `productType` state instead of hardcoded `'sticker'`.

5. Update the Order Summary to show the selected product type name.

No database changes needed — the `product_type` column already exists in the orders table.

