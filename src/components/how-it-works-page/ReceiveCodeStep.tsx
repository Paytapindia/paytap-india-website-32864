import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, useState, useEffect, memo } from 'react';
import { Truck, Check, MapPin, Tag, Wifi, Car, Users } from 'lucide-react';
import ScrollSection from './ScrollSection';
import paytapTagSticker from '@/assets/paytap-tag-sticker-v2.png';
const ReceiveCodeStep = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1
  });
  const prefersReducedMotion = useReducedMotion();
  const [showDelivery, setShowDelivery] = useState(false);
  const [showInstall, setShowInstall] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const tagUseCases = [{
    icon: Car,
    label: "Vehicle"
  }, {
    icon: Users,
    label: "Team"
  }, {
    icon: Tag,
    label: "Personal"
  }];
  useEffect(() => {
    if (isInView) {
      const delay1 = prefersReducedMotion ? 0 : isMobile ? 150 : 300;
      const delay2 = prefersReducedMotion ? 0 : isMobile ? 400 : 900;
      const timers = [setTimeout(() => setShowDelivery(true), delay1), setTimeout(() => setShowInstall(true), delay2)];
      return () => timers.forEach(clearTimeout);
    }
  }, [isInView, prefersReducedMotion, isMobile]);
  return <ScrollSection className="min-h-[80vh] md:min-h-screen flex items-center justify-center py-12 md:py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div ref={ref} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Visual - Fleet deployment */}
        <div className="relative mx-auto order-2 md:order-1">
          <div className="bg-foreground/5 rounded-3xl p-6 sm:p-8 border border-border/30 shadow-xl">
            {/* Tag delivery visual */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={showDelivery ? {
            opacity: 1,
            y: 0
          } : {}} transition={{
            duration: 0.5
          }} className="bg-background rounded-2xl p-4 sm:p-6 mb-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">NFC Tags Shipped</div>
                  <div className="text-xs text-muted-foreground">3-5 business days delivery</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img src={paytapTagSticker} alt="PayTap NFC Tag" className="w-16 h-16 object-contain" />
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground mb-1">Package Contents</div>
                  <div className="text-sm text-foreground">PayTap NFC Tag + Activation Guide</div>
                </div>
                <Check className="w-5 h-5 text-green-500" />
              </div>
            </motion.div>

            {/* Tag setup visual */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={showInstall ? {
            opacity: 1,
            y: 0
          } : {}} transition={{
            duration: 0.5
          }} className="bg-background rounded-2xl p-4 sm:p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <Tag className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Set Up Your Tags</div>
                  <div className="text-xs text-muted-foreground">Activate and assign your tags</div>
                </div>
              </div>
              
              {/* Use case grid */}
              <div className="grid grid-cols-3 gap-2">
                {tagUseCases.map(useCase => <div key={useCase.label} className="bg-muted/50 rounded-lg p-3 text-center">
                    <useCase.icon className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
                    <div className="flex items-center justify-center gap-1">
                      <Wifi className="w-3 h-3 text-green-500" />
                      <span className="text-[10px] text-green-600 font-medium">{useCase.label}</span>
                    </div>
                  </div>)}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Text content */}
        <div className="text-center md:text-left order-1 md:order-2">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.6
        }}>
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Step 02
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 tracking-tight">
              Receive & Set Up Your Tags
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto md:mx-0 mb-6">Receive your PayTap NFC tags or card and set them up wherever you need controlled spending — vehicles, teams, or personal use.</p>
            
            {/* Installation tips */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-left">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm text-foreground">Stick anywhere — vehicles, wallets, or equipment</span>
              </div>
              <div className="flex items-center gap-3 text-left">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm text-foreground">Manage multiple tags from one account</span>
              </div>
              <div className="flex items-center gap-3 text-left">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm text-foreground">Set individual limits per tag</span>
              </div>
            </div>
            
            <div className="mt-6 sm:mt-8 flex items-center gap-3 text-muted-foreground md:justify-start justify-center">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-sm">Free delivery across India</span>
            </div>
          </motion.div>
        </div>
      </div>
    </ScrollSection>;
});
ReceiveCodeStep.displayName = 'ReceiveCodeStep';
export default ReceiveCodeStep;