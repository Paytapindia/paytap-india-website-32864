

## Plan: Style AMC Text to Match Trust Icons Row

### File: `src/pages/Checkout.tsx` (lines 764-767)

### Change

Replace the standalone highlighted `<p>` tag with a `<span>` inside the existing trust icons flex container, matching the exact same styling (`text-xs text-muted-foreground`, icon `w-3.5 h-3.5 text-accent`). Use the `Wrench` icon (service icon) from lucide-react.

**Delete lines 764-767** (the closing `</div>` and the `<p>` block), and **add a new span inside the trust flex container** (before the closing `</div>` on line 764):

```tsx
<span className="flex items-center gap-1.5">
  <Wrench className="w-3.5 h-3.5 text-accent" /> ₹249/Year/Vehicle AMC Included
</span>
```

Also ensure `Wrench` is imported from `lucide-react` at the top.

Single file, two edits (import + content).

