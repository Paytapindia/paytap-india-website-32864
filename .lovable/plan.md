

## Plan: Refine Business Dashboard Monitor in Hero

### File: `src/components/HeroSection.tsx` (lines 110-146)

### Changes

1. **Reduce size** — Scale down the monitor to feel like a compact laptop screen:
   - `w-[150px] sm:w-[180px] md:w-[210px]` (from 180/220/260)
   - Tighter padding: `p-1.5 sm:p-2 md:p-2.5`

2. **White background** — Change screen from `bg-[#0f172a]` to `bg-white`, border from `border-gray-600` to `border-gray-300`

3. **Update text/icon colors** for white background:
   - Header text: `text-gray-700` (was `text-white/90`), border: `border-gray-200` (was `border-white/10`)
   - KPI cards: `bg-gray-50` background, value text `text-gray-900`, label text `text-gray-500`
   - Profit/Loss stays `text-green-500`

4. **Switch KPIs to list view** — Replace the `grid grid-cols-3` with a vertical stack (`space-y-1`), each row as a horizontal flex with icon + label on left, value on right — more compact and readable at small size

5. **Adjust stand colors** to lighter gray (`bg-gray-400`, `bg-gray-300`) to match the white aesthetic

