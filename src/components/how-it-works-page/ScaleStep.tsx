import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, memo } from 'react';
import { Rocket, Check, Users, CreditCard, Shield, Brain, FileCheck, ShieldCheck, TrendingUp, Layers } from 'lucide-react';
import ScrollSection from './ScrollSection';

const scaleFeatures = [
  { icon: Users, label: "Multi-vehicle and multi-team management", available: true },
  { icon: CreditCard, label: "Credit enablement for controlled spend", available: false },
  { icon: Shield, label: "Insurance integrations", available: false },
  { icon: Brain, label: "AI-powered transaction insights", available: false },
  { icon: FileCheck, label: "Enterprise reporting & audit trails", available: true },
];

const ScaleStep = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const getDelay = (delay: number) => {
    if (prefersReducedMotion) return 0;
    return isMobile ? delay * 0.5 : delay;
  };

  return (
    <ScrollSection className="min-h-[80vh] md:min-h-screen flex items-center justify-center py-12 md:py-20 px-4 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden hidden sm:block">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
        {/* Visual - Growth icons */}
        <div className="relative mx-auto order-2 md:order-1">
          <div className="w-full max-w-sm">
            {/* Main visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="bg-foreground/5 rounded-3xl p-6 sm:p-8 border border-border/30 shadow-xl"
            >
              <div className="bg-background rounded-2xl p-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-foreground">Scale Mode</div>
                    <div className="text-xs text-muted-foreground">Embedded Finance Layer</div>
                  </div>
                </div>

                {/* Feature grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { icon: TrendingUp, label: "Growth", color: "bg-green-500/10 text-green-600" },
                    { icon: Layers, label: "Scale", color: "bg-blue-500/10 text-blue-600" },
                    { icon: Brain, label: "Intelligence", color: "bg-purple-500/10 text-purple-600" },
                    { icon: Shield, label: "Protection", color: "bg-orange-500/10 text-orange-600" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: getDelay(0.1 + index * 0.1) }}
                      className={`${item.color.split(' ')[0]} rounded-xl p-4 flex flex-col items-center justify-center`}
                    >
                      <item.icon className={`w-6 h-6 ${item.color.split(' ')[1]} mb-2`} />
                      <span className="text-xs font-medium text-foreground">{item.label}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Coming soon badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: getDelay(0.5) }}
                  className="bg-muted/50 rounded-xl p-3 text-center"
                >
                  <span className="text-xs text-muted-foreground">More capabilities rolling out</span>
                  <div className="flex justify-center gap-1 mt-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-2 h-2 bg-primary/30 rounded-full" />
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
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
              Step 05
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-2 tracking-tight">
              Scale with Embedded Finance
            </h2>
            <p className="text-lg sm:text-xl text-primary font-medium mb-4">
              Go Beyond Payments
            </p>
            <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto md:mx-0 mb-6">
              As your operations grow, unlock advanced financial capabilities.
            </p>

            {/* Available & in development */}
            <div className="space-y-3 mb-6">
              <div className="text-sm font-semibold text-foreground mb-2">Available & in development:</div>
              {scaleFeatures.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-left">
                  <div className={`w-8 h-8 ${item.available ? 'bg-green-500/10' : 'bg-muted'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <item.icon className={`w-4 h-4 ${item.available ? 'text-green-600' : 'text-muted-foreground'}`} />
                  </div>
                  <span className="text-sm text-foreground">{item.label}</span>
                  {!item.available && (
                    <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">Coming Soon</span>
                  )}
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
                    Your payment system becomes a financial operating layer for your business.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </ScrollSection>
  );
});

ScaleStep.displayName = 'ScaleStep';

export default ScaleStep;
