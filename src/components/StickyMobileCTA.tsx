
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleRedirect = () => {
    window.open('https://u.payu.in/PAYUMN/7IhlCW7USFZ7', '_blank');
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
    <>
      {/* Mobile: Full-width bottom bar */}
      <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
        <Button
          onClick={handleRedirect}
          className="w-full bg-paytap-light hover:bg-paytap-dark text-white py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold text-base min-h-[56px]"
        >
          Order Card
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>

      {/* Desktop: Corner floating button */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <Button
          onClick={handleRedirect}
          className="bg-paytap-light hover:bg-paytap-dark text-white px-6 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold text-base min-h-[56px]"
        >
          Order Card
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </>
  );
};

export default StickyMobileCTA;
