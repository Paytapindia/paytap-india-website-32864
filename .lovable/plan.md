

## Plan: Change Plan Box Text from "NFC Tags Included" to "Vehicles Activated"

### Change in `src/pages/Checkout.tsx`

**Line 408** — Replace the tag/card count text with "Vehicle Activated" phrasing:

```typescript
// Before:
<p className="text-[10px] text-muted-foreground">{p.tags} {productType === 'sticker' ? 'NFC Tag' : 'Card'}{p.tags > 1 ? 's' : ''} included</p>

// After:
<p className="text-[10px] text-muted-foreground">{p.tags} Vehicle{p.tags > 1 ? 's' : ''} Activated</p>
```

This will show:
- Starter (1 tag): **1 Vehicle Activated**
- Business Basic (2 tags): **2 Vehicles Activated**
- Business Pro (5 tags): **5 Vehicles Activated**
- Corporate (10 tags): **10 Vehicles Activated**

| File | Change |
|------|--------|
| `src/pages/Checkout.tsx` | Line 408: replace NFC Tag/Card text with "Vehicle(s) Activated" |

