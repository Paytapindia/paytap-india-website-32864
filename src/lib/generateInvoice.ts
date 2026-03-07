import { jsPDF } from 'jspdf';

export interface InvoiceData {
  txnid: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  pan?: string;
  gst?: string;
  companyName?: string;
  productType: 'sticker' | 'card';
  planName: string;
  vehicleCount: number;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  gstAmount: number;
  total: number;
}

const COMPANY = {
  name: 'DRIVETAP INNOVATION INDIA PRIVATE LIMITED',
  address: 'Level 15, Concorde Towers No 1',
  address2: 'UB City, Vittal Mallya Road, Rajbhavan',
  city: 'Bengaluru Karnataka 560001',
  country: 'India',
  gstin: '29AALCD4626M1Z3',
  phone: '9900010964',
  email: 'support@paytap.co.in',
  website: 'www.paytap.co.in',
};

function numberToWords(num: number): string {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  if (num === 0) return 'Zero';
  if (num < 20) return ones[num];
  if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + ones[num % 10] : '');
  if (num < 1000) return ones[Math.floor(num / 100)] + ' Hundred' + (num % 100 ? ' ' + numberToWords(num % 100) : '');
  if (num < 100000) return numberToWords(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 ? ' ' + numberToWords(num % 1000) : '');
  if (num < 10000000) return numberToWords(Math.floor(num / 100000)) + ' Lakh' + (num % 100000 ? ' ' + numberToWords(num % 100000) : '');
  return numberToWords(Math.floor(num / 10000000)) + ' Crore' + (num % 10000000 ? ' ' + numberToWords(num % 10000000) : '');
}

function formatDate(date: Date): string {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function formatINR(n: number): string {
  return n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Map state to place of supply code (simplified)
function getPlaceOfSupply(state: string): string {
  const codes: Record<string, string> = {
    'Andhra Pradesh': '37', 'Arunachal Pradesh': '12', 'Assam': '18', 'Bihar': '10',
    'Chhattisgarh': '22', 'Delhi': '07', 'Goa': '30', 'Gujarat': '24',
    'Haryana': '06', 'Himachal Pradesh': '02', 'Jharkhand': '20', 'Karnataka': '29',
    'Kerala': '32', 'Madhya Pradesh': '23', 'Maharashtra': '27', 'Manipur': '14',
    'Meghalaya': '17', 'Mizoram': '15', 'Nagaland': '13', 'Odisha': '21',
    'Punjab': '03', 'Rajasthan': '08', 'Sikkim': '11', 'Tamil Nadu': '33',
    'Telangana': '36', 'Tripura': '16', 'Uttar Pradesh': '09', 'Uttarakhand': '05',
    'West Bengal': '19', 'Jammu and Kashmir': '01', 'Ladakh': '38',
    'Chandigarh': '04', 'Puducherry': '34', 'Andaman and Nicobar Islands': '35',
    'Dadra and Nagar Haveli and Daman and Diu': '26', 'Lakshadweep': '31',
  };
  return `${state} (${codes[state] || '00'})`;
}

// Logo fetcher with caching
let logoCached: string | null = null;
async function getLogoBase64(): Promise<string> {
  if (logoCached) return logoCached;
  const res = await fetch('/images/paytap-logo-invoice.png');
  const blob = await res.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      logoCached = reader.result as string;
      resolve(logoCached);
    };
    reader.readAsDataURL(blob);
  });
}

