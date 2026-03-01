

## Redesign Security + How It Works Sections (Cinematic Style)

### What Changes
Redesign the "Built Like a Bank. Designed for Vehicles." security section and the "How It Works" flow section to match the immersive, cinematic quality of the Chaos Simulation -- using staged reveal animations, larger visuals, and more dramatic presentation instead of simple icon grids.

### Security Section -- "Built Like a Bank"
**Current**: Simple 3-column grid of small icon+text cards.
**New**: A full-screen cinematic section with a staged reveal. Each security feature appears one at a time as a large, prominent card with a glowing icon, bold text, and a subtle pulse animation. The section uses a staggered vertical layout on scroll-into-view.

- Each of the 5 security items gets its own animated row/card with:
  - Large icon (48px) with a soft glow ring behind it
  - Bold feature text with a subtle description line
  - Glassmorphic card with `#f6245b` border accent on hover
- After all 5 items reveal, the tagline "Your vehicle isn't just moving. It's transacting." fades in with emphasis styling
- Background: subtle radial gradient pulse (similar to chaos section's red glow)

### How It Works Flow -- "6 Steps"
**Current**: Flat horizontal icon row (desktop) / vertical list (mobile) with a scroll-linked line.
**New**: A cinematic step-by-step journey with numbered nodes connected by an animated path line.

- Each step gets a larger presentation:
  - Numbered circle (1-6) with gradient fill matching the chaos nav dots style
  - Icon inside a glowing container
  - Label below with fade-up animation
- Desktop: Horizontal timeline with an animated connector line that draws as user scrolls (keep existing scroll-linked logic but make nodes bigger and more dramatic)
- Mobile: Vertical timeline with a drawing line on the left side connecting each step
- The closing tagline "One connected ecosystem. Zero manual work." appears with a typewriter-style or word-by-word reveal

### Technical Details

**File: `src/pages/HowItWorks.tsx`**

1. **Security section (lines 476-506)**: Replace the simple grid with staggered animated cards
   - Each security item rendered as a full-width glassmorphic row with icon glow
   - Use `useInView` per item or staggered `custom={i}` delays with larger visual weight
   - Add a background radial gradient similar to the chaos section

2. **How It Works flow section (lines 508-563)**: Enhance the step nodes
   - Larger node circles (96px desktop, 56px mobile) with gradient backgrounds
   - Keep the `scrollYProgress` line animation but make the line thicker and more visible
   - Add step numbers inside the circles alongside icons
   - Mobile: switch from simple flex row to a vertical timeline with a left-side connector line

3. No new dependencies -- uses existing framer-motion, lucide-react, and Tailwind classes

### Visual Reference

```text
SECURITY SECTION:
+--------------------------------------------------+
|                                                  |
|   Built Like a Bank. Designed for Vehicles.      |
|                                                  |
|   [glow] Shield  -- No random tap payments       |
|   [glow] Card    -- Person-to-Merchant only      |
|   [glow] Lock    -- Powered by RuPay network     |
|   [glow] Toggle  -- Turn tag ON/OFF anytime      |
|   [glow] Print   -- PIN required above 5,000     |
|                                                  |
|   "Your vehicle isn't just moving.               |
|    It's transacting."                            |
|                                                  |
+--------------------------------------------------+

HOW IT WORKS FLOW:
+--------------------------------------------------+
|              How It Works                        |
|                                                  |
|  (1)-----(2)-----(3)-----(4)-----(5)-----(6)     |
|  Create  Assign  Load   Set    Vehicle  You      |
|  Account Vehicles Balance Limits Pays    Relax   |
|                                                  |
|  "One connected ecosystem. Zero manual work."    |
+--------------------------------------------------+
```
