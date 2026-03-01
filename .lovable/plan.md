
## Add Hook Header to Problem Section

### What Changes
Add a bold, attention-grabbing header question above the existing Problem section content: **"Are you the owner or manager of a vehicle?"**

This serves as a hook that immediately qualifies the reader before they see the pain points.

### Technical Details

**File: `src/pages/HowItWorks.tsx` (Problem section, around line 158)**

Insert a new animated heading at the top of the Problem section, before the "It starts with one vehicle..." lines:

```
Are you the owner or manager of a vehicle?
```

- Styled as a large, white headline with `whileInView` fade-up animation
- Uses the same `fadeUp` variant already defined in the file
- Adds a subtle bottom margin/separator before the existing content flows in
- Matches the premium typography style (large bold, white text on dark background)

The existing content (the three sequential lines, bullet points, and closing statement) remains unchanged below it.
