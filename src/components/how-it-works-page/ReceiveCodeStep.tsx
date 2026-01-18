import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, useState, useEffect, memo } from 'react';
import { MessageCircle, Check, Clock } from 'lucide-react';
import ScrollSection from './ScrollSection';

const ReceiveCodeStep = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();
  const [showMessage, setShowMessage] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    if (isInView) {
      // Faster timers for mobile
      const delay1 = prefersReducedMotion ? 0 : (isMobile ? 150 : 300);
      const delay2 = prefersReducedMotion ? 0 : (isMobile ? 400 : 900);
      
      const timers = [
        setTimeout(() => setShowMessage(true), delay1),
        setTimeout(() => setShowCode(true), delay2),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [isInView, prefersReducedMotion, isMobile]);

  return (
    <ScrollSection className="min-h-[80vh] md:min-h-screen flex items-center justify-center py-12 md:py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div ref={ref} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Phone mockup with WhatsApp */}
        <div className="relative mx-auto order-2 md:order-1">
          <div className="w-56 sm:w-72 bg-foreground/5 rounded-[2.5rem] sm:rounded-[3rem] p-2 sm:p-3 border border-border/30 shadow-xl">
            <div className="bg-background rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden min-h-[380px] sm:min-h-[480px]">
              {/* WhatsApp header */}
              <div className="bg-[#128C7E] p-3 sm:p-4 flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium text-xs sm:text-sm">Paytap Support</div>
                  <div className="text-white/70 text-[10px] sm:text-xs">online</div>
                </div>
              </div>
              
              {/* Chat area */}
              <div className="p-3 sm:p-4 bg-[#ECE5DD] min-h-[300px] sm:min-h-[380px] space-y-2 sm:space-y-3">
                {/* Welcome message */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={showMessage ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-lg p-2 sm:p-3 shadow-sm max-w-[90%] sm:max-w-[85%]"
                >
                  <p className="text-xs sm:text-sm text-gray-800">
                    🎉 Thank you for ordering Paytap!
                  </p>
                  <p className="text-xs sm:text-sm text-gray-800 mt-1 sm:mt-2">
                    Your order has been confirmed and is being processed.
                  </p>
                  <div className="text-[9px] sm:text-[10px] text-gray-500 text-right mt-1">10:30 AM</div>
                </motion.div>

                {/* Activation code message */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={showCode ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-lg p-2 sm:p-3 shadow-sm max-w-[90%] sm:max-w-[85%]"
                >
                  <p className="text-xs sm:text-sm text-gray-800 mb-2 sm:mb-3">
                    Welcome to Paytap! Your account is almost ready 🎉
                  </p>
                  <div className="bg-primary/10 rounded-lg p-2 sm:p-3 border border-primary/20">
                    <div className="text-[10px] sm:text-xs text-muted-foreground mb-1">Your Activation Code</div>
                    <div className="text-lg sm:text-xl font-bold text-primary tracking-widest font-mono">
                      N1U7NBU2
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-600 mt-2">
                    Enter this code during sign-up to activate your Paytap account and get started.
                  </p>
                  <div className="text-[9px] sm:text-[10px] text-gray-500 text-right mt-1">
                    <Check className="w-3 h-3 inline text-[#53BDEB]" /> 2:45 PM
                  </div>
                </motion.div>
              </div>
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
              Step 02
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 tracking-tight">
              Receive Your Activation Code
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto md:mx-0">
              Once your Paytap is delivered, we'll send your unique activation code via WhatsApp.
            </p>
            
            <div className="mt-6 sm:mt-8 flex items-center gap-3 text-muted-foreground md:justify-start justify-center">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm">Delivered within 3-5 business days</span>
            </div>
          </motion.div>
        </div>
      </div>
    </ScrollSection>
  );
});

ReceiveCodeStep.displayName = 'ReceiveCodeStep';

export default ReceiveCodeStep;
