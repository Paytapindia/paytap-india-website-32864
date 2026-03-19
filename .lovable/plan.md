

## Plan: Simplify Platform Dropdown in Navbar

Remove "NFC Access Layer" and "Dashboard Controls" from the Platform dropdown, keeping only "Platform Overview" and "Prepaid Infrastructure."

### Changes in `src/components/Navbar.tsx`

**Desktop dropdown** (lines ~108-138): Remove the two `<li>` items for NFC Access Layer and Dashboard Controls.

**Mobile menu** (lines ~260-274): Remove the two corresponding `<Link>` items for NFC Access Layer and Dashboard Controls.

