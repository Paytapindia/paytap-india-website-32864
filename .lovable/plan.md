

## Plan: Reorganize "What Your Activation Includes" section

### Changes in `src/pages/Checkout.tsx`

**1. Update `ACTIVATION_INCLUDES` array (lines 87-94)**

Replace the current items with the new structure, grouping into main items and a "Dashboard Access Includes" sub-section:

```typescript
const ACTIVATION_INCLUDES = [
  { icon: Nfc, label: 'NFC PayTap Tag for every vehicle' },
  { icon: CreditCard, label: 'Driver Prepaid Expense Card (select plans)' },
  { icon: BarChart3, label: 'Real-Time Expense Tracking' },
  { icon: TruckIcon, label: '3–5 Day Delivery' },
  { icon: Headphones, label: 'Dedicated Support' },
];

const DASHBOARD_INCLUDES = [
  { icon: Wallet, label: 'Paytap Prepaid Account' },
  { icon: LayoutDashboard, label: 'ExpensePro Dashboard' },
  { icon: Truck, label: 'Myfleet AI Vehicle Operating System' },
];
```

**2. Remove premium perks from the Dynamic Selection Summary (lines 452-458)**

Remove the conditional block showing "✔ Dedicated Support", "✔ Myfleet AI Vehicle Manager", "✔ ExpensePro Business Expense Management" since these are now in the Activation Includes section.

**3. Update the "What Your Activation Includes" card rendering (lines 468-488)**

After the main grid, add a "Dashboard Access Includes" sub-section with the three dashboard items, styled consistently with the existing grid but visually grouped under a small label.

```tsx
{/* After main ACTIVATION_INCLUDES grid */}
<div className="mt-4 md:mt-5 pt-4 md:pt-5 border-t border-border">
  <p className="text-xs font-semibold text-muted-foreground mb-3">Dashboard Access Includes</p>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
    {DASHBOARD_INCLUDES.map((item) => (
      <div key={item.label} className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <item.icon className="w-4.5 h-4.5 text-primary" />
        </div>
        <span className="text-sm text-foreground">{item.label}</span>
      </div>
    ))}
  </div>
</div>
```

Also remove the old `CalendarCheck` / "1 Year Platform Access Included" and `LayoutDashboard` / "Lifetime Platform Access" items since they're replaced by the new dashboard sub-section.

### Summary

| Location | Change |
|----------|--------|
| Lines 87-94 | Replace ACTIVATION_INCLUDES, add DASHBOARD_INCLUDES array |
| Lines 452-458 | Remove premium perks checkmarks from selection summary |
| Lines 468-488 | Add "Dashboard Access Includes" sub-section to card |

Single file: `src/pages/Checkout.tsx`

