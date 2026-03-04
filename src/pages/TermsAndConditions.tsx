import { Helmet } from "react-helmet-async";
import { ArrowLeft, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TermsAndConditions = () => {
  return (
    <>
      <Helmet>
        <title>Terms and Conditions - PayTap | User Agreement</title>
        <meta name="description" content="Read PayTap's terms and conditions covering wallet usage, transaction limits, user obligations, and RBI compliance for contactless payments." />
        <link rel="canonical" href="https://paytap.co.in/terms-and-conditions" />
      </Helmet>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-6 w-6 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Paytap Terms and Conditions</h1>
              <p className="text-sm text-gray-600">Effective Date: 1-1-2025</p>
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

      {/* Quick Navigation */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="bg-blue-50 rounded-lg p-4 mb-8">
          <h2 className="font-semibold text-blue-900 mb-3">Quick Navigation</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            <a href="#definitions" className="text-blue-600 hover:text-blue-800">• Definitions</a>
            <a href="#eligibility" className="text-blue-600 hover:text-blue-800">• Eligibility</a>
            <a href="#registration" className="text-blue-600 hover:text-blue-800">• Registration & KYC</a>
            <a href="#wallet-usage" className="text-blue-600 hover:text-blue-800">• Wallet Usage</a>
            <a href="#transaction-limits" className="text-blue-600 hover:text-blue-800">• Transaction Limits</a>
            <a href="#governing-law" className="text-blue-600 hover:text-blue-800">• Governing Law</a>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <p className="text-gray-700 mb-6">
            Welcome to Paytap. By accessing or using our services, you agree to the following Terms and Conditions ("Terms"). Please read them carefully before proceeding.
          </p>
        </div>

        {/* Terms Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <Accordion type="multiple" className="w-full space-y-4">
            <AccordionItem value="definitions" id="definitions">
              <AccordionTrigger className="text-lg font-semibold">
                1. Definitions
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <div className="space-y-4">
                  <p><strong>"Paytap"</strong> refers to the contactless payment tag and prepaid wallet solution developed and owned by DriveTap Innovation India Pvt. Ltd., co-branded with RBI-authorized Prepaid Payment Instrument (PPI) partners.</p>
                  <p><strong>"User"</strong> refers to any individual or entity that accesses or uses the Paytap services.</p>
                  <p><strong>"Wallet"</strong> means the semi-closed prepaid payment instrument issued in the name of the user.</p>
                  <p><strong>"KYC"</strong> stands for "Know Your Customer" as required by RBI.</p>
                  <p><strong>"NPCI"</strong> refers to the National Payments Corporation of India, the body managing the RuPay and UPI infrastructure.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="eligibility" id="eligibility">
              <AccordionTrigger className="text-lg font-semibold">
                2. Eligibility
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <div className="space-y-4">
                  <p>To use Paytap, you must:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Be 18 years of age or older.</li>
                    <li>Have the legal capacity to enter into binding contracts.</li>
                    <li>Agree to comply with all applicable laws and regulations, including RBI and NPCI guidelines.</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="registration" id="registration">
              <AccordionTrigger className="text-lg font-semibold">
                3. Account Registration and KYC
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <div className="space-y-4">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Users must complete digital onboarding with accurate information.</li>
                    <li>KYC is mandatory and governed by RBI regulations. This may include identity, address, and document verification.</li>
                    <li>Non-completion of KYC will restrict wallet usage and may lead to account suspension.</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="wallet-usage" id="wallet-usage">
              <AccordionTrigger className="text-lg font-semibold">
                4. Wallet Usage
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <div className="space-y-4">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Paytap provides a semi-closed PPI wallet issued by our RBI-authorized PPI partner.</li>
                    <li>The wallet can be loaded using UPI and other permitted digital instruments.</li>
                    <li>Wallet funds can be used at RuPay-enabled POS terminals and partner merchants across India, including fuel stations, toll booths, metro (NCMC), service centers, and more.</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="transaction-limits" id="transaction-limits">
              <AccordionTrigger className="text-lg font-semibold">
                5. Transaction Limits
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Minimum KYC Wallet:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Maximum Balance: ₹10,000</li>
                      <li>Monthly Load Limit: ₹10,000</li>
                      <li>Annual Load Limit: ₹1,20,000</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Full KYC Wallet:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Maximum Balance: ₹1,00,000</li>
                      <li>Subject to RBI-regulated limits and guidelines.</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="fees" id="fees">
              <AccordionTrigger className="text-lg font-semibold">
                6. Fees and Charges
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <div className="space-y-4">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Paytap reserves the right to apply fees for services like tag issuance, replacements, or enhanced features.</li>
                    <li>All applicable charges, if any, will be transparently communicated prior to transaction processing.</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="security" id="security">
              <AccordionTrigger className="text-lg font-semibold">
                7. Security Measures
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <div className="space-y-4">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Paytap is PCI-DSS compliant and implements 256-bit encryption to secure user data.</li>
                    <li>OTP-based authentication and transaction alerts are enabled.</li>
                    <li>Users are responsible for safeguarding their login credentials and tag.</li>
                    <li>In case of loss or unauthorized access, users must notify Paytap support immediately.</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="obligations" id="obligations">
              <AccordionTrigger className="text-lg font-semibold">
                8. User Obligations
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <div className="space-y-4">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Users agree not to misuse Paytap services for fraudulent, illegal, or unauthorized transactions.</li>
                    <li>The tag and wallet are non-transferable and must be used only by the registered user.</li>
                    <li>Paytap reserves the right to suspend or terminate accounts in case of misuse or violation.</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="termination" id="termination">
              <AccordionTrigger className="text-lg font-semibold">
                9. Termination & Suspension
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <div className="space-y-4">
                  <p>We may suspend or terminate your Paytap wallet if:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>You breach any Terms of Use.</li>
                    <li>KYC compliance is not completed or revoked.</li>
                    <li>The account is involved in suspicious or fraudulent activity.</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="refunds" id="refunds">
              <AccordionTrigger className="text-lg font-semibold">
                10. Refunds & Chargebacks
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <div className="space-y-4">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Refunds for failed or canceled transactions will be credited back to the user wallet.</li>
                    <li>Chargebacks will be processed in line with NPCI and partner bank rules.</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="liability" id="liability">
              <AccordionTrigger className="text-lg font-semibold">
                11. Limitation of Liability
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <div className="space-y-4">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Paytap is not liable for indirect or incidental losses incurred due to delays, technical issues, or service unavailability.</li>
                    <li>The total liability of Paytap shall not exceed the total value transacted within 30 days prior to the claim.</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="privacy" id="privacy">
              <AccordionTrigger className="text-lg font-semibold">
                12. Privacy Policy
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <div className="space-y-4">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Paytap is committed to protecting user data.</li>
                    <li>We collect, store, and process personal information only as necessary for operating the platform, as described in our Privacy Policy.</li>
                    <li>We do not share or sell user data to unauthorized third parties.</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="amendments" id="amendments">
              <AccordionTrigger className="text-lg font-semibold">
                13. Amendments
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <div className="space-y-4">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Paytap reserves the right to update or amend these Terms.</li>
                    <li>Updated Terms will be published on our website. Continued use after such updates constitutes acceptance of the changes.</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="governing-law" id="governing-law">
              <AccordionTrigger className="text-lg font-semibold">
                14. Governing Law & Jurisdiction
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <div className="space-y-4">
                  <ul className="list-disc list-inside space-y-2">
                    <li>These Terms are governed by the laws of India.</li>
                    <li>Any disputes shall be subject to the exclusive jurisdiction of the courts of Bengaluru, Karnataka.</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="contact" id="contact">
              <AccordionTrigger className="text-lg font-semibold">
                15. Contact Information
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Company Legal Name:</strong><br />
                    DriveTap Innovation India Pvt. Ltd.</p>
                    <p><strong>Trade Name:</strong> Paytap</p>
                    <p><strong>GSTIN:</strong> 29AALCD4626M1Z3</p>
                    <p><strong>Registered Office:</strong><br />
                    Level 14 & 15, Concorde Towers,<br />
                    1 Vittal Mallya Road, UB City,<br />
                    Bengaluru – 560001, Karnataka, India</p>
                    <p><strong>Email:</strong> support@paytap.co.in</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg mt-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Co-Issuer Policy Reference</h4>
                    <p className="text-sm text-blue-800">
                      This wallet is co-issued by our RBI-authorized PPI partner. For PPI policies and customer grievance guidelines, please contact us at support@paytap.co.in.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
    </>
  );
};

export default TermsAndConditions;
