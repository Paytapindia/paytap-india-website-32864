

## Remove Hero Section, Start with Chaos Simulation

### What Changes
Remove the hero section ("Your Vehicle Can Now Pay on Its Own" with its buttons and bouncing chevron) from the How It Works page. The page will go directly from the Navbar into the Chaos Simulation section.

### Details

**File: `src/pages/HowItWorks.tsx`**

1. Delete the entire hero section (lines 422-475) — the `<section>` containing:
   - NFC glow ring animations
   - "Your Vehicle Can Now Pay on Its Own" heading
   - "One dashboard. Full control. Real-time visibility." subtitle
   - "Get Started" and "See How It Works" buttons
   - Bouncing ChevronDown arrow

2. Remove the now-unused `scrollToContent` function (line 350-352) since it referenced `#problem-section` which was linked from the hero's "See How It Works" button.

3. The page flow becomes: Navbar -> Chaos Simulation -> Solution section -> rest of page.

No other files affected. No new dependencies.
