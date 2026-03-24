

## Plan: Match Blue Summary Box Width to Plan Box

**File:** `src/pages/Checkout.tsx`

**Change:** On line 434, remove the `max-w-[520px]` constraint from the blue summary box so it spans the full width of its container, matching the plan selector box above it.

- **Line 434**: Change `className="max-w-[520px] mx-auto w-full rounded-3xl bg-primary..."` to `className="rounded-3xl bg-primary..."` (remove `max-w-[520px] mx-auto`)

This makes the blue box the same width as the plan cards box on desktop/web view.

