

## Fix: Checkout Page Crash on Invalid Product Type

### Problem
The checkout page at `/checkout?product=tag` crashes with "Cannot read properties of undefined (reading 'price')" because:
- The `PRODUCTS` object only defines two keys: `"sticker"` and `"card"`
- The URL parameter `?product=tag` passes `"tag"` as the product type
- `PRODUCTS["tag"]` returns `undefined`, causing the crash when accessing `.price`

This happens because the "How It Works" page navigates to `/checkout?product=tag`, but the Checkout page doesn't recognize `"tag"` as a valid product key.

### Solution

Two changes are needed:

1. **Add `"tag"` as a valid product key in the `PRODUCTS` object** in `src/pages/Checkout.tsx` — map it to the same NFC Tag product (currently called `"sticker"`). This is the simplest fix since "tag" is the user-facing name for the sticker product.

2. **Add a fallback** so that any unrecognized product parameter defaults to `"sticker"` instead of crashing. This prevents future breakage if other URLs pass unexpected values.

### Technical Details

**File: `src/pages/Checkout.tsx`**

- Update the `PRODUCTS` object to include a `"tag"` key that mirrors `"sticker"`:
  ```ts
  tag: {
    name: "Paytap NFC Tag Plan",
    description: "Contactless payment sticker",
    price: 499,
    image: paytapCheckoutSticker
  }
  ```
- Update `PAYU_PAYMENT_LINKS` to include `tag_1` and `tag_2` entries
- Add validation so that if the `product` URL param isn't a valid key in `PRODUCTS`, it falls back to `"sticker"`
- Update `ProductType` accordingly

Alternatively (and more cleanly): normalize `"tag"` to `"sticker"` at the point where the URL param is read, so the rest of the code stays unchanged. This avoids duplicating product data.

### Approach chosen: Normalize the URL param

- At line 60 and line 104, where `searchParams.get("product")` is read, add a mapping so `"tag"` is treated as `"sticker"`
- Add a guard so any unrecognized product type defaults to `"sticker"` instead of crashing

This is a minimal, safe fix that prevents the crash without duplicating product definitions.
