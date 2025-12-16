
import { Shield, Lock, CreditCard, WifiOff, BarChart3, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TrustSection = () => {
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
        <div>
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
      </div>
    </section>
  );
};

export default TrustSection;
