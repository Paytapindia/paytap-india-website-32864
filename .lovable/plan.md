

## Plan: Side-by-Side Layout for Desktop Checkout

### Overview
On desktop (md+), place the Plan Selector (white box) and Summary Box (blue box) side by side in a two-column grid. The Quick Details form moves below both, spanning full width. Mobile stays unchanged (stacked).

### File: `src/pages/Checkout.tsx`

**1. Wrap Plan Selector + Summary Box in a desktop grid (around lines 364-517)**

Add a container div around both sections:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
  {/* Plan Selector (white box) - left column */}
  <motion.div ... className="rounded-3xl bg-card/80 ... mb-0">
    ...
  </motion.div>

  {/* Summary Box (blue box) - right column */}
  <motion.div ... className="w-full rounded-3xl bg-primary ... md:sticky md:top-8">
    ...
  </motion.div>
</div>
```

**2. Remove `mb-8 md:mb-12` from Plan Selector** — spacing is now handled by grid gap.

**3. Add `md:sticky md:top-8` to the blue Summary Box** — so it stays visible as user scrolls through plans on the left.

**4. Quick Details form stays below as-is** — it already spans full width. Just update `mt-8` to `mt-8 md:mt-10` for breathing room.

### Result
- **Desktop**: Left = plan cards (white), Right = summary (blue, sticky). Below both = Quick Details form.
- **Mobile**: No change — everything stacks vertically as before.

