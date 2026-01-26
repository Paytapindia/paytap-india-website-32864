import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, memo } from 'react';
import { Unlock, Gift, CheckCircle, Wifi, BarChart3, Car, Headphones, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ScrollSection from './ScrollSection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import paytapTagSticker from '@/assets/paytap-tag-sticker-v2.png';
import paytapCard from '@/assets/paytap-card-product.png';

const pricingIncludes = [
  { icon: Wifi, text: "1 Paytap NFC Tag", value: "₹999 Value" },
  { icon: CreditCard, text: "Lifetime Platform Access", value: "₹4,000 Value" },
  { icon: BarChart3, text: "Live Expense Dashboard" },
  { icon: Car, text: "Smart Controls" },
  { icon: Headphones, text: "Priority Support" },
];

const products = [
  {
    id: 1,
    name: "Paytap NFC Tag Plan",
    description: "Start with an NFC tag — stick anywhere and tap to pay at fuel pumps, tolls, metros, and parking.",
    price: "₹499",
    image: paytapTagSticker,
    buyLink: "/checkout?product=sticker",
  },
  {
    id: 2,
    name: "Prepaid Card Plan",
    description: "Start with a RuPay prepaid card — accepted at 8L+ merchants for team expenses and everyday control.",
    price: "₹499",
    image: paytapCard,
    buyLink: "/checkout?product=card",
  }
];

const BuyStep = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();
  const navigate = useNavigate();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const getDelay = (delay: number) => {
    if (prefersReducedMotion) return 0;
    return isMobile ? delay * 0.5 : delay;
  };

  return (
    <ScrollSection className="min-h-[80vh] md:min-h-screen flex items-center justify-center pt-8 pb-12 md:pb-20 px-4 bg-background">
      <div ref={ref} className="max-w-6xl mx-auto text-center">
        {/* Step badge and heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6 md:mb-8"
        >
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Step 01
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight">
            Buy the Plan
          </h2>
        </motion.div>

        {/* Product cards - MOVED UP */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto mb-8 md:mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: getDelay(0.1 + index * 0.1) }}
              className="group"
            >
              <Card className="bg-card border-border overflow-hidden h-full hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-0 flex flex-col h-full">
                  {/* Product Image */}
                  <div className="relative bg-gradient-to-br from-secondary/50 to-secondary p-4 sm:p-6 flex items-center justify-center h-[200px] sm:h-[280px]">
                    {/* Enterprise Badge */}
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-primary text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full shadow-md z-10">
                      Enterprise Value
                    </div>
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="max-w-[160px] sm:max-w-[240px] max-h-[160px] sm:max-h-[240px] w-auto h-auto object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="p-4 sm:p-6 flex flex-col flex-grow min-h-[160px] sm:min-h-[180px] text-left">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-2">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm md:text-base mb-4 flex-grow">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
                        {product.price}
                      </span>
                      <Button
                        onClick={() => navigate(product.buyLink)}
                        className="bg-paytap-light hover:bg-paytap-dark text-white px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm md:text-base font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group"
                      >
                        <Unlock className="mr-1.5 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                        Activate Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* PLATFORM ACCESS BANNER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: getDelay(0.3) }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-white font-semibold shadow-lg text-sm sm:text-base"
        >
          <Unlock className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Platform Access — ₹499 <span className="opacity-70">(₹4999 Value)</span></span>
        </motion.div>

        {/* What's Included heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: getDelay(0.35) }}
          className="mt-6 sm:mt-8 mb-4"
        >
          <h3 className="text-base sm:text-lg font-semibold text-foreground">
            What's Included
          </h3>
        </motion.div>

        {/* Pricing includes grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: getDelay(0.4) }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto"
        >
          {pricingIncludes.map((item, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 p-3 bg-card border border-border rounded-xl text-left"
            >
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <item.icon className="w-4 h-4 text-primary" />
              </div>
              <div className="min-w-0">
                <span className="text-xs sm:text-sm text-foreground block truncate">{item.text}</span>
                {item.value && (
                  <span className="text-[10px] sm:text-xs text-primary font-medium">{item.value}</span>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </ScrollSection>
  );
});

BuyStep.displayName = 'BuyStep';

export default BuyStep;
