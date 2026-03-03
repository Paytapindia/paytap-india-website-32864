

## Add "GST Invoice Provided" Note Under Total Payable

### Change in `src/pages/Checkout.tsx`

**Line 286** — After the total amount line, add a small muted text: "GST Invoice Provided"

```tsx
// After the existing total line, add:
<p className="text-[11px] text-[#021a42]/50 text-right mt-1">GST Invoice Provided</p>
```

Single line addition, single file.

