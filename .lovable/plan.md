

## Add Navigation Arrows to Chaos Simulation

### What Changes
Add left/right arrow buttons at the bottom of the Chaos Simulation section so users can manually navigate between the 7 frames instead of only relying on the auto-timer. This makes it clear the section is interactive and lets users control the pace.

### How It Will Look

```text
+------------------------------------------+
|                                          |
|         [Current Frame Content]          |
|                                          |
|                                          |
|       <  [dots: o o * o o o o]  >        |
|                                          |
+------------------------------------------+
```

- Left arrow (ChevronLeft) and Right arrow (ChevronRight) at the bottom center
- Small dot indicators between the arrows showing current frame (7 dots)
- Left arrow disabled/hidden on frame 0, right arrow disabled/hidden on frame 6+
- Clicking an arrow pauses the auto-timer and switches to manual navigation

### Technical Details

**File: `src/pages/HowItWorks.tsx` (ChaosSimulation component)**

1. **Add manual navigation state**: A `manualMode` boolean -- once user clicks an arrow, auto-advance stops
2. **Modify the timer useEffect**: Skip auto-advance if `manualMode` is true
3. **Add prev/next handlers**: `setFrame(f => f - 1)` / `setFrame(f => f + 1)` with bounds checking, and set `manualMode = true`
4. **Render navigation UI**: Below the `AnimatePresence` block, add:
   - A flex row with ChevronLeft button, 7 dot indicators, and ChevronRight button
   - Dots styled as small circles, current frame dot is white/bright, others are white/30
   - Arrows styled as semi-transparent white circles with hover effect
   - Fade-in animation so arrows appear after a short delay (1.5s) to not distract from the opening frame
5. **Icons**: Import `ChevronLeft` and `ChevronRight` from lucide-react (already using lucide)

### Mobile
- Same layout, slightly smaller arrows and dots
- Touch-friendly button sizes (min 44px tap target)

