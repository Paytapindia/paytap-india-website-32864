import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, memo } from 'react';
import { Wifi, Check, Fuel, Car, TrainFront } from 'lucide-react';
import ScrollSection from './ScrollSection';

const useCases = [
  { icon: Fuel, label: 'Fuel Stations' },
  { icon: Car, label: 'Toll Plazas' },
  { icon: TrainFront, label: 'Metro Transit' },
];

const TapPayStep = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const getDelay = (delay: number) => {
    if (prefersReducedMotion) return 0;
    return isMobile ? delay * 0.5 : delay;
  };

  // Simplified animation for mobile - no infinite animations
  const tapAnimation = prefersReducedMotion 
    ? {} 
    : { 
        boxShadow: [
          "0 0 0 0 rgba(2, 26, 66, 0)",
          "0 0 0 15px rgba(2, 26, 66, 0.1)",
          "0 0 0 0 rgba(2, 26, 66, 0)",
        ]
      };

  const waveAnimation = prefersReducedMotion
    ? {}
    : { scale: [1, 1.3], opacity: [0.6, 0] };

  return (
    <ScrollSection className="min-h-[80vh] md:min-h-screen flex items-center justify-center py-12 md:py-20 px-4 bg-gradient-to-b from-muted/20 to-background">
      <div ref={ref} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Visual - POS Terminal with Tap */}
        <div className="relative mx-auto order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* POS Terminal */}
            <div className="w-48 sm:w-64 bg-foreground/5 rounded-3xl p-3 sm:p-4 border border-border/30 shadow-xl">
              <div className="bg-card rounded-2xl p-4 sm:p-6">
                {/* Screen */}
                <div className="bg-muted rounded-xl p-3 sm:p-4 mb-4 text-center">
                  <div className="text-xs text-muted-foreground mb-1">Amount</div>
                  <div className="text-xl sm:text-2xl font-bold text-foreground">₹250.00</div>
                </div>
                
                {/* Tap area - simplified animation, runs only twice */}
                <motion.div
                  animate={isInView ? tapAnimation : {}}
                  transition={{ duration: 1.5, repeat: 2, ease: "easeOut" }}
                  className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center relative"
                >
                  <Wifi className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                  
                  {/* Tap waves - runs only twice */}
                  <motion.div
                    animate={isInView ? waveAnimation : {}}
                    transition={{ duration: 1, repeat: 2, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full border-2 border-primary"
                  />
                </motion.div>
                
                <div className="text-center mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground">
                  Tap to Pay
                </div>
                
                {/* Success state */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1, duration: 0.4 }}
                  className="mt-3 sm:mt-4 p-2 sm:p-3 bg-green-500/10 rounded-xl border border-green-500/30 text-center"
                >
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-medium text-sm">Payment Successful</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* PayTap tag floating in */}
            <motion.div
              initial={{ x: 80, opacity: 0, rotate: 15 }}
              animate={isInView ? { x: 0, opacity: 1, rotate: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -right-2 sm:-right-4 top-1/3 w-12 h-12 sm:w-16 sm:h-16 bg-primary rounded-full flex items-center justify-center shadow-lg"
            >
              <Wifi className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
            </motion.div>
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
              Step 06
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 tracking-tight">
              Tap & Pay Anywhere
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-md mb-6 sm:mb-8 mx-auto md:mx-0">
              Your Paytap is ready. Just tap and go — fuel, tolls, metro, and more.
            </p>

            {/* Use cases */}
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={useCase.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: getDelay(0.3 + index * 0.1), duration: 0.4 }}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-muted/50 rounded-full"
                >
                  <useCase.icon className="w-4 h-4 text-primary" />
                  <span className="text-xs sm:text-sm text-foreground">{useCase.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </ScrollSection>
  );
});

TapPayStep.displayName = 'TapPayStep';

export default TapPayStep;
