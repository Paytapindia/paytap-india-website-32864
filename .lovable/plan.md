

## Update "What's Included" Section — Values, Labels, and Total Savings

### File: `src/pages/Checkout.tsx`

### Change 1 — Line 456-457: Rename "Lifetime Platform Access" to "PayTap Lifetime Access"
- `Lifetime Platform Access` → `PayTap Lifetime Access`
- Keep the `₹10,000 value` as-is

### Change 2 — Lines 465-472: Add ₹10,000 value to MyFleet AI Access and ExpensePro Access (Business)
- MyFleet AI Access line: add `<span className="ml-auto text-xs text-muted-foreground">₹10,000 value</span>`
- ExpensePro Access line: add `<span className="ml-auto text-xs text-muted-foreground">₹10,000 value</span>`

### Change 3 — Lines 448-452: Update "Additional tags" text
- Change `Additional tags — ₹499 each` to `Need more Payment Tags (Flat Offer)`
- Add value span: `<span className="ml-auto text-xs text-muted-foreground">₹499 each</span>`

### Change 4 — Add a "Total Value" summary row after the benefits list (after line 491, before Payment Summary)
Show the user the total perceived value vs what they pay:

- **Personal**: Tag (₹999) + Platform (₹10,000) = ₹10,999 total value → paying ₹999
- **Business**: Tags (₹1,998) + Platform (₹10,000) + MyFleet AI (₹10,000) + ExpensePro (₹10,000) = ₹31,998 total value → paying ₹1,998

Display as a highlighted row:
```text
Total Value: ₹10,999 (strikethrough)  You Pay: ₹999
```
or for Business:
```text
Total Value: ₹31,998 (strikethrough)  You Pay: ₹1,998
```

This will be a styled div with the original value crossed out and the actual price highlighted in green/primary, reinforcing the perceived savings.

