import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { getStates, getCitiesByState } from "@/data/indianStatesAndCities";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2, ShieldCheck, Truck, CreditCard, Home, Package, CheckCircle, MapPin, Check, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import paytapCheckoutSticker from "@/assets/paytap-checkout-sticker.png";
import paytapCard from "@/assets/paytap-card-product.png";

// PayU payment links based on product and quantity
const PAYU_PAYMENT_LINKS = {
  sticker_1: "https://u.payu.in/PAYUMN/prS7p8roOCn5",  // ₹999
  sticker_2: "https://u.payu.in/PAYUMN/RrgpdqmXfsEN",  // ₹1,998
  card_1: "https://u.payu.in/PAYUMN/prS7p8roOCn5",     // ₹999
  card_2: "https://u.payu.in/PAYUMN/RrgpdqmXfsEN"      // ₹1,998
};

// Required schema for checkout - shipping is mandatory for physical products
const checkoutSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  email: z.string().email("Please enter a valid email address"),
  address: z.string().trim().min(1, "Address is required").max(200, "Address must be less than 200 characters"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, "Please enter a valid 6-digit PIN code")
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const PRODUCTS = {
  sticker: {
    name: "Paytap NFC Tag Plan",
    description: "Contactless payment sticker",
    price: 999,
    image: paytapCheckoutSticker
  },
  card: {
    name: "Prepaid Card Plan",
    description: "RuPay-powered prepaid card",
    price: 999,
    image: paytapCard
  }
};

