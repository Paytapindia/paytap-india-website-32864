

## Hero Section: Mobile Optimization + Expense Dashboard Widget

### What Changes

1. **Mobile layout optimization** -- fix spacing, sizing, and alignment of the visual stack so nothing overlaps or gets cut off on small screens
2. **Replace the generic "Statement" widget** with a proper **Expense Dashboard** showing categorized spending (Fuel, Toll, Service) with visual bars
3. **Better mobile visual stack arrangement** -- on mobile, reduce the visual stack height and reposition elements to avoid overlap

### File: `src/components/HeroSection.tsx`

#### 1. Mobile Content Fixes
- Tighten padding: `pt-24` on mobile (currently `pt-28` wastes space above fold)
- Reduce visual stack container height on mobile from `h-[340px]` to `h-[300px]` for tighter layout
- Reduce `mb` spacing between content and visual stack on mobile

#### 2. Replace "Mini Statement" with Expense Dashboard
Remove the bottom-right "Statement" placeholder widget (lines 253-267) and replace with a proper expense breakdown card:

```text
+---------------------------+
|  Expense Breakdown        |
|                           |
|  Fuel     ████████  62%   |
|  Toll     █████     28%   |
|  Service  ██        10%   |
|                           |
|  Total: ₹18,240           |
+---------------------------+
```

- White card, thin border, soft shadow (matching other widgets)
- 3 rows: Fuel, Toll, Service -- each with a colored progress bar and percentage
- Fuel bar uses primary color, Toll uses accent, Service uses muted
- Small "Total" line at the bottom

#### 3. Mobile Visual Stack Repositioning
- **Dashboard mini UI** (top-left): Keep but reduce width to `w-28` on mobile, position `top-0 left-0`
- **PayTap Card** (center): Reduce to `w-52` on mobile, keep centered
- **Balance Widget** (top-right): Reduce to `w-24` on mobile, position `top-0 right-0`
- **Expense Dashboard** (new, bottom-right): `w-28` on mobile, position `bottom-4 right-0`
- **NFC Icon** (bottom-left): Keep at `bottom-4 left-2`, size `w-10 h-10` on mobile
- Remove float animations on mobile to prevent layout jank (keep static positions)

#### 4. Feature Pills Mobile Fix
- On mobile, reduce pill padding to `px-3 py-2` and text to `text-xs` so they wrap cleanly in 2 rows instead of overflowing

### No other files changed. No new dependencies.

