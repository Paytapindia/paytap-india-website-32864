

## Update "What If Someone Taps the Car" FAQ on Security Page

**File**: `src/pages/Security.tsx` (lines 225-234)

Update the first item in the `whatIfItems` array to include the expanded security points:

```tsx
{
  q: "What if someone taps the car while it's parked?",
  a: [
    'NFC works only within 2–4 cm, so physical contact is required',
    'Only registered merchant POS devices can initiate a payment',
    'Transactions above ₹5,000 require a PIN for extra security',
    'Owners can set limits or turn contactless ON/OFF anytime from the app',
    'Instant payment alerts + full transaction traceability, and we assist with refunds for accidental ₹0–₹5,000 transactions',
  ],
},
```

