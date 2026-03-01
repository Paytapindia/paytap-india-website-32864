

## Fix Navigation Arrows Centering

### Problem
The navigation arrows and dots are slightly shifted to the right because `left-1/2 -translate-x-1/2` is calculated relative to the section container which has `px-4` padding, causing a small offset.

### Fix
**File: `src/pages/HowItWorks.tsx` (line 301)**

Replace the positioning classes on the navigation container from:
```
absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 md:gap-4
```
to:
```
absolute bottom-8 inset-x-0 z-20 flex items-center justify-center gap-3 md:gap-4
```

This uses `inset-x-0` (left: 0; right: 0) with `justify-center` to perfectly center the nav bar regardless of parent padding. One line change, no other modifications needed.
