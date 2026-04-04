

## Plan: Trial Pack Skip Form + Auto-Scroll on Plan Select + Remove Green Badge

### File: `src/pages/Checkout.tsx`

### Changes

**1. Remove "Click here for Free Access →" green badge (lines 438-449)**
Delete the entire `{key === 'starter' && (...)}` block that renders the green button.

**2. Auto-scroll to Quick Details on any plan select (lines 318-325)**
Update `handlePlanSelect` to always scroll to `formRef` (not just on mobile), and also auto-open the form:
```tsx
const handlePlanSelect = (key: PlanType) => {
  setSelectedPlan(key);
  setTimeout(() => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
  if (key !== 'starter') {
    setFormOpen(true);
    setShowFormPrompt(true);
  }
};
```

**3. For Trial Pack, skip the form entirely — show only the CTA button**
- When `selectedPlan === 'starter'`, hide the "Quick Details" collapsible header and form fields entirely. Only show the "Pay ₹0 & Go Live →" button (which already redirects to dashboard).
- Wrap the Quick Details section (lines 538-736) in a condition: `{selectedPlan !== 'starter' && (...)}`
- For starter plan, the CTA button should be `type="button"` with a direct `onClick` that saves the lead (no form validation needed) and redirects to dashboard.
- Update the CTA button logic: if `selectedPlan === 'starter'`, clicking it calls the free trial redirect directly without opening the form.

**4. Update CTA button text for starter**
Show "Activate Free Trial →" instead of "Pay ₹0 & Go Live →" when starter is selected.

### Result
- Selecting any plan auto-scrolls to the details/CTA area
- Trial Pack: no form fields shown, just a button that redirects to dashboard
- Paid plans: form opens and works as before
- Green "Click here for Free Access" badge removed

