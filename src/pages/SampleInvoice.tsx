import { Button } from "@/components/ui/button";
import { generateInvoice } from "@/lib/generateInvoice";
import { FileDown } from "lucide-react";

const SampleInvoice = () => {
  const handleDownload = async (total: number, planName: string, vehicles: number) => {
    const subtotal = Math.round(total / 1.18);
    const gstAmount = total - subtotal;
    await generateInvoice({
      txnid: `SAMPLE-${planName.replace(/\s/g, '-').toUpperCase()}`,
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
      planName,
      vehicleCount: vehicles,
      quantity: 1,
      unitPrice: subtotal,
      subtotal,
      gstAmount,
      total,
    });
  };

  const plans = [
    { name: 'Starter', total: 999, vehicles: 1 },
    { name: 'Business Basic', total: 1600, vehicles: 2 },
    { name: 'Business Pro', total: 3749, vehicles: 5 },
    { name: 'Corporate', total: 6999, vehicles: 10 },
  ];

  const handleLongAddressTest = async () => {
    const subtotal = Math.round(3749 / 1.18);
    const gstAmount = 3749 - subtotal;
    await generateInvoice({
      txnid: 'SAMPLE-LONG-ADDRESS',
      name: 'Mohammed Abdul Rehman Khan',
      address: 'Prestige Minera, No.6, 3rd Floor, Main Guard Cross Road, Near Shivaji Nagar Bus Station, Opposite to Commercial Street',
      city: 'Bengaluru',
      state: 'Maharashtra',
      pincode: '560001',
      phone: '9876543210',
      email: 'mohammed@longcompanyname.com',
      companyName: 'Mohammed Abdul Rehman Khan Transportation & Logistics Services Private Limited',
      gst: '27ABCDE1234F1Z5',
      productType: 'sticker',
      planName: 'Business Pro',
      vehicleCount: 5,
      quantity: 1,
      unitPrice: subtotal,
      subtotal,
      gstAmount,
      total: 3749,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-2xl font-bold text-foreground">Sample Invoice Preview</h1>
        <p className="text-muted-foreground">Download sample invoices for each plan to verify breakdowns.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          {plans.map((p) => (
            <Button key={p.name} onClick={() => handleDownload(p.total, p.name, p.vehicles)} size="lg" className="gap-2">
              <FileDown className="w-5 h-5" />
              {p.name} (₹{p.total})
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SampleInvoice;
