

## Fix: Align Checkout Review with Invoice Breakdowns

### Problem

The checkout review (Step 4) currently shows:
- **Activation Fee** = entire pre-tax amount (total ÷ 1.18) — does not match invoice
- **AMC** values: business_pro shows ₹1,200 but invoice uses ₹1,199

The invoice splits into two GST-inclusive line items (Activation + AMC = Total), but the review page shows a different structure (pre-tax subtotal + GST = Total).

### Fix

Update the Step 4 order summary to show the same two-line breakdown as the invoice, using the same `PLAN_BREAKDOWNS` amounts:

| Plan | Activation (incl GST) | AMC (incl GST) | Total |
|------|-----------------------|-----------------|-------|
| Starter | ₹699 | ₹300 | ₹999 |
| Business Basic | ₹1,000 | ₹600 | ₹1,600 |
| Business Pro | ₹2,550 | ₹1,199 | ₹3,749 |
| Corporate | ₹4,599 | ₹2,400 | ₹6,999 |

The review will show:
- One Time Activation & NFC Installation: ₹X (incl GST)
- Annual Maintenance Charges (AMC): ₹X (incl GST)
- Separator
- Total Payable: ₹X (incl 18% GST)

### Files Modified

| File | Change |
|------|--------|
| `src/pages/Checkout.tsx` | Update `getAmcAmount` to use 1199 for business_pro; rewrite Step 4 order summary to show Activation + AMC breakdown matching invoice |

No changes to the invoice generator — it's already correct.

