

## Plan: Replace ExpensePro Icon with Custom Image

Copy the uploaded icon to `src/assets/` and use it as the ExpensePro card icon in `OurProductsSection.tsx`.

### Changes

1. **Copy asset**: `user-uploads://Paytap_App_Icon_New-2.png` → `src/assets/paytap-icon-tp.png`

2. **`src/components/OurProductsSection.tsx`**: 
   - Import the new image
   - Change the ExpensePro product entry to use an `img` tag with the custom icon instead of the `Receipt` Lucide icon
   - Keep the navy container styling, just swap the icon content

