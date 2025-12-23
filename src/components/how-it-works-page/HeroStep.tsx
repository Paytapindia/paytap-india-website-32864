import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import paytapCardLogo from '@/assets/paytap-card-logo.png';

const HeroStep = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const cardY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const cardRotate = useTransform(scrollYProgress, [0, 0.5], [-5, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-background to-muted/30"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <motion.div 
        style={{ y: cardY, opacity }}
        className="relative z-10 text-center px-4"
      >
        {/* Floating PayTap Card */}
        <motion.div
          style={{ rotate: cardRotate }}
          className="relative mx-auto mb-12 w-72 sm:w-80 md:w-96 h-44 sm:h-48 md:h-56 perspective-1000"
        >
          <div 
            className="w-full h-full rounded-2xl shadow-2xl animate-float animate-glow-pulse overflow-hidden"
            style={{ 
              backgroundColor: '#021a42',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Wave pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 250" preserveAspectRatio="none">
              <path d="M0,100 C100,150 200,50 400,100 L400,250 L0,250 Z" fill="rgba(246,36,91,0.3)" />
              <path d="M0,150 C150,100 250,200 400,150 L400,250 L0,250 Z" fill="rgba(246,36,91,0.2)" />
            </svg>
            
            {/* Card content */}
            <div className="relative z-10 h-full p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <img src={paytapCardLogo} alt="PayTap" className="h-8 sm:h-10" />
                <div className="text-white/60 text-xs">PREPAID</div>
              </div>
              <div className="space-y-2">
                <div className="text-white/80 text-sm tracking-widest font-mono">
                  •••• •••• •••• 4242
                </div>
                <div className="flex justify-between text-white/60 text-xs">
                  <span>CARDHOLDER NAME</span>
                  <span>12/28</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hero copy */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4 tracking-tight"
        >
          Set up PayTap in under a minute.
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-md mx-auto"
        >
          From sign-up to first payment — instantly.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full mx-auto flex justify-center pt-2"
          >
            <motion.div className="w-1.5 h-3 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroStep;
