

## Plan: High-Converting Checkout Page Rewrite

### Overview
Rewrite the checkout page copy and structure to follow a sales-page-meets-checkout pattern. Focus on emotional triggers, ROI clarity, reduced decision fatigue, and a frictionless CTA.

### Changes (all in `src/pages/Checkout.tsx`)

**1. Hero Headline & Subtitle (lines 337-352)**
- Headline: `"You're Losing Money on Every Vehicle — You Just Can't See It"`
- Subtitle: `"PayTap tracks and controls every rupee your drivers spend — fuel, tolls, parking, everything."`

**2. Plan Selector Section (lines 366-436)**
- Change section header from `"Get Lifetime Access"` to `"Choose Your Fleet Size"`
- Add `"⭐ Most chosen by fleet owners"` label on Business Pro (already has POPULAR, enhance the label text)
- Visually de-emphasize Starter and Business Basic (reduce opacity to `opacity-70` when not selected)
- Add micro-copy under each price: `"Less than ₹X/day per vehicle"` (calculated per plan)
- Add ROI line below the plan list: `"Most fleet owners recover this cost within 7–10 days from reduced leakage"`

**3. Summary Box — Outcome-Driven Bullets (lines 438-482)**
- Replace feature-list bullets with outcome-driven copy:
  - `"Track every rupee spent per vehicle"` (replaces Tags line)
  - `"Set strict spending limits for drivers"` (replaces Driver Card line)
  - `"Eliminate fuel and cash leakage"` (replaces Myfleet AI line)
  - `"No more calling drivers or checking manually"` (replaces ExpensePro line)
  - `"Instant account activation — go live today"` (replaces Instant Activation line)
- Keep the total price and delivery time at bottom

**4. CTA Button & Surrounding Copy (lines 692-740)**
- Button text: `"Start Controlling My Fleet →"` (replaces `"Pay ₹X & Go Live →"`)
- Subtext below CTA: `"Takes 30 seconds · No risk · Instant activation"`
- Add urgency line: `"⏳ Price increasing soon"` (small amber text below subtext)
- Add risk reversal: `"7-day no-questions-asked refund"` as a trust badge
- Update trust signals:
  - `"Trusted by 150+ fleet owners"`
  - `"Avg savings: ₹3,000+ per vehicle/month"`
  - Keep `"Secure payments"` and `"GST invoice provided"`

**5. Quick Details Header (line 499)**
- Keep collapsible behavior unchanged
- Update subtitle to: `"Takes 30 seconds — we'll set up your account and ship your tags"`

### No structural/layout changes
All changes are copy-only within existing components. No new components, no layout shifts, no database changes.

