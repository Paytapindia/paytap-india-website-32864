

## Plan: Add Laptop Dashboard Screen Next to Card in Hero

### What it does

Add a programmatic laptop mockup below/beside the PayTap card in the right column of the hero section, showing a mini "Business Dashboard" UI with:
- **Vehicles: 10** 
- **Profit/Loss: +₹50,000** (green)
- **Teams: 5**

### File: `src/components/HeroSection.tsx`

1. **Import** `Truck, Users` from lucide-react (already have `BarChart3`)

2. **After the card's closing `</div>` (around line 170)**, add a laptop mockup element:
   - A container styled as a laptop: rounded-lg dark background (`#0f172a`) with a bezel border, and a small "base" bar beneath it
   - Hidden on mobile (`hidden sm:block`), positioned below the card with some margin
   - Inside the "screen": a mini dashboard layout with:
     - Header bar: "PayTap Business Dashboard" with a green dot
     - Three stat cards in a row:
       - 🚛 Vehicles: **10** 
       - 📈 Profit/Loss: **+₹50,000** (green text)
       - 👥 Teams: **5**
   - Animate in with `motion.div` (delay: 1.5s)

3. **Adjust the right column wrapper** to stack the card and laptop vertically with `flex-col` and appropriate gap

### Visual approach

The laptop will be a CSS-only mockup (no images needed) — a rounded rectangle with a darker "screen" area containing the dashboard stats, and a thin trapezoid base beneath. This matches the existing programmatic/engineered aesthetic of the hero section.

On mobile, the laptop will be hidden to avoid overcrowding (the floating UI elements already fill the space). On tablet/desktop (sm+), it appears below the card.

