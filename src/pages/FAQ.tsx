import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import FAQSection from "@/components/FAQSection";
import FooterSection from "@/components/FooterSection";

const FAQ = () => {
  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions - Paytap | Digital Payment Solutions</title>
        <meta 
          name="description" 
          content="Find answers to common questions about Paytap payment tags, wallet management, security features, and more. Get help with your digital payment needs." 
        />
        <meta name="keywords" content="Paytap FAQ, payment tag questions, digital wallet help, UPI support, contactless payment guide" />
        <link rel="canonical" href="/faq" />
      </Helmet>
      
      <div className="min-h-screen bg-white">
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