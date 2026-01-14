import { Shield, Lock, CreditCard, WifiOff, BarChart3, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductCarousel from "@/components/ProductCarousel";

const TrustSection = () => {
  return (
    <section id="trust" className="pt-12 md:pt-16 pb-24 md:pb-32 px-6 md:px-12 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-foreground mb-3 sm:mb-4 tracking-tight">
            Shop Paytap Products
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            Choose the perfect payment solution for your needs.
          </p>
        </div>

        {/* Product Carousel */}
        <div className="mb-16 sm:mb-24">
          <ProductCarousel />
        </div>

        {/* Features Section */}
        <div>
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-foreground mb-3 sm:mb-4 tracking-tight">
              Designed for Businesses Beyond Traditional Banking
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              Secure, compliant, and built for scale.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: WifiOff, title: "Offline-First Architecture", desc: "Tap and pay instantly, even offline. Works without mobile data." },
              { icon: CreditCard, title: "8L+ Acceptance Points", desc: "Use it at fuel pumps, tolls, metros, parking & more across India." },
              { icon: Shield, title: "Enterprise-Grade Security", desc: "RBI-Compliant • NPCI-Enabled • RuPay Network Powered • PCI-DSS Secured • VAPT Audited" },
              { icon: BarChart3, title: "Real-Time Visibility", desc: "Load, spend, and manage everything from one dashboard." },
              { icon: Users, title: "Individuals to Enterprise", desc: "One solution for personal vehicles, families, and logistics teams." },
              { icon: Lock, title: "Zero Bank Exposure", desc: "Tokenized wallet keeps your banking info private and secure." },
            ].map((feature, index) => (
              <Card key={index} className="bg-paytap-dark border-paytap-dark/80 hover:border-paytap-light/30 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg font-medium text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-sm leading-relaxed">{feature.desc}</p>
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
