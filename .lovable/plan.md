

## Redesign Invoice Line Items Table to Match Reference Format

**What Changes**

Replace the current simple 6-column line items table with a professional GST-compliant table matching the reference screenshot format.

**New Table Columns**

| Sr. No. | HSN/SAC | Description of Service/Goods | UOM | Qty. | Rate | Gross Value | Dis. | Taxable Value | CGST Rate | CGST Amt | SGST Rate | SGST Amt | IGST Rate | IGST Amt |

**File Modified**
| File | Change |
|------|--------|
| `src/lib/generateInvoice.ts` | Replace line items table section (lines ~283-396) with new columnar layout matching the reference |

**Layout Details**
- Smaller font (6.5-7pt) to fit all columns in A4 width
- Header row with bold text and border lines
- Sub-header row for CGST/SGST/IGST showing "Rate" and "Amt" labels
- Each line item row shows:
  - Sr. No. (1, 2, 3...)
  - HSN/SAC code
  - Description (wrapped within column width)
  - UOM: "Nos."
  - Qty, Rate, Gross Value (Rate x Qty)
  - Dis. (discount amount or blank)
  - Taxable Value (Gross Value - Discount)
  - Per-line CGST/SGST/IGST rate and amount (intra-state: 9%/9%, inter-state: 18% IGST)
- **Total row** at bottom with column totals for Gross Value, Taxable Value, and tax amounts
- Remove the separate "Sub Total / CGST / SGST / IGST" summary below the table since taxes are now shown per-line
- Keep: Total in Words, Round Off (if needed), Grand Total, footer

**Spelling & Alignment Audit**
- Fix "Bengaluru" consistency in company address
- Verify "Activation" vs "Installation" spelling
- Ensure all numeric columns are right-aligned
- Ensure description column is left-aligned
- Verify HSN codes: 997159 (Activation), 998313 (AMC)

**Sample Output (text representation)**
```text
Sr.|HSN/SAC|Description              |UOM |Qty|  Rate|Gross Value|Dis.|Taxable Value|CGST     |SGST     |IGST
   |       |                         |    |   |      |           |    |             |Rate|Amt |Rate|Amt |Rate|Amt
 1 |997159 |PayTap NFC Tag Activation|Nos.|  1|593.22|    593.22 |    |      593.22 |9.00|53.39|9.00|53.39|0.00|0.00
 2 |998313 |Annual Maintenance (AMC) |Nos.|  1|254.24|    254.24 |    |      254.24 |9.00|22.88|9.00|22.88|0.00|0.00
 3 |       |Discount                 |Nos.|  1| -0.85|     -0.85 |    |       -0.85 |9.00|-0.08|9.00|-0.08|0.00|0.00
   |       |              Total      |    |   |      |    846.61 |    |      846.61 |    |76.19|    |76.19|    |0.00

Total In Words: Indian Rupees Nine Hundred Ninety Nine Only
Round Off: +0.01
Total: ₹999.00
```

