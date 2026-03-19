import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Loader2, Check, Lock, Home, CheckCircle, Download, XCircle, Shield, Truck, FileText } from "lucide-react";
import { generateInvoice, type InvoiceData } from "@/lib/generateInvoice";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";

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
    name: 'Starter',
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
    isBusinessPlan: true,
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

// ── Form Schema (minimal) ─────────────────────────────────
const checkoutSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(50),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().email("Enter a valid email address"),
  pan: z.string().optional(),
  gst: z.string().optional(),
  companyName: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const formatINR = (n: number) => '₹' + n.toLocaleString('en-IN');
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i;
const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i;

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
    defaultValues: { name: "", phone: "", email: "", pan: "", gst: "", companyName: "" },
  });

  const phoneValue = watch("phone");

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
        address: '',
        city: '',
        state: '',
        pincode: '',
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
    // Custom validation for GST/PAN
    const newFieldErrors: Record<string, string> = {};
    if (taxIdType === 'gst') {
      if (!data.gst || !data.gst.trim()) newFieldErrors.gst = "GST number is required";
      else if (!gstRegex.test(data.gst.trim().toUpperCase())) newFieldErrors.gst = "Invalid GST format";
    } else {
      if (!data.pan || !data.pan.trim()) newFieldErrors.pan = "PAN number is required";
      else if (!panRegex.test(data.pan.trim().toUpperCase())) newFieldErrors.pan = "Invalid PAN format (e.g. ABCDE1234F)";
    }
    setFieldErrors(newFieldErrors);
    if (Object.keys(newFieldErrors).length > 0) return;

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'purchase_intent', {
        value: total, currency: 'INR',
        items: [{ item_id: selectedPlan, item_name: plan.name, price: subtotal, quantity: 1 }],
      });
    }

    setIsLoading(true);
    try {
      const txnid = `TXN${Date.now()}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      const { error } = await supabase.from('orders').insert({
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone.trim(),
        address: '',
        city: '',
        state: '',
        pincode: '',
        product_type: 'sticker',
        quantity: plan.tags,
        amount: total,
        txnid,
        payment_status: 'pending',
        details_pending: true,
        account_type: selectedPlan,
        pan: data.pan?.trim().toUpperCase() || null,
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
    // Smooth scroll to form on mobile
    if (isMobile && formRef.current) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  // ══════════════════════════════════════════════════════════
  // ── RENDER ──
  // ══════════════════════════════════════════════════════════
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Checkout – Paytap</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* ── Top Bar ── */}
        <div className="border-b border-border/60">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
              <Home className="w-4 h-4" />
              <span className="font-medium">Home</span>
            </button>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Lock className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wide">Secure Checkout</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">

            {/* ── Hero Heading ── */}
            <div className="text-center mb-10 md:mb-14">
              <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
                Activate Paytap For Your Fleet
              </h1>
              <p className="text-muted-foreground mt-3 text-base md:text-lg max-w-xl mx-auto">
                Select your plan, enter a few details, and go live in 30 seconds.
              </p>
            </div>

            {/* ── SECTION 1: Plan Selection ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-16">
              {(Object.entries(PLANS) as [PlanType, PlanInfo][]).map(([key, p]) => {
                const isSelected = selectedPlan === key;
                return (
                  <motion.button
                    key={key}
                    type="button"
                    onClick={() => handlePlanSelect(key)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    animate={isSelected ? { scale: 1.03 } : { scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className={`relative text-center rounded-2xl transition-all duration-200 p-4 md:p-6 ${
                      isSelected
                        ? 'bg-card shadow-xl shadow-primary/10 ring-2 ring-primary'
                        : 'bg-card shadow-sm hover:shadow-md'
                    }`}
                  >
                    {p.recommended && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 text-[10px] font-semibold bg-primary text-primary-foreground rounded-full whitespace-nowrap">
                        ⭐ Recommended
                      </span>
                    )}
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                    <p className="text-sm font-semibold text-foreground mt-1">{p.name}</p>
                    <p className="text-2xl md:text-3xl font-bold text-foreground mt-2">{formatINR(p.price)}</p>
                    <p className="text-xs text-muted-foreground mt-1.5">
                      {p.tags} Vehicle{p.tags > 1 ? 's' : ''}
                    </p>
                    <p className="text-[10px] text-muted-foreground/70 mt-1">{p.perVehicle}</p>
                  </motion.button>
                );
              })}
            </div>

            {/* ── SECTION 2 + 3: Form + Summary ── */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 lg:gap-12">

              {/* ── Left: Quick Details Form ── */}
              <div ref={formRef}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="max-w-[480px]"
                  >
                    <p className="text-xs text-muted-foreground mb-6">
                      We'll use this to activate your Paytap account and generate your invoice.
                    </p>

                    <div className="space-y-4">
                      {/* Full Name */}
                      <div>
                        <Input
                          {...register("name")}
                          placeholder="Full Name"
                          className="h-[52px] rounded-2xl border-0 bg-secondary text-foreground placeholder:text-muted-foreground/60 text-base px-5 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0"
                        />
                        {errors.name && <p className="text-xs text-destructive mt-1.5 pl-1">{errors.name.message}</p>}
                      </div>

                      {/* Mobile Number */}
                      <div>
                        <Input
                          {...register("phone")}
                          placeholder="Mobile Number"
                          onBlur={handlePhoneLookup}
                          className="h-[52px] rounded-2xl border-0 bg-secondary text-foreground placeholder:text-muted-foreground/60 text-base px-5 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0"
                        />
                        {isLookingUp && (
                          <div className="flex items-center gap-1.5 mt-1.5 pl-1">
                            <Loader2 className="w-3 h-3 animate-spin text-primary" />
                            <span className="text-xs text-primary">Checking...</span>
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
                          className="h-[52px] rounded-2xl border-0 bg-secondary text-foreground placeholder:text-muted-foreground/60 text-base px-5 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0"
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
                              taxIdType === 'gst' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            GST Number
                          </button>
                          <button
                            type="button"
                            onClick={() => setTaxIdType('pan')}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                              taxIdType === 'pan' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
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
                            className="h-[52px] rounded-2xl border-0 bg-secondary text-foreground placeholder:text-muted-foreground/60 text-base px-5 uppercase focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0"
                          />
                        ) : (
                          <Input
                            {...register("pan", { setValueAs: (v) => v?.toUpperCase() })}
                            placeholder="e.g. ABCDE1234F"
                            maxLength={10}
                            className="h-[52px] rounded-2xl border-0 bg-secondary text-foreground placeholder:text-muted-foreground/60 text-base px-5 uppercase focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0"
                          />
                        )}
                        {fieldErrors.gst && <p className="text-xs text-destructive mt-1.5 pl-1">{fieldErrors.gst}</p>}
                        {fieldErrors.pan && <p className="text-xs text-destructive mt-1.5 pl-1">{fieldErrors.pan}</p>}
                      </div>

                      {/* Company Name (optional) */}
                      <div>
                        <Input
                          {...register("companyName")}
                          placeholder="Company Name (optional)"
                          className="h-[52px] rounded-2xl border-0 bg-secondary text-foreground placeholder:text-muted-foreground/60 text-base px-5 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0"
                        />
                      </div>
                    </div>

                    {/* ── CTA Button ── */}
                    <motion.div
                      className="mt-8"
                      whileHover={{ y: -2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-14 text-base font-semibold bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl transition-all shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30"
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

                    {/* Sub-CTA text */}
                    <p className="text-center text-xs text-muted-foreground mt-3">
                      Secure checkout · Takes 30 seconds
                    </p>

                    {/* Trust Line */}
                    <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-primary" /> Secure payments
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-primary" /> RBI-aligned system
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-primary" /> GST invoice provided
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── Right: Sticky Summary Panel ── */}
              <div className={isMobile ? 'mt-4' : ''}>
                <div className="lg:sticky lg:top-8">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="rounded-2xl bg-card shadow-lg shadow-foreground/5 p-6 md:p-8 space-y-5"
                  >
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Your Paytap Setup</h3>

                    <div className="space-y-1">
                      <p className="text-lg font-bold text-foreground">{plan.name}</p>
                      <p className="text-sm text-muted-foreground">{plan.tags} Paytap Tag{plan.tags > 1 ? 's' : ''}</p>
                      {getDriverCards(selectedPlan) > 0 && (
                        <p className="text-sm text-muted-foreground">{getDriverCards(selectedPlan)} Driver Expense Card{getDriverCards(selectedPlan) > 1 ? 's' : ''}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Truck className="w-4 h-4" />
                      <span>Delivery: 3–5 business days</span>
                    </div>

                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between items-baseline">
                        <span className="text-sm text-muted-foreground">Total</span>
                        <span className="text-2xl font-bold text-foreground">{formatINR(total)}</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span>GST included · Invoice provided</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span>No hidden charges</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span>One-time activation fee</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* ── Payment Confirmation Dialog ── */}
      <Dialog open={showConfirmation} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md [&>button]:hidden">
          <DialogHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-primary" />
            </div>
            <DialogTitle className="text-xl text-foreground">Payment Completed?</DialogTitle>
            <DialogDescription className="text-muted-foreground mt-2">
              If your payment was successful, download your GST invoice now.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            <Button onClick={handleConfirmPayment} className="w-full h-12 bg-primary hover:bg-primary/90 text-base font-semibold text-white">
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
