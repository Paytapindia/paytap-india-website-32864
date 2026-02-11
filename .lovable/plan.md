

## Fix: Navigation Bar Spacing Between "How It Works" and "Compliance"

The current `ml-8` margin is not enough to visually separate these two links. The screenshot confirms they appear as one run-on phrase: "How It Works Compliance".

### Changes

**File: `src/components/Navbar.tsx` (lines 317-325)**

- Wrap both direct links in a flex container with `gap-6` or `gap-8` to create consistent, professional spacing between them and away from the Resources dropdown.
- Increase the left margin on the wrapper (e.g., `ml-10`) to separate them from the Resources dropdown.
- Remove individual `ml-8` from each link since the parent flex gap will handle spacing.

Updated markup:
```html
{/* Direct Links */}
<div className="flex items-center gap-6 ml-10">
  <Link to="/how-it-works" className="text-sm font-medium text-white/80 hover:text-white transition-colors relative group">
    {t('nav.howItWorks')}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
  </Link>
  <Link to="/about#compliance" className="text-sm font-medium text-white/80 hover:text-white transition-colors relative group">
    {t('nav.compliance')}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
  </Link>
</div>
```

This ensures clear, even spacing between the two links and proper separation from the Resources dropdown for a clean, professional look.

