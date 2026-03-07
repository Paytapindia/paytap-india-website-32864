

## Plan: Update Checkout Plan Pricing & Vehicle Counts

### Changes in `src/pages/Checkout.tsx`

**Plan data (lines 37-78):**

| Plan | Current Price | New Price | Current Vehicles | New Vehicles |
|------|--------------|-----------|-----------------|--------------|
| Starter | 999 | 999 | 1 | 1 |
| Business Basic | 1,999 | 2,399 | 2 | 3 |
| Business Pro | 4,999 | 3,749 | 7 | 5 |
| Corporate | 9,999 | 6,999 | 15 | 10 |

**Per-vehicle label (line 436):** Update from "Only ₹714 per vehicle" → "Only ₹750 per vehicle" (₹3,749 / 5 = ₹750).

**Best Value label (lines 433-437):** Move the "Best Value" badge from Business Pro to Business Basic (₹800/vehicle vs ₹999 for Starter — user requested "best value" on Business Basic). Business Pro keeps its "⭐ Recommended" badge and per-vehicle label.

**Payment links:** These will need new PayU links for the updated amounts. The current links were created for the old prices. Do you want to provide new payment links, or should I keep the existing ones for now?

**No other changes** — plan names, GST-inclusive logic, and invoice generation all stay the same.

| File | Changes |
|------|---------|
| `src/pages/Checkout.tsx` | Update prices, vehicle counts, per-vehicle label, move Best Value badge to Business Basic |

