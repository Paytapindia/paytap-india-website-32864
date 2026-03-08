

## Fix: Sync How It Works Pricing with Checkout

The How It Works page has outdated prices and subtitles that don't match the Checkout page.

### Current Mismatches

```text
Plan            How It Works    Checkout (correct)
─────────────── ─────────────── ──────────────────
Starter         ₹999            ₹999           ✓
Business Basic  ₹1,998          ₹1,600         ✗
Business Pro    ₹4,998          ₹3,749         ✗
Corporate       ₹9,999          ₹6,999         ✗
```

Subtitles also differ — How It Works shows vehicle ranges ("1–25 vehicles") while Checkout uses specific tag counts.

### Changes

**File: `src/pages/HowItWorks.tsx` (lines 383–411)**

Update the `plans` array to match Checkout pricing and descriptions:

| Plan | Price | Subtitle | Tags |
|------|-------|----------|------|
| Starter | ₹999 | 1 vehicle | 1 Prepaid Tag |
| Business Basic | ₹1,600 | 2 vehicles | 2 Prepaid Tags |
| Business Pro | ₹3,749 | 5 vehicles | 5 Prepaid Tags |
| Corporate | ₹6,999 | 10 vehicles | 10 Prepaid Tags |

Features will also be updated to reflect the actual Checkout perks (driver cards for Pro/Corporate, premium features like Dedicated Support, Myfleet AI, ExpensePro only for Business Pro and Corporate).

No other files changed.

