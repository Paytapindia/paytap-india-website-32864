

## Plan: Equalize Column Sizes and Compact the Form

### Changes in `src/pages/Checkout.tsx`

**1. Make both columns equal width**
- Change grid from `lg:grid-cols-2` to `lg:grid-cols-[1fr_1fr]` (already equal, but ensure no child constraints break it)
- Remove `max-w-[480px]` from the form's inner `<div>` (line 486) so the form fills its column fully, matching the summary box width

**2. Make the summary box stretch to match the form height**
- Add `h-full` to the summary box `motion.div` (line 437) and use `flex flex-col justify-between` so content spreads evenly within the box

**3. Compact the form to reduce its length**
- Use a 2-column grid for some form fields to reduce vertical height:
  - **Name** and **Phone** side by side
  - **State** and **City** side by side  
  - **Address** and **Pincode** side by side
- Reduce spacing: change `space-y-4` (line 492) to `space-y-3`
- Reduce top padding on delivery section: `pt-4` → `pt-2` (line 602)
- Reduce CTA margin: `mt-8` → `mt-5` (line 658)

**File:** `src/pages/Checkout.tsx`

