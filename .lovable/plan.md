
Goal: fix invoice text overlap (especially address) and ensure the same fix works for both customer downloads and admin downloads.

What I reviewed
- `src/lib/generateInvoice.ts` (invoice rendering logic)
- `src/pages/admin/AdminOrders.tsx` (admin invoice download trigger)
- `src/pages/Checkout.tsx` + `src/pages/SampleInvoice.tsx` (customer/sample invoice triggers)
- Recent order records in database (found long addresses up to 103 chars, which can overflow)
- Screenshots captured:
  - Sample invoice screen: `tool-results://screenshots/20260313-080653-571758.png`
  - Admin access gate/login screen: `tool-results://screenshots/20260313-080719-465452.png`

Root cause
- In `generateInvoice.ts`, Bill To / Ship To address fields are drawn with single-line `doc.text(...)` calls (no width wrapping).
- Long address/company strings overflow into adjacent text regions, causing overlap.

Implementation plan
1. Update invoice layout engine in `src/lib/generateInvoice.ts`
   - Add reusable helper(s) to wrap text using `doc.splitTextToSize`.
   - Define strict column widths for Bill To and Ship To blocks.
   - Render multi-line blocks with controlled line-height and dynamic Y growth.
   - Keep first identity line (name/company) styled bold, rest normal.
   - Ensure `y` continues from `Math.max(billEndY, shipEndY)` so table starts below both columns.

2. Hardening for long text fields
   - Apply wrapping to:
     - company/name
     - address
     - city/state/pincode line
     - GST/PAN line if present
   - Add safe fallbacks for missing address fields so spacing remains stable.

3. Keep admin and customer flows aligned automatically
   - No API change to `generateInvoice(...)` signature.
   - Since both Checkout and AdminOrders already call the same invoice utility, fixing this one file updates both user and admin downloads.

4. Verification checklist (post-fix)
   - Customer path:
     - `/sample-invoice` → download all 4 plans.
     - Run one “long address stress test” payload (same format as production long addresses).
   - Admin path:
     - login → `/admin-dashboard/orders` → open order details → Download Invoice.
   - Validate no overlap in Bill To / Ship To and table starts below address block.
   - Confirm invoice still saves with proper totals and GST lines.

Technical details (for implementation)
- Replace current direct calls like:
  - `doc.text(data.address, margin, billY)`
  - `doc.text(data.address, shipX, shipY)`
- With wrapped rendering logic:
  - `const lines = doc.splitTextToSize(value, columnWidth);`
  - draw each line with `lineHeight` increments
  - return final cursor Y from helper
- Suggested constants:
  - `columnGap = 8`
  - `columnWidth = (contentWidth - columnGap) / 2`
  - `lineHeight = 3.8` to `4.2` mm
- Keep final `doc.save(...)` behavior unchanged.

Text sample of expected output (after fix)
```text
Bill To
Ashok
Prestige Minera, No.6, 3rd Floor, Main Guard Cross Rd,
Near Shivaji Nagar, Bengaluru
Bangalore Karnataka 560001
GSTIN: 29ABCDE1234F1Z5

Ship To
Ashok
Prestige Minera, No.6, 3rd Floor, Main Guard Cross Rd,
Near Shivaji Nagar, Bengaluru
Bangalore Karnataka 560001
GSTIN: 29ABCDE1234F1Z5
```

Execution order
1) Patch `generateInvoice.ts` wrapping + dynamic spacing
2) Validate with sample download
3) Validate from admin orders download
4) Share before/after proof and final confirmation
