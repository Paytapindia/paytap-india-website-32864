

## Plan: Update Blue Summary Box Text

### File: `src/pages/Checkout.tsx`

### Changes

**1. Line 515** — Change activation fee text:
```
"You are paying one time Activation Fee"
```
→
```
"You are paying one time Account Activation Fee"
```

**2. Lines 500-504** — Replace the starter-only italic text block with two new lines visible for starter plan:
```tsx
{selectedPlan === 'starter' && (
  <div className="mt-3 space-y-1">
    <p className="text-xs text-primary-foreground/50 italic">
      Most owners upgrade to Business Pro within 2 days
    </p>
    <p className="text-xs text-primary-foreground/50 italic">
      Contact Support to get the Vehicle Payment Tag at ₹699
    </p>
  </div>
)}
```

Three small text edits, one file.

