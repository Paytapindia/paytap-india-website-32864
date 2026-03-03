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
import { Loader2, ShieldCheck, Truck, Home, Package, CheckCircle, Check, Lock, ChevronUp, ChevronDown, Nfc, CreditCard } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
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
    subtitle: 'For individuals (1–5 vehicles)',
    price: 999,
    tags: 1,
    amcYear2: 1200,
    features: ['1 Prepaid Tag/Card', 'Basic Dashboard', 'Tag Control', 'Transaction View'],
    recommended: false,
    isBusinessPlan: false,
  },
  business_basic: {
    name: 'Business Basic',
    subtitle: 'For growing fleets (1–10 vehicles)',
    price: 1998,
    tags: 2,
    amcYear2: 1200,
    features: ['2 Prepaid Tag/Card', 'Full Dashboard', 'MyFleet AI Access', 'Smart Reports'],
    recommended: false,
    isBusinessPlan: true,
  },
  business_pro: {
    name: 'Business Pro',
    subtitle: 'For scaling fleets (1–25 vehicles)',
    price: 4998,
    tags: 5,
    amcYear2: 6000,
    features: ['5 Prepaid Tag/Card', 'MyFleet AI', 'ExpensePro', 'Advanced Reporting', 'Priority Support'],
    recommended: true,
    isBusinessPlan: true,
  },
  corporate: {
    name: 'Corporate',
    subtitle: 'For large operations (1–100+ vehicles)',
    price: 9999,
    tags: 10,
    amcYear2: 12000,
    features: ['10 Prepaid Tag/Card', 'MyFleet AI', 'ExpensePro', 'Multi-User Access', 'Dedicated Support'],
    recommended: false,
    isBusinessPlan: true,
  },
};

// PayU payment links keyed by plan (use ₹999 link as fallback for now)
const PAYU_PAYMENT_LINKS: Record<PlanType, string> = {
  starter: "https://u.payu.in/PAYUMN/BICnJ3sPnq1K",
  business_basic: "https://u.payu.in/PAYUMN/hrGp6pGNhp8P",
  business_pro: "https://u.payu.in/PAYUMN/UI5bcsfONe0o",
  corporate: "https://u.payu.in/PAYUMN/4IXb9s4OqWwn",
};

