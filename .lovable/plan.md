

## Plan: Redesign Blue Box Copy with Problem→Solution Format

**File:** `src/pages/Checkout.tsx` (lines 452-478)

### Changes

**1. Replace header (lines 452-455)**
- Change from `{plan.name} (What's Included)` to `{plan.name}` with subtitle `"Take Back Control of Your Vehicles"`

**2. Replace bullet list (lines 457-478)**

Replace the 5 generic feature bullets with problem→solution pairs using this structure:

```
✔ You send your driver with money — but don't know where it actually goes
→ Track every payment live, per vehicle

✔ You trust your driver — but can't check every expense
→ Set limits so overspending isn't possible

✔ Small daily expenses quietly add up
→ Stop leakage and save every month

✔ You keep calling drivers for updates
→ See everything instantly, no follow-ups

✔ Expenses feel out of control month to month
→ Get full control from day one
```

Each pair: problem line in `text-primary-foreground/90` with a check icon, solution line in `text-accent font-medium` with an arrow icon, separated by `space-y-3` between pairs.

**3. Add strong closing line before the delivery/total row**
- `"Most fleet owners recover this cost within the first 7 days"` — centered, slightly smaller, with a ⚡ icon

### Design details
- Problem lines: `CheckCircle` icon, normal weight
- Solution lines: `ArrowRight` icon, `text-accent`, `font-medium`, slightly indented (`pl-6`)
- Each pair wrapped in a div with `space-y-1`, pairs separated by `space-y-4`
- Closing line: `text-xs text-primary-foreground/60 text-center mt-4 pt-3 border-t border-primary-foreground/10`

