

## Plan: Optimize Checkout Step 1 Layout & Fix Scrolling

### Issues
- Content not scrolling due to `pb-28 md:pb-16` not providing enough clearance for the sticky bottom bar
- Mobile CTA button placement is poor
- Button text needs to change from "Activate My Fleet" to "Activate Account"

### Changes in `src/pages/Checkout.tsx`

**1. Fix scrolling — increase bottom padding (line 719)**
- Change `pb-28 md:pb-16` to `pb-36 md:pb-24` to ensure all content is accessible above the sticky bottom bar

**2. Optimize Step 1 spacing for mobile (lines 372-436)**
- Reduce `space-y-10` to `space-y-6 md:space-y-10` on the step 1 container
- Reduce padding on plan cards for mobile: `p-4 md:p-6`
- Make "What Your Activation Includes" section more compact on mobile: `p-4 md:p-8`
- Reduce header text size slightly on mobile for better fit

**3. Fix mobile CTA button placement (lines 728-769)**
- Ensure the sticky bottom bar has consistent padding and the button is full-width on mobile
- Change button layout: on mobile, make CTA button `w-full` and stack Back/Next vertically if needed
- Add `safe-area-inset` padding for notched devices

**4. Change CTA text (line 753)**
- Replace `'Activate My Fleet'` with `'Activate Account'`

| File | Change |
|------|--------|
| `src/pages/Checkout.tsx` | Fix scroll padding, optimize mobile spacing, improve sticky CTA layout, rename button text |

