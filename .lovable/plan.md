

## Plan: Elevate Hero + Trust Sections to Fintech-Grade Quality

### Files to modify
- `src/components/HeroSection.tsx`
- `src/components/ComplianceBadgeBar.tsx`
- `src/i18n/locales/en.json`

---

### 1. HeroSection.tsx — Text & CTA Updates

**Subtitle (line 27):** Change "from one dashboard" to "from a single dashboard."

**CTA button (lines 32-50):** Increase size ~10% — change `px-9 py-[18px]` to `px-10 py-5`, and `text-base md:text-lg` to `text-lg md:text-xl`. Enhance shadow.

**Trust line (line 54-56):** Change to "Works for personal vehicles, businesses, and fleet operators across India." and keep the existing "Built for fleets..." line below it as secondary text.

### 2. HeroSection.tsx — Hero Visual Enhancement (Option A)

Replace the static card-only right column (lines 59-127) with a **visual flow composition**:

- Keep the existing prepaid card as the central element but slightly smaller
- Add three floating UI elements around/below the card using Framer Motion fade-in animations:
  1. **Top-left:** Small pill/chip showing a vehicle icon + "NFC Tap Detected" with a green pulse dot
  2. **Bottom-left:** Mini dashboard card showing "₹12,450 spent today" with a small bar chart icon
  3. **Bottom-right:** Transaction notification chip: "Fuel ₹2,500 • KA-01-AB-1234"

These elements use subtle `animate-float` with staggered delays to create a dynamic, product-driven feel. They communicate the Vehicle → Payment → Dashboard story without complex animation.

### 3. HeroSection.tsx — Stats Section (lines 130-146)

- Increase top spacing: `mt-12 lg:mt-20` → `mt-16 lg:mt-24`
- Update stat labels directly (remove i18n for these since they're brand-specific):
  - "RuPay Acceptance Points Across India"
  - "Fleet & Business Operators Supported"  
  - "Platform Reliability"

### 4. ComplianceBadgeBar.tsx — Label & Text Updates

Update badge labels:
- "NPCI Rails" → "NPCI Payment Rails"
- "PPI Licensed-Partnered" → "Bank-Partnered PPI License"

Update disclaimer: capitalize "PayTap" consistently (currently "Paytap" in two places).

### 5. en.json — Update stat translation keys

Update the three hero stat label values to match the new wording.

---

### Summary

| File | Changes |
|------|---------|
| `HeroSection.tsx` | Subtitle tweak, larger CTA, floating UI elements around card, updated stats spacing/labels |
| `ComplianceBadgeBar.tsx` | Updated badge labels and disclaimer capitalization |
| `en.json` | Updated stat label translations |

