

## Plan: Replace Ecosystem Section with Premium Laptop Dashboard Showcase

### Overview

Remove the MyFleet AI and ExpensePro product cards from `OurProductsSection` and replace the entire section with a premium laptop mockup displaying a Paytap for Business dashboard screenshot.

### File: `src/components/OurProductsSection.tsx`

Complete rewrite of this component:

**Header:**
- Title: "Paytap for Business"
- Subtitle: "Vehicle Payment & Management System"
- Centered, clean typography

**Laptop Mockup (CSS-only, no image dependency):**
- MacBook-style frame built with divs: thin dark bezel, rounded corners, bottom chin/hinge
- Slight 3D perspective transform (`perspective + rotateX`) for angled view
- Soft drop shadow for floating effect
- Optional very slow hover animation (subtle Y translate)

**Inside the laptop screen:**
- A programmatic dashboard UI (similar approach to the Hero's monitor mockup but larger/fuller):
  - "Paytap for Business" header bar with green status dot
  - Fleet overview metrics row (Total Vehicles, Active Cards, Monthly Spend, Savings)
  - Vehicle cards grid showing sample entries (registration, status, last transaction)
  - Clean white background, uses brand colors
- No mention of MyFleet AI or ExpensePro anywhere

**Section styling:**
- Background: `bg-muted/30` or subtle light gradient
- Generous padding: `py-24 md:py-36`
- Everything centered, max-width container
- No clutter, no floating elements, no extra UI

### Removed
- `myfleet-ai-icon.png` import
- `paytap-icon-tp.png` import
- All product card grid code
- Products array

### No other files need changes
The component is already lazy-loaded in `Index.tsx` and the import path stays the same.

