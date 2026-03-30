

## Plan: Update ComplianceBadgeBar to Navy Background with White Text

**File:** `src/components/ComplianceBadgeBar.tsx`

### Changes

Update the section styling from the current light `bg-secondary/50` to brand navy `bg-[#021a42]` with all text and icons in white:

1. Section: `bg-secondary/50 border-y border-border/50` → `bg-[#021a42]`
2. Headline: `text-foreground` → `text-white`
3. Icons: `text-primary` → `text-white`
4. Badge labels: `text-muted-foreground` → `text-white/80`
5. Disclaimer: `text-muted-foreground/70` → `text-white/60`

Single file, 3 class string replacements.

