

## Reorganize Product Selector and Update Text

### Changes to `src/pages/Checkout.tsx`

**1. Move "Choose Your Product" section below "What You're Activating Today"**
- Cut the product selector block (lines 325-364) from its current position (between Hero and Plan Cards)
- Re-insert it after the "What You're Activating Today" section (after line 423), before the form

**2. Make product selector cards smaller**
- Remove the large `aspect-[4/3]` image container
- Use a compact horizontal layout (icon + image thumbnail + text side by side) or reduce image size significantly to match plan card proportions
- Use `max-h-24` or similar constraint on images so they don't dominate

**3. Rename "NFC Payment Tag" to "Prepaid Tag/Card" in all 4 plan feature lists**
- Starter: `'1 NFC Payment Tag'` → `'1 Prepaid Tag/Card'`
- Business Basic: `'2 NFC Payment Tags'` → `'2 Prepaid Tag/Card'`
- Business Pro: `'5 NFC Payment Tags'` → `'5 Prepaid Tag/Card'`
- Corporate: `'10 NFC Tags'` → `'10 Prepaid Tag/Card'`

