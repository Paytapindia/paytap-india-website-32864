

## Update Checkout Plan Selector Text

**File: `src/pages/Checkout.tsx`**

### Change 1 — Line 353: Update heading text
- Change `"How many do you need?"` to `"Choose Platform Plan"`

### Change 2 — Line 365: Remove "1 Tag" text from Starter box
- Remove the line: `<p className="text-xs text-muted-foreground">1 {productType === 'sticker' ? 'Tag' : 'Card'}</p>`

### Change 3 — Line 378: Remove "2 Tags" text from Growth box
- Remove the line: `<p className="text-xs text-muted-foreground">2 {productType === 'sticker' ? 'Tags' : 'Cards'}</p>`

No changes to the "What's Included" section.

