

## Add Order Status Change and Delete to Admin Orders

Two changes needed: backend (edge function) to support POST actions, and frontend to add status dropdown + delete button.

### 1. Edge Function (`supabase/functions/admin-data/index.ts`)

Add POST handler for two new actions:
- `update-order-status` — updates `payment_status` on an order by ID
- `delete-order` — deletes an order by ID

Both use the same auth/admin verification already in place. Parse JSON body for `{ action, orderId, status }`.

### 2. Admin API (`src/lib/adminApi.ts`)

Add `adminPost` helper that sends POST requests with JSON body to the same edge function.

### 3. Admin Orders Page (`src/pages/admin/AdminOrders.tsx`)

- **Status column**: Replace the static badge with a `<select>` dropdown showing `pending` / `success` options. On change, call `adminPost` to update status, then refresh the list.
- **Delete button**: Add a `Trash2` icon button in the Actions column. On click, show a confirmation (`window.confirm`), then call `adminPost` to delete, and refresh.
- Both the detail panel and the table row get these controls.

### Files Modified

| File | Change |
|------|--------|
| `supabase/functions/admin-data/index.ts` | Add POST handler for `update-order-status` and `delete-order` |
| `src/lib/adminApi.ts` | Add `adminPost` function |
| `src/pages/admin/AdminOrders.tsx` | Add status dropdown + delete button in table and detail panel |

