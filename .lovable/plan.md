
## Add "30% Discount Tags" to Personal Account + Update Timer

### File: `src/pages/Checkout.tsx`

### Change 1 — Add "Need more Payment Tags 30% Discount, ₹699 each" to Personal account section
After the "No access to ExpensePro" row (line 492) and before the "Contact Support" text (line 493), add a new row:

```tsx
<div className="flex items-center gap-2 text-sm">
  <Check className="w-4 h-4 text-primary flex-shrink-0" />
  <span className="text-muted-foreground">Need more Payment Tags 30% Discount</span>
  <span className="ml-auto text-xs text-muted-foreground">₹699 each</span>
</div>
```

### Change 2 — Update timer initial value from 120 to 300 (5 minutes)
Line 76: Change `useState(120)` to `useState(300)`.

### Change 3 — Make timer always red (brand color)
Line 341: Change the conditional color logic so the timer always uses the brand red color. Replace the conditional class with a fixed red style:

```tsx
// Before:
timeLeft <= 30 ? 'bg-red-500/20 text-red-300 animate-pulse' : 'bg-white/10'

// After:
'bg-accent/20 text-accent' + (timeLeft <= 30 ? ' animate-pulse' : '')
```

This uses `text-accent` (PayTap red #f6245b) for the timer at all times, with the pulse animation only kicking in under 30 seconds.
