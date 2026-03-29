

## Plan: Remove Trust Lines & Fix Mobile Alignment

**File:** `src/pages/Checkout.tsx`

### 1. Remove two trust spans (lines 738-744)

Remove these two `<span>` elements from the trust line div:
- `"Trusted by 150+ fleet owners"` (lines 739-741)
- `"7-day no-questions-asked refund"` (lines 742-744)

Keep the remaining three: "Avg savings", "Secure payments", "GST invoice provided".

### 2. Fix mobile alignment

- **Line 361**: Change `px-4` to `px-3 sm:px-4` for tighter mobile padding
- **Line 480** (delivery + total row): Add `flex-col sm:flex-row gap-2` so the delivery text and price stack vertically on mobile instead of being squeezed side-by-side
- **Trust line div (line 738)**: Add `px-2` and change `gap-4` to `gap-2 sm:gap-4` for tighter mobile spacing
- **Plan cards**: Check the plan selector items have proper mobile padding (already using `px-5 md:px-8`, this is fine)

