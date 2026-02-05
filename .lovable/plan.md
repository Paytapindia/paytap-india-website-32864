

## Plan: Restructure Footer to Enterprise Fintech Platform Positioning

### Overview
Complete overhaul of the footer to align with the new platform-first positioning, removing "order/stick/setup" language and adding enterprise-grade, procurement-friendly content with clear regulatory signals.

---

### Current Footer Structure (4 columns)
1. Company Info (logo, description, contact, address)
2. "Get Paytap" (order button, D2C messaging)
3. Quick Links (mixed legal/product links)
4. Stay Connected (social + newsletter)

### New Footer Structure (4 columns)
1. **Company Info** (logo, platform tagline, contact, full corporate details + PPI partner)
2. **Platform** (product/enterprise links)
3. **Resources** (support/legal links)
4. **Stay Connected** (social + newsletter)

---

### Detailed Changes

#### Column 1: Company Info

**Current Description:**
```
"India's most trusted contactless payment solution for modern businesses."
```

**New Description:**
```
"A fintech infrastructure platform for payment control and mobility-led enterprise transactions."
```

**Current Contact:**
- Bengaluru, India
- +91 9900010964
- support@paytap.co.in

**New Contact (updated label):**
- "Head Office — Bengaluru, India"
- +91 9900010964
- support@paytap.co.in

**Current Corporate Details:**
```
Paytap is a product of
Drivetap Innovation India Private Limited
No 1 Level 15 UB City Concorde Tower 1
Vittal Mallya Road Rajbhavan
Bengaluru 560001
GSTIN: 29AALCD4626M1Z3
```

**New Corporate Details:**
```
Paytap is a product of:
DriveTap Innovation India Pvt. Ltd.
Level 15, Concorde Towers
1 Vittal Mallya Road, UB City
Bengaluru – 560001
Karnataka, India

GSTIN: 29AALCD4626M1Z3
PPI Partner: Transcorp International Ltd. (RBI-authorized)
```

---

#### Column 2: Platform (replaces "Get Paytap")

**Current:**
- "Get Paytap" header
- "Order Your Paytap" button
- D2C messaging box ("Stick it once...", "Setup in 5 minutes")

**New:**
- **Header:** "Platform"
- **Links:**
  - About Paytap → `/about`
  - How It Works → `/how-it-works`
  - Pricing → `/checkout`
  - Compliance & Security → `/about` (scroll to compliance section)
  - Partner with Us → `/support`

Remove the D2C order button and messaging box entirely.

---

#### Column 3: Resources (replaces mixed Quick Links)

**Current Header:** "Quick Links"

**New Header:** "Resources"

**New Links:**
- Newsroom → `/newsroom`
- Documentation → `/support` (or external docs if available)
- Support → `/support`
- Terms of Service → `/terms-and-conditions`
- Privacy Policy → `/privacy-policy`
- Refund & Cancellation → `/cancellation-refunds`

Remove Shipping Policy link (less enterprise-relevant).

---

#### Column 4: Stay Connected

**Current Subtitle:**
```
"Follow us for updates and tips"
```

**New Subtitle:**
```
"Follow Paytap for platform updates and fintech insights"
```

Keep social icons and newsletter as-is.

---

#### Footer Bottom Bar

**Current:**
```
Copyright © 2025 Paytap. All rights reserved.
Made with ❤️ in India | All systems operational
```

**New:**
```
© 2025 Paytap — DriveTap Innovation India Pvt. Ltd. All rights reserved.
Built in India for regulated, scalable financial infrastructure.
```

Keep the "All systems operational" status indicator.

---

### File to Modify

| File | Changes |
|------|---------|
| `src/components/FooterSection.tsx` | Complete restructure of all 4 columns + bottom bar |

---

### Translation Updates

Update `en.json` footer section:
```json
{
  "footer": {
    "description": "A fintech infrastructure platform for payment control and mobility-led enterprise transactions."
  }
}
```

---

### Summary of Transformation

| Before | After |
|--------|-------|
| "Get Paytap" column | "Platform" links column |
| "Order Your Paytap" button | Removed (no D2C CTA) |
| "Stick it once..." messaging | Removed |
| "Quick Links" | "Resources" |
| "Follow us for updates and tips" | "Follow Paytap for platform updates and fintech insights" |
| "Made with love in India" | "Built in India for regulated, scalable financial infrastructure" |
| Missing PPI partner | Added "PPI Partner: Transcorp International Ltd. (RBI-authorized)" |
| "Shipping Policy" link | Removed |
| "Compliance & Security" | Added |
| "Partner with Us" | Added |

