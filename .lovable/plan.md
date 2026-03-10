

## Fix How It Works Plan Card Text

Two issues in `src/pages/HowItWorks.tsx`:

1. **Line 409**: `"52Driver Expense Cards"` → `"2 Driver Expense Cards"` (typo fix)
2. **Line 402**: `"5 Prepaid Tags"` → `"5 Prepaid Tags free"` (add "free" text)

Will also add "free" to the other plans' tag text for consistency:
- Starter: `"1 Prepaid Tag free"`
- Business Basic: `"2 Prepaid Tags free"`
- Corporate: `"10 Prepaid Tags free"`

