

## Update FAQ Troubleshooting Section — Add Detailed Content

**What Changes**
Expand the Troubleshooting section with detailed answers for payment failures at petrol pumps and new questions about testing PayTap online using the virtual card.

**File Modified**
| File | Change |
|------|--------|
| `src/data/faqData.ts` | Replace troubleshooting `faqs` array with 3 updated/new questions |

**New Troubleshooting Content**

1. **"What if a payment fails at a petrol pump?"** (Updated)
   - Expanded answer explaining it's usually merchant machine issues
   - Steps: try again, retry transaction, test with small amount
   - Explanation about old POS machines not supporting contactless
   - Reassurance about balance/account safety

2. **"How can I test if my PayTap is working?"** (New)
   - Use the prepaid virtual card on dashboard
   - Card details available for online test transactions
   - Any online platform can be used for testing

3. **"Why do some transactions fail even when the tag is working?"** (New)
   - It's not the NFC tag — it's the machine limits
   - Some old POS machines haven't been upgraded for contactless
   - Balance and account remain safe
   - Self-realization for users to understand the issue

