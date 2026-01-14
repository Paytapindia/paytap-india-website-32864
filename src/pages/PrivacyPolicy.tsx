
import { ArrowLeft, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-6 w-6 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Paytap Privacy Policy</h1>
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
            <a href="#data-controller" className="text-blue-600 hover:text-blue-800">• Data Controller</a>
            <a href="#information-collection" className="text-blue-600 hover:text-blue-800">• Information Collection</a>
            <a href="#legal-basis" className="text-blue-600 hover:text-blue-800">• Legal Basis</a>
            <a href="#purpose-of-use" className="text-blue-600 hover:text-blue-800">• Purpose of Use</a>
            <a href="#data-sharing" className="text-blue-600 hover:text-blue-800">• Data Sharing</a>
            <a href="#security" className="text-blue-600 hover:text-blue-800">• Security</a>
            <a href="#user-rights" className="text-blue-600 hover:text-blue-800">• User Rights</a>
            <a href="#grievance" className="text-blue-600 hover:text-blue-800">• Grievance Contact</a>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <p className="text-gray-700 mb-6">
            At Paytap, your privacy is a priority. This Privacy Policy explains how DriveTap Innovation India Pvt. Ltd. (hereinafter "Paytap", "we", "our", or "us") collects, uses, discloses, and safeguards your information when you use our services.
          </p>
          <p className="text-gray-700">
            By accessing or using Paytap, you agree to the practices described in this Privacy Policy.
          </p>
        </div>

        {/* Privacy Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <Accordion type="multiple" className="w-full space-y-4">
            <AccordionItem value="data-controller" id="data-controller">
              <AccordionTrigger className="text-lg font-semibold">
                1. Data Controller and Ownership
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <p>
                  Paytap is a registered product of DriveTap Innovation India Pvt. Ltd. headquartered in Bengaluru, India. All personal data collected is managed and processed by this legal entity in compliance with applicable Indian laws.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="information-collection" id="information-collection">
              <AccordionTrigger className="text-lg font-semibold">
                2. Information We Collect
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <p>We collect the following categories of information:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Name, mobile number, email address, and government-issued ID</li>
                  <li>Wallet transaction history and payment metadata</li>
                  <li>KYC documents as required by RBI guidelines</li>
                  <li>IP address, device type, operating system, and browser version</li>
                  <li>Geo-location data when enabled by the user</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="legal-basis" id="legal-basis">
              <AccordionTrigger className="text-lg font-semibold">
                3. Legal Basis for Collection
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <p>We collect and process data under one or more of the following lawful bases:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>To fulfill our contractual obligations</li>
                  <li>To comply with RBI/SEBI/NPCI/IT Act mandates</li>
                  <li>With your explicit consent</li>
                  <li>In pursuit of legitimate business interests such as fraud prevention</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="purpose-of-use" id="purpose-of-use">
              <AccordionTrigger className="text-lg font-semibold">
                4. Purpose of Use
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <p>Your personal data is used for:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Account creation, KYC, and verification</li>
                  <li>Wallet top-ups, redemptions, and transaction logging</li>
                  <li>Secure contactless payments at supported POS terminals</li>
                  <li>Sending service alerts and operational updates</li>
                  <li>Customer support and dispute resolution</li>
                  <li>Regulatory compliance and auditing</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="data-sharing" id="data-sharing">
              <AccordionTrigger className="text-lg font-semibold">
                5. Data Sharing and Disclosure
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <p>We may share your data only under the following circumstances:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>With Transcorp International Ltd., our RBI-authorized PPI co-branding partner</li>
                  <li>With backend service providers like M2P Fintech for technical processing</li>
                  <li>With law enforcement or regulators under legal obligation</li>
                  <li>Never for unsolicited marketing or third-party advertising</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="data-storage" id="data-storage">
              <AccordionTrigger className="text-lg font-semibold">
                6. Data Storage and Retention
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <p>
                  Your data is stored securely in encrypted form on servers located in India. We retain personal and transactional information:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>For a minimum of 8 years as per RBI record-keeping rules</li>
                  <li>Until the user account is deleted and legal retention periods expire</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="security" id="security">
              <AccordionTrigger className="text-lg font-semibold">
                7. Data Security Measures
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <p>Paytap uses:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>PCI-DSS compliant systems</li>
                  <li>256-bit SSL encryption</li>
                  <li>Tokenized payments to avoid exposing sensitive card details</li>
                  <li>Access controls and logging for internal data access</li>
                </ul>
                <p className="text-sm text-gray-600 mt-3">
                  Despite best efforts, no method of transmission over the internet is fully secure. Users are advised to safeguard their login credentials.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cookies" id="cookies">
              <AccordionTrigger className="text-lg font-semibold">
                8. Cookies and Analytics
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <p>Our web and mobile applications use cookies and analytics to:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Remember session data</li>
                  <li>Track usage patterns</li>
                  <li>Improve interface performance</li>
                </ul>
                <p className="text-sm text-gray-600 mt-3">
                  You can disable cookies via your browser settings, but this may limit certain features.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="user-rights" id="user-rights">
              <AccordionTrigger className="text-lg font-semibold">
                9. Data Access and User Rights
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <p>You may request:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Access to your stored personal data</li>
                  <li>Correction of outdated or inaccurate information</li>
                  <li>Deletion of your account and associated data (as permitted by law)</li>
                  <li>Withdrawal of marketing consent at any time</li>
                </ul>
                <p className="text-sm text-gray-600 mt-3">
                  Requests can be made by contacting our Grievance Officer (see Section 15).
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="third-party" id="third-party">
              <AccordionTrigger className="text-lg font-semibold">
                10. Third-Party Links and Services
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <p>
                  Our service may contain links to external websites (e.g., fuel stations, toll operators, Transcorp PPI policies). We are not responsible for the content or data practices of those sites.
                </p>
                <div className="bg-blue-50 p-3 rounded-lg mt-3">
                  <p className="text-sm text-blue-800">
                    <strong>Transcorp Terms:</strong>{" "}
                    <a href="https://transcorpint.com/ppi-policies-and-tc/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                      https://transcorpint.com/ppi-policies-and-tc/
                    </a>
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="children" id="children">
              <AccordionTrigger className="text-lg font-semibold">
                11. Children's Privacy
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <p>
                  Paytap is not intended for individuals under 18. We do not knowingly collect data from minors. If such data is identified, it will be deleted immediately.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="data-portability" id="data-portability">
              <AccordionTrigger className="text-lg font-semibold">
                12. Data Portability
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <p>
                  Upon written request, we will provide a machine-readable copy of your data that can be transferred to another compliant service provider.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="policy-updates" id="policy-updates">
              <AccordionTrigger className="text-lg font-semibold">
                13. Policy Updates
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <p>
                  We reserve the right to modify this Privacy Policy at any time. Substantial changes will be posted prominently on our website. Continued use of Paytap after such updates implies acceptance.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="governing-law" id="governing-law">
              <AccordionTrigger className="text-lg font-semibold">
                14. Governing Law
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <p>
                  This Privacy Policy shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Bengaluru, Karnataka.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="grievance" id="grievance">
              <AccordionTrigger className="text-lg font-semibold">
                15. Grievance Redressal Contact
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <p className="mb-3">
                  As per Rule 5(9) of the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, the details of the Grievance Officer are as follows:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>Name:</strong> Akshay Neelakantha</p>
                  <p><strong>Email:</strong> ceo@paytap.co.in</p>
                  <p><strong>Phone:</strong> +91-9900010964</p>
                  <p><strong>Address:</strong><br />
                    DriveTap Innovation India Pvt. Ltd.<br />
                    Concorde Towers, Level 14 & 15, Vittal Mallya Road,<br />
                    UB City, Bengaluru – 560001, Karnataka, India</p>
                  <p><strong>Website:</strong> www.drivetap.in</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
