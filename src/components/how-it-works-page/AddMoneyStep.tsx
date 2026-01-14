import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Wallet, CreditCard, Building2, Smartphone } from 'lucide-react';
import ScrollSection from './ScrollSection';

const paymentMethods = [
  { icon: Smartphone, label: 'UPI', color: 'bg-purple-500' },
  { icon: CreditCard, label: 'Debit Card', color: 'bg-blue-500' },
  { icon: CreditCard, label: 'Credit Card', color: 'bg-green-500' },
  { icon: Building2, label: 'Net Banking', color: 'bg-orange-500' },
];

const AddMoneyStep = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });
  const [balance, setBalance] = useState(0);
  const [showIcons, setShowIcons] = useState(false);

  useEffect(() => {
    if (isInView) {
      setShowIcons(true);
      
      // Animate balance counter
      const duration = 2000;
      const targetBalance = 5000;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        setBalance(Math.floor(eased * targetBalance));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      const timer = setTimeout(animate, 800);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <ScrollSection className="min-h-screen flex items-center justify-center py-20 px-4 bg-background">
      <div ref={ref} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Wallet visualization */}
        <div className="relative mx-auto order-2 md:order-1">
          <div className="flex flex-col items-center gap-8">
            {/* Balance display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="w-72 sm:w-80 bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 text-center shadow-2xl"
            >
              <Wallet className="w-12 h-12 text-primary-foreground/80 mx-auto mb-4" />
              <div className="text-primary-foreground/70 text-sm mb-2">Available Balance</div>
              <div className="text-4xl sm:text-5xl font-bold text-primary-foreground tracking-tight">
                ₹{balance.toLocaleString('en-IN')}
              </div>
            </motion.div>

            {/* Payment method icons */}
            <div className="flex gap-4 flex-wrap justify-center">
              {paymentMethods.map((method, index) => (
                <motion.div
                  key={method.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={showIcons ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.3 + index * 0.15,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex flex-col items-center gap-2 cursor-pointer group"
                >
                  <div className={`w-14 h-14 ${method.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                    <method.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs text-muted-foreground">{method.label}</span>
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
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Step 04
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-4 tracking-tight">
              Add money your way.
            </h2>
            <p className="text-lg text-muted-foreground max-w-md">
              Fast, secure, and flexible.
            </p>
          </motion.div>
        </div>
      </div>
    </ScrollSection>
  );
};

export default AddMoneyStep;
