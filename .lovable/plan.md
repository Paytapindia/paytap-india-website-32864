
## Checkout Urgency Timer + Post-Payment Confirmation Flow

### Overview
Three features to add to the checkout page:
1. A countdown timer (120s) in the top-right of the checkout card that redirects to home if it expires
2. Replace the post-order success screen with a payment confirmation popup (Yes/No buttons)
3. Auto-redirect to home after 15 seconds if no action on the confirmation popup

---

### File: `src/pages/Checkout.tsx`

### Change 1 — Add Countdown Timer (120 seconds)
- Add state: `const [timeLeft, setTimeLeft] = useState(120)`
- Add a `useEffect` with `setInterval` that decrements `timeLeft` every second
- When `timeLeft` reaches 0, call `navigate("/")`
- Display the timer in the top-right corner of the checkout card header (the dark `bg-paytap-dark` bar), showing `MM:SS` format with a clock icon
- Timer text turns red/warning when under 30 seconds
- Import `Timer` icon from lucide-react

### Change 2 — Replace Success State with Payment Confirmation Popup
Instead of the full-page success screen, show a **dialog/modal** after form submission asking:

**Title:** "Looks like you have placed an order to get access"

**Two buttons:**
- **"Yes, Payment Successful"** (primary) — Updates the order's `payment_status` to `'confirmed'` in the database, then navigates home
- **"No, Will Try After Sometime"** (outline) — Updates `payment_status` to `'cancelled'`, then navigates home

Add state `showConfirmation` (boolean) — set to `true` after order is saved (replacing `setOrderPlaced(true)`)

### Change 3 — Auto-redirect on confirmation popup (15 seconds)
- Add a separate countdown `confirmTimeLeft` starting at 15 when `showConfirmation` becomes true
- Display this countdown in the modal (e.g., "Redirecting to home in 15s...")
- When it hits 0, navigate to home (treat as no action — set `payment_status` to `'pending'`)

### Database
- No schema changes needed — the existing `payment_status` column (text) already supports values like `'confirmed'`, `'cancelled'`, `'pending'`
- The order's `txnid` will be stored in state so we can update the right row

---

### Technical Details

**New state variables:**
```text
timeLeft: number (120)
showConfirmation: boolean (false)
confirmTimeLeft: number (15)
orderTxnId: string ("") — to track which order to update
```

**Timer display location:** Inside the dark header bar of the checkout card, right-aligned next to "Secure Checkout" or replacing the current top bar timer area.

**Dialog:** Uses the existing `Dialog` component from `src/components/ui/dialog.tsx` for the confirmation popup — no new dependencies needed.

**Order update on confirmation:** Uses `supabase.from('orders').update({ payment_status: 'confirmed' }).eq('txnid', orderTxnId)` to mark the order.
