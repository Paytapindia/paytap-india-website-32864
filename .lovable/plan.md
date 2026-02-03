
## Plan: Complete About Page Restructure with New Enterprise-Grade Content

### Overview
Complete overhaul of the About page to reflect the new enterprise-focused, infrastructure-centric messaging. This transforms the page from a consumer-friendly overview to a professional, investor/B2B-grade presentation.

---

### Changes Summary

#### 1. Header Section (Lines 17-32)
**Current:** "About Paytap" with subtitle "Reimagining Contactless Payments for India"
**New:** Update subtitle to "Architecting India's Utility & Mobility Infrastructure"

---

#### 2. Hero Section (Lines 36-48)
**Current Title:** "Building India's Utility Payment Infrastructure"
**New Title:** "Architecting India's Unified Utility & Mobility Infrastructure"

**New Subtitle:** "The Frictionless Layer for the Offline Economy"

**New Body Copy:**
- Paytap is engineering the foundational infrastructure for India's high-frequency mobility and utility sectors
- By capturing the Point of Interaction (POI), building scalable ecosystem with sovereign financial control

---

#### 3. Replace "Why We Exist" Section → "Strategic Problem-Solution" (Lines 52-65)
**New Title:** "Strategic Problem-Solution: Solving the Last-Inch Gap"

**New Content:**
- Despite digital payment surge, high-velocity environments suffer from chronic friction
- Paytap eliminates dependency layer with offline-capable transactions
- "We aren't just facilitating a payment; we are optimizing the speed of commerce"

---

#### 4. Replace "More Than Fuel & Fleets" → "The Ecosystem: Multi-Vertical Interoperability" (Lines 67-125)
**New Title:** "The Ecosystem: Multi-Vertical Interoperability"

**New Cards:**
| Card | Title | Content |
|------|-------|---------|
| 1 | Energy & Transit | Petroleum outlets, FASTag-linked tolling, NCMC-compatible Metro |
| 2 | Urban Infrastructure | Automated parking, service centers, public utility nodes |
| 3 | Mass-Market Retail | 800,000+ RuPay POS terminals, immediate nationwide scale |

---

#### 5. Replace "Our Story" → "Institutional Foundations & Compliance" (Lines 127-140)
**New Title:** "Institutional Foundations & Compliance"

**New Content:**
- Flagship infrastructure product of DriveTap Innovation India Pvt. Ltd.
- Strategic partnership with Transcorp International Ltd. (RBI-authorized PPI issuer)
- Leadership: veteran technologists and fintech architects with Tier-1 infrastructure experience

---

#### 6. Replace "What Makes Paytap Special" → "The Competitive Moat" (Lines 142-185)
**New Title:** "The Competitive Moat: What Sets Us Apart"

**New Cards:**
| Card | Title | Content |
|------|-------|---------|
| 1 | Regulatory Resilience | Fully RBI-compliant framework, top-tier security and institutional trust |
| 2 | Network Agnostic Infrastructure | Works across RuPay and NCMC network, "Zero-Friction" experience |
| 3 | Edge-Payment Capability | NFC stack removes "Connectivity Tax", works in low-network zones |

---

#### 7. Update "Our Vision" Section (Lines 187-196)
**New Content:**
"To become the definitive Transaction Layer for India's utility economy, empowering millions of users and businesses to transact with invisible, secure, and intermediary-free technology."

---

#### 8. Update "Company Information" → "Corporate Identity" (Lines 198-223)
**New Title:** "Corporate Identity"

**Simplified Format:**
- Legal Entity: DriveTap Innovation India Pvt. Ltd.
- PPI Partner: Transcorp International Ltd. (RBI Approved)
- HQ: Level 14 & 15, Concorde Towers, UB City, Bengaluru – 560001

---

#### 9. Update SEO Metadata (Lines 10-13)
- Title: "About Paytap - Architecting India's Utility & Mobility Infrastructure"
- Description: Updated to reflect infrastructure/B2B positioning

---

### New Icons Needed
Adding new icons for the updated sections:
- `Fuel` for Energy & Transit
- `ParkingCircle` for Urban Infrastructure  
- `Store` for Mass-Market Retail
- `ShieldCheck` for Regulatory Resilience
- `Network` for Network Agnostic Infrastructure
- `Wifi` or `WifiOff` for Edge-Payment Capability

---

### Technical Details

**File to Modify:** `src/pages/About.tsx`

**New Imports:**
```tsx
import { 
  ArrowLeft, Building2, Fuel, ParkingCircle, Store, 
  ShieldCheck, Network, WifiOff, Target, Zap 
} from "lucide-react";
```

**Brand Compliance:**
- All instances use "Paytap" (lowercase 't')
- Colors remain: Navy (#021a42) and Pink (#f6245b)
- Professional, enterprise tone throughout

---

### File Changes

| File | Action |
|------|--------|
| `src/pages/About.tsx` | Complete content restructure |
