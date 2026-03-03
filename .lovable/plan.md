

## Replace NFC Tag Image on Checkout Page

### Change

1. **Copy uploaded image** to `src/assets/paytap-tag-checkout.png`
2. **Update import in `src/pages/Checkout.tsx`** (line 19): change from `paytap-tag-sticker-v2.png` to `paytap-tag-checkout.png`

That's it — the image is already referenced via the `paytapTag` variable throughout the checkout product selector, so swapping the import handles everything.

