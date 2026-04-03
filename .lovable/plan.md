

## Plan: Add Charts, AI Card, and Floating Elements to Our Products Section

### File: `src/components/OurProductsSection.tsx`

Complete enhancement of this component. The laptop mockup stays as-is. Below and around it, we add the new elements.

### New Elements

**1. Three Chart Cards (Below Laptop, Horizontal Row)**

Using Recharts (already available via `src/components/ui/chart.tsx`):

- **Profit vs Loss** — Line chart with navy (Revenue) and red (Expenses) lines, 6 months of sample data
- **Vehicle Utilization** — Bar chart showing Active vs Idle vehicles across categories
- **Expense Breakdown** — Pie/donut chart with Fuel, Maintenance, Tolls, Misc segments

Each in a white card with subtle shadow, title, and the chart. Grid: `grid-cols-1 md:grid-cols-3`. Charts use smooth entry animation via CSS.

**2. Floating AI Manager Card (Right Side)**

Glassmorphism card positioned absolute on desktop (top-right of chart area):
- Title: "Paytap AI" with a sparkle/bot icon
- Sample insight text: "Your fuel expenses increased 12% this week. 2 vehicles are underperforming."
- Backdrop blur, rounded corners, subtle shadow
- Gentle floating animation via CSS keyframes

**3. Floating Stat Card (Left Side)**

Small card positioned absolute on desktop (left of chart area):
- "₹38K Saved This Month" with a trending-up icon
- Same glassmorphism style
- Balances the AI card visually

**4. Chatbot Button (Bottom Right Corner)**

Floating circular button at bottom-right of the section:
- Chat icon (MessageCircle from lucide)
- "Ask Paytap" label on hover
- Smooth scale animation on hover

### Layout Structure

```text
┌──────────────────────────────────┐
│        Paytap for Business       │
│   Vehicle Payment & Management   │
│                                  │
│      ┌──── Laptop Mockup ────┐   │
│      │   Dashboard Content   │   │
│      └───────────────────────┘   │
│                                  │
│  ┌─────────── relative ────────┐ │
│  │ [Stat]                [AI]  │ │
│  │                             │ │
│  │ [Chart1] [Chart2] [Chart3]  │ │
│  │                      [Chat] │ │
│  └─────────────────────────────┘ │
└──────────────────────────────────┘
```

On mobile: charts stack vertically, floating cards become inline above/below charts, chatbot button stays fixed.

### Imports Needed

- `LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer` from `recharts`
- `MessageCircle, TrendingUp, Sparkles` from `lucide-react`

### CSS Animations

Add a subtle `@keyframes float` animation inline for the AI card (translateY oscillation over 3s).

### Single file change, no other files affected.

