

## Plan: Fix Invoice Generation Logic

### Problem
The current invoice has incorrect item naming ("Paytap NFC Payment Tag"), uses `quantity = plan.tags` (e.g. 5 for Business Pro), calculates tax per-unit incorrectly, and shows a "Tax" column with wrong values in the line item row.

### Changes

**1. `src/lib/generateInvoice.ts` — Overhaul invoice logic**

- **Interface**: Add `vehicleCount: number` field. Change `quantity` to always expect 1. Remove `unitPrice` (redundant with `subtotal` when qty=1).
- **Item name**: Change from `"Paytap NFC Payment Tag"` to `"PayTap Vehicle Activation Plan – {vehicleCount} Vehicle(s)"`.
- **Table columns**: Remove the "Tax" column entirely. Keep: Item, HSN, Qty, Rate, Tax %, Amount.
- **Line item row**: Qty = `1`, Rate = `subtotal` (plan price), Tax % = `18%`, Amount = `subtotal`.
- **GST calculation**: `GST = subtotal × 0.18`, split into CGST 9% + SGST 9% (intra-state) or IGST 18% (inter-state). Use `Math.round()` for whole rupees.
- **Total**: `subtotal + gstAmount`. Total in words uses this final amount.
- **Payment Made / Balance Due**: Shows total paid, balance ₹0.

**2. `src/pages/Checkout.tsx` — Update invoice data passed (lines 302-321)**

- Pass `vehicleCount: plan.tags` instead of using it as `quantity`.
- Set `quantity: 1`.
- Set `unitPrice: plan.price` (same as subtotal since qty=1).

**3. `src/pages/SampleInvoice.tsx` — Update sample data**

- Add `vehicleCount: 5`, set `quantity: 1`, adjust amounts to match Business Pro plan correctly.

### Verification
All four plans should produce correct invoices:
- Starter: Rate ₹999, GST ₹180, Total ₹1,179
- Business Basic: Rate ₹1,998, GST ₹360, Total ₹2,358
- Business Pro: Rate ₹4,998, GST ₹900, Total ₹5,898
- Corporate: Rate ₹9,999, GST ₹1,800, Total ₹11,799

| File | Change |
|------|--------|
| `src/lib/generateInvoice.ts` | Fix item name, qty=1, remove Tax column, correct GST calc |
| `src/pages/Checkout.tsx` | Pass `vehicleCount`, set `quantity: 1` |
| `src/pages/SampleInvoice.tsx` | Update sample data to match new interface |

