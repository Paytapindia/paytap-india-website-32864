import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Shield, Coins, CreditCard, Smartphone, Lock, Eye, CheckCircle, ArrowRight, Sparkles, Wallet, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const SafeVaults = () => {
  const modules = [
    {
      icon: Coins,
      title: "Gold Vault",
      description: "Save in 24K digital gold with small amounts",
      features: [
        "Buy, sell, or redeem anytime",
        "Gold held with insured and audited partners",
        "Ideal for disciplined savings and inflation protection"
      ],
      gradient: "from-amber-500/20 to-yellow-500/20",
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-600"
    },
    {
      icon: Wallet,
      title: "Prepaid Safe Account",
      description: "Prepaid account for online purchases",
      features: [
        "Primary bank card details are never shared",
        "Set spending limits, freeze or unfreeze instantly",
        "Works even without a traditional bank account"
      ],
      gradient: "from-primary/20 to-accent/20",
      iconBg: "bg-primary/10",
      iconColor: "text-primary"
    },
    {
      icon: CreditCard,
      title: "Virtual & Limited-Use Cards",
      description: "Virtual cards for e-commerce and subscriptions",
      features: [
        "One-time or limited-limit usage",
        "Auto-disable after use",
        "Perfect for trials and unknown merchants"
      ],
      gradient: "from-accent/20 to-primary/20",
      iconBg: "bg-accent/10",
      iconColor: "text-accent"
    }
  ];

  const benefits = [
    { icon: Shield, text: "Protects primary bank cards from online fraud" },
    { icon: Coins, text: "Enables disciplined gold savings" },
    { icon: Smartphone, text: "Safer online shopping & subscriptions" },
    { icon: Lock, text: "Full control over prepaid spending" },
    { icon: Sparkles, text: "Designed for modern digital payments" }
  ];

  const steps = [
    { number: "01", title: "Add money to PayTap", description: "Fund your PayTap wallet securely" },
    { number: "02", title: "Store funds in SafeVaults", description: "Move money to your secure vault" },
    { number: "03", title: "Save in gold or load prepaid", description: "Choose how to protect your funds" },
    { number: "04", title: "Spend safely online", description: "Transact without exposing your bank card" }
  ];

  const trustBadges = [
    "RBI-compliant prepaid infrastructure",
    "NPCI / RuPay network powered",
    "PCI-DSS compliant",
    "256-bit encryption",
    "Regulated partners for gold custody"
  ];

  return (
    <>
      <Helmet>
        <title>PayTap SafeVaults - Save Smart, Spend Safe | Secure Digital Savings</title>
        <meta name="description" content="PayTap SafeVaults lets you save in gold and spend securely online using prepaid accounts—without exposing your primary bank card details." />
      </Helmet>

      <Navbar />

      <main className="bg-background">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          
          <div className="relative max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Shield className="w-4 h-4" />
              Introducing SafeVaults
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
              Save Smart.<br />
              <span className="text-primary">Spend Safe.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              PayTap SafeVaults lets you save in gold and spend securely online using prepaid accounts—without exposing your primary bank card details.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6 rounded-full">
                Get Started with SafeVaults
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full">
                Learn How It Works
              </Button>
            </div>
          </div>
        </section>

        {/* What is SafeVaults */}
        <section className="py-24 px-6 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              What is PayTap SafeVaults?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              PayTap SafeVaults is a secure savings and payments layer inside PayTap that helps users protect money, grow value, and transact safely online. It acts as a <span className="text-foreground font-semibold">safety vault between your bank account and the internet</span>.
            </p>
          </div>
        </section>

        {/* SafeVaults Modules */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                SafeVaults Modules
              </h2>
              <p className="text-lg text-muted-foreground">
                Three powerful ways to protect and grow your money
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {modules.map((module, index) => (
                <div
                  key={module.title}
                  className={`relative rounded-3xl p-8 bg-gradient-to-br ${module.gradient} border border-border/50 animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-14 h-14 rounded-2xl ${module.iconBg} flex items-center justify-center mb-6`}>
                    <module.icon className={`w-7 h-7 ${module.iconColor}`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {module.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {module.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {module.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Users Love SafeVaults */}
        <section className="py-24 px-6 bg-muted/30">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Why Users Love SafeVaults
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.text}
                  className="flex items-start gap-4 p-6 rounded-2xl bg-background border border-border/50 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-foreground font-medium">{benefit.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground">
                Four simple steps to secure your finances
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="text-center animate-fade-in relative"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                  )}
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 relative">
                    <span className="text-2xl font-bold text-primary">{step.number}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust & Compliance */}
        <section className="py-24 px-6 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 text-sm font-medium mb-8">
              <BadgeCheck className="w-4 h-4" />
              Trust & Compliance
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
              Built on Trusted Infrastructure
            </h2>

            <div className="flex flex-wrap justify-center gap-4">
              {trustBadges.map((badge, index) => (
                <div
                  key={badge}
                  className="px-6 py-3 rounded-full bg-background border border-border/50 text-sm font-medium text-muted-foreground animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="py-24 px-6 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Shield className="w-16 h-16 text-primary mx-auto mb-8" />
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Your money deserves<br />better protection.
            </h2>
            
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Join thousands of users who trust SafeVaults to keep their finances secure.
            </p>
            
            <Button size="lg" className="text-lg px-10 py-6 rounded-full">
              Activate PayTap SafeVaults
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>
      </main>

      <FooterSection />
    </>
  );
};

export default SafeVaults;
