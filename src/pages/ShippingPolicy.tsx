import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">PayTap Shipping Policy</h1>
              <p className="text-gray-600">Effective Date: December 24, 2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-gray-900 mb-2">Quick Navigation</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="#delivery-areas" className="text-blue-600 hover:underline">Delivery Areas</a>
            <span className="text-gray-400">•</span>
            <a href="#shipping-timeline" className="text-blue-600 hover:underline">Shipping Timeline</a>
            <span className="text-gray-400">•</span>
            <a href="#delivery-process" className="text-blue-600 hover:underline">Delivery Process</a>
            <span className="text-gray-400">•</span>
            <a href="#replacement-shipping" className="text-blue-600 hover:underline">Replacement Shipping</a>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="overview" id="overview">
              <AccordionTrigger className="px-6 py-4">
                <span className="text-left font-semibold">Shipping Policy Overview</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-4 text-gray-700">
                  <p>
                    DriveTap Innovation India Pvt. Ltd. (trading as PayTap) provides shipping services for PayTap NFC tags across India. This policy outlines our shipping procedures, timelines, and delivery terms.
                  </p>
                  <p>
                    All shipments are handled through our authorized logistics partners to ensure secure and timely delivery of your PayTap tags.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="delivery-areas" id="delivery-areas">
              <AccordionTrigger className="px-6 py-4">
                <span className="text-left font-semibold">Delivery Areas</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-4 text-gray-700">
                  <p><strong>Pan-India Delivery:</strong> We deliver PayTap NFC tags across all serviceable pin codes in India.</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>All major cities and metropolitan areas</li>
                    <li>Tier 2 and Tier 3 cities</li>
                    <li>Rural areas with courier connectivity</li>
                    <li>Union Territories and remote locations (subject to logistics partner coverage)</li>
                  </ul>
                  <p><strong>International Shipping:</strong> Currently, we do not offer international shipping. PayTap tags are only delivered within India.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="shipping-timeline" id="shipping-timeline">
              <AccordionTrigger className="px-6 py-4">
                <span className="text-left font-semibold">Shipping Timeline & Charges</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h4 className="font-semibold mb-2">Processing Time:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Order processing: 1-2 business days</li>
                      <li>Tag personalization and packaging: 1 business day</li>
                      <li>Dispatch: Within 3 business days of order confirmation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Delivery Timeline:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Metro cities: 3-5 business days</li>
                      <li>Other cities: 5-7 business days</li>
                      <li>Remote areas: 7-10 business days</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Shipping Charges:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Free shipping on orders above ₹500</li>
                      <li>Standard shipping: ₹50 for orders below ₹500</li>
                      <li>Express shipping: ₹100 (2-3 business days for metro cities)</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="delivery-process" id="delivery-process">
              <AccordionTrigger className="px-6 py-4">
                <span className="text-left font-semibold">Delivery Process</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h4 className="font-semibold mb-2">Order Tracking:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Tracking number provided via SMS and email upon dispatch</li>
                      <li>Real-time tracking available on courier partner's website</li>
                      <li>SMS updates at key delivery milestones</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Delivery Requirements:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Valid government-issued photo ID required at delivery</li>
                      <li>Original order confirmation or OTP may be requested</li>
                      <li>Signature required upon successful delivery</li>
                      <li>Package inspection allowed before acceptance</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Failed Delivery:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Up to 3 delivery attempts will be made</li>
                      <li>Package held at local courier office for 7 days</li>
                      <li>Customer notification for self-pickup options</li>
                      <li>Return to sender after failed attempts and hold period</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="packaging" id="packaging">
              <AccordionTrigger className="px-6 py-4">
                <span className="text-left font-semibold">Packaging & Security</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-4 text-gray-700">
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Secure packaging to prevent damage during transit</li>
                    <li>Tamper-evident sealing for product authenticity</li>
                    <li>PayTap branded packaging for easy identification</li>
                    <li>Eco-friendly packaging materials wherever possible</li>
                    <li>Insurance coverage for lost or damaged shipments</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="replacement-shipping" id="replacement-shipping">
              <AccordionTrigger className="px-6 py-4">
                <span className="text-left font-semibold">Replacement & Return Shipping</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h4 className="font-semibold mb-2">Defective Product Replacement:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Free replacement shipping for manufacturing defects</li>
                      <li>Expedited processing for replacement orders</li>
                      <li>Return pickup arranged at no additional cost</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Lost Shipment:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Investigation period: 7-10 business days</li>
                      <li>Free replacement shipment upon confirmation of loss</li>
                      <li>Express shipping for replacement orders</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="contact" id="contact">
              <AccordionTrigger className="px-6 py-4">
                <span className="text-left font-semibold">Shipping Support</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-4 text-gray-700">
                  <p>For shipping-related queries, please contact us:</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>DriveTap Innovation India Pvt. Ltd.</strong></p>
                    <p>Trade Name: PayTap</p>
                    <p>Email: support@paytap.co.in</p>
                    <p>Phone: +91 99000 10964</p>
                    <p>Address: Level 15 UB City Concorde Tower 1, Vittal Mallya Road, Rajbhavan, Bengaluru - 560001</p>
                    <p>GSTIN: 29AALCD4626M1Z3</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    This shipping policy is subject to change without prior notice. Please refer to the latest version on our website.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;