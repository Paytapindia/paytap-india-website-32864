import { memo } from "react";
import { Building2, CreditCard, ArrowLeftRight, ShieldCheck, Landmark } from "lucide-react";

const badges = [
  { icon: Building2, label: "RBI-Compliant PPI" },
  { icon: CreditCard, label: "RuPay Network" },
  { icon: ArrowLeftRight, label: "NPCI Payment Rails" },
  { icon: ShieldCheck, label: "PCI-DSS Secure" },
  { icon: Landmark, label: "Bank-Partnered PPI License" },
];

const ComplianceBadgeBar = memo(() => {
  return (
    <section className="w-full bg-secondary/50 border-y border-border/50 py-8 md:py-14 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Headline */}
        <h2 className="text-lg md:text-2xl font-medium text-foreground text-center mb-6 md:mb-8">
          Trusted. Secure. Regulated.
        </h2>

        {/* Badge Row */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-12 lg:gap-16 mb-6 md:mb-8">
          {badges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center gap-1.5 md:gap-2">
              <badge.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              <span className="text-[10px] md:text-sm text-muted-foreground font-medium text-center">
                {badge.label}
              </span>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-[10px] md:text-xs text-muted-foreground/70 text-center max-w-3xl mx-auto">
          PayTap operates as a regulated Prepaid Payment Instrument (PPI) under RBI guidelines through authorized banking partners. PayTap does not hold customer funds.
        </p>
      </div>
    </section>
  );
});

ComplianceBadgeBar.displayName = 'ComplianceBadgeBar';

export default ComplianceBadgeBar;
