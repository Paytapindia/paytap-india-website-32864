

## Plan: Add 5-Minute Urgency Timer to Checkout

Add a persistent countdown timer visible across all 4 checkout steps. When it expires, show a toast and redirect to home.

### Changes in `src/pages/Checkout.tsx`

1. **Add timer state and effect** in the `Checkout` component:
   - `timeLeft` state initialized to `300` (5 minutes)
   - `useEffect` with a 1-second interval that decrements the timer
   - On expiry: show a toast ("Session expired") and navigate to `/`

2. **Add timer UI** — render a sticky banner just above the `ProgressBar` (around line 727):
   - Display as `MM:SS` format with a clock icon
   - Red/urgent styling when under 60 seconds
   - Example: `⏱ Complete your order in 04:32` with amber/red pulsing when < 1 min

3. **Format helper**: Simple `Math.floor(timeLeft/60)` and `timeLeft%60` formatting inline

### Visual Design

```text
┌─────────────────────────────────────┐
│  🔒 Secure Checkout                │
│  ⏱ Complete your order in 04:32    │  ← new timer bar
│  ● ── ○ ── ○ ── ○                 │  ← existing progress
│  [Step content...]                  │
└─────────────────────────────────────┘
```

- Amber text normally, red + pulse animation when under 60s
- Compact single line, centered, with `Clock` icon from lucide-react

| File | Change |
|------|--------|
| `src/pages/Checkout.tsx` | Add `timeLeft` state, countdown effect, and timer banner above progress bar |

