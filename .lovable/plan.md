

## Security and System Page + "Worried about security?" Button

### Overview
Create a premium, Apple-style "Security & System" page at `/security` and add a navigation button below the Account Type section on the How It Works page.

---

### 1. Add Button to AccountTypeSection

**File: `src/components/how-it-works-page/AccountTypeSection.tsx`**

Below the existing paragraph text ("Whether you manage 1 or 25+..."), add a button:
- Text: "Worried about security? Click here"
- Uses `navigate('/security')` on click
- Styled with outline variant, includes a right arrow icon
- Animated fade-in on scroll

---

### 2. Create the Security Page

**New file: `src/pages/Security.tsx`**

A full premium page with deep navy (#021a42) background and PayTap pink (#f6245b) accents. Six sections:

**Section 1 -- Hero**
- Deep navy background
- Large headline: "Security Built for Vehicles. Control Built for Owners."
- Subtext about bank-grade infrastructure, physical tap-only, full owner control
- CTA: "See How It Works" (scrolls down)
- Subtle animated NFC wave glow effect using framer-motion

**Section 2 -- Core Security Block (4 Cards Grid)**
- 4 minimal rounded cards with icons and one-line descriptions
- Physical Tap Only / Registered POS Required / Instant Owner Alerts / On/Off Control
- Cards fade-in on scroll using framer-motion + useInView
- White cards on dark background

**Section 3 -- Snake Flow Security Diagram (Main Highlight)**
- Title: "How Paytap Protects Every Vehicle"
- Vertical flow with a connecting pink (#f6245b) animated line
- 6 step cards connected by the line, each with bullet points
- Steps: Business Onboards -> Secure Account Created -> Dashboard Activated -> Tag Installed -> Controlled Spending -> Real-Time Protection
- Final bubble: "No Cash. No Blind Spending. Full Control."
- The connecting line animates as user scrolls (using framer-motion scroll progress)
- On mobile, becomes a simple vertical stack

**Section 4 -- "What If" Objection Accordion**
- Uses existing Radix Accordion component
- 3 questions: tag tapped while parked, tag stolen, remote hack
- Clean minimal expand/collapse with clear answers
- Dark background, white text

**Section 5 -- Trust Section**
- Subtle section with RuPay/NPCI trust line
- Uses existing RBIIcon and NPCIIcon components
- Text: "Paytap operates on RuPay payment infrastructure governed by NPCI"

**Section 6 -- Closing CTA**
- Large centered text: "Your Fleet. Your Rules. Your Money."
- Subtext about being safer than cash
- CTA button: "Activate Your Fleet" linking to /checkout

---

### 3. Add Route

**File: `src/App.tsx`**

- Import the new Security page
- Add route: `<Route path="/security" element={<Security />} />`

---

### Technical Details

- Uses framer-motion for scroll-triggered animations (fade-in, slide-up, line drawing)
- Snake line uses `useScroll` + `useTransform` from framer-motion to animate a vertical line's `scaleY` based on scroll progress
- Accordion from existing `@radix-ui/react-accordion` (already installed)
- Existing icon components (RBIIcon, NPCIIcon) reused in trust section
- Navbar and FooterSection components reused for consistent layout
- Fully responsive -- snake becomes vertical stack on mobile
- Brand colors: bg-[#021a42] for dark sections, text-[#f6245b] for accent lines/highlights
- Helmet for SEO metadata

