

## Hero Section Premium Revamp

### What Changes

**Strip to essentials.** Remove all floating widgets (dashboard mini UI, balance widget, NFC icon, expense dashboard). Keep only the Paytap card as the single dominant visual on the right.

### HeroSection.tsx — Full Rewrite

**Left Column (Text Stack)**
- Headline: same text, but bumped to `lg:text-7xl`, tighter tracking (`-0.035em`), `max-w-[600px]`, more line height
- Subtext: color changed to `text-[#334155]`, `max-w-[520px]`, increased line height (`leading-[1.8]`), 36px gap before CTA
- Remove all 4 feature pills entirely
- CTA button: `bg-[#f6245b]` (crimson), white text, `px-9 py-[18px] rounded-[14px] font-semibold`, hover glow `box-shadow: 0 10px 30px rgba(246,36,91,0.25)`, hover darken to `#e01e52`
- Trust line below CTA: replace with "Built for fleets, enterprises, and mobility operators across India." — muted, small, single line

**Right Column (Card Only)**
- Remove: dashboard mini UI (lines 96–136), balance widget (lines 210–230), NFC icon + ripple (lines 232–251), expense dashboard (lines 253–298)
- Keep only the Paytap card, scaled up ~15% (`md:w-[390px] md:h-[240px]`), centered in the column
- Add perspective 3D tilt: `perspective(1200px) rotateY(-3deg) rotateX(2deg)`
- Premium shadow: `box-shadow: 0 20px 60px rgba(2,26,66,0.12)`
- Slow float animation: `translateY(0) → translateY(-8px)`, 7s ease-in-out infinite
- Remove parallax mouse tracking (simplify)

**Background**
- Replace flat white with subtle radial gradient: `radial-gradient(ellipse at 60% 40%, #ffffff 0%, #f4f6f9 100%)`

**Spacing**
- Top padding: `pt-[140px]` on desktop
- Stats bar below: kept as-is (already clean)

**Stats section** — unchanged, already minimal

### Navbar.tsx — Minor Polish

- Nav link font weight: already `font-medium` (good)
- Add subtle bottom border: `border-b border-white/5` always (not just on scroll)
- Platform Login button: reduce padding slightly, use `text-xs` instead of `text-sm`, lower opacity hover

### Summary

| File | Change |
|------|--------|
| `src/components/HeroSection.tsx` | Remove 4 floating widgets, remove feature pills, remove parallax/NFC logic. Keep card only (scaled up, 3D tilt, premium shadow, slow float). CTA → crimson with glow. Background → subtle gradient. Typography tightened. |
| `src/components/Navbar.tsx` | Add permanent subtle bottom border, slightly reduce login button size |

No new files, no new dependencies.

