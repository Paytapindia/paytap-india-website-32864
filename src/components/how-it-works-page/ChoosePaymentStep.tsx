import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CreditCard, Wifi } from 'lucide-react';
import ScrollSection from './ScrollSection';
import paytapCardLogo from '@/assets/paytap-card-logo.png';

const ChoosePaymentStep = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });

  return (
    <ScrollSection className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-b from-muted/20 to-background">
      <div ref={ref} className="max-w-6xl mx-auto text-center">
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Step 04
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-4 tracking-tight">
            Pay the way you want.
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Card or contactless tag — delivered to you.
          </p>
        </motion.div>

        {/* Two-card choice */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Physical Card */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            className="group cursor-pointer"
          >
            <div className="bg-card rounded-3xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                {/* Card preview */}
                <div 
                  className="w-48 h-28 mx-auto mb-6 rounded-xl shadow-lg overflow-hidden"
                  style={{ backgroundColor: '#021a42' }}
                >
                  <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 200 120" preserveAspectRatio="none">
                    <path d="M0,60 C50,80 100,40 200,60 L200,120 L0,120 Z" fill="rgba(246,36,91,0.3)" />
                  </svg>
                  <div className="relative z-10 h-full p-4 flex flex-col justify-between">
                    <img src={paytapCardLogo} alt="Paytap" className="h-5" />
                    <div className="text-white/60 text-[10px] tracking-widest font-mono">
                      •••• 4242
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 mb-3">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Physical Card</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Thin, matte finish. Works everywhere cards are accepted.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contactless Tag */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
            whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            className="group cursor-pointer"
          >
            <div className="bg-card rounded-3xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                {/* Tag preview */}
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg relative">
                  {/* Animated rings */}
                  <motion.div
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full border-2 border-primary"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
                    className="absolute inset-0 rounded-full border-2 border-primary"
                  />
                  <Wifi className="w-10 h-10 text-primary-foreground" />
                </div>

                <div className="flex items-center justify-center gap-2 mb-3">
                  <Wifi className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Contactless Tag</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Compact, modern. Just tap and go anywhere.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ScrollSection>
  );
};

export default ChoosePaymentStep;
