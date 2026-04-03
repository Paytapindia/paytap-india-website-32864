

## Plan: Remove All MyFleet AI References from Newsroom and Press

### Files to edit

**1. `src/pages/Newsroom.tsx`**

- **pressArticles array (lines 19-27)**: Remove the MyFleet AI article entry (DailyHunt, March 4, 2026, "MyFleet AI Builds India's First Vehicle-Level Financial Operating System for Fleet Owners")
- **featuredArticles array (lines 166-172)**: Remove the third featured article about MyFleet AI

**2. `src/components/PressSection.tsx`**

- **pressArticles array (lines 8-9)**: Remove the first entry `{ publication: "DailyHunt (MyFleet AI)", url: "..." }` 
- **featuredArticles array (lines 47-53)**: Remove the third featured article about MyFleet AI

### What stays
All RuPay NFC Tag and Contactless Payment articles remain unchanged. Only entries explicitly about "MyFleet AI" are removed.

### Two files, four deletions total.

