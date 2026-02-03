import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, memo } from 'react';
import { Unlock, ShieldCheck, BarChart3, Sliders, Headphones, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const includedFeatures = [
  { icon: ShieldCheck, text: "RBI-compliant prepaid infrastructure" },
  { icon: BarChart3, text: "Live expense & transaction dashboard" },
  { icon: Sliders, text: "Smart spend controls" },
  { icon: Headphones, text: "Priority support" },
  { icon: MapPin, text: "Nationwide acceptance (8L+ RuPay POS terminals)" },
];

const PlatformAccessBanner = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const getDelay = (delay: number) => {
    if (prefersReducedMotion) return 0;
    return isMobile ? delay * 0.5 : delay;
  };

  return (
    <section 
      ref={ref}
      className="py-16 md:py-24 px-4 bg-gradient-to-b from-muted/20 to-background"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Platform Access & Deployment
          </h2>
        </motion.div>

        {/* Pricing card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: getDelay(0.1) }}
          className="bg-card border border-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl"
        >
          {/* Price header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <Unlock className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Platform Access</span>
            </div>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">₹499</span>
              <span className="text-lg text-muted-foreground line-through">₹4,999</span>
            </div>
            <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
              Includes access to the Paytap control platform, dashboard, smart controls, and NFC tag or RuPay prepaid card provisioning.
            </p>
          </div>

          {/* Features grid */}
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-8">
            {includedFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: getDelay(0.2 + index * 0.05) }}
                className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-foreground">{feature.text}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: getDelay(0.5) }}
            className="text-center"
          >
            <Button
              asChild
              size="lg"
              className="h-12 sm:h-14 px-8 sm:px-10 text-base sm:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Link to="/checkout" className="inline-flex items-center gap-2">
                <Unlock className="w-4 h-4 sm:w-5 sm:h-5" />
                Activate Your Paytap Platform
              </Link>
            </Button>
            <p className="text-xs sm:text-sm text-muted-foreground mt-4">
              No monthly fees • Upgrade as you scale • Built for individuals, teams, and enterprises
            </p>
          </motion.div>
        </motion.div>

        {/* Why this works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: getDelay(0.6) }}
          className="mt-8 text-center"
        >
          <div className="inline-block bg-muted/50 rounded-xl px-6 py-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Control First. Hardware Second.</span>
              <br />
              Paytap is designed as a financial platform, with physical tags and cards acting as secure access points — not standalone products.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

PlatformAccessBanner.displayName = 'PlatformAccessBanner';

export default PlatformAccessBanner;
