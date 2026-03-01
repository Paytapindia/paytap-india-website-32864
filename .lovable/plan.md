

## Premium Hero Section Redesign -- Apple x Stripe x Brex Level

### Overview
Complete rewrite of `src/components/HeroSection.tsx` to deliver a premium fintech infrastructure hero with white background, luxurious spacing, floating visual composition with subtle animations, and an NFC hover ripple micro-interaction.

### Layout Structure

```text
+---------------------------------------------------------------+
|                      WHITE BACKGROUND                         |
|                                                               |
|   LEFT COLUMN                    RIGHT COLUMN                 |
|   +--------------------------+   +-------------------------+  |
|   |                          |   |   Floating Composition  |  |
|   |  HEADLINE (tight track)  |   |                         |  |
|   |  Control How Money Moves |   |   [Dashboard UI]        |  |
|   |  Across Your Operations  |   |       [PayTap Card]     |  |
|   |                          |   |   [Balance Widget]      |  |
|   |  SUBTITLE (longer copy)  |   |      [NFC Icon]         |  |
|   |                          |   |                         |  |
|   |  [Pills Row]             |   |   Slow float animation  |  |
|   |                          |   |   Mouse parallax shift  |  |
|   |  [Activate Paytap ->]    |   +-------------------------+  |
|   |                          |                                |
|   |  Trust line (small)      |                                |
|   +--------------------------+                                |
|                                                               |
|            [Stats: 8L+  |  50K+  |  99.9%]                   |
+---------------------------------------------------------------+
```

### Changes

**File: `src/components/HeroSection.tsx`** -- Full rewrite

#### Left Column (Content)
1. **Headline**: Keep exact text "Control How Money Moves Across Your Operations". Style: `text-[#021a42]`, tight tracking (`tracking-[-0.03em]`), large sizes (`text-4xl` to `text-6xl`), `font-semibold`, left-aligned on desktop
2. **Subtitle**: Replace current short subtitle with the full paragraph provided. Style: `text-[#021a42]/60`, `text-base md:text-lg`, generous `leading-[1.7]`, `max-w-xl`
3. **Feature Pills**: 4 pills with outlined icons (stroke only, no fill):
   - Wifi icon -- "NFC Payment Layer"
   - LayoutDashboard icon -- "Live Transaction Dashboard"  
   - Users icon -- "Fleet + Team Controls"
   - Shield icon -- "Enterprise-grade Security"
   - Style: `border border-[#021a42]/15`, `rounded-[12px]`, `px-4 py-2.5`, white bg, hover border transitions to `#f6245b/40`. Tactile feel with subtle shadow on hover
4. **CTA Button**: "Activate Paytap Platform" with ArrowRight icon
   - `bg-[#021a42]`, white text, hover `bg-[#f6245b]`
   - `rounded-[14px]`, generous padding (`px-8 py-4 md:px-10 md:py-5`)
   - Extremely subtle shadow (`shadow-[0_2px_8px_rgba(2,26,66,0.12)]`)
   - No Unlock icon (cleaner), just text + arrow
5. **Trust Line**: "Used by operators, businesses, and enterprises across India." -- small, muted, left-aligned

#### Right Column (Visual Stack)
1. **Mouse parallax**: Track mouse position with `onMouseMove` on the section, apply subtle `transform: translate()` (2-3px max) to visual elements based on cursor offset from center
2. **Floating animation**: Use CSS keyframes (`float-slow`) with different durations per element (5s, 7s, 6s) for organic movement
3. **Elements** (same visual pieces, refined):
   - PayTap Card (center, slight rotation, keeps existing design)
   - Dashboard mini UI (top-left, white bg, very subtle border)
   - Balance widget (top-right, white card)
   - NFC icon (bottom-left, `#021a42` circle with white Wifi icon)
4. **NFC Ripple micro-interaction**: When cursor is near the NFC icon (within ~150px), emit CSS ripple rings from the icon. 2-3 concentric circles that expand and fade out. Use `onMouseMove` distance calculation to trigger/untrigger a state boolean

#### Visual Refinements
- Remove the gradient background overlay -- pure white (`bg-white`)
- Remove the "How It Works" button from the visual stack (it clutters)
- Soften all shadows to `shadow-[0_4px_24px_rgba(0,0,0,0.06)]` level
- Dashboard mockup: keep white bg, remove gray-800 monitor frame -- use a clean white card with thin border instead
- Remove stats section from hero (or keep but make more minimal with thin separator above)

#### Color Rules (Strict)
- Primary text: `#021a42`
- Muted text: `#021a42` at 50-60% opacity
- Accent `#f6245b`: only on pill hover borders, CTA hover bg, and NFC ripple rings
- Background: pure `#ffffff`
- No gradients, no colored backgrounds, no heavy shadows

### Technical Notes
- Keep `memo()` wrapper for performance
- Mouse parallax uses `useRef` + `onMouseMove` with `requestAnimationFrame` for smoothness
- NFC ripple uses CSS `@keyframes` (added to tailwind config) with conditional class toggle
- Add new keyframe `float-slow` to `tailwind.config.ts` for the gentle floating motion
- Keep `useNavigate` for CTA click to `/checkout`
- Keep `useTranslation` for stats labels
- Mobile: visual stack stacks below content, parallax disabled, floating animation kept but gentler
- Remove unused imports (PlayCircle, Unlock, Bot, Headphones, etc.)

