

## Remove "Choose Your Deployment Model" Section

The `TrustSection` component renders the "Choose Your Deployment Model" section. It's imported and used in `src/pages/Index.tsx` on line 47.

### Changes:

**File: `src/pages/Index.tsx`**
- Remove the `TrustSection` import (line 7)
- Remove `<TrustSection />` usage (line 47)

This cleanly removes the section from the home page. The `TrustSection.tsx` file itself can remain in the codebase in case it's needed later.

