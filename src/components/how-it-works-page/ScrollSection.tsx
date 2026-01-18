import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, ReactNode, memo } from 'react';

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const ScrollSection = memo(({ children, className = '', delay = 0 }: ScrollSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  // Skip animation for users who prefer reduced motion
  if (prefersReducedMotion) {
    return <section className={className}>{children}</section>;
  }

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ 
        duration: 0.6, 
        delay,
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
