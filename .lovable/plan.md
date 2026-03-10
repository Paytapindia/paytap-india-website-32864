

## Security Audit Report & Remediation Plan

### Findings Summary

| # | Severity | Finding | Location |
|---|----------|---------|----------|
| 1 | **CRITICAL** | SQL injection via unsanitized `search` param in `.or()` filters | `admin-data/index.ts` lines 136, 150, 164 |
| 2 | **CRITICAL** | `debugPreset` bypass skips all validation in payment flow | `create-payment/index.ts` line 56 |
| 3 | **HIGH** | Redundant legacy endpoints (`fetch-orders`, `fetch-leads`, `fetch-corporate-registrations`) expose data via static API key — weaker auth than JWT-based admin-data | 3 edge functions |
| 4 | **HIGH** | Leaked password protection disabled in auth config | Auth settings |
| 5 | **HIGH** | `update-order-status` accepts any arbitrary string as status — no whitelist | `admin-data/index.ts` line 71 |
| 6 | **MEDIUM** | RLS FORCE on orders table unverified by security scan | Database |
| 7 | **MEDIUM** | Sensitive data logged to console (hash strings, emails, PAN) | `create-payment/index.ts` lines 160-168 |
| 8 | **LOW** | CORS wildcard `*` on all edge functions | All functions |

---

### Remediation Plan

#### 1. Sanitize search input in `admin-data` (CRITICAL)

The `search` query param is interpolated directly into Postgres `.or()` filter strings. A crafted search value could inject malicious filter logic.

**Fix:** Sanitize by stripping all characters except alphanumeric, spaces, `@`, `.`, `-` before interpolation.

```typescript
const sanitized = search.replace(/[^a-zA-Z0-9@.\- ]/g, '');
```

Apply to all 3 `.or()` calls (orders, leads, corporate).

#### 2. Remove `debugPreset` from `create-payment` (CRITICAL)

This allows anyone to call the payment endpoint with `debugPreset: true` and bypass all field validation. It's a testing artifact that must be removed for production.

**Fix:** Delete all `debugPreset` code paths from `create-payment/index.ts`.

#### 3. Delete legacy edge functions (HIGH)

`fetch-orders`, `fetch-leads`, and `fetch-corporate-registrations` are superseded by the JWT-authenticated `admin-data` function. They use a weaker static API key and are unnecessary attack surface.

**Fix:** Delete these 3 functions entirely.

#### 4. Enable leaked password protection (HIGH)

**Fix:** Use `configure_auth` to enable leaked password protection.

#### 5. Whitelist order status values (HIGH)

Currently `update-order-status` accepts any string. An attacker with admin access could set nonsensical statuses.

**Fix:** Validate `newStatus` against `['pending', 'success', 'failed', 'cancelled']`.

#### 6. Confirm RLS FORCE on orders table (MEDIUM)

Run migration: `ALTER TABLE public.orders FORCE ROW LEVEL SECURITY;`

#### 7. Remove sensitive console logs (MEDIUM)

Remove debug `console.log` statements in `create-payment` that print hash strings, emails, and phone numbers.

#### 8. Restrict CORS origins (LOW — deferred)

Wildcard CORS is standard for Supabase edge functions since they're already auth-gated. No action needed now but noted for future hardening.

---

### Files Modified

| Action | File |
|--------|------|
| Modify | `supabase/functions/admin-data/index.ts` — sanitize search, whitelist status |
| Modify | `supabase/functions/create-payment/index.ts` — remove debugPreset, remove console logs |
| Delete | `supabase/functions/fetch-orders/index.ts` |
| Delete | `supabase/functions/fetch-leads/index.ts` |
| Delete | `supabase/functions/fetch-corporate-registrations/index.ts` |
| Migration | `ALTER TABLE public.orders FORCE ROW LEVEL SECURITY;` |
| Auth config | Enable leaked password protection |

