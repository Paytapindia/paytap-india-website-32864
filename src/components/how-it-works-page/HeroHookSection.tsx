import { motion } from 'framer-motion';
import ScrollSection from './ScrollSection';

const HeroHookSection = () => {
  return (
    <ScrollSection className="relative pt-28 pb-20 md:pt-36 md:pb-28 px-4 overflow-hidden bg-primary">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent/20" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-5 leading-tight tracking-tight"
        >
          Stop Giving Drivers Cash.{' '}
          <span className="text-accent-foreground opacity-90">Start Controlling Vehicle Money.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto"
        >
          India's smartest vehicle payment system for owners who want visibility, limits, and control — not chaos.
        </motion.p>
      </div>
    </ScrollSection>
  );
};

export default HeroHookSection;
