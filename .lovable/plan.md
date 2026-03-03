

## Add Invoice Download to Payment Confirmation Dialog

### What Changes

**1. Redesign the confirmation dialog** (lines 617-642 in `Checkout.tsx`)
- Change "Yes, Payment Successful" button to "Yes, Download Invoice"
- Change "No, Will Try Later" button to "Cancel Order"
- On "Yes, Download Invoice": mark payment as confirmed, generate PDF invoice, trigger download, then redirect home
- On "Cancel Order": mark as cancelled, redirect home

**2. Create a PDF invoice generator utility** (`src/lib/generateInvoice.ts`)
- Uses the browser's built-in capabilities (no external library needed) — generates a styled HTML invoice in a hidden iframe and triggers `window.print()` to save as PDF
- Alternatively, we can use `jspdf` for a proper programmatic PDF. Given the structured invoice format from the uploaded sample, `jspdf` is the better approach for a clean downloadable file.

**3. Invoice format** (matching the uploaded INV-000037.pdf):
- **Header**: Paytap logo, company name "DRIVETAP INNOVATION INDIA PRIVATE LIMITED", address (Level 15, Concorde Towers, UB City, Vittal Mallya Road, Bengaluru 560001), GSTIN 29AALCD4626M1Z3, phone 9900010964, email support@paytap.co.in
- **Invoice number**: Auto-generated from txnid (e.g. INV-{txnid})
- **Invoice date**: Current date
- **Bill To**: Customer name, address, city, state, pincode, GSTIN (if provided)
- **Ship To**: Same address with GSTIN
- **Line items table**: Product name, HSN/SAC code (997159), quantity, unit rate (plan price), GST %, GST amount, total
- **Totals**: Subtotal, IGST/CGST+SGST (18%), Total, Payment Made, Balance Due ₹0.00
- **Footer**: "Authorized Signature" area, "This is a computer-generated invoice, no signature required"

### Technical Approach

**New dependency**: `jspdf` — for programmatic PDF generation in the browser.

**New file**: `src/lib/generateInvoice.ts`
- Export a function `generateInvoice(orderData)` that builds a PDF using jspdf
- Takes: name, address, city, state, pincode, phone, email, pan, gst, companyName, txnid, amount, subtotal, gstAmount, planName, quantity, productType
- Returns: triggers a download of the PDF file

**Modified file**: `src/pages/Checkout.tsx`
- Import `generateInvoice`
- Store form data in a ref/state so it's available when the dialog shows
- Redesign dialog buttons:
  - "Yes, Download Invoice" → calls `generateInvoice(...)` then `handleConfirmPayment()`
  - "Cancel Order" → calls `handleDeclinePayment()`
- Add Download icon from lucide-react

### Invoice Layout (matching uploaded sample)

```text
┌─────────────────────────────────────────────┐
│  [Logo]  DRIVETAP INNOVATION INDIA PVT LTD  │
│  Address, GSTIN, Phone, Email               │
│                                             │
│  TAX INVOICE          INV-TXN...            │
│  Invoice Date: DD/MM/YYYY                   │
│  Place of Supply: [State]                   │
│                                             │
│  Bill To:              Ship To:             │
│  [Customer details]    [Same]               │
│                                             │
│  ┌──────┬────┬───┬──────┬───┬──────┬──────┐ │
│  │Item  │HSN │Qty│Rate  │ % │Tax   │Amount│ │
│  ├──────┼────┼───┼──────┼───┼──────┼──────┤ │
│  │PayTap│9971│ 2 │999.00│18%│xxx.xx│x,xxx │ │
│  └──────┴────┴───┴──────┴───┴──────┴──────┘ │
│                                             │
│  Sub Total: ₹x,xxx                          │
│  IGST (18%): ₹xxx                           │
│  Total: ₹x,xxx                              │
│  Payment Made: (-) x,xxx                    │
│  Balance Due: ₹0.00                         │
│                                             │
│  Computer-generated, no signature required  │
└─────────────────────────────────────────────┘
```

### Changes Summary

| File | Action |
|------|--------|
| `package.json` | Add `jspdf` dependency |
| `src/lib/generateInvoice.ts` | New — PDF invoice generator |
| `src/pages/Checkout.tsx` | Redesign confirmation dialog, store form data, wire invoice download |

