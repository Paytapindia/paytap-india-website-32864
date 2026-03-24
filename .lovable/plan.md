

## Plan: Two-Column Layout for Quick Details Form

**File:** `src/pages/Checkout.tsx`

### Layout Change

Convert the single-column stacked form into a **two-column grid on desktop** (`md:grid-cols-2`), stacked on mobile:

- **Left column**: Name, Mobile, Email, GST/PAN toggle + input, Company Name
- **Right column**: Delivery Address header + Address, State, City, Pincode

The CTA button and trust line remain full-width below both columns.

### Technical Details

1. **Line 489**: Change `<div className="space-y-4">` to `<div className="grid grid-cols-1 md:grid-cols-2 gap-6">`
2. **Wrap lines 490-596** (Name through Company Name) in a `<div className="space-y-4">` — this becomes the left column
3. **Lines 598-650** (Delivery Address section) already has its own wrapper div — this becomes the right column. Remove the `pt-4` class since the grid gap handles spacing
4. The CTA button (lines 653+) stays outside the grid, spanning full width

