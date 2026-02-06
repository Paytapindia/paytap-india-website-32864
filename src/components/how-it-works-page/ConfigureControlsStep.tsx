import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, memo } from 'react';
import { Settings2, Check, Car, Users, Tag, Sliders } from 'lucide-react';
import ScrollSection from './ScrollSection';

const bullets = [
  "Set daily/weekly/per-transaction limits",
  "Assign users and permissions",
  "Enable real-time alerts",
];

const tagItems = [
  { icon: Car, name: "Vehicle Tags", count: "3 active" },
  { icon: Users, name: "Team Tags", count: "5 active" },
  { icon: Tag, name: "Personal Tags", count: "2 active" },
];

const ConfigureControlsStep = memo(() => {
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
              Step 02
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-2 tracking-tight">
              Set Spending Rules
            </h2>
            <p className="text-base sm:text-lg text-primary font-medium mb-4">
              Define limits before money moves.
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

        {/* Visual - Dashboard controls mockup */}
        <div className="relative mx-auto">
          <div className="w-full max-w-sm bg-foreground/5 rounded-2xl p-3 border border-border/30 shadow-xl">
            <div className="bg-background rounded-xl p-4">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <Settings2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Control Center</div>
                  <div className="text-xs text-muted-foreground">Configure structure</div>
                </div>
              </motion.div>

              {/* Tag categories */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="space-y-2 mb-4"
              >
                {tagItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                    <div className="w-7 h-7 bg-primary/10 rounded-lg flex items-center justify-center">
                      <item.icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-medium text-foreground">{item.name}</div>
                      <div className="text-[10px] text-muted-foreground">{item.count}</div>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                  </div>
                ))}
              </motion.div>

              {/* Limit slider mockup */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-muted/50 rounded-lg p-3"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-muted-foreground">Daily Limit</span>
                  <span className="text-xs font-semibold text-primary">₹5,000</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-primary rounded-full" />
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
