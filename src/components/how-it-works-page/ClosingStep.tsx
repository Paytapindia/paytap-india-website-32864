import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Coffee, ShoppingCart, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const scenes = [
  { icon: Coffee, label: 'Tap at café' },
  { icon: ShoppingCart, label: 'Online checkout' },
  { icon: Smartphone, label: 'Quick scan' },
];

const ClosingStep = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleGetStarted = () => {
    window.open('https://app.mypaytap.com/signup', '_blank');
  };

  return (
    <section 
      ref={ref}
      className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Scene illustrations */}
        <motion.div 
          className="flex justify-center gap-8 sm:gap-12 mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          {scenes.map((scene, index) => (
            <motion.div
              key={scene.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: 0.2 + index * 0.15,
                type: "spring"
              }}
              className="flex flex-col items-center gap-3"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-2xl flex items-center justify-center"
              >
                <scene.icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              </motion.div>
              <span className="text-xs sm:text-sm text-muted-foreground">{scene.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 tracking-tight leading-tight">
            You're now part of India's
            <br />
            <span className="text-primary">contactless future.</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Simple. Secure. PayTap.
          </p>
        </motion.div>

        {/* Single CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button
            onClick={handleGetStarted}
            size="lg"
            className="h-14 px-10 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Get Started
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ClosingStep;
