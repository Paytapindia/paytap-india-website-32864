

## Fix: Checkout Order Creation Blocked by RLS

### Root Cause

The `orders` table has only two RLS policies:
1. `No public read access to orders` — blocks all SELECT for public
2. `Service role can manage orders` — allows ALL but only for `service_role`

The checkout page (`src/pages/Checkout.tsx` line 354) inserts orders directly via `supabase.from('orders').insert(...)` using the **anon** client. Since there's no INSERT policy for `anon`, the insert is silently denied by RLS, causing the "Failed to save order" error. The `FORCE ROW LEVEL SECURITY` migration made this apply even to table owners.

### Fix

Add a restrictive INSERT policy for `anon` and `authenticated` roles on the `orders` table, with validation constraints (similar to the `leads` table pattern):

```sql
CREATE POLICY "Anon can insert orders"
ON public.orders
FOR INSERT
TO anon, authenticated
WITH CHECK (
  payment_status = 'pending'
  AND amount > 0
  AND length(txnid) >= 5
  AND name IS NOT NULL
  AND phone IS NOT NULL
  AND email IS NOT NULL
);
```

This ensures:
- Only `pending` status orders can be created (no one can insert a "success" order directly)
- Basic field validation at the database level
- No read/update/delete access for anon — that stays service_role only

### Files Changed

| Action | File |
|--------|------|
| Migration | Add INSERT policy for anon on `orders` table |

No code changes needed — the checkout page code is correct, it just needs the RLS policy to allow the insert.

