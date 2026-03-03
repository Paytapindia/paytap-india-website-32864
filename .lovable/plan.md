

## Update Corporate PayU Payment Link

### Change
**File: `src/pages/Checkout.tsx`, line 82**

Replace the fallback payment link for `corporate` with the provided URL:

```
corporate: "https://u.payu.in/PAYUMN/4IXb9s4OqWwn",
```

Single line change. Removes the fallback comment since all 4 plans now have their correct payment links.

