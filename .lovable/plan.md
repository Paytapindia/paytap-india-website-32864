

## Changes

### 1. Move "Platform Access & Deployment" above Step One
The PlatformAccessBanner section will be moved from the bottom of the page to right after the header and before the CreateAccountStep (Step One). This way users see pricing/platform access info first before diving into the step-by-step flow.

### 2. Fix navigation spacing between "How It Works" and "Compliance"
The direct links after the Resources dropdown currently use `ml-6` for spacing, but they appear cluttered. Will increase the margin and add proper spacing between these two items so they read as distinct, separate links.

---

### Technical Details

**File: `src/pages/HowItWorks.tsx`**
- Move the `<PlatformAccessBanner />` Suspense block from after ScaleStep (line 96-98) to before `<CreateAccountStep />` (line 83), placing it right after the header section.

**File: `src/components/Navbar.tsx`**
- On lines 318-325, increase spacing on the "How It Works" and "Compliance" direct links (e.g., change `ml-6` to `ml-8`) to ensure clear visual separation between these nav items and the Resources dropdown.

