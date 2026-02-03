

## Plan: Fix Carousel Arrow Visibility on Newsroom Page

### Problem
The carousel navigation arrows on the Newsroom page are barely visible. The arrows have `bg-white/20` styling which works well on dark backgrounds, but since the arrows are positioned outside the dark navy card (on the light `bg-muted/30` section background), they appear very faint.

### Solution
Update the arrow styling to use a solid, high-contrast background that works on the light section background.

---

### File to Modify

**`src/pages/Newsroom.tsx`** (lines 362-363)

#### Current Code:
```tsx
<CarouselPrevious className="left-2 md:-left-4 bg-white/20 hover:bg-white/30 border-0 text-white" />
<CarouselNext className="right-2 md:-right-4 bg-white/20 hover:bg-white/30 border-0 text-white" />
```

#### Updated Code:
```tsx
<CarouselPrevious className="left-4 md:-left-6 bg-paytap-navy hover:bg-paytap-navy/90 border-0 text-white shadow-lg" />
<CarouselNext className="right-4 md:-right-6 bg-paytap-navy hover:bg-paytap-navy/90 border-0 text-white shadow-lg" />
```

---

### Changes Explained

| Property | Before | After | Reason |
|----------|--------|-------|--------|
| Background | `bg-white/20` | `bg-paytap-navy` | Solid dark background for high contrast |
| Hover | `bg-white/30` | `bg-paytap-navy/90` | Subtle hover effect |
| Position | `left-2 md:-left-4` | `left-4 md:-left-6` | Move arrows slightly outward for better visibility |
| Shadow | None | `shadow-lg` | Adds depth to make arrows stand out |
| Text | `text-white` | `text-white` | Keep white arrow icons |

---

### Visual Result

Before (hard to see):
```
[Light gray bg] [faint arrow] [DARK NAVY CARD] [faint arrow] [Light gray bg]
```

After (clearly visible):
```
[Light gray bg] [NAVY ARROW] [DARK NAVY CARD] [NAVY ARROW] [Light gray bg]
```

The arrows will now have a solid dark navy background matching the card, with a shadow to make them pop against the light section background.

