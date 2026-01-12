import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface DashboardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DashboardModal = ({ open, onOpenChange }: DashboardModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] w-[1200px] h-[90vh] p-0 overflow-hidden bg-white">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-50 rounded-full bg-paytap-dark/90 p-2 text-white hover:bg-paytap-dark transition-colors shadow-lg"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <iframe
          src="https://dashboard.paytap.co.in/login"
          className="w-full h-full border-0"
          title="PayTap Dashboard"
          allow="clipboard-write; payment"
        />
      </DialogContent>
    </Dialog>
  );
};

export default DashboardModal;
