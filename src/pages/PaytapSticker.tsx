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
  ArrowRight,
  Truck,
  BarChart3,
  Users,
  FileText,
  Headphones,
  Flame,
  Rocket
} from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import paytapTagSticker from "@/assets/paytap-tag-sticker.png";

const PaytapSticker = () => {
  const navigate = useNavigate();
  
  const handleActivate = () => {
    navigate("/checkout?product=sticker");
  };

  const hookLines = [
    "While others track expenses, PayTap operators control them.",
    "Fleet payments are going digital — don't run yours on cash.",
    "The fastest-growing fleets don't use wallets. They use systems."
  ];

  const pricingIncludes = [
    { icon: <Wifi className="w-4 h-4 md:w-5 md:h-5" />, text: "PayTap NFC Tag", value: "₹1,499 Value" },
    { icon: <CreditCard className="w-4 h-4 md:w-5 md:h-5" />, text: "1-Year Business Account", value: "₹3,500 Value" },
    { icon: <BarChart3 className="w-4 h-4 md:w-5 md:h-5" />, text: "Live Expense Dashboard", value: "" },
    { icon: <Car className="w-4 h-4 md:w-5 md:h-5" />, text: "MyFleet AI Controls — Manage Vehicles, Limits & Usage", value: "" },
    { icon: <FileText className="w-4 h-4 md:w-5 md:h-5" />, text: "Business Reports for GST & Accounting", value: "" },
    { icon: <Headphones className="w-4 h-4 md:w-5 md:h-5" />, text: "Priority Business Support", value: "" },
  ];

  const useCases = [
    { icon: <Fuel className="w-6 h-6" />, title: "Fuel Pumps", description: "Controlled fleet fueling" },
    { icon: <Car className="w-6 h-6" />, title: "FASTag Tolls", description: "Automated toll recharges" },
    { icon: <Train className="w-6 h-6" />, title: "Metro Stations", description: "Transit access control" },
    { icon: <ParkingCircle className="w-6 h-6" />, title: "Parking Lots", description: "Managed parking expenses" },
    { icon: <CreditCard className="w-6 h-6" />, title: "RuPay Merchants", description: "8L+ acceptance points" }
  ];

  const activationSteps = [
    { step: "01", title: "Download Paytap App", description: "Available on iOS and Android app stores" },
    { step: "02", title: "Complete Business KYC", description: "Quick verification for fleet operators" },
    { step: "03", title: "Link Your NFC Tags", description: "Deploy tags across your fleet" },
    { step: "04", title: "Set Spending Controls", description: "Configure limits, alerts & permissions" },
    { step: "05", title: "Monitor & Scale", description: "Real-time tracking, GST reports, AI insights" }
  ];

  const securityFeatures = [
    {
      icon: <Lock className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Tag Control",
      description: "Freeze or unfreeze any tag instantly from your dashboard."
    },
    {
      icon: <Shield className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Spending Limits",
      description: "Set daily, weekly, or per-transaction limits for each vehicle."
    },
    {
      icon: <Fingerprint className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Secure NFC",
      description: "Tokenized transactions ensure card data is never exposed."
    },
    {
      icon: <Bell className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Real-time Alerts",
      description: "Instant notifications for every transaction across your fleet."
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
    { icon: <Zap className="w-5 h-5" />, text: "Instant Activation" },
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
                Fleet Payment System
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
                Unlock PayTap for Business — <span className="text-primary">₹499</span>
              </h1>
              <p className="text-xl md:text-2xl text-foreground font-semibold mb-2">
                Fleet Payments. Controls. Intelligence.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground mb-4">
                One platform. Every vehicle.
              </p>
              <p className="text-base md:text-lg text-primary font-medium mb-6 max-w-xl italic">
                "{hookLines[0]}"
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 justify-center lg:justify-start">
                <Button 
                  onClick={handleActivate}
                  className="bg-paytap-light hover:bg-paytap-dark text-white px-6 py-5 md:px-8 md:py-6 text-base md:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  Activate Business Account
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
                  alt="PayTap NFC Tag for Fleet" 
                  loading="lazy"
                  className="relative max-w-[240px] sm:max-w-[320px] lg:max-w-[400px] w-full drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Pricing Card Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-card to-secondary/20 border-primary/20 overflow-hidden shadow-xl">
            <CardContent className="p-6 sm:p-8 lg:p-10">
              {/* FOMO Badges */}
              <div className="flex flex-wrap gap-2 mb-6 justify-center lg:justify-start">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 text-amber-600 rounded-full text-xs sm:text-sm font-semibold border border-amber-500/20">
                  <Flame className="w-3.5 h-3.5" />
                  Platform Access — Limited Offer
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-semibold border border-primary/20">
                  <Rocket className="w-3.5 h-3.5" />
                  Priority Onboarding for First 500 Fleets
                </span>
              </div>

              <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
                {/* Left - Pricing */}
                <div className="text-center lg:text-left">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                    🔓 ₹499 Business Activation
                  </h2>
                  <p className="text-lg sm:text-xl text-primary font-semibold mb-4">
                    ₹4999 Value — Platform Access
                  </p>
                  <Button 
                    onClick={handleActivate}
                    size="lg"
                    className="bg-paytap-light hover:bg-paytap-dark text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                  >
                    Activate Business Account
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <p className="text-sm text-muted-foreground mt-4">
                    No monthly fees • Cancel anytime • Upgrade as you scale
                  </p>
                </div>

                {/* Right - Includes */}
                <div className="space-y-3">
                  {pricingIncludes.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-background/50 rounded-xl border border-border/50">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <span className="text-sm sm:text-base text-foreground">{item.text}</span>
                        {item.value && (
                          <span className="text-xs text-primary ml-2 font-medium">({item.value})</span>
                        )}
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Social Proof Strip */}
      <section className="py-6 md:py-8 px-4 sm:px-6 lg:px-8 bg-primary/5 border-y border-primary/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" />
              <span className="text-sm sm:text-base text-foreground font-medium">
                Powering fleet payments across Bengaluru, Hyderabad & Mumbai
              </span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-border" />
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm sm:text-base text-foreground font-medium">
                Growing network of 100+ active fleet operators
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Where You Can Use It */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
              Where Your Fleet Can Operate
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl md:max-w-2xl mx-auto">
              Enable controlled, cashless payments at thousands of locations
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
              System Activation Process
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl md:max-w-2xl mx-auto">
              Get your fleet payment infrastructure running in minutes
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
              Enterprise-Grade Security
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl md:max-w-2xl mx-auto">
              Built for businesses that need control, not just convenience
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

      {/* Bottom CTA Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/30">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card border-border overflow-hidden">
            <CardContent className="p-4 sm:p-8 lg:p-12">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <div className="flex-shrink-0">
                  <img 
                    src={paytapTagSticker} 
                    alt="PayTap NFC Tag for Fleet" 
                    loading="lazy"
                    className="w-32 sm:w-48 lg:w-56 drop-shadow-xl"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3 md:mb-4">
                    Activate Your Fleet Payment System
                  </h2>
                  <p className="text-muted-foreground text-sm md:text-base mb-4 md:mb-6">
                    Join India's first fleet-first payment network. Control expenses, not just track them.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 justify-center md:justify-start">
                    <div className="flex items-center gap-2">
                      <span className="text-xl md:text-2xl text-muted-foreground line-through">₹4999</span>
                      <span className="text-3xl md:text-4xl font-bold text-primary">₹499</span>
                    </div>
                    <Button 
                      onClick={handleActivate}
                      className="bg-paytap-light hover:bg-paytap-dark text-white px-6 py-5 md:px-8 md:py-6 text-base md:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                      Activate Business Account
                      <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                    </Button>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground mt-3 md:mt-4">
                    No monthly fees • Cancel anytime • Upgrade as you scale
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
