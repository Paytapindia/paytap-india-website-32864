import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Nfc, CreditCard } from 'lucide-react';
import ScrollSection from './ScrollSection';
import paytapTag from '@/assets/paytap-tag-sticker-v2.png';
import paytapCard from '@/assets/paytap-card-product.png';

const tools = [
  {
    id: 'tag',
    label: 'NFC Payment Tag',
    icon: Nfc,
    image: paytapTag,
    description: 'Tap-to-pay for fuel, tolls, repairs, driver expenses',
    checkoutParam: 'tag',
  },
  {
    id: 'card',
    label: 'Only Prepaid Card',
    icon: CreditCard,
    image: paytapCard,
    description: 'Pay online for FASTag recharge, Insurance, Servicing, Vehicle purchases',
    checkoutParam: 'card',
  },
];

const PaymentToolsSection = () => {
  const [selected, setSelected] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const active = tools[selected];

  return (
    <ScrollSection className="py-16 md:py-24 px-4 bg-muted/50">
      <div ref={ref} className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-10">
          Choose Your Options
        </h2>

        {/* Toggle */}
        <div className="inline-flex rounded-full bg-card border border-border p-1 mb-10">
          {tools.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setSelected(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                selected === i
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Product display */}
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto"
        >
          <Link to={`/checkout?product=${active.checkoutParam}`} className="group">
            <img
              src={active.image}
              alt={active.label}
              className="w-full max-w-sm mx-auto rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow"
            />
          </Link>
          <div className="text-left">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">{active.label}</h3>
            <p className="text-muted-foreground text-lg mb-5">{active.description}</p>
            <Link
              to={`/checkout?product=${active.checkoutParam}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              Order Now →
            </Link>
          </div>
        </motion.div>

        <p className="mt-10 text-lg font-semibold text-foreground">
          Offline + Online = Complete Payment Control
        </p>
      </div>
    </ScrollSection>
  );
};

export default PaymentToolsSection;
