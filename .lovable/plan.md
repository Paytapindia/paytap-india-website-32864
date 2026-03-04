

## Plan: Remove Auto-Redirect Timer from Payment Confirmation Dialog

The payment confirmation dialog currently has a 15-second countdown timer that auto-redirects to home. This needs to be removed so the user **must** explicitly click "Yes, Download Invoice" or "Cancel Order" — otherwise we can't determine payment status.

### Changes in `src/pages/Checkout.tsx`

1. **Remove the timer state and useEffect** (lines 178, 221–228): Delete `confirmTimeLeft` state and the countdown interval that auto-navigates on expiry.

2. **Remove the timer text from the dialog** (lines 814–816): Delete the "Redirecting to home in Xs..." paragraph.

3. **Keep everything else**: The dialog stays non-dismissable (`onOpenChange={() => {}}`), close button hidden — user must click one of the two buttons.

| File | Change |
|------|--------|
| `src/pages/Checkout.tsx` | Remove `confirmTimeLeft` state, countdown `useEffect`, and timer text from dialog |

