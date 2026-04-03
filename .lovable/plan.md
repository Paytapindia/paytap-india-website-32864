

## Plan: Replace "NFC Tap Detected" with "AI Manager"

### File: `src/components/HeroSection.tsx`

**Lines ~68-78** — Replace the NFC floating element:

- Remove the green pulse dot and `Wifi` icon
- Add `Sparkles` icon from lucide-react (AI icon)
- Change text from "NFC Tap Detected" to "AI Manager"

Change:
```tsx
<div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse" />
<Wifi className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
<span className="...">NFC Tap Detected</span>
```

To:
```tsx
<Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
<span className="...">AI Manager</span>
```

Also update imports: replace `Wifi` with `Sparkles` (remove `Wifi` if unused elsewhere).

Single file, two small edits.

