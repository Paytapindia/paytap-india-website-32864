

## Plan: Premium Checkout Step 1 — Full UX & Psychology Optimization

### Changes in `src/pages/Checkout.tsx`

**1. Header — Add trust line (lines 374-381)**
- Keep existing header and subtitle
- Add: `Built for personal vehicles, businesses, and fleet operators across India.` below subtitle

**2. Plan Cards — Make Business Pro dominant (lines 386-418)**
- Business Pro card: larger padding (`p-6 md:p-8`), thicker border (`border-[3px]`), elevated shadow, slightly scaled (`scale-[1.03]`)
- Change badge text from `Most Popular` → `⭐ Recommended For Most Fleets`
- Add micro-text under Starter: `Best for single vehicle use`
- Add value highlight inside Business Pro: `Best Value · Only ₹999 per vehicle`

**3. Plan Selection Feedback — Right-side summary (lines 386-420)**
- After plan cards grid, add a dynamic selection summary box showing:
  - `X Vehicles Activated`
  - `X NFC PayTap Tags`
  - `X Driver Expense Cards`
  - `Total Today: ₹X,XXX`

**4. Activation Includes — Two-column layout improvement (lines 422-435)**
- Already two-column. Improve spacing to feel more airy (`gap-4 md:gap-5`, larger icons `w-9 h-9`)

**5. Trust microcopy above CTA (new, after includes section)**
- Add three inline trust signals:
  - ✔ One-time activation
  - ✔ Secure payments via UPI & cards
  - ✔ Setup takes less than 2 minutes

**6. CTA button text (line 754)**
- Change `'Activate Account'` back to `'Activate My Fleet'`
- Make button slightly larger (`h-14`)

**7. Stripe sidebar summary for Steps 2-4 (lines 442-681)**
- On desktop (md+), add a sticky right-side summary panel showing selected plan details when on steps 2, 3, 4
- Layout: main content on left, summary card on right using flex/grid
- Summary shows: plan name, vehicles activated, total price

**8. Progress bar already exists — keep as-is (lines 119-153)**
- Already implemented with checkmarks. No changes needed.

### Layout Changes for Steps 2-4

Wrap step content area (line 719) in a responsive grid:
- Mobile: single column (summary hidden or shown inline above CTA)
- Desktop: `grid grid-cols-[1fr_320px]` with sticky summary sidebar on right

### Summary

| Area | Change |
|------|--------|
| Header | Add trust indicator line |
| Plan cards | Business Pro visually dominant, badge text updated, Starter micro-text, value highlight |
| Selection feedback | Dynamic summary box after plan cards |
| Includes section | More airy spacing |
| Trust microcopy | 3 trust signals above CTA area |
| CTA button | "Activate My Fleet", larger size |
| Steps 2-4 sidebar | Sticky order summary panel on desktop |

All changes in `src/pages/Checkout.tsx` only.