const BASELINE_ITEMS = [
  'NFC Hardware',
  'Secure Payment Control',
  'Real-Time Transaction Visibility',
  'Centralised Dashboard Access',
  '3–5 Day Delivery',
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

// ── Helpers ────────────────────────────────────────────────
const formatINR = (n: number) => '₹' + n.toLocaleString('en-IN');

const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i;
const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i;

// ── Component ──────────────────────────────────────────────
const Checkout = () => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('business_pro');
  const [productType, setProductType] = useState<'sticker' | 'card'>('sticker');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmTimeLeft, setConfirmTimeLeft] = useState(15);
  const [orderTxnId, setOrderTxnId] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [mobileOrderOpen, setMobileOrderOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const plan = PLANS[selectedPlan];
  const subtotal = plan.price;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { name: "", phone: "", email: "", address: "", city: "", state: "", pincode: "", pan: "", gst: "", companyName: "" },
  });

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

  // ── Confirmation auto-redirect ──
  useEffect(() => {
    if (!showConfirmation) return;
    setConfirmTimeLeft(15);
    const interval = setInterval(() => {
      setConfirmTimeLeft((prev) => {
        if (prev <= 1) { clearInterval(interval); navigate("/"); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showConfirmation, navigate]);

  // ── Handlers ──
  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setValue("state", state);
    setValue("city", "");
    trigger("state");
  };
  const handleCityChange = (city: string) => { setValue("city", city); trigger("city"); };

  const handleConfirmPayment = async () => {
    await supabase.from('orders').update({ payment_status: 'confirmed' } as any).eq('txnid', orderTxnId);
    navigate("/");
  };
  const handleDeclinePayment = async () => {
    await supabase.from('orders').update({ payment_status: 'cancelled' } as any).eq('txnid', orderTxnId);
    navigate("/");
  };

  const onSubmit = async (data: CheckoutFormData) => {
    const newFieldErrors: Record<string, string> = {};

    if (!plan.isBusinessPlan) {
      if (!data.pan || !data.pan.trim()) newFieldErrors.pan = "PAN number is required";
      else if (!panRegex.test(data.pan.trim())) newFieldErrors.pan = "Invalid PAN format (e.g. ABCDE1234F)";
    } else {
      if (!data.companyName || !data.companyName.trim()) newFieldErrors.companyName = "Company name is required";
      const hasGst = data.gst && data.gst.trim().length > 0;
      const hasPan = data.pan && data.pan.trim().length > 0;
      if (!hasGst && !hasPan) {
        newFieldErrors.gst = "Either GST or PAN is required";
        newFieldErrors.pan = "Either GST or PAN is required";
      } else {
        if (hasGst && !gstRegex.test(data.gst!.trim())) newFieldErrors.gst = "Invalid GST format";
        if (hasPan && !panRegex.test(data.pan!.trim())) newFieldErrors.pan = "Invalid PAN format";
      }
    }

    setFieldErrors(newFieldErrors);
    if (Object.keys(newFieldErrors).length > 0) {
      toast({ title: "Please check your details", description: Object.values(newFieldErrors)[0], variant: "destructive" });
      return;
    }

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
      setShowConfirmation(true);
      window.open(PAYU_PAYMENT_LINKS[selectedPlan], '_blank');
    } catch {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  // ── Order Summary Content (reused desktop + mobile drawer) ──
  const OrderSummaryContent = () => (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-[#021a42]/60">
        <span>Product</span>
        <span className="font-medium text-[#021a42]">{productType === 'sticker' ? 'NFC Payment Tag' : 'Prepaid Card'}</span>
      </div>
      <div className="flex justify-between text-sm text-[#021a42]/60">
        <span>Selected Plan</span>
        <span className="font-medium text-[#021a42]">{plan.name}</span>
      </div>
      <div className="flex justify-between text-sm text-[#021a42]/60">
        <span>Activation Fee</span>
        <span className="font-medium text-[#021a42]">{formatINR(subtotal)}</span>
      </div>
      <div className="flex justify-between text-sm text-[#021a42]/60">
        <span>GST (18%)</span>
        <span className="font-medium text-[#021a42]">{formatINR(gst)}</span>
      </div>
      <div className="flex justify-between text-sm text-[#021a42]/60">
        <span>Shipping</span>
        <span className="font-medium text-green-600">Free</span>
      </div>
      <Separator className="bg-[#021a42]/10" />
      <div className="flex justify-between items-baseline">
        <span className="text-sm font-medium text-[#021a42]">Total Payable Today</span>
        <span className="text-2xl font-bold text-[#021a42]">{formatINR(total)}</span>
      </div>
      <p className="text-[11px] text-[#021a42]/50 text-right mt-1">GST Invoice Provided</p>
      <p className="text-xs text-[#021a42]/40 leading-relaxed">
        AMC billed annually from Year 2 as per selected plan.
      </p>
    </div>
  );

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Checkout – Paytap</title>
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* ── Top Bar ── */}
        <div className="border-b border-[#021a42]/10">
          <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
            <button onClick={() => navigate("/")} className="flex items-center gap-2 text-[#021a42]/50 hover:text-[#021a42] transition-colors text-sm">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <div className="flex items-center gap-1.5 text-[#021a42]/50">
              <Lock className="w-4 h-4" />
              <span className="text-xs font-medium">Secure Checkout</span>
            </div>
          </div>
        </div>

        {/* ── Hero ── */}
        <div className="max-w-5xl mx-auto px-4 pt-6 pb-4 md:pt-14 md:pb-8 text-center">
          <h1 className="text-xl md:text-3xl font-bold text-[#021a42] tracking-tight">
            Activate Paytap for Your Vehicles
          </h1>
          <p className="mt-2 text-sm text-[#021a42]/50 max-w-md mx-auto">
            One-time platform activation. Includes NFC hardware and dashboard access.
          </p>
        </div>

        {/* ── Plan Cards ── */}
        <div className="max-w-5xl mx-auto px-4 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {(Object.entries(PLANS) as [PlanType, PlanInfo][]).map(([key, p]) => {
              const isSelected = selectedPlan === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedPlan(key)}
                  className={`relative text-left p-3 md:p-5 rounded-xl border-2 transition-all duration-200 bg-white ${
                    isSelected
                      ? 'border-[#021a42] shadow-sm'
                      : 'border-[#021a42]/10 hover:border-[#021a42]/25'
                  }`}
                >
                  {p.recommended && (
                    <span className="absolute -top-2.5 left-4 px-2.5 py-0.5 text-[10px] font-semibold bg-[#f6245b] text-white rounded-full">
                      Most Popular
                    </span>
                  )}
                  <p className="text-sm font-semibold text-[#021a42]">{p.name}</p>
                  <p className="text-[11px] text-[#021a42]/50 mt-0.5 leading-snug">{p.subtitle}</p>
                  <p className="text-lg md:text-2xl font-bold text-[#021a42] mt-2 md:mt-3">{formatINR(p.price)}</p>
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#021a42] flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── What You're Activating ── */}
        <div className="max-w-5xl mx-auto px-4 pb-8">
          <div className="border border-[#021a42]/10 rounded-xl p-4 md:p-6">
            <h2 className="text-sm font-semibold text-[#021a42] mb-3">What You're Activating Today</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {plan.features.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-[#021a42]/70">
                  <Check className="w-4 h-4 text-[#021a42] flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 text-sm text-[#021a42]/70">
                <Check className="w-4 h-4 text-[#021a42] flex-shrink-0" />
                <span>AMC {formatINR(Math.round(plan.amcYear2 / 12))}/mo · Billed annually from Year 2</span>
              </div>
              {BASELINE_ITEMS.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-[#021a42]/70">
                  <Check className="w-4 h-4 text-[#021a42] flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
           </div>
          </div>
        </div>

        {/* ── Product Type Selector ── */}
        <div className="max-w-5xl mx-auto px-4 pb-8">
          <h2 className="text-sm font-semibold text-[#021a42] mb-3">Choose Your Product</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
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
                  className={`relative flex items-center gap-3 text-left rounded-xl border-2 transition-all duration-200 bg-white p-3 ${
                    isActive
                      ? 'border-[#021a42] shadow-sm'
                      : 'border-[#021a42]/10 hover:border-[#021a42]/25'
                  }`}
                >
                  <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-[#021a42]/5 to-[#021a42]/10 rounded-lg flex items-center justify-center p-1.5">
                    <img src={product.image} alt={product.label} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <product.icon className="w-3.5 h-3.5 text-[#021a42]" />
                      <p className="text-sm font-semibold text-[#021a42]">{product.label}</p>
                    </div>
                    <p className="text-[11px] text-[#021a42]/50 leading-snug">{product.desc}</p>
                  </div>
                  {isActive && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#021a42] flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Form + Order Summary (Two Column Desktop) ── */}
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="max-w-5xl mx-auto px-4 pb-20 md:pb-16">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8">

              {/* LEFT: Form */}
              <div className="md:col-span-3 space-y-4 md:space-y-6">
                {/* Personal Details */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-[#021a42]">Personal Details</h3>
                  <div>
                    <Label htmlFor="name" className="text-xs text-[#021a42]/50">Full Name</Label>
                    <Input id="name" {...register("name")} placeholder="Enter your full name"
                      className="mt-1 rounded-lg border-[#021a42]/15 focus:border-[#021a42] focus-visible:ring-0 focus-visible:ring-offset-0" />
                    {errors.name && <p className="text-xs text-[#f6245b]/80 mt-1">{errors.name.message}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="phone" className="text-xs text-[#021a42]/50">Phone</Label>
                      <Input id="phone" {...register("phone")} placeholder="10-digit number"
                        className="mt-1 rounded-lg border-[#021a42]/15 focus:border-[#021a42] focus-visible:ring-0 focus-visible:ring-offset-0" />
                      {errors.phone && <p className="text-xs text-[#f6245b]/80 mt-1">{errors.phone.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-xs text-[#021a42]/50">Email</Label>
                      <Input id="email" type="email" {...register("email")} placeholder="you@email.com"
                        className="mt-1 rounded-lg border-[#021a42]/15 focus:border-[#021a42] focus-visible:ring-0 focus-visible:ring-offset-0" />
                      {errors.email && <p className="text-xs text-[#f6245b]/80 mt-1">{errors.email.message}</p>}
                    </div>
                  </div>
                </div>

                <Separator className="bg-[#021a42]/10" />

                {/* Identity / Business Fields — Progressive */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-[#021a42]">
                    {plan.isBusinessPlan ? 'Business Details' : 'Identity Verification'}
                  </h3>

                  {!plan.isBusinessPlan ? (
                    <div>
                      <Label htmlFor="pan" className="text-xs text-[#021a42]/50">PAN Number</Label>
                      <Input id="pan" {...register("pan")} placeholder="e.g. ABCDE1234F" maxLength={10}
                        className="mt-1 rounded-lg border-[#021a42]/15 focus:border-[#021a42] focus-visible:ring-0 focus-visible:ring-offset-0 uppercase" />
                      {fieldErrors.pan && <p className="text-xs text-[#f6245b]/80 mt-1">{fieldErrors.pan}</p>}
                    </div>
                  ) : (
                    <>
                      <div>
                        <Label htmlFor="companyName" className="text-xs text-[#021a42]/50">Company Name</Label>
                        <Input id="companyName" {...register("companyName")} placeholder="Registered company name"
                          className="mt-1 rounded-lg border-[#021a42]/15 focus:border-[#021a42] focus-visible:ring-0 focus-visible:ring-offset-0" />
                        {fieldErrors.companyName && <p className="text-xs text-[#f6245b]/80 mt-1">{fieldErrors.companyName}</p>}
                      </div>
                      <div>
                        <Label htmlFor="gst" className="text-xs text-[#021a42]/50">GST Number (or provide PAN below)</Label>
                        <Input id="gst" {...register("gst")} placeholder="e.g. 22AAAAA0000A1Z5" maxLength={15}
                          className="mt-1 rounded-lg border-[#021a42]/15 focus:border-[#021a42] focus-visible:ring-0 focus-visible:ring-offset-0 uppercase" />
                        {fieldErrors.gst && <p className="text-xs text-[#f6245b]/80 mt-1">{fieldErrors.gst}</p>}
                      </div>
                      <div>
                        <Label htmlFor="pan" className="text-xs text-[#021a42]/50">PAN Number (if no GST)</Label>
                        <Input id="pan" {...register("pan")} placeholder="e.g. ABCDE1234F" maxLength={10}
                          className="mt-1 rounded-lg border-[#021a42]/15 focus:border-[#021a42] focus-visible:ring-0 focus-visible:ring-offset-0 uppercase" />
                        {fieldErrors.pan && <p className="text-xs text-[#f6245b]/80 mt-1">{fieldErrors.pan}</p>}
                      </div>
                    </>
                  )}
                </div>

                <Separator className="bg-[#021a42]/10" />

                {/* Address */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-[#021a42]">Delivery Address</h3>
                  <div>
                    <Label htmlFor="address" className="text-xs text-[#021a42]/50">Complete Address</Label>
                    <Input id="address" {...register("address")} placeholder="House/Flat No, Street, Landmark"
                      className="mt-1 rounded-lg border-[#021a42]/15 focus:border-[#021a42] focus-visible:ring-0 focus-visible:ring-offset-0" />
                    {errors.address && <p className="text-xs text-[#f6245b]/80 mt-1">{errors.address.message}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="state" className="text-xs text-[#021a42]/50">State</Label>
                      <Select onValueChange={handleStateChange}>
                        <SelectTrigger className="mt-1 rounded-lg border-[#021a42]/15 focus:border-[#021a42]">
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                          {getStates().map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      {errors.state && <p className="text-xs text-[#f6245b]/80 mt-1">{errors.state.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="city" className="text-xs text-[#021a42]/50">City</Label>
                      <Select onValueChange={handleCityChange} disabled={!selectedState}>
                        <SelectTrigger className="mt-1 rounded-lg border-[#021a42]/15 focus:border-[#021a42]">
                          <SelectValue placeholder="Select City" />
                        </SelectTrigger>
                        <SelectContent>
                          {getCitiesByState(selectedState).map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      {errors.city && <p className="text-xs text-[#f6245b]/80 mt-1">{errors.city.message}</p>}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="pincode" className="text-xs text-[#021a42]/50">PIN Code</Label>
                    <Input id="pincode" {...register("pincode")} placeholder="6-digit PIN code"
                      className="mt-1 rounded-lg border-[#021a42]/15 focus:border-[#021a42] focus-visible:ring-0 focus-visible:ring-offset-0" />
                    {errors.pincode && <p className="text-xs text-[#f6245b]/80 mt-1">{errors.pincode.message}</p>}
                  </div>
                </div>

                {/* Trust Layer */}
                <div className="flex items-center justify-center gap-4 text-[#021a42]/40 text-xs py-3">
                  <div className="flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Secure Payment</span>
                  </div>
                  <span>·</span>
                  <span>Processed via PayU</span>
                  <span>·</span>
                  <span>No recurring charges</span>
                </div>

                {/* CTA — Desktop */}
                <div className="hidden md:block">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 text-base font-semibold bg-[#021a42] hover:bg-[#031d4a] text-white rounded-[10px] transition-colors"
                  >
                    {isLoading ? (
                      <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</>
                    ) : (
                      plan.isBusinessPlan ? 'Activate & Ship My Tags' : 'Activate My Account'
                    )}
                  </Button>
                </div>
              </div>

              {/* RIGHT: Order Summary (desktop only) */}
              <div className="hidden md:block md:col-span-2">
                <div className="sticky top-8 border border-[#021a42]/10 rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-[#021a42] mb-4">Order Summary</h3>
                  <OrderSummaryContent />
                </div>
              </div>
            </div>
          </div>

          {/* ── Mobile: Sticky Bottom Bar ── */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#021a42]/10 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] px-4 py-3 md:hidden z-50">
            <div className="flex items-center gap-3">
              {/* Expandable order summary trigger */}
              <Sheet open={mobileOrderOpen} onOpenChange={setMobileOrderOpen}>
                <SheetTrigger asChild>
                  <button type="button" className="flex-1 text-left">
                    <p className="text-xs text-[#021a42]/50">{plan.name}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-bold text-[#021a42]">{formatINR(total)}</span>
                      {mobileOrderOpen ? <ChevronDown className="w-4 h-4 text-[#021a42]/50" /> : <ChevronUp className="w-4 h-4 text-[#021a42]/50" />}
                    </div>
                  </button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-2xl">
                  <SheetHeader>
                    <SheetTitle className="text-[#021a42]">Order Summary</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4">
                    <OrderSummaryContent />
                  </div>
                </SheetContent>
              </Sheet>

              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 px-6 text-sm font-semibold bg-[#021a42] hover:bg-[#031d4a] text-white rounded-[10px] transition-colors"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : (plan.isBusinessPlan ? 'Activate & Ship' : 'Activate')}
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* ── Payment Confirmation Dialog ── */}
      <Dialog open={showConfirmation} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md [&>button]:hidden">
          <DialogHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Package className="w-16 h-16 text-[#021a42]" />
            </div>
            <DialogTitle className="text-xl text-[#021a42]">Looks like you have placed an order</DialogTitle>
            <DialogDescription className="text-[#021a42]/50 mt-2">
              Did you complete the payment successfully?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            <Button onClick={handleConfirmPayment} className="w-full h-12 bg-[#021a42] hover:bg-[#031d4a] text-base font-semibold">
              <CheckCircle className="mr-2 h-5 w-5" />
              Yes, Payment Successful
            </Button>
            <Button variant="outline" onClick={handleDeclinePayment} className="w-full h-12 text-base border-[#021a42]/15 text-[#021a42]">
              No, Will Try Later
            </Button>
          </div>
          <p className="text-center text-xs text-[#021a42]/40 mt-3">
            Redirecting to home in <span className="font-bold text-[#f6245b]">{confirmTimeLeft}s</span>...
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Checkout;
