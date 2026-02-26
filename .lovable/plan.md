
## Update "What's Included" Section — Remove Dashboard, Fix Total Value Text

### File: `src/pages/Checkout.tsx`

### Change 1 — Remove "Smart Controls Dashboard" row (lines 460-463)
Delete the entire block:
```
<div className="flex items-center gap-2 text-sm">
  <Check className="w-4 h-4 text-primary flex-shrink-0" />
  <span className="text-muted-foreground">Smart Controls Dashboard</span>
</div>
```

### Change 2 — Fix "Total Value" text (line 498-499)
The strikethrough value text currently says "Total Value:" — update it to show the colon-separated format with the scratched value in red (brand accent color `text-accent` which is PayTap's red `#f6245b`).

Update line 499:
```tsx
// Before:
Total Value: <span className="line-through">₹{...}</span>

// After:
Total Value: <span className="line-through text-accent">₹{...}</span>
```

This uses the existing `--accent` CSS variable (346 92% 55% = PayTap red) for the strikethrough price, making it visually pop as the "old price" users are saving on.
