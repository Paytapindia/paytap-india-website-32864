

## Plan: Add "Pricing" Link to Navbar

### File: `src/components/Navbar.tsx`

### Changes

**1. Desktop nav (after Resources dropdown, line ~246)**
Add a new `NavigationMenuItem` with a direct `Link` to `/checkout` styled as a plain nav link (matching the trigger style but without a dropdown):

```tsx
<NavigationMenuItem>
  <Link to="/checkout" className="text-sm font-medium text-white/80 hover:text-white transition-colors ml-6">
    Pricing
  </Link>
</NavigationMenuItem>
```

**2. Mobile nav (after Resources section, line ~402)**
Add a simple `Link` item for "Pricing" before the Platform Login button — no expandable section needed since it's a direct link:

```tsx
<div className="border-b border-gray-100">
  <Link to="/checkout" className="block py-3 px-2 text-base font-medium text-gray-700" onClick={handleNavClick}>
    Pricing
  </Link>
</div>
```

Two insertions in a single file. No new dependencies.

