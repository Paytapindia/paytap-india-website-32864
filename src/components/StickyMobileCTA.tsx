import { Button } from "@/components/ui/button";
import { Unlock } from "lucide-react";
import { useState, useEffect, useRef, memo } from "react";
import { useNavigate } from "react-router-dom";
const StickyMobileCTA = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const ticking = useRef(false);
  const navigate = useNavigate();

  const handleActivate = () => {
    navigate('/checkout');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          // Show CTA after scrolling 100vh
          const shouldShow = window.scrollY > window.innerHeight;
          setIsVisible(shouldShow);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Mobile: Full-width bottom bar */}
      <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
        <Button
          onClick={handleActivate}
          className="w-full bg-paytap-light hover:bg-paytap-dark text-white py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold text-base min-h-[56px]"
        >
          <Unlock className="mr-2 w-5 h-5" />
          Activate Paytap Account
        </Button>
      </div>

      {/* Desktop: Corner floating button */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <Button
          onClick={handleActivate}
          className="bg-paytap-light hover:bg-paytap-dark text-white px-6 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold text-base min-h-[56px]"
        >
          <Unlock className="mr-2 w-5 h-5" />
          Activate Paytap Account
        </Button>
      </div>
    </>
  );
});

StickyMobileCTA.displayName = 'StickyMobileCTA';

export default StickyMobileCTA;
