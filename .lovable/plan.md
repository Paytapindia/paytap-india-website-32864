

## Plan: Side-by-Side Layout for Summary Box and Quick Details

### Changes in `src/pages/Checkout.tsx`

**Wrap the summary box and form in a two-column grid on desktop:**

- Around the summary box (line 429-473) and the Quick Details form (line 475 onwards), add a container div with `grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[1080px] mx-auto w-full items-start`
- Remove `max-w-[520px] mx-auto` from both the summary box and form — the grid will handle sizing
- On mobile (`< lg`): stacks vertically (summary on top, form below) — same as current
- On desktop (`lg+`): summary box on the left, Quick Details form on the right, side by side

**File:** `src/pages/Checkout.tsx`

