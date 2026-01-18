import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, memo } from 'react';
import { Settings, Plus, Check, Car, Smartphone } from 'lucide-react';
import ScrollSection from './ScrollSection';
import installTagCar from '@/assets/install-tag-car.png';

const ActivateInstallStep = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  const getDelay = (delay: number) => prefersReducedMotion ? 0 : delay;

  return (
    <ScrollSection className="min-h-[80vh] md:min-h-screen flex items-center justify-center py-12 md:py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Step 05
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 tracking-tight">
            Activate & Install Your Tag
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto">
            Get your Paytap ready for your first tap.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-12">
          {/* Activate Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: getDelay(0.2) }}
            className="bg-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-border shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground">Activate Your Tag</h3>
            </div>

            {/* Phone mockup */}
            <div className="bg-muted/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6">
              <div className="bg-background rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-inner">
                {/* App header */}
                <div className="text-center mb-3 sm:mb-4">
                  <div className="text-xs sm:text-sm font-medium text-foreground">Paytap App</div>
                </div>

                {/* Steps */}
                <div className="space-y-2 sm:space-y-3">
                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: getDelay(0.4), duration: 0.4 }}
                    className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-muted rounded-lg sm:rounded-xl"
                  >
                    <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    <span className="text-xs sm:text-sm text-foreground">Go to Card Settings</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: getDelay(0.5), duration: 0.4 }}
                    className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-muted rounded-lg sm:rounded-xl"
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    <span className="text-xs sm:text-sm text-foreground">Tap "Add Card"</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: getDelay(0.6), duration: 0.4 }}
                    className="p-2 sm:p-3 bg-muted rounded-lg sm:rounded-xl"
                  >
                    <div className="text-[10px] sm:text-xs text-muted-foreground mb-1">Activation Code</div>
                    <div className="font-mono text-base sm:text-lg text-foreground tracking-wider">PT-8X4K-9M2N</div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: getDelay(0.8), duration: 0.4 }}
                    className="flex items-center justify-center gap-2 p-2 sm:p-3 bg-green-500/10 rounded-lg sm:rounded-xl border border-green-500/30"
                  >
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    <span className="text-xs sm:text-sm font-medium text-green-600">Tag Activated!</span>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
              <p>1. Open the Paytap app on your phone</p>
              <p>2. Navigate to Card Settings</p>
              <p>3. Tap "Add Card" and enter the activation code</p>
              <p>4. Your tag is ready to use!</p>
            </div>
          </motion.div>

          {/* Install Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: getDelay(0.3) }}
            className="bg-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-border shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Car className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground">Install Your Tag</h3>
            </div>

            {/* Car windshield illustration */}
            <div className="bg-muted/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6">
              <motion.img
                src={installTagCar}
                alt="Install Paytap tag on windshield or dashboard"
                loading="lazy"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: getDelay(0.4), duration: 0.5 }}
                className="w-full h-auto rounded-lg sm:rounded-xl"
              />
            </div>

            {/* Installation tips */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-muted/50 rounded-lg sm:rounded-xl">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-foreground">Manage multiple vehicles under one account</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-muted/50 rounded-lg sm:rounded-xl">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-foreground">Place tag on a flat, clean surface</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-muted/50 rounded-lg sm:rounded-xl">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-foreground">Inside dashboard OR inside windshield</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-muted/50 rounded-lg sm:rounded-xl">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-foreground">Keep accessible for merchant POS tap</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ScrollSection>
  );
});

ActivateInstallStep.displayName = 'ActivateInstallStep';

export default ActivateInstallStep;
