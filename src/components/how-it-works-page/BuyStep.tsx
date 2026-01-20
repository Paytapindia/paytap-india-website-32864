import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, memo } from 'react';
import { Unlock, Gift, CheckCircle, Wifi, BarChart3, Car, FileText, Headphones, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ScrollSection from './ScrollSection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import paytapTagSticker from '@/assets/paytap-tag-sticker-v2.png';
import paytapCard from '@/assets/paytap-card-product.png';

const pricingIncludes = [
  { icon: Wifi, text: "PayTap NFC Tag", value: "₹1,499 Value" },
  { icon: CreditCard, text: "1-Year Business Account", value: "₹3,500 Value" },
  { icon: BarChart3, text: "Live Expense Dashboard" },
  { icon: Car, text: "Smart Controls" },
  { icon: FileText, text: "GST & Business Reports" },
  { icon: Headphones, text: "Priority Support" },
];

const products = [
  {
    id: 1,
    name: "PayTap NFC Tag",
    description: "NFC payment tags for controlled, cashless spending at fuel pumps, tolls, and more.",
    price: "₹499",
    image: paytapTagSticker,
    buyLink: "/paytap-sticker",
  },
  {
    id: 2,
    name: "PayTap Prepaid Card",
    description: "RuPay-powered expense management. Perfect for employee expenses, vendor payments, or personal control.",
    price: "₹499",
    image: paytapCard,
    buyLink: "/paytap-card",
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
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12"
        >
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Step 01
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 tracking-tight">
            Activate Your PayTap Account
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Pay ₹499 to unlock PayTap's smart payment control platform. 
            This activates your dashboard, spending controls, and reporting.
          </p>
          <p className="text-sm sm:text-base text-primary font-medium max-w-lg mx-auto">
            Built for anyone who needs to control how their money moves.
          </p>
          
          {/* FOUNDER ACCESS BANNER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: getDelay(0.2) }}
            className="mt-4 sm:mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-white font-semibold shadow-lg text-sm sm:text-base"
          >
            <Unlock className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Platform Access — ₹499 <span className="opacity-70">(₹4999 Value)</span></span>
          </motion.div>
        </motion.div>

        {/* Pricing includes grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: getDelay(0.2) }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto mb-8 md:mb-12"
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

        {/* Product cards */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: getDelay(0.3 + index * 0.1) }}
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
      </div>
    </ScrollSection>
  );
});

BuyStep.displayName = 'BuyStep';

export default BuyStep;
