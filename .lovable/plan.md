

## Change "Talk to Sales" Button to "FAQ" on How It Works Page

**Change**: Replace the "Talk to Sales" button at line 756 with an "FAQ" button that navigates to `/faq`.

**File**: `src/pages/HowItWorks.tsx`
- Replace `Phone` icon with `HelpCircle` from lucide-react
- Change label from "Talk to Sales" to "FAQ"
- Replace `onClick={() => openContactForm()}` with `onClick={() => navigate('/faq')}`

Single-line change, no other files affected.

