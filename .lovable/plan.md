

## Plan: Phone Capture Gate for Checkout + "Try for Free" on Trial Pack

### What it does

1. **Phone number popup before checkout**: When user clicks "Activate Paytap Platform" (in HeroSection or CTASection), a Dialog appears asking for their phone number. Only after entering a valid 10-digit number and clicking "Proceed", the lead is saved to the `leads` table and the user is navigated to `/checkout`.

2. **"Try for Free" button on Trial Pack**: In the checkout plan list, the Trial Pack row gets an additional "Try for Free" button that opens `https://dashboard.myfleetai.in/login` in a new tab (instead of proceeding to payment).

---

### Files to change

**1. New component: `src/components/PhoneGateDialog.tsx`**
- A reusable Dialog component with:
  - Phone number input (same validation as LoginPopup: 10-digit Indian mobile)
  - "Proceed" button (disabled until valid phone entered)
  - On submit: save lead to `leads` table (source: `"checkout_gate"`), then call `onProceed()` callback
- Props: `open`, `onOpenChange`, `onProceed`

**2. `src/components/CTASection.tsx`**
- Import `PhoneGateDialog` and add state for dialog open/close
- On "Activate Paytap Platform" click → open dialog instead of navigating
- On dialog proceed → `navigate('/checkout')`

**3. `src/components/HeroSection.tsx`**
- Same pattern: import `PhoneGateDialog`, open dialog on button click, navigate on proceed

**4. `src/pages/Checkout.tsx` (lines ~370-435)**
- In the Trial Pack plan row, add a "Try for Free" button next to the price
- Clicking it opens `https://dashboard.myfleetai.in/login` in a new tab
- Only shown for the `starter` plan key

