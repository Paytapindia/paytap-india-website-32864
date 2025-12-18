import { Button } from "@/components/ui/button";
import { ArrowRight, CreditCard, Smartphone, Wallet, Wifi, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();
  
  const handleGetTag = () => {
    window.open('https://u.payu.in/PAYUMN/KIQlHVfA6z3b', '_blank');
  };

  return (
    <section className="relative pt-32 md:pt-40 pb-24 md:pb-32 px-6 md:px-12 min-h-screen flex items-center bg-background">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left">
            {/* Minimal badge */}
            <div className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-8 animate-fade-in tracking-wide">
              <span className="w-2 h-2 rounded-full bg-primary" />
              {t('hero.badge')}
            </div>

            {/* Large, bold headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-8 leading-[1.1] tracking-tight animate-fade-in text-balance" style={{ animationDelay: '0.1s' }}>
              {t('hero.title')}
            </h1>

            {/* Clean subtitle */}
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed mb-12 animate-fade-in mx-auto lg:mx-0" style={{ animationDelay: '0.2s' }}>
              {t('hero.subtitle')}
            </p>

            {/* Single prominent CTA */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-6 mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group min-h-[56px]"
                onClick={handleGetTag}
              >
                {t('hero.orderNow')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <span className="text-muted-foreground text-sm">
                {t('hero.setupTime')}
              </span>
            </div>

            {/* Trust indicators */}
            <div className="animate-fade-in space-y-3" style={{ animationDelay: '0.4s' }}>
              <div className="text-muted-foreground text-sm tracking-wide">
                PPI-licensed • RBI-compliant • Works at 8L+ terminals
              </div>
              <div className="text-muted-foreground/70 text-xs">
                Built for businesses that operate beyond traditional bank accounts.
              </div>
            </div>
          </div>

          {/* Right side - Hero Visual Composition */}
          <div className="relative h-[320px] sm:h-[400px] md:h-[500px] lg:h-[550px] animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {/* Main Card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 sm:w-72 md:w-80 h-36 sm:h-44 md:h-48 bg-paytap-dark rounded-2xl shadow-2xl p-4 sm:p-6 transform rotate-[-5deg] hover:rotate-0 transition-all duration-500 z-20">
              <div className="flex justify-between items-start mb-4 sm:mb-8">
                <div className="w-8 sm:w-10 h-6 sm:h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-md" />
                <Wifi className="w-5 h-5 sm:w-6 sm:h-6 text-white/80 rotate-90" />
              </div>
              <div className="text-white/80 text-xs sm:text-sm tracking-[0.3em] mb-2">•••• •••• •••• 4589</div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-white/60 text-[10px] sm:text-xs">CARDHOLDER</div>
                  <div className="text-white text-xs sm:text-sm font-medium">PAYTAP USER</div>
                </div>
                <div className="text-right">
                  <div className="text-white/60 text-[10px] sm:text-xs">EXPIRES</div>
                  <div className="text-white text-xs sm:text-sm font-medium">12/28</div>
                </div>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 md:right-8 w-32 sm:w-40 md:w-48 bg-white rounded-3xl shadow-xl p-2 sm:p-3 z-30 border border-border/20">
              <div className="bg-paytap-dark rounded-2xl p-3 sm:p-4 text-center">
                <Wallet className="w-6 h-6 sm:w-8 sm:h-8 text-white mx-auto mb-1 sm:mb-2" />
                <div className="text-white/70 text-[10px] sm:text-xs">Available Balance</div>
                <div className="text-white text-lg sm:text-2xl font-bold">₹5,000</div>
              </div>
              <div className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-between text-[10px] sm:text-xs p-1.5 sm:p-2 bg-secondary/50 rounded-lg">
                  <span className="text-muted-foreground">Fuel</span>
                  <span className="text-foreground font-medium">-₹500</span>
                </div>
                <div className="flex items-center justify-between text-[10px] sm:text-xs p-1.5 sm:p-2 bg-secondary/50 rounded-lg">
                  <span className="text-muted-foreground">Toll</span>
                  <span className="text-foreground font-medium">-₹120</span>
                </div>
              </div>
            </div>

            {/* NFC Tag */}
            <div className="absolute bottom-4 sm:bottom-8 left-2 sm:left-4 md:left-8 w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-paytap-light rounded-full shadow-lg flex items-center justify-center z-10 animate-pulse">
              <Wifi className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white rotate-45" />
            </div>

            {/* Mini Statement */}
            <div className="absolute bottom-12 sm:bottom-16 right-4 sm:right-8 md:right-16 w-28 sm:w-36 md:w-44 bg-white rounded-xl shadow-lg p-2 sm:p-3 z-10 border border-border/20">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-paytap-dark" />
                <span className="text-[10px] sm:text-xs font-medium text-foreground">Statement</span>
              </div>
              <div className="space-y-1 sm:space-y-1.5">
                <div className="h-1.5 sm:h-2 bg-secondary rounded w-full" />
                <div className="h-1.5 sm:h-2 bg-secondary rounded w-3/4" />
                <div className="h-1.5 sm:h-2 bg-paytap-light/30 rounded w-1/2" />
              </div>
            </div>

            {/* Floating Icons */}
            <div className="absolute top-12 sm:top-16 left-4 sm:left-8 md:left-16 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl shadow-md flex items-center justify-center">
              <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-paytap-dark" />
            </div>
            <div className="absolute bottom-24 sm:bottom-32 left-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-paytap-dark rounded-lg shadow-md flex items-center justify-center">
              <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Clean stats section */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-12 mt-12 sm:mt-16 lg:mt-24 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-5xl font-semibold text-foreground mb-1 sm:mb-2 tracking-tight">8L+</div>
            <div className="text-muted-foreground text-xs sm:text-sm md:text-base">{t('hero.stats.terminals')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-5xl font-semibold text-foreground mb-1 sm:mb-2 tracking-tight">50K+</div>
            <div className="text-muted-foreground text-xs sm:text-sm md:text-base">{t('hero.stats.fleetOwners')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-5xl font-semibold text-foreground mb-1 sm:mb-2 tracking-tight">99.9%</div>
            <div className="text-muted-foreground text-xs sm:text-sm md:text-base">{t('hero.stats.successRate')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
