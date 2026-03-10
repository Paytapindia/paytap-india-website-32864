

## Fix Compliance & Security Footer Link

The "Compliance & Security" link in the footer currently points to `/about#compliance`. It should point to `/security` — the dedicated Security page that already exists.

### Change in `src/components/FooterSection.tsx` (line 83)

```tsx
// From:
<Link to="/about#compliance" ...>
// To:
<Link to="/security" ...>
```

