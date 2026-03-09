

## Fix Driver Expense Card Counts

Currently `getDriverCards` uses `Math.floor(tags / 2)` which gives Business Pro = 2 and Corporate = 5. Need to change to Business Pro = 1, Corporate = 2.

### Changes

**1. `src/pages/Checkout.tsx` (line 122-125)**
Replace the formula with explicit values:
```typescript
const getDriverCards = (planKey: PlanType): number => {
  if (planKey === 'starter' || planKey === 'business_basic') return 0;
  if (planKey === 'business_pro') return 1;
  if (planKey === 'corporate') return 2;
  return 0;
};
```

**2. `src/pages/HowItWorks.tsx` (line 402)**
Change `"2 Driver Expense Cards"` → `"1 Driver Expense Card"`

**3. `src/pages/HowItWorks.tsx` (line 409)**
Change `"5 Driver Expense Cards"` → `"2 Driver Expense Cards"`

