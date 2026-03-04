

## Plan: Update Driver Expense Card Quantities & Add Premium Plan Perks

### Logic

- **Driver Expense Cards**: Half the number of tags, rounded down. Starter (1 tag → 0 cards), Business Basic (2 tags → 0 cards), Business Pro (5 tags → 2 cards), Corporate (10 tags → 5 cards).
- **Business Pro & Corporate** get additional perks: Dedicated Support, Myfleet AI Vehicle Manager, ExpensePro Business Expense Management.

### Changes in `src/pages/Checkout.tsx`

**1. Add helper function for driver card count**
```typescript
const getDriverCards = (planKey: PlanType) => {
  if (planKey === 'starter' || planKey === 'business_basic') return 0;
  return Math.floor(PLANS[planKey].tags / 2);
};
```

**2. Update all 3 locations showing "X Driver Expense Cards"**

- **Step 1 dynamic summary (line 446)**: Use `getDriverCards` — show driver cards line only if count > 0
- **Sidebar summary (line 776)**: Same logic — conditionally show driver cards
- **Add premium perks for Business Pro & Corporate** in both the step 1 summary and the sidebar:
  - `✔ Dedicated Support`
  - `✔ Myfleet AI Vehicle Manager`
  - `✔ ExpensePro Business Expense Management`

**3. Update ACTIVATION_INCLUDES (line 89)**
- Change "Driver Prepaid Expense Card" to "Driver Prepaid Expense Card (select plans)" to indicate it's not universal

**4. Update plan cards micro-text (if present)**
- Starter card: show "No Driver Expense Card" or simply omit mention
- Business Pro card value highlight: update to reflect accurate card count

| File | Change |
|------|--------|
| `src/pages/Checkout.tsx` | Add `getDriverCards` helper, update 3 display locations, add premium perks for Pro/Corporate plans |

