

## Plan: Fix Hero Section Mobile Text Alignment & Readability

**File:** `src/components/HeroSection.tsx`

### Changes

**1. Heading (line 23)** — Tighten mobile font size, constrain width, improve line height:
- Change `text-3xl` → `text-[26px]` for tighter mobile sizing
- Add `max-w-[300px] sm:max-w-[400px]` alongside existing `max-w-[600px]` breakpoints to prevent awkward line breaks on small screens
- Adjust leading from `leading-[1.06]` → `leading-[1.12] sm:leading-[1.08]` for better mobile spacing

**2. Subtext (line 27)** — Reduce width and improve readability on mobile:
- Change `max-w-[520px]` → `max-w-[280px] sm:max-w-[420px] md:max-w-[520px]`
- Adjust line height: `leading-[1.8]` → `leading-[1.6]`

**3. Container padding (line 22)** — Add horizontal padding for mobile breathing room:
- Add `px-2 sm:px-0` to the text column wrapper

**4. Section padding (line 14)** — Ensure consistent side padding:
- Change `px-6 md:px-12` → `px-8 md:px-12` for slightly more mobile side margin

These are class-level tweaks only — no structural changes.

