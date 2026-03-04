

## Plan: Change ExpensePro Icon Background to White

### Change in `src/components/OurProductsSection.tsx`

**Line 51**: The icon container uses `bg-primary` (dark navy) for both products. For the ExpensePro card (which uses an `image` property), change the background to white.

Update the icon div to conditionally apply the background:
- If the product has an `image` → use `bg-white`
- If it has an `icon` (Lucide) → keep `bg-primary`

```tsx
<div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-5 md:mb-7 shadow-md overflow-hidden ${'image' in product ? 'bg-white' : 'bg-primary'}`}>
```

Single line change in one file.

