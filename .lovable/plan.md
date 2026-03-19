

## Plan: Fix ExpensePro URL in Navbar

The ExpensePro links in the navbar currently point to `https://www.expensepro.in`. Update both occurrences (desktop dropdown line 167 and mobile menu line 378) to `https://expensepro.in/` to match the canonical domain.

**File:** `src/components/Navbar.tsx`
- Line 167: `www.expensepro.in` → `https://expensepro.in/`
- Line 378: `www.expensepro.in` → `https://expensepro.in/`

