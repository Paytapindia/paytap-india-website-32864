

## Plan: Redesign About Page to Investor-Grade Premium Standard

Complete rewrite of `src/pages/About.tsx` — same content, elevated design. Single file change.

### Design System

- **Colors**: White (#ffffff) base, Navy (#021a42) for dark hero + contrast sections, Red (#f6245b) used sparingly (thin accent lines, one CTA button only)
- **Typography**: Two weights only — bold (700) for headlines, regular (400) for body. Headlines 48-64px desktop, body 18-20px with text-gray-500 for softness
- **Spacing**: 96-120px vertical gaps between sections. Internal padding 48-64px
- **Max-width**: 1080px content container for tighter, magazine-like feel

### Structure (Section by Section)

**1. Navigation Header**
- Remove the current sticky header with Building2 icon — use the site's existing Navbar instead (the page should integrate into the main site navigation, not have its own header)

**2. Hero** — Full-width navy (#021a42) background
- Center-aligned, generous vertical padding (py-28 md:py-40)
- Small uppercase tracking-widest label: "ABOUT PAYTAP" in white/60 opacity
- Main headline: 48px mobile / 64px desktop, font-bold, white, max-w-4xl
- Single subtitle paragraph beneath, text-lg, white/70, max-w-2xl
- No second paragraph — move the platform description to the next section
- Subtle bottom fade gradient into white

**3. Why We Exist** — White background, left-aligned
- Section label: small uppercase tracking text in #f6245b
- Headline: 36-40px bold, text-[#021a42]
- Two paragraphs with comfortable line-height (leading-relaxed), text-gray-500
- No card wrapper, no shadow — just clean typography on white

**4. What We Power** — Slight off-white (#fafafa) background for contrast
- Same label + headline pattern
- Intro paragraph, then 3-column grid (stacks on mobile)
- Cards: no border, no shadow — just a thin top border accent in #f6245b (2px)
- Icon above title, clean bullet list beneath
- Scale stat ("8 lakh+ terminals") as a standalone centered statement below cards, large text, font-semibold

**5. Our Platform** — White background
- 2x2 grid of capability blocks
- Each block: icon (small, 24px, gray-400), bold title, single-line description
- Clean flat layout, no card borders — separated by generous spacing
- "In Development" tag as a subtle inline pill/badge

**6. Our Story** — Navy (#021a42) full-width section for visual contrast break
- White text, center-aligned
- Three short paragraphs with comfortable spacing
- Creates rhythm break in the scroll

**7. What Makes Paytap Different** — White background
- 2x2 grid, same flat style as Platform section
- Thin left border accent (#f6245b, 3px) on each item instead of card
- Title + single paragraph per item

**8. Our Vision** — White background, center-aligned
- Large italic or medium-weight quote-style text
- Subtle horizontal line above and below (thin, gray-200)
- Feels like a manifesto statement

**9. Company Information** — Clean, document-like
- Two-column layout: Legal Info | Registered Office
- Small text, structured like a formal document
- Thin top border separator, no card/shadow

**10. Final CTA** — Minimal, centered
- Short headline + one-line subtitle
- Single button: bg-[#f6245b], clean rounded corners
- Generous whitespace around it

### Animations
- Intersection Observer-based fade-in (opacity 0 -> 1, translateY 20px -> 0) on each section
- 0.6s duration, ease-out, triggered once when section enters viewport
- No heavy libraries — simple useEffect + IntersectionObserver hook

### Responsive
- All grids collapse to single column on mobile
- Hero padding reduces (py-20 on mobile)
- Section spacing reduces to 64-80px on mobile
- Typography scales down proportionally (text-3xl mobile headlines)

### Technical Details
- Remove the custom sticky header — the page will use the site's main Navbar (already rendered by the router layout)
- Include Navbar and FooterSection imports if they're not already in the layout
- Add a reusable `useInView` hook or inline IntersectionObserver for fade-in animations
- All content preserved exactly as-is, just restructured visually

**File:** `src/pages/About.tsx` (full rewrite)

