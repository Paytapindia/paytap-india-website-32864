

## Add KYC Limits FAQ Section

**File**: `src/data/faqData.ts`

Add a new FAQ section between "Managing Your Account" and "Fleet & Business Use" focused on KYC requirements and limits.

**New Section**: "KYC & Account Limits" with icon `UserCheck`

**Questions to add**:

1. **"What is KYC and why do I need it?"**
   - KYC (Know Your Customer) is a verification process required for prepaid accounts
   - With minimum KYC, account is valid for 12 months
   - Must complete full KYC to continue using the account without issues
   - Always complete full KYC while you have only one vehicle linked

2. **"What are the limits with minimum KYC?"**
   - Monthly deposit and withdrawal limit: ₹10,000
   - Complete full KYC before linking additional vehicles
   - Account valid for 12 months with minimum KYC

3. **"What are the limits after full KYC?"**
   - Individual accounts: monthly deposit/withdrawal limit increases to ₹2,00,000
   - Strongly recommended to complete full KYC early to avoid account issues

4. **"How does KYC work for corporate accounts?"**
   - Corporate accounts go through a complete KYC process
   - A corporate prepaid business account is provided with no deposit/withdrawal limits at the corporate level
   - Individual employee-level accounts are created to manage vehicles under the company
   - Employee accounts follow standard min-KYC and full-KYC limits
   - Each employee can manage multiple vehicles under them

**Also update**: `src/components/FAQSection.tsx` — add `UserCheck` to the icon imports and `iconMap`.

