import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, memo } from 'react';
import { Coffee, ShoppingCart, Smartphone, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const scenes = [
  { icon: Coffee, label: 'Tap at café' },
  { icon: ShoppingCart, label: 'Online checkout' },
  { icon: Smartphone, label: 'Quick scan' },
];

const ClosingStep = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  const getDelay = (delay: number) => prefersReducedMotion ? 0 : delay;

  return (
    <section 
      ref={ref}
      className="min-h-[80vh] md:min-h-screen flex items-center justify-center py-12 md:py-20 px-4 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden"
    >
      {/* Subtle background elements - simplified for mobile */}
      <div className="absolute inset-0 overflow-hidden hidden sm:block">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Scene illustrations */}
        <motion.div 
          className="flex justify-center gap-6 sm:gap-12 mb-10 sm:mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {scenes.map((scene, index) => (
            <motion.div
              key={scene.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: getDelay(0.15 + index * 0.1),
              }}
              className="flex flex-col items-center gap-2 sm:gap-3"
            >
              <div className="w-14 h-14 sm:w-20 sm:h-20 bg-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center">
                <scene.icon className="w-7 h-7 sm:w-10 sm:h-10 text-primary" />
              </div>
              <span className="text-[10px] sm:text-sm text-muted-foreground">{scene.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: getDelay(0.4) }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-foreground mb-4 sm:mb-6 tracking-tight leading-tight">
            You're now part of India's
            <br />
            <span className="text-primary">contactless future.</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-12">
            Simple. Secure. PayTap.
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
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              Order Your PayTap Now
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
});

ClosingStep.displayName = 'ClosingStep';

export default ClosingStep;
