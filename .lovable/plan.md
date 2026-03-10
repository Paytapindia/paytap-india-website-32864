

## Fix KYC Limits Card Text Overflow

The `₹2,00,000/month` text overflows on the KYC limit cards because `text-2xl md:text-3xl` is too large for that string within the card width.

### Change in `src/pages/HowItWorks.tsx` (line 723)

- Reduce font size: `text-2xl md:text-3xl` → `text-xl md:text-2xl`
- Add `break-words` to prevent overflow

```tsx
<p className="text-xl md:text-2xl font-bold text-white break-words">{item.value}</p>
```

