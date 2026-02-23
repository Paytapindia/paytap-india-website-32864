
# Rework the How It Works Page

## Overview
Complete overhaul of the `/how-it-works` page to follow the new user journey: a vehicle-owner-focused conversion flow with problem hooks, audience targeting, product showcase with interactive NFC/Card selector, setup steps, scaling section, outcome summary, MyFleet AI bonus, comparison strip, and a strong CTA closing.

## New Page Structure (10 Sections)

### 1. Hero Hook (replaces current header)
- Headline: "Stop Giving Drivers Cash. Start Controlling Vehicle Money."
- Subtext: "India's smartest vehicle payment system for owners who want visibility, limits, and control -- not chaos."
- Bold, full-width section with gradient background and subtle vehicle/payment imagery

### 2. Problem Hook Section (NEW)
- Headline: "Vehicle Expenses Are Leaking Money Every Day"
- 5 pain points with red/warning-style icons: Cash handled by drivers, No spending limits, No proof of payments, No real-time tracking, Fraud risk
- Closing line: "If you don't control payments, you don't control costs."

### 3. Who It's For Section (NEW)
- Headline: "Built for Anyone Managing Vehicles"
- 5 audience cards: Independent vehicle owners, Fleet operators, Logistics businesses, Transport companies, Corporates managing drivers
- Closing: "If money moves through vehicles, PayTap manages it."

### 4. Account Type Selector (reworked CreateAccountStep)
- Headline: "Choose Your Account Type"
- Two interactive cards: Individual Account vs Business/Corporate Account
- Each with distinct benefits listed
- Bottom tagline: "No paperwork. No waiting. No bank visits."

### 5. Payment Tools Section (reworked DeployTagsStep)
- Headline: "PayTap Gives You Two Powerful Tools"
- Interactive toggle/scroller between NFC Payment Tag and Virtual Prepaid Card
- NFC: "Tap-to-pay for fuel, tolls, repairs, driver expenses"
- Card: "Pay online for FASTag recharge, Insurance, Servicing, Vehicle purchases"
- Shows product image (existing assets: paytap-tag-sticker-v2.png / paytap-card-product.png)
- Clicking either product navigates to /checkout with pre-selected product
- Bottom tagline: "Offline + Online = Complete Payment Control"

### 6. How It Works Steps (reworked, simplified)
- Headline: "Setup takes minutes"
- 4 compact steps with icons:
  1. Install NFC tag or issue prepaid card
  2. Add money via UPI/Card/Net Banking
  3. Set limits + controls
  4. Assign driver
- Two check marks: "Payments start instantly" and "Every transaction tracked live"

### 7. Scale Section (reworked ScaleStep)
- Headline: "Managing multiple vehicles?"
- 3 steps: Order additional tags, Activate in dashboard, Assign to vehicle
- Tagline: "Add vehicles in seconds. Not days."

### 8. Outcome Section (NEW -- most important)
- Headline: "What You Get With PayTap" / Subhead: "One Dashboard. Total Control."
- 6-item feature grid with check marks: Centralized vehicle expense management, Real-time transaction visibility, Driver spending limits, Fraud protection, Digital records for accounting, Multi-vehicle wallet system

### 9. MyFleet AI Bonus Section (NEW)
- Headline: "Included: MyFleet AI Access"
- Subhead: "Your intelligent fleet command center"
- 4 features: Vehicle tracking, Cost analytics, Maintenance alerts, Performance insights
- Closing: "PayTap doesn't just process payments. It runs your fleet."

### 10. Comparison Strip + CTA (NEW)
- Visual comparison table: Without PayTap vs With PayTap (Cash payments vs Digital tracking, No limits vs Custom limits, No proof vs Live records, Driver control vs Owner control)
- Viral closing: "Drivers Spend. Owners Stay in Control."
- CTA: "Take Control of Your Vehicle Payments Today"
- Two buttons: "Start Free" (links to /checkout) and "Book Demo" (opens contact form)

## Technical Details

### Files to Create (new section components)
- `src/components/how-it-works-page/HeroHookSection.tsx` -- Hero with headline and subtext
- `src/components/how-it-works-page/ProblemHookSection.tsx` -- Pain points section
- `src/components/how-it-works-page/AudienceSection.tsx` -- Who it's for cards
- `src/components/how-it-works-page/AccountTypeSection.tsx` -- Individual vs Business selector
- `src/components/how-it-works-page/PaymentToolsSection.tsx` -- Interactive NFC/Card toggle with images and checkout link
- `src/components/how-it-works-page/SetupStepsSection.tsx` -- Simplified 4-step flow
- `src/components/how-it-works-page/ScaleSection.tsx` -- Reworked scale section
- `src/components/how-it-works-page/OutcomeSection.tsx` -- "What You Get" feature grid
- `src/components/how-it-works-page/MyFleetBonusSection.tsx` -- MyFleet AI promo
- `src/components/how-it-works-page/ComparisonCTASection.tsx` -- Comparison strip + CTA buttons

### Files to Modify
- `src/pages/HowItWorks.tsx` -- Replace all current sections with the new 10-section layout, update SEO meta, remove old imports, update progress indicator to 10 steps

### Files That Become Unused (can be deleted)
- `CreateAccountStep.tsx`, `ConfigureControlsStep.tsx`, `DeployTagsStep.tsx`, `MonitorStep.tsx`, `ScaleStep.tsx`, `PlatformAccessBanner.tsx`, `HeroStep.tsx`, `ActivateAccountStep.tsx`, `ChoosePaymentStep.tsx`, `VirtualCardStep.tsx`

### Patterns Used
- Reuse `ScrollSection` wrapper for all sections (fade-in on scroll)
- Reuse `ProgressIndicator` with updated step count
- Framer Motion for animations (consistent with existing approach)
- Existing product images from `src/assets/`
- React Router `Link` for checkout navigation with query params (product=tag or product=card)
- Mobile-first responsive grid layouts
- Navy/primary color scheme per brand guidelines
