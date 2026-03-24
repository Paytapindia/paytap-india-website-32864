

## Plan: Collapsible Quick Details with Auto-Open on Pay Click

**File:** `src/pages/Checkout.tsx`

### Behavior

1. **Quick Details section starts collapsed** — only a header bar with "Quick Details" and a chevron arrow is visible
2. **When user clicks the "Pay" button** and the form is collapsed, instead of submitting, it opens the Quick Details section and shows a message: "Complete these details to process your order"
3. **When already open**, the Pay button submits normally (runs validation + payment flow)
4. User can also manually toggle open/close by clicking the header bar

### Technical Changes

1. **Add state**: `const [formOpen, setFormOpen] = useState(false)`
2. **Header bar**: Replace the static `<h2>` + `<p>` with a clickable row containing title, subtitle, and a `ChevronDown` icon that rotates when open
3. **Wrap form content** (the grid + fields) in an `AnimatePresence` + `motion.div` that shows/hides based on `formOpen`
4. **Add a prompt message**: When `formOpen` is first triggered by the Pay button, show an alert-style line: "Complete these details to process your order" (with an info icon)
5. **Modify Pay button `onClick`**: Add an `onClick` handler that checks if `formOpen` is false — if so, call `setFormOpen(true)`, scroll to the form, and `return` (prevent form submission). Otherwise let the normal `onSubmit` proceed.
6. **Move CTA button and trust line outside** the collapsible area so they're always visible

The Pay button stays visible at all times. The form fields animate in/out smoothly.

