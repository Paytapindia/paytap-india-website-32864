

## Remove Corporate Registration Page & Redirect Business Account to Checkout

### Changes

**1. `src/components/how-it-works-page/AccountTypeSection.tsx`** — Line 43
- Change `onClick={() => navigate('/corporate-registration')}` to `onClick={() => navigate('/checkout')}`

**2. `src/App.tsx`** — Remove the `/corporate-registration` route
- Delete the route: `<Route path="/corporate-registration" element={<CorporateRegistration />} />`
- Remove the import: `import CorporateRegistration from "./pages/CorporateRegistration";`

**3. Optionally delete** `src/pages/CorporateRegistration.tsx` (the file is no longer needed since no route points to it)

This way, clicking "Business / Corporate Account" on the How It Works page will take users directly to the checkout page instead of the old registration form.

