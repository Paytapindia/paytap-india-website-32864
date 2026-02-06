import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, memo } from 'react';
import { Rocket, Check, TrendingUp, Layers, Brain, Shield } from 'lucide-react';
import ScrollSection from './ScrollSection';

const bullets = [
  "Multi-vehicle & multi-team management",
  "Enterprise reporting & audit trails",
  "More capabilities rolling out",
];

const ScaleStep = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <ScrollSection className="min-h-[50vh] md:min-h-[70vh] flex items-center justify-center py-8 md:py-12 px-4 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden hidden sm:block">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8 items-center relative z-10">
        {/* Visual - Growth icons */}
        <div className="relative mx-auto order-2 md:order-1">
          <div className="w-full max-w-sm">
            {/* Main visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="bg-foreground/5 rounded-2xl p-4 border border-border/30 shadow-xl"
            >
              <div className="bg-background rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
                    <Rocket className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Scale Mode</div>
                    <div className="text-[10px] text-muted-foreground">Embedded Finance Layer</div>
                  </div>
                </div>

                {/* Feature grid */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {[
                    { icon: TrendingUp, label: "Growth", color: "bg-green-500/10 text-green-600" },
                    { icon: Layers, label: "Scale", color: "bg-blue-500/10 text-blue-600" },
                    { icon: Brain, label: "Intelligence", color: "bg-purple-500/10 text-purple-600" },
                    { icon: Shield, label: "Protection", color: "bg-orange-500/10 text-orange-600" },
                  ].map((item) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.4 }}
                      className={`${item.color.split(' ')[0]} rounded-lg p-3 flex flex-col items-center justify-center`}
                    >
                      <item.icon className={`w-5 h-5 ${item.color.split(' ')[1]} mb-1`} />
                      <span className="text-[10px] font-medium text-foreground">{item.label}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Coming soon badge */}
                <div className="bg-muted/50 rounded-lg p-2 text-center">
                  <span className="text-[10px] text-muted-foreground">More capabilities rolling out</span>
                  <div className="flex justify-center gap-1 mt-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-1.5 h-1.5 bg-primary/30 rounded-full" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Text content */}
        <div className="text-center md:text-left order-1 md:order-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-3">
              Step 05
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-2 tracking-tight">
              Scale Your Operations
            </h2>
            <p className="text-base sm:text-lg text-primary font-medium mb-4">
              From 1 vehicle to 1,000.
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
      </div>
    </ScrollSection>
  );
});

ScaleStep.displayName = 'ScaleStep';

export default ScaleStep;
