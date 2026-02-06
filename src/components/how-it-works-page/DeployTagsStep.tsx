import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, memo } from 'react';
import { Check, Truck, Tag, Wifi, Car, Users, CreditCard, MapPin } from 'lucide-react';
import ScrollSection from './ScrollSection';
import paytapTagSticker from '@/assets/paytap-tag-sticker-v2.png';
import paytapCard from '@/assets/paytap-card-product.png';

const bullets = [
  "Free delivery across India",
  "Activate in your dashboard",
  "Works at all RuPay locations",
];

const DeployTagsStep = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <ScrollSection className="min-h-[50vh] md:min-h-[70vh] flex items-center justify-center py-8 md:py-12 px-4 bg-background">
      <div ref={ref} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8 items-center">
        {/* Visual - Deployment mockup */}
        <div className="relative mx-auto order-2 md:order-1">
          <div className="bg-foreground/5 rounded-2xl p-4 border border-border/30 shadow-xl">
            {/* Shipping visual */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4 }}
              className="bg-background rounded-xl p-4 mb-3"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Deployment Ready</div>
                  <div className="text-xs text-muted-foreground">Tags & cards shipped</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img src={paytapTagSticker} alt="Paytap NFC Tag" className="w-12 h-12 object-contain" />
                <img src={paytapCard} alt="Paytap RuPay Card" className="w-12 h-12 object-contain" />
                <div className="flex-1 text-xs text-foreground">NFC Tags + RuPay Cards</div>
                <Check className="w-4 h-4 text-green-500" />
              </div>
            </motion.div>

            {/* Activation visual */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-background rounded-xl p-4"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <Tag className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Link & Activate</div>
                  <div className="text-xs text-muted-foreground">Connect to dashboard</div>
                </div>
              </div>
              
              {/* Deployment grid */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: Car, label: "Vehicle" },
                  { icon: Users, label: "Team" },
                  { icon: CreditCard, label: "Wallet" },
                ].map((item) => (
                  <div key={item.label} className="bg-muted/50 rounded-lg p-2 text-center">
                    <item.icon className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
                    <div className="flex items-center justify-center gap-1">
                      <Wifi className="w-2.5 h-2.5 text-green-500" />
                      <span className="text-[9px] text-green-600 font-medium">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Text content */}
        <div className="text-center md:text-left order-1 md:order-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-3">
              Step 03
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-2 tracking-tight">
              Deploy Tags & Cards
            </h2>
            <p className="text-base sm:text-lg text-primary font-medium mb-4">
              Ship. Activate. Transact.
            </p>

            {/* Bullets */}
            <div className="space-y-2 mb-4">
              {bullets.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-left">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-muted-foreground md:justify-start justify-center">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-xs">Pan-India delivery included</span>
            </div>
          </motion.div>
        </div>
      </div>
    </ScrollSection>
  );
});

DeployTagsStep.displayName = 'DeployTagsStep';

export default DeployTagsStep;
