

## Plan: Update Hero Subtitle and Preserve SEO Content in About Page

### Changes

**1. `src/components/HeroSection.tsx` — Update subtitle text (line 27-29)**
- Replace the current paragraph ("PayTap is India's fintech infrastructure layer for mobility, fleets, and business payments...") with the new subtitle:
  - "PayTap lets your vehicles make payments — while you control every transaction from one dashboard."

**2. `src/pages/About.tsx` — Integrate the original hero description into "Our Story" section (lines 180-190)**
- Add the original hero text ("PayTap is India's fintech infrastructure layer for mobility, fleets, and business payments — giving you real-time control, visibility, and automation over how money flows across vehicles, teams, and daily operations.") as a new paragraph in the "Our Story" section, preserving the SEO-rich keywords in an appropriate contextual location.

| File | Change |
|------|--------|
| `src/components/HeroSection.tsx` | Replace subtitle paragraph with new copy |
| `src/pages/About.tsx` | Add original hero description to "Our Story" section |

