import { memo } from "react";
import { Apple, Smartphone, ChevronRight, Shield, CreditCard } from "lucide-react";

const PhoneMockup = () => (
  <div
    className="relative w-[260px] h-[520px] md:w-[300px] md:h-[600px] rounded-[40px] border-[6px] border-primary bg-background overflow-hidden"
    style={{
      boxShadow: '0 20px 60px rgba(2,26,66,0.12)',
      animation: 'hero-float 6s ease-in-out infinite',
    }}
  >
    {/* Notch */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[24px] bg-primary rounded-b-2xl z-10" />

    {/* Screen content */}
    <div className="h-full bg-primary pt-10 px-4 pb-4 flex flex-col">
      {/* Status bar */}
      <div className="flex justify-between items-center text-primary-foreground/60 text-[10px] mb-6 px-1">
        <span>9:41</span>
        <div className="flex gap-1 items-center">
          <div className="w-3 h-2 border border-primary-foreground/60 rounded-[2px]">
            <div className="w-2 h-1 bg-primary-foreground/60 rounded-[1px] m-[1px]" />
          </div>
        </div>
      </div>

      {/* Greeting */}
      <p className="text-primary-foreground/60 text-xs mb-1">Good morning</p>
      <p className="text-primary-foreground font-semibold text-base mb-5">PayTap Dashboard</p>

      {/* Balance card */}
      <div className="bg-primary-foreground/10 rounded-2xl p-4 mb-4">
        <p className="text-primary-foreground/60 text-[10px] uppercase tracking-wider mb-1">Available Balance</p>
        <p className="text-primary-foreground text-2xl font-bold tracking-tight">₹24,500</p>
        <div className="flex items-center gap-1 mt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span className="text-green-400 text-[10px]">Active</span>
        </div>
      </div>

      {/* Tag Control */}
      <div className="bg-primary-foreground/10 rounded-2xl p-3.5 mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary-foreground/15 flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <p className="text-primary-foreground text-xs font-medium">Tag Control</p>
            <p className="text-primary-foreground/50 text-[10px]">3 tags active</p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-primary-foreground/40" />
      </div>

      {/* Pending Approval */}
      <div className="bg-primary-foreground/10 rounded-2xl p-3.5 mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary-foreground/15 flex items-center justify-center">
            <Shield className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <p className="text-primary-foreground text-xs font-medium">Pending Approval</p>
            <p className="text-primary-foreground/50 text-[10px]">₹4,200 · Fuel</p>
          </div>
        </div>
        <div className="bg-accent text-accent-foreground text-[10px] font-semibold px-3 py-1.5 rounded-lg">
          Approve
        </div>
      </div>

      {/* Bottom nav placeholder */}
      <div className="mt-auto flex justify-around pt-3 border-t border-primary-foreground/10">
        <div className="w-5 h-5 rounded-full bg-primary-foreground/20" />
        <div className="w-5 h-5 rounded-full bg-primary-foreground/20" />
        <div className="w-5 h-5 rounded-full bg-primary-foreground/20" />
        <div className="w-5 h-5 rounded-full bg-primary-foreground/20" />
      </div>
    </div>
  </div>
);

const MobileAppSection = memo(() => {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-gradient-to-b from-background to-muted/40">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left column — Text + Buttons */}
        <div>
          <h3 className="text-2xl md:text-4xl font-bold text-primary tracking-tight mb-2">
            Mobile Control Center
          </h3>
          <p className="text-muted-foreground text-xs md:text-sm mb-5">
            Available on iOS & Android
          </p>
          <p className="text-foreground/80 text-sm md:text-base max-w-[520px] leading-[1.8] mb-8 md:mb-10">
            Monitor balances, approve transactions, receive alerts, and manage tags or cards — directly from the Paytap mobile app.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            {/* iOS — active */}
            <a
              href="https://apps.apple.com/in/app/paytap-app/id6755413911"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-primary text-primary-foreground px-6 py-4 rounded-[14px] hover:opacity-90 transition-opacity min-w-[200px]"
            >
              <Apple className="w-7 h-7" />
              <div className="text-left">
                <p className="text-[10px] text-primary-foreground/60">Download on the</p>
                <p className="text-base font-semibold">App Store</p>
              </div>
            </a>

            {/* Google Play — active */}
            <a
              href="https://play.google.com/store/apps/details?id=com.paytap.app&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-primary text-primary-foreground px-6 py-4 rounded-[14px] hover:opacity-90 transition-opacity min-w-[200px]"
            >
              <Smartphone className="w-7 h-7" />
              <div className="text-left">
                <p className="text-[10px] text-primary-foreground/60">Get it on</p>
                <p className="text-base font-semibold">Google Play</p>
              </div>
            </a>
          </div>
        </div>

        {/* Right column — Phone mockup */}
        <div className="flex justify-center md:justify-end">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
});

MobileAppSection.displayName = 'MobileAppSection';

export default MobileAppSection;
