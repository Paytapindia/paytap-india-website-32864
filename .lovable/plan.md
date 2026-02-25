

## Update Checkout Quantity Selector with Plan Names + Business CTA

**File: `src/pages/Checkout.tsx`**

### Changes to the Quantity Selector section (lines 351-380):

1. **Keep the heading** "How many do you need?" (already present).

2. **Rename quantity options to plan names**:
   - 1 Tag / ₹999 becomes **"Starter"** — 1 Tag — ₹999
   - 2 Tags / ₹1,998 becomes **"Growth"** — 2 Tags — ₹1,998

3. **Add a third option: "Business" button** below the two plan buttons:
   - Styled as an outline/secondary button with text like "For Business Account"
   - Clicking it navigates the user to `/corporate-registration`
   - This is not a selectable quantity — it's a redirect CTA

### Visual Layout:
```text
How many do you need?

[Starter]        [Growth]
 1 Tag            2 Tags
 ₹999             ₹1,998

[For Business Account →]
  (redirects to /corporate-registration)
```

### Technical Details:
- The Starter and Growth buttons retain the same functionality (setting quantity to 1 or 2)
- The Business button uses `navigate('/corporate-registration')` on click
- Styled consistently with the existing card-style selectors
