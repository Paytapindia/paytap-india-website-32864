import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { getStates, getCitiesByState } from "@/data/indianStatesAndCities";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2, ShieldCheck, Truck, CreditCard, Home, Plus, Minus, Package } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import paytapTagSticker from "@/assets/paytap-tag-sticker.png";
import paytapCard from "@/assets/paytap-card-product.png";

const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  email: z.string().email("Please enter a valid email address"),
  address: z.string().min(10, "Please enter your complete address"),
  city: z.string().min(1, "Please select a city"),
  state: z.string().min(1, "Please select a state"),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, "Please enter a valid 6-digit PIN code")
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const PRODUCTS = {
  sticker: {
    name: "PayTap NFC Sticker",
    description: "Contactless payment sticker",
    price: 499,
    image: paytapTagSticker
  },
  card: {
    name: "PayTap Prepaid Card",
    description: "RuPay-powered prepaid card",
    price: 499,
    image: paytapCard
  }
};

type ProductType = keyof typeof PRODUCTS;

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const initialProduct = (searchParams.get("product") as ProductType) || "sticker";
  
  const [isLoading, setIsLoading] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [productType, setProductType] = useState<ProductType>(initialProduct);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema)
  });

  // Update product from URL params
  useEffect(() => {
    const product = searchParams.get("product") as ProductType;
    if (product && PRODUCTS[product]) {
      setProductType(product);
    }
  }, [searchParams]);

  const product = PRODUCTS[productType];
  const subtotal = product.price * quantity;
  const total = subtotal; // GST included in price

  const initiatePayment = async (orderData: CheckoutFormData) => {
    try {
      // Call edge function to create payment
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          ...orderData,
          productType,
          quantity
        }
      });

      if (error || !data?.success) {
        throw new Error(error?.message || data?.error || 'Payment initiation failed');
      }

      const paymentData = data.paymentData;

      // Store order data in session for success page
      sessionStorage.setItem('payuOrderData', JSON.stringify({
        ...orderData,
        txnid: paymentData.txnid,
        amount: paymentData.amount,
        productType,
        quantity
      }));

      // Create and submit PayU form
      const payuForm = document.createElement('form');
      payuForm.method = 'POST';
      payuForm.action = 'https://secure.payu.in/_payment'; // Production URL
      payuForm.style.display = 'none';

      Object.entries(paymentData).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = String(value);
        payuForm.appendChild(input);
      });

      document.body.appendChild(payuForm);
      payuForm.submit();
      
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: error instanceof Error ? error.message : "Failed to initiate payment. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: CheckoutFormData) => {
    setIsLoading(true);
    try {
      await initiatePayment(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
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

  const adjustQuantity = (delta: number) => {
    setQuantity(prev => Math.min(Math.max(1, prev + delta), 10));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Go Back Home Button */}
        <div className="flex justify-end mb-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Go Back Home
          </Button>
        </div>
        
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Order</h1>
          <p className="text-gray-600">Get your PayTap product delivered to your doorstep</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
              <CardDescription>Please provide your details for delivery</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Personal Details</h3>
                  
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      {...register("name")}
                      placeholder="Enter your full name"
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      {...register("phone")}
                      placeholder="Enter 10-digit mobile number"
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="Enter your email address"
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <Separator />

                {/* Address Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Delivery Address</h3>
                  
                  <div>
                    <Label htmlFor="address">Complete Address *</Label>
                    <Input
                      id="address"
                      {...register("address")}
                      placeholder="House/Flat No, Street, Landmark"
                      className={errors.address ? "border-red-500" : ""}
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Select onValueChange={handleStateChange}>
                        <SelectTrigger className={errors.state ? "border-red-500" : ""}>
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
                      {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Select onValueChange={handleCityChange} disabled={!selectedState}>
                        <SelectTrigger className={errors.city ? "border-red-500" : ""}>
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
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="pincode">PIN Code *</Label>
                    <Input
                      id="pincode"
                      {...register("pincode")}
                      placeholder="Enter 6-digit PIN code"
                      className={errors.pincode ? "border-red-500" : ""}
                    />
                    {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode.message}</p>}
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-paytap-light hover:bg-paytap-dark" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Pay ₹{total} & Place Order
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Product Selection */}
                <div className="space-y-3">
                  <Label>Select Product</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {(Object.keys(PRODUCTS) as ProductType[]).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setProductType(type)}
                        className={`p-3 rounded-lg border-2 transition-all text-left ${
                          productType === type 
                            ? "border-paytap-light bg-paytap-light/5" 
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <img 
                          src={PRODUCTS[type].image} 
                          alt={PRODUCTS[type].name} 
                          className="w-12 h-12 object-contain mx-auto mb-2"
                        />
                        <p className="text-sm font-medium text-center">{type === 'sticker' ? 'NFC Sticker' : 'Prepaid Card'}</p>
                        <p className="text-xs text-gray-500 text-center">₹{PRODUCTS[type].price}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Selected Product Details */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center p-2">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{product.name}</h4>
                    <p className="text-sm text-gray-600">{product.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{product.price}</p>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center justify-between">
                  <Label>Quantity</Label>
                  <div className="flex items-center gap-3">
                    <Button 
                      type="button"
                      variant="outline" 
                      size="icon"
                      onClick={() => adjustQuantity(-1)}
                      disabled={quantity <= 1}
                      className="h-8 w-8"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{quantity}</span>
                    <Button 
                      type="button"
                      variant="outline" 
                      size="icon"
                      onClick={() => adjustQuantity(1)}
                      disabled={quantity >= 10}
                      className="h-8 w-8"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({quantity} × ₹{product.price})</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>GST (Included)</span>
                    <span>Included</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Secure NFC payment technology</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Free shipping across India</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Package className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Easy setup and activation</span>
                </div>
              </CardContent>
            </Card>

            {/* Security Note */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <ShieldCheck className="w-4 h-4 inline mr-2" />
                Your payment is secured by PayU's bank-grade security
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
