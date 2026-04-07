

## Plan: Uniform Green Text with Icons for All Four Points

### File: `src/pages/Checkout.tsx`

**Lines 483-514** — Replace the delivery/points section with a consistent format: all four lines use Lucide icons, green text (`text-green-400`), same `text-xs` size, no italic.

```tsx
<div className="flex flex-col gap-1.5 mt-5 pt-4 border-t border-primary-foreground/10">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2 text-xs text-green-400">
      <Truck className="w-4 h-4 shrink-0" />
      <span>Vehicle Tag Delivery: 3–5 Business Days</span>
    </div>
    <span className="text-2xl font-bold">{formatINR(total)}</span>
  </div>
  <div className="mt-1 pl-1 space-y-2.5">
    <div className="flex items-start gap-2">
      <ShieldCheck className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
      <p className="text-xs text-green-400 leading-relaxed">
        You are paying one time Account Activation Fee
      </p>
    </div>
    {selectedPlan === 'starter' && (
      <>
        <div className="flex items-start gap-2">
          <Gift className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
          <p className="text-xs text-green-400 leading-relaxed">
            Get ₹300 Cash Back On First Order
          </p>
        </div>
        <div className="flex items-start gap-2">
          <TrendingUp className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
          <p className="text-xs text-green-400 leading-relaxed">
            Most owners upgrade to Business Pro within 2 days
          </p>
        </div>
      </>
    )}
  </div>
</div>
```

**Add imports** — Add `ShieldCheck`, `Gift`, `TrendingUp` to the lucide-react import at the top of the file.

### Result
- All four lines: green text, same size, no italic, each with a distinct icon (Truck, ShieldCheck, Gift, TrendingUp)
- Bullet dots replaced with meaningful icons

