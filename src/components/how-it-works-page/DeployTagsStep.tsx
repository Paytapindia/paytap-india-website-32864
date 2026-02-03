import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, useState, useEffect, memo } from 'react';
import { Package, Check, Truck, Tag, Wifi, Car, Users, CreditCard, ShieldCheck, MapPin } from 'lucide-react';
import ScrollSection from './ScrollSection';
import paytapTagSticker from '@/assets/paytap-tag-sticker-v2.png';
import paytapCard from '@/assets/paytap-card-product.png';

const deploymentSteps = [
  "Tags/cards are shipped or assigned",
  "Activate and link them inside your dashboard",
  "Stick to vehicles, wallets, or equipment",
  "Start transacting at RuPay-enabled locations nationwide",
];

const DeployTagsStep = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();
  const [showDelivery, setShowDelivery] = useState(false);
  const [showActivate, setShowActivate] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    if (isInView) {
      const delay1 = prefersReducedMotion ? 0 : isMobile ? 150 : 300;
      const delay2 = prefersReducedMotion ? 0 : isMobile ? 400 : 800;
      const timers = [
        setTimeout(() => setShowDelivery(true), delay1),
        setTimeout(() => setShowActivate(true), delay2),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [isInView, prefersReducedMotion, isMobile]);

  const getDelay = (delay: number) => {
    if (prefersReducedMotion) return 0;
    return isMobile ? delay * 0.5 : delay;
  };

  return (
    <ScrollSection className="min-h-[80vh] md:min-h-screen flex items-center justify-center py-12 md:py-20 px-4 bg-background">
      <div ref={ref} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Visual - Deployment mockup */}
        <div className="relative mx-auto order-2 md:order-1">
          <div className="bg-foreground/5 rounded-3xl p-6 sm:p-8 border border-border/30 shadow-xl">
            {/* Shipping visual */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={showDelivery ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="bg-background rounded-2xl p-4 sm:p-6 mb-4"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Deployment Ready</div>
                  <div className="text-xs text-muted-foreground">Tags & cards shipped to you</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img src={paytapTagSticker} alt="Paytap NFC Tag" className="w-16 h-16 object-contain" />
                <img src={paytapCard} alt="Paytap RuPay Card" className="w-16 h-16 object-contain" />
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground mb-1">Package Contents</div>
                  <div className="text-sm text-foreground">NFC Tags + RuPay Cards</div>
                </div>
                <Check className="w-5 h-5 text-green-500" />
              </div>
            </motion.div>

            {/* Activation visual */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={showActivate ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="bg-background rounded-2xl p-4 sm:p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <Tag className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Link & Activate</div>
                  <div className="text-xs text-muted-foreground">Connect to your dashboard</div>
                </div>
              </div>
              
              {/* Deployment grid */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: Car, label: "Vehicle" },
                  { icon: Users, label: "Team" },
                  { icon: CreditCard, label: "Wallet" },
                ].map((item) => (
                  <div key={item.label} className="bg-muted/50 rounded-lg p-3 text-center">
                    <item.icon className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
                    <div className="flex items-center justify-center gap-1">
                      <Wifi className="w-3 h-3 text-green-500" />
                      <span className="text-[10px] text-green-600 font-medium">{item.label}</span>
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
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Step 03
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-2 tracking-tight">
              Deploy NFC Tags or Cards
            </h2>
            <p className="text-lg sm:text-xl text-primary font-medium mb-4">
              Connect the Platform to the Real World
            </p>
            <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto md:mx-0 mb-6">
              Once your structure is ready, deploy Paytap NFC tags or RuPay prepaid cards to vehicles, team members, or assets.
            </p>

            {/* How it works */}
            <div className="space-y-3 mb-6">
              <div className="text-sm font-semibold text-foreground mb-2">How it works:</div>
              {deploymentSteps.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-left">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>

            {/* Outcome box */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: getDelay(0.4) }}
              className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-4"
            >
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-foreground mb-1">Outcome</div>
                  <p className="text-sm text-muted-foreground">
                    Your physical operations are now connected to your financial system.
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="flex items-center gap-3 text-muted-foreground md:justify-start justify-center">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-sm">Free delivery across India</span>
            </div>
          </motion.div>
        </div>
      </div>
    </ScrollSection>
  );
});

DeployTagsStep.displayName = 'DeployTagsStep';

export default DeployTagsStep;
