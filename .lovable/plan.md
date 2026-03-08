

## Next Step: Set Up ADMIN_API_KEY Secret and Create Edge Functions

### Step 1 — Add the ADMIN_API_KEY secret
I'll use the `add_secret` tool to prompt you to enter a value. You can use any random string — for example: `paytap-admin-2025-secure` or any passphrase you prefer.

### Step 2 — Create 3 Edge Functions

**`supabase/functions/fetch-orders/index.ts`**
- Validates `X-Admin-Key` header against `ADMIN_API_KEY`
- Queries `orders` table with optional `status`, `search`, `limit`, `offset` params
- Returns JSON array of orders sorted by `created_at` desc

**`supabase/functions/fetch-leads/index.ts`**
- Same auth pattern, returns leads

**`supabase/functions/fetch-corporate-registrations/index.ts`**
- Same auth pattern, returns corporate registrations

### Step 3 — Update config.toml
Add `verify_jwt = false` for all 3 functions (auth is via the shared API key, not JWT).

### No changes to
- Landing page, checkout, or any frontend code
- Existing `create-payment` / `verify-payment` edge functions
- Database tables or RLS policies

