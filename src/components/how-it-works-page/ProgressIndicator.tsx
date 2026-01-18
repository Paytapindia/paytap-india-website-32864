import { motion, useReducedMotion } from 'framer-motion';
import { memo } from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator = memo(({ currentStep, totalSteps }: ProgressIndicatorProps) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-50 bg-background/80 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border/20 shadow-lg">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.8 }}
          animate={{ 
            scale: i === currentStep ? 1.2 : 1,
            backgroundColor: i <= currentStep ? 'hsl(var(--primary))' : 'hsl(var(--muted))'
          }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
            i <= currentStep ? 'w-4 sm:w-6' : 'w-1.5 sm:w-2'
          }`}
        />
      ))}
    </div>
  );
});

ProgressIndicator.displayName = 'ProgressIndicator';

export default ProgressIndicator;
