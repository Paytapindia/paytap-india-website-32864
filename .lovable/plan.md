

## Optimize Checkout Page Mobile View

### Changes to `src/pages/Checkout.tsx`

**1. Hero section — tighter mobile spacing**
- Reduce top padding from `pt-10` to `pt-6` on mobile
- Reduce bottom padding from `pb-6` to `pb-4`
- Reduce heading size from `text-2xl` to `text-xl` on mobile

**2. Plan cards — compact mobile layout**
- Reduce card padding from `p-4` to `p-3` on mobile
- Tighten feature list spacing (`space-y-1` instead of `space-y-1.5`)
- Reduce price text from `text-xl` to `text-lg` on mobile
- Reduce gap between cards from `gap-3` to `gap-2` on mobile

**3. Product selector — stack vertically on mobile**
- Change grid from `grid-cols-2` to `grid-cols-1 md:grid-cols-2` so each product card gets full width on mobile
- This prevents the awkward text wrapping visible in the screenshot
- Keep horizontal layout (image + text side by side) within each card

**4. "What You're Activating Today" — tighter mobile padding**
- Reduce padding from `p-5` to `p-4` on mobile
- Reduce bottom margin section spacing

**5. Form section — tighter spacing on mobile**
- Reduce `space-y-6` to `space-y-4` on mobile for form sections
- Reduce bottom padding from `pb-24` to `pb-20` (less wasted space above sticky bar)

**6. Sticky bottom bar — polish**
- Add a subtle top shadow for depth
- Slightly tighter padding

All changes in a single file: `src/pages/Checkout.tsx`

