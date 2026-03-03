

## Redesign: Mobile Control Center + Our Platform Ecosystem

### MobileAppSection.tsx — Full Rewrite

**Layout**: Switch from centered single-column to two-column grid on desktop. Left column: text + store buttons. Right column: programmatic phone mockup with navy UI inside.

**Left Column**:
- Heading: `text-2xl md:text-4xl font-bold text-[#021a42]` with tighter tracking
- Subtext: `text-[#334155] max-w-[520px] leading-[1.8]`
- "Launching Soon" note as subtle muted text below heading (replaces floating badge)
- Store buttons: custom branded — `bg-[#021a42] text-white rounded-[14px] px-6 py-4`, iOS greyed out with `opacity-60 cursor-not-allowed`, no floating "Coming Soon" badge

**Right Column — Programmatic Phone Mockup**:
- A div styled as a phone frame (rounded-[40px], navy border, white bg, aspect ratio ~9:19)
- Inside: a mini navy UI showing balance widget (₹24,500), a "Tag Control" row, and an "Approve" button — all static, built with divs
- Phone has soft shadow (`box-shadow: 0 20px 60px rgba(2,26,66,0.12)`) and slow float animation (reuse `hero-float` keyframes, 6s)

**Background**: `bg-gradient-to-b from-white to-[#f4f6f9]` — subtle separation from hero

**Spacing**: `py-20 md:py-28` — generous vertical padding

---

### OurProductsSection.tsx — Elevated

**Background**: `bg-[#f8fafc]` — subtle tinted background

**Header**: 
- Heading: `text-3xl md:text-5xl font-bold text-[#021a42]` with tight tracking
- Spacing below header: `mb-16 md:mb-24` (80–100px)

**Cards**:
- `bg-white border border-[#021a42]/8 rounded-2xl p-6 md:p-12 shadow-sm`
- Hover: `shadow-lg` elevation, `border-[#021a42]/15`, `translate-y-[-2px]` — subtle, no aggressive animation
- Text left-aligned (not centered)

**Icons**: `w-14 h-14 md:w-16 md:h-16 bg-[#021a42] rounded-2xl` — solid navy, white icon, slight shadow

**Product Names**: `text-xl md:text-3xl font-bold text-[#021a42]` — larger, bolder, feel like product pillars

**Descriptions**: More spacing below title (`mb-4 md:mb-6`), `text-[#334155]`

**CTA**: Replace "Learn more ↗" with "Explore MyFleet AI →" / "Explore ExpensePro →" — `text-sm md:text-base font-semibold text-[#021a42]`

**Grid gap**: `gap-6 md:gap-10` — consistent spacing

---

### Files Changed

| File | Change |
|------|--------|
| `src/components/MobileAppSection.tsx` | Full rewrite: two-column layout, phone mockup, premium store buttons, no floating badges |
| `src/components/OurProductsSection.tsx` | Elevated cards, left-aligned, larger product names, stronger icons, directional CTAs, tinted background |

No new dependencies. Reuses existing `hero-float` animation from `index.css`.

