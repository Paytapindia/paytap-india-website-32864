
Goal: fix invoice table overlap/align defects in production PDF output and provide immediate QA sample downloads.

1) Re-confirm root cause from current code + screenshot
- Files to isolate:
  - `src/lib/generateInvoice.ts` (table geometry/rendering)
  - `src/pages/SampleInvoice.tsx` (quick sample generation)
- Issue rephrased: tax columns in the line-items grid are too tightly packed and rendered with hardcoded X positions, so percentage + amount values visually collide in the right-side tax section.
- Do I know what the issue is? Yes.
- Exact problem:
  - Column boundaries are manually hardcoded and not driven by a single width model.
  - Tax-rate cells are right-aligned against very narrow columns, making CGST/SGST boundary text appear overlapped.
  - Header/data use tight spacing without fit checks, so larger values (e.g., 533.82) crowd adjacent cells.

2) Implementation plan (safe + deterministic)
- In `src/lib/generateInvoice.ts`, replace manual tax-column X math with a single column-width schema:
  - Define each column by width, then compute cumulative X boundaries once.
  - Keep total table width fixed to A4 printable area.
- Build one shared cell renderer:
  - `drawCell(text, left, width, align: left|center|right, y, fontSize)`
  - Add inner padding so text never touches borders.
  - Auto-fit numeric text using `doc.getTextWidth` and reduce font size slightly when needed (within safe minimum) to prevent overflow.
- Apply stricter alignment rules:
  - Description = left
  - Qty/Rate/Amounts = right
  - Tax rates (`9%`, `18%`) = center (not right) to avoid boundary crowding.
- Keep current business/tax logic unchanged; only rendering geometry/alignment will be refactored.
- Preserve existing GST behavior:
  - Intra-state: CGST + SGST columns
  - Inter-state: IGST columns
- Keep spelling/labels audited and consistent:
  - “Bengaluru”, “Activation & Installation Charges”, “Taxable Value”, etc.

3) Visual QA hardening before final handoff
- Run a strict PDF test matrix from sample route after changes:
  - ₹999 (Karnataka), ₹1600 (Karnataka), ₹3749 (Karnataka), ₹6999 (Karnataka)
  - Inter-state sample (e.g., Maharashtra/Tamil Nadu) for IGST layout
  - Long address/company name sample
- Verify all rows:
  - No text overlap in tax columns
  - Header labels centered and readable
  - Totals row aligned with numeric columns
  - Footer/round-off/total block intact

4) “Sample download right away” delivery
- Update `src/pages/SampleInvoice.tsx` to include an explicit “QA Stress Sample” button (high-value, max-width case) plus existing plan buttons.
- You can immediately open `/sample-invoice` and download the updated QA sample PDFs after implementation for instant validation before sign-off.

Files to change
- `src/lib/generateInvoice.ts` (primary fix)
- `src/pages/SampleInvoice.tsx` (quick QA sample access)
