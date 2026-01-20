import { memo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CreditCard, Smartphone, Wallet, Wifi, FileText, PlayCircle, Unlock, LayoutDashboard, Bot, Receipt, Headphones } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import paytapCardLogo from "@/assets/paytap-card-logo.png";

const HeroSection = memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleActivateAccount = () => {
    window.open('https://dashboard.paytap.co.in/login', '_blank');
  };

  const valueStripItems = [
    { icon: Wifi, label: "NFC PayTag" },
    { icon: LayoutDashboard, label: "Live Expense Dashboard" },
    { icon: Bot, label: "MyFleet AI Controls" },
    { icon: Receipt, label: "GST-Ready Reports" },
    { icon: Headphones, label: "Priority Business Support" },
  ];

  return (
    <section className="relative pt-28 md:pt-40 pb-16 md:pb-32 px-6 md:px-12 min-h-screen flex items-center bg-background">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left">
            {/* Large, bold headline - Enterprise positioning */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4 md:mb-6 leading-[1.1] tracking-tight text-balance">
              Control How Your Money Moves
            </h1>

            {/* Enterprise subheadline */}
            <p className="text-muted-foreground text-base md:text-xl max-w-xl leading-relaxed mb-6 md:mb-8 mx-auto lg:mx-0">
              Paytap is a smart payment control platform that lets you track spending, set limits, and manage tags, vehicles, or teams — all from one app.
            </p>

            {/* Value Strip - Feature highlights */}
            <div className="flex flex-wrap gap-2 md:gap-3 justify-center lg:justify-start mb-6 md:mb-8">
              {valueStripItems.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-1.5 bg-secondary/60 px-2.5 py-1.5 md:px-3 md:py-2 rounded-full text-xs md:text-sm text-foreground/80"
                >
                  <item.icon className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Single Primary CTA - Enterprise activation */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start mb-4 md:mb-6">
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 md:px-10 py-5 md:py-6 text-base md:text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group min-h-[56px] md:min-h-[64px]"
                onClick={handleActivateAccount}
              >
                <Unlock className="mr-2 md:mr-3 w-4 h-4 md:w-5 md:h-5" />
                Activate Paytap Account
                <ArrowRight className="ml-2 md:ml-3 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            {/* Micro Trust Line */}
            <div className="text-muted-foreground text-xs md:text-sm tracking-wide">
              Used by growing fleet operators across India • No monthly fees
            </div>
          </div>

          {/* Right side - Hero Visual Composition */}
          <div className="relative h-[340px] sm:h-[400px] md:h-[520px] lg:h-[560px]">
            {/* Main PayTap Card - Matching exact design */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 sm:w-72 md:w-[340px] h-36 sm:h-44 md:h-52 rounded-2xl shadow-2xl transform rotate-[-5deg] hover:rotate-0 transition-all duration-500 z-20 overflow-hidden" style={{ backgroundColor: '#021a42' }}>
              {/* Wave pattern background */}
              <div className="absolute inset-0 opacity-20">
                <svg viewBox="0 0 340 208" className="w-full h-full" preserveAspectRatio="none">
                  <path d="M0 120 Q85 80, 170 120 T340 120 V208 H0 Z" fill="#0a3a7a" />
                  <path d="M0 140 Q85 100, 170 140 T340 140 V208 H0 Z" fill="#0a3a7a" />
                </svg>
              </div>
              
              {/* Card content */}
              <div className="relative h-full p-2.5 sm:p-3 md:p-4 flex flex-col justify-between">
                {/* Top row - Logo and India badge */}
                <div className="flex items-start justify-between">
                  <img 
                    src={paytapCardLogo} 
                    alt="Paytap" 
                    className="h-4 sm:h-5 md:h-7 object-contain"
                    loading="lazy"
                  />
                  <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full border border-white/40 flex items-center justify-center">
                    <div className="text-[4px] sm:text-[5px] md:text-[6px] text-white/80 text-center leading-tight font-medium">
                      <div>For Use</div>
                      <div>Only in</div>
                      <div>India</div>
                    </div>
                  </div>
                </div>

                {/* Middle section - NFC icon with Indian tricolor */}
                <div className="flex items-center justify-between">
                  <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
                    {/* Indian tricolor background */}
                    <div className="absolute inset-0 flex flex-col rounded overflow-hidden">
                      <div className="flex-1 bg-orange-500" />
                      <div className="flex-1 bg-white" />
                      <div className="flex-1 bg-green-600" />
                    </div>
                    {/* NFC contactless symbol */}
                    <svg viewBox="0 0 24 24" className="absolute inset-0 w-full h-full p-0.5 sm:p-1" fill="none" stroke="#021a42" strokeWidth="2">
                      <path d="M8.5 14.5a5 5 0 0 1 0-7" strokeLinecap="round" />
                      <path d="M5.5 17a9 9 0 0 1 0-12" strokeLinecap="round" />
                      <circle cx="14" cy="12" r="2" fill="#021a42" />
                    </svg>
                  </div>
                  
                  {/* RuPay logo section */}
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-0.5">
                      <svg viewBox="0 0 40 20" className="w-10 sm:w-14 md:w-16 h-3 sm:h-4 md:h-5">
                        <path d="M2 10 Q8 4, 16 8 T28 6" stroke="#c41e3a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        <path d="M4 14 Q10 8, 18 12 T30 10" stroke="#c41e3a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span className="text-white text-[7px] sm:text-[8px] md:text-[10px] font-bold tracking-wider">RuPay</span>
                    <span className="text-white/70 text-[5px] sm:text-[6px] md:text-[8px] tracking-widest">PREPAID</span>
                  </div>
                </div>

                {/* Card number and details */}
                <div className="space-y-0.5 sm:space-y-1">
                  <div className="text-white/90 text-[8px] sm:text-[10px] md:text-xs tracking-[0.15em] sm:tracking-[0.2em] font-mono">
                    1234 5678 1234 5678
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="flex gap-2 sm:gap-3 md:gap-4 items-end">
                      <div>
                        <div className="text-white/50 text-[5px] sm:text-[6px] md:text-[8px]">CVV</div>
                        <div className="text-white text-[8px] sm:text-[10px] md:text-xs font-mono">123</div>
                      </div>
                      <div>
                        <div className="text-white/50 text-[5px] sm:text-[6px] md:text-[8px]">VALID THRU</div>
                        <div className="text-white text-[8px] sm:text-[10px] md:text-xs font-mono">01/28</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white/80 text-[6px] sm:text-[8px] md:text-[10px] tracking-wide">CARDHOLDER NAME</div>
                    </div>
                  </div>
                </div>

                {/* Decorative red dots */}
                <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 flex gap-0.5 sm:gap-1">
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-red-500" />
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-red-500" />
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-red-500" />
                </div>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="absolute -top-2 sm:-top-4 md:top-0 right-0 sm:right-2 md:right-4 w-24 sm:w-32 md:w-48 bg-white rounded-2xl md:rounded-3xl shadow-xl p-1.5 sm:p-2 md:p-3 z-30 border border-border/20">
              <div className="bg-paytap-dark rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 text-center">
                <Wallet className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white mx-auto mb-1" />
                <div className="text-white/70 text-[8px] sm:text-[10px] md:text-xs">Available Balance</div>
                <div className="text-white text-sm sm:text-lg md:text-2xl font-bold">₹5,000</div>
              </div>
              <div className="mt-1.5 sm:mt-2 md:mt-3 space-y-1 sm:space-y-1.5 md:space-y-2">
                <div className="flex items-center justify-between text-[8px] sm:text-[10px] md:text-xs p-1 sm:p-1.5 md:p-2 bg-secondary/50 rounded-lg">
                  <span className="text-muted-foreground">Fuel</span>
                  <span className="text-foreground font-medium">-₹500</span>
                </div>
                <div className="flex items-center justify-between text-[8px] sm:text-[10px] md:text-xs p-1 sm:p-1.5 md:p-2 bg-secondary/50 rounded-lg">
                  <span className="text-muted-foreground">Toll</span>
                  <span className="text-foreground font-medium">-₹120</span>
                </div>
              </div>
            </div>

            {/* NFC Tag - Removed animate-pulse for mobile performance */}
            <div className="absolute bottom-8 sm:bottom-10 md:bottom-8 left-2 sm:left-6 md:left-8 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-paytap-light rounded-full shadow-lg flex items-center justify-center z-10">
              <Wifi className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-white rotate-45" />
            </div>

            {/* Mini Statement */}
            <div className="absolute bottom-16 sm:bottom-20 md:bottom-16 right-2 sm:right-6 md:right-16 w-24 sm:w-32 md:w-44 bg-white rounded-lg md:rounded-xl shadow-lg p-1.5 sm:p-2 md:p-3 z-10 border border-border/20">
              <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 mb-1 sm:mb-1.5 md:mb-2">
                <FileText className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-paytap-dark" />
                <span className="text-[8px] sm:text-[10px] md:text-xs font-medium text-foreground">Statement</span>
              </div>
              <div className="space-y-0.5 sm:space-y-1 md:space-y-1.5">
                <div className="h-1 sm:h-1.5 md:h-2 bg-secondary rounded w-full" />
                <div className="h-1 sm:h-1.5 md:h-2 bg-secondary rounded w-3/4" />
                <div className="h-1 sm:h-1.5 md:h-2 bg-paytap-light/30 rounded w-1/2" />
              </div>
            </div>

            {/* Dashboard Screen Mockup */}
            <div className="absolute -top-8 sm:-top-4 md:top-6 left-0 sm:-left-2 md:-left-4 w-28 sm:w-36 md:w-52 z-10">
              {/* Monitor frame */}
              <div className="bg-gray-800 rounded-t-lg p-1 border border-gray-700">
                {/* Window controls */}
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-[6px] md:text-[8px] text-gray-400 ml-1">PayTap Dashboard</span>
                </div>
                
                {/* Dashboard content */}
                <div className="bg-white rounded p-1.5 md:p-2">
                  {/* Mini stats row */}
                  <div className="grid grid-cols-3 gap-1 mb-1.5">
                    <div className="bg-secondary rounded p-1 text-center">
                      <div className="text-[5px] md:text-[7px] text-muted-foreground">Balance</div>
                      <div className="text-[7px] md:text-[10px] text-foreground font-bold">₹24.5K</div>
                    </div>
                    <div className="bg-secondary rounded p-1 text-center">
                      <div className="text-[5px] md:text-[7px] text-muted-foreground">Tags</div>
                      <div className="text-[7px] md:text-[10px] text-foreground font-bold">12</div>
                    </div>
                    <div className="bg-secondary rounded p-1 text-center">
                      <div className="text-[5px] md:text-[7px] text-muted-foreground">Spent</div>
                      <div className="text-[7px] md:text-[10px] text-foreground font-bold">₹8.2K</div>
                    </div>
                  </div>
                  
                  {/* Mini chart */}
                  <div className="flex items-end gap-0.5 h-4 md:h-6 mb-1.5">
                    <div className="flex-1 bg-primary/60 rounded-t" style={{height: '60%'}} />
                    <div className="flex-1 bg-primary/80 rounded-t" style={{height: '80%'}} />
                    <div className="flex-1 bg-primary rounded-t" style={{height: '100%'}} />
                    <div className="flex-1 bg-primary/70 rounded-t" style={{height: '70%'}} />
                    <div className="flex-1 bg-primary/50 rounded-t" style={{height: '50%'}} />
                  </div>
                  
                  {/* Transaction list */}
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-[5px] md:text-[7px] bg-secondary rounded px-1 py-0.5">
                      <span className="text-muted-foreground">HP Fuel</span>
                      <span className="text-foreground">-₹1,200</span>
                    </div>
                    <div className="flex justify-between text-[5px] md:text-[7px] bg-secondary rounded px-1 py-0.5">
                      <span className="text-muted-foreground">FastTag Toll</span>
                      <span className="text-foreground">-₹340</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Monitor stand */}
              <div className="flex flex-col items-center">
                <div className="w-4 md:w-6 h-2 md:h-3 bg-gray-700 rounded-b" />
                <div className="w-8 md:w-12 h-1 bg-gray-600 rounded-full" />
              </div>
            </div>

            {/* Floating Icons */}
            <div className="absolute top-32 sm:top-36 md:top-44 left-6 sm:left-10 md:left-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-lg md:rounded-xl shadow-md flex items-center justify-center">
              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-paytap-dark" />
            </div>
            <div className="absolute bottom-28 sm:bottom-36 md:bottom-32 left-1/2 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-paytap-dark rounded-md md:rounded-lg shadow-md flex items-center justify-center">
              <Smartphone className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
            </div>

            {/* How It Works Button */}
            <div className="absolute -bottom-2 sm:-bottom-2 md:-bottom-2 left-1/2 -translate-x-1/2 z-40">
              <Button
                variant="outline"
                className="bg-paytap-light md:bg-white/90 md:backdrop-blur-sm hover:bg-paytap-dark md:hover:bg-white text-white md:text-paytap-dark border-transparent md:border-paytap-dark/20 px-5 py-2.5 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full shadow-xl md:shadow-lg hover:shadow-2xl md:hover:shadow-xl transition-all duration-300 group ring-2 ring-white/30 md:ring-0"
                onClick={() => navigate('/how-it-works')}
              >
                <PlayCircle className="mr-1.5 sm:mr-2 w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white md:text-paytap-light" />
                <span className="text-sm sm:text-sm md:text-base font-medium">How It Works</span>
                <ArrowRight className="ml-1.5 sm:ml-2 w-3.5 h-3.5 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

        {/* Clean stats section */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-12 mt-10 sm:mt-14 lg:mt-24">
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-5xl font-semibold text-foreground mb-1 sm:mb-2 tracking-tight">8L+</div>
            <div className="text-muted-foreground text-[10px] sm:text-xs md:text-base">{t('hero.stats.terminals')}</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-5xl font-semibold text-foreground mb-1 sm:mb-2 tracking-tight">50K+</div>
            <div className="text-muted-foreground text-[10px] sm:text-xs md:text-base">{t('hero.stats.fleetOwners')}</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-5xl font-semibold text-foreground mb-1 sm:mb-2 tracking-tight">99.9%</div>
            <div className="text-muted-foreground text-[10px] sm:text-xs md:text-base">{t('hero.stats.successRate')}</div>
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
