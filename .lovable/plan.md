

## Update Review & Activate Order Summary

### Changes in `src/pages/Checkout.tsx`

**1. Change "Product" value** (line 682): Replace `NFC Payment Tag` / `Prepaid Card` with `Paytap Activation Plan`

**2. Add "Includes" section** after Activation Fee (after line 691): Show what's included:
- Free Contactless NFC Payment Tags (matching plan unit count)
- AMC charges per year based on plan (Starter: ₹300, Business Basic: ₹600, Business Pro: ₹1,200, Corporate: ₹2,400)

### Implementation

```tsx
// Line 682: Change product name
<span className="font-medium text-foreground">Paytap Activation Plan</span>

// After line 691: Add includes section
<div className="pl-1 space-y-1">
  <p className="text-xs text-muted-foreground italic">Which includes:</p>
  <p className="text-xs text-muted-foreground">• {plan.tags} Contactless NFC Payment Tag{plan.tags > 1 ? 's' : ''} free</p>
  <p className="text-xs text-muted-foreground">• AMC: ₹{amcAmount}/year</p>
</div>
```

AMC helper (add near other helpers):
```tsx
const getAmcAmount = (planKey: PlanType): number => {
  const amcMap: Record<PlanType, number> = {
    starter: 300, business_basic: 600,
    business_pro: 1200, corporate: 2400
  };
  return amcMap[planKey];
};
```

| File | Lines | Change |
|------|-------|--------|
| `src/pages/Checkout.tsx` | ~122 | Add `getAmcAmount` helper |
| `src/pages/Checkout.tsx` | 682 | Product → "Paytap Activation Plan" |
| `src/pages/Checkout.tsx` | 691-692 | Insert "includes" block after Activation Fee |

