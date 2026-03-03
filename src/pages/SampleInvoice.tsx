import { Button } from "@/components/ui/button";
import { generateInvoice } from "@/lib/generateInvoice";
import { FileDown } from "lucide-react";

const SampleInvoice = () => {
  const handleDownload = async () => {
    await generateInvoice({
      txnid: "SAMPLE-2025-001",
      name: "Rahul Sharma",
      address: "42, MG Road, Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038",
      phone: "9876543210",
      email: "rahul@example.com",
      pan: "ABCDE1234F",
      companyName: "Sharma Fleet Services Pvt Ltd",
      gst: "29ABCDE1234F1Z5",
      productType: "sticker",
      planName: "Business Pro",
      quantity: 5,
      unitPrice: 999,
      subtotal: 4995,
      gstAmount: 899.10,
      total: 5894.10,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-2xl font-bold text-foreground">Sample Invoice Preview</h1>
        <p className="text-muted-foreground">Click below to download a sample tax invoice PDF with the Paytap logo.</p>
        <Button onClick={handleDownload} size="lg" className="gap-2">
          <FileDown className="w-5 h-5" />
          Download Sample Invoice
        </Button>
      </div>
    </div>
  );
};

export default SampleInvoice;
