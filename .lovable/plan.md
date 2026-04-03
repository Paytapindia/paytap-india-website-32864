

## Plan: Update Solutions Dropdown with Two Paytap Systems

### File: `src/components/Navbar.tsx`

### Changes

**1. Desktop Solutions dropdown (lines 122-141)**
Replace the single "Business Management Dashboard" item with two items:
- **Paytap Vehicle Payment System** → `https://dashboard.paytap.co.in/login` (new tab)
  - Subtitle: "Payment & billing platform"
- **Paytap Vehicle Management System** → `https://dashboard.myfleetai.in/` (new tab)
  - Subtitle: "Fleet & vehicle management"

**2. Mobile Solutions section (lines 314-324)**
Replace the single link with two links matching the desktop items:
- "Paytap Vehicle Payment System" → `https://dashboard.paytap.co.in/login`
- "Paytap Vehicle Management System" → `https://dashboard.myfleetai.in/`

Two sections updated in one file.

