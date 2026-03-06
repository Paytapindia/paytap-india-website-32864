

## Plan: Checkout Page — Text & Pricing Updates

### 1. Update ACTIVATION_INCLUDES text (line 88)
- Change `'NFC PayTap Tag for every vehicle'` → `'Free Contactless Payment Tag for every vehicle'`
- Add new item: `'Lifetime Free with instant account activation'` (use `CalendarCheck` icon)

### 2. Update Business Pro plan (lines 58-67)
- Change `tags: 5` → `tags: 7`
- Change `price: 4998` → `price: 5040` (7 × 720)
- Update the "Only ₹999 per vehicle" text on line 435 → `"Only ₹720 per vehicle"`

### 3. Update Corporate plan (lines 68-77)
- Change `tags: 10` → `tags: 15`
- Recalculate price: 15 × (9999/10) = ₹9,999 stays? Or 15 × 720 = ₹10,800? Need to confirm — but user said "15 Vehicles activated" without specifying price change, so keep `price: 9999` (effectively ₹667/vehicle).

### 4. Add "You Pay One Time Activation Fee / Vehicle" text (line 447)
- After the existing "Additional vehicles can be added anytime." line, add another line: `"You Pay One Time Activation Fee / Vehicle"`

### 5. Update Dynamic Summary text (line 456)
- Change `NFC PayTap Tag` → `Contactless Payment Tag` to stay consistent

| File | Lines | Change |
|------|-------|--------|
| `src/pages/Checkout.tsx` | 88 | Rename NFC tag label, add lifetime free point |
| `src/pages/Checkout.tsx` | 58-67 | Business Pro: 7 tags, price 5040 |
| `src/pages/Checkout.tsx` | 68-77 | Corporate: 15 tags |
| `src/pages/Checkout.tsx` | 435 | ₹999 → ₹720 per vehicle |
| `src/pages/Checkout.tsx` | 447 | Add "One Time Activation Fee" text |
| `src/pages/Checkout.tsx` | 456 | NFC PayTap Tag → Contactless Payment Tag |

