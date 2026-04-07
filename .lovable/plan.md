

## Plan: Add "Get 300 Cash Back" Bullet for Trial Pack

### File: `src/pages/Checkout.tsx`

**Lines 499-506** — Add a new bullet point for starter plan: "Get ₹300 Cash Back On First Order", right after the "Account Activation Fee" line and before the "Most owners upgrade" line.

```tsx
{selectedPlan === 'starter' && (
  <>
    <div className="flex items-start gap-2">
      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-foreground/40 shrink-0" />
      <p className="text-xs text-primary-foreground/70 leading-relaxed">
        Get ₹300 Cash Back On First Order
      </p>
    </div>
    <div className="flex items-start gap-2">
      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-foreground/40 shrink-0" />
      <p className="text-xs text-primary-foreground/60 italic leading-relaxed">
        Most owners upgrade to Business Pro within 2 days
      </p>
    </div>
  </>
)}
```

Single file, one edit. Adds a new bullet in the same style between the activation fee and the upgrade message.

