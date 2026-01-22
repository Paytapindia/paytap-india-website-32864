import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, useState, useEffect, memo } from 'react';
import { Check, BarChart3, Car, Bell, Sliders, TrendingUp, AlertCircle, Tag, Users } from 'lucide-react';
import ScrollSection from './ScrollSection';

const tagItems = [
  { icon: Car, name: "Tag 1 — Vehicle", limit: "₹5,000/day" },
  { icon: Users, name: "Tag 2 — Team Expense", limit: "₹3,000/day" },
  { icon: Tag, name: "Tag 3 — Personal", limit: "₹2,000/day" },
];

const SignUpStep = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    if (isInView) {
      const baseDelay = prefersReducedMotion ? 0 : (isMobile ? 150 : 300);
      const interval = prefersReducedMotion ? 0 : (isMobile ? 200 : 500);
      
      const timers = [
        setTimeout(() => setStep(1), baseDelay),
        setTimeout(() => setStep(2), baseDelay + interval),
        setTimeout(() => setStep(3), baseDelay + interval * 2),
        setTimeout(() => setStep(4), baseDelay + interval * 3),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [isInView, prefersReducedMotion, isMobile]);

  return (
    <ScrollSection className="min-h-[80vh] md:min-h-screen flex items-center justify-center py-12 md:py-20 px-4 bg-background">
      <div ref={ref} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Dashboard mockup */}
        <div className="relative mx-auto order-2 md:order-1">
          <div className="w-full max-w-sm bg-foreground/5 rounded-2xl sm:rounded-3xl p-3 sm:p-4 border border-border/30 shadow-xl">
            <div className="bg-background rounded-xl sm:rounded-2xl p-4 sm:p-6">
              {/* Dashboard header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <div className="text-xs text-muted-foreground">Paytap Dashboard</div>
                  <div className="text-lg sm:text-xl font-bold text-foreground">Smart Controls</div>
                </div>
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-primary" />
                </div>
              </div>
              
              {/* Stats grid */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={step >= 1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-2 gap-3 mb-4"
              >
                <div className="bg-muted/50 rounded-xl p-3">
                  <div className="text-xs text-muted-foreground mb-1">Active Tags</div>
                  <div className="text-xl font-bold text-foreground">12</div>
                </div>
                <div className="bg-muted/50 rounded-xl p-3">
                  <div className="text-xs text-muted-foreground mb-1">This Month</div>
                  <div className="text-xl font-bold text-primary">₹45,230</div>
                </div>
              </motion.div>

              {/* Tag list */}
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={step >= 2 ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4 }}
                className="space-y-2 mb-4"
              >
                {tagItems.slice(0, 2).map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                    <item.icon className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <div className="text-sm text-foreground">{item.name}</div>
                      <div className="text-xs text-muted-foreground">Limit: {item.limit}</div>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                  </div>
                ))}
              </motion.div>

              {/* Control buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={step >= 3 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4 }}
                className="flex gap-2"
              >
                <div className="flex-1 flex items-center justify-center gap-2 p-2 bg-primary/10 rounded-lg text-primary">
                  <Sliders className="w-4 h-4" />
                  <span className="text-xs font-medium">Set Limits</span>
                </div>
                <div className="flex-1 flex items-center justify-center gap-2 p-2 bg-primary/10 rounded-lg text-primary">
                  <Bell className="w-4 h-4" />
                  <span className="text-xs font-medium">Alerts</span>
                </div>
              </motion.div>

              {/* Real-time alert */}
              {step >= 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 p-3 bg-amber-500/10 rounded-xl border border-amber-500/30"
                >
                  <div className="flex items-center gap-2 text-amber-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-xs font-medium">Real-time: KA-01-AB-1234 — ₹850 at Shell Fuel</span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className="text-center md:text-left order-1 md:order-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Step 04
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 tracking-tight">
              Control & Monitor in Real-Time
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto md:mx-0 mb-6">
              Set limits, track expenses, and manage tags using smart controls and live reports.
            </p>

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-left">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sliders className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-foreground">Set daily, weekly, or per-transaction limits</span>
              </div>
              <div className="flex items-center gap-3 text-left">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bell className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-foreground">Instant alerts for every transaction</span>
              </div>
              <div className="flex items-center gap-3 text-left">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-foreground">AI-powered spending insights</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ScrollSection>
  );
});

SignUpStep.displayName = 'SignUpStep';

export default SignUpStep;
