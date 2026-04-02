

## Plan: Reposition Dashboard as Monitor Screen Overlapping Card

### What changes

Remove the current laptop mockup that sits below the card and replace it with a compact **monitor-style dashboard** positioned at the bottom-right corner of the PayTap card, slightly overlapping it — like a floating monitor screen peeking out from behind the card.

### File: `src/components/HeroSection.tsx`

1. **Remove the standalone laptop mockup** (lines 178-214) — the full `motion.div` block with screen + base

2. **Add a new monitor-style dashboard element** as an `absolute` positioned `motion.div` inside the existing relative container (alongside the other floating elements), placed at the bottom-right of the card:
   - Position: `absolute -bottom-16 -right-12 sm:-bottom-12 sm:-right-20 z-20`
   - Styled as a mini monitor: dark background (`#0f172a`), rounded-lg top, thin bezel border, with a small stand/base below
   - Compact size: `w-[180px] sm:w-[220px] md:w-[260px]`
   - Inside the "screen":
     - Thin header bar: green dot + "Business Dashboard" label
     - 3 KPI cards in a row: Vehicles (10), Profit/Loss (+₹50,000 in green), Teams (5)
   - Monitor stand: thin centered rectangle below the screen
   - Animated in with `motion.div` delay 1.5s
   - Visible on all screen sizes (with tighter sizing on mobile)

3. **Adjust the existing transaction notification floating element** (lines 91-108) position slightly to avoid overlap with the new monitor

4. **Remove `flex-col gap-6`** from the right column wrapper and revert to the original single-card centered layout since the dashboard is now an overlay, not a stacked element

### Visual result

The PayTap card stays as the hero visual, with the business dashboard appearing as a small monitor screen overlapping the card's bottom-right corner — similar to the other floating UI chips but larger and styled as a screen. This creates a cohesive, layered composition.

