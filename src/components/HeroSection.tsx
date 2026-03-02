import { memo, useRef, useState, useCallback } from "react";
import { ArrowRight, Wifi, LayoutDashboard, Users, Shield, Wallet, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import paytapCardLogo from "@/assets/paytap-card-logo.png";

const featurePills = [
  { icon: Wifi, label: "NFC Payment Layer" },
  { icon: LayoutDashboard, label: "Live Transaction Dashboard" },
  { icon: Users, label: "Fleet + Team Controls" },
  { icon: Shield, label: "Enterprise-grade Security" },
];

const HeroSection = memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const nfcRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [nfcRipple, setNfcRipple] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isMobile) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    setParallax({ x: dx * 6, y: dy * 6 });

    // NFC ripple proximity check
    if (nfcRef.current) {
      const nfcRect = nfcRef.current.getBoundingClientRect();
      const nfcCx = nfcRect.left + nfcRect.width / 2;
      const nfcCy = nfcRect.top + nfcRect.height / 2;
      const dist = Math.sqrt((e.clientX - nfcCx) ** 2 + (e.clientY - nfcCy) ** 2);
      setNfcRipple(dist < 150);
    }
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative pt-24 md:pt-36 lg:pt-40 pb-12 md:pb-24 lg:pb-32 px-6 md:px-12 min-h-screen flex items-center bg-background"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Left Column — Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-[1.08] tracking-[-0.03em] mb-6 md:mb-8 text-balance">
              Control How Money Moves Across Your Operations
            </h1>

            <p className="text-foreground/55 text-base md:text-lg leading-[1.7] max-w-xl mb-8 md:mb-10 mx-auto lg:mx-0">
              PayTap is India's fintech infrastructure layer for mobility, fleets, and business payments — giving you real-time control, visibility, and automation over how money flows across vehicles, teams, and daily operations.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2.5 md:gap-3 justify-center lg:justify-start mb-8 md:mb-10">
              {featurePills.map((pill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 md:gap-2 border border-foreground/[0.12] bg-background px-3 py-2 md:px-4 md:py-2.5 rounded-xl text-xs md:text-sm text-foreground/75 transition-all duration-200 hover:border-accent/40 hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] cursor-default"
                >
                  <pill.icon className="w-4 h-4" strokeWidth={1.5} />
                  <span>{pill.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex justify-center lg:justify-start mb-5">
              <button
                onClick={() => navigate('/checkout')}
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 md:px-10 md:py-5 rounded-[14px] text-base md:text-lg font-semibold shadow-[0_2px_8px_rgba(2,26,66,0.12)] hover:bg-accent transition-colors duration-300 group"
              >
                Activate PayTap Platform
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Trust Line */}
            <p className="text-foreground/40 text-xs md:text-sm tracking-wide text-center lg:text-left">
              Used by operators, businesses, and enterprises across India.
            </p>
          </div>

          {/* Right Column — Visual Stack */}
          <div className="relative h-[300px] sm:h-[400px] md:h-[520px] lg:h-[560px]">
            {/* Dashboard Mini UI */}
            <div
              className={`absolute -top-2 sm:top-0 md:-top-2 left-0 md:-left-8 w-28 sm:w-36 md:w-52 z-30 ${isMobile ? '' : 'animate-[float-slow_7s_ease-in-out_infinite]'}`}
              style={!isMobile ? { transform: `translate(${parallax.x * -0.5}px, ${parallax.y * -0.5}px)` } : undefined}
            >
              <div className="bg-background rounded-xl border border-border/40 shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-2 md:p-3">
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
                  <div className="flex-1 bg-primary/60 rounded-t" style={{ height: '60%' }} />
                  <div className="flex-1 bg-primary/80 rounded-t" style={{ height: '80%' }} />
                  <div className="flex-1 bg-primary rounded-t" style={{ height: '100%' }} />
                  <div className="flex-1 bg-primary/70 rounded-t" style={{ height: '70%' }} />
                  <div className="flex-1 bg-primary/50 rounded-t" style={{ height: '50%' }} />
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

            {/* PayTap Card — Center */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 sm:w-72 md:w-[340px] h-32 sm:h-44 md:h-52 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] transform rotate-[-5deg] hover:rotate-0 transition-all duration-500 z-20 overflow-hidden ${isMobile ? '' : 'animate-[float-slow_5s_ease-in-out_infinite]'}`}
              style={{
                backgroundColor: '#021a42',
                ...(isMobile ? {} : { transform: `translate(calc(-50% + ${parallax.x}px), calc(-50% + ${parallax.y}px)) rotate(-5deg)` })
              }}
            >
              {/* Wave pattern background */}
              <div className="absolute inset-0 opacity-20">
                <svg viewBox="0 0 340 208" className="w-full h-full" preserveAspectRatio="none">
                  <path d="M0 120 Q85 80, 170 120 T340 120 V208 H0 Z" fill="#0a3a7a" />
                  <path d="M0 140 Q85 100, 170 140 T340 140 V208 H0 Z" fill="#0a3a7a" />
                </svg>
              </div>
              <div className="relative h-full p-2.5 sm:p-3 md:p-4 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <img src={paytapCardLogo} alt="Paytap" className="h-4 sm:h-5 md:h-7 object-contain" loading="lazy" />
                  <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full border border-white/40 flex items-center justify-center">
                    <div className="text-[4px] sm:text-[5px] md:text-[6px] text-white/80 text-center leading-tight font-medium">
                      <div>For Use</div><div>Only in</div><div>India</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
                    <div className="absolute inset-0 flex flex-col rounded overflow-hidden">
                      <div className="flex-1 bg-orange-500" />
                      <div className="flex-1 bg-white" />
                      <div className="flex-1 bg-green-600" />
                    </div>
                    <svg viewBox="0 0 24 24" className="absolute inset-0 w-full h-full p-0.5 sm:p-1" fill="none" stroke="#021a42" strokeWidth="2">
                      <path d="M8.5 14.5a5 5 0 0 1 0-7" strokeLinecap="round" />
                      <path d="M5.5 17a9 9 0 0 1 0-12" strokeLinecap="round" />
                      <circle cx="14" cy="12" r="2" fill="#021a42" />
                    </svg>
                  </div>
                  <div className="flex flex-col items-end">
                    <svg viewBox="0 0 40 20" className="w-10 sm:w-14 md:w-16 h-3 sm:h-4 md:h-5">
                      <path d="M2 10 Q8 4, 16 8 T28 6" stroke="#c41e3a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                      <path d="M4 14 Q10 8, 18 12 T30 10" stroke="#c41e3a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    </svg>
                    <span className="text-white text-[7px] sm:text-[8px] md:text-[10px] font-bold tracking-wider">RuPay</span>
                    <span className="text-white/70 text-[5px] sm:text-[6px] md:text-[8px] tracking-widest">PREPAID</span>
                  </div>
                </div>
                <div className="space-y-0.5 sm:space-y-1">
                  <div className="text-white/90 text-[8px] sm:text-[10px] md:text-xs tracking-[0.15em] sm:tracking-[0.2em] font-mono">1234 5678 1234 5678</div>
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
                <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 flex gap-0.5 sm:gap-1">
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-red-500" />
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-red-500" />
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-red-500" />
                </div>
              </div>
            </div>

            {/* Balance Widget — Top Right */}
            <div
              className={`absolute -top-2 sm:-top-4 md:top-0 right-0 sm:right-2 md:right-4 w-24 sm:w-32 md:w-48 bg-background rounded-2xl md:rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-1.5 sm:p-2 md:p-3 z-30 border border-border/30 ${isMobile ? '' : 'animate-[float-slow_6s_ease-in-out_infinite_0.5s]'}`}
              style={!isMobile ? { transform: `translate(${parallax.x * 0.8}px, ${parallax.y * 0.8}px)` } : undefined}
            >
              <div className="bg-primary rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 text-center">
                <Wallet className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-primary-foreground mx-auto mb-1" />
                <div className="text-primary-foreground/70 text-[8px] sm:text-[10px] md:text-xs">Available Balance</div>
                <div className="text-primary-foreground text-sm sm:text-lg md:text-2xl font-bold">₹5,000</div>
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

            {/* NFC Icon — Bottom Left with Ripple */}
            <div
              ref={nfcRef}
              className={`absolute bottom-4 sm:bottom-10 md:bottom-8 left-2 sm:left-6 md:left-8 z-10 ${isMobile ? '' : 'animate-[float-slow_5s_ease-in-out_infinite_1s]'}`}
              style={!isMobile ? { transform: `translate(${parallax.x * -0.3}px, ${parallax.y * -0.3}px)` } : undefined}
            >
              <div className="relative">
                {/* Ripple rings */}
                {nfcRipple && (
                  <>
                    <span className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full border-2 border-accent/40 animate-[nfc-ripple_1.5s_ease-out_infinite]" />
                    <span className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full border-2 border-accent/30 animate-[nfc-ripple_1.5s_ease-out_infinite_0.3s]" />
                    <span className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full border-2 border-accent/20 animate-[nfc-ripple_1.5s_ease-out_infinite_0.6s]" />
                  </>
                )}
                <div className="w-10 h-10 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-primary rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.06)] flex items-center justify-center relative z-10">
                  <Wifi className="w-5 h-5 sm:w-8 sm:h-8 md:w-12 md:h-12 text-primary-foreground rotate-45" />
                </div>
              </div>
            </div>

            {/* Expense Dashboard — Bottom Right */}
            <div
              className={`absolute bottom-4 sm:bottom-20 md:bottom-16 right-0 sm:right-6 md:right-16 w-28 sm:w-36 md:w-48 bg-background rounded-lg md:rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-1.5 sm:p-2 md:p-3 z-10 border border-border/30 ${isMobile ? '' : 'animate-[float-slow_6s_ease-in-out_infinite_0.8s]'}`}
              style={!isMobile ? { transform: `translate(${parallax.x * 0.4}px, ${parallax.y * 0.4}px)` } : undefined}
            >
              <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 mb-1.5 sm:mb-2 md:mb-2.5">
                <FileText className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-foreground" />
                <span className="text-[7px] sm:text-[9px] md:text-xs font-semibold text-foreground tracking-wide uppercase">Expenses</span>
              </div>
              <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                {/* Fuel */}
                <div>
                  <div className="flex justify-between text-[6px] sm:text-[8px] md:text-[10px] mb-0.5">
                    <span className="text-muted-foreground">Fuel</span>
                    <span className="text-foreground font-medium">62%</span>
                  </div>
                  <div className="h-1 sm:h-1.5 md:h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '62%' }} />
                  </div>
                </div>
                {/* Toll */}
                <div>
                  <div className="flex justify-between text-[6px] sm:text-[8px] md:text-[10px] mb-0.5">
                    <span className="text-muted-foreground">Toll</span>
                    <span className="text-foreground font-medium">28%</span>
                  </div>
                  <div className="h-1 sm:h-1.5 md:h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: '28%' }} />
                  </div>
                </div>
                {/* Service */}
                <div>
                  <div className="flex justify-between text-[6px] sm:text-[8px] md:text-[10px] mb-0.5">
                    <span className="text-muted-foreground">Service</span>
                    <span className="text-foreground font-medium">10%</span>
                  </div>
                  <div className="h-1 sm:h-1.5 md:h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-muted-foreground/40 rounded-full" style={{ width: '10%' }} />
                  </div>
                </div>
              </div>
              <div className="mt-1.5 sm:mt-2 pt-1 sm:pt-1.5 border-t border-border/30 flex justify-between text-[6px] sm:text-[8px] md:text-[10px]">
                <span className="text-muted-foreground font-medium">Total</span>
                <span className="text-foreground font-bold">₹18,240</span>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Stats */}
        <div className="border-t border-border/40 mt-12 lg:mt-20 pt-8 lg:pt-12">
          <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-12">
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
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
