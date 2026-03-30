

## Plan: Fix Mobile Text Alignment on Checkout Hero

**File:** `src/pages/Checkout.tsx`

### Changes (line 332)

Update the h1 className:
- Reduce mobile font size from `text-3xl` to `text-2xl` for better wrapping on 390px screens
- Add `text-balance` to ensure balanced line breaks

```
text-2xl md:text-5xl font-bold text-primary-foreground tracking-tight leading-tight text-balance
```

Single class change, one line.

