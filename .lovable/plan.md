

## Fix: Increase Spacing Between "Resources" and "How It Works"

The screenshot shows "Resources" and "How It Works" are still too close together. The current `ml-10` margin on the direct links wrapper needs to be increased.

### Change

**File: `src/components/Navbar.tsx` (line 318)**

- Increase the left margin on the flex wrapper from `ml-10` to `ml-14` (or `ml-16`) to create a clearer visual gap between the "Resources" dropdown and the "How It Works" link.

```diff
- <div className="flex items-center gap-6 ml-10">
+ <div className="flex items-center gap-6 ml-14">
```

This single change will push both direct links further from the Resources dropdown for a clean, professional separation.

