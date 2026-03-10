

## Secure Admin Dashboard for PayTap

This is a large feature. I recommend building it in phases. Here is the full plan for Phase 1 (core infrastructure + all pages).

---

### Database Changes

**Migration 1 — Admin role infrastructure:**
```sql
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Service role manages roles" ON public.user_roles FOR ALL TO service_role
  USING (true) WITH CHECK (true);
```

---

### Backend Edge Functions

**1. `setup-admin/index.ts`** — One-time function to create the admin user (akshay@paytap.co.in / Paytao@9999) via Supabase Admin API and insert the admin role. Called manually once, then can be deleted.

**2. `admin-data/index.ts`** — Single edge function that validates JWT via `getClaims()`, checks admin role via `has_role()`, then returns data based on a `?type=` query param:
- `type=orders` — queries orders table (with search/filter/pagination)
- `type=leads` — queries leads table (with search/filter)
- `type=stats` — returns counts for orders, leads, corporate_registrations
- `type=corporate` — queries corporate_registrations

Uses service_role key to bypass RLS. `verify_jwt = false` in config.toml, JWT validated in code.

---

### Frontend Pages & Components

**1. Footer icon** (`FooterSection.tsx`)
- Add a tiny, low-opacity `Settings` icon next to "Get Updates" that links to `/admin-login`

**2. Admin Login page** (`src/pages/AdminLogin.tsx`)
- Clean login form (email + password)
- Calls `supabase.auth.signInWithPassword()`
- On success, redirects to `/admin-dashboard`

**3. Auth Guard** (`src/components/admin/AdminGuard.tsx`)
- Wraps all admin routes
- Checks Supabase auth session exists
- Calls `admin-data?type=verify` to confirm admin role server-side
- Redirects to `/admin-login` if unauthorized

**4. Admin Layout** (`src/components/admin/AdminLayout.tsx`)
- Sidebar with nav items: Dashboard, Orders, Leads, Analytics
- Top bar with logout button
- Main content area

**5. Dashboard pages:**

| Page | Route | Data Source | Features |
|------|-------|-------------|----------|
| Overview | `/admin-dashboard` | stats endpoint | Metric cards (orders count, leads count, revenue), recent activity feed |
| Orders | `/admin-dashboard/orders` | orders endpoint | Table with search/filter/pagination, invoice preview panel (reuses `generateInvoice.ts`), CSV export |
| Leads | `/admin-dashboard/leads` | leads endpoint | Table with search/filter, CSV export |
| Analytics | `/admin-dashboard/analytics` | stats endpoint | Simple charts via recharts (orders over time, leads by source) |

**Note:** "Users" section will show corporate registrations since there's no separate users table. The live activity feed will show recent orders/leads sorted by date.

---

### Route Setup (`App.tsx`)

```tsx
<Route path="/admin-login" element={<AdminLogin />} />
<Route path="/admin-dashboard/*" element={
  <AdminGuard>
    <AdminLayout />
  </AdminGuard>
} />
```

---

### Files Created/Modified

| Action | File |
|--------|------|
| Modify | `src/components/FooterSection.tsx` — add admin icon |
| Modify | `src/App.tsx` — add admin routes |
| Modify | `supabase/config.toml` — add function configs |
| Create | `supabase/functions/setup-admin/index.ts` |
| Create | `supabase/functions/admin-data/index.ts` |
| Create | `src/pages/AdminLogin.tsx` |
| Create | `src/components/admin/AdminGuard.tsx` |
| Create | `src/components/admin/AdminLayout.tsx` |
| Create | `src/pages/admin/DashboardOverview.tsx` |
| Create | `src/pages/admin/AdminOrders.tsx` |
| Create | `src/pages/admin/AdminLeads.tsx` |
| Create | `src/pages/admin/AdminAnalytics.tsx` |
| Create | `src/pages/admin/AdminUsers.tsx` |
| Create | `src/hooks/useAdminData.ts` — shared hook for admin API calls |
| Create | `src/lib/adminApi.ts` — helper to call admin-data edge function with auth token |

---

### Security Summary

- Credentials stored in Supabase Auth (hashed, never in frontend)
- Admin role validated server-side via `has_role()` security definer function
- All data access through edge function with JWT + role verification
- Service role key never exposed to client
- Admin routes protected by auth guard component

