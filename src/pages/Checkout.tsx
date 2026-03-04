import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { getStates, getCitiesByState } from "@/data/indianStatesAndCities";
import { useNavigate } from "react-router-dom";
import { Loader2, ShieldCheck, Truck, Home, Package, CheckCircle, Check, Lock, Nfc, CreditCard, Download, XCircle, ArrowLeft, ArrowRight, Shield, Phone, Headphones, Clock, Car, LayoutDashboard, BarChart3, CalendarCheck, TruckIcon } from "lucide-react";
import { generateInvoice, type InvoiceData } from "@/lib/generateInvoice";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";
import paytapTag from '@/assets/paytap-tag-checkout.png';
import paytapCard from '@/assets/paytap-card-product.png';

// ── Plan Data ──────────────────────────────────────────────
type PlanType = 'starter' | 'business_basic' | 'business_pro' | 'corporate';

interface PlanInfo {
  name: string;
  subtitle: string;
  price: number;
  tags: number;
  amcYear2: number;
  features: string[];
  recommended: boolean;
  isBusinessPlan: boolean;
}

const PLANS: Record<PlanType, PlanInfo> = {
  starter: {
    name: 'Starter',
    subtitle: '',
    price: 999,
    tags: 1,
    amcYear2: 1200,
    features: [],
    recommended: false,
    isBusinessPlan: false,
  },
  business_basic: {
    name: 'Business Basic',
    subtitle: '',
    price: 1998,
    tags: 2,
    amcYear2: 1200,
    features: [],
    recommended: false,
    isBusinessPlan: true,
  },
  business_pro: {
    name: 'Business Pro',
    subtitle: '',
    price: 4998,
    tags: 5,
    amcYear2: 6000,
    features: [],
    recommended: true,
    isBusinessPlan: true,
  },
  corporate: {
    name: 'Corporate',
    subtitle: '',
    price: 9999,
    tags: 10,
    amcYear2: 12000,
    features: [],
    recommended: false,
    isBusinessPlan: true,
  },
};

const PAYU_PAYMENT_LINKS: Record<PlanType, string> = {
  starter: "https://u.payu.in/PAYUMN/BICnJ3sPnq1K",
  business_basic: "https://u.payu.in/PAYUMN/hrGp6pGNhp8P",
  business_pro: "https://u.payu.in/PAYUMN/UI5bcsfONe0o",
  corporate: "https://u.payu.in/PAYUMN/4IXb9s4OqWwn",
};

const ACTIVATION_INCLUDES = [
  { icon: Nfc, label: 'NFC PayTap Tag for every vehicle' },
  { icon: CreditCard, label: 'Driver Prepaid Expense Card' },
  { icon: LayoutDashboard, label: 'PayTap Fleet Dashboard Access' },
  { icon: BarChart3, label: 'Real-Time Expense Tracking' },
  { icon: CalendarCheck, label: '1 Year Platform Access Included' },
  { icon: TruckIcon, label: '3–5 Day Delivery' },
];

// ── Form Schema ────────────────────────────────────────────
const checkoutSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(50),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().email("Enter a valid email address"),
  address: z.string().trim().min(1, "Address is required").max(200),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, "Enter a valid 6-digit PIN code"),
  pan: z.string().optional(),
  gst: z.string().optional(),
  companyName: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const formatINR = (n: number) => '₹' + n.toLocaleString('en-IN');
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i;
const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i;

const STEP_LABELS = ['Plan & Product', 'Basic Details', 'Business & Delivery', 'Review & Pay'];

