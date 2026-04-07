

## Plan: Move Trial Pack Messages Below Vehicle Tag Delivery + Update Text

### File: `src/pages/Checkout.tsx`

**1. Remove the current starter italic block (lines 500-509)** — delete entirely.

**2. After the delivery section (after line 521, below "You are paying one time Account Activation Fee")**, add the starter-only messages:

```tsx
{selectedPlan === 'starter' && (
  <div className="mt-3 space-y-1">
    <p className="text-xs text-primary-foreground/50 italic">
      Most owners upgrade to Business Pro within 2 days
    </p>
    <p className="text-xs text-primary-foreground/50 italic">
      Create Account & Contact Support to Get the Vehicle Payment Tag at Discount Price
    </p>
  </div>
)}
```

This moves the two lines below the "Vehicle Tag Delivery" row and updates the second line's text. Single file, two small edits.

