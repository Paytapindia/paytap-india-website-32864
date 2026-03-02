

## Fix: Dashboard Widget Hidden Behind PayTap Card

### Problem
On desktop, the Dashboard mini UI widget (top-left) has `z-10` while the PayTap card (center) has `z-20`. Since the card is large and centered, it overlaps and covers the dashboard widget.

### Solution
**File: `src/components/HeroSection.tsx`**

Two changes to fix the layering and reduce overlap:

1. **Raise Dashboard z-index** from `z-10` to `z-30` (line 97) so it renders above the card
2. **Shift Dashboard position left** on desktop: change `md:-left-4` to `md:-left-8` to pull it further out from under the card
3. **Shift Dashboard position up** on desktop: change `md:top-6` to `md:-top-2` so it clears the card vertically

This keeps the layered floating aesthetic but ensures the dashboard is always fully visible and not hidden behind the card.

### Z-index final order (back to front)
- NFC Icon: z-10
- Expense Dashboard: z-10
- PayTap Card: z-20
- Dashboard mini UI: z-30
- Balance Widget: z-30
