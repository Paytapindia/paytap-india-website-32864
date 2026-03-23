

## Plan: Make Delivery Address Mandatory Before Payment

### Changes in `src/pages/Checkout.tsx`

**1. Show delivery fields by default (always visible, not collapsible)**
- Remove the `showDelivery` toggle button
- Always render the delivery address fields (Address, State, City, Pincode)
- Remove the `AnimatePresence` collapse wrapper — fields are always visible
- Add a section label: "Delivery Address" with a MapPin icon

**2. Add validation for all delivery fields**
- In `onSubmit` (line ~236), validate that `address`, `state`, `city`, and `pincode` are all filled:
  - Address: required, non-empty
  - State: required, must be selected
  - City: required, must be selected
  - Pincode: required, 6-digit format
- Show inline error messages for each missing/invalid field

**3. Remove `details_pending` logic**
- Since delivery is now mandatory, `details_pending` is always `false`
- Line 254-268: remove the conditional, always set `details_pending: false`

**4. Remove `showDelivery` state variable**
- Clean up the `useState` for `showDelivery` and all references to it

**File:** `src/pages/Checkout.tsx`

