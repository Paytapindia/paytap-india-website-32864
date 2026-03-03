

## Plan: Add Logo to Invoice PDF + Sample Invoice Test Page

### Changes

**1. Copy logo to `public/images/paytap-logo-invoice.png`**
- Copy the uploaded `Paytap_Logo_2.png` to `public` so it can be loaded as a base64 image for the PDF.

**2. Update `src/lib/generateInvoice.ts`**
- Replace the `doc.text('Paytap', margin, y + 5)` line (line 99) with `doc.addImage(...)` using the logo.
- The logo will be embedded as a base64-encoded PNG. We'll convert it at build time by importing it and using a canvas, or more simply, we'll fetch the image from `public/` and convert to base64 inside the function.
- Since `jspdf.addImage()` supports base64 data URLs, the cleanest approach: preload the logo as base64 and pass it to `addImage`. We'll add a helper that fetches `/images/paytap-logo-invoice.png`, converts to base64, and caches it.
- Logo size: approximately 35mm wide × 12mm tall, placed at the top-left where the text was.

**3. Create `src/pages/SampleInvoice.tsx`**
- A simple page at route `/sample-invoice` that generates a sample invoice with dummy data when you click a button.
- This lets you test the invoice output without going through the full checkout flow.

**4. Add route in `src/App.tsx`**
- Add `/sample-invoice` route pointing to the new page.

### Technical Detail

For embedding the logo in the PDF:
```typescript
// Fetch logo once and cache as base64
let logoCached: string | null = null;
async function getLogoBase64(): Promise<string> {
  if (logoCached) return logoCached;
  const res = await fetch('/images/paytap-logo-invoice.png');
  const blob = await res.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => { logoCached = reader.result as string; resolve(logoCached); };
    reader.readAsDataURL(blob);
  });
}
```

The `generateInvoice` function becomes `async` to await the logo fetch on first call.

