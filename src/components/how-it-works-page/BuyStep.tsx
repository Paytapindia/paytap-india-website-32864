import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, memo } from 'react';
import { ShoppingCart, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ScrollSection from './ScrollSection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import paytapTagSticker from '@/assets/paytap-tag-sticker-v2.png';
import paytapCard from '@/assets/paytap-card-product.png';

const products = [
  {
    id: 1,
    name: "Paytap NFC Tag / Sticker",
    description: "A compact, stick-anywhere NFC tag for everyday payments. Tap to pay at fuel pumps, recharge FASTag tolls, metros, parking & more — fast and secure.",
    price: "₹499",
    image: paytapTagSticker,
    buyLink: "/paytap-sticker",
  },
  {
    id: 2,
    name: "Paytap Prepaid Physical Card",
    description: "RuPay-powered expense management solution for corporates and MSMEs. Perfect for employee expenses, corporate gifting, and vendor payments.",
    price: "₹499",
    image: paytapCard,
    buyLink: "/paytap-card",
  }
];

const BuyStep = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();
  const navigate = useNavigate();

  const getDelay = (delay: number) => prefersReducedMotion ? 0 : delay;

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
            Order Your Paytap
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Choose your payment tool — Tag or Card — based on the number of vehicles or staff handling your money. Manage all your assets from one simple dashboard.
          </p>
          <p className="text-sm sm:text-base text-primary font-medium max-w-lg mx-auto">
            Welcome to the new revolution in contactless payments in India.
          </p>
          
          {/* LAUNCH OFFER BANNER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: getDelay(0.2) }}
            className="mt-4 sm:mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-white font-semibold shadow-lg text-sm sm:text-base"
          >
            <Gift className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>🎉 LAUNCH OFFER: ₹499 <span className="line-through opacity-70">MRP ₹999</span></span>
          </motion.div>
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
                    {/* Offer Badge */}
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full shadow-md z-10">
                      50% OFF
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
                        <ShoppingCart className="mr-1.5 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                        Order Now
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
