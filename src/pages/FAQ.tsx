import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import FAQSection from "@/components/FAQSection";
import FooterSection from "@/components/FooterSection";

const FAQ = () => {
  return (
    <>
      <Helmet>
        <title>PayTap FAQ – How NFC Vehicle Payment Tags Work | PayTap</title>
        <meta 
          name="description" 
          content="Learn how PayTap NFC payment tags work for vehicles. Understand security, setup, fleet management, and contactless payments at fuel stations and merchants." 
        />
        <meta name="keywords" content="PayTap FAQ, NFC payment tag, vehicle payment, contactless fuel payment, fleet payment management, PayTap security" />
        <link rel="canonical" href="https://paytap.co.in/faq" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20">
          <FAQSection />
        </main>
        <FooterSection />
      </div>
    </>
  );
};

export default FAQ;
