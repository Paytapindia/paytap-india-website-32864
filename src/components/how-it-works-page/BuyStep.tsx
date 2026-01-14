import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ShoppingBag, Wifi, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollSection from './ScrollSection';
import paytapCardLogo from '@/assets/paytap-card-logo.png';

const BuyStep = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });

  return (
    <ScrollSection className="min-h-screen flex items-center justify-center py-20 px-4 bg-background">
      <div ref={ref} className="max-w-6xl mx-auto text-center">
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Step 01
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-4 tracking-tight">
            Order Your PayTap
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Choose your payment tool — Tag or Card. Both at just ₹499.
          </p>
        </motion.div>

        {/* Product cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* NFC Tag */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            whileHover={{ y: -10 }}
            className="group"
          >
            <div className="bg-card rounded-3xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-300 relative overflow-hidden h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                {/* Tag icon */}
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg relative">
                  <motion.div
                    animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full border-2 border-primary"
                  />
                  <Wifi className="w-10 h-10 text-primary-foreground" />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2">PayTap NFC Tag</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Compact, waterproof. Attach to any vehicle or device.
                </p>
                <div className="text-2xl font-bold text-primary mb-4">₹499</div>
                
                <Link 
                  to="/checkout"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Order Now
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Physical Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
            whileHover={{ y: -10 }}
            className="group"
          >
            <div className="bg-card rounded-3xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-300 relative overflow-hidden h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                {/* Card preview */}
                <div 
                  className="w-48 h-28 mx-auto mb-6 rounded-xl shadow-lg overflow-hidden relative"
                  style={{ backgroundColor: '#021a42' }}
                >
                  <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 200 120" preserveAspectRatio="none">
                    <path d="M0,60 C50,80 100,40 200,60 L200,120 L0,120 Z" fill="rgba(246,36,91,0.3)" />
                  </svg>
                  <div className="relative z-10 h-full p-4 flex flex-col justify-between">
                    <img src={paytapCardLogo} alt="PayTap" className="h-5" />
                    <div className="text-white/60 text-[10px] tracking-widest font-mono">
                      •••• 4242
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2">PayTap Prepaid Card</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Thin, matte finish. Works everywhere cards are accepted.
                </p>
                <div className="text-2xl font-bold text-primary mb-4">₹499</div>
                
                <Link 
                  to="/checkout"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
                >
                  <CreditCard className="w-4 h-4" />
                  Order Now
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ScrollSection>
  );
};

export default BuyStep;
