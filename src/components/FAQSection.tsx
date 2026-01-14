
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FAQCategory from "./FAQCategory";
import {
  generalFAQs,
  gettingStartedFAQs,
  kycFAQs,
  walletFAQs,
  transactionsFAQs,
  securityFAQs,
  businessFAQs,
  supportFAQs
} from "@/data/faqData";

const FAQSection = () => {
  return (
    <section className="py-16 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        
        <Tabs defaultValue="general" className="w-full">
          <div className="relative mb-8">
            <TabsList className="w-full flex lg:grid lg:grid-cols-8 overflow-x-auto scrollbar-hide bg-muted p-1 rounded-md">
              <TabsTrigger value="general" className="min-w-max px-4 py-2 whitespace-nowrap">General</TabsTrigger>
              <TabsTrigger value="getting-started" className="min-w-max px-4 py-2 whitespace-nowrap">Getting Started</TabsTrigger>
              <TabsTrigger value="kyc" className="min-w-max px-4 py-2 whitespace-nowrap">KYC & Account</TabsTrigger>
              <TabsTrigger value="wallet" className="min-w-max px-4 py-2 whitespace-nowrap">Wallet & Payments</TabsTrigger>
              <TabsTrigger value="transactions" className="min-w-max px-4 py-2 whitespace-nowrap">Transactions</TabsTrigger>
              <TabsTrigger value="security" className="min-w-max px-4 py-2 whitespace-nowrap">Security</TabsTrigger>
              <TabsTrigger value="business" className="min-w-max px-4 py-2 whitespace-nowrap">Business & Fleet</TabsTrigger>
              <TabsTrigger value="support" className="min-w-max px-4 py-2 whitespace-nowrap">Support</TabsTrigger>
            </TabsList>
            {/* Gradient fade indicators for mobile scroll */}
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none lg:hidden"></div>
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none lg:hidden"></div>
          </div>

          <TabsContent value="general">
            <FAQCategory
              title="General"
              description="Basic information about Paytap"
              icon="📋"
              faqs={generalFAQs}
            />
          </TabsContent>

          <TabsContent value="getting-started">
            <FAQCategory
              title="Getting Started"
              description="How to get and set up your Paytap tag"
              icon="💳"
              faqs={gettingStartedFAQs}
            />
          </TabsContent>

          <TabsContent value="kyc">
            <FAQCategory
              title="KYC & Account"
              description="Account verification and requirements"
              icon="💬"
              faqs={kycFAQs}
            />
          </TabsContent>

          <TabsContent value="wallet">
            <FAQCategory
              title="Wallet & Payments"
              description="Managing your Paytap wallet and payments"
              icon="🏦"
              faqs={walletFAQs}
            />
          </TabsContent>

          <TabsContent value="transactions">
            <FAQCategory
              title="Transactions & Tracking"
              description="Viewing and managing your transaction history"
              icon="📊"
              faqs={transactionsFAQs}
            />
          </TabsContent>

          <TabsContent value="security">
            <FAQCategory
              title="Security"
              description="Safety and security features"
              icon="🔐"
              faqs={securityFAQs}
            />
          </TabsContent>

          <TabsContent value="business">
            <FAQCategory
              title="Business & Fleet Use"
              description="Paytap for businesses and fleet operators"
              icon="👩‍💼"
              faqs={businessFAQs}
            />
          </TabsContent>

          <TabsContent value="support">
            <FAQCategory
              title="Refunds, Support & Closure"
              description="Customer support and account management"
              icon="❌"
              faqs={supportFAQs}
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default FAQSection;
