

## Plan: Update Checkout — Text, Colors & Header Alignment

### Changes in `src/pages/Checkout.tsx`

**1. Text change: "PayTap Fleet Dashboard Access" → "Lifetime Platform Access" (line 90)**
- Update the `ACTIVATION_INCLUDES` array entry

**2. Replace all `accent` color references with `primary` (navy blue) throughout the checkout page**

The `accent` color is the red/coral (#f6245b). Replace it with `primary` (navy #021a42) for non-CTA elements:

- **Progress bar** (lines 134, 144-148): `bg-accent` → `bg-primary`, `ring-accent/20` → `ring-primary/20`, `text-accent-foreground` → `text-primary-foreground`
- **Plan card borders/badges** (lines 408-441): `border-accent`, `shadow-accent/15`, `bg-accent`, `text-accent` → use `primary` equivalents
- **Dynamic summary premium perks** (lines 460-462): `text-accent` → `text-primary`
- **Activation includes icons** (line 479-480): `bg-accent/10`, `text-accent` → `bg-primary/10`, `text-primary`
- **Trust microcopy icons** (lines 490-492): `text-accent` → `text-primary`
- **Sidebar premium perks** (lines 798-800): `text-accent` → `text-primary`
- **Trust badges on Step 4** (lines 708, 712, 716): `text-accent` → `text-primary`
- **Step 4 desktop CTA** (line 726): Keep `bg-accent` for the primary pay CTA only (this is the conversion action)
- **Step 4 bottom sticky pay CTA** (line 855): Keep `bg-accent` for the final pay button only

**3. Header alignment & spacing improvements**

- Step 1 header (lines 383-393): Add more spacing between title, subtitle, and trust line. Use `space-y-2 md:space-y-3` wrapper. Ensure text sizes are balanced: title `text-2xl md:text-4xl`, subtitle `text-sm md:text-base`, trust line `text-xs`.
- "Choose Your Fleet Size" heading (line 397): increase bottom margin `mb-5 md:mb-6`
- "What Your Activation Includes" heading (line 475): consistent sizing
- Ensure all section headings use consistent `text-base font-semibold` on desktop and `text-sm` on mobile for a clean hierarchy

### Summary

| Change | Location |
|--------|----------|
| Text: "Lifetime Platform Access" | `ACTIVATION_INCLUDES` line 90 |
| Color: accent → primary (except pay CTAs) | ~15 locations across the file |
| Header alignment & spacing | Step 1 header block, section headings |

All changes in `src/pages/Checkout.tsx` only.

