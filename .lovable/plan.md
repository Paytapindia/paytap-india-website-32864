

## Plan: Add Time to Date Display in Admin Panel

### Changes

Update the date format from `'MMM d, yyyy'` to `'MMM d, yyyy, hh:mm a'` in three files:

**1. `src/pages/admin/AdminLeads.tsx` (line 83)**
Change: `format(new Date(lead.created_at), 'MMM d, yyyy')` → `format(new Date(lead.created_at), 'MMM d, yyyy, hh:mm a')`

**2. `src/pages/admin/AdminOrders.tsx` (line 168)**
Change: `format(new Date(order.created_at), 'MMM d, yyyy')` → `format(new Date(order.created_at), 'MMM d, yyyy, hh:mm a')`

**3. `src/pages/admin/AdminUsers.tsx` (line 83)**
Change: `format(new Date(user.created_at), 'MMM d, yyyy')` → `format(new Date(user.created_at), 'MMM d, yyyy, hh:mm a')`

### Result
Dates will display like: **Apr 3, 2026, 02:45 PM** instead of just **Apr 3, 2026**.

Three files, one-line change each.

