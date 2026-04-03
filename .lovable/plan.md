

## Plan: Rearrange AMC and Activation Fee Text Positions

### File: `src/pages/Checkout.tsx`

### Changes

**1. Remove the AMC + Activation Fee block from the blue summary box (lines 487-494)**
Delete the entire `<div className="mt-4 space-y-1.5">` block containing both texts.

**2. Add "₹249/Year/Vehicle AMC Included" after the trust line (after line 767)**
Insert it below the "Secure payments / RBI-aligned / GST invoice" section so all bottom-of-pay-button trust signals are grouped together:

```tsx
<p className="text-center text-sm font-semibold text-accent mt-3">
  ₹249/Year/Vehicle AMC Included
</p>
```

**3. Move "You are paying one time Activation Fee" next to the delivery text in the blue box (line 505)**
Update the delivery row (lines 502-508) to include both lines:

```tsx
<div className="flex flex-col gap-1.5 mt-5 pt-4 border-t border-primary-foreground/10">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2 text-xs text-primary-foreground/50">
      <Truck className="w-4 h-4" />
      <span>Vehicle Tag Delivery: 3–5 Business Days</span>
    </div>
    <span className="text-2xl font-bold">{formatINR(total)}</span>
  </div>
  <p className="text-xs text-primary-foreground/70">
    You are paying one time Activation Fee
  </p>
</div>
```

Three edits in one file.

