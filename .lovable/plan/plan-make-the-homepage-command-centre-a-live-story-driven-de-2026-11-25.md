## Plan: Make the Homepage Command Centre a Live, Story-Driven Demo

Turn the static "Paytap Command Centre" box on the first screen into an animated, multi-screen demo that shows the platform actually working.

### What the user will see
- The command centre box shows live activity: a scrolling activity feed (e.g. "MH12 AB 4521 paid ₹2,450 at HP Pump, Pune"), counters ticking, status dots pulsing.
- Left / right arrow buttons plus dots under the box to move between 6 screens. Screens also auto-advance every ~7 seconds and pause on hover.
- Each screen has a small demo chat (auto-typed, nobody writes anything) showing the owner and the AI Manager talking about that screen's topic.

### The 6 screens
1. **Tap & Pay** – how a payment happens: vehicle tag -> tap -> approved -> receipt, animated step by step.
2. **NFC Tap at the Fuel Pump** – car arrives at pump, tag tapped on the reader, limit checked, fuel paid, amount logged to that vehicle.
3. **Owner in Control** – owner sets spend limits, blocks a vehicle, approves a top-up; toggles animate on/off.
4. **Instant Notifications** – phone-style alerts slide in: payment done, limit crossed, unusual fuel spend, low balance.
5. **Fleet & Drivers Live** – vehicles and drivers with status (on trip, idle, alert) updating.
6. **AI Manager Commands** – owner asks "Show unusual fuel spends today", AI replies with flagged vehicles and waits for approval (labeled Elite plan, approval required).

### Design
- Same navy / pink / white palette and Poppins; gentle motion only (fade/slide, typing dots), no bright random colours.
- Keeps "Illustrative Preview" label. Works on mobile (arrows stay below the box, chat compact).

### Technical details
- New `src/components/home/CommandCentreDemo.tsx` containing the carousel, 6 screen components, and a reusable `DemoChat` (scripted messages revealed on timers with typing indicator, restarts when screen changes).
- `HomeHero.tsx`: replace the current right-side box (lines ~105–180) with `<CommandCentreDemo />`.
- Uses existing framer-motion / lucide icons and existing paytap colour tokens; no backend changes.
