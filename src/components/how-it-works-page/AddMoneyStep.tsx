import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, useState, useEffect, memo } from 'react';
import { Wallet, CreditCard, Building2, Smartphone } from 'lucide-react';
import ScrollSection from './ScrollSection';

const paymentMethods = [
  { icon: Smartphone, label: 'UPI', color: 'bg-purple-500' },
  { icon: CreditCard, label: 'Debit Card', color: 'bg-blue-500' },
  { icon: CreditCard, label: 'Credit Card', color: 'bg-green-500' },
  { icon: Building2, label: 'Net Banking', color: 'bg-orange-500' },
];

const AddMoneyStep = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();
  const [balance, setBalance] = useState(0);
  const [showIcons, setShowIcons] = useState(false);

  useEffect(() => {
    if (isInView) {
      setShowIcons(true);
      
      if (prefersReducedMotion) {
        setBalance(5000);
        return;
      }
      
      // Faster animation for mobile
      const duration = 1500;
      const targetBalance = 5000;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setBalance(Math.floor(eased * targetBalance));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      const timer = setTimeout(animate, 500);
      return () => clearTimeout(timer);
    }
  }, [isInView, prefersReducedMotion]);

  return (
    <ScrollSection className="min-h-[80vh] md:min-h-screen flex items-center justify-center py-12 md:py-20 px-4 bg-background">
      <div ref={ref} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Wallet visualization */}
        <div className="relative mx-auto order-2 md:order-1">
          <div className="flex flex-col items-center gap-6 sm:gap-8">
            {/* Balance display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="w-64 sm:w-80 bg-gradient-to-br from-primary to-primary/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center shadow-xl sm:shadow-2xl"
            >
              <Wallet className="w-10 h-10 sm:w-12 sm:h-12 text-primary-foreground/80 mx-auto mb-3 sm:mb-4" />
              <div className="text-primary-foreground/70 text-xs sm:text-sm mb-2">Available Balance</div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground tracking-tight">
                ₹{balance.toLocaleString('en-IN')}
              </div>
            </motion.div>

            {/* Payment method icons */}
            <div className="flex gap-3 sm:gap-4 flex-wrap justify-center">
              {paymentMethods.map((method, index) => (
                <motion.div
                  key={method.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={showIcons ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.2 + index * 0.1,
                  }}
                  className="flex flex-col items-center gap-1.5 sm:gap-2"
                >
                  <div className={`w-11 h-11 sm:w-14 sm:h-14 ${method.color} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg`}>
                    <method.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <span className="text-[10px] sm:text-xs text-muted-foreground">{method.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className="text-center md:text-left order-1 md:order-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Step 04
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 tracking-tight">
              Add money your way.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto md:mx-0">
              Fast, secure, and flexible.
            </p>
          </motion.div>
        </div>
      </div>
    </ScrollSection>
  );
});

AddMoneyStep.displayName = 'AddMoneyStep';

export default AddMoneyStep;
