import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Loader2, Check, Lock, Home, CheckCircle, Download, XCircle, Shield, Truck, FileText, MapPin, Star, CreditCard, Info, Phone } from "lucide-react";
import { generateInvoice, type InvoiceData } from "@/lib/generateInvoice";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
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

const getAMC = (planKey: PlanType): number => {
  return PLANS[planKey].tags * 249;
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

const FIELD_INPUT = "w-full h-12 border-[1.5px] border-[#dde3ef] rounded-[10px] px-3.5 text-sm text-[#021a42] bg-white placeholder:text-[#b0bccc] focus:outline-none focus:border-[#021a42] focus:ring-[3px] focus:ring-[#021a42]/[0.08] transition-all";

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
  const formRef = useRef<HTMLDivElement>(null);

  const plan = PLANS[selectedPlan];
  const total = plan.price;
  const gstAmount = Math.round(total - (total / 1.18));
  const subtotal = total - gstAmount;
  const amcYr2 = getAMC(selectedPlan);

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

  // ── Returning customer lookup ──
  const handlePhoneLookup = async () => {
    const phone = getValues('phone')?.trim();
    if (!phone || !/^[6-9]\d{9}$/.test(phone) || phone === phoneLookedUp) return;
    setIsLookingUp(true);
    try {
      const { data, error } = await supabase.functions.invoke('lookup-customer', { body: { phone } });
      setPhoneLookedUp(phone);
      if (!error && data?.found && data.customer) {
        const c = data.customer;
        if (c.email) setValue('email', c.email);
        if (c.pan) { setValue('pan', c.pan); setTaxIdType('pan'); }
        if (c.gst) { setValue('gst', c.gst); setTaxIdType('gst'); }
        if (c.companyName) setValue('companyName', c.companyName);
        if (c.accountType && c.accountType in PLANS) setSelectedPlan(c.accountType as PlanType);
        toast({ title: "Welcome back! 🎉", description: "We've loaded your details from your previous order." });
      }
    } catch { /* silent */ }
    setIsLookingUp(false);
  };

  // ── Handlers ──
  const handleConfirmPayment = async () => {
    if (lastFormData) {
      const invoiceData: InvoiceData = {
        txnid: orderTxnId, name: lastFormData.name, address: lastFormData.address || '',
        city: lastFormData.city || '', state: lastFormData.state || '', pincode: lastFormData.pincode || '',
        phone: lastFormData.phone, email: lastFormData.email, pan: lastFormData.pan, gst: lastFormData.gst,
        companyName: lastFormData.companyName, productType: 'sticker', planName: plan.name,
        vehicleCount: plan.tags, quantity: 1, unitPrice: plan.price, subtotal, gstAmount, total,
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
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout', { value: total, currency: 'INR', content_name: plan.name, num_items: plan.tags });
    }

    setIsLoading(true);
    try {
      const txnid = `TXN${Date.now()}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      const { error } = await supabase.from('orders').insert({
        name: data.name.trim(), email: data.email.trim().toLowerCase(), phone: data.phone.trim(),
        address: data.address?.trim() || '', city: data.city?.trim() || '', state: data.state?.trim() || '',
        pincode: data.pincode?.trim() || '', product_type: 'sticker', quantity: plan.tags, amount: total,
        txnid, payment_status: 'pending', details_pending: false, account_type: selectedPlan,
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
  };

  const states = getStates();
  const cities = stateValue ? getCitiesByState(stateValue) : [];
  const driverCards = getDriverCards(selectedPlan);

  // ══════════════════════════════════════════════════════════
  // ── RENDER ──
  // ══════════════════════════════════════════════════════════
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Checkout – Paytap</title>
      </Helmet>

      <div className="min-h-screen bg-[#f4f6fa]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {/* ── TOP BAR ── */}
        <header className="bg-[#021a42] h-14 px-4 md:px-8 flex items-center justify-between sticky top-0 z-50 border-b-[3px] border-[#f6245b]">
          <button onClick={() => navigate("/")} className="flex items-center gap-2.5 text-white font-extrabold text-xl tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            <div className="w-[30px] h-[30px] bg-[#f6245b] rounded-md flex items-center justify-center text-base font-extrabold text-white">P</div>
            PayTap
          </button>
          <div className="flex items-center gap-1.5 text-white/70 text-[13px]">
            <Lock className="w-[13px] h-[13px] opacity-70" />
            Secure Checkout · RBI-Aligned System
          </div>
        </header>

        {/* ── PROGRESS BAR ── */}
        <div className="bg-white border-b border-[#dde3ef] px-4 md:px-8 py-3.5">
          <div className="max-w-[960px] mx-auto flex items-center">
            <div className="flex items-center gap-2 text-[13px] font-medium text-[#021a42]">
              <div className="w-6 h-6 rounded-full bg-[#021a42] text-white flex items-center justify-center text-[11px] font-bold">1</div>
              Select Plan
            </div>
            <div className="flex-1 h-0.5 bg-[#dde3ef] mx-3" />
            <div className="flex items-center gap-2 text-[13px] font-medium text-[#021a42]">
              <div className="w-6 h-6 rounded-full bg-[#021a42] text-white flex items-center justify-center text-[11px] font-bold">2</div>
              Your Details
            </div>
            <div className="flex-1 h-0.5 bg-[#dde3ef] mx-3" />
            <div className="flex items-center gap-2 text-[13px] font-medium text-[#8896b0]">
              <div className="w-6 h-6 rounded-full border-2 border-[#dde3ef] bg-white text-[#8896b0] flex items-center justify-center text-[11px] font-bold">3</div>
              Payment
            </div>
          </div>
        </div>

        {/* ── MAIN LAYOUT ── */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <main className="max-w-[960px] mx-auto px-3 md:px-5 py-8 grid grid-cols-1 md:grid-cols-[1fr_380px] gap-6 items-start">

            {/* ── LEFT COLUMN ── */}
            <div className="space-y-5">

              {/* CARD 1: Choose Your Plan */}
              <div className="bg-white rounded-2xl border border-[#dde3ef] shadow-[0_2px_12px_rgba(2,26,66,0.06)] overflow-hidden animate-[fadeUp_0.4s_ease_both]">
                <div className="px-6 py-5 border-b border-[#dde3ef] flex items-center gap-2.5">
                  <div className="w-[22px] h-[22px] bg-[#021a42] rounded-full flex items-center justify-center text-[11px] font-bold text-white">1</div>
                  <h3 className="text-[15px] font-bold text-[#021a42]" style={{ fontFamily: "'Syne', sans-serif" }}>Choose Your Plan</h3>
                </div>
                <div className="p-6">
                  <div className="grid gap-2.5">
                    {(Object.entries(PLANS) as [PlanType, PlanInfo][]).map(([key, p]) => {
                      const isSelected = selectedPlan === key;
                      const isPopular = p.recommended;
                      const dc = getDriverCards(key);
                      const planAmc = p.tags * 249;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => handlePlanSelect(key)}
                          className={`relative w-full border-2 rounded-xl px-4 py-4 cursor-pointer grid grid-cols-[24px_1fr_auto] items-center gap-3.5 transition-all text-left ${
                            isPopular && isSelected ? 'border-[#f6245b] bg-[#fff0f5] shadow-[0_0_0_1px_#f6245b]' :
                            isPopular ? 'border-[#f6245b] bg-[#fff8fa]' :
                            isSelected ? 'border-[#021a42] bg-[#f0f4fc] shadow-[0_0_0_1px_#021a42]' :
                            'border-[#dde3ef] bg-white hover:border-[#021a42] hover:bg-[#f9fafc]'
                          }`}
                        >
                          {isPopular && (
                            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#f6245b] text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                              ⭐ Most Popular
                            </span>
                          )}
                          {/* Radio */}
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                            isSelected ? (isPopular ? 'border-[#f6245b] bg-[#f6245b]' : 'border-[#021a42] bg-[#021a42]') :
                            isPopular ? 'border-[#f6245b]' : 'border-[#dde3ef]'
                          }`}>
                            {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                          {/* Info */}
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-bold text-[#021a42]" style={{ fontFamily: "'Syne', sans-serif" }}>{p.name}</span>
                              {dc > 0 && (
                                <span className="text-[10px] font-semibold bg-[#021a42] text-white px-2 py-0.5 rounded tracking-wide">+{dc} Driver Card{dc > 1 ? 's' : ''}</span>
                              )}
                            </div>
                            <div className="text-xs text-[#8896b0] mt-0.5">{p.tags} vehicle{p.tags > 1 ? 's' : ''} · {p.perVehicle}</div>
                          </div>
                          {/* Price */}
                          <div className="text-right">
                            <div className="text-lg font-extrabold text-[#021a42]" style={{ fontFamily: "'Syne', sans-serif" }}>{formatINR(p.price)}</div>
                            <div className="text-[11px] text-[#8896b0] mt-0.5">+ <span className="text-[#f6245b] font-semibold">{formatINR(planAmc)}/yr</span> from Yr 2</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* AMC Callout */}
                  <div className="bg-gradient-to-br from-[#021a42] to-[#0a2a5e] rounded-[10px] p-3.5 flex items-center gap-3 mt-3.5">
                    <div className="w-9 h-9 bg-[#f6245b]/15 rounded-lg flex items-center justify-center shrink-0">
                      <Shield className="w-[18px] h-[18px] text-[#f6245b]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <strong className="block text-[13px] font-semibold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>Annual Platform Fee (AMC) — Included Free Year 1</strong>
                      <span className="text-[11px] text-white/60 leading-snug">SaaS dashboard · Real-time analytics · Interchange earnings · From Year 2: ₹249/vehicle/yr</span>
                    </div>
                    <div className="text-right shrink-0" style={{ fontFamily: "'Syne', sans-serif" }}>
                      <div className="text-base font-extrabold text-[#f6245b]">₹0</div>
                      <div className="text-[10px] font-medium text-[#f6245b]/70">Yr 1</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 2: Your Details */}
              <div className="bg-white rounded-2xl border border-[#dde3ef] shadow-[0_2px_12px_rgba(2,26,66,0.06)] overflow-hidden animate-[fadeUp_0.4s_ease_both]" style={{ animationDelay: '0.08s' }} ref={formRef}>
                <div className="px-6 py-5 border-b border-[#dde3ef] flex items-center gap-2.5">
                  <div className="w-[22px] h-[22px] bg-[#021a42] rounded-full flex items-center justify-center text-[11px] font-bold text-white">2</div>
                  <h3 className="text-[15px] font-bold text-[#021a42]" style={{ fontFamily: "'Syne', sans-serif" }}>Your Details</h3>
                </div>
                <div className="p-6">
                  <div className="grid gap-3.5">
                    {/* Mobile Number */}
                    <div>
                      <label className="text-[11px] font-semibold text-[#8896b0] uppercase tracking-wider mb-1.5 block">Mobile Number *</label>
                      <Input
                        {...register("phone")}
                        placeholder="+91 98765 43210"
                        onBlur={handlePhoneLookup}
                        className={FIELD_INPUT}
                      />
                      {isLookingUp && (
                        <div className="flex items-center gap-1.5 mt-1 pl-1">
                          <Loader2 className="w-3 h-3 animate-spin text-[#00c896]" />
                          <span className="text-xs text-[#00c896]">Checking...</span>
                        </div>
                      )}
                      {errors.phone && <p className="text-xs text-[#f6245b] mt-1 pl-1">{errors.phone.message}</p>}
                    </div>

                    {/* Name + Email side by side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <div>
                        <label className="text-[11px] font-semibold text-[#8896b0] uppercase tracking-wider mb-1.5 block">Full Name *</label>
                        <Input {...register("name")} placeholder="Ramesh Kumar" className={FIELD_INPUT} />
                        {errors.name && <p className="text-xs text-[#f6245b] mt-1 pl-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-[#8896b0] uppercase tracking-wider mb-1.5 block">Email Address</label>
                        <Input {...register("email")} type="email" placeholder="you@email.com" className={FIELD_INPUT} />
                        <div className="text-[11px] text-[#8896b0] mt-1">For invoice & activation email</div>
                        {errors.email && <p className="text-xs text-[#f6245b] mt-1 pl-1">{errors.email.message}</p>}
                      </div>
                    </div>

                    {/* Tax ID */}
                    <div>
                      <label className="text-[11px] font-semibold text-[#8896b0] uppercase tracking-wider mb-1.5 block">Tax Identity</label>
                      <div className="flex border-[1.5px] border-[#dde3ef] rounded-[10px] overflow-hidden mb-2.5">
                        <button
                          type="button"
                          onClick={() => setTaxIdType('pan')}
                          className={`flex-1 py-2.5 text-[13px] font-semibold transition-all ${
                            taxIdType === 'pan' ? 'bg-[#021a42] text-white' : 'bg-white text-[#8896b0]'
                          }`}
                        >
                          PAN Number
                        </button>
                        <button
                          type="button"
                          onClick={() => setTaxIdType('gst')}
                          className={`flex-1 py-2.5 text-[13px] font-semibold transition-all ${
                            taxIdType === 'gst' ? 'bg-[#021a42] text-white' : 'bg-white text-[#8896b0]'
                          }`}
                        >
                          GST Number
                        </button>
                      </div>
                      {taxIdType === 'gst' ? (
                        <Input
                          {...register("gst", { setValueAs: (v) => v?.toUpperCase() })}
                          placeholder="e.g. 22AAAAA0000A1Z5"
                          maxLength={15}
                          className={`${FIELD_INPUT} uppercase`}
                        />
                      ) : (
                        <Input
                          {...register("pan", { setValueAs: (v) => v?.toUpperCase() })}
                          placeholder="e.g. ABCDE1234F"
                          maxLength={10}
                          className={`${FIELD_INPUT} uppercase`}
                        />
                      )}
                      {taxIdType === 'pan' && (
                        <div className="text-[11px] text-[#00c896] mt-1">✓ PAN works for sole owners & proprietors — no GST needed</div>
                      )}
                      {fieldErrors.gst && <p className="text-xs text-[#f6245b] mt-1 pl-1">{fieldErrors.gst}</p>}
                      {fieldErrors.pan && <p className="text-xs text-[#f6245b] mt-1 pl-1">{fieldErrors.pan}</p>}
                    </div>

                    {/* Company / Fleet Name */}
                    <div>
                      <label className="text-[11px] font-semibold text-[#8896b0] uppercase tracking-wider mb-1.5 block">Fleet / Business Name *</label>
                      {taxIdType === 'gst' ? (
                        <>
                          <Input {...register("companyName")} placeholder="Your fleet name or company name" className={FIELD_INPUT} />
                          {fieldErrors.companyName && <p className="text-xs text-[#f6245b] mt-1 pl-1">{fieldErrors.companyName}</p>}
                        </>
                      ) : (
                        <>
                          <Input value={nameValue || ''} readOnly tabIndex={-1} className={`${FIELD_INPUT} opacity-60 cursor-default`} />
                          <p className="text-[11px] text-[#8896b0] mt-1">Using your name as billing name</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 3: Delivery Address */}
              <div className="bg-white rounded-2xl border border-[#dde3ef] shadow-[0_2px_12px_rgba(2,26,66,0.06)] overflow-hidden animate-[fadeUp_0.4s_ease_both]" style={{ animationDelay: '0.16s' }}>
                <div className="px-6 py-5 border-b border-[#dde3ef] flex items-center gap-2.5">
                  <div className="w-[22px] h-[22px] bg-[#021a42] rounded-full flex items-center justify-center text-[11px] font-bold text-white">3</div>
                  <h3 className="text-[15px] font-bold text-[#021a42]" style={{ fontFamily: "'Syne', sans-serif" }}>Delivery Address</h3>
                </div>
                <div className="p-6">
                  {/* Delivery note */}
                  <div className="bg-[#f0f9f6] border border-[#c8eedf] rounded-[10px] p-3 flex items-center gap-2.5 mb-4">
                    <Truck className="w-[18px] h-[18px] text-[#1a7a52] shrink-0" />
                    <span className="text-[13px] text-[#1a7a52] leading-snug">
                      Your NFC Vehicle Tag(s) will be shipped within <strong>3–5 business days.</strong>
                    </span>
                  </div>

                  <div className="grid gap-3.5">
                    {/* Pincode */}
                    <div>
                      <label className="text-[11px] font-semibold text-[#8896b0] uppercase tracking-wider mb-1.5 block">Pincode *</label>
                      <Input {...register("pincode")} placeholder="560001" maxLength={6} className={FIELD_INPUT} />
                      {fieldErrors.pincode && <p className="text-xs text-[#f6245b] mt-1 pl-1">{fieldErrors.pincode}</p>}
                    </div>

                    {/* State + City */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <div>
                        <label className="text-[11px] font-semibold text-[#8896b0] uppercase tracking-wider mb-1.5 block">State *</label>
                        <select
                          {...register("state")}
                          className={`${FIELD_INPUT} appearance-none cursor-pointer`}
                          defaultValue=""
                        >
                          <option value="" disabled>Select State</option>
                          {states.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {fieldErrors.state && <p className="text-xs text-[#f6245b] mt-1 pl-1">{fieldErrors.state}</p>}
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-[#8896b0] uppercase tracking-wider mb-1.5 block">City *</label>
                        <select
                          {...register("city")}
                          className={`${FIELD_INPUT} appearance-none cursor-pointer`}
                          defaultValue=""
                          disabled={!stateValue}
                        >
                          <option value="" disabled>{stateValue ? 'Select City' : 'Select state first'}</option>
                          {cities.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        {fieldErrors.city && <p className="text-xs text-[#f6245b] mt-1 pl-1">{fieldErrors.city}</p>}
                      </div>
                    </div>

                    {/* Address Line */}
                    <div>
                      <label className="text-[11px] font-semibold text-[#8896b0] uppercase tracking-wider mb-1.5 block">Address Line *</label>
                      <Input {...register("address")} placeholder="House/Plot No., Street, Area, Landmark" className={FIELD_INPUT} />
                      {fieldErrors.address && <p className="text-xs text-[#f6245b] mt-1 pl-1">{fieldErrors.address}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN — ORDER SUMMARY ── */}
            <div className="md:sticky md:top-[100px] order-first md:order-last">
              <div className="bg-white rounded-2xl border border-[#dde3ef] shadow-[0_2px_12px_rgba(2,26,66,0.06)] overflow-hidden">
                <div className="px-6 py-5 border-b border-[#dde3ef]">
                  <h3 className="text-[15px] font-bold text-[#021a42]" style={{ fontFamily: "'Syne', sans-serif" }}>Order Summary</h3>
                </div>
                <div className="px-5 py-5">
                  {/* Line items */}
                  <div className="divide-y divide-[#dde3ef]">
                    <div className="flex justify-between items-start py-2.5">
                      <div>
                        <div className="text-[13px] text-[#021a42]">{plan.name}</div>
                        <div className="text-[11px] text-[#8896b0] mt-0.5">{plan.tags} NFC Vehicle Tag{plan.tags > 1 ? 's' : ''}</div>
                      </div>
                      <div className="text-sm font-semibold text-[#021a42]">{formatINR(subtotal)}</div>
                    </div>
                    <div className="flex justify-between items-start py-2.5">
                      <div>
                        <div className="text-[13px] text-[#021a42]">Platform AMC — Year 1</div>
                        <div className="text-[11px] text-[#8896b0] mt-0.5">SaaS + Analytics + Support</div>
                      </div>
                      <div className="text-sm font-semibold text-[#00c896]">FREE</div>
                    </div>
                    <div className="flex justify-between items-start py-2.5">
                      <div>
                        <div className="text-[13px] text-[#021a42]">GST (18%)</div>
                        <div className="text-[11px] text-[#8896b0] mt-0.5">GST invoice provided</div>
                      </div>
                      <div className="text-sm font-semibold text-[#021a42]">Incl.</div>
                    </div>
                    <div className="flex justify-between items-start py-2.5">
                      <div>
                        <div className="text-[13px] text-[#021a42]">Delivery</div>
                        <div className="text-[11px] text-[#8896b0] mt-0.5">3–5 business days</div>
                      </div>
                      <div className="text-sm font-semibold text-[#00c896]">FREE</div>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="bg-[#021a42] rounded-[10px] px-4 py-3.5 flex justify-between items-center mt-3.5">
                    <div>
                      <div className="text-sm font-bold text-white/80" style={{ fontFamily: "'Syne', sans-serif" }}>Total Today</div>
                      <div className="text-[11px] text-white/50 mt-0.5">GST included</div>
                    </div>
                    <div className="text-[22px] font-extrabold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>{formatINR(total)}</div>
                  </div>

                  {/* What's included */}
                  <ul className="mt-4 flex flex-col gap-2">
                    {[
                      `${plan.tags} NFC RuPay Vehicle Tag${plan.tags > 1 ? 's' : ''}`,
                      'Fleet SaaS Dashboard — Full Year Free',
                      'Real-time analytics & spend control',
                      'Interchange income on every transaction',
                      'Dedicated onboarding support',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-[#021a42]">
                        <div className="w-[18px] h-[18px] rounded-full bg-[#e8f5f0] flex items-center justify-center shrink-0">
                          <Check className="w-[10px] h-[10px] text-[#00c896]" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Cashback note */}
                  <div className="bg-[#fff8e6] border border-[#fde8a0] rounded-lg p-2.5 text-xs text-[#7a5c00] mt-3 flex items-center gap-2">
                    🎁 <span><strong>₹300 wallet credit</strong> loaded on first transaction — fuel, toll, or service.</span>
                  </div>

                  {/* AMC reminder */}
                  <div className="bg-[#f0f4fc] border border-[#c5d2ec] rounded-lg p-2.5 text-[11px] text-[#021a42] mt-2.5 flex gap-2 items-start leading-relaxed">
                    <Info className="w-3.5 h-3.5 text-[#021a42] shrink-0 mt-0.5" />
                    <span>Platform fee of <strong className="text-[#f6245b]">{formatINR(amcYr2)}/yr</strong> (₹249/vehicle/yr) applies from Year 2 onwards. Cancel anytime before renewal.</span>
                  </div>

                  {/* CTA */}
                  <div className="mt-5">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-14 bg-[#f6245b] hover:bg-[#d91a4d] text-white border-none rounded-xl text-base font-extrabold flex items-center justify-center gap-2.5 tracking-wide transition-all hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(246,36,91,0.35)]"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Redirecting to Payment...
                        </span>
                      ) : (
                        <>
                          <CreditCard className="w-[18px] h-[18px]" />
                          Pay {formatINR(total)} & Activate →
                        </>
                      )}
                    </Button>
                    <div className="text-center text-[11px] text-[#8896b0] mt-2.5 flex items-center justify-center gap-1.5">
                      <Lock className="w-3 h-3" />
                      Secure payment · Takes ~60 seconds
                    </div>
                  </div>

                  {/* Trust strip */}
                  <div className="flex flex-wrap gap-2 mt-4 justify-center">
                    {[
                      { icon: <Shield className="w-[11px] h-[11px] text-[#00c896]" />, label: 'RBI-Aligned PPI' },
                      { icon: <FileText className="w-[11px] h-[11px] text-[#00c896]" />, label: 'GST Invoice' },
                      { icon: <Truck className="w-[11px] h-[11px] text-[#00c896]" />, label: 'Ships in 3–5 days' },
                      { icon: <Phone className="w-[11px] h-[11px] text-[#00c896]" />, label: '24/7 Support' },
                    ].map((t, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-[#8896b0] bg-[#f4f6fa] px-2.5 py-1 rounded-full border border-[#dde3ef]">
                        {t.icon}
                        {t.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </main>
        </form>

        {/* Footer */}
        <footer className="bg-[#021a42] text-center py-5 text-xs text-white/40 mt-12">
          © 2026 Drivetap Innovations India Pvt. Ltd. · RBI-Regulated PPI · PCI-DSS Compliant ·{' '}
          <a href="/privacy-policy" className="text-white/50 hover:text-white no-underline">Privacy Policy</a> ·{' '}
          <a href="/terms-and-conditions" className="text-white/50 hover:text-white no-underline">Terms of Service</a> ·{' '}
          <a href="/cancellation-refunds" className="text-white/50 hover:text-white no-underline">Refund Policy</a>
        </footer>
      </div>

      {/* ── Payment Confirmation Dialog ── */}
      <Dialog open={showConfirmation} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md [&>button]:hidden">
          <DialogHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-[#00c896]" />
            </div>
            <DialogTitle className="text-xl text-[#021a42]">Payment Completed?</DialogTitle>
            <DialogDescription className="text-[#8896b0] mt-2">
              If your payment was successful, download your GST invoice now.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            <Button onClick={handleConfirmPayment} className="w-full h-12 bg-[#00c896] hover:bg-[#00b080] text-base font-semibold text-white">
              <Download className="mr-2 h-5 w-5" />
              Yes, Download Invoice
            </Button>
            <Button variant="outline" onClick={handleDeclinePayment} className="w-full h-12 text-base border-[#dde3ef] text-[#021a42]">
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
