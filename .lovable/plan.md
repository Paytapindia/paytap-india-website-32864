

## Checkout Revamp — 4-Step Wizard Flow

### Overview

Convert the current single-page checkout into a 4-step wizard with progress indicator, premium styling, and product type selection integrated into Step 1. All existing functionality (plans, validation, PayU payment links, invoice generation, order creation) is preserved — only the UX structure and visual design change.

### Step Flow

```text
Step 1: Plan & Product    Step 2: Basic Details    Step 3: Business & Delivery    Step 4: Review & Pay
   ●━━━━━━━━━━━━━━━━━━━━━━━━○━━━━━━━━━━━━━━━━━━━━━━━━○━━━━━━━━━━━━━━━━━━━━━━━━○
```

### What Each Step Contains

**Step 1 — Select Your Activation Plan**
- New headline: "Turn Your Vehicles Into Intelligent Payment Machines."
- Subheadline: "One-time activation. NFC hardware included. Centralised dashboard access in minutes."
- Plan cards (4): Name, vehicle range, price, tag count, "One-Time Activation" label. Selected card gets crimson (#f6245b) border + soft glow. "Most Popular" badge on Business Pro.
- Product type selector (NFC Tag vs Prepaid Card) — same toggle, moved below plan cards
- "What You're Activating Today" dynamic summary (short icon list, not long sentences)
- "Next" button to proceed

**Step 2 — Basic Details**
- Light grey background (#f9fafb)
- Only 3 fields: Full Name, Phone, Email
- Rounded-12px inputs with soft shadow, crimson focus border
- Back / Next navigation

**Step 3 — Business & Delivery**
- GST toggle: "Do you have GST? Yes / No" — conditionally shows GST or PAN field (not both)
- Company Name (for business plans)
- Delivery address group: Address, State, City, PIN
- Back / Next navigation

**Step 4 — Review & Pay**
- Full order summary: plan name, product type, price breakdown, GST, total
- Customer details recap (name, phone, email, address)
- Trust badges: Secure Checkout, 3–5 Day Delivery, Dedicated Onboarding Support
- CTA button: "Activate & Pay ₹X,XXX" in crimson (#f6245b) with hover lift animation
- "GST Invoice Provided" note

### Technical Approach

**Single file change**: `src/pages/Checkout.tsx` — full rewrite of the JSX structure.

- Add `currentStep` state (1–4) with Next/Back handlers
- Each step validates its own fields before allowing "Next"
- Progress bar component at top with 4 labeled dots
- Plan cards get crimson selected border, hover scale(1.02), tag count display
- GST toggle state controls which identity field renders
- Mobile: single column, sticky bottom "Next" / "Activate & Pay" button
- Form data persists across steps (already managed by react-hook-form)
- All existing logic (order creation, PayU redirect, invoice, confirmation dialog) stays in Step 4's submit handler

### Visual Changes

| Element | Current | New |
|---------|---------|-----|
| Selected plan border | Navy | Crimson (#f6245b) + soft shadow |
| CTA button | Navy bg | Crimson bg, rounded-[14px], large padding |
| Input focus | Navy border | Crimson border, rounded-xl, soft shadow |
| Feature list | Full sentences in grid | Short labels with icons |
| GST/PAN fields | Both shown | Toggle — one at a time |
| Layout | Single scroll | 4-step wizard with progress bar |
| Headline | "Activate Paytap for Your Vehicles" | "Turn Your Vehicles Into Intelligent Payment Machines." |

### Mobile Optimizations

- Sticky bottom bar shows "Next" or "Activate & Pay ₹X" depending on step
- Plan cards in 2-column grid (same as now)
- Step transitions use framer-motion fade
- All inputs large and thumb-friendly

### What Stays the Same

- Plan data, pricing, PayU links — unchanged
- Order creation logic, Supabase insert — unchanged  
- Invoice generation — unchanged
- Confirmation dialog — unchanged
- Form validation schema — unchanged (just split across steps)
- Product type selector (NFC vs Card) — preserved, moved to Step 1

