

## Plan: Use Single-Column Stacked Layout on All Screen Sizes

The iPad view shows all three boxes (plan selector, summary box, quick details form) stacked vertically in a single column — which you prefer. The current code switches to a side-by-side two-column grid on desktop (`lg` breakpoint). This plan reverts to the stacked layout for all screen sizes.

### Changes in `src/pages/Checkout.tsx`

**1. Remove the two-column grid wrapper**
- Line 430: Change `grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[1080px] mx-auto w-full items-start` to `flex flex-col gap-6 max-w-[520px] mx-auto w-full`
- This keeps all boxes stacked vertically and centered, matching the iPad view

**2. Revert summary box height stretching**
- Line 437: Remove `h-full flex flex-col justify-between` from the summary box, revert to just natural height so it sizes to its content

**3. Revert form field layout to single column**
- Lines 494, 609, 629: Change the `grid grid-cols-1 md:grid-cols-2 gap-3` wrappers back to single-column (`space-y-3` with each field stacked), matching the iPad view where fields are full-width

**File:** `src/pages/Checkout.tsx`

