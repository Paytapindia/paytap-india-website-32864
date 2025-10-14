
import { Shield, Lock, CreditCard, CheckCircle, Car, Train, IndianRupee, Nfc, ParkingCircle, BarChart3, Wifi, WifiOff, Clock, Users, Building2, MapPin } from "lucide-react";
import { RBIIcon } from "@/components/icons/RBIIcon";
import { NPCIIcon } from "@/components/icons/NPCIIcon";
import { M2PIcon } from "@/components/icons/M2PIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const TrustSection = () => {
  const navigate = useNavigate();
  
  const handleRedirect = () => {
    navigate('/checkout');
  };

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="trust" className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* 3D Product Image */}
        <div className="flex justify-center mb-16">
          <div className="relative">
            <img 
              src="/lovable-uploads/fe142899-4158-4cd8-a890-1336deb7c4b4.png" 
              alt="PayTap Payment Sticker" 
              className="w-full max-w-md h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-lg"></div>
          </div>
        </div>


        {/* New Tap Smarter Section */}
        <div className="mb-20 bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-8 rounded-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Tap Smarter. Pay Safer. Live Better.
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              Discover how PayTap makes daily payments faster, safer, and simpler — across India.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <WifiOff className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <CardTitle className="text-lg">No App or Internet Required</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Tap and pay instantly, even offline. Works without mobile data or app login.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CreditCard className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <CardTitle className="text-lg">Works at 8L+ RuPay Terminals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Use it at fuel pumps, tolls, metros, parking & more across India's payment network.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <Shield className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <CardTitle className="text-lg">Secure & RBI-Compliant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  PCI-DSS, 256-bit encryption, and full RBI + NPCI approval for maximum security.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
                <CardTitle className="text-lg">Prepaid Control, Real-Time Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Load, spend, and manage everything from one dashboard with complete visibility.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-teal-600" />
                  </div>
                </div>
                <CardTitle className="text-lg">For Individuals & Fleets</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  One solution for personal vehicles, families, and logistics teams of all sizes.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <Lock className="h-8 w-8 text-red-600" />
                  </div>
                </div>
                <CardTitle className="text-lg">No Bank Account Exposure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Tokenized wallet keeps your banking info private and secure during all transactions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Smarter Payments for Everyone Section */}
        <div className="border-t pt-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Smarter Payments for Everyone
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              From daily drivers to fleet managers — PayTap makes every tap count.
            </p>
          </div>

          {/* Tabbed Interface for User Segments */}
          <Tabs defaultValue="individuals" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12 bg-gray-100">
              <TabsTrigger 
                value="individuals" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600"
              >
                <Users className="h-4 w-4" />
                Individuals & Families
              </TabsTrigger>
              <TabsTrigger 
                value="fleet" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600"
              >
                <Building2 className="h-4 w-4" />
                Fleet Operators
              </TabsTrigger>
              <TabsTrigger 
                value="economy" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600"
              >
                <MapPin className="h-4 w-4" />
                India's Economy
              </TabsTrigger>
            </TabsList>

            {/* Individuals & Families Tab */}
            <TabsContent value="individuals" className="space-y-8">
              <div className="text-center mb-10">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
                    <Car className="h-10 w-10 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Perfect for Daily Drivers & Families
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Simplify your daily payments with contactless convenience — ideal for everyone from tech-savvy users to elderly family members.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center">
                        <Nfc className="h-8 w-8 text-purple-600" />
                      </div>
                    </div>
                    <CardTitle className="text-lg">Tap & Pay Instantly</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">
                      No smartphone or app required — just tap your tag at fuel pumps, parking, or metro stations.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center">
                        <IndianRupee className="h-8 w-8 text-purple-600" />
                      </div>
                    </div>
                    <CardTitle className="text-lg">Control Your Spending</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">
                      Load prepaid wallet to control fuel, toll, and transit expenses. Perfect budget management.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center">
                        <Users className="h-8 w-8 text-purple-600" />
                      </div>
                    </div>
                    <CardTitle className="text-lg">User-Friendly for All Ages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">
                      Ideal for elderly parents, teenagers, or anyone who prefers simple, contactless payments.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Fleet Operators Tab */}
            <TabsContent value="fleet" className="space-y-8">
              <div className="text-center mb-10">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <Building2 className="h-10 w-10 text-green-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Streamlined Fleet Management
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Eliminate cash handling, reduce fraud, and gain complete visibility over your fleet's operational expenses.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                        <Car className="h-8 w-8 text-green-600" />
                      </div>
                    </div>
                    <CardTitle className="text-lg">Assign & Manage Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">
                      Map one tag per vehicle. Track fuel, tolls, and maintenance expenses by vehicle in real-time.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                    </div>
                    <CardTitle className="text-lg">No Driver Dependency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">
                      No more handing cash or cards to drivers. All payments are prepaid and fully traceable.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                        <BarChart3 className="h-8 w-8 text-green-600" />
                      </div>
                    </div>
                    <CardTitle className="text-lg">Centralized Dashboard</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">
                      Track vehicle-wise spending from one dashboard. Supports fleets from 5 to 500+ vehicles.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* India's Economy Tab */}
            <TabsContent value="economy" className="space-y-8">
              <div className="text-center mb-10">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-10 w-10 text-orange-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Powering India's Digital Economy
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  PayTap works everywhere RuPay is accepted — from metro stations to highway tolls, empowering digital payments across India.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center">
                        <CreditCard className="h-8 w-8 text-orange-600" />
                      </div>
                    </div>
                    <CardTitle className="text-lg">8L+ RuPay Terminals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">
                      Use PayTap at over 8 lakh+ POS terminals nationwide — petrol pumps, parking, restaurants, and more.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center">
                        <Train className="h-8 w-8 text-orange-600" />
                      </div>
                    </div>
                    <CardTitle className="text-lg">Metro, Tolls & Transit</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">
                      Supports metros, highway tolls, parking, and service centers across India's transport network.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center">
                        <Wifi className="h-8 w-8 text-orange-600" />
                      </div>
                    </div>
                    <CardTitle className="text-lg">Works Without Internet</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">
                      Enables digital utility payments even without internet — perfect for remote locations and rural areas.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* CTAs */}
          <div className="text-center mt-16 space-y-4">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold mr-4" 
              onClick={handleRedirect}
            >
              Order Your PayTap Tag Now
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-3 text-lg font-semibold" 
              onClick={scrollToHowItWorks}
            >
              Explore How PayTap Works
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
