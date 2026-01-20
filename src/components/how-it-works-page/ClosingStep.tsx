import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, memo } from 'react';
import { TrendingUp, FileText, BarChart3, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const features = [
  { icon: FileText, label: 'GST Reports' },
  { icon: BarChart3, label: 'Spending Trends' },
  { icon: TrendingUp, label: 'Spending Analytics' },
];

const ClosingStep = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const getDelay = (delay: number) => {
    if (prefersReducedMotion) return 0;
    return isMobile ? delay * 0.5 : delay;
  };

  return (
    <section 
      ref={ref}
      className="min-h-[80vh] md:min-h-screen flex items-center justify-center py-12 md:py-20 px-4 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden hidden sm:block">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Step indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Step 04
          </div>
        </motion.div>

        {/* Feature icons */}
        <motion.div 
          className="flex justify-center gap-6 sm:gap-12 mb-10 sm:mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: getDelay(0.15 + index * 0.1),
              }}
              className="flex flex-col items-center gap-2 sm:gap-3"
            >
              <div className="w-14 h-14 sm:w-20 sm:h-20 bg-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center">
                <feature.icon className="w-7 h-7 sm:w-10 sm:h-10 text-primary" />
              </div>
              <span className="text-[10px] sm:text-sm text-muted-foreground">{feature.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: getDelay(0.4) }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 tracking-tight">
            Scale with Intelligence
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-4 sm:mb-6">
            Download GST-ready reports, monitor spending trends, and optimize as you grow.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto">
            You're now in control of how your money moves.
            <br />
            <span className="text-primary font-medium">Control. Intelligence. Scale.</span>
          </p>
        </motion.div>

        {/* Single CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: getDelay(0.6) }}
        >
          <Button
            asChild
            size="lg"
            className="h-12 sm:h-14 px-8 sm:px-10 text-base sm:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Link to="/checkout" className="inline-flex items-center gap-2">
              <Unlock className="w-4 h-4 sm:w-5 sm:h-5" />
              Activate Paytap Account
            </Link>
          </Button>
          <p className="text-xs sm:text-sm text-muted-foreground mt-4">
            No monthly fees • Cancel anytime • Upgrade as you scale
          </p>
        </motion.div>
      </div>
    </section>
  );
});

ClosingStep.displayName = 'ClosingStep';

export default ClosingStep;
