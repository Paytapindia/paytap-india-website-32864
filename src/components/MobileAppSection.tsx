import { memo } from "react";
import { Apple, Smartphone } from "lucide-react";

const MobileAppSection = memo(() => {
  return (
    <section className="py-10 md:py-12 px-6 md:px-12 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h3 className="text-lg md:text-2xl font-semibold text-foreground mb-1.5 md:mb-2">
            Mobile Control Center
          </h3>
          <p className="text-muted-foreground text-xs md:text-base mb-2">
            Manage your financial operations from anywhere
          </p>
          <p className="text-muted-foreground text-xs md:text-sm max-w-lg mx-auto">
            Monitor balances, approve transactions, receive alerts, and manage tags or cards directly from the Paytap mobile app.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-6">
          {/* iOS App Store */}
          <div className="relative group">
            <div className="flex items-center gap-2 md:gap-3 bg-paytap-dark text-white px-4 md:px-6 py-3 md:py-4 rounded-xl shadow-lg opacity-80 cursor-not-allowed min-w-[160px] md:min-w-[200px]">
              <Apple className="w-6 h-6 md:w-8 md:h-8" />
              <div className="text-left">
                <p className="text-[10px] md:text-xs text-white/70">Download on the</p>
                <p className="text-sm md:text-lg font-semibold">App Store</p>
              </div>
            </div>
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] md:text-xs font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full shadow-md">
              Coming Soon
            </span>
          </div>

          {/* Google Play Store */}
          <div className="relative group">
            <div className="flex items-center gap-2 md:gap-3 bg-paytap-dark text-white px-4 md:px-6 py-3 md:py-4 rounded-xl shadow-lg opacity-80 cursor-not-allowed min-w-[160px] md:min-w-[200px]">
              <Smartphone className="w-6 h-6 md:w-8 md:h-8" />
              <div className="text-left">
                <p className="text-[10px] md:text-xs text-white/70">Get it on</p>
                <p className="text-sm md:text-lg font-semibold">Google Play</p>
              </div>
            </div>
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] md:text-xs font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full shadow-md">
              Coming Soon
            </span>
          </div>
        </div>
      </div>
    </section>
  );
});

MobileAppSection.displayName = 'MobileAppSection';

export default MobileAppSection;
