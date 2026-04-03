import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PhoneGateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProceed: () => void;
}

const PhoneGateDialog = ({ open, onOpenChange, onProceed }: PhoneGateDialogProps) => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const isValid = /^[6-9]\d{9}$/.test(phone);

  const handleProceed = async () => {
    if (!isValid) return;
    setLoading(true);
    try {
      await supabase.from("leads").insert({
        phone,
        source: "checkout_gate",
      });
    } catch {
      // Non-blocking — proceed even if lead save fails
    }
    setLoading(false);
    onOpenChange(false);
    setPhone("");
    onProceed();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Enter Your Phone Number</DialogTitle>
          <DialogDescription>
            We'll use this to set up your PayTap account.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">+91</span>
            <Input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="10-digit mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
              className="pl-12 text-lg h-12"
              autoFocus
            />
          </div>
          <Button
            onClick={handleProceed}
            disabled={!isValid || loading}
            className="w-full h-12 text-base font-semibold bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            {loading ? "Saving…" : "Proceed"}
            {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhoneGateDialog;
