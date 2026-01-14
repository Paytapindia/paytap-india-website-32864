import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ScrollSection from './ScrollSection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import paytapTagSticker from '@/assets/paytap-tag-sticker-v2.png';
import paytapCard from '@/assets/paytap-card-product.png';

const products = [
  {
    id: 1,
    name: "PayTap NFC Tag / Sticker",
    description: "A compact, stick-anywhere NFC tag for everyday payments. Tap to pay at fuel pumps, recharge FASTag tolls, metros, parking & more — fast and secure.",
    price: "₹499",
    image: paytapTagSticker,
    buyLink: "/paytap-sticker",
  },
  {
    id: 2,
    name: "PayTap Prepaid Physical Card",
    description: "RuPay-powered expense management solution for corporates and MSMEs. Perfect for employee expenses, corporate gifting, and vendor payments.",
    price: "₹499",
    image: paytapCard,
    buyLink: "/paytap-card",
  }
];

const BuyStep = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });
  const navigate = useNavigate();

  return (
    <ScrollSection className="min-h-screen flex items-center justify-center pt-8 pb-20 px-4 bg-background">
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

        {/* Product cards - matching ProductCarousel design */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1, type: "spring" }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Card className="bg-card border-border overflow-hidden h-full hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-0 flex flex-col h-full">
                  {/* Product Image */}
                  <div className="relative bg-gradient-to-br from-secondary/50 to-secondary p-6 flex items-center justify-center h-[240px] sm:h-[280px]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-w-[200px] sm:max-w-[240px] max-h-[200px] sm:max-h-[240px] w-auto h-auto object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="p-6 flex flex-col flex-grow min-h-[180px] text-left">
                    <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base mb-4 flex-grow">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-2xl sm:text-3xl font-bold text-primary">
                        {product.price}
                      </span>
                      <Button
                        onClick={() => navigate(product.buyLink)}
                        className="bg-paytap-light hover:bg-paytap-dark text-white px-6 py-3 text-sm sm:text-base font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group"
                      >
                        <ShoppingCart className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
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
};

export default BuyStep;
