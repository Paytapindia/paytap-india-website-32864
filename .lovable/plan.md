

## Plan: Sync How It Works Plans with Checkout Plans

The "Choose Your Plan" section on `/how-it-works` shows 3 outdated plans (Personal/Business/Corporate) with mismatched pricing and features. The actual checkout has 4 plans: Starter (₹999), Business Basic (₹1,998), Business Pro (₹4,998), Corporate (₹9,999).

### Change: Update `src/pages/HowItWorks.tsx` lines 383–399

Replace the `plans` array with 4 cards matching the checkout data:

```typescript
const plans = [
  {
    name: "Starter",
    subtitle: "1–5 vehicles",
    price: "₹999",
    features: ["1 Prepaid Tag/Card", "Basic Dashboard", "Tag Control", "Transaction View"],
    highlighted: false,
  },
  {
    name: "Business Basic",
    subtitle: "1–10 vehicles",
    price: "₹1,998",
    features: ["2 Prepaid Tags/Cards", "Full Dashboard", "MyFleet AI Access", "Smart Reports"],
    highlighted: false,
  },
  {
    name: "Business Pro",
    subtitle: "1–25 vehicles",
    price: "₹4,998",
    features: ["5 Prepaid Tags/Cards", "MyFleet AI", "ExpensePro", "Advanced Reporting", "Priority Support"],
    highlighted: true,
  },
  {
    name: "Corporate",
    subtitle: "1–100+ vehicles",
    price: "₹9,999",
    features: ["10 Prepaid Tags/Cards", "MyFleet AI", "ExpensePro", "Multi-User Access", "Dedicated Support"],
    highlighted: false,
  },
];
```

Also update the plan card grid from `md:grid-cols-3` to `md:grid-cols-4` (line 651), and add the price and subtitle to the card rendering (lines 662–684) — show price prominently above features, subtitle below the plan name.

### Files Changed

| File | Change |
|------|--------|
| `src/pages/HowItWorks.tsx` | Update plans array to 4 plans matching checkout, update grid to 4 columns, add price display to cards |

