import { Helmet } from "react-helmet-async";
import { ArrowLeft, Building2, Zap, Shield, Target, MapPin, Coffee, Eye, Layers, Wifi, Briefcase, Wallet, Smartphone, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Paytap - Reimagining Financial Infrastructure for India</title>
        <meta name="description" content="Paytap is a fintech infrastructure company building payment control and management systems for vehicle-led and enterprise ecosystems across India." />
        <link rel="canonical" href="https://paytap.co.in/about" />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Building2 className="h-6 w-6 text-[#f6245b]" />
              <h1 className="text-xl font-bold text-gray-900">About Paytap</h1>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Reimagining Financial Infrastructure for India's Mobility and Enterprise Economy
            </h2>
            <p className="text-xl mb-8 max-w-4xl mx-auto opacity-90">
              Paytap is a fintech infrastructure company building payment control and management systems for vehicle-led and enterprise ecosystems across India. We provide a unified platform for secure online and offline transactions, enabling prepaid instruments (PPI), contactless NFC payments, and real-time settlement across fuel networks, toll systems, parking operators, transit platforms, and commercial fleets.
            </p>
            <p className="text-lg max-w-3xl mx-auto opacity-80">
              Our platform is designed to give individuals and businesses greater visibility, governance, and confidence over every transaction — transforming everyday payments into structured, compliant, and manageable financial workflows.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Why We Exist Section */}
          <section className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why We Exist</h3>
            <div className="bg-white rounded-lg shadow-sm p-8">
              <p className="text-lg text-gray-700 mb-6">
                India has built some of the world's most powerful digital payment rails — from real-time payments to open financial infrastructure. Access has scaled. But for high-frequency, mobility-led, and operational environments, financial control, transparency, and experience remain fragmented.
              </p>
              <p className="text-lg text-gray-700">
                Paytap exists to bridge this gap by providing a financial layer that works reliably in both connected and low-connectivity environments. Our infrastructure enables payments without complex app flows, PIN dependencies, or manual reconciliation — allowing organizations and individuals to move money with clarity, speed, and operational confidence.
              </p>
            </div>
          </section>

          {/* What We Power */}
          <section className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">What We Power</h3>
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <p className="text-lg text-gray-700 mb-6">
                While Paytap is designed around vehicle and mobility use cases, our platform is built as a versatile payment and transaction management layer for both consumer and enterprise environments.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <Zap className="h-8 w-8 text-[#f6245b] mb-2" />
                    <CardTitle className="text-lg">Mobility & Transport</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Fuel stations</li>
                      <li>• Toll systems (FASTag-linked)</li>
                      <li>• Metro & transit networks (NCMC compatible)</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <MapPin className="h-8 w-8 text-[#f6245b] mb-2" />
                    <CardTitle className="text-lg">Parking & Urban Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Parking operators</li>
                      <li>• Service centers</li>
                      <li>• Public utility access points</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Coffee className="h-8 w-8 text-[#f6245b] mb-2" />
                    <CardTitle className="text-lg">Retail & Merchant Networks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Cafés & restaurants</li>
                      <li>• Retail stores</li>
                      <li>• All RuPay-enabled acceptance points</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-[#021a42]/5 rounded-lg p-6 text-center">
                <p className="text-lg font-semibold text-[#021a42]">
                  With access to over 8 lakh+ RuPay POS terminals across India, Paytap is designed to operate at national scale — across both everyday consumer touchpoints and enterprise-managed networks.
                </p>
              </div>
            </div>
          </section>

          {/* Our Platform - NEW SECTION */}
          <section className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Platform</h3>
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Paytap combines payment acceptance with financial management and governance capabilities:
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <Wallet className="h-8 w-8 text-[#f6245b] mb-2" />
                  <CardTitle>Prepaid & PPI Infrastructure</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    RBI-compliant prepaid instruments for controlled spend and regulated payment flows.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Smartphone className="h-8 w-8 text-[#f6245b] mb-2" />
                  <CardTitle>Contactless NFC Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    App-free, tap-and-pay access for fast, reliable transactions across physical environments.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Eye className="h-8 w-8 text-[#f6245b] mb-2" />
                  <CardTitle>Transaction Visibility & Controls</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Real-time monitoring, spend governance, and operational oversight for businesses and fleet operators.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <TrendingUp className="h-8 w-8 text-[#f6245b] mb-2" />
                  <CardTitle>Embedded Financial Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    <span className="text-[#f6245b] font-medium">(In Development)</span> Vehicle-centric credit enablement, insurance integrations, and transaction intelligence designed to support operational finance and risk-managed growth.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Our Story */}
          <section className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Story</h3>
            <div className="bg-white rounded-lg shadow-sm p-8">
              <p className="text-lg text-gray-700 mb-6">
                PayTap is India's fintech infrastructure layer for mobility, fleets, and business payments — giving you real-time control, visibility, and automation over how money flows across vehicles, teams, and daily operations.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Paytap is a product of DriveTap Innovation India Pvt. Ltd., co-branded with RBI-authorized PPI partners.
              </p>
              <p className="text-lg text-gray-700">
                The company is built by technologists and fintech operators with over a decade of experience in digital payments, mobility systems, and enterprise infrastructure — spanning prepaid platforms, logistics automation, and transaction technology.
              </p>
            </div>
          </section>

          {/* What Makes Paytap Different */}
          <section className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Makes Paytap Different</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 text-[#f6245b] mb-2" />
                  <CardTitle>RBI-Compliant Infrastructure</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Built in partnership with RBI-authorized PPI partners, ensuring regulated, secure, and auditable financial operations.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Briefcase className="h-8 w-8 text-[#f6245b] mb-2" />
                  <CardTitle>Enterprise-Ready & Scalable</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Designed for high-volume, distributed environments — from fuel networks and transit systems to enterprise fleets and merchant ecosystems.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Layers className="h-8 w-8 text-[#f6245b] mb-2" />
                  <CardTitle>Unified Payment & Control Layer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Combines acceptance, visibility, and governance into a single platform — not just a payment tool.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Wifi className="h-8 w-8 text-[#f6245b] mb-2" />
                  <CardTitle>Works Online & Offline</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Built for real-world conditions where connectivity and operational simplicity matter as much as speed.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Our Vision */}
          <section className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Vision</h3>
            <div className="bg-[#021a42]/5 rounded-lg p-8 text-center">
              <p className="text-xl text-gray-800 font-medium">
                To build India's trusted financial backbone for mobility and enterprise ecosystems — transforming payments into systems of control, transparency, and operational intelligence for businesses and individuals alike.
              </p>
            </div>
          </section>

          {/* Company Information */}
          <section className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Company Information</h3>
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Legal Information</h4>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Legal Name:</strong> DriveTap Innovation India Pvt. Ltd.</p>
                    <p><strong>Trade Name:</strong> Paytap</p>
                    <p><strong>GSTIN:</strong> 29AALCD4626M1Z3</p>
                    <p><strong>PPI Partner:</strong> RBI-Authorized PPI Partners</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Registered Office</h4>
                  <div className="text-gray-700">
                    <p>Level 14 & 15, Concorde Towers</p>
                    <p>1 Vittal Mallya Road, UB City</p>
                    <p>Bengaluru – 560001</p>
                    <p>Karnataka, India</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="text-center">
            <div className="bg-[#021a42]/5 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Build on Paytap?</h3>
              <p className="text-gray-700 mb-6">
                Join businesses and operators across India who are adopting Paytap as their payment and transaction management layer for mobility, utility, and enterprise ecosystems.
              </p>
              <Link to="/">
                <Button size="lg" className="bg-[#f6245b] hover:bg-[#d91e4f]">
                  Get Started with Paytap
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
