

## Make PAN / GST Mandatory in Checkout Form

### Overview
Update the checkout form so that:
- **Personal Account**: PAN number is mandatory (with format validation)
- **Business Account**: Either GST number OR PAN number is mandatory (at least one must be filled), plus Company Name remains mandatory

### Changes to `src/pages/Checkout.tsx`

**1. Update Zod schema (lines 33-44)**
- Add PAN format validation: regex `/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i` (10-char alphanumeric Indian PAN format)
- Add GST format validation: regex `/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i` (15-char GST format)
- Keep pan, gst, companyName as optional at schema level (conditional logic handled via `superRefine`)
- Add `superRefine` to enforce:
  - If personal: PAN is required and must match format
  - If business: companyName is required; at least one of GST or PAN must be provided with valid format

Note: Since `accountType` is React state (not part of the form), the `superRefine` won't have direct access. Instead, keep the manual validation in `onSubmit` but enhance it with format checks and inline error display.

**2. Enhanced onSubmit validation (lines 204-219)**
- Personal: Validate PAN is filled AND matches format `/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i`
- Business: Validate companyName is filled; validate that at least one of GST or PAN is provided with correct format

**3. Add PAN field to Business account section (after line 626)**
- Add an optional PAN input field below the GST field for business accounts
- Label: "PAN Number (if no GST)"
- This gives business users the option to provide PAN instead of GST

**4. Add inline error styling**
- Show red border on PAN/GST fields when validation fails (similar to other required fields)
- Add error message text below the fields

### Technical Notes
- PAN format: 5 letters + 4 digits + 1 letter (e.g., ABCDE1234F)
- GST format: 2 digits + 5 letters + 4 digits + 1 letter + 1 alphanumeric + Z + 1 alphanumeric (e.g., 22AAAAA0000A1Z5)
- The form uses `react-hook-form` with `zodResolver`, but conditional validation based on `accountType` state is handled in `onSubmit`
- Toast notifications will show specific error messages for missing/invalid fields
