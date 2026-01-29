import { Helmet } from "react-helmet-async";
import { ArrowLeft, Building2, CreditCard, Zap, Shield, Target, MapPin, Coffee } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About PayTap - Reimagining Contactless Payments for India</title>
        <meta name="description" content="PayTap is building the future of utility payments. Fast, secure, and app-free contactless payments through NFC-powered tags for fuel, tolls, metro, and more." />
        <link rel="canonical" href="https://paytap.co.in/about" />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Building2 className="h-6 w-6 text-[#f6245b]" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">About PayTap</h1>
              <p className="text-sm text-gray-600">Reimagining Contactless Payments for India</p>
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Reimagining Contactless Payments for India
          </h2>
          <p className="text-xl mb-8 max-w-4xl mx-auto opacity-90">
            PayTap is building the future of utility payments — one tap at a time. Whether you're fueling your car, 
            paying tolls, parking, commuting by metro, or transacting at any everyday service point, PayTap gives you 
            a fast, secure, and app-free experience through a simple NFC-powered tag.
          </p>
          <p className="text-lg max-w-3xl mx-auto opacity-80">
            Our mission is to make contactless payments accessible across India's most frequently used services — 
            removing friction, eliminating intermediaries, and giving people direct control over their money.
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
              Digital payments in India have surged, but not every experience is seamless — especially in high-volume, 
              low-tech environments like fuel stations, parking lots, or public transport terminals. PayTap solves this 
              by enabling payments without apps, PINs, OTPs, or network dependence. Just tap your tag and go.
            </p>
            <p className="text-lg text-gray-700">
              From individuals to businesses, PayTap is for anyone who values time, security, and simplicity.
            </p>
          </div>
        </section>

        {/* More Than Just Fuel & Fleets */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">More Than Just Fuel & Fleets</h3>
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <p className="text-lg text-gray-700 mb-6">
              While PayTap is built with vehicle owners in mind, its true power lies in its versatility. You can use PayTap at:
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <Zap className="h-8 w-8 text-[#f6245b] mb-2" />
                  <CardTitle className="text-lg">Fuel & Transport</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Petrol stations</li>
                    <li>• Toll booths (FASTag-linked)</li>
                    <li>• Metro gates (NCMC compatible)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <MapPin className="h-8 w-8 text-[#f6245b] mb-2" />
                  <CardTitle className="text-lg">Parking & Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Parking facilities</li>
                    <li>• Service centers</li>
                    <li>• Public utilities</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Coffee className="h-8 w-8 text-[#f6245b] mb-2" />
                  <CardTitle className="text-lg">Retail & More</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Cafés & restaurants</li>
                    <li>• Retail stores</li>
                    <li>• Wherever RuPay is accepted</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="bg-[#021a42]/5 rounded-lg p-6 text-center">
              <p className="text-lg font-semibold text-[#021a42]">
                With over 8 lakh+ RuPay POS terminals across India, PayTap is ready wherever you go.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Story</h3>
          <div className="bg-white rounded-lg shadow-sm p-8">
            <p className="text-lg text-gray-700 mb-6">
              PayTap is a product of DriveTap Innovation India Pvt. Ltd., co-branded with Transcorp International Ltd., 
              an RBI-approved PPI issuer.
            </p>
            <p className="text-lg text-gray-700">
              The company is founded by technologists and fintech entrepreneurs with over a decade of experience in 
              building scalable digital infrastructure — from prepaid wallets to logistics automation and mobility tech.
            </p>
          </div>
        </section>

        {/* Key Features Grid */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Makes PayTap Special</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-[#f6245b] mb-2" />
                <CardTitle>RBI Compliant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Built in partnership with Transcorp International Ltd., an RBI-authorized PPI issuer, 
                  ensuring full regulatory compliance and security.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Target className="h-8 w-8 text-[#f6245b] mb-2" />
                <CardTitle>Universal Acceptance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Works across India at fuel stations, toll booths, metro stations, parking facilities, 
                  and thousands of other RuPay-enabled merchants.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CreditCard className="h-8 w-8 text-[#f6245b] mb-2" />
                <CardTitle>App-Free Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  No apps, PINs, OTPs, or network dependence required. Simple tap-and-pay technology 
                  that works for everyone.
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
              To enable universal tap-and-pay utility experiences across India, empowering individuals and 
              businesses to transact confidently — anytime, anywhere, without intermediaries.
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
                  <p><strong>Company Name:</strong> DriveTap Innovation India Pvt. Ltd.</p>
                  <p><strong>Trade Name:</strong> PayTap</p>
                  <p><strong>GSTIN:</strong> 29AALCD4626M1Z3</p>
                  <p><strong>PPI Partner:</strong> Transcorp International Ltd.</p>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Office Address</h4>
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
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Experience PayTap?</h3>
            <p className="text-gray-700 mb-6">
              Join thousands of satisfied customers who have already made the switch to contactless utility payments.
            </p>
            <Link to="/">
              <Button size="lg" className="bg-[#f6245b] hover:bg-[#d91e4f]">
                Get Your PayTap Today
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
