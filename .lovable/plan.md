

## Move Plan Features into Dynamic "What You're Activating Today"

### Changes in `src/pages/Checkout.tsx`

**1. Strip plan cards (lines 349-357)** — Remove the AMC line and the features `<ul>` from each card. Cards will show only: name, subtitle, price, recommended badge, and selection checkmark.

**2. Make "What You're Activating Today" dynamic (lines 370-382)** — Replace the static `ACTIVATION_ITEMS` list with:
- The selected plan's `features` array (changes when user switches plans)
- AMC line: "AMC ₹X/mo · Billed annually from Year 2"
- Keep baseline items: NFC Hardware, Secure Payment Control, Real-Time Transaction Visibility, Centralised Dashboard Access, 3–5 Day Delivery

**3. Remove `ACTIVATION_ITEMS` constant (lines 87-93)** — No longer needed; baseline items will be inline.

### Result
- Plan cards become compact price-only selectors
- "What You're Activating Today" becomes a rich summary that updates per selected plan

