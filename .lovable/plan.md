

## Plan: Remove Copy & Fix Mobile Alignment

**File:** `src/pages/Checkout.tsx`

### 1. Remove "Less than ₹X/day per vehicle" from all 4 plans (line 433)
Delete this line inside the plan selector map:
```
<p className="text-[10px] text-muted-foreground/60 mt-0.5">Less than ₹{Math.ceil(p.price / p.tags / 365)}/day per vehicle</p>
```

### 2. Remove hero subtitle paragraph (lines 347-356)
Delete the entire `<motion.p>` block containing "PayTap help tracks and control…" and the "Fuel, Fastag Recharge…" text.

### 3. Remove the text below "Take Control" button (lines 771-776)
Delete these two `<p>` elements:
- `"Takes 30 seconds · No risk · Instant activation"`
- `"⏳ Price increasing soon"`

### 4. Fix mobile alignment issues
- **Hero heading (line 341)**: Reduce mobile font from `text-2xl` to `text-xl` to prevent oversized text
- **Plan selector items (line 383)**: Tighten mobile padding from `px-5` to `px-4` and `py-4` to `py-3`
- **Plan price (line 430)**: Reduce mobile size from `text-xl` to `text-lg`
- **Summary box (line 450)**: Reduce mobile padding from `p-6` to `p-5`
- **Form container (line 536)**: Reduce mobile padding from `p-6` to `p-5`
- **CTA button area (line 740)**: Reduce `mt-8` to `mt-6`

