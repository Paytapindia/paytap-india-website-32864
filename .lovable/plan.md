

## Plan: Reposition Summary Box & Update Its Content

### Changes in `src/pages/Checkout.tsx`

**1. Move the "Your Paytap Setup" blue box above "Quick Details"**
- Currently the summary panel is in the right column (lines 658-705), rendered after the form section
- Move it inside the left column, directly above the "Quick Details" heading (line 440)
- On desktop: it appears above the form instead of as a sticky sidebar
- On mobile: same — summary first, then form below

**2. Update summary box content**
- Next to plan name, add "(What's Included)" label
- Replace the current bullet list with:
  - X Paytap Tags Free (dynamic based on plan)
  - 1 Driver Expense Card
  - Access to Myfleet AI
  - Access to ExpensePro
  - Instant Account Activation
- Change "Delivery: 3–5 business days" → "Vehicle Tag Delivery: 3–5 Business Days"

**3. Remove the right-side column layout**
- Since the summary box moves above the form, remove the two-column `lg:grid-cols-[1fr_340px]` grid
- Make the form section full-width (max-w still capped at ~480px and centered)

**File:** `src/pages/Checkout.tsx`

