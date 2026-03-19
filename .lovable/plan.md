

## Plan: Move "How It Works" from top nav into Resources dropdown

### Changes in `src/components/Navbar.tsx`

**Desktop nav (lines 243-253):**
- Remove the "How It Works" direct link (lines 245-248)
- Keep only "Compliance" as a direct link

**Desktop Resources dropdown (lines 191-237):**
- Add "How It Works" as the first item in the Resources dropdown, linking to `/how-it-works` with subtitle "Step-by-step guide"

**Mobile nav (lines 372-379):**
- Remove the standalone "How It Works" direct link

**Mobile Resources section (lines 399-422):**
- Add "How It Works" as the first item inside the Resources expandable section

Single file change: `src/components/Navbar.tsx`

