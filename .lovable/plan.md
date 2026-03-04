

## Plan: Move subtitle text below "What Your Activation Includes" box

### Change in `src/pages/Checkout.tsx`

**1. Remove the two subtitle lines from the header block (lines 387-392)**
- Remove the `<p>` with "Control fuel, tolls..." and the `<p>` with "Built for personal vehicles..."

**2. Add them below the Activation Includes box (after line 486), properly aligned**
- Place them inside the activation includes card at the bottom, or as a standalone centered block right after the card
- Use consistent text sizing: `text-sm` for the main line, `text-xs` for the secondary line
- Center-align with proper spacing for both mobile and desktop

```tsx
{/* After the Activation Includes grid, still inside the card */}
<div className="mt-5 md:mt-6 pt-4 md:pt-5 border-t border-border text-center space-y-1">
  <p className="text-sm text-muted-foreground">
    Control fuel, tolls, and driver expenses across all your vehicles from one central dashboard.
  </p>
  <p className="text-xs text-muted-foreground/70">
    Built for personal vehicles, businesses, and fleet operators across India.
  </p>
</div>
```

Single file change, two locations in `src/pages/Checkout.tsx`.

