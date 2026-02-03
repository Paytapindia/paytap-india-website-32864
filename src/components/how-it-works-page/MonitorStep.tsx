import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, useState, useEffect, memo } from 'react';
import { Eye, Check, BarChart3, Car, Bell, AlertCircle, FileCheck, ShieldCheck, TrendingUp } from 'lucide-react';
import ScrollSection from './ScrollSection';

const monitorFeatures = [
  { icon: BarChart3, label: "Live transaction feed" },
  { icon: Car, label: "Spend by vehicle, user, or category" },
  { icon: Bell, label: "Alerts for limit breaches or unusual activity" },
  { icon: FileCheck, label: "Downloadable reports for accounting and compliance" },
];

const transactions = [
  { vehicle: "KA-01-AB-1234", amount: "₹1,250", location: "HP Fuel Station", time: "2 min ago", type: "Fuel" },
  { vehicle: "KA-01-CD-5678", amount: "₹45", location: "NICE Toll", time: "15 min ago", type: "Toll" },
  { vehicle: "KA-01-EF-9012", amount: "₹320", location: "MG Road Parking", time: "1 hr ago", type: "Parking" },
];

const MonitorStep = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    if (isInView) {
      const baseDelay = prefersReducedMotion ? 0 : (isMobile ? 100 : 200);
      const interval = prefersReducedMotion ? 0 : (isMobile ? 200 : 400);
      
      const timers = [
        setTimeout(() => setStep(1), baseDelay),
        setTimeout(() => setStep(2), baseDelay + interval),
        setTimeout(() => setStep(3), baseDelay + interval * 2),
        setTimeout(() => setStep(4), baseDelay + interval * 3),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [isInView, prefersReducedMotion, isMobile]);

  const getDelay = (delay: number) => {
    if (prefersReducedMotion) return 0;
    return isMobile ? delay * 0.5 : delay;
  };

  return (
    <ScrollSection className="min-h-[80vh] md:min-h-screen flex items-center justify-center py-12 md:py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div ref={ref} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Text content */}
        <div className="text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Step 04
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-2 tracking-tight">
              Monitor, Control & Optimize
            </h2>
            <p className="text-lg sm:text-xl text-primary font-medium mb-4">
              Turn Transactions into Intelligence
            </p>
            <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto md:mx-0 mb-6">
              Every transaction flows back into your dashboard in real time.
            </p>

            {/* What you see */}
            <div className="space-y-3 mb-6">
              <div className="text-sm font-semibold text-foreground mb-2">What you see:</div>
              {monitorFeatures.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-left">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Outcome box */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: getDelay(0.4) }}
              className="bg-primary/5 border border-primary/20 rounded-xl p-4"
            >
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-foreground mb-1">Outcome</div>
                  <p className="text-sm text-muted-foreground">
                    You move from tracking expenses to managing financial operations.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Visual - Dashboard mockup */}
        <div className="relative mx-auto">
          <div className="w-full max-w-sm bg-foreground/5 rounded-2xl sm:rounded-3xl p-3 sm:p-4 border border-border/30 shadow-xl">
            <div className="bg-background rounded-xl sm:rounded-2xl p-4 sm:p-6">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={step >= 1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-between mb-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Live Dashboard</div>
                    <div className="text-xs text-muted-foreground">Real-time monitoring</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] text-green-600 font-medium">LIVE</span>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={step >= 2 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-2 gap-3 mb-4"
              >
                <div className="bg-muted/50 rounded-xl p-3">
                  <div className="text-xs text-muted-foreground mb-1">Today's Spend</div>
                  <div className="text-xl font-bold text-foreground">₹12,450</div>
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-[10px]">Within limits</span>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-xl p-3">
                  <div className="text-xs text-muted-foreground mb-1">Transactions</div>
                  <div className="text-xl font-bold text-primary">24</div>
                  <div className="text-[10px] text-muted-foreground">Last 24 hours</div>
                </div>
              </motion.div>

              {/* Transaction feed */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={step >= 3 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4 }}
                className="space-y-2 mb-4"
              >
                <div className="text-xs text-muted-foreground mb-2">Recent Transactions</div>
                {transactions.slice(0, 2).map((tx, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
                    <Car className="w-4 h-4 text-primary" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-foreground truncate">{tx.vehicle}</div>
                      <div className="text-[10px] text-muted-foreground truncate">{tx.location}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-semibold text-foreground">{tx.amount}</div>
                      <div className="text-[10px] text-muted-foreground">{tx.time}</div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Alert */}
              {step >= 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/30"
                >
                  <div className="flex items-center gap-2 text-amber-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-xs font-medium">Alert: KA-01-GH-3456 approaching daily limit</span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ScrollSection>
  );
});

MonitorStep.displayName = 'MonitorStep';

export default MonitorStep;
