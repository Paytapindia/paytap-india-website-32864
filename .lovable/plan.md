

## Plan: Fix Platform Login Button Styling

### Issues Identified

| Issue | Location | Current State |
|-------|----------|---------------|
| Desktop button is white/outline | Line 331-337 | `variant="outline"` with white border |
| Mobile button is outline style | Line 528-537 | Outline with dark border/text |
| Brand guideline violation | Both | Should be red (`#f6245b`) with white text |

---

### Changes Required

#### File: `src/components/Navbar.tsx`

**1. Desktop Login Button (lines 331-337)**

Current:
```tsx
<Button
  variant="outline"
  onClick={() => window.open("https://dashboard.paytap.co.in/login", "_blank")}
  className="hidden md:inline-flex border border-white/30 text-white hover:bg-white/10 px-4 md:px-5 py-2 rounded-md text-sm font-medium transition-colors duration-200 min-h-[40px]"
>
  {t('nav.platformLogin')}
</Button>
```

New:
```tsx
<Button
  onClick={() => window.open("https://dashboard.paytap.co.in/login", "_blank")}
  className="hidden md:inline-flex bg-paytap-light hover:bg-paytap-light/90 text-white px-4 md:px-5 py-2 rounded-md text-sm font-medium transition-colors duration-200 min-h-[40px]"
>
  {t('nav.platformLogin')}
</Button>
```

**Key Changes:**
- Remove `variant="outline"`
- Replace `border border-white/30 text-white hover:bg-white/10` with `bg-paytap-light hover:bg-paytap-light/90 text-white`
- Keep `rounded-md` for enterprise styling (not pill-shaped)

---

**2. Mobile Login Button (lines 528-537)**

Current:
```tsx
<Button
  variant="outline"
  onClick={() => {
    window.open("https://dashboard.paytap.co.in/login", "_blank");
    handleNavClick();
  }}
  className="w-full mt-3 border border-paytap-dark text-paytap-dark hover:bg-paytap-dark hover:text-white py-3 rounded-md font-medium transition-colors duration-200 min-h-[48px]"
>
  {t('nav.platformLogin')}
</Button>
```

New:
```tsx
<Button
  onClick={() => {
    window.open("https://dashboard.paytap.co.in/login", "_blank");
    handleNavClick();
  }}
  className="w-full mt-3 bg-paytap-light hover:bg-paytap-light/90 text-white py-3 rounded-md font-medium transition-colors duration-200 min-h-[48px]"
>
  {t('nav.platformLogin')}
</Button>
```

**Key Changes:**
- Remove `variant="outline"`
- Replace `border border-paytap-dark text-paytap-dark hover:bg-paytap-dark hover:text-white` with `bg-paytap-light hover:bg-paytap-light/90 text-white`
- Keep `rounded-md` for consistency

---

### Visual Result

| Location | Before | After |
|----------|--------|-------|
| Desktop Header | White outline button | Red button with white text |
| Mobile Menu | Navy outline button | Red button with white text |

---

### Brand Compliance

The `paytap-light` color (`#f6245b`) is the brand's pink/coral accent color used for primary action CTAs throughout the site. This aligns with the existing CTA color differentiation strategy where the primary action color uses pink.

