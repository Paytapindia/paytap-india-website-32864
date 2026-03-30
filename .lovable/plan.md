

## Plan: Update Checkout Plans

**File:** `src/pages/Checkout.tsx`

### Changes

1. **Rename Starter to "Trial Pack" and update price** (lines 31-38):
   - `name: 'Trial Pack'`, `price: 499`, `perVehicle: '₹499/vehicle'`

2. **Remove `business_basic` plan** from:
   - `PLANS` object (lines 39-46): delete the entry
   - `PAYU_PAYMENT_LINKS` (line 67): delete the entry
   - `PlanType` union (line 19): remove `'business_basic'`

3. **Update starter payment link** (line 66):
   - Change to `"https://u.payu.in/PAYUMN/DI0n94uVwFBB"`

4. **Conditional feature display in blue summary box** (lines 461-468):
   - For `selectedPlan === 'starter'`, show "No Access to Myfleet AI" and "No Access to ExpensePro" with an X icon instead of CheckCircle
   - For other plans, keep the existing CheckCircle + "Access to..." text

