

## Update Transaction Limits in T&C

**File**: `src/pages/TermsAndConditions.tsx` (lines 130-146)

Replace the current Transaction Limits content with updated deposit & withdrawal limits:

```tsx
<div className="space-y-4">
  <div>
    <h4 className="font-semibold mb-2">Minimum KYC Wallet: Monthly deposit & withdrawal limit</h4>
    <ul className="list-disc list-inside space-y-1">
      <li>Monthly Limit: ₹10,000</li>
      <li>Annual Limit: ₹1,20,000</li>
    </ul>
  </div>
  <div>
    <h4 className="font-semibold mb-2">Full KYC Wallet: Monthly deposit & withdrawal limit</h4>
    <ul className="list-disc list-inside space-y-1">
      <li>Monthly Limit: ₹2,00,000</li>
      <li>Annual Limit: ₹24,00,000</li>
    </ul>
  </div>
</div>
```

