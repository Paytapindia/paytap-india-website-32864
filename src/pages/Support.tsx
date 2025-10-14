
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  Clock, 
  MapPin, 
  HelpCircle,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const Support = () => {
  const handleEmailSupport = () => {
    window.location.href = "mailto:support@paytap.co.in";
  };

  const handlePhoneSupport = () => {
    window.location.href = "tel:+919900010964";
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/919900010964", "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Need Help? We're Here for You
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get quick answers and expert support for your PayTap experience
            </p>
          </div>

          {/* Quick Contact Options */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleEmailSupport}>
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Email Support</CardTitle>
                <CardDescription>Get detailed help via email</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-blue-600 font-medium">support@paytap.co.in</p>
                <p className="text-sm text-gray-500 mt-2">Response within 24 hours</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handlePhoneSupport}>
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Phone Support</CardTitle>
                <CardDescription>Speak with our experts</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-green-600 font-medium">+91 9900010964</p>
                <p className="text-sm text-gray-500 mt-2">Mon-Fri, 9 AM - 6 PM IST</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleWhatsApp}>
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle>WhatsApp</CardTitle>
                <CardDescription>Quick chat support</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-emerald-600 font-medium">Chat with us</p>
                <p className="text-sm text-gray-500 mt-2">Instant responses</p>
              </CardContent>
            </Card>
          </div>

          {/* Support Hours */}
          <Alert className="mb-12 bg-blue-50 border-blue-200">
            <Clock className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Support Hours:</strong> Monday to Friday, 9:00 AM - 6:00 PM IST. 
              Emergency support available 24/7 for critical issues.
            </AlertDescription>
          </Alert>

          {/* Common Issues */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Common Issues & Solutions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                    <CardTitle className="text-lg">Payment Not Working</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Check if your tag balance is sufficient
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Ensure the terminal supports RuPay contactless
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Try tapping the tag closer to the terminal
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-500" />
                    <CardTitle className="text-lg">Tag Not Detected</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Remove the tag from wallet/phone case
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Check for physical damage to the tag
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Hold the tag steady for 2-3 seconds
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Info className="w-5 h-5 text-purple-500" />
                    <CardTitle className="text-lg">Account Issues</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Reset password using forgot password option
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Verify your mobile number and email
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Update KYC documents if required
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <CardTitle className="text-lg">Lost or Stolen Tag</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Immediately block the tag via app or website
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Order a replacement tag online
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Transfer remaining balance to new tag
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-center">
                <HelpCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Need More Answers?</h3>
                <p className="text-gray-600 mb-6">
                  Check out our comprehensive FAQ section for detailed answers to common questions.
                </p>
                <Link to="/faq">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Visit FAQ Section
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Office Information */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <CardTitle>Our Office</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">Corporate Office</h4>
                    <p className="text-gray-600">
                      <strong>Company Name:</strong> DriveTap Innovation India Pvt. Ltd.<br />
                      <strong>Trade Name:</strong> PayTap<br />
                      <strong>GSTIN:</strong> 29AALCD4626M1Z3<br />
                      <strong>PPI Partner:</strong> Transcorp International Ltd.<br />
                      <strong>Address:</strong> Level 15 UB City Concorde Tower 1<br />
                      Vittal Mallya Road Rajbhavan<br />
                      Bengaluru - 560001
                    </p>
                  </div>
                  <div className="pt-4">
                    <Button variant="outline" className="w-full">
                      Get Directions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <CardTitle>Emergency Support</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert className="bg-red-50 border-red-200">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      For immediate assistance with lost/stolen tags or suspicious transactions, 
                      call our 24/7 emergency helpline.
                    </AlertDescription>
                  </Alert>
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={() => window.location.href = "tel:+919900010964"}
                  >
                    Emergency Helpline
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default Support;
