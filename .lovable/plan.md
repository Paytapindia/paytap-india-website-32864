

## Navbar Updates

Three changes to `src/components/Navbar.tsx`:

### 1. Remove "For Fleets" and "For Enterprises" from Solutions dropdown
- **Desktop** (lines 146-175): Remove the two `<li>` items for "For Fleets" and "For Enterprises"
- **Mobile** (lines 391-404): Remove the two `<Link>` items for "For Fleets" and "For Enterprises"

### 2. Compliance link → /security
- **Desktop** (line 293): Change `to="/about#compliance"` to `to="/security"`
- **Mobile** (line 441): Change `to="/about#compliance"` to `to="/security"`

### 3. Remove "Documentation" from Resources dropdown
- **Desktop** (lines 266-280): Remove the Documentation `<li>` item
- **Mobile** (lines 480-486): Remove the Documentation `<Link>` item

