

## Plan: Make Language Globe Icon White on Mobile

### File: `src/components/LanguageSelector.tsx`

**Line 36** — Add `text-white` to the Button className:

Change:
```tsx
className="h-9 w-9 p-0 hover:bg-gray-100"
```
To:
```tsx
className="h-9 w-9 p-0 hover:bg-white/10 text-white"
```

This makes the Globe icon white (visible on the dark navbar) and also fixes the hover background to be subtle on dark backgrounds instead of gray.

Single line change, one file.

