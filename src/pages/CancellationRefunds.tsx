import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CancellationRefunds = () => {
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
              <h1 className="text-2xl font-bold text-gray-900">Cancellation & Refunds Policy</h1>
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
            <a href="#order-cancellation" className="text-blue-600 hover:underline">Order Cancellation</a>
            <span className="text-gray-400">•</span>
            <a href="#wallet-refunds" className="text-blue-600 hover:underline">Wallet Refunds</a>
            <span className="text-gray-400">•</span>
            <a href="#transaction-refunds" className="text-blue-600 hover:underline">Transaction Refunds</a>
            <span className="text-gray-400">•</span>
            <a href="#refund-timeline" className="text-blue-600 hover:underline">Refund Timeline</a>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="overview" id="overview">
              <AccordionTrigger className="px-6 py-4">
                <span className="text-left font-semibold">Cancellation & Refunds Overview</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-4 text-gray-700">
                  <p>
                    DriveTap Innovation India Pvt. Ltd. (trading as PayTap) is committed to providing a fair and transparent cancellation and refunds policy. This policy covers PayTap NFC tag orders, PayTap wallet transactions, and related services.
                  </p>
                  <p>
                    All refunds are processed in compliance with RBI guidelines for Prepaid Payment Instruments (PPI) and our co-issuer Transcorp International Ltd.'s policies.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="order-cancellation" id="order-cancellation">
              <AccordionTrigger className="px-6 py-4">
                <span className="text-left font-semibold">PayTap Tag Order Cancellation</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h4 className="font-semibold mb-2">Cancellation Timeline:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Before Dispatch:</strong> Orders can be cancelled free of charge within 24 hours of order confirmation</li>
                      <li><strong>After Dispatch:</strong> Cancellation not possible; return policy applies</li>
                      <li><strong>During Processing:</strong> Cancellation subject to processing stage and additional charges may apply</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Cancellation Process:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Login to your PayTap account and navigate to 'My Orders'</li>
                      <li>Select the order you wish to cancel</li>
                      <li>Click 'Cancel Order' and provide reason for cancellation</li>
                      <li>Cancellation confirmation will be sent via email and SMS</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Non-Cancellable Orders:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Customized or personalized PayTap tags</li>
                      <li>Orders with special engraving or custom designs</li>
                      <li>Bulk orders above 100 units (subject to agreement)</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="wallet-refunds" id="wallet-refunds">
              <AccordionTrigger className="px-6 py-4">
                <span className="text-left font-semibold">PayTap Wallet Refunds</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h4 className="font-semibold mb-2">Wallet Closure Refunds:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Full wallet balance can be refunded upon wallet closure request</li>
                      <li>Minimum processing time: 3-5 business days</li>
                      <li>Refund processed to original payment method or bank account</li>
                      <li>Valid KYC required for refunds above ₹10,000</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Expired Balance:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Wallet balance expires after 12 months of inactivity</li>
                      <li>Expired balance can be refunded within 30 days of expiry</li>
                      <li>Post 30 days, expired balance cannot be refunded</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="transaction-refunds" id="transaction-refunds">
              <AccordionTrigger className="px-6 py-4">
                <span className="text-left font-semibold">Transaction Refunds</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h4 className="font-semibold mb-2">Failed Transactions:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Auto-refund for failed payment transactions within 5-7 business days</li>
                      <li>Manual refund request can be raised through customer support</li>
                      <li>Transaction reference number required for processing</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Disputed Transactions:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Report disputes within 30 days of transaction</li>
                      <li>Investigation period: 7-15 business days</li>
                      <li>Provisional credit may be provided during investigation</li>
                      <li>Final resolution based on investigation outcome</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Merchant Refunds:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Merchant-initiated refunds processed within 3-5 business days</li>
                      <li>Refund amount credited back to PayTap wallet</li>
                      <li>Email notification sent upon successful refund</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="refund-timeline" id="refund-timeline">
              <AccordionTrigger className="px-6 py-4">
                <span className="text-left font-semibold">Refund Processing Timeline</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h4 className="font-semibold mb-2">Processing Time by Payment Method:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>UPI:</strong> 1-3 business days</li>
                      <li><strong>Debit/Credit Cards:</strong> 5-7 business days</li>
                      <li><strong>Net Banking:</strong> 3-5 business days</li>
                      <li><strong>Bank Transfer:</strong> 3-7 business days</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Refund Status Tracking:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Real-time status updates in PayTap app</li>
                      <li>SMS and email notifications at each stage</li>
                      <li>Customer support available for status queries</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="return-policy" id="return-policy">
              <AccordionTrigger className="px-6 py-4">
                <span className="text-left font-semibold">PayTap Tag Return Policy</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h4 className="font-semibold mb-2">Return Eligibility:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Manufacturing defects: 30 days from delivery</li>
                      <li>Wrong product delivered: 7 days from delivery</li>
                      <li>Damaged during shipping: 3 days from delivery</li>
                      <li>Product must be unused and in original packaging</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Return Process:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Raise return request through PayTap app or website</li>
                      <li>Schedule pickup or drop-off at designated centers</li>
                      <li>Quality check upon receipt of returned product</li>
                      <li>Refund or replacement based on return reason</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Non-Returnable Items:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Used or activated PayTap tags</li>
                      <li>Customized or personalized items</li>
                      <li>Products damaged due to misuse</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="grievance" id="grievance">
              <AccordionTrigger className="px-6 py-4">
                <span className="text-left font-semibold">Grievance & Dispute Resolution</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h4 className="font-semibold mb-2">Internal Grievance Mechanism:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>First level: Customer support team</li>
                      <li>Second level: Grievance officer</li>
                      <li>Resolution timeline: 15 business days</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">External Grievance Options:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>RBI Ombudsman for banking-related complaints</li>
                      <li>Consumer court for product-related issues</li>
                      <li>National Consumer Helpline: 1915</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Grievance Officer Contact:</strong></p>
                    <p>Email: grievance@paytap.co.in</p>
                    <p>Phone: +91 99000 10964</p>
                    <p>Address: Level 15 UB City Concorde Tower 1, Vittal Mallya Road, Rajbhavan, Bengaluru - 560001</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="contact" id="contact">
              <AccordionTrigger className="px-6 py-4">
                <span className="text-left font-semibold">Contact Information</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-4 text-gray-700">
                  <p>For cancellation and refund requests, please contact us:</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>DriveTap Innovation India Pvt. Ltd.</strong></p>
                    <p>Trade Name: PayTap</p>
                    <p>Email: support@paytap.co.in</p>
                    <p>Phone: +91 99000 10964</p>
                    <p>Address: Level 15 UB City Concorde Tower 1, Vittal Mallya Road, Rajbhavan, Bengaluru - 560001</p>
                    <p>GSTIN: 29AALCD4626M1Z3</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p><strong>Co-issuer:</strong> Transcorp International Ltd.</p>
                    <p>For PPI-related queries, please refer to: <a href="https://www.transcorpintl.com" className="text-blue-600 hover:underline">Transcorp PPI Policies</a></p>
                  </div>
                  <p className="text-sm text-gray-600">
                    This cancellation and refunds policy is governed by Indian law and is subject to the jurisdiction of Bengaluru courts. Policy subject to change without prior notice.
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

export default CancellationRefunds;