

## Plan: Preserve User Data on "No, Try Again" in Post-Payment Dialog

### Problem
When a user clicks "No, Try Again" (decline) in the post-payment confirmation dialog, they are navigated to the home page and lose all entered data. This forces them to re-enter everything, causing friction and drop-off.

### Solution
Modify `handleDeclinePayment` in `src/pages/Checkout.tsx` to:

1. **Close the confirmation dialog** instead of navigating away
2. **Keep the user on Step 4 (Review & Pay)** with all form data intact
3. **Update the order status** to `retry` (instead of `cancelled`) so the record reflects the intent
4. **Reset the timer** to give the user a fresh 5 minutes to retry

### Changes — `src/pages/Checkout.tsx`

**`handleDeclinePayment` function (lines 329-332)**:
- Instead of `navigate("/")`, simply close the dialog (`setShowConfirmation(false)`)
- Keep `currentStep` at 4 so user lands on "Review & Pay"
- Update order status to `retry` instead of `cancelled`
- Reset the countdown timer to 300 seconds

No other files need changes. All form state (`lastFormData`, `formValues`, `selectedPlan`, etc.) is already preserved in React state — we just stop navigating away.

