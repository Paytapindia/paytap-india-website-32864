import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, ReactNode, memo, useMemo } from 'react';

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const ScrollSection = memo(({ children, className = '', delay = 0 }: ScrollSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  const prefersReducedMotion = useReducedMotion();
  
  // Detect mobile for faster animations
  const isMobile = useMemo(() => typeof window !== 'undefined' && window.innerWidth < 768, []);

  // Skip animation for users who prefer reduced motion
  if (prefersReducedMotion) {
    return <section className={className}>{children}</section>;
  }

  const yOffset = isMobile ? 20 : 40;
  const duration = isMobile ? 0.35 : 0.6;
  const adjustedDelay = isMobile ? delay * 0.5 : delay;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: yOffset }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{ 
        duration, 
        delay: adjustedDelay,
        ease: [0.25, 0.1, 0.25, 1] 
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
});

ScrollSection.displayName = 'ScrollSection';

export default ScrollSection;
