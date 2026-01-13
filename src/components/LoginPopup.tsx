import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { Loader2, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface LoginPopupProps {
  className?: string;
  variant?: "default" | "outline";
  isMobile?: boolean;
  onClose?: () => void;
}

const LoginPopup = ({ className, variant = "default", isMobile = false, onClose }: LoginPopupProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validatePhone = (value: string): boolean => {
    // Indian mobile number: starts with 6-9, exactly 10 digits
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(value);
    if (error) setError("");
  };

  const handleSignUp = async () => {
    if (!validatePhone(phone)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Save lead to database
      const { error: insertError } = await supabase
        .from("leads")
        .insert({
          phone: phone,
          source: "navbar_login"
        });

      if (insertError) {
        console.error("Error saving lead:", insertError);
        // Continue even if there's an error - we don't want to block the user
      }

      // Show success toast
      toast({
        title: "Welcome to PayTap!",
        description: "Redirecting you to the dashboard...",
      });

      // Redirect to dashboard
      window.open("https://dashboard.paytap.co.in/login", "_blank");
      
      // Close popup and reset form
      setIsOpen(false);
      setPhone("");
      if (onClose) onClose();
    } catch (err) {
      console.error("Error:", err);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const buttonContent = (
    <Button 
      variant={variant} 
      className={className || (variant === "default" 
        ? "bg-paytap-light hover:bg-paytap-dark text-white px-4 md:px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm md:text-base min-h-[40px] md:min-h-[44px]"
        : "w-full mt-3 border-2 border-paytap-dark text-paytap-dark hover:bg-paytap-dark hover:text-white py-3 rounded-full font-semibold transition-all duration-300 min-h-[48px]"
      )}
    >
      {t('nav.login')}
    </Button>
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {buttonContent}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align={isMobile ? "center" : "end"}>
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-lg text-foreground">
              Sign Up / Login
            </h4>
            <p className="text-sm text-muted-foreground">
              Enter your mobile number to continue to PayTap Dashboard
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Mobile Number
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                +91
              </span>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter 10-digit number"
                value={phone}
                onChange={handlePhoneChange}
                className={`pl-12 ${error ? "border-red-500" : ""}`}
                disabled={isLoading}
              />
            </div>
            {error && (
              <p className="text-red-500 text-xs">{error}</p>
            )}
          </div>
          
          <Button 
            onClick={handleSignUp} 
            className="w-full bg-paytap-light hover:bg-paytap-dark text-white"
            disabled={isLoading || phone.length !== 10}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              <>
                <Phone className="mr-2 h-4 w-4" />
                Sign Up & Continue
              </>
            )}
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            By continuing, you agree to our{" "}
            <a href="/terms-and-conditions" className="text-primary hover:underline">
              Terms
            </a>{" "}
            &{" "}
            <a href="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LoginPopup;
