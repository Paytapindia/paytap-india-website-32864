

## Plan: Move Charts, AI Card, and Stat Card Inside the Laptop Screen

### File: `src/components/OurProductsSection.tsx`

### Concept

Instead of the charts and floating cards sitting separately below the laptop, everything will be rendered **inside** the laptop screen as part of the `DashboardMockup` component. The laptop screen will become a scrollable dashboard that includes the existing metrics + fleet overview at the top, and the three charts + AI insight + savings stat below.

### Changes

**1. Expand `DashboardMockup` to include charts and insights inside it**

After the Fleet Overview section (line 77), add:
- A row with the AI insight and Savings stat as small inline cards (not floating/absolute)
- A 3-column grid of mini charts (Profit vs Loss, Vehicle Utilization, Expense Breakdown) using the same recharts components but scaled down to fit inside the laptop
- A small "Ask Paytap" button in the bottom-right corner of the dashboard

All styled with the dashboard's internal `text-[10px]` scale to look natural inside the screen.

**2. Remove the external charts + floating elements section (lines 165-255)**

Delete everything from the `{/* Charts + floating elements */}` div — the chart grid, floating AI card, floating stat card, mobile floating cards, and chatbot button. All of this now lives inside the laptop screen.

**3. Remove the standalone `ChartCard`, `AICard`, `StatCard` components (lines 83-125)**

These are no longer needed as separate components. The chart rendering moves inline into `DashboardMockup`.

**4. Remove the fixed `aspect-[16/10]` on the laptop screen (line 155)**

Change to `min-h-[300px] md:min-h-[400px]` so the screen can accommodate the additional dashboard content without being cropped.

### Result

The laptop screen becomes a rich, scrollable dashboard preview showing metrics, fleet data, charts, AI insights, and a chat button — all contained within the laptop frame. Nothing sits outside the laptop.

### Single file, one rewrite.

