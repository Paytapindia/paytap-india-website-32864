

## Plan: Auto-fill returning customer details and skip to payment

When a user enters their name and phone on Step 2, the system checks if they have a previous order. If found, it auto-fills all their details and skips them directly to Step 4 (Review & Pay).

### Why an Edge Function is needed

The `orders` table has RLS that blocks public SELECT. A backend function is required to securely look up previous orders by phone number.

### Changes

**1. New Edge Function: `supabase/functions/lookup-customer/index.ts`**
- Accepts `{ phone }` in POST body
- Queries `orders` table (via service role) for the most recent completed/confirmed order matching that phone
- Returns: `{ found: true, customer: { name, email, address, city, state, pincode, pan, gst, companyName, accountType, productType } }` or `{ found: false }`
- Only returns non-sensitive shipping/billing fields, no payment data

**2. Update `src/pages/Checkout.tsx`**
- After Step 2 fields (name + phone) are filled and user clicks "Next":
  - Before advancing to Step 3, call the `lookup-customer` edge function with the phone number
  - If a match is found:
    - Auto-fill all form fields (email, address, city, state, pincode, PAN, GST, company name)
    - Auto-set the plan/product type from previous order
    - Show a toast: "Welcome back! We've loaded your details."
    - Skip directly to Step 4 (Review & Pay)
  - If no match, proceed normally to Step 3
- Add a small "Edit Details" link on Step 4 that lets returning users go back to Step 3 if they want to update anything

### Security
- Edge function uses service_role to query orders (bypasses RLS safely server-side)
- No sensitive payment data (payu_response, txnid) is returned
- Rate limiting via standard edge function constraints

