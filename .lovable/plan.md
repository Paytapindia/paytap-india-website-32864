

## Revamp "How It Works" Page — Premium Dark Theme (Matching /security)

### Overview
Complete rewrite of `src/pages/HowItWorks.tsx` as a single-file page (same pattern as Security.tsx). All existing `src/components/how-it-works-page/` component files will be left in place (not deleted) but will no longer be imported. The new page uses the same dark navy (#021a42) background, #f6245b accents, glassmorphic cards, and framer-motion scroll animations established on the Security page.

---

### Page Structure (8 Sections, all inside one file)

**Section 1 — Hero**
- Dark bg, NFC wave glow animation (same rings as Security hero)
- Headline: "Your Vehicle Can Now Pay on Its Own."
- Sub: "One dashboard. Full control. Real-time visibility."
- Primary CTA: "Get Started" -> /checkout
- Secondary: "See How It Works" -> smooth scroll to next section
- Scroll hint chevron at bottom

**Section 2 — Problem (Scroll Reveal)**
- Lines appear sequentially using staggered `whileInView` animations
- "It starts with one vehicle. Then five. Then confusion."
- Bullet points fade in: drivers calling for fuel, toll, WhatsApp approvals, etc.
- Final bold line with #f6245b accent: "If you don't control vehicle spend, it controls your business."

**Section 3 — Solution Transformation**
- Two-column layout (stacks on mobile)
- Left: "chaos" bullets with X icons (red tint)
- Right: "control" bullets with Check icons (green/accent tint)
- Headline: "What if all that chaos became one clean dashboard?"
- Feature bullets: Tap-to-Pay NFC, works online+offline, central dashboard, employee access, vehicle-wise tracking
- Footer: "Paytap turns vehicle expenses into a system — not a struggle."

**Section 4 — Security Highlight**
- Dark bg, white icons
- Headline: "Built Like a Bank. Designed for Vehicles."
- 5 minimal bullet items with icons (no paragraph text)
- Closing: "Your vehicle isn't just moving. It's transacting."

**Section 5 — How It Works (Interactive Horizontal Flow)**
- Title: "How It Works"
- 6 steps in a horizontal scroll/flow on desktop (vertical on mobile)
- Connecting animated line between steps using framer-motion scroll
- Steps: Create Account -> Assign Vehicles -> Load Balance -> Set Limits -> Vehicle Pays -> You Relax
- Bottom text: "One connected ecosystem. Zero manual work."

**Section 6 — Account Types (3 Pricing Cards)**
- Three floating glassmorphic cards side by side (stack on mobile)
- Personal: up to 5 vehicles, Rs.1000 activation, 1 tag included, Rs.999 yearly
- Business (highlighted with #f6245b border glow): up to 20 vehicles, Rs.1000 activation, 1 tag, Rs.1999 yearly
- Corporate: Rs.4999 activation, central dashboard, employee limits, enterprise controls
- Hover effect: card lifts (translateY) + subtle glow
- Each card has "Get Started" CTA -> /checkout

**Section 7 — KYC Limits**
- Minimal 3-column layout
- Min KYC: Rs.10,000/month | Full KYC: Rs.2,00,000/month | Corporate: No overall limit
- Clean typography, no clutter

**Section 8 — Final CTA**
- "Ready to Let Your Vehicle Pay for Itself?"
- Two buttons: "Activate Account" -> /checkout, "Talk to Sales" -> opens contact/support
- Subtle background gradient glow animation

---

### Technical Approach

**File changes:**
1. **`src/pages/HowItWorks.tsx`** — Complete rewrite as a single file with all sections inline (same architecture as Security.tsx). Removes all imports of old how-it-works-page components. Uses Navbar, FooterSection, Helmet, framer-motion, lucide icons, Button, and useNavigate.

2. **No route changes needed** — `/how-it-works` route already exists in App.tsx.

3. **Old component files left untouched** — The files in `src/components/how-it-works-page/` won't be deleted (they may be referenced elsewhere), they just won't be imported by the new page.

**Design tokens (matching Security.tsx):**
- Background: `bg-[#021a42]`
- Accent: `text-[#f6245b]`, `bg-[#f6245b]`
- Cards: `bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl`
- Text: `text-white`, `text-white/70`, `text-white/60`
- Buttons: `bg-[#f6245b] hover:bg-[#f6245b]/90 text-white rounded-full`

**Animations:**
- NFC wave glow rings (same as Security hero)
- `whileInView` fade/slide for each section
- Staggered delays for list items
- Scroll-linked step connector line using `useScroll` + `useTransform`
- Card hover `whileHover={{ y: -8 }}` lift effect

**SEO:**
- Updated Helmet title/description
- Semantic headings (h1 for hero, h2 for sections)

