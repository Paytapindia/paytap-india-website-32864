import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Loader2, Check, Lock, Home, CheckCircle, Download, XCircle, Shield, Truck, FileText, ChevronDown, MapPin, Star, Wrench } from "lucide-react";
import { generateInvoice, type InvoiceData } from "@/lib/generateInvoice";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";
import { getStates, getCitiesByState } from "@/data/indianStatesAndCities";

// ── Plan Data ──────────────────────────────────────────────
type PlanType = 'starter' | 'business_basic' | 'business_pro' | 'corporate';

interface PlanInfo {
  name: string;
  price: number;
  tags: number;
  recommended: boolean;
  isBusinessPlan: boolean;
  perVehicle: string;
}

const PLANS: Record<PlanType, PlanInfo> = {
  starter: {
    name: 'Trial Pack',
    price: 999,
    tags: 1,
    recommended: false,
    isBusinessPlan: false,
    perVehicle: '₹999/vehicle',
  },
  business_basic: {
    name: 'Business Basic',
    price: 1600,
    tags: 2,
    recommended: false,
    isBusinessPlan: false,
    perVehicle: '₹800/vehicle',
  },
  business_pro: {
    name: 'Business Pro',
    price: 3749,
    tags: 5,
    recommended: true,
    isBusinessPlan: true,
    perVehicle: '₹750/vehicle',
  },
  corporate: {
    name: 'Corporate',
    price: 6999,
    tags: 10,
    recommended: false,
    isBusinessPlan: true,
    perVehicle: '₹700/vehicle',
  },
};

const PAYU_PAYMENT_LINKS: Record<PlanType, string> = {
  starter: "https://u.payu.in/PAYUMN/irvSRzjqTMEv",
  business_basic: "https://u.payu.in/PAYUMN/rJAyWInVMJLz",
  business_pro: "https://u.payu.in/PAYUMN/WrwSHz2KWQ2u",
  corporate: "https://u.payu.in/PAYUMN/3IzbYrdCoYZy",
};

const getDriverCards = (planKey: PlanType): number => {
  if (planKey === 'business_pro') return 1;
  if (planKey === 'corporate') return 2;
  return 0;
};

// ── Form Schema ─────────────────────────────────
const checkoutSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(50),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().email("Enter a valid email address"),
  pan: z.string().optional(),
  gst: z.string().optional(),
  companyName: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const formatINR = (n: number) => '₹' + n.toLocaleString('en-IN');
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i;
const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i;

const INPUT_CLASS = "h-[52px] rounded-2xl border-0 bg-secondary text-foreground placeholder:text-muted-foreground/60 text-base px-5 focus-visible:ring-2 focus-visible:ring-accent/20 focus-visible:ring-offset-0";

