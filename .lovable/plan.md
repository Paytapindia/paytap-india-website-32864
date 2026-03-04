

## Plan: Optimize Floating Elements on Mobile

The floating elements overlap the card on mobile because they're positioned too close with the same size as desktop. Fix by making them smaller and repositioning them further out on mobile.

### Changes in `src/components/HeroSection.tsx`

**1. NFC Tap Detected (line 64):** Move above the card with more clearance
- Position: `-top-10 left-0 sm:-top-8 sm:-left-16`
- Scale down inner content on mobile: `px-2.5 py-1.5 sm:px-4 sm:py-2.5`, icon `w-3 h-3 sm:w-4 sm:h-4`, text `text-[10px] sm:text-xs`

**2. Today's Spend (line 81):** Move below the card with clearance instead of overlapping
- Position: `-bottom-14 -left-2 sm:-bottom-6 sm:-left-20`
- Scale down: `px-2.5 py-2 sm:px-4 sm:py-3`, text `text-[9px] sm:text-[10px]`, amount `text-xs sm:text-sm`

**3. Transaction chip (line 100):** Already at `-bottom-12` on mobile, shift further down
- Position: `-bottom-14 -right-0 sm:-bottom-4 sm:-right-14`
- Scale down: `px-2.5 py-1.5 sm:px-4 sm:py-2.5`, icon `w-3 h-3 sm:w-4 sm:h-4`, text `text-[10px] sm:text-xs`

**4. Add bottom margin to the card container** (`relative` div at line 58): Add `mb-16 sm:mb-0` so the floating elements below have space without overlapping the stats section.

This keeps all three elements visible on mobile but prevents them from covering the card face.

| File | Change |
|------|--------|
| `src/components/HeroSection.tsx` | Responsive sizing + repositioning for floating elements on mobile |

