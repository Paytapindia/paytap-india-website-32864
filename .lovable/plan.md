

## Plan: Apple-Style Single-Screen Instant Checkout

Replace the current 4-step wizard with a single-screen, frictionless activation flow. The user selects a plan, enters 4-5 fields, and pays — all on one page.

### Architecture

Complete rewrite of `src/pages/Checkout.tsx`. All existing logic (plan data, PayU links, order insertion, payment confirmation dialog, returning customer lookup, invoice generation) is preserved but reorganized into a single-screen layout.

### Layout (Single Screen)

```text
┌─────────────────────────────────────────────────┐
│  🔒 Secure Checkout (top bar)                   │
├─────────────────────────────────────────────────┤
│                                                 │
│  "Activate Paytap For Your Fleet"               │
│                                                 │
│  ┌────┐ ┌────┐ ┌─────────┐ ┌────┐              │
│  │Star│ │Biz │ │ Biz Pro │ │Corp│  ← Plan cards │
│  │ ter│ │Basi│ │⭐recomm │ │ ora│    horizontal  │
│  └────┘ └────┘ └─────────┘ └────┘              │
│                                                 │
│  ┌──────────────────────┬──────────────────┐    │
│  │  Quick Details       │  Your Setup      │    │
│  │  (max-w-480)         │  (sticky panel)  │    │
│  │                      │                  │    │
│  │  Full Name           │  Business Pro    │    │
│  │  Mobile Number       │  5 Paytap Tags   │    │
│  │  Email               │  1 Driver Card   │    │
│  │  GST/PAN toggle      │                  │    │
│  │  Company (optional)  │  Delivery: 3-5d  │    │
│  │                      │                  │    │
│  │  ┌──────────────┐    │  Total: ₹3,749   │    │
│  │  │Pay ₹3,749 →  │    │  ✔ GST included  │    │
│  │  └──────────────┘    │  ✔ No hidden fee  │    │
│  │  🔒 Secure • 30 sec  │                  │    │
│  │  🏦 RBI-aligned      │                  │    │
│  └──────────────────────┴──────────────────┘    │
└─────────────────────────────────────────────────┘
```

Mobile: Summary panel moves below the CTA button.

### Design System (Strict Brand Compliance)

- Background: `#FFFFFF`
- Input fields: `#F5F5F7` background, no borders, `rounded-2xl`, soft focus glow (`ring-primary/20`)
- Text: `#111111` (headings), muted for secondary
- Accent CTA: brand pink/coral (`#f6245b`) — uses existing `bg-accent`
- Plan cards: soft shadow, `rounded-2xl`, no heavy borders. Selected = `border-primary` + scale
- Typography: Large bold headings, minimal subtext, clear hierarchy
- Spacing: generous padding (80px sections, 16-24px elements)

### Interactions & Micro-animations

- Plan selection: smooth scale + highlight with `framer-motion`
- Form section: fade-in + slide-up after plan selection (always visible, but draws attention)
- CTA button: subtle hover lift + shadow expansion
- Loading state on pay: "Securing your checkout..." overlay (1-2s)
- No page transitions, no step progress bars

### Form Fields (Minimal)

1. Full Name — text input
2. Mobile Number — 10-digit validation
3. Email — email validation
4. GST / PAN toggle — if GST selected, show GST field; else PAN field. Inline regex validation
5. Company Name — optional, shown for business plans

Microcopy above form: "We'll use this to activate your Paytap account and generate your invoice"

### Returning Customer Flow (Preserved)

After phone number blur/entry, auto-lookup via `lookup-customer` edge function. If found:
- Auto-fill email, GST/PAN, company name
- Show "Welcome back" toast
- User can immediately click Pay

### Payment Flow (Preserved)

1. Validate all fields inline (no reload)
2. Show loading overlay: "Securing your checkout..."
3. Insert order to database (existing logic)
4. Open PayU payment link in new tab
5. Show payment confirmation dialog (existing)

### Address Handling

Address, city, state, pincode are NOT collected pre-payment (deferred to post-payment or admin follow-up). The order is inserted with `details_pending: true` for shipping info. This dramatically reduces friction.

### Sticky Summary Panel (Desktop)

Right-side sticky panel showing:
- Selected plan name
- X Paytap Tags + driver cards
- Delivery: 3-5 days
- Total with dynamic amount
- "GST included" and "No hidden charges" badges

### Files Changed

**`src/pages/Checkout.tsx`** — Complete rewrite to single-screen layout while preserving all business logic (plan data, PayU links, order insertion, invoice generation, returning customer lookup, payment confirmation dialog).

### What's Removed
- 4-step progress bar
- Step navigation (next/back buttons)
- Separate pages for details
- Address/delivery fields (deferred post-payment)
- Urgency countdown timer
- Multi-step form validation

### What's Preserved
- All plan data and pricing
- PayU payment links
- Order database insertion
- Payment confirmation dialog + invoice download
- Returning customer auto-fill
- Analytics events (gtag, fbq)
- SEO meta tags

