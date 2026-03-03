

## Paytap Checkout Redesign -- Premium Apple-Style Activation Flow

### Overview
Complete rewrite of `src/pages/Checkout.tsx` from a single-card cramped layout to a premium, spacious, Apple-style activation page with 4 clear plans, progressive disclosure form, and confidence-building UX.

### Current State
- Single `max-w-lg` column with 2 account types (Personal/Business) and 2 product types (Sticker/Card)
- Countdown timer, fake value stacking (₹31,998 strikethrough), discount language
- Form shows all fields regardless of plan type
- No GST calculation, no plan-based pricing tiers

### New Structure

```text
DESKTOP (max-w-5xl, two-column from order summary onward):
+----------------------------------------------------------+
|  [← Home]                          [🔒 Secure Checkout]  |
+----------------------------------------------------------+
|              Activate PayTap for Your Vehicles            |
|   One-time platform activation. Includes NFC hardware...  |
+----------------------------------------------------------+
|  [Starter]  [Biz Basic]  [⭐Biz Pro]  [Corporate]       |
|   ₹999       ₹1,998       ₹4,998       ₹9,999           |
+----------------------------------------------------------+
|  ✓ What You're Activating Today (bullet list)             |
+----------------------------------------------------------+
|  LEFT: Form (progressive)    |  RIGHT: Order Summary     |
|  Personal/Address fields     |  Plan + GST + Total       |
|  + Business fields if needed |  Trust layer              |
|  [====== CTA Button ======]  |                           |
+----------------------------------------------------------+
```

```text
MOBILE (single column, sticky bottom CTA):
Same order, stacked vertically.
Order summary as expandable drawer at bottom.
```

### File: `src/pages/Checkout.tsx` -- Full Rewrite

#### 1. Remove
- Countdown timer (timeLeft, formatTime, Timer import)
- Product type selection (sticker vs card) -- plans now define what you get
- Fake value stacking (₹10,000 values, strikethrough ₹31,998)
- "X" icons showing what's NOT included
- BOGO / discount language
- Heavy red validation warnings

#### 2. Plan Data Structure
```typescript
type PlanType = 'starter' | 'business_basic' | 'business_pro' | 'corporate';

const PLANS = {
  starter: {
    name: 'Starter', subtitle: 'For individuals (1–5 vehicles)',
    price: 999, tags: 1, amcYear2: 1200,
    features: ['1 NFC Payment Tag', 'Basic Dashboard', 'Tag Control', 'Transaction View'],
    recommended: false, isBusinessPlan: false
  },
  business_basic: {
    name: 'Business Basic', subtitle: 'For growing fleets (1–10 vehicles)',
    price: 1998, tags: 2, amcYear2: 1200,
    features: ['2 NFC Payment Tags', 'Full Dashboard', 'MyFleet AI Access', 'Smart Reports'],
    recommended: false, isBusinessPlan: true
  },
  business_pro: {
    name: 'Business Pro', subtitle: 'For scaling fleets (1–25 vehicles)',
    price: 4998, tags: 5, amcYear2: 6000,
    features: ['5 NFC Payment Tags', 'MyFleet AI', 'ExpensePro', 'Advanced Reporting', 'Priority Support'],
    recommended: true, isBusinessPlan: true
  },
  corporate: {
    name: 'Corporate', subtitle: 'For large operations (1–100+ vehicles)',
    price: 9999, tags: 10, amcYear2: 12000,
    features: ['10 NFC Tags', 'MyFleet AI', 'ExpensePro', 'Multi-User Access', 'Dedicated Support'],
    recommended: false, isBusinessPlan: true
  }
};
```

#### 3. Payment Links
Need new PayU links for the 4 price points. For now, map existing links where possible and use the ₹999 link as fallback. The `PAYU_PAYMENT_LINKS` object will be updated to key by plan type.

#### 4. Order Summary (right column on desktop)
- Selected Plan name
- Activation Fee: ₹X,XXX
- GST (18%): ₹XXX
- Shipping: Free
- **Total Payable Today: ₹X,XXX** (bold, large, `#021a42`)
- Small text: "Annual AMC applicable from Year 2 as per selected plan."

#### 5. "What You're Activating Today" Section
Simple checkmark list (no values/prices):
- NFC Hardware
- Secure Payment Control
- Real-Time Transaction Visibility
- Centralised Dashboard Access
- 3–5 Day Delivery

#### 6. Form -- Progressive Disclosure
- **All plans**: Name, Phone, Email, Address, State, City, PIN
- **Starter only**: PAN field
- **Business/Corporate**: Company Name, GST (or PAN)
- Input styling: `rounded-lg border border-[#021a42]/15 focus:border-[#021a42]` -- no heavy red errors, subtle inline validation

#### 7. CTA Button
- Full width, `bg-[#021a42]`, white text, `rounded-[10px]`, `h-14`
- Starter: "Activate My Account"
- Business plans: "Activate & Ship My Tags"
- No price in button text

#### 8. Trust Layer (above CTA)
- Lock icon + "Secure Payment · Processed via PayU · No recurring charges without notification"
- Small, subtle grey

#### 9. Mobile
- Plans stack vertically (scrollable)
- Sticky bottom mini-bar with plan name + total + CTA button
- Order summary expandable via sheet/drawer

#### 10. Database
- `account_type` column will store the plan type string ('starter', 'business_basic', etc.)
- `quantity` maps to plan's tag count
- No schema changes needed -- existing columns accommodate this

#### 11. Keep Intact
- Payment confirmation dialog (post-gateway)
- Supabase order insert logic (adapt field mappings)
- gtag/fbq tracking events
- Form validation via zod + react-hook-form
- Navigation to home on decline

### Colors (Strict)
- Background: `#ffffff` (pure white, not bg-muted)
- Primary text: `#021a42`
- Muted text: `#021a42` at 50% opacity
- Accent `#f6245b`: only on "Most Popular" badge and hover micro-states
- Card borders: `#021a42` at 10-15% opacity
- Selected card: `border-[#021a42]` solid 2px
- No gradients, no heavy shadows

### No new dependencies. Single file change.