// ── Progress Indicator ─────────────────────────────────────
const ProgressBar = ({ currentStep }: { currentStep: number }) => (
  <div className="max-w-2xl mx-auto px-4 py-6">
    <div className="flex items-center justify-between relative">
      {/* Line behind dots */}
      <div className="absolute top-3 left-0 right-0 h-[2px] bg-border" />
      <div
        className="absolute top-3 left-0 h-[2px] bg-accent transition-all duration-500"
        style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
      />
      {STEP_LABELS.map((label, i) => {
        const step = i + 1;
        const isActive = currentStep >= step;
        const isCurrent = currentStep === step;
        return (
          <div key={label} className="relative flex flex-col items-center z-10">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                isActive
                  ? 'bg-accent text-accent-foreground shadow-md'
                  : 'bg-muted text-muted-foreground border border-border'
              } ${isCurrent ? 'ring-4 ring-accent/20' : ''}`}
            >
              {isActive && step < currentStep ? <Check className="w-3.5 h-3.5" /> : step}
            </div>
            <span className={`text-[10px] md:text-xs mt-1.5 font-medium whitespace-nowrap ${
              isActive ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

// ── Step Animation Wrapper ─────────────────────────────────
const StepWrapper = ({ children, stepKey }: { children: React.ReactNode; stepKey: number }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={stepKey}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

// ── Component ──────────────────────────────────────────────
const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('business_pro');
  const [productType, setProductType] = useState<'sticker' | 'card'>('sticker');
  const [hasGst, setHasGst] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [orderTxnId, setOrderTxnId] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [lastFormData, setLastFormData] = useState<CheckoutFormData | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const plan = PLANS[selectedPlan];
  const subtotal = plan.price;
  const gstAmount = Math.round(subtotal * 0.18);
  const total = subtotal + gstAmount;

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
    defaultValues: { name: "", phone: "", email: "", address: "", city: "", state: "", pincode: "", pan: "", gst: "", companyName: "" },
  });

  // Watch form values for review step
  const formValues = watch();

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

  // ── 5-minute urgency timer ──
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          toast({ title: "Session expired", description: "Your checkout session has timed out. Please try again.", variant: "destructive" });
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft <= 0, navigate, toast]);


  // ── Step Navigation ──
  const nextStep = async () => {
    if (currentStep === 2) {
      const valid = await trigger(['name', 'phone', 'email']);
      if (!valid) return;
    }
    if (currentStep === 3) {
      const fieldsToValidate: (keyof CheckoutFormData)[] = ['address', 'state', 'city', 'pincode'];
      const valid = await trigger(fieldsToValidate);
      if (!valid) return;

      // Custom business validation
      const data = getValues();
      const newFieldErrors: Record<string, string> = {};
      if (!plan.isBusinessPlan) {
        if (!data.pan || !data.pan.trim()) newFieldErrors.pan = "PAN number is required";
        else if (!panRegex.test(data.pan.trim())) newFieldErrors.pan = "Invalid PAN format (e.g. ABCDE1234F)";
      } else {
        if (!data.companyName || !data.companyName.trim()) newFieldErrors.companyName = "Company name is required";
        if (hasGst) {
          if (!data.gst || !data.gst.trim()) newFieldErrors.gst = "GST number is required";
          else if (!gstRegex.test(data.gst.trim())) newFieldErrors.gst = "GST format should be 15 characters";
        } else {
          if (!data.pan || !data.pan.trim()) newFieldErrors.pan = "PAN number is required";
          else if (!panRegex.test(data.pan.trim())) newFieldErrors.pan = "Invalid PAN format (e.g. ABCDE1234F)";
        }
      }
      setFieldErrors(newFieldErrors);
      if (Object.keys(newFieldErrors).length > 0) {
        toast({ title: "Please check your details", description: Object.values(newFieldErrors)[0], variant: "destructive" });
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // ── Handlers ──
  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setValue("state", state);
    setValue("city", "");
    trigger("state");
  };
  const handleCityChange = (city: string) => { setValue("city", city); trigger("city"); };

  const handleConfirmPayment = async () => {
    if (lastFormData) {
      const invoiceData: InvoiceData = {
        txnid: orderTxnId,
        name: lastFormData.name,
        address: lastFormData.address,
        city: lastFormData.city,
        state: lastFormData.state,
        pincode: lastFormData.pincode,
        phone: lastFormData.phone,
        email: lastFormData.email,
        pan: lastFormData.pan,
        gst: lastFormData.gst,
        companyName: lastFormData.companyName,
        productType,
        planName: plan.name,
        quantity: plan.tags,
        unitPrice: plan.price,
        subtotal: subtotal,
        gstAmount: gstAmount,
        total: total,
      };
      await generateInvoice(invoiceData);
    }
    await supabase.from('orders').update({ payment_status: 'confirmed' } as any).eq('txnid', orderTxnId);
    navigate("/");
  };

  const handleDeclinePayment = async () => {
    await supabase.from('orders').update({ payment_status: 'cancelled' } as any).eq('txnid', orderTxnId);
    navigate("/");
  };

  const onSubmit = async (data: CheckoutFormData) => {
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
        address: data.address.trim(),
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        product_type: productType === 'sticker' ? 'sticker' : 'card',
        quantity: plan.tags,
        amount: total,
        txnid,
        payment_status: 'pending',
        details_pending: false,
        account_type: selectedPlan,
        pan: data.pan?.trim() || null,
        gst: plan.isBusinessPlan ? (data.gst?.trim() || null) : null,
        company_name: plan.isBusinessPlan ? (data.companyName?.trim() || null) : null,
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

  // ── Input class helper ──
  const inputClass = "mt-1 rounded-xl border-border bg-background shadow-sm focus:border-accent focus-visible:ring-0 focus-visible:ring-offset-0 h-12 text-base";
  const labelClass = "text-xs font-medium text-muted-foreground";
  const errorClass = "text-xs text-accent mt-1";

  // ══════════════════════════════════════════════════════════
  // ── STEP 1: Plan & Product ──
  // ══════════════════════════════════════════════════════════
  const renderStep1 = () => (
    <div className="space-y-8">
      {/* Headline */}
      <div className="text-center">
        <h1 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight leading-tight">
          Turn Your Vehicles Into<br className="hidden md:block" /> Intelligent Payment Machines.
        </h1>
        <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-lg mx-auto">
          One-time activation. NFC hardware included. Centralised dashboard access in minutes.
        </p>
      </div>

      {/* Plan Cards */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-4">Select Your Activation Plan</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {(Object.entries(PLANS) as [PlanType, PlanInfo][]).map(([key, p]) => {
            const isSelected = selectedPlan === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedPlan(key)}
                className={`relative text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-200 bg-card hover:scale-[1.02] ${
                  isSelected
                    ? 'border-accent shadow-[0_0_20px_hsl(346_92%_55%/0.15)]'
                    : 'border-border hover:border-muted-foreground/30'
                }`}
              >
                {p.recommended && (
                  <span className="absolute -top-2.5 left-4 px-2.5 py-0.5 text-[10px] font-semibold bg-accent text-accent-foreground rounded-full">
                    Most Popular
                  </span>
                )}
                <p className="text-sm font-semibold text-foreground">{p.name}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{p.subtitle}</p>
                <p className="text-lg md:text-2xl font-bold text-foreground mt-3">{formatINR(p.price)}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">One-Time Activation</p>
                <p className="text-[10px] text-muted-foreground">{p.tags} Vehicle{p.tags > 1 ? 's' : ''} Activated</p>
                {isSelected && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                    <Check className="w-3 h-3 text-accent-foreground" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Type Selector */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">Choose Your Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {([
            { key: 'sticker' as const, label: 'NFC Payment Tag', desc: 'Tap-to-pay sticker for your vehicle', icon: Nfc, image: paytapTag },
            { key: 'card' as const, label: 'Prepaid Card', desc: 'Prepaid card for driver expenses', icon: CreditCard, image: paytapCard },
          ]).map((product) => {
            const isActive = productType === product.key;
            return (
              <button
                key={product.key}
                type="button"
                onClick={() => setProductType(product.key)}
                className={`relative flex items-center gap-3 text-left rounded-xl border-2 transition-all duration-200 bg-card p-3 hover:scale-[1.01] ${
                  isActive
                    ? 'border-accent shadow-[0_0_15px_hsl(346_92%_55%/0.1)]'
                    : 'border-border hover:border-muted-foreground/30'
                }`}
              >
                <div className="w-16 h-16 flex-shrink-0 bg-muted rounded-lg flex items-center justify-center p-1.5">
                  <img src={product.image} alt={product.label} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <product.icon className="w-3.5 h-3.5 text-foreground" />
                    <p className="text-sm font-semibold text-foreground">{product.label}</p>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-snug">{product.desc}</p>
                </div>
                {isActive && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                    <Check className="w-3 h-3 text-accent-foreground" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* What You're Activating */}
      <div className="border border-border rounded-xl p-4 md:p-6 bg-muted/30">
        <h2 className="text-sm font-semibold text-foreground mb-3">What You're Activating Today</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[...plan.features, ...BASELINE_ITEMS].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════════
  // ── STEP 2: Basic Details ──
  // ══════════════════════════════════════════════════════════
  const renderStep2 = () => (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="text-center mb-2">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">Your Details</h2>
        <p className="text-sm text-muted-foreground mt-1">We just need a few basics to get started.</p>
      </div>
      <div className="bg-muted/30 rounded-2xl p-5 md:p-8 space-y-5">
        <div>
          <Label htmlFor="name" className={labelClass}>Full Name</Label>
          <Input id="name" {...register("name")} placeholder="Enter your full name" className={inputClass} />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="phone" className={labelClass}>Phone Number</Label>
          <Input id="phone" {...register("phone")} placeholder="10-digit mobile number" className={inputClass} />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
        <div>
          <Label htmlFor="email" className={labelClass}>Email Address</Label>
          <Input id="email" type="email" {...register("email")} placeholder="you@email.com" className={inputClass} />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════════
  // ── STEP 3: Business & Delivery ──
  // ══════════════════════════════════════════════════════════
  const renderStep3 = () => (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="text-center mb-2">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">
          {plan.isBusinessPlan ? 'Business & Delivery' : 'Identity & Delivery'}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Almost there — just a few more details.</p>
      </div>

      {/* Identity Section */}
      <div className="bg-muted/30 rounded-2xl p-5 md:p-8 space-y-5">
        {plan.isBusinessPlan ? (
          <>
            <div>
              <Label htmlFor="companyName" className={labelClass}>Company Name</Label>
              <Input id="companyName" {...register("companyName")} placeholder="Registered company name" className={inputClass} />
              {fieldErrors.companyName && <p className={errorClass}>{fieldErrors.companyName}</p>}
            </div>

            {/* GST Toggle */}
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Do you have GST?</p>
              <div className="inline-flex rounded-full bg-card border border-border p-1">
                <button
                  type="button"
                  onClick={() => setHasGst(true)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    hasGst ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setHasGst(false)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    !hasGst ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {hasGst ? (
              <div>
                <Label htmlFor="gst" className={labelClass}>GST Number</Label>
                <Input id="gst" {...register("gst")} placeholder="e.g. 22AAAAA0000A1Z5" maxLength={15} className={`${inputClass} uppercase`} />
                {fieldErrors.gst && <p className={errorClass}>{fieldErrors.gst}</p>}
              </div>
            ) : (
              <div>
                <Label htmlFor="pan" className={labelClass}>PAN Number</Label>
                <Input id="pan" {...register("pan")} placeholder="e.g. ABCDE1234F" maxLength={10} className={`${inputClass} uppercase`} />
                {fieldErrors.pan && <p className={errorClass}>{fieldErrors.pan}</p>}
              </div>
            )}
          </>
        ) : (
          <div>
            <Label htmlFor="pan" className={labelClass}>PAN Number</Label>
            <Input id="pan" {...register("pan")} placeholder="e.g. ABCDE1234F" maxLength={10} className={`${inputClass} uppercase`} />
            {fieldErrors.pan && <p className={errorClass}>{fieldErrors.pan}</p>}
          </div>
        )}
      </div>

      {/* Delivery Address */}
      <div className="bg-muted/30 rounded-2xl p-5 md:p-8 space-y-5">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Package className="w-4 h-4" /> Delivery Address
        </h3>
        <div>
          <Label htmlFor="address" className={labelClass}>Complete Address</Label>
          <Input id="address" {...register("address")} placeholder="House/Flat No, Street, Landmark" className={inputClass} />
          {errors.address && <p className={errorClass}>{errors.address.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="state" className={labelClass}>State</Label>
            <Select onValueChange={handleStateChange} value={selectedState}>
              <SelectTrigger className="mt-1 rounded-xl border-border shadow-sm h-12">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                {getStates().map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            {errors.state && <p className={errorClass}>{errors.state.message}</p>}
          </div>
          <div>
            <Label htmlFor="city" className={labelClass}>City</Label>
            <Select onValueChange={handleCityChange} disabled={!selectedState}>
              <SelectTrigger className="mt-1 rounded-xl border-border shadow-sm h-12">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                {getCitiesByState(selectedState).map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            {errors.city && <p className={errorClass}>{errors.city.message}</p>}
          </div>
        </div>
        <div>
          <Label htmlFor="pincode" className={labelClass}>PIN Code</Label>
          <Input id="pincode" {...register("pincode")} placeholder="6-digit PIN code" className={inputClass} />
          {errors.pincode && <p className={errorClass}>{errors.pincode.message}</p>}
        </div>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════════
  // ── STEP 4: Review & Pay ──
  // ══════════════════════════════════════════════════════════
  const renderStep4 = () => (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="text-center mb-2">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">Review & Activate</h2>
        <p className="text-sm text-muted-foreground mt-1">Confirm your details and complete activation.</p>
      </div>

      {/* Order Summary */}
      <div className="bg-muted/30 rounded-2xl p-5 md:p-8 space-y-4">
        <h3 className="text-sm font-semibold text-foreground">You're Activating {plan.name}</h3>
        <div className="space-y-2.5">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Product</span>
            <span className="font-medium text-foreground">{productType === 'sticker' ? 'NFC Payment Tag' : 'Prepaid Card'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Plan</span>
            <span className="font-medium text-foreground">{plan.name} ({plan.tags} {plan.tags > 1 ? 'units' : 'unit'})</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Activation Fee</span>
            <span className="font-medium text-foreground">{formatINR(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">GST (18%)</span>
            <span className="font-medium text-foreground">{formatINR(gstAmount)}</span>
          </div>
          <Separator className="bg-border" />
          <div className="flex justify-between items-baseline">
            <span className="text-sm font-semibold text-foreground">Total Payable</span>
            <span className="text-2xl font-bold text-foreground">{formatINR(total)}</span>
          </div>
          <p className="text-[11px] text-muted-foreground text-right">GST Invoice Provided</p>
        </div>
      </div>

      {/* Customer Details Recap */}
      <div className="bg-muted/30 rounded-2xl p-5 md:p-8 space-y-2.5">
        <h3 className="text-sm font-semibold text-foreground">Your Details</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div>
            <span className="text-muted-foreground text-xs">Name</span>
            <p className="font-medium text-foreground">{formValues.name}</p>
          </div>
          <div>
            <span className="text-muted-foreground text-xs">Phone</span>
            <p className="font-medium text-foreground">{formValues.phone}</p>
          </div>
          <div>
            <span className="text-muted-foreground text-xs">Email</span>
            <p className="font-medium text-foreground">{formValues.email}</p>
          </div>
          <div>
            <span className="text-muted-foreground text-xs">Delivery</span>
            <p className="font-medium text-foreground text-xs leading-snug">
              {formValues.address}, {formValues.city}, {formValues.state} - {formValues.pincode}
            </p>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Shield className="w-4 h-4 text-accent" />
          <span>Secure Checkout</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Truck className="w-4 h-4 text-accent" />
          <span>3–5 Day Delivery</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Headphones className="w-4 h-4 text-accent" />
          <span>Dedicated Onboarding</span>
        </div>
      </div>

      {/* CTA — Desktop */}
      <div className="hidden md:block">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 text-base font-semibold bg-accent hover:bg-accent/90 text-accent-foreground rounded-[14px] transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          {isLoading ? (
            <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</>
          ) : (
            `Activate & Pay ${formatINR(total)}`
          )}
        </Button>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Built for Indian fleets & enterprises. Secure payment processing.
      </p>
    </div>
  );

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Checkout – Paytap</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* ── Top Bar ── */}
        <div className="border-b border-border">
          <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
            <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Lock className="w-4 h-4" />
              <span className="text-xs font-medium">Secure Checkout</span>
            </div>
          </div>
        </div>

        {/* ── Urgency Timer ── */}
        <div className="max-w-5xl mx-auto px-4 pt-3">
          <div className={`flex items-center justify-center gap-2 text-sm font-medium transition-colors ${timeLeft < 60 ? 'text-destructive animate-pulse' : 'text-amber-600'}`}>
            <Clock className="w-4 h-4" />
            <span>Complete your order in {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}</span>
          </div>
        </div>

        {/* ── Progress Bar ── */}
        <ProgressBar currentStep={currentStep} />

        {/* ── Step Content ── */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="max-w-5xl mx-auto px-4 pb-28 md:pb-16">
            <StepWrapper stepKey={currentStep}>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
            </StepWrapper>
          </div>

          {/* ── Sticky Bottom Navigation ── */}
          <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-[0_-4px_12px_rgba(0,0,0,0.06)] px-4 py-3 z-50">
            <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
              {/* Back */}
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="h-12 px-5 rounded-xl border-border"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" /> Back
                </Button>
              ) : (
                <div />
              )}

              {/* Next / Pay */}
              {currentStep < 4 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="h-12 px-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                >
                  Next <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 px-8 rounded-[14px] bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg md:hidden"
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : `Activate & Pay ${formatINR(total)}`}
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* ── Payment Confirmation Dialog ── */}
      <Dialog open={showConfirmation} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md [&>button]:hidden">
          <DialogHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <DialogTitle className="text-xl text-foreground">Payment Completed?</DialogTitle>
            <DialogDescription className="text-muted-foreground mt-2">
              If your payment was successful, download your GST invoice now.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            <Button onClick={handleConfirmPayment} className="w-full h-12 bg-green-600 hover:bg-green-700 text-base font-semibold text-white">
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
