

## Plan: Align Trial Pack Messages in Blue Summary Box

### File: `src/pages/Checkout.tsx`

**Lines 512-521** — Replace the current starter block with a cleaner, left-aligned layout using bullet-style dots and consistent padding:

```tsx
{selectedPlan === 'starter' && (
  <div className="mt-4 pl-1 space-y-2">
    <div className="flex items-start gap-2">
      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary-foreground/40 shrink-0" />
      <p className="text-xs text-primary-foreground/60 italic leading-relaxed">
        Most owners upgrade to Business Pro within 2 days
      </p>
    </div>
    <div className="flex items-start gap-2">
      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary-foreground/40 shrink-0" />
      <p className="text-xs text-primary-foreground/60 italic leading-relaxed">
        Create Account & Contact Support to Get the Vehicle Payment Tag at Discount Price
      </p>
    </div>
  </div>
)}
```

This adds subtle bullet dots, consistent left alignment, `leading-relaxed` for readability, and proper spacing. Single file, one edit.

