import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, useState, useEffect, memo } from 'react';
import { Unlock, ArrowRight, Smartphone, Check, Shield, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollSection from './ScrollSection';

const ActivateAccountStep = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const getDelay = (delay: number) => {
    if (prefersReducedMotion) return 0;
    return isMobile ? delay * 0.5 : delay;
  };

  useEffect(() => {
    if (isInView) {
      const delays = [300, 600, 900].map(d => isMobile ? d * 0.5 : d);
      const timers = delays.map((delay, index) => 
        setTimeout(() => setStep(index + 1), delay)
      );
      return () => timers.forEach(clearTimeout);
    }
  }, [isInView, isMobile]);

  const trustItems = [
    { icon: Clock, text: "1 minute setup" },
    { icon: Shield, text: "No documents needed" },
    { icon: Sparkles, text: "Free to start" },
  ];

  const kycSteps = [
    { label: "Enter phone number", complete: step >= 1 },
    { label: "Complete Min KYC Details", complete: step >= 2 },
    { label: "Account ready!", complete: step >= 3 },
  ];

  return (
    <ScrollSection className="min-h-[80vh] md:min-h-screen flex items-center justify-center py-12 md:py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div ref={ref} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Visual - Dashboard mockup */}
        <div className="relative mx-auto order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="bg-foreground/5 rounded-3xl p-6 sm:p-8 border border-border/30 shadow-xl"
          >
            {/* Phone mockup header */}
            <div className="bg-background rounded-2xl p-4 sm:p-6 mb-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Paytap Dashboard</div>
                  <div className="text-xs text-muted-foreground">Quick Account Setup</div>
                </div>
              </div>

              {/* KYC Steps visualization */}
              <div className="space-y-3">
                {kycSteps.map((kycStep, index) => (
                  <motion.div
                    key={kycStep.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: getDelay(0.2 + index * 0.15) }}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      kycStep.complete 
                        ? 'bg-primary/10 border border-primary/20' 
                        : 'bg-muted/50'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      kycStep.complete 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted-foreground/20 text-muted-foreground'
                    }`}>
                      {kycStep.complete ? <Check className="w-3.5 h-3.5" /> : index + 1}
                    </div>
                    <span className={`text-sm ${kycStep.complete ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                      {kycStep.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-3 gap-2">
              {trustItems.map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: getDelay(0.5 + index * 0.1) }}
                  className="bg-background rounded-lg p-3 text-center"
                >
                  <item.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                  <span className="text-[10px] sm:text-xs text-muted-foreground">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Text content */}
        <div className="text-center md:text-left order-1 md:order-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Step 01
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 tracking-tight">
              Activate Paytap Account
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto md:mx-0 mb-6">
              Visit our dashboard and create your mini KYC account under a minute. No paperwork, no waiting.
            </p>

            {/* CTA Button - matching Hero section */}
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 md:px-10 py-5 md:py-6 text-base md:text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group min-h-[56px] md:min-h-[64px] w-full sm:w-auto"
              onClick={() => window.open('https://dashboard.paytap.co.in/login', '_blank')}
            >
              <Unlock className="mr-2 md:mr-3 w-4 h-4 md:w-5 md:h-5" />
              Activate Paytap Account
              <ArrowRight className="ml-2 md:ml-3 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* Additional info */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4 text-muted-foreground md:justify-start justify-center">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span className="text-sm">Instant activation</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span className="text-sm">100% digital</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ScrollSection>
  );
});

ActivateAccountStep.displayName = 'ActivateAccountStep';

export default ActivateAccountStep;
