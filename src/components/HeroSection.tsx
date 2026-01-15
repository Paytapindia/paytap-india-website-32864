import { Button } from "@/components/ui/button";
import { ArrowRight, CreditCard, Smartphone, Wallet, Wifi, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import paytapCardLogo from "@/assets/paytap-card-logo.png";

const HeroSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    window.open('https://dashboard.paytap.co.in/login', '_blank');
  };
  return (
    <section className="relative pt-32 md:pt-40 pb-24 md:pb-32 px-6 md:px-12 min-h-screen flex items-center bg-background">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left">
            {/* Large, bold headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 leading-[1.1] tracking-tight animate-fade-in text-balance">
              <span className="text-primary">Smarter Payments</span> for Everyday India.
            </h1>

            {/* Clean subtitle */}
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed mb-10 animate-fade-in mx-auto lg:mx-0" style={{ animationDelay: '0.2s' }}>
              Create your Paytap account in minutes using your mobile number. Start managing payments, fleet expenses, and more—all in one place.
            </p>

            {/* Primary CTAs - Center aligned and prominent */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group min-h-[64px]"
                onClick={handleCreateAccount}
              >
                Create Account to Get Started
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                className="bg-paytap-light hover:bg-paytap-dark text-white px-8 py-6 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group min-h-[64px]"
                onClick={() => navigate('/paytap-sticker')}
              >
                Order Paytap Card/Tag Now
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.35s' }}>
              <span className="text-muted-foreground text-sm">
                {t('hero.setupTime')}
              </span>
            </div>

            {/* Trust indicators */}
            <div className="animate-fade-in space-y-3 mt-6" style={{ animationDelay: '0.4s' }}>
              <div className="text-muted-foreground text-sm tracking-wide">
                PPI-licensed • RBI-compliant • Works at 8L+ terminals
              </div>
              <div className="text-muted-foreground/70 text-xs">
                Built for businesses that operate beyond traditional bank accounts.
              </div>
            </div>
          </div>

          {/* Right side - Hero Visual Composition */}
          <div className="relative h-[400px] sm:h-[450px] md:h-[520px] lg:h-[560px] animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {/* Main PayTap Card - Matching exact design */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 md:w-[340px] h-40 sm:h-48 md:h-52 rounded-2xl shadow-2xl transform rotate-[-5deg] hover:rotate-0 transition-all duration-500 z-20 overflow-hidden" style={{ backgroundColor: '#021a42' }}>
              {/* Wave pattern background */}
              <div className="absolute inset-0 opacity-20">
                <svg viewBox="0 0 340 208" className="w-full h-full" preserveAspectRatio="none">
                  <path d="M0 120 Q85 80, 170 120 T340 120 V208 H0 Z" fill="#0a3a7a" />
                  <path d="M0 140 Q85 100, 170 140 T340 140 V208 H0 Z" fill="#0a3a7a" />
                </svg>
              </div>
              
              {/* Card content */}
              <div className="relative h-full p-3 sm:p-4 flex flex-col justify-between">
                {/* Top row - Logo and India badge */}
                <div className="flex items-start justify-between">
                  <img src={paytapCardLogo} alt="Paytap" className="h-5 sm:h-6 md:h-7 object-contain" />
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/40 flex items-center justify-center">
                    <div className="text-[5px] sm:text-[6px] text-white/80 text-center leading-tight font-medium">
                      <div>For Use</div>
                      <div>Only in</div>
                      <div>India</div>
                    </div>
                  </div>
                </div>

                {/* Middle section - NFC icon with Indian tricolor */}
                <div className="flex items-center justify-between">
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                    {/* Indian tricolor background */}
                    <div className="absolute inset-0 flex flex-col rounded overflow-hidden">
                      <div className="flex-1 bg-orange-500" />
                      <div className="flex-1 bg-white" />
                      <div className="flex-1 bg-green-600" />
                    </div>
                    {/* NFC contactless symbol */}
                    <svg viewBox="0 0 24 24" className="absolute inset-0 w-full h-full p-1" fill="none" stroke="#021a42" strokeWidth="2">
                      <path d="M8.5 14.5a5 5 0 0 1 0-7" strokeLinecap="round" />
                      <path d="M5.5 17a9 9 0 0 1 0-12" strokeLinecap="round" />
                      <circle cx="14" cy="12" r="2" fill="#021a42" />
                    </svg>
                  </div>
                  
                  {/* RuPay logo section */}
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-0.5">
                      <svg viewBox="0 0 40 20" className="w-12 sm:w-16 h-4 sm:h-5">
                        <path d="M2 10 Q8 4, 16 8 T28 6" stroke="#c41e3a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        <path d="M4 14 Q10 8, 18 12 T30 10" stroke="#c41e3a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span className="text-white text-[8px] sm:text-[10px] font-bold tracking-wider">RuPay</span>
                    <span className="text-white/70 text-[6px] sm:text-[8px] tracking-widest">PREPAID</span>
                  </div>
                </div>

                {/* Card number and details */}
                <div className="space-y-1">
                  <div className="text-white/90 text-[10px] sm:text-xs tracking-[0.2em] font-mono">
                    1234 5678 1234 5678
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="flex gap-3 sm:gap-4 items-end">
                      <div>
                        <div className="text-white/50 text-[6px] sm:text-[8px]">CVV</div>
                        <div className="text-white text-[10px] sm:text-xs font-mono">123</div>
                      </div>
                      <div>
                        <div className="text-white/50 text-[6px] sm:text-[8px]">VALID THRU</div>
                        <div className="text-white text-[10px] sm:text-xs font-mono">01/28</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white/80 text-[8px] sm:text-[10px] tracking-wide">CARDHOLDER NAME</div>
                    </div>
                  </div>
                </div>

                {/* Decorative red dots */}
                <div className="absolute bottom-3 right-3 flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                </div>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="absolute -top-6 sm:-top-4 md:top-0 -right-2 sm:right-0 md:right-4 w-28 sm:w-36 md:w-48 bg-white rounded-3xl shadow-xl p-2 sm:p-3 z-30 border border-border/20">
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
