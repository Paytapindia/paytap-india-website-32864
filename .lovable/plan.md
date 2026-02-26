

## Redesign Checkout Page: Account Type Selection Flow

### Overview
Replace the current "Choose Plan" + "Choose Platform Plan" (Starter/Growth) two-step selector with a single "Choose Your Account Type" section featuring Personal (₹999) and Business (₹1,998) account cards, each with distinct benefits, conditional form fields, and dynamic payment summary.

### File: `src/pages/Checkout.tsx`

### Structure Changes

**1. Replace account type state (remove `quantity`, add `accountType`)**
- New state: `accountType: 'personal' | 'business'` (default: `'personal'`)
- Personal = 1 unit, ₹999 | Business = 2 units, ₹1,998
- Keep `productType` (sticker/card) selection as-is (the product image selector stays)

**2. Update Zod schema — add conditional fields**
- Add optional `pan` field (validated as 10-char alphanumeric, required when Personal)
- Add optional `gst` field (validated as 15-char GST format, required when Business)  
- Add optional `companyName` field (required when Business)
- Use `.superRefine()` to conditionally validate based on account type

**3. Replace the Quantity Selector section (lines 351-390) with Account Type Cards**

Layout:
```text
Choose Your Account Type

[Personal Account]          [Business Account]
 ₹999                       ₹1,998 (Recommended badge)
 - 1 Tag/Card               - 2 Tags/Cards + ₹499 each extra
 - Lifetime Platform         - Lifetime Platform
 - Smart Dashboard           - Smart Dashboard
 - Free Shipping             - MyFleet AI X Access
                             - ExpensePro Access
                             - Free Shipping

 No MyFleet AI X             
 No ExpensePro              
```

- Business card gets a "Recommended" badge
- Personal is default-selected (reduces hesitation)

**4. Replace "What's Included" box (lines 394-423)**
- Make it dynamic based on `accountType`
- Personal: show tag/card (1 unit), Lifetime Access, Dashboard, Free Shipping, plus greyed-out "No MyFleet AI X" and "No ExpensePro"
- Business: show tags/cards (2 units), additional at ₹499 each, Lifetime Access, Dashboard, MyFleet AI X, ExpensePro, Free Shipping

**5. Conditional form fields in Delivery Details section**
- Show PAN Number field when `accountType === 'personal'`
- Show GST Number + Registered Company Name fields when `accountType === 'business'`

**6. Update Payment Summary**
- "Platform Activation Fee: ₹999 / ₹1,998"
- "Shipping: FREE"
- "Total Payable Today: ₹999 / ₹1,998"

**7. Update CTA button text**
- Personal: "Activate Personal Account — ₹999"
- Business: "Activate Business Account — ₹1,998"

**8. Add trust badge below payment button**
- "Secure Payment - One-time fee - No hidden charges" with lock icon

**9. Move product images (NFC Tag / Prepaid Card) below account type selection**
- After user selects account type, they then pick the product (tag vs card) — keep existing product selector but move it below the account type cards

### Technical Details

- `quantity` will be derived from `accountType` (personal=1, business=2) instead of being independently set
- Payment link logic stays the same (`sticker_1`, `sticker_2`, etc.)
- Database insert will include `pan` or `gst`/`company_name` — will need to add these columns to the `orders` table via migration
- The `orders` table needs new nullable columns: `pan TEXT`, `gst TEXT`, `company_name TEXT`, `account_type TEXT`

### Database Migration
Add columns to the `orders` table:
```sql
ALTER TABLE public.orders 
  ADD COLUMN IF NOT EXISTS account_type text,
  ADD COLUMN IF NOT EXISTS pan text,
  ADD COLUMN IF NOT EXISTS gst text,
  ADD COLUMN IF NOT EXISTS company_name text;
```

### Flow Summary
```text
Choose Your Account Type (section header)
  -> Personal / Business cards
Choose Plan (existing product selector)  
  -> NFC Tag / Prepaid Card with images
What's Included (dynamic)
Payment Summary (dynamic)
Delivery Details + conditional PAN/GST fields
CTA: Activate [Personal/Business] Account
Trust badges
```

