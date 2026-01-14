import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Wifi, Check, Fuel, Car, TrainFront } from 'lucide-react';
import ScrollSection from './ScrollSection';

const useCases = [
  { icon: Fuel, label: 'Fuel Stations' },
  { icon: Car, label: 'Toll Plazas' },
  { icon: TrainFront, label: 'Metro Transit' },
];

const TapPayStep = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });

  return (
    <ScrollSection className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-b from-muted/20 to-background">
      <div ref={ref} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Visual - POS Terminal with Tap */}
        <div className="relative mx-auto order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative"
          >
            {/* POS Terminal */}
            <div className="w-56 sm:w-64 bg-foreground/5 rounded-3xl p-4 border border-border/30 shadow-xl">
              <div className="bg-card rounded-2xl p-6">
                {/* Screen */}
                <div className="bg-muted rounded-xl p-4 mb-4 text-center">
                  <div className="text-xs text-muted-foreground mb-1">Amount</div>
                  <div className="text-2xl font-bold text-foreground">₹250.00</div>
                </div>
                
                {/* Tap area with animation */}
                <motion.div
                  animate={isInView ? { 
                    boxShadow: [
                      "0 0 0 0 rgba(2, 26, 66, 0)",
                      "0 0 0 15px rgba(2, 26, 66, 0.1)",
                      "0 0 0 30px rgba(2, 26, 66, 0)",
                    ]
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                  className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center relative"
                >
                  <Wifi className="w-8 h-8 text-primary" />
                  
                  {/* Tap waves */}
                  <motion.div
                    animate={isInView ? { scale: [1, 1.5], opacity: [0.6, 0] } : {}}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full border-2 border-primary"
                  />
                </motion.div>
                
                <div className="text-center mt-4 text-sm text-muted-foreground">
                  Tap to Pay
                </div>
                
                {/* Success state */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  className="mt-4 p-3 bg-green-500/10 rounded-xl border border-green-500/30 text-center"
                >
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">Payment Successful</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* PayTap tag floating in */}
            <motion.div
              initial={{ x: 100, opacity: 0, rotate: 15 }}
              animate={isInView ? { x: 0, opacity: 1, rotate: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
              className="absolute -right-4 top-1/3 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg"
            >
              <Wifi className="w-8 h-8 text-primary-foreground" />
            </motion.div>
          </motion.div>
        </div>

        {/* Text content */}
        <div className="text-center md:text-left order-1 md:order-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Step 06
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-4 tracking-tight">
              Tap & Pay Anywhere
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mb-8">
              Your Paytap is ready. Just tap and go — fuel, tolls, metro, and more.
            </p>

            {/* Use cases */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={useCase.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full"
                >
                  <useCase.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">{useCase.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </ScrollSection>
  );
};

export default TapPayStep;
