

## Plan: Create Edge Functions for Admin Dashboard Data Fetching

### Context
This is the **live landing page** project with real orders in the database. The separate admin dashboard project needs to fetch this data. We'll create secure edge functions here that the admin dashboard can call.

### Edge Functions to Create

**1. `fetch-orders`** — Returns all orders with optional filters
- Query params: `status` (filter by payment_status), `search` (name/phone/email), `limit`, `offset`
- Uses service_role key to bypass RLS
- Secured via a shared API secret (`ADMIN_API_KEY`) passed in the request header

**2. `fetch-leads`** — Returns all leads
- Query params: `limit`, `offset`
- Same auth mechanism

**3. `fetch-corporate-registrations`** — Returns all corporate registrations
- Same pattern

### Security
- `verify_jwt = false` in config.toml (since the admin dashboard is a different project, it won't have a valid JWT for this project)
- Instead, each function validates a shared secret: `X-Admin-Key` header must match an `ADMIN_API_KEY` secret stored in this project
- You'll set the same key in both projects

### What You Need to Provide
- An `ADMIN_API_KEY` secret — a random string you choose. You'll add it here and also in your admin dashboard project so it can authenticate.

### Files

| File | Action |
|------|--------|
| `supabase/functions/fetch-orders/index.ts` | Create — returns orders with filters |
| `supabase/functions/fetch-leads/index.ts` | Create — returns leads |
| `supabase/functions/fetch-corporate-registrations/index.ts` | Create — returns corporate registrations |
| `supabase/config.toml` | Add `verify_jwt = false` for the 3 new functions |

### No Changes To
- Landing page, checkout, or any frontend code
- Existing edge functions
- Database tables or RLS policies

