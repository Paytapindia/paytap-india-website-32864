
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleRedirect = () => {
    window.open('https://dashboard.paytap.co.in/login', '_blank');
  };

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling 100vh
      const shouldShow = window.scrollY > window.innerHeight;
      setIsVisible(shouldShow);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
      <Button
        onClick={handleRedirect}
        className="w-full bg-paytap-dark hover:bg-paytap-navy text-white py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold text-base min-h-[56px]"
      >
        Login
        <ArrowRight className="ml-2 w-5 h-5" />
      </Button>
    </div>
  );
};

export default StickyMobileCTA;
