

## Plan: Update Blue Summary Box Features

### File: `src/pages/Checkout.tsx` (lines 462-485)

### Changes

Replace the current features list in the blue summary box with these items for every plan:

1. **`{tags} Paytap Payment Tags (Free)`** — rename from "Paytap Tags Free" to "Paytap Payment Tags (Free)"
2. **`{driverCards} Driver Expense Card(s)`** — show for all plans; for Trial/Basic (0 cards), show "0 Driver Expense Cards" or hide it. Since user said "work that for all boxes," show it for plans that have cards and omit for those that don't (current behavior is fine, just keep it).
3. **`Access to {plan.name}`** — replace the two separate "Access to Myfleet AI" / "Access to ExpensePro" lines with a single line: "Access to {plan.name}" (e.g., "Access to Business Pro", "Access to Trial Pack")
4. **`Instant Account Activation`** — already present, keep as-is
5. **`Dedicated Support`** — add as a new line with CheckCircle icon

### Specific line changes (lines 462-485)

```tsx
<ul className="space-y-2.5 text-sm text-primary-foreground/80">
  <li className="flex items-center gap-2">
    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
    {plan.tags} Paytap Payment Tag{plan.tags > 1 ? 's' : ''} (Free)
  </li>
  {getDriverCards(selectedPlan) > 0 && (
    <li className="flex items-center gap-2">
      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
      {getDriverCards(selectedPlan)} Driver Expense Card{getDriverCards(selectedPlan) > 1 ? 's' : ''}
    </li>
  )}
  <li className="flex items-center gap-2">
    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
    Access to {plan.name}
  </li>
  <li className="flex items-center gap-2">
    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
    Instant Account Activation
  </li>
  <li className="flex items-center gap-2">
    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
    Dedicated Support
  </li>
</ul>
```

Single file, single section change.

