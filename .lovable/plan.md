

## Plan: Replace MyFleet & ExpensePro with "Business Management Dashboard" in Solutions Nav

### File: `src/components/Navbar.tsx`

### Changes

**1. Desktop Solutions dropdown (lines 122-158)**
Replace the two list items (MyFleet AI + ExpensePro) with a single item:
- Label: "Business Management Dashboard"
- Subtitle: "Manage your business operations"
- Links to: `https://dashboard.myfleetai.in/login` (opens in new tab)

**2. Mobile Solutions section (lines 331-355)**
Replace the "Ecosystem" header and two links (MyFleet + ExpensePro) with a single link:
- Label: "Business Management Dashboard"
- Same destination: `https://dashboard.myfleetai.in/login`
- Remove the "Ecosystem" sub-header since there's only one item now

Two sections updated in one file.

