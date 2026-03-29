

## Plan: Fix Checkout Hero Typography & Alignment

**File:** `src/pages/Checkout.tsx`

### Changes (lines 336-353)

**1. Constrain width & center the text block**
- Add `max-w-3xl mx-auto` to the wrapper div (line 336)

**2. Force clean 2-line headline with explicit line breaks**
```
"You're Losing Money on Every Vehicle"
<br />
"And You Don't Even Know It"
```
- Second line slightly smaller or lighter for hierarchy

**3. Improve headline typography (line 341)**
- `font-semibold` instead of `font-bold`
- `leading-[1.12]` for tighter line height
- `tracking-[-0.02em]` for slight letter-spacing tightening
- Sizes: `text-2xl sm:text-3xl md:text-[42px]`

**4. Fix subheading structure (lines 345-352)**
- Break into two lines with `<br className="hidden sm:block" />`
- Line 1: `"PayTap tracks and controls every rupee your drivers spend"`
- Line 2: `"Fuel, tolls, parking — everything in one place."`
- `mt-5` spacing (up from `mt-3`)
- `text-sm md:text-base` (slightly smaller)
- `leading-relaxed`
- `max-w-lg mx-auto`

**5. Increase top spacing**
- Change `mt-6 md:mt-10` to `mt-8 md:mt-14` on the wrapper

### Mobile considerations
- Headline stays 2 lines at `text-2xl` on mobile
- Subheading wraps naturally at `max-w-lg`
- No 4-5 line headline overflow

