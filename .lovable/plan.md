

## Plan: Premium Apple-Style Checkout Redesign

### Overview
Complete visual overhaul of the checkout page with three functional additions: conditional company name logic, delivery address section, and a redesigned plan selector.

### 1. Plan Selector — Interactive List View
Replace the 4-box grid with a sleek vertical list where each row shows plan name, vehicle count, per-vehicle price, and total. Clicking a row expands/highlights it with a smooth animation. This feels more like Apple's product configuration (think MacBook spec picker).

```text
┌─────────────────────────────────────────────────┐
│  ○  Starter     1 vehicle    ₹999/vehicle  ₹999 │
├─────────────────────────────────────────────────┤
│  ○  Business    2 vehicles   ₹800/vehicle ₹1600 │
├─────────────────────────────────────────────────┤
│  ●  Biz Pro ⭐  5 vehicles   ₹750/vehicle ₹3749 │  ← selected (glow)
├─────────────────────────────────────────────────┤
│  ○  Corporate  10 vehicles   ₹700/vehicle ₹6999 │
└─────────────────────────────────────────────────┘
```

Each row: subtle glass-morphism background, selected row gets `ring-2 ring-accent` + navy gradient highlight + scale. Radio-button style selection.

### 2. Visual Overhaul — Premium Energy
- **Hero section**: Dark navy gradient header (`#021a42` → transparent) with the heading in white, creating a dramatic entrance
- **Background**: Subtle warm gradient (`#FAFAFA` → `#F5F5F7`) instead of flat white
- **Plan selector area**: Floating card with soft blur backdrop + shadow depth
- **Form section**: Contained in a frosted-glass card with subtle border glow
- **Accent pops**: Pink/coral (`#f6245b`) used for selected states, CTA, and micro-highlights
- **Trust badges**: Styled as premium pills with icons, arranged horizontally with subtle shimmer
- **Summary panel**: Navy gradient background with white text for contrast and premium feel
- **Micro-animations**: Staggered fade-ins, hover lifts, selection ripples via framer-motion

### 3. Form Logic Changes

**Company Name behavior:**
- When GST is selected → Company Name field becomes **required** (label changes to "Company Name *")
- When PAN is selected → Company Name auto-fills with the Full Name value, field becomes read-only with a muted style and helper text "Using your name as billing name"

**Delivery Address section (collapsible):**
- Added below Company Name as an expandable section: "Add Delivery Address (optional)"
- Fields: Address Line, City, State (dropdown from existing `indianStatesAndCities.ts`), Pincode
- Collapsed by default. If user opens it, data is saved to the order (overrides `details_pending`)
- If left collapsed, order still saves with `details_pending: true`

### 4. Form Schema Update
- `companyName`: conditionally required when `taxIdType === 'gst'`
- Add optional fields: `address`, `city`, `state`, `pincode`
- Validation: pincode 6-digit regex

### Files Changed
**`src/pages/Checkout.tsx`** — Complete visual redesign + form logic additions (company name conditional behavior, delivery address section, list-style plan selector, premium styling)

