import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, useState, useEffect, memo } from 'react';
import { Check, Phone, User, FileText, Key } from 'lucide-react';
import ScrollSection from './ScrollSection';

const SignUpStep = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (isInView) {
      // Faster timers for mobile - reduced intervals
      const baseDelay = prefersReducedMotion ? 0 : 300;
      const interval = prefersReducedMotion ? 0 : 500;
      
      const timers = [
        setTimeout(() => setStep(1), baseDelay),
        setTimeout(() => setStep(2), baseDelay + interval),
        setTimeout(() => setStep(3), baseDelay + interval * 2),
        setTimeout(() => setStep(4), baseDelay + interval * 3),
        setTimeout(() => setStep(5), baseDelay + interval * 4),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [isInView, prefersReducedMotion]);

  return (
    <ScrollSection className="min-h-[80vh] md:min-h-screen flex items-center justify-center py-12 md:py-20 px-4 bg-background">
      <div ref={ref} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Phone mockup */}
        <div className="relative mx-auto order-2 md:order-1">
          <div className="w-56 sm:w-72 bg-foreground/5 rounded-[2.5rem] sm:rounded-[3rem] p-2 sm:p-3 border border-border/30 shadow-xl">
            <div className="bg-background rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-6 min-h-[420px] sm:min-h-[520px]">
              {/* Notch */}
              <div className="w-20 sm:w-24 h-5 sm:h-6 bg-foreground/10 rounded-full mx-auto mb-4 sm:mb-6" />
              
              {/* Form fields */}
              <div className="space-y-3 sm:space-y-4">
                {/* Activation Code field */}
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={step >= 1 ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-primary/10 rounded-xl border border-primary/30">
                    <Key className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    <span className="text-xs sm:text-sm text-foreground font-mono font-medium">PT-8X4K-2M9L</span>
                  </div>
                  {step >= 2 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -right-1 sm:-right-2 -top-1 sm:-top-2 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </motion.div>
                  )}
                </motion.div>

                {/* Phone field */}
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={step >= 2 ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-muted/50 rounded-xl border border-border/50">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                    <span className="text-xs sm:text-sm text-foreground font-mono">+91 98765 43210</span>
                  </div>
                  {step >= 3 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -right-1 sm:-right-2 -top-1 sm:-top-2 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </motion.div>
                  )}
                </motion.div>

                {/* Name field */}
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={step >= 3 ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-muted/50 rounded-xl border border-border/50"
                >
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                  <span className="text-xs sm:text-sm text-foreground">Rahul Sharma</span>
                </motion.div>

                {/* PAN field */}
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={step >= 4 ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-muted/50 rounded-xl border border-border/50">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                    <span className="text-xs sm:text-sm text-foreground font-mono">ABCDE1234F</span>
                  </div>
                  {step >= 5 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -right-1 sm:-right-2 -top-1 sm:-top-2 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </motion.div>
                  )}
                </motion.div>

                {/* Verified badge */}
                {step >= 5 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-500/10 rounded-xl border border-green-500/30 text-center"
                  >
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="font-medium text-sm sm:text-base">Wallet Created</span>
                    </div>
                  </motion.div>
                )}
              </div>
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
              Step 03
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 tracking-tight">
              Create Your Account
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto md:mx-0">
              Enter your activation code and complete minimum-KYC in under 60 seconds.
            </p>
          </motion.div>
        </div>
      </div>
    </ScrollSection>
  );
});

SignUpStep.displayName = 'SignUpStep';

export default SignUpStep;
