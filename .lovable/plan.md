

## Plan: Year-End "Double Value" Offer Banner on Checkout

### What

Add a prominent offer banner on the checkout page announcing: **"Year-End Offer: Buy any plan & get DOUBLE the value! Offer expires 31st March"**. Update the plan cards to show the doubled tag count as bonus value.

### Changes in `src/pages/Checkout.tsx`

**1. Add an offer banner above the plan selector**
- Insert a vibrant banner (gradient background, e.g. accent/orange tones) between the page subtitle and the plan cards
- Content:
  - "🎉 Year-End Offer" badge
  - "Buy Any Plan & Get Double the Value!"
  - "Offer expires 31st March 2026" in smaller text
- Pulsing/animated border or glow for attention

**2. Update plan card display to show bonus**
- Below each plan's existing tag count, add a line like: "🎁 Bonus: +X extra tags FREE" (matching the plan's original tag count)
- Example: Starter (1 tag) → shows "+1 extra tag FREE", Business Pro (5 tags) → "+5 extra tags FREE"
- Style the bonus line in accent/green color to stand out

**3. Update the blue summary box**
- Change the "X Paytap Tags Free" line to show the doubled amount, e.g. "2 Paytap Tags (1 + 1 Bonus)" for Starter
- Add a "Year-End Bonus" label next to the bonus tags

**File:** `src/pages/Checkout.tsx` only

