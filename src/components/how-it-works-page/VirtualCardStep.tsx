import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ShoppingBag, Wifi } from 'lucide-react';
import ScrollSection from './ScrollSection';
import paytapCardLogo from '@/assets/paytap-card-logo.png';

const VirtualCardStep = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });
  const [showCard, setShowCard] = useState(false);
  const [toggles, setToggles] = useState({ ecommerce: false, contactless: false });

  useEffect(() => {
    if (isInView) {
      const timers = [
        setTimeout(() => setShowCard(true), 500),
        setTimeout(() => setToggles(t => ({ ...t, ecommerce: true })), 1500),
        setTimeout(() => setToggles(t => ({ ...t, contactless: true })), 2000),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [isInView]);

  return (
    <ScrollSection className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div ref={ref} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text content */}
        <div className="text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Step 02
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-4 tracking-tight">
              Your prepaid card is ready.
            </h2>
            <p className="text-lg text-muted-foreground max-w-md">
              Use it online or tap-to-pay instantly.
            </p>
          </motion.div>
        </div>

        {/* Card visualization */}
        <div className="relative mx-auto">
          <div className="flex flex-col items-center gap-8">
            {/* Virtual card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
              animate={showCard ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
              transition={{ duration: 0.8, type: "spring" }}
              className="w-72 sm:w-80 h-44 sm:h-48 rounded-2xl shadow-2xl overflow-hidden"
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
              <div className="relative z-10 h-full p-5 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <img src={paytapCardLogo} alt="Paytap" className="h-7 sm:h-8" />
                  <div className="text-white/60 text-xs">VIRTUAL</div>
                </div>
                <div className="space-y-2">
                  <div className="text-white/80 text-sm tracking-widest font-mono">
                    •••• •••• •••• 4242
                  </div>
                  <div className="flex justify-between text-white/60 text-xs">
                    <span>RAHUL SHARMA</span>
                    <span>12/28</span>
                  </div>
                </div>
              </div>

              {/* Glow effect */}
              {showCard && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute inset-0 bg-primary/30 blur-xl"
                />
              )}
            </motion.div>

            {/* Toggle switches */}
            <div className="flex gap-6">
              {/* E-commerce toggle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={toggles.ecommerce ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <div className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${toggles.ecommerce ? 'bg-primary' : 'bg-muted'}`}>
                  <motion.div
                    initial={{ x: 2 }}
                    animate={{ x: toggles.ecommerce ? 26 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">E-commerce</span>
                </div>
              </motion.div>

              {/* Contactless toggle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={toggles.contactless ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <div className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${toggles.contactless ? 'bg-primary' : 'bg-muted'}`}>
                  <motion.div
                    initial={{ x: 2 }}
                    animate={{ x: toggles.contactless ? 26 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">Contactless</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </ScrollSection>
  );
};

export default VirtualCardStep;