type ProductType = keyof typeof PRODUCTS;

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const rawProduct = searchParams.get("product") || "sticker";
  const normalizedProduct = rawProduct === "tag" ? "sticker" : rawProduct;
  const initialProduct: ProductType = (normalizedProduct in PRODUCTS) ? normalizedProduct as ProductType : "sticker";
  
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [productType, setProductType] = useState<ProductType>(initialProduct);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Get correct payment link based on product and quantity
  const getPaymentLink = () => {
    const key = `${productType}_${quantity}` as keyof typeof PAYU_PAYMENT_LINKS;
    return PAYU_PAYMENT_LINKS[key] || PAYU_PAYMENT_LINKS.sticker_1;
  };

  // Handle product change
  const handleProductChange = (type: ProductType) => {
    setProductType(type);
    setQuantity(1); // Reset quantity when switching products
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    getValues
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      state: "",
      pincode: ""
    }
  });

  // Update product from URL params
  useEffect(() => {
    const raw = searchParams.get("product") || "";
    const normalized = raw === "tag" ? "sticker" : raw;
    if (normalized && normalized in PRODUCTS) {
      setProductType(normalized as ProductType);
    }
  }, [searchParams]);

  // Track begin_checkout and add_to_cart events
  useEffect(() => {
    const product = PRODUCTS[productType];
    const itemPrice = product.price * quantity;

    if (typeof window !== 'undefined' && window.gtag) {
      // Fire begin_checkout for funnel tracking
      window.gtag('event', 'begin_checkout', {
        'value': itemPrice,
        'currency': 'INR',
        'items': [{
          'item_id': productType,
          'item_name': product.name,
          'price': product.price,
          'quantity': quantity
        }]
      });

      // Fire add_to_cart for retargeting audiences
      window.gtag('event', 'add_to_cart', {
        'value': itemPrice,
        'currency': 'INR',
        'items': [{
          'item_id': productType,
          'item_name': product.name,
          'price': product.price,
          'quantity': quantity
        }]
      });
    }

    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'AddToCart', {
        value: itemPrice,
        currency: 'INR',
        content_ids: [productType],
        content_type: 'product'
      });
    }
  }, []);

  const product = PRODUCTS[productType];
  const total = product.price * quantity;

  const onSubmit = async (data: CheckoutFormData) => {
    // Fire purchase_intent event before processing
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'purchase_intent', {
        'value': total,
        'currency': 'INR',
        'items': [{
          'item_id': productType,
          'item_name': product.name,
          'price': product.price,
          'quantity': quantity
        }]
      });
    }

    setIsLoading(true);
    try {
      // Generate a simple transaction ID
      const txnid = `TXN${Date.now()}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      
      // Save order to database
      const { error } = await supabase.from('orders').insert({
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone.trim(),
        address: data.address.trim(),
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        product_type: productType,
        quantity: quantity,
        amount: total,
        txnid: txnid,
        payment_status: 'pending',
        details_pending: false
      });

      if (error) {
        throw new Error('Failed to save order');
      }

      // Show success state
      setOrderPlaced(true);
      
      toast({
        title: "Order Placed Successfully! 🎉",
        description: "Your order will be shipped within 3-5 business days.",
      });

      // Open payment link in new tab after a short delay
      setTimeout(() => {
        window.open(getPaymentLink(), '_blank');
      }, 1000);

    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setValue("state", state);
    setValue("city", "");
    trigger("state");
  };

  const handleCityChange = (city: string) => {
    setValue("city", city);
    trigger("city");
  };

  // Calculate total items
  const totalItemsReceived = quantity;

  // Success state UI
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-muted py-8 flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-md text-center">
          <Card className="p-8">
            <div className="flex justify-center mb-6">
              <CheckCircle className="w-20 h-20 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">Your Paytap Account is Activated! 🎉</h1>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 mb-4">
              <p className="text-primary font-semibold">
                Platform access unlocked with {totalItemsReceived} {productType === 'sticker' ? (totalItemsReceived > 1 ? 'NFC tags' : 'NFC tag') : (totalItemsReceived > 1 ? 'prepaid cards' : 'prepaid card')}
              </p>
            </div>
            <p className="text-muted-foreground mb-6">
              Your hardware will be shipped within 3-5 business days. Thank you for joining Paytap.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              A payment window has been opened. Please complete your payment there.
            </p>
            <div className="space-y-3">
              <Button 
                onClick={() => window.open(getPaymentLink(), '_blank')}
                className="w-full bg-paytap-light hover:bg-paytap-dark"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Complete Payment (₹{total})
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate("/")}
                className="w-full"
              >
                <Home className="mr-2 h-4 w-4" />
                Go Back Home
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Checkout - Paytap</title>
      </Helmet>
      <div className="min-h-screen bg-muted py-6 md:py-8">
      <div className="container mx-auto px-4 max-w-lg">
        {/* Go Back Home Button */}
        <div className="flex justify-between items-center mb-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground p-0"
          >
            <Home className="w-4 h-4" />
            <span className="text-sm">Home</span>
          </Button>
          <div className="flex items-center gap-1 text-primary">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-medium">Secure Checkout</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ORDER SUMMARY CARD - HERO SECTION */}
          <Card className="shadow-lg border-0 overflow-hidden">
            <div className="bg-paytap-dark p-4 text-white">
              <div className="flex items-center gap-2 mb-1">
                <CreditCard className="w-5 h-5" />
                <h1 className="text-xl font-bold">Activate Your Paytap Account</h1>
              </div>
              <p className="text-white/80 text-sm">One-time platform access fee — includes hardware</p>
            </div>
            
            <CardContent className="p-4 space-y-5">
              {/* Product Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-muted-foreground">Choose Plan</Label>
                <div className="grid grid-cols-2 gap-3">
                  {(Object.keys(PRODUCTS) as ProductType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleProductChange(type)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        productType === type 
                          ? "border-paytap-light bg-paytap-light/5 shadow-md" 
                          : "border-border hover:border-muted-foreground bg-card"
                      }`}
                    >
                      <img 
                        src={PRODUCTS[type].image} 
                        alt={PRODUCTS[type].name} 
                        className="w-14 h-14 object-contain mx-auto mb-2"
                      />
                      <p className="text-sm font-semibold text-center text-foreground">
                        {type === 'sticker' ? 'NFC Tag Plan' : 'Prepaid Card Plan'}
                      </p>
                      {productType === type && (
                        <div className="flex items-center justify-center gap-1 mt-1">
                          <Check className="w-3 h-3 text-primary" />
                          <span className="text-xs text-primary font-medium">Selected</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-muted-foreground">How many do you need?</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(1)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      quantity === 1 
                        ? "border-paytap-light bg-paytap-light/10 shadow-md" 
                        : "border-border hover:border-muted-foreground bg-card"
                    }`}
                  >
                    <p className="text-sm font-semibold text-foreground">Starter</p>
                    <p className="text-xs text-muted-foreground">1 {productType === 'sticker' ? 'Tag' : 'Card'}</p>
                    <p className="text-xl font-bold text-primary">₹999</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuantity(2)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      quantity === 2 
                        ? "border-paytap-light bg-paytap-light/10 shadow-md" 
                        : "border-border hover:border-muted-foreground bg-card"
                    }`}
                  >
                    <p className="text-sm font-semibold text-foreground">Growth</p>
                    <p className="text-xs text-muted-foreground">2 {productType === 'sticker' ? 'Tags' : 'Cards'}</p>
                    <p className="text-xl font-bold text-primary">₹1,998</p>
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/corporate-registration')}
                  className="w-full p-3 rounded-xl border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 hover:bg-primary/5 transition-all text-center"
                >
                  <p className="text-sm font-medium text-foreground">For Business Account →</p>
                  <p className="text-xs text-muted-foreground">Corporate & Fleet solutions</p>
                </button>
              </div>

              <Separator />

              {/* What's Included - Dynamic based on quantity */}
              <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 space-y-3">
                <p className="text-sm font-semibold text-foreground">What's Included:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">
                      {productType === 'sticker' 
                        ? `Paytap Contactless Tag (${quantity} ${quantity > 1 ? 'units' : 'unit'})` 
                        : `Paytap Prepaid Card (${quantity} ${quantity > 1 ? 'units' : 'unit'})`}
                    </span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      ₹{999 * quantity} value
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">Lifetime Platform Access</span>
                    <span className="ml-auto text-xs text-muted-foreground">₹10,000 value</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">Smart Controls Dashboard</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">Free Shipping</span>
                  </div>
                </div>
              </div>

              {/* Simple Price Summary */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Platform Access Fee</span>
                  <span className="font-medium text-foreground">₹{total}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-primary font-medium">FREE</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg text-foreground">
                  <span>You Pay Today</span>
                  <span className="text-primary text-2xl">₹{total}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DELIVERY DETAILS SECTION - Required */}
          <Card className="mt-4 border border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Delivery Details</p>
                  <p className="text-xs text-muted-foreground">Required for 3-5 day delivery</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Personal Information */}
                <div className="space-y-3">
                  <h3 className="font-medium text-sm text-muted-foreground">Personal Details</h3>
                  
                  <div>
                    <Label htmlFor="name" className="text-xs text-muted-foreground">Full Name *</Label>
                    <Input
                      id="name"
                      {...register("name")}
                      placeholder="Enter your full name"
                      className={`mt-1 ${errors.name ? "border-destructive" : ""}`}
                    />
                    {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="phone" className="text-xs text-muted-foreground">Phone *</Label>
                      <Input
                        id="phone"
                        {...register("phone")}
                        placeholder="10-digit number"
                        className={`mt-1 ${errors.phone ? "border-destructive" : ""}`}
                      />
                      {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-xs text-muted-foreground">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="your@email.com"
                        className={`mt-1 ${errors.email ? "border-destructive" : ""}`}
                      />
                      {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Address Information */}
                <div className="space-y-3">
                  <h3 className="font-medium text-sm text-muted-foreground">Delivery Address</h3>
                  
                  <div>
                    <Label htmlFor="address" className="text-xs text-muted-foreground">Complete Address *</Label>
                    <Input
                      id="address"
                      {...register("address")}
                      placeholder="House/Flat No, Street, Landmark"
                      className={`mt-1 ${errors.address ? "border-destructive" : ""}`}
                    />
                    {errors.address && <p className="text-destructive text-xs mt-1">{errors.address.message}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="state" className="text-xs text-muted-foreground">State *</Label>
                      <Select onValueChange={handleStateChange}>
                        <SelectTrigger className={`mt-1 ${errors.state ? "border-destructive" : ""}`}>
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                          {getStates().map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.state && <p className="text-destructive text-xs mt-1">{errors.state.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="city" className="text-xs text-muted-foreground">City *</Label>
                      <Select onValueChange={handleCityChange} disabled={!selectedState}>
                        <SelectTrigger className={`mt-1 ${errors.city ? "border-destructive" : ""}`}>
                          <SelectValue placeholder="Select City" />
                        </SelectTrigger>
                        <SelectContent>
                          {getCitiesByState(selectedState).map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.city && <p className="text-destructive text-xs mt-1">{errors.city.message}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="pincode" className="text-xs text-muted-foreground">PIN Code *</Label>
                    <Input
                      id="pincode"
                      {...register("pincode")}
                      placeholder="6-digit PIN code"
                      className={`mt-1 ${errors.pincode ? "border-destructive" : ""}`}
                    />
                    {errors.pincode && <p className="text-destructive text-xs mt-1">{errors.pincode.message}</p>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods & Trust Section */}
          <div className="mt-4 space-y-3">
            {/* Payment Method Logos */}
            <div className="flex items-center justify-center gap-4 py-3 bg-card border border-border rounded-lg">
              <img src="/visa.svg" alt="Visa" className="h-6 grayscale opacity-70" />
              <img src="/mastercard.svg" alt="Mastercard" className="h-6 grayscale opacity-70" />
              <img src="/rupay.svg" alt="RuPay" className="h-6 grayscale opacity-70" />
              <img src="/upi.svg" alt="UPI" className="h-6 grayscale opacity-70" />
            </div>

            {/* Security Badge */}
            <div className="bg-primary/5 border border-primary/10 p-3 rounded-lg flex items-center justify-center gap-4">
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-muted-foreground">SSL Secured</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-muted-foreground">PayU Bank-Grade Security</span>
              </div>
            </div>
          </div>

          {/* BIG CTA BUTTON */}
          <Button 
            type="submit"
            className="w-full h-14 text-lg font-bold bg-paytap-dark hover:bg-[#031d4a] shadow-lg transition-all hover:shadow-xl mt-4" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-5 w-5" />
                Pay ₹{total} & Get My {productType === 'sticker' ? 'Tag' : 'Card'}
              </>
            )}
          </Button>

          {/* Trust Badges */}
          <div className="flex justify-center gap-4 text-xs text-muted-foreground mt-4">
            <div className="flex items-center gap-1">
              <Truck className="w-4 h-4 text-primary" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-1">
              <Package className="w-4 h-4 text-primary" />
              <span>Easy Setup</span>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Checkout;
