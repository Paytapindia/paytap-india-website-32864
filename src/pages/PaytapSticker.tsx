import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Shield, 
  Smartphone, 
  CheckCircle, 
  Wifi, 
  CreditCard, 
  Fuel, 
  Car, 
  Train, 
  ParkingCircle,
  Lock,
  Bell,
  Eye,
  Fingerprint,
  BadgeCheck,
  Zap,
  ArrowRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import paytapTagSticker from "@/assets/paytap-tag-sticker.png";

const PaytapSticker = () => {
  const navigate = useNavigate();
  
  const handleBuyNow = () => {
    navigate("/checkout?product=sticker");
  };

  const howItWorksSteps = [
    {
      icon: <CreditCard className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Stick it Anywhere",
      description: "Attach the compact NFC sticker to your vehicle dashboard, phone back, or wallet."
    },
    {
      icon: <Wifi className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Tap to Pay",
      description: "Hold your sticker near any NFC-enabled POS terminal or payment reader."
    },
    {
      icon: <Zap className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Instant Payment",
      description: "Transaction completes in seconds — no PIN, no OTP for small amounts."
    },
    {
      icon: <Bell className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Get Notification",
      description: "Receive real-time alerts on the Paytap app for every transaction."
    }
  ];

  const useCases = [
    { icon: <Fuel className="w-6 h-6" />, title: "Fuel Pumps", description: "Pay at petrol stations instantly" },
    { icon: <Car className="w-6 h-6" />, title: "FASTag Tolls", description: "Recharge your FASTag on the go" },
    { icon: <Train className="w-6 h-6" />, title: "Metro Stations", description: "Quick entry at metro gates" },
    { icon: <ParkingCircle className="w-6 h-6" />, title: "Parking Lots", description: "Pay parking fees effortlessly" },
    { icon: <CreditCard className="w-6 h-6" />, title: "RuPay Merchants", description: "8L+ acceptance points across India" }
  ];

  const activationSteps = [
    { step: "01", title: "Download Paytap App", description: "Available on iOS and Android app stores" },
    { step: "02", title: "Register & Complete KYC", description: "Quick verification with Aadhaar or PAN" },
    { step: "03", title: "Link Your Sticker", description: "Scan the QR code on your NFC sticker" },
    { step: "04", title: "Add Funds", description: "Load money via UPI, Net Banking, or Card" },
    { step: "05", title: "Start Tapping", description: "Ready to pay at 8L+ acceptance points" }
  ];

  const securityFeatures = [
    {
      icon: <Lock className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Card Control",
      description: "Freeze or unfreeze your sticker instantly from the Paytap app anytime."
    },
    {
      icon: <Shield className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Tap Limits",
      description: "Set daily transaction and spending limits to stay in control."
    },
    {
      icon: <Fingerprint className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Secure NFC",
      description: "Tokenized transactions ensure your card number is never exposed."
    },
    {
      icon: <Bell className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Real-time Alerts",
      description: "Instant notifications for every transaction on your linked mobile."
    },
    {
      icon: <Eye className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Zero Bank Exposure",
      description: "Your primary bank account details stay completely private."
    }
  ];

  const trustBadges = [
    { icon: <Shield className="w-5 h-5" />, text: "Secure Payments" },
    { icon: <BadgeCheck className="w-5 h-5" />, text: "RBI-Compliant" },
    { icon: <Zap className="w-5 h-5" />, text: "Easy Activation" },
    { icon: <CheckCircle className="w-5 h-5" />, text: "NPCI-Enabled" },
    { icon: <Lock className="w-5 h-5" />, text: "PCI-DSS Secured" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-10 md:pt-24 md:pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/30 to-background">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 text-primary rounded-full text-xs md:text-sm font-medium mb-4">
                Paytap NFC Sticker
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
                Paytap NFC Tag / Sticker
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-3 md:mb-4 max-w-xl">
                A compact, stick-anywhere NFC tag for everyday payments.
              </p>
              <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-xl">
                Tap to pay at fuel pumps, recharge FASTag tolls, metros, parking & more — fast and secure.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <span className="text-lg md:text-xl text-muted-foreground line-through">₹999</span>
                  <span className="text-2xl md:text-3xl font-bold text-primary">₹499</span>
                </div>
                <Button 
                  onClick={handleBuyNow}
                  className="bg-paytap-light hover:bg-paytap-dark text-white px-6 py-5 md:px-8 md:py-6 text-base md:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  Buy Now
                  <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="flex-1 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-paytap-light/20 rounded-3xl blur-3xl" />
                <img 
                  src={paytapTagSticker} 
                  alt="Paytap NFC Sticker" 
                  loading="lazy"
                  className="relative max-w-[240px] sm:max-w-[320px] lg:max-w-[400px] w-full drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
              How Paytap Sticker Works
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl md:max-w-2xl mx-auto">
              Simple tap-to-pay technology that makes payments effortless
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {howItWorksSteps.map((step, index) => (
              <Card key={index} className="bg-primary border-primary/20 hover:shadow-lg transition-shadow">
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 text-white">
                    {step.icon}
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-white/70 text-xs md:text-sm">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Where You Can Use It */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
              Where You Can Use It
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl md:max-w-2xl mx-auto">
              Tap to pay at thousands of locations across India
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-paytap-light/10 rounded-lg md:rounded-xl flex items-center justify-center mx-auto mb-2 md:mb-3 text-paytap-light">
                    {useCase.icon}
                  </div>
                  <h3 className="text-xs md:text-sm font-semibold text-foreground mb-1">{useCase.title}</h3>
                  <p className="text-muted-foreground text-[10px] md:text-xs">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Activation Process */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
              Activation Process
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl md:max-w-2xl mx-auto">
              Get started in just a few minutes
            </p>
          </div>
          
          <div className="space-y-4 md:space-y-6">
            {activationSteps.map((step, index) => (
              <div 
                key={index} 
                className="flex items-start gap-4 md:gap-6 p-4 md:p-6 bg-card border border-border rounded-xl md:rounded-2xl hover:shadow-lg transition-shadow"
              >
                <div className="w-10 h-10 md:w-14 md:h-14 bg-primary rounded-lg md:rounded-xl flex items-center justify-center text-primary-foreground font-bold text-sm md:text-lg shrink-0">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-foreground mb-1">{step.title}</h3>
                  <p className="text-muted-foreground text-sm md:text-base">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Safety */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
              Security & Safety
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl md:max-w-2xl mx-auto">
              Enterprise-grade security to protect every transaction
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {securityFeatures.map((feature, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-4 md:p-6">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-primary/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {trustBadges.map((badge, index) => (
              <div 
                key={index}
                className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-secondary/50 rounded-full text-xs md:text-sm text-foreground"
              >
                <span className="text-primary">{badge.icon}</span>
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buy Now CTA Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/30">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card border-border overflow-hidden">
            <CardContent className="p-4 sm:p-8 lg:p-12">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <div className="flex-shrink-0">
                  <img 
                    src={paytapTagSticker} 
                    alt="Paytap NFC Sticker" 
                    loading="lazy"
                    className="w-32 sm:w-48 lg:w-56 drop-shadow-xl"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3 md:mb-4">
                    Get Your Paytap NFC Sticker Today
                  </h2>
                  <p className="text-muted-foreground text-sm md:text-base mb-4 md:mb-6">
                    Start making contactless payments across India with the most convenient payment solution.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 justify-center md:justify-start">
                    <div className="flex items-center gap-2">
                      <span className="text-xl md:text-2xl text-muted-foreground line-through">₹999</span>
                      <span className="text-3xl md:text-4xl font-bold text-primary">₹499</span>
                    </div>
                    <Button 
                      onClick={handleBuyNow}
                      className="bg-paytap-light hover:bg-paytap-dark text-white px-6 py-5 md:px-8 md:py-6 text-base md:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                      Buy Now
                      <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                    </Button>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground mt-3 md:mt-4">
                    ✓ Free Shipping • ✓ Easy Activation • ✓ Secure Payments
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default PaytapSticker;
