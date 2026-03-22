

## Plan: Reorder Featured Articles in Newsroom

Swap the order of the first two items in the `featuredArticles` array and the `pressArticles` array in `src/pages/Newsroom.tsx`.

### Changes in `src/pages/Newsroom.tsx`

**1. `featuredArticles` array (lines 151-173):**
- Move "Beyond Personal Payments" (currently 2nd) to **1st position**
- Move "Contactless Payment Tags" to **2nd position**
- Move "MyFleet AI" (currently 1st) to **3rd position**

**2. `pressArticles` array (lines 9-18):**
- Move the "Beyond Personal Payments" entry (lines 19-27) to 1st position with `featured: true`
- Move the "MyFleet AI" entry (lines 10-18) to after it

This ensures "Beyond Personal Payments" is the first article users see when landing on the Newsroom page.

**File:** `src/pages/Newsroom.tsx`

