

## Replace Trust Section on Security Page

**File**: `src/pages/Security.tsx`

Replace the current `TrustSection` component (which shows RBI/NPCI icons with a simple text line) with a version that mirrors the `ComplianceBadgeBar` content but styled to match the security page's dark navy aesthetic (`#021a42`, `white/` text, `#f6245b` accents).

**Changes:**
- Remove imports of `RBIIcon` and `NPCIIcon`
- Import `Building2, CreditCard, ArrowLeftRight, ShieldCheck, Landmark` from lucide-react (some already imported)
- Replace the `TrustSection` component with the five compliance badges, headline "Trusted. Secure. Regulated.", and disclaimer — all styled with dark background, white text, and pink icon accents

```tsx
const TrustSection = () => (
  <section className="py-16 md:py-20 px-4 bg-[#021a42] border-t border-white/5">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold text-white text-center mb-8">
        Trusted. Secure. Regulated.
      </h2>
      <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-8">
        {[
          { icon: Building2, label: "RBI-Compliant PPI" },
          { icon: CreditCard, label: "RuPay Network" },
          { icon: ArrowLeftRight, label: "NPCI Payment Rails" },
          { icon: ShieldCheck, label: "PCI-DSS Secure" },
          { icon: Landmark, label: "Bank-Partnered PPI License" },
        ].map((badge, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <badge.icon className="w-7 h-7 md:w-8 md:h-8 text-[#f6245b]" />
            <span className="text-xs md:text-sm text-white/70 font-medium text-center">
              {badge.label}
            </span>
          </div>
        ))}
      </div>
      <p className="text-xs text-white/40 text-center max-w-2xl mx-auto">
        PayTap operates as a regulated Prepaid Payment Instrument (PPI) under RBI guidelines through authorized banking partners. PayTap does not hold customer funds.
      </p>
    </div>
  </section>
);
```

Also clean up unused `RBIIcon` and `NPCIIcon` imports.

