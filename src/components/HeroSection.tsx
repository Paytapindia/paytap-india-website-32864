import { memo } from "react";
import { ArrowRight, Sparkles, BarChart3, CreditCard, Truck, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import paytapCardLogo from "@/assets/paytap-card-logo.png";

const HeroSection = memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPhoneGate, setShowPhoneGate] = useState(false);

  return (
    <section
      className="relative pt-28 md:pt-36 lg:pt-[140px] pb-12 md:pb-24 lg:pb-32 px-6 md:px-12 min-h-screen flex items-center"
      style={{
        background: 'radial-gradient(ellipse at 60% 40%, #ffffff 0%, hsl(var(--secondary)) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Left Column — Text Stack */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-foreground leading-[1.06] tracking-[-0.035em] mb-6 md:mb-8 max-w-[600px] mx-auto lg:mx-0 text-balance">
              Control How Money Moves Across Your Operations
            </h1>

            <p className="text-muted-foreground text-base md:text-lg leading-[1.8] max-w-[520px] mb-9 mx-auto lg:mx-0">
              PayTap lets your vehicles make payments — while you control every transaction from a single dashboard.
            </p>

            {/* CTA Button */}
            <div className="flex justify-center lg:justify-start mb-4">
              <button
                onClick={() => setShowPhoneGate(true)}
                className="inline-flex items-center gap-3 text-accent-foreground px-10 py-5 rounded-[14px] text-lg md:text-xl font-semibold transition-all duration-300 group bg-accent hover:brightness-95"
                style={{
                  boxShadow: '0 12px 36px rgba(246,36,91,0.28)',
                }}
              >
                Activate PayTap Platform
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Reassurance line */}
            <p className="text-muted-foreground text-sm md:text-base mb-2 text-center lg:text-left">
              Works for personal vehicles, businesses, and fleet operators across India.
            </p>

            <PhoneGateDialog
              open={showPhoneGate}
              onOpenChange={setShowPhoneGate}
              onProceed={() => navigate('/checkout')}
            />
          </div>

          {/* Right Column — Card + Floating UI Elements */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative mb-16 sm:mb-0">
              {/* Floating element: NFC Tap Detected */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -top-10 left-0 sm:-top-8 sm:-left-16 z-20"
              >
                <div
                  className="bg-card/90 backdrop-blur-sm px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-xl border border-border/50 flex items-center gap-2"
                  style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
                >
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                   <span className="text-[10px] sm:text-xs font-medium text-foreground whitespace-nowrap">AI Manager</span>
                </div>
              </motion.div>

              {/* Floating element: Dashboard spend */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="absolute -bottom-14 -left-2 sm:-bottom-6 sm:-left-20 z-20"
              >
                <div
                  className="bg-card/90 backdrop-blur-sm px-2.5 py-2 sm:px-4 sm:py-3 rounded-xl border border-border/50"
                  style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart3 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent" />
                    <span className="text-[9px] sm:text-[10px] text-muted-foreground font-medium">Today's Spend</span>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-foreground">₹12,450</span>
                </div>
              </motion.div>

              {/* Floating element: Transaction notification */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -top-14 -right-0 sm:-top-6 sm:-right-14 z-20"
              >
                <div
                  className="bg-card/90 backdrop-blur-sm px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-xl border border-border/50 flex items-center gap-2"
                  style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
                >
                  <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                  <div className="flex flex-col">
                    <span className="text-[10px] sm:text-xs font-medium text-foreground">Fuel ₹2,500</span>
                    <span className="text-[9px] sm:text-[10px] text-muted-foreground">KA-01-AB-1234</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating Monitor Dashboard — bottom-right of card */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="absolute -bottom-16 -right-2 sm:-bottom-12 sm:-right-16 z-20 w-[150px] sm:w-[180px] md:w-[210px]"
              >
                {/* Monitor screen */}
                <div className="bg-white rounded-t-lg border-2 border-gray-300 p-1.5 sm:p-2 md:p-2.5 shadow-md">
                  {/* Header */}
                  <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-gray-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[7px] sm:text-[8px] md:text-[9px] font-medium text-gray-700">Business Dashboard</span>
                  </div>
                  {/* KPI List */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between bg-gray-50 rounded px-1.5 py-1">
                      <div className="flex items-center gap-1">
                        <Truck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" />
                        <span className="text-[7px] sm:text-[8px] text-gray-500">Vehicles</span>
                      </div>
                      <span className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-gray-900">10</span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 rounded px-1.5 py-1">
                      <div className="flex items-center gap-1">
                        <BarChart3 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-500" />
                        <span className="text-[7px] sm:text-[8px] text-gray-500">Profit/Loss</span>
                      </div>
                      <span className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-green-500">+₹50K</span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 rounded px-1.5 py-1">
                      <div className="flex items-center gap-1">
                        <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent" />
                        <span className="text-[7px] sm:text-[8px] text-gray-500">Teams</span>
                      </div>
                      <span className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-gray-900">5</span>
                    </div>
                  </div>
                </div>
                {/* Monitor stand */}
                <div className="h-1.5 bg-gray-400 rounded-b mx-5 sm:mx-7" />
                <div className="h-1 bg-gray-300 rounded-b mx-8 sm:mx-10" />
              </motion.div>

              {/* Main Card */}
              <div
                className="w-[260px] h-[163px] sm:w-[290px] sm:h-[181px] md:w-[360px] md:h-[225px] rounded-2xl overflow-hidden animate-[hero-float_7s_ease-in-out_infinite] relative"
                style={{
                  backgroundColor: '#021a42',
                  transform: 'perspective(1200px) rotateY(-3deg) rotateX(2deg)',
                  boxShadow: '0 20px 60px rgba(2,26,66,0.12)',
                }}
              >
                {/* Wave pattern background */}
                <div className="absolute inset-0 opacity-20">
                  <svg viewBox="0 0 390 240" className="w-full h-full" preserveAspectRatio="none">
                    <path d="M0 140 Q97 95, 195 140 T390 140 V240 H0 Z" fill="#0a3a7a" />
                    <path d="M0 165 Q97 120, 195 165 T390 165 V240 H0 Z" fill="#0a3a7a" />
                  </svg>
                </div>
                <div className="relative h-full p-3 sm:p-4 md:p-5 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <img src={paytapCardLogo} alt="PayTap" className="h-5 sm:h-6 md:h-8 object-contain" loading="lazy" />
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full border border-white/40 flex items-center justify-center">
                      <div className="text-[5px] sm:text-[6px] md:text-[7px] text-white/80 text-center leading-tight font-medium">
                        <div>For Use</div><div>Only in</div><div>India</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="relative w-10 h-10 sm:w-11 sm:h-11 md:w-14 md:h-14">
                      <div className="absolute inset-0 flex flex-col rounded overflow-hidden">
                        <div className="flex-1 bg-orange-500" />
                        <div className="flex-1 bg-white" />
                        <div className="flex-1 bg-green-600" />
                      </div>
                      <svg viewBox="0 0 24 24" className="absolute inset-0 w-full h-full p-1" fill="none" stroke="#021a42" strokeWidth="2">
                        <path d="M8.5 14.5a5 5 0 0 1 0-7" strokeLinecap="round" />
                        <path d="M5.5 17a9 9 0 0 1 0-12" strokeLinecap="round" />
                        <circle cx="14" cy="12" r="2" fill="#021a42" />
                      </svg>
                    </div>
                    <div className="flex flex-col items-end">
                      <svg viewBox="0 0 40 20" className="w-12 sm:w-14 md:w-18 h-3 sm:h-4 md:h-5">
                        <path d="M2 10 Q8 4, 16 8 T28 6" stroke="#c41e3a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        <path d="M4 14 Q10 8, 18 12 T30 10" stroke="#c41e3a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                      </svg>
                      <span className="text-white text-[8px] sm:text-[9px] md:text-[11px] font-bold tracking-wider">RuPay</span>
                      <span className="text-white/70 text-[6px] sm:text-[7px] md:text-[9px] tracking-widest">PREPAID</span>
                    </div>
                  </div>
                  <div className="space-y-0.5 sm:space-y-1">
                    <div className="text-white/90 text-[9px] sm:text-[11px] md:text-sm tracking-[0.2em] font-mono">1234 5678 1234 5678</div>
                    <div className="flex items-end justify-between">
                      <div className="flex gap-3 sm:gap-4 items-end">
                        <div>
                          <div className="text-white/50 text-[6px] sm:text-[7px] md:text-[9px]">CVV</div>
                          <div className="text-white text-[9px] sm:text-[11px] md:text-sm font-mono">123</div>
                        </div>
                        <div>
                          <div className="text-white/50 text-[6px] sm:text-[7px] md:text-[9px]">VALID THRU</div>
                          <div className="text-white text-[9px] sm:text-[11px] md:text-sm font-mono">01/28</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white/80 text-[7px] sm:text-[9px] md:text-[11px] tracking-wide">CARDHOLDER NAME</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="border-t border-border/40 mt-16 lg:mt-24 pt-8 lg:pt-12">
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
