

# Account Type Click Actions + Corporate Registration Page

## Changes

### 1. Update AccountTypeSection.tsx
- Make the **Individual Account** card clickable -- opens `https://dashboard.paytap.co.in/login` in a new tab (`window.open` or `<a>` with `target="_blank"`)
- Make the **Business/Corporate Account** card clickable -- navigates to a new `/corporate-registration` route using React Router
- Add cursor-pointer styling to both cards

### 2. Create New Page: CorporateRegistration.tsx
A new page at `/corporate-registration` with:
- A clean form containing these fields:
  - Name (required, text)
  - Company Name (required, text)
  - Contact Mobile No (required, tel, validated for 10-digit Indian number)
  - GST No (optional, text, validated for 15-char GST format)
  - Email ID (required, email)
- A "Create Corporate Account" submit button
- On submission, store the data in a new `corporate_registrations` database table
- After successful submission, show a success screen with the message: "Our Business support team will contact you shortly to complete your Corporate Prepaid Account KYC"
- Include Navbar and Footer for consistent layout

### 3. Create Database Table
A new `corporate_registrations` table with columns:
- `id` (uuid, primary key)
- `name` (text, not null)
- `company_name` (text, not null)
- `contact_mobile` (text, not null)
- `gst_no` (text, nullable)
- `email` (text, not null)
- `created_at` (timestamptz, default now())
- RLS: Enable RLS, allow anonymous inserts (public-facing form), no select/update/delete for anon

### 4. Add Route in App.tsx
- Import and add `<Route path="/corporate-registration" element={<CorporateRegistration />} />`

## Technical Details

**Files to create:**
- `src/pages/CorporateRegistration.tsx` -- Form page with zod validation, Supabase insert, success state

**Files to modify:**
- `src/components/how-it-works-page/AccountTypeSection.tsx` -- Wrap cards with click handlers/links
- `src/App.tsx` -- Add new route

**Database migration:**
- Create `corporate_registrations` table with RLS policy for anonymous inserts

**Validation (using zod):**
- Name: required, max 100 chars
- Company Name: required, max 200 chars
- Mobile: required, 10-digit pattern
- GST: optional, 15-char alphanumeric pattern
- Email: required, valid email format

