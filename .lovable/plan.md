

## Create New Admin Login

**Goal**: Register `support@paytap.co.in` as an admin user with dashboard access.

### Steps

1. **Create an edge function** `create-admin-user/index.ts` that:
   - Uses the service role client to call `supabase.auth.admin.createUser()` with the provided email and password (auto-confirmed)
   - Inserts a row into `user_roles` with `role = 'admin'` for the new user
   - Is protected by the `ADMIN_API_KEY` secret (already configured) so only authorized callers can invoke it
   - Is a one-time-use utility — can be deleted after execution

2. **Invoke the function** via `curl_edge_functions` to create the user and assign the admin role in one call.

3. **Delete the edge function** after successful execution (it's a one-time setup script).

### Security Notes
- Password is set server-side using Supabase Admin API (service role)
- User is auto-confirmed (no email verification needed for admin accounts)
- Admin role is assigned in `user_roles` table, checked by the existing `has_role()` function
- **Recommend changing the password** after first login since it was shared in chat

