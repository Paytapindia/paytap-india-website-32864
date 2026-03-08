

## Plan: Create Admin Data-Fetching Edge Functions

### What's happening
This is the original landing page project with the real orders database. We need to create 3 edge functions here that the admin dashboard (remix project) can call to fetch data.

### Prerequisites
- One new secret: `ADMIN_API_KEY` — you pick any random string (e.g. `my-super-secret-key-123`). You'll add the same value in your admin dashboard project later.

### Files to create

**`supabase/functions/fetch-orders/index.ts`**
- Validates `X-Admin-Key` header against `ADMIN_API_KEY` secret
- Queries `orders` table using service role (bypasses RLS)
- Supports query params: `status`, `search`, `limit`, `offset`
- Returns orders sorted by `created_at` desc

**`supabase/functions/fetch-leads/index.ts`**
- Same auth pattern
- Returns all leads with `limit`/`offset`

**`supabase/functions/fetch-corporate-registrations/index.ts`**
- Same auth pattern
- Returns all corporate registrations

### Config change
Add `verify_jwt = false` for all 3 functions in `supabase/config.toml` (since the admin dashboard won't have a valid JWT for this project — auth is via the shared API key instead).

### No changes to
- Landing page UI, checkout, or any frontend code
- Existing edge functions (`create-payment`, `verify-payment`)
- Database tables or RLS policies

### Steps
1. Request the `ADMIN_API_KEY` secret from you
2. Create the 3 edge functions
3. Update config.toml

