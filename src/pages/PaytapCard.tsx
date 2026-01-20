import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Shield, 
  Smartphone, 
  CheckCircle, 
  CreditCard, 
  Users,
  Gift,
  Wallet,
  Briefcase,
  Plane,
  Lock,
  Bell,
  Eye,
  BarChart3,
  BadgeCheck,
  Zap,
  ArrowRight,
  Building2,
  Package
} from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import paytapCard from "@/assets/paytap-card-product.png";

const PaytapCard = () => {
  const navigate = useNavigate();
  
  const handleBuyNow = () => {
    navigate("/checkout?product=card");
  };

  const howItWorksSteps = [
    {
      icon: <Package className="w-8 h-8" />,
      title: "Receive Your Card",
      description: "Get your Paytap prepaid card delivered in 3-5 days."
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Activate via App",
      description: "Download Paytap app and complete quick KYC verification."
    },
    {
      icon: <Wallet className="w-8 h-8" />,
      title: "Load Funds",
      description: "Add money via UPI, bank transfer, or linked account."
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Start Paying",
      description: "Tap to pay at 8L+ RuPay merchants across India."
    }
  ];

  const useCases = [
    { icon: <Users className="w-6 h-6" />, title: "Team Expenses", description: "Manage spending for your team" },
    { icon: <Gift className="w-6 h-6" />, title: "Gifting", description: "Reward anyone, anytime" },
    { icon: <Building2 className="w-6 h-6" />, title: "Vendor Payments", description: "Pay suppliers seamlessly" },
    { icon: <Wallet className="w-6 h-6" />, title: "Everyday Spending", description: "Control daily expenses" },
    { icon: <Plane className="w-6 h-6" />, title: "Travel", description: "Manage travel expenses easily" }
  ];

  const activationSteps = [
    { step: "01", title: "Order Your Card", description: "Place order online with your details" },
    { step: "02", title: "Receive via Courier", description: "Card delivered in 3-5 days" },
    { step: "03", title: "Download Paytap App", description: "Available on iOS and Android app stores" },
    { step: "04", title: "Complete KYC", description: "Quick verification with ID documents" },
    { step: "05", title: "Link Card & Load Funds", description: "Ready to pay at 8L+ acceptance points" }
  ];

  const securityFeatures = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Dashboard",
      description: "Manage cards, view transactions, and generate reports from one place."
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Spending Controls",
      description: "Set daily, weekly, or monthly limits for each card."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Real-time Reporting",
      description: "Track all expenses in real-time with detailed transaction analytics."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Instant Card Lock",
      description: "Freeze or unfreeze any card instantly from the app."
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Zero Liability",
      description: "Complete protection against unauthorized transactions."
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Real-time Alerts",
      description: "Instant notifications for every transaction across all cards."
    }
  ];

  const trustBadges = [
    { icon: <Shield className="w-5 h-5" />, text: "Secure Payments" },
    { icon: <BadgeCheck className="w-5 h-5" />, text: "RBI-Compliant" },
    { icon: <Zap className="w-5 h-5" />, text: "RuPay Network" },
    { icon: <CheckCircle className="w-5 h-5" />, text: "NPCI-Enabled" },
    { icon: <Lock className="w-5 h-5" />, text: "PCI-DSS Secured" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/30 to-background">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                Paytap Prepaid Card
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Paytap Prepaid Card
              </h1>
              <p className="text-xl text-muted-foreground mb-4 max-w-xl">
                Track spending, set limits, and stay in control — all from one app.
              </p>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                RuPay-powered prepaid card accepted at 8L+ merchants across India.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <span className="text-xl text-muted-foreground line-through">₹4999</span>
                  <span className="text-3xl font-bold text-primary">₹499</span>
                </div>
                <Button 
                  onClick={handleBuyNow}
                  className="bg-paytap-light hover:bg-paytap-dark text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  Activate Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="flex-1 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-paytap-light/20 rounded-3xl blur-3xl" />
                <img 
                  src={paytapCard} 
                  alt="Paytap Prepaid Physical Card" 
                  className="relative max-w-[320px] sm:max-w-[400px] w-full drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              How Paytap Card Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started in just a few steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <Card key={index} className="bg-primary border-primary/20 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-white/70 text-sm">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases for Business */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Use It Your Way
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A prepaid card that adapts to how you manage money
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-paytap-light/10 rounded-xl flex items-center justify-center mx-auto mb-3 text-paytap-light">
                    {useCase.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{useCase.title}</h3>
                  <p className="text-muted-foreground text-xs">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Activation Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Getting Started
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Order, receive, and activate in simple steps
            </p>
          </div>
          
          <div className="space-y-6">
            {activationSteps.map((step, index) => (
              <div 
                key={index} 
                className="flex items-start gap-6 p-6 bg-card border border-border rounded-2xl hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-lg shrink-0">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Control */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Security & Control
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete visibility and control over every transaction
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {trustBadges.map((badge, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full text-sm text-foreground"
              >
                <span className="text-primary">{badge.icon}</span>
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buy Now CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/30">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card border-border overflow-hidden">
            <CardContent className="p-8 sm:p-12">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                <img 
                    src={paytapCard} 
                    alt="Paytap Prepaid Physical Card" 
                    className="w-48 sm:w-56 drop-shadow-xl"
                  />
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                    Get Your Paytap Card Today
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Take control of your spending with India's trusted prepaid solution.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl text-muted-foreground line-through">₹4999</span>
                      <span className="text-4xl font-bold text-primary">₹499</span>
                    </div>
                    <Button 
                      onClick={handleBuyNow}
                      className="bg-paytap-light hover:bg-paytap-dark text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                      Activate Now
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
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

export default PaytapCard;