

## Show AMC as Monthly with "Billed Annually" Note

### Change in `src/pages/Checkout.tsx`

**Line 349** — Update the AMC display line in plan cards from:
```
AMC ₹1,200/yr from Year 2
```
to:
```
AMC ₹100/mo · Billed annually from Year 2
```

Calculate monthly by dividing `amcYear2 / 12` and display with the monthly figure + "Billed annually" qualifier.

**Line 288** — Update the footer note from:
```
Annual AMC applicable from Year 2 as per selected plan.
```
to:
```
AMC billed annually from Year 2 as per selected plan.
```

Single file change: `src/pages/Checkout.tsx`

