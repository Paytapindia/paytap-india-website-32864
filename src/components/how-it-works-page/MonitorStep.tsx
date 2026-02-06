import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, memo } from 'react';
import { Eye, Check, Car, AlertCircle, TrendingUp } from 'lucide-react';
import ScrollSection from './ScrollSection';

const bullets = [
  "Live transaction feed",
  "Spend by vehicle, user, or category",
  "Alerts for limit breaches",
];

const transactions = [
  { vehicle: "KA-01-AB-1234", amount: "₹1,250", location: "HP Fuel Station", time: "2 min ago" },
  { vehicle: "KA-01-CD-5678", amount: "₹45", location: "NICE Toll", time: "15 min ago" },
];

const MonitorStep = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <ScrollSection className="min-h-[50vh] md:min-h-[70vh] flex items-center justify-center py-8 md:py-12 px-4 bg-gradient-to-b from-background to-muted/20">
      <div ref={ref} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8 items-center">
        {/* Text content */}
        <div className="text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-3">
              Step 04
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-2 tracking-tight">
              Monitor in Real-Time
            </h2>
            <p className="text-base sm:text-lg text-primary font-medium mb-4">
              Every transaction. Every vehicle. Live.
            </p>

            {/* Bullets */}
            <div className="space-y-2">
              {bullets.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-left">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Visual - Dashboard mockup */}
        <div className="relative mx-auto">
          <div className="w-full max-w-sm bg-foreground/5 rounded-2xl p-3 border border-border/30 shadow-xl">
            <div className="bg-background rounded-xl p-4">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-between mb-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Live Dashboard</div>
                    <div className="text-[10px] text-muted-foreground">Real-time monitoring</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[9px] text-green-600 font-medium">LIVE</span>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="grid grid-cols-2 gap-2 mb-3"
              >
                <div className="bg-muted/50 rounded-lg p-2">
                  <div className="text-[10px] text-muted-foreground mb-0.5">Today's Spend</div>
                  <div className="text-lg font-bold text-foreground">₹12,450</div>
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-2.5 h-2.5" />
                    <span className="text-[9px]">Within limits</span>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-2">
                  <div className="text-[10px] text-muted-foreground mb-0.5">Transactions</div>
                  <div className="text-lg font-bold text-primary">24</div>
                  <div className="text-[9px] text-muted-foreground">Last 24 hours</div>
                </div>
              </motion.div>

              {/* Transaction feed */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="space-y-1.5 mb-3"
              >
                {transactions.map((tx, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                    <Car className="w-3.5 h-3.5 text-primary" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-medium text-foreground truncate">{tx.vehicle}</div>
                      <div className="text-[9px] text-muted-foreground truncate">{tx.location}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-semibold text-foreground">{tx.amount}</div>
                      <div className="text-[9px] text-muted-foreground">{tx.time}</div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Alert */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/30"
              >
                <div className="flex items-center gap-2 text-amber-600">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-medium">Alert: Vehicle approaching daily limit</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </ScrollSection>
  );
});

MonitorStep.displayName = 'MonitorStep';

export default MonitorStep;
