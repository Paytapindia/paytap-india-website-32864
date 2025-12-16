
import { Shield, Lock, CreditCard, CheckCircle, Car, Train, IndianRupee, Nfc, WifiOff, BarChart3, Wifi, Users, Building2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TrustSection = () => {
  const handleRedirect = () => {
    window.open('https://u.payu.in/PAYUMN/KIQlHVfA6z3b', '_blank');
  };

  return (
    <section id="trust" className="py-24 md:py-32 px-6 md:px-12 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Product Image */}
        <div className="flex justify-center mb-20">
          <img 
            src="/lovable-uploads/fe142899-4158-4cd8-a890-1336deb7c4b4.png" 
            alt="PayTap Payment Sticker" 
            className="w-full max-w-sm h-auto object-contain"
          />
        </div>

        {/* Features Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-semibold text-foreground mb-4 tracking-tight">
              Tap Smarter. Pay Safer.
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Discover how PayTap makes daily payments faster, safer, and simpler.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: WifiOff, title: "No App or Internet Required", desc: "Tap and pay instantly, even offline. Works without mobile data." },
              { icon: CreditCard, title: "Works at 8L+ Terminals", desc: "Use it at fuel pumps, tolls, metros, parking & more across India." },
              { icon: Shield, title: "Secure & RBI-Compliant", desc: "PCI-DSS, 256-bit encryption, and full RBI + NPCI approval." },
              { icon: BarChart3, title: "Real-Time Tracking", desc: "Load, spend, and manage everything from one dashboard." },
              { icon: Users, title: "For Individuals & Fleets", desc: "One solution for personal vehicles, families, and logistics teams." },
              { icon: Lock, title: "No Bank Exposure", desc: "Tokenized wallet keeps your banking info private and secure." },
            ].map((feature, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary/20 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-medium">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* User Segments */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-semibold text-foreground mb-4 tracking-tight">
              Smarter Payments for Everyone
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl">
              From daily drivers to fleet managers — PayTap makes every tap count.
            </p>
          </div>

          <Tabs defaultValue="individuals" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12 bg-secondary h-auto p-1 rounded-xl">
              <TabsTrigger 
                value="individuals" 
                className="flex items-center gap-2 py-3 rounded-lg data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Individuals</span>
              </TabsTrigger>
              <TabsTrigger 
                value="fleet" 
                className="flex items-center gap-2 py-3 rounded-lg data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                <Building2 className="h-4 w-4" />
                <span className="hidden sm:inline">Fleet Operators</span>
              </TabsTrigger>
              <TabsTrigger 
                value="economy" 
                className="flex items-center gap-2 py-3 rounded-lg data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">India's Economy</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="individuals" className="space-y-8">
              <div className="text-center mb-10">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Car className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">Perfect for Daily Drivers</h3>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Simplify your daily payments with contactless convenience.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Nfc, title: "Tap & Pay Instantly", desc: "No smartphone required — just tap your tag." },
                  { icon: IndianRupee, title: "Control Your Spending", desc: "Load prepaid wallet to control expenses." },
                  { icon: Users, title: "User-Friendly for All Ages", desc: "Ideal for elderly parents, teenagers, or anyone." },
                ].map((item, i) => (
                  <Card key={i} className="text-center bg-card border-border">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg font-medium">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="fleet" className="space-y-8">
              <div className="text-center mb-10">
                <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-6">
                  <Building2 className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">Streamlined Fleet Management</h3>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Eliminate cash handling and gain complete visibility.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Car, title: "Assign & Manage Tags", desc: "Map one tag per vehicle. Track expenses in real-time." },
                  { icon: CheckCircle, title: "No Driver Dependency", desc: "No more handing cash or cards to drivers." },
                  { icon: BarChart3, title: "Centralized Dashboard", desc: "Track vehicle-wise spending from one dashboard." },
                ].map((item, i) => (
                  <Card key={i} className="text-center bg-card border-border">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
                        <item.icon className="h-6 w-6 text-accent" />
                      </div>
                      <CardTitle className="text-lg font-medium">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="economy" className="space-y-8">
              <div className="text-center mb-10">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">Powering India's Digital Economy</h3>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  PayTap works everywhere RuPay is accepted.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: CreditCard, title: "8L+ RuPay Terminals", desc: "Use PayTap at petrol pumps, parking, restaurants, and more." },
                  { icon: Train, title: "Metro, Tolls & Transit", desc: "Supports metros, highway tolls, and service centers." },
                  { icon: Wifi, title: "India-Wide Coverage", desc: "Accepted across all major metros and highways." },
                ].map((item, i) => (
                  <Card key={i} className="text-center bg-card border-border">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg font-medium">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
