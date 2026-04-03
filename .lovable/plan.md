

## Plan: Add AMC and Activation Fee Text to Blue Summary Box

### File: `src/pages/Checkout.tsx` (lines 493-499)

### Changes

Insert two text elements between the feature list and the bottom price bar:

1. **"₹249/Year/Vehicle AMC Included"** — below the Dedicated Support line, as a highlighted text
2. **"You are paying one time Activation Fee"** — below that, as an informational note

Both inserted after line 485 (end of `</ul>`) and before the starter upgrade note (line 487).

```tsx
{/* After </ul> on line 485 */}
<div className="mt-4 space-y-1.5">
  <p className="text-sm font-semibold text-accent">
    ₹249/Year/Vehicle AMC Included
  </p>
  <p className="text-xs text-primary-foreground/70">
    You are paying one time Activation Fee
  </p>
</div>
```

Single insertion in one file.

