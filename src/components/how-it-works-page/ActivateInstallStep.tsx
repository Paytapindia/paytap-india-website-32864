import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Settings, Plus, Check, Car, Smartphone } from 'lucide-react';
import ScrollSection from './ScrollSection';

const ActivateInstallStep = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });

  return (
    <ScrollSection className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Step 05
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-4 tracking-tight">
            Activate & Install Your Tag
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Get your PayTap ready for your first tap.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Activate Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground">Activate Your Tag</h3>
            </div>

            {/* Phone mockup */}
            <div className="bg-muted/50 rounded-2xl p-4 mb-6">
              <div className="bg-background rounded-xl p-4 shadow-inner">
                {/* App header */}
                <div className="text-center mb-4">
                  <div className="text-sm font-medium text-foreground">PayTap App</div>
                </div>

                {/* Steps */}
                <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="flex items-center gap-3 p-3 bg-muted rounded-xl"
                  >
                    <Settings className="w-5 h-5 text-primary" />
                    <span className="text-sm text-foreground">Go to Card Settings</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="flex items-center gap-3 p-3 bg-muted rounded-xl"
                  >
                    <Plus className="w-5 h-5 text-primary" />
                    <span className="text-sm text-foreground">Tap "Add Card"</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    className="p-3 bg-muted rounded-xl"
                  >
                    <div className="text-xs text-muted-foreground mb-2">Activation Code</div>
                    <div className="font-mono text-lg text-foreground tracking-wider">PT-8X4K-9M2N</div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
                    className="flex items-center justify-center gap-2 p-3 bg-green-500/10 rounded-xl border border-green-500/30"
                  >
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-600">Tag Activated!</span>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>1. Open the PayTap app on your phone</p>
              <p>2. Navigate to Card Settings</p>
              <p>3. Tap "Add Card" and enter the activation code</p>
              <p>4. Your tag is ready to use!</p>
            </div>
          </motion.div>

          {/* Install Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Car className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground">Install Your Tag</h3>
            </div>

            {/* Car windshield illustration */}
            <div className="bg-muted/50 rounded-2xl p-4 mb-6">
              <div className="relative bg-gradient-to-b from-sky-100 to-sky-200 dark:from-sky-900/30 dark:to-sky-800/30 rounded-xl h-48 sm:h-56 overflow-hidden">
                {/* Dashboard line */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-foreground/10 rounded-t-lg">
                  <div className="text-xs text-center pt-2 text-muted-foreground">Dashboard</div>
                </div>

                {/* Windshield */}
                <div className="absolute top-4 left-4 right-4 bottom-20 border-2 border-foreground/20 rounded-lg bg-background/30 backdrop-blur-sm">
                  <div className="text-xs text-center pt-2 text-muted-foreground">Windshield</div>
                  
                  {/* Tag placement options */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
                    className="absolute top-8 right-4 w-12 h-12 bg-primary rounded-lg flex items-center justify-center shadow-lg"
                  >
                    <span className="text-xs font-bold text-primary-foreground">TAG</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="absolute top-8 left-4 text-xs text-foreground bg-background/80 px-2 py-1 rounded"
                  >
                    OR on dashboard ↓
                  </motion.div>
                </div>

                {/* Tag on dashboard option */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary/80 rounded-lg flex items-center justify-center shadow-lg border-2 border-dashed border-primary"
                >
                  <span className="text-xs font-bold text-primary-foreground">TAG</span>
                </motion.div>
              </div>
            </div>

            {/* Installation tips */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl">
                <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground">Place tag on a flat, clean surface</span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl">
                <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground">Inside dashboard OR inside windshield</span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl">
                <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground">Keep accessible for merchant POS tap</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ScrollSection>
  );
};

export default ActivateInstallStep;
