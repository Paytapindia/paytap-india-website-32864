

## Plan: Remove Phone Gate, Make Trial Pack Free, and Redirect to Dashboard

### Changes across 3 files

**1. `src/components/HeroSection.tsx`** — Remove phone gate, navigate directly to `/checkout`
- Remove `useState` for `showPhoneGate`
- Remove `PhoneGateDialog` import and component
- Change button `onClick` from `setShowPhoneGate(true)` to `navigate('/checkout')`

**2. `src/components/CTASection.tsx`** — Same removal
- Remove `useState` for `showPhoneGate`
- Remove `PhoneGateDialog` import and component
- Change button `onClick` from `setShowPhoneGate(true)` to `navigate('/checkout')`

**3. `src/pages/Checkout.tsx`** — Three changes:

a) **Trial Pack price to ₹0**: Change `starter.price` from `999` to `0`, update `perVehicle` to `'Free'`

b) **Remove "Paytap Payment Tag (Free)" from blue summary box** (line ~463-466): Hide the payment tag line item when `selectedPlan === 'starter'`

c) **Trial Pack submit behavior**: When `selectedPlan === 'starter'`, skip address validation, skip PayU payment link, skip order insert with payment, and instead redirect directly to `https://dashboard.myfleetai.in/` (save lead to orders table with `payment_status: 'free_trial'` and no address required)

### Technical Details

- In the `onSubmit` handler, add an early return path for `starter` plan that:
  - Skips address field validation
  - Saves order with `amount: 0` and `payment_status: 'free_trial'`
  - Redirects via `window.location.href = 'https://dashboard.myfleetai.in/'`
- The blue summary box conditionally hides the tag line for starter plan
- Price display will show `₹0` / "Free" for Trial Pack