export async function generateInvoice(data: InvoiceData): Promise<void> {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = 210;
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  const now = new Date();
  const invoiceNo = `INV-${data.txnid}`;
  const isInterState = data.state !== 'Karnataka';

  const dark = '#021a42';
  const gray = '#666666';
  const lineColor = '#cccccc';

  // Use passed-in values to avoid rounding discrepancies
  const planPrice = data.subtotal;
  const grandTotal = data.total;
  const gstTotal = grandTotal - planPrice;

  let y = margin;

  // ── Header with Logo ──
  try {
    const logoBase64 = await getLogoBase64();
    doc.addImage(logoBase64, 'PNG', margin, y - 2, 35, 12);
  } catch {
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(dark);
    doc.text('Paytap', margin, y + 5);
  }

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(dark);
  doc.text(COMPANY.name, margin, y + 12);
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(gray);
  doc.setFontSize(8);
  doc.text(COMPANY.address, margin, y + 17);
  doc.text(COMPANY.address2, margin, y + 21);
  doc.text(COMPANY.city, margin, y + 25);
  doc.text(COMPANY.country, margin, y + 29);
  doc.text(`GSTIN ${COMPANY.gstin}`, margin, y + 34);
  doc.text(COMPANY.phone, margin, y + 38);

  // Right side - TAX INVOICE + contact
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(dark);
  doc.text('TAX INVOICE', pageWidth - margin, y + 5, { align: 'right' });

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(gray);
  doc.text(COMPANY.email, pageWidth - margin, y + 12, { align: 'right' });
  doc.text(COMPANY.website, pageWidth - margin, y + 16, { align: 'right' });

  y += 44;

  // ── Separator ──
  doc.setDrawColor(lineColor);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  // ── Invoice Details ──
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(dark);
  doc.text(`# ${invoiceNo}`, margin, y);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(gray);
  const detailsX = pageWidth - margin;
  doc.text(`Place Of Supply: ${getPlaceOfSupply(data.state)}`, detailsX, y - 2, { align: 'right' });
  doc.text(`Invoice Date: ${formatDate(now)}`, detailsX, y + 3, { align: 'right' });
  doc.text(`Terms: Due on Receipt`, detailsX, y + 8, { align: 'right' });
  doc.text(`Due Date: ${formatDate(now)}`, detailsX, y + 13, { align: 'right' });

  y += 20;

  // ── Bill To / Ship To ──
  doc.setDrawColor(lineColor);
  doc.line(margin, y, pageWidth - margin, y);
  y += 5;

  const halfWidth = contentWidth / 2;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(dark);
  doc.text('Bill To', margin, y);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(gray);
  let billY = y + 5;
  if (data.companyName) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(dark);
    doc.text(data.companyName, margin, billY);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(gray);
    billY += 4;
  } else {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(dark);
    doc.text(data.name, margin, billY);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(gray);
    billY += 4;
  }
  doc.text(data.address, margin, billY); billY += 4;
  doc.text(`${data.city} ${data.state}`, margin, billY); billY += 4;
  doc.text(`${data.pincode} ${data.state}`, margin, billY); billY += 4;
  if (data.gst) {
    doc.text(`GSTIN ${data.gst}`, margin, billY); billY += 4;
  } else if (data.pan) {
    doc.text(`PAN ${data.pan}`, margin, billY); billY += 4;
  }

  const shipX = margin + halfWidth + 5;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(dark);
  doc.text('Ship To', shipX, y);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(gray);
  let shipY = y + 5;
  if (data.gst) {
    doc.text(`GSTIN ${data.gst}`, shipX, shipY); shipY += 4;
  } else if (data.pan) {
    doc.text(`PAN ${data.pan}`, shipX, shipY); shipY += 4;
  }

  y = Math.max(billY, shipY) + 6;

  // ── Line Items Table (no Tax column — tax shown only in summary) ──
  doc.setDrawColor(lineColor);
  doc.line(margin, y, pageWidth - margin, y);

  const colX = {
    item: margin + 1,
    hsn: margin + 85,
    qty: margin + 110,
    rate: margin + 125,
    pct: margin + 148,
    amount: pageWidth - margin - 1,
  };

  y += 5;
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(dark);
  doc.text('Item & Description', colX.item, y);
  doc.text('HSN/SAC', colX.hsn, y);
  doc.text('Qty', colX.qty, y);
  doc.text('Rate', colX.rate, y);
  doc.text('Tax %', colX.pct, y);
  doc.text('Amount', colX.amount, y, { align: 'right' });

  y += 3;
  doc.line(margin, y, pageWidth - margin, y);
  y += 5;

  // Item name reflects the vehicle activation plan
  const vehicleLabel = data.vehicleCount === 1 ? '1 Vehicle' : `${data.vehicleCount} Vehicles`;
  const itemName = `PayTap Vehicle Activation Plan – ${vehicleLabel}`;
  const hsnCode = '997159';
  const gstRate = 18;

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(gray);
  doc.text(itemName, colX.item, y);
  doc.text(hsnCode, colX.hsn, y);
  doc.text('1', colX.qty, y);
  doc.text(formatINR(planPrice), colX.rate, y);
  doc.text(`${gstRate}%`, colX.pct, y);
  doc.text(formatINR(planPrice), colX.amount, y, { align: 'right' });

  y += 8;
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // ── Total in Words ──
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(gray);
  const totalWords = numberToWords(grandTotal);
  doc.text(`Total In Words: Indian Rupees ${totalWords} Only`, margin, y);
  y += 10;

  // ── Totals ──
  const totalsX = pageWidth - margin;
  const labelX = totalsX - 60;

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(gray);
  doc.setFontSize(8);

  doc.text('Sub Total:', labelX, y, { align: 'right' });
  doc.text(formatINR(planPrice), totalsX, y, { align: 'right' });
  y += 5;

  if (isInterState) {
    doc.text(`IGST (18%):`, labelX, y, { align: 'right' });
    doc.text(formatINR(gstTotal), totalsX, y, { align: 'right' });
  } else {
    const halfGst = Math.round(gstTotal / 2);
    doc.text(`CGST (9%):`, labelX, y, { align: 'right' });
    doc.text(formatINR(halfGst), totalsX, y, { align: 'right' });
    y += 5;
    doc.text(`SGST (9%):`, labelX, y, { align: 'right' });
    doc.text(formatINR(halfGst), totalsX, y, { align: 'right' });
  }
  y += 5;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(dark);
  doc.text('Total:', labelX, y, { align: 'right' });
  doc.text(`₹${formatINR(grandTotal)}`, totalsX, y, { align: 'right' });
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(gray);
  doc.text('Payment Made:', labelX, y, { align: 'right' });
  doc.text(`(-) ${formatINR(grandTotal)}`, totalsX, y, { align: 'right' });
  y += 5;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(dark);
  doc.text('Balance Due:', labelX, y, { align: 'right' });
  doc.text('₹0.00', totalsX, y, { align: 'right' });
  y += 15;

  // ── Footer ──
  doc.setDrawColor(lineColor);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(gray);
  doc.text('Authorized Signature', pageWidth - margin, y, { align: 'right' });
  y += 15;

  doc.setFontSize(7);
  doc.text('This is a computer-generated invoice, no signature required.', pageWidth / 2, y, { align: 'center' });

  doc.save(`${invoiceNo}.pdf`);
}
