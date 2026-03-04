

## Plan: Show Floating UI Elements on Mobile

The three floating elements (NFC Tap Detected, Today's Spend, Transaction notification) around the card have `hidden sm:block` classes, making them invisible on screens below 640px.

### Change in `src/components/HeroSection.tsx`

Remove `hidden sm:block` from all three floating `motion.div` elements and adjust their positioning to fit smaller screens:

1. **NFC Tap Detected** (top-left): Change `className="absolute -top-8 -left-16 z-20 hidden sm:block"` → `className="absolute -top-6 -left-4 sm:-top-8 sm:-left-16 z-20"` with smaller padding/text on mobile
2. **Today's Spend** (bottom-left): Change `className="absolute -bottom-6 -left-20 z-20 hidden sm:block"` → `className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-20 z-20"`
3. **Transaction chip** (bottom-right): Change `className="absolute -bottom-4 -right-14 z-20 hidden sm:block"` → `className="absolute -bottom-12 -right-2 sm:-bottom-4 sm:-right-14 z-20"`

This ensures the floating elements are visible on mobile with tighter positioning that doesn't overflow the viewport, while keeping the current desktop layout intact.

| File | Change |
|------|--------|
| `src/components/HeroSection.tsx` | Remove `hidden sm:block`, add responsive positioning |

