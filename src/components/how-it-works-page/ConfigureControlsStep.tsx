import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, useState, useEffect, memo } from 'react';
import { Settings2, Check, Car, Users, Tag, Sliders, Bell, ShieldCheck, FolderOpen } from 'lucide-react';
import ScrollSection from './ScrollSection';

const configItems = [
  { icon: Tag, label: "Create tags for Vehicles, Teams, or Roles" },
  { icon: Sliders, label: "Set daily, weekly, or per-transaction limits" },
  { icon: Users, label: "Assign users and permissions" },
  { icon: FolderOpen, label: "Define categories (fuel, tolls, parking, expenses)" },
  { icon: Bell, label: "Enable real-time alerts and approvals" },
];

const tagItems = [
  { icon: Car, name: "Vehicle Tags", count: "3 active" },
  { icon: Users, name: "Team Tags", count: "5 active" },
  { icon: Tag, name: "Personal Tags", count: "2 active" },
];

const ConfigureControlsStep = memo(() => {
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
              Step 02
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-2 tracking-tight">
              Configure Controls & Structure
            </h2>
            <p className="text-lg sm:text-xl text-primary font-medium mb-4">
              Design How Money Can Move
            </p>
            <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto md:mx-0 mb-6">
              Set up how spending should work before a single rupee is used.
            </p>

            {/* What you can configure */}
            <div className="space-y-3 mb-6">
              <div className="text-sm font-semibold text-foreground mb-2">What you can configure:</div>
              {configItems.map((item, index) => (
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
                    Your payment system is now governed, not just enabled.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Visual - Dashboard controls mockup */}
        <div className="relative mx-auto">
          <div className="w-full max-w-sm bg-foreground/5 rounded-2xl sm:rounded-3xl p-3 sm:p-4 border border-border/30 shadow-xl">
            <div className="bg-background rounded-xl sm:rounded-2xl p-4 sm:p-6">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={step >= 1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-between mb-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                    <Settings2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Control Center</div>
                    <div className="text-xs text-muted-foreground">Configure your structure</div>
                  </div>
                </div>
              </motion.div>

              {/* Tag categories */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={step >= 2 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4 }}
                className="space-y-2 mb-4"
              >
                {tagItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.count}</div>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                  </div>
                ))}
              </motion.div>

              {/* Limit slider mockup */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={step >= 3 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4 }}
                className="bg-muted/50 rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Daily Limit</span>
                  <span className="text-sm font-semibold text-primary">₹5,000</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-primary rounded-full" />
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
                  <span>₹0</span>
                  <span>₹10,000</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </ScrollSection>
  );
});

ConfigureControlsStep.displayName = 'ConfigureControlsStep';

export default ConfigureControlsStep;
