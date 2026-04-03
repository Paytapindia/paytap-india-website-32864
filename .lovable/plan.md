

## Plan: Move "Try for Free" Button Next to Trial Pack Name

### File: `src/pages/Checkout.tsx`

### Changes

**1. Remove the button from the price column (lines 430-441)**
Delete the `{key === 'starter' && (...)}` block from inside the price `<div>`.

**2. Add the button next to the plan name (after line 417)**
Insert inside the `flex items-center gap-2` div (line 404), after the driver cards badge:

```tsx
{key === 'starter' && (
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      window.open('https://dashboard.myfleetai.in/login', '_blank');
    }}
    className="inline-flex items-center px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-colors"
  >
    Click here for Free Access →
  </button>
)}
```

The button uses the same sizing/style as the other badges (POPULAR, Driver Cards) so it sits inline naturally.

Single file, two edits.

