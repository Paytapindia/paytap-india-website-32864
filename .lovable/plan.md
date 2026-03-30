

## Plan: Add Upgrade Nudge Note Under Trial Pack in Blue Box

**File:** `src/pages/Checkout.tsx`

### Change

After the `</ul>` closing tag (line 464), add a conditional note that only shows when `selectedPlan === 'starter'`:

```tsx
{selectedPlan === 'starter' && (
  <p className="text-xs text-primary-foreground/50 italic mt-3">
    Most owners upgrade to Business Pro within 2 weeks.
  </p>
)}
```

This inserts a subtle anchor text between the feature checklist and the delivery/price footer, visible only for the Trial Pack selection.

