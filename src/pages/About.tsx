import { Helmet } from "react-helmet-async";
import { ArrowLeft, Building2, Fuel, ParkingCircle, Store, ShieldCheck, Network, WifiOff } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Paytap - Architecting India's Utility & Mobility Infrastructure</title>
        <meta name="description" content="Paytap is engineering the foundational infrastructure for India's high-frequency mobility and utility sectors. Secure, offline-capable NFC payments for fuel, tolls, metro, and more." />
        <link rel="canonical" href="https://paytap.co.in/about" />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Building2 className="h-6 w-6 text-[#f6245b]" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">About Paytap</h1>
                <p className="text-sm text-gray-600">Architecting India's Utility & Mobility Infrastructure</p>
              </div>
            </div>
            <Link to="/">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Homepage</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#021a42] to-[#031d47] text-white py-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Architecting India's Unified Utility & Mobility Infrastructure
            </h2>
            <p className="text-xl md:text-2xl font-medium mb-8 text-[#f6245b]">
              The Frictionless Layer for the Offline Economy
            </p>
            <p className="text-lg mb-6 max-w-4xl mx-auto opacity-90">
              Paytap is engineering the foundational infrastructure for India's high-frequency mobility and utility sectors. While the current landscape remains fragmented by app-heavy dependencies, we have deployed a lean, NFC-native technology stack that integrates directly into the daily life-cycle of the Indian consumer.
            </p>
            <p className="text-lg max-w-3xl mx-auto opacity-80">
              By capturing the Point of Interaction (POI), Paytap is building a scalable ecosystem that provides users with sovereign financial control while offering merchants high-integrity, instantaneous settlement rails.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Strategic Problem-Solution Section */}
          <section className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Strategic Problem-Solution: Solving the Last-Inch Gap</h3>
            <div className="bg-white rounded-lg shadow-sm p-8">
              <p className="text-lg text-gray-700 mb-6">
                Despite the surge in digital payments, "high-velocity" environments—fuel stations, transit hubs, and parking assets—suffer from chronic friction. Traditional digital payments are hindered by network latency, app dependencies, and multi-step authentication (PINs/OTPs).
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Paytap eliminates the dependency layer. Our infrastructure enables secure, offline-capable transactions that function independently of mobile networks or app interfaces.
              </p>
              <div className="bg-[#021a42]/5 rounded-lg p-6 text-center">
                <p className="text-xl font-semibold text-[#021a42] italic">
                  "We aren't just facilitating a payment; we are optimizing the speed of commerce."
                </p>
              </div>
            </div>
          </section>

          {/* The Ecosystem Section */}
          <section className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">The Ecosystem: Multi-Vertical Interoperability</h3>
            <p className="text-lg text-gray-600 text-center mb-8 max-w-3xl mx-auto">
              Paytap is designed for universal utility, serving as a single-node interface across India's most critical mobility networks:
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <Fuel className="h-8 w-8 text-[#f6245b] mb-2" />
                  <CardTitle className="text-lg">Energy & Transit</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Direct integration with Petroleum outlets, FASTag-linked tolling, and NCMC-compatible Metro transit systems.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <ParkingCircle className="h-8 w-8 text-[#f6245b] mb-2" />
                  <CardTitle className="text-lg">Urban Infrastructure</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Automated parking facilities, service centers, and public utility nodes across urban centers.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Store className="h-8 w-8 text-[#f6245b] mb-2" />
                  <CardTitle className="text-lg">Mass-Market Retail</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Seamless operability at 800,000+ RuPay POS terminals, ensuring immediate nationwide scale from Day 1.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Institutional Foundations Section */}
          <section className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Institutional Foundations & Compliance</h3>
            <div className="bg-white rounded-lg shadow-sm p-8">
              <p className="text-lg text-gray-700 mb-6">
                Paytap is a flagship infrastructure product of <strong>DriveTap Innovation India Pvt. Ltd.</strong>, engineered in strategic partnership with <strong>Transcorp International Ltd.</strong> (an RBI-authorized PPI issuer).
              </p>
              <p className="text-lg text-gray-700">
                Our leadership team consists of veteran technologists and fintech architects with over a decade of experience building Tier-1 digital infrastructure, ranging from national-scale prepaid wallets to automated logistics and mobility-tech ecosystems.
              </p>
            </div>
          </section>

          {/* The Competitive Moat Section */}
          <section className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">The Competitive Moat: What Sets Us Apart</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <ShieldCheck className="h-8 w-8 text-[#f6245b] mb-2" />
                  <CardTitle>Regulatory Resilience</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Built on a fully RBI-compliant framework in partnership with Transcorp, ensuring top-tier security and institutional trust.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Network className="h-8 w-8 text-[#f6245b] mb-2" />
                  <CardTitle>Network Agnostic Infrastructure</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Works across the entire RuPay and NCMC network, providing a "Zero-Friction" experience without requiring hardware overhauls for merchants.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <WifiOff className="h-8 w-8 text-[#f6245b] mb-2" />
                  <CardTitle>Edge-Payment Capability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our NFC stack removes the "Connectivity Tax"—enabling transactions in low-network zones where traditional apps fail.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* The Vision Section */}
          <section className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">The Vision</h3>
            <div className="bg-[#021a42]/5 rounded-lg p-8 text-center">
              <p className="text-xl text-gray-800 font-medium">
                To become the definitive Transaction Layer for India's utility economy, empowering millions of users and businesses to transact with invisible, secure, and intermediary-free technology.
              </p>
            </div>
          </section>

          {/* Corporate Identity Section */}
          <section className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Corporate Identity</h3>
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Legal Entity</h4>
                  <p className="text-gray-700">DriveTap Innovation India Pvt. Ltd.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">PPI Partner</h4>
                  <p className="text-gray-700">Transcorp International Ltd. (RBI Approved)</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">HQ</h4>
                  <p className="text-gray-700">Level 14 & 15, Concorde Towers, UB City, Bengaluru – 560001</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="text-center">
            <div className="bg-[#021a42]/5 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Experience Paytap?</h3>
              <p className="text-gray-700 mb-6">
                Join thousands of users who have already made the switch to frictionless utility payments.
              </p>
              <Link to="/">
                <Button size="lg" className="bg-[#f6245b] hover:bg-[#d91e4f]">
                  Get Your Paytap Today
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
