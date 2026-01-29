import { Helmet } from "react-helmet-async";
import { Shield, CreditCard, Smartphone, Lock, Eye, CheckCircle, ArrowRight, Users, Wallet, BadgeCheck, Heart, Backpack, Baby, Fingerprint, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const KidsPay = () => {
  const features = [
    {
      icon: CreditCard,
      title: "Prepaid card for your child",
      description: "Works like a regular debit card, without linking to a bank account"
    },
    {
      icon: Lock,
      title: "Spend limits & controls",
      description: "Set daily limits, usage controls, and manage top-ups easily"
    },
    {
      icon: Eye,
      title: "Full visibility",
      description: "Track every transaction in real-time from your PayTap app"
    },
    {
      icon: Shield,
      title: "No overspending",
      description: "Prepaid means kids can only spend what's loaded—no surprises"
    }
  ];

  const tagFeatures = [
    "Lightweight contactless tag",
    "No card number printed on the tag",
    "Can be used as a retractable ID-card–style keychain",
    "Easy to carry, hard to misuse",
    "Safe for school, travel, outings, and daily use",
    "Simple tap & pay experience"
  ];

  const cardFeatures = [
    { icon: Wifi, text: "Tap & pay" },
    { icon: Lock, text: "PIN-based transactions" },
    { icon: Smartphone, text: "Online & offline usage" },
    { icon: Shield, text: "All the convenience of a bank card, without the risk" }
  ];

  const whyParentsChoose = [
    "Controlled spending",
    "No bank account exposure",
    "No phone dependency",
    "Safer than cash",
    "Teaches financial discipline early"
  ];

  return (
    <>
      <Helmet>
        <title>Paytap Kids Pay - Safe Prepaid Cards for Children | Paytap</title>
        <meta name="description" content="Paytap Kids Pay offers secure prepaid payment cards and contactless tags for children. Parents stay in control with spending limits and real-time tracking." />
        <link rel="canonical" href="https://paytap.co.in/kids-pay" />
      </Helmet>

      <Navbar />

      <main className="bg-background">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-background to-pink-500/5" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl" />
          
          <div className="relative max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-600 text-sm font-medium mb-8">
              <Baby className="w-4 h-4" />
              Introducing Kids Pay
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
              Paytap Kids Pay
            </h1>
            
            <p className="text-2xl md:text-3xl text-muted-foreground mb-4">
              Controlled spending for children.
            </p>
            <p className="text-xl text-primary font-semibold mb-6">
              Parents stay in charge.
            </p>
            
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-muted text-foreground text-lg font-medium mb-10">
              <Shield className="w-5 h-5 text-primary" />
              Safe. Simple. Cashless — without giving kids a smartphone.
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6 rounded-full">
                Learn More
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* What is Kids Pay */}
        <section className="py-24 px-6 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              What is Paytap Kids Pay?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Paytap Kids Pay allows parents to issue a <span className="text-foreground font-semibold">secure prepaid payment card or contactless tag</span> for children, even as young as <span className="text-primary font-semibold">5 years old</span>. It helps kids learn money handling while parents retain full control over spending.
            </p>
          </div>
        </section>

        {/* Designed for kids, controlled by parents */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Designed for kids.
                <span className="text-primary"> Controlled by parents.</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="relative rounded-3xl p-8 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-border/50 animate-fade-in text-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 mx-auto">
                    <feature.icon className="w-7 h-7 text-amber-600" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contactless Tag Section */}
        <section className="py-24 px-6 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <Wifi className="w-4 h-4" />
                  Perfect for young kids
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Contactless Tag — Safe & Simple
                </h2>
                
                <ul className="space-y-4">
                  {tagFeatures.map((feature, index) => (
                    <li 
                      key={feature} 
                      className="flex items-start gap-3 text-muted-foreground animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="w-64 h-64 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-2xl">
                  <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center">
                    <Wifi className="w-20 h-20 text-primary rotate-45" />
                  </div>
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-foreground text-background rounded-full text-sm font-medium">
                  Tap & Pay
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* No Smartphone Needed */}
        <section className="py-24 px-6 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-8">
              <Smartphone className="w-10 h-10 text-green-600" />
              <div className="absolute w-24 h-1 bg-red-500 rotate-45 rounded-full" />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              No smartphone needed
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              Paytap Kids Pay works independently and does not require a mobile phone, making it ideal for:
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {["School-going children", "Playtime and outdoor activities", "First exposure to digital payments"].map((item, index) => (
                <div
                  key={item}
                  className="px-6 py-3 rounded-full bg-background border border-border/50 text-foreground font-medium animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item}
                </div>
              ))}
            </div>
            
            <p className="text-muted-foreground mt-8 italic">
              If a child understands how to handle cash, they can use Paytap.
            </p>
          </div>
        </section>

        {/* Full Prepaid Card Functionality */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Full prepaid card functionality
              </h2>
              <p className="text-lg text-muted-foreground">
                For older kids who need more payment options
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cardFeatures.map((feature, index) => (
                <div
                  key={feature.text}
                  className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-muted/50 border border-border/50 animate-fade-in text-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <p className="text-foreground font-medium">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Parents Choose */}
        <section className="py-24 px-6 bg-gradient-to-br from-amber-500/10 via-background to-pink-500/10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 text-pink-600 text-sm font-medium mb-8">
              <Heart className="w-4 h-4" />
              Parent's Choice
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-12">
              Why parents choose Paytap Kids Pay
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {whyParentsChoose.map((reason, index) => (
                <div
                  key={reason}
                  className="flex items-center gap-3 p-5 rounded-2xl bg-background border border-border/50 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-foreground font-medium">{reason}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing Section */}
        <section className="py-24 px-6 bg-muted/30">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Users className="w-16 h-16 text-primary mx-auto mb-8" />
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              A smarter way to<br />introduce money
            </h2>
            
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Paytap Kids Pay builds responsible spending habits while giving parents complete visibility and control. Start your child's financial journey the safe way.
            </p>
            
            <Button size="lg" className="text-lg px-10 py-6 rounded-full">
              Get started with Paytap Kids Pay
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>
      </main>

      <FooterSection />
    </>
  );
};

export default KidsPay;
