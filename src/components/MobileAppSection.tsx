import { Apple, Smartphone } from "lucide-react";

const MobileAppSection = () => {
  return (
    <section className="py-12 px-6 md:px-12 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
            Get the PayTap Mobile App
          </h3>
          <p className="text-muted-foreground text-sm md:text-base">
            Manage your payments on the go
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
          {/* iOS App Store */}
          <div className="relative group">
            <div className="flex items-center gap-3 bg-paytap-dark text-white px-6 py-4 rounded-xl shadow-lg opacity-80 cursor-not-allowed min-w-[200px]">
              <Apple className="w-8 h-8" />
              <div className="text-left">
                <p className="text-xs text-white/70">Download on the</p>
                <p className="text-lg font-semibold">App Store</p>
              </div>
            </div>
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-md">
              Coming Soon
            </span>
          </div>

          {/* Google Play Store */}
          <div className="relative group">
            <div className="flex items-center gap-3 bg-paytap-dark text-white px-6 py-4 rounded-xl shadow-lg opacity-80 cursor-not-allowed min-w-[200px]">
              <Smartphone className="w-8 h-8" />
              <div className="text-left">
                <p className="text-xs text-white/70">Get it on</p>
                <p className="text-lg font-semibold">Google Play</p>
              </div>
            </div>
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-md">
              Coming Soon
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppSection;
