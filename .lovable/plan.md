

## Remove "X" from MyFleet AI and Remove Benefit Lists from Account Type Cards

### File: `src/pages/Checkout.tsx`

### Change 1 — Remove "X" from all "MyFleet AI X" references
- Line 377: `No MyFleet AI X` → `No MyFleet AI`
- Line 424: `MyFleet AI X Access` → `MyFleet AI Access`
- Line 519: `MyFleet AI X Access` → `MyFleet AI Access`
- Line 535: `No access to MyFleet AI X` → `No access to MyFleet AI`

### Change 2 — Remove the bullet-point lists from both Account Type cards
Since the "What's Included" section already shows the benefits below, the cards only need the icon, title, and price.

**Personal card (lines 358-382):** Remove the entire `<ul>` block with all `<li>` items (1 Tag, Lifetime Platform, Smart Dashboard, Free Shipping, No MyFleet AI, No ExpensePro).

**Business card (lines 409-433):** Remove the entire `<ul>` block with all `<li>` items (2 Tags, Lifetime Platform, Smart Dashboard, MyFleet AI Access, ExpensePro Access, Free Shipping).

Each card will then just show:
- Icon (User / Building)
- Account name (Personal / Business)
- Price (₹999 / ₹1,998)
- Selected checkmark indicator
- "Recommended" badge (Business only)

