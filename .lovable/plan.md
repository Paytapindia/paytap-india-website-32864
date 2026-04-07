

## Plan: Redesign Checkout Page to Match Reference Layout

This is a full redesign of the checkout page to match the uploaded HTML reference — a clean, professional card-based layout with a progress bar, split form sections, and a detailed order summary sidebar.

### Overview of Changes

The current checkout has a navy hero header, two-column plan+summary layout, and a collapsible form below. The new design replaces all of this with:

- **Top bar** with PayTap logo and "Secure Checkout" badge
- **Progress bar** (3 steps: Select Plan → Your Details → Payment)
- **Two-column layout**: Left = stacked form cards, Right = sticky order summary
- **Left column**: 3 separate cards — Plan Selection, Your Details, Delivery Address
- **Right column**: Order Summary with line items, total, included features, cashback note, AMC reminder, CTA button, and trust badges

### File: `src/pages/Checkout.tsx`

**Complete rewrite of the render section (lines 318-820)**

#### 1. Top Bar (replaces navy hero)
- Pink-accented bottom border bar with PayTap logo left, "Secure Checkout · RBI-Aligned System" right
- Remove the large heading/subheading hero section

#### 2. Progress Indicator
- 3-step horizontal progress: "Select Plan" (active), "Your Details" (active), "Payment"
- Numbered dots with connecting lines, green for completed steps

#### 3. Left Column — Card 1: Choose Your Plan
- Card with header "Choose Your Plan" + step badge "1"
- Plan rows: radio circle, plan name (with driver card badge for Pro/Corporate, "Most Popular" badge for Pro), vehicle count + per-vehicle price, total price + AMC renewal note ("+ ₹249/yr from Yr 2")
- AMC callout box below plans (navy gradient): "Annual Platform Fee (AMC) — Included Free Year 1"

#### 4. Left Column — Card 2: Your Details
- Card with header "Your Details" + step badge "2"
- Fields: Mobile Number, Full Name + Email (side by side), Tax Identity (PAN/GST toggle), Fleet/Business Name
- Remove the collapsible accordion — form is always visible

#### 5. Left Column — Card 3: Delivery Address
- Card with header "Delivery Address" + step badge "3"
- Green delivery note: "Your NFC Vehicle Tag(s) will be shipped within 3–5 business days"
- Fields: Pincode, State + City (side by side), Address Line

#### 6. Right Column — Order Summary (replaces blue summary box)
- Sticky sidebar card with "Order Summary" header
- Line items: Plan name + tag count, Platform AMC (FREE), GST (Incl.), Delivery (FREE)
- Navy total box with "Total Today" + price
- "What's Included" checklist (tags, dashboard, analytics, interchange, support)
- Yellow cashback note: "₹300 wallet credit loaded on first transaction"
- Blue AMC reminder: Platform fee info for Year 2
- Pink CTA button: "Pay ₹X & Activate →"
- Trust strip badges: RBI-Aligned, GST Invoice, Ships in 3-5 days, 24/7 Support

#### 7. Styling
- Replace dark navy/gradient theme with clean white cards on light gray background (`bg-[#f4f6fa]`)
- Cards: white bg, rounded-2xl, subtle border + shadow
- Navy (`#021a42`) for text and accents, pink (`#f6245b`) for CTA and highlights
- Use DM Sans / system font for body, keep Syne-like bold headings via existing font stack

#### 8. Preserve existing logic
- All form validation, PayU payment flow, phone lookup, Supabase order insertion, confirmation dialog — unchanged
- Plan data, pricing, PayU links — unchanged
- Mobile responsive: single column on small screens, summary moves to top on mobile

### Technical Details

- Single file change: `src/pages/Checkout.tsx`
- May add a few new Lucide icons: `CreditCard`, `Info`, `Phone`
- Remove unused imports: `motion` animations can be simplified
- Keep all existing state, hooks, form handling, and submit logic intact
- The form is no longer collapsible — always open, so remove `formOpen`/`showFormPrompt` state and accordion logic