// ── Component ──────────────────────────────────────────────
const Checkout = () => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('business_pro');
  const [taxIdType, setTaxIdType] = useState<'gst' | 'pan'>('gst');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderTxnId, setOrderTxnId] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [lastFormData, setLastFormData] = useState<CheckoutFormData | null>(null);
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [phoneLookedUp, setPhoneLookedUp] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [showFormPrompt, setShowFormPrompt] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const formRef = useRef<HTMLDivElement>(null);

  const plan = PLANS[selectedPlan];
  const total = plan.price;
  const gstAmount = Math.round(total - (total / 1.18));
  const subtotal = total - gstAmount;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    getValues,
    watch,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { name: "", phone: "", email: "", pan: "", gst: "", companyName: "", address: "", city: "", state: "", pincode: "" },
  });

  const phoneValue = watch("phone");
  const nameValue = watch("name");
  const stateValue = watch("state");

  // Auto-fill company name with full name when PAN is selected
  useEffect(() => {
    if (taxIdType === 'pan' && nameValue) {
      setValue('companyName', nameValue);
    }
  }, [nameValue, taxIdType, setValue]);

  // ── Analytics ──
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'begin_checkout', {
        value: total, currency: 'INR',
        items: [{ item_id: selectedPlan, item_name: plan.name, price: subtotal, quantity: 1 }],
      });
    }
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'AddToCart', { value: total, currency: 'INR', content_ids: [selectedPlan], content_type: 'product' });
    }
  }, []);

  // ── Returning customer lookup on phone blur ──
  const handlePhoneLookup = async () => {
    const phone = getValues('phone')?.trim();
    if (!phone || !/^[6-9]\d{9}$/.test(phone) || phone === phoneLookedUp) return;

    setIsLookingUp(true);
    try {
      const { data, error } = await supabase.functions.invoke('lookup-customer', {
        body: { phone },
      });
      setPhoneLookedUp(phone);

      if (!error && data?.found && data.customer) {
        const c = data.customer;
        if (c.email) setValue('email', c.email);
        if (c.pan) { setValue('pan', c.pan); setTaxIdType('pan'); }
        if (c.gst) { setValue('gst', c.gst); setTaxIdType('gst'); }
        if (c.companyName) setValue('companyName', c.companyName);
        if (c.accountType && c.accountType in PLANS) {
          setSelectedPlan(c.accountType as PlanType);
        }
        toast({
          title: "Welcome back! 🎉",
          description: "We've loaded your details from your previous order.",
        });
      }
    } catch {
      // silent — lookup is best-effort
    }
    setIsLookingUp(false);
  };

  // ── Handlers ──
  const handleConfirmPayment = async () => {
    if (lastFormData) {
      const invoiceData: InvoiceData = {
        txnid: orderTxnId,
        name: lastFormData.name,
        address: lastFormData.address || '',
        city: lastFormData.city || '',
        state: lastFormData.state || '',
        pincode: lastFormData.pincode || '',
        phone: lastFormData.phone,
        email: lastFormData.email,
        pan: lastFormData.pan,
        gst: lastFormData.gst,
        companyName: lastFormData.companyName,
        productType: 'sticker',
        planName: plan.name,
        vehicleCount: plan.tags,
        quantity: 1,
        unitPrice: plan.price,
        subtotal,
        gstAmount,
        total,
      };
      await generateInvoice(invoiceData);
    }
    await supabase.from('orders').update({ payment_status: 'confirmed' } as any).eq('txnid', orderTxnId);
    navigate("/");
  };

  const handleDeclinePayment = async () => {
    await supabase.from('orders').update({ payment_status: 'retry' } as any).eq('txnid', orderTxnId);
    setShowConfirmation(false);
  };

  const onSubmit = async (data: CheckoutFormData) => {
    const newFieldErrors: Record<string, string> = {};
    if (taxIdType === 'gst') {
      if (!data.gst || !data.gst.trim()) newFieldErrors.gst = "GST number is required";
      else if (!gstRegex.test(data.gst.trim().toUpperCase())) newFieldErrors.gst = "Invalid GST format";
      if (!data.companyName || !data.companyName.trim()) newFieldErrors.companyName = "Company name is required with GST";
    } else {
      if (!data.pan || !data.pan.trim()) newFieldErrors.pan = "PAN number is required";
      else if (!panRegex.test(data.pan.trim().toUpperCase())) newFieldErrors.pan = "Invalid PAN format (e.g. ABCDE1234F)";
    }
    // Delivery address is mandatory
    if (!data.address || !data.address.trim()) newFieldErrors.address = "Address is required";
    if (!data.state || !data.state.trim()) newFieldErrors.state = "State is required";
    if (!data.city || !data.city.trim()) newFieldErrors.city = "City is required";
    if (!data.pincode || !data.pincode.trim()) newFieldErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(data.pincode.trim())) newFieldErrors.pincode = "Enter a valid 6-digit pincode";

    setFieldErrors(newFieldErrors);
    if (Object.keys(newFieldErrors).length > 0) return;

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'purchase_intent', {
        value: total, currency: 'INR',
        items: [{ item_id: selectedPlan, item_name: plan.name, price: subtotal, quantity: 1 }],
      });
    }

    // Fire Meta Pixel InitiateCheckout event
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        value: total, currency: 'INR', content_name: plan.name, num_items: plan.tags,
      });
    }

    setIsLoading(true);
    try {
      const txnid = `TXN${Date.now()}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      const { error } = await supabase.from('orders').insert({
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone.trim(),
        address: data.address?.trim() || '',
        city: data.city?.trim() || '',
        state: data.state?.trim() || '',
        pincode: data.pincode?.trim() || '',
        product_type: 'sticker',
        quantity: plan.tags,
        amount: total,
        txnid,
        payment_status: 'pending',
        details_pending: false,
        account_type: selectedPlan,
        pan: taxIdType === 'pan' ? (data.pan?.trim().toUpperCase() || null) : null,
        gst: taxIdType === 'gst' ? (data.gst?.trim().toUpperCase() || null) : null,
        company_name: data.companyName?.trim() || null,
      } as any);

      if (error) throw new Error('Failed to save order');

      setOrderTxnId(txnid);
      setLastFormData(data);
      setShowConfirmation(true);
      window.open(PAYU_PAYMENT_LINKS[selectedPlan], '_blank');
    } catch {
      toast({ title: "Something went wrong", description: "Please try again or contact support.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlanSelect = (key: PlanType) => {
    setSelectedPlan(key);
    if (isMobile && formRef.current) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const states = getStates();
  const cities = stateValue ? getCitiesByState(stateValue) : [];

  // ══════════════════════════════════════════════════════════
  // ── RENDER ──
  // ══════════════════════════════════════════════════════════
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Checkout – Paytap</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-[hsl(var(--secondary))] to-[hsl(var(--background))]">
        {/* ── Navy Hero Header ── */}
        <div className="bg-gradient-to-b from-primary via-primary/95 to-transparent pb-16 md:pb-24">
          {/* Top Bar */}
          <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
            <button onClick={() => navigate("/")} className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
              <Home className="w-4 h-4" />
              <span className="font-medium">Home</span>
            </button>
            <div className="flex items-center gap-1.5 text-primary-foreground/70">
              <Lock className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wide">Secure Checkout</span>
            </div>
          </div>

          {/* Hero Heading */}
          <div className="text-center mt-6 md:mt-10 px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-2xl md:text-5xl font-bold text-primary-foreground tracking-tight leading-tight text-balance"
            >
              Your Drivers Know Where the Money Goes. But You Don't
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-primary-foreground/60 mt-3 text-base md:text-lg max-w-xl mx-auto text-balance"
            >
              Track every rupee. Control every payment with Paytap.
            </motion.p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="max-w-5xl mx-auto px-4 -mt-8 md:-mt-12 pb-16">

            {/* ── SECTION 1: Plan Selector (List View) ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-3xl bg-card/80 backdrop-blur-xl shadow-2xl shadow-primary/5 border border-border/40 overflow-hidden mb-8 md:mb-12"
            >
              <div className="px-5 md:px-8 py-5 border-b border-border/40">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Activate Your Vehicle</h2>
              </div>
              <div className="divide-y divide-border/30">
                {(Object.entries(PLANS) as [PlanType, PlanInfo][]).map(([key, p], i) => {
                  const isSelected = selectedPlan === key;
                  const driverCards = getDriverCards(key);
                  return (
                    <motion.button
                      key={key}
                      type="button"
                      onClick={() => handlePlanSelect(key)}
                      whileTap={{ scale: 0.99 }}
                      className={`w-full text-left px-5 md:px-8 py-4 md:py-5 transition-all duration-300 relative group ${
                        isSelected
                          ? 'bg-gradient-to-r from-primary/[0.06] via-accent/[0.04] to-transparent'
                          : 'hover:bg-secondary/60'
                      }`}
                    >
                      {/* Selection glow bar */}
                      {isSelected && (
                        <motion.div
                          layoutId="plan-glow"
                          className="absolute left-0 top-0 bottom-0 w-1 bg-accent rounded-r-full"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}

                      <div className="flex items-center gap-4 md:gap-6">
                        {/* Radio circle */}
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          isSelected ? 'border-accent bg-accent' : 'border-muted-foreground/30 group-hover:border-muted-foreground/50'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 text-accent-foreground" />}
                        </div>

                        {/* Plan details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`font-semibold text-base ${isSelected ? 'text-foreground' : 'text-foreground/80'}`}>
                              {p.name}
                            </span>
                            {p.recommended && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-accent/10 text-accent">
                                <Star className="w-3 h-3 fill-accent" /> POPULAR
                              </span>
                            )}
                            {driverCards > 0 && (
                              <span className="hidden md:inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary">
                                +{driverCards} Driver Card{driverCards > 1 ? 's' : ''}
                              </span>
                            )}
                            {key === 'starter' && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open('https://dashboard.myfleetai.in/login', '_blank');
                                }}
                                className="inline-flex items-center px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-colors"
                              >
                                Click here for Free Access →
                              </button>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {p.tags} vehicle{p.tags > 1 ? 's' : ''}
                          </p>
                        </div>

                        {/* Price */}
                        <div className="text-right flex-shrink-0 flex flex-col items-end gap-1">
                          <span className={`text-xl md:text-2xl font-bold ${isSelected ? 'text-foreground' : 'text-foreground/70'}`}>
                            {formatINR(p.price)}
                          </span>
                          <p className="text-[10px] text-muted-foreground/60 mt-0.5">incl. GST</p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* ── Summary Box (Above Form) ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="w-full rounded-3xl bg-primary text-primary-foreground p-6 md:p-8 shadow-2xl shadow-primary/20"
            >
              <div className="flex items-baseline gap-2 mb-4">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <span className="text-sm font-normal text-primary-foreground/60">(What's Included)</span>
              </div>

              <ul className="space-y-2.5 text-sm text-primary-foreground/80">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  {plan.tags} Paytap Payment Tag{plan.tags > 1 ? 's' : ''} (Free)
                </li>
                {getDriverCards(selectedPlan) > 0 && (
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    {getDriverCards(selectedPlan)} Driver Expense Card{getDriverCards(selectedPlan) > 1 ? 's' : ''}
                  </li>
                )}
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  Access to {plan.name}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  Instant Account Activation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  Dedicated Support
                </li>
              </ul>


              {selectedPlan === 'starter' && (
                <p className="text-xs text-primary-foreground/50 italic mt-3">
                  Most owners upgrade to Business Pro within 2 weeks.
                </p>
              )}

              <div className="flex flex-col gap-1.5 mt-5 pt-4 border-t border-primary-foreground/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-primary-foreground/50">
                    <Truck className="w-4 h-4" />
                    <span>Vehicle Tag Delivery: 3–5 Business Days</span>
                  </div>
                  <span className="text-2xl font-bold">{formatINR(total)}</span>
                </div>
                <p className="text-xs text-primary-foreground/70">
                  You are paying one time Activation Fee
                </p>
              </div>
            </motion.div>

            {/* ── Quick Details Form ── */}
            <div className="w-full" ref={formRef}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="rounded-3xl bg-card/80 backdrop-blur-xl shadow-xl shadow-primary/5 border border-border/40 p-6 md:p-8"
                >
                  <div>
                    <button
                      type="button"
                      onClick={() => setFormOpen(!formOpen)}
                      className="w-full flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <h2 className="text-lg font-bold text-foreground mb-0.5 text-left">Quick Details</h2>
                        <p className="text-xs text-muted-foreground text-left">
                          We'll use this to activate your Paytap account and generate your invoice.
                        </p>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${formOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {formOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          {showFormPrompt && (
                            <div className="flex items-center gap-2 mt-4 p-3 rounded-xl bg-accent/10 border border-accent/20">
                              <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                              <p className="text-sm text-accent font-medium">Complete these details to process your order</p>
                            </div>
                          )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      {/* Left Column: Personal & Business Info */}
                      <div className="space-y-4">
                        {/* Full Name */}
                        <div>
                          <Input
                            {...register("name")}
                            placeholder="Full Name"
                            className={INPUT_CLASS}
                          />
                          {errors.name && <p className="text-xs text-destructive mt-1.5 pl-1">{errors.name.message}</p>}
                        </div>

                        {/* Mobile Number */}
                        <div>
                          <Input
                            {...register("phone")}
                            placeholder="Mobile Number"
                            onBlur={handlePhoneLookup}
                            className={INPUT_CLASS}
                          />
                          {isLookingUp && (
                            <div className="flex items-center gap-1.5 mt-1.5 pl-1">
                              <Loader2 className="w-3 h-3 animate-spin text-accent" />
                              <span className="text-xs text-accent">Checking...</span>
                            </div>
                          )}
                          {errors.phone && <p className="text-xs text-destructive mt-1.5 pl-1">{errors.phone.message}</p>}
                        </div>

                        {/* Email */}
                        <div>
                          <Input
                            {...register("email")}
                            type="email"
                            placeholder="Email Address"
                            className={INPUT_CLASS}
                          />
                          {errors.email && <p className="text-xs text-destructive mt-1.5 pl-1">{errors.email.message}</p>}
                        </div>

                        {/* GST / PAN Toggle */}
                        <div>
                          <div className="inline-flex rounded-full bg-secondary p-1 mb-3">
                            <button
                              type="button"
                              onClick={() => setTaxIdType('gst')}
                              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                                taxIdType === 'gst' ? 'bg-accent text-accent-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                              }`}
                            >
                              GST Number
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setTaxIdType('pan');
                                const currentName = getValues('name');
                                if (currentName) setValue('companyName', currentName);
                              }}
                              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                                taxIdType === 'pan' ? 'bg-accent text-accent-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                              }`}
                            >
                              PAN Number
                            </button>
                          </div>
                          {taxIdType === 'gst' ? (
                            <Input
                              {...register("gst", { setValueAs: (v) => v?.toUpperCase() })}
                              placeholder="e.g. 22AAAAA0000A1Z5"
                              maxLength={15}
                              className={`${INPUT_CLASS} uppercase`}
                            />
                          ) : (
                            <Input
                              {...register("pan", { setValueAs: (v) => v?.toUpperCase() })}
                              placeholder="e.g. ABCDE1234F"
                              maxLength={10}
                              className={`${INPUT_CLASS} uppercase`}
                            />
                          )}
                          {fieldErrors.gst && <p className="text-xs text-destructive mt-1.5 pl-1">{fieldErrors.gst}</p>}
                          {fieldErrors.pan && <p className="text-xs text-destructive mt-1.5 pl-1">{fieldErrors.pan}</p>}
                        </div>

                        {/* Company Name */}
                        <div>
                          {taxIdType === 'gst' ? (
                            <>
                              <Input
                                {...register("companyName")}
                                placeholder="Company Name *"
                                className={INPUT_CLASS}
                              />
                              {fieldErrors.companyName && <p className="text-xs text-destructive mt-1.5 pl-1">{fieldErrors.companyName}</p>}
                            </>
                          ) : (
                            <div>
                              <Input
                                value={nameValue || ''}
                                readOnly
                                tabIndex={-1}
                                className={`${INPUT_CLASS} opacity-60 cursor-default`}
                              />
                              <p className="text-[11px] text-muted-foreground/70 mt-1.5 pl-1">Using your name as billing name</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Column: Delivery Address */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin className="w-4 h-4 text-accent" />
                          <h3 className="text-sm font-semibold text-foreground">Delivery Address</h3>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <Input
                              {...register("address")}
                              placeholder="Address Line *"
                              className={INPUT_CLASS}
                            />
                            {fieldErrors.address && <p className="text-xs text-destructive mt-1.5 pl-1">{fieldErrors.address}</p>}
                          </div>
                          <div>
                            <select
                              {...register("state")}
                              className={`${INPUT_CLASS} w-full appearance-none cursor-pointer`}
                              defaultValue=""
                            >
                              <option value="" disabled>Select State *</option>
                              {states.map(s => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                            {fieldErrors.state && <p className="text-xs text-destructive mt-1.5 pl-1">{fieldErrors.state}</p>}
                          </div>
                          <div>
                            <select
                              {...register("city")}
                              className={`${INPUT_CLASS} w-full appearance-none cursor-pointer`}
                              defaultValue=""
                              disabled={!stateValue}
                            >
                              <option value="" disabled>{stateValue ? 'Select City *' : 'Select state first'}</option>
                              {cities.map(c => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                            {fieldErrors.city && <p className="text-xs text-destructive mt-1.5 pl-1">{fieldErrors.city}</p>}
                          </div>
                          <div>
                            <Input
                              {...register("pincode")}
                              placeholder="Pincode *"
                              maxLength={6}
                              className={INPUT_CLASS}
                            />
                            {fieldErrors.pincode && <p className="text-xs text-destructive mt-1.5 pl-1">{fieldErrors.pincode}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* ── CTA Button ── */}
                    <motion.div
                      className="mt-8"
                      whileHover={{ y: -2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      <Button
                        type={formOpen ? "submit" : "button"}
                        disabled={isLoading}
                        onClick={(e) => {
                          if (!formOpen) {
                            e.preventDefault();
                            setFormOpen(true);
                            setShowFormPrompt(true);
                            setTimeout(() => {
                              formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }, 100);
                            return;
                          }
                        }}
                        className="w-full h-14 text-base font-semibold bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl transition-all shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/35"
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Securing your checkout…
                          </span>
                        ) : (
                          `Pay ${formatINR(total)} & Go Live →`
                        )}
                      </Button>
                    </motion.div>

                    <p className="text-center text-xs text-muted-foreground mt-3">
                      Secure checkout · Takes 30 seconds
                    </p>

                    {/* Trust Line */}
                    <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-accent" /> Secure payments
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-accent" /> RBI-aligned system
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-accent" /> GST invoice provided
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5 text-accent" /> ₹249/Year/Vehicle AMC Included
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>


          </div>
        </form>
      </div>

      {/* ── Payment Confirmation Dialog ── */}
      <Dialog open={showConfirmation} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md [&>button]:hidden">
          <DialogHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-accent" />
            </div>
            <DialogTitle className="text-xl text-foreground">Payment Completed?</DialogTitle>
            <DialogDescription className="text-muted-foreground mt-2">
              If your payment was successful, download your GST invoice now.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            <Button onClick={handleConfirmPayment} className="w-full h-12 bg-accent hover:bg-accent/90 text-base font-semibold text-accent-foreground">
              <Download className="mr-2 h-5 w-5" />
              Yes, Download Invoice
            </Button>
            <Button variant="outline" onClick={handleDeclinePayment} className="w-full h-12 text-base border-border text-foreground">
              <XCircle className="mr-2 h-4 w-4" />
              Cancel Order
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Checkout;
