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
  stateCode: '29',
  phone: '9900010964',
  email: 'support@paytap.co.in',
  website: 'www.paytap.co.in',
};

// Plan breakdowns: GST-inclusive amounts (base price before discount)
const PLAN_BREAKDOWNS: Record<number, { amcInclGst: number; perUnitActivation: number; vehicles: number; discountInclGst: number }> = {
  999:  { amcInclGst: 300,  perUnitActivation: 700,  vehicles: 1,  discountInclGst: 1 },
  1600: { amcInclGst: 300,  perUnitActivation: 650,  vehicles: 2,  discountInclGst: 0 },
  3749: { amcInclGst: 1250, perUnitActivation: 500,  vehicles: 5,  discountInclGst: 1 },
  6999: { amcInclGst: 2400, perUnitActivation: 460,  vehicles: 10, discountInclGst: 1 },
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

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

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
  const now = new Date();
  const invoiceNo = `INV-${data.txnid}`;
  const isInterState = data.state !== 'Karnataka';
  const grandTotal = data.total;

  const dark = '#021a42';
  const gray = '#666666';
  const lineColor = '#cccccc';

  // ── Bottom-Up Calculation ──
  const breakdown = PLAN_BREAKDOWNS[grandTotal];
  let perUnitActivation: number;
  let amcInclGst: number;
  let vehicles: number;
  let discountInclGst = 0;

  if (breakdown) {
    perUnitActivation = breakdown.perUnitActivation;
    amcInclGst = breakdown.amcInclGst;
    vehicles = breakdown.vehicles;
    discountInclGst = breakdown.discountInclGst;
  } else {
    amcInclGst = Math.round(grandTotal * 0.3);
    vehicles = data.vehicleCount;
    perUnitActivation = (grandTotal - amcInclGst) / vehicles;
  }

  // Rate = round(perUnitInclGst / 1.18, 2) — per-unit pre-tax
  const activationRate = round2(perUnitActivation / 1.18);
  const amcRate = round2(amcInclGst / 1.18);
  const discountPreTax = discountInclGst > 0 ? round2(discountInclGst / 1.18) : 0;

  // Amount = Rate × Qty (always exact multiplication)
  const activationAmount = round2(activationRate * vehicles);
  const amcAmount = round2(amcRate * 1);

  // Subtotal = sum of line amounts minus discount
  const subtotalPreTax = round2(activationAmount + amcAmount - discountPreTax);

  // GST from subtotal
  let cgst = 0, sgst = 0, igst = 0;
  if (isInterState) {
    igst = round2(subtotalPreTax * 0.18);
  } else {
    cgst = round2(subtotalPreTax * 0.09);
    sgst = round2(subtotalPreTax * 0.09);
  }

  const calculatedTotal = round2(subtotalPreTax + cgst + sgst + igst);
  const roundOff = round2(grandTotal - calculatedTotal);

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
  doc.text(`GSTIN: ${COMPANY.gstin} | State Code: ${COMPANY.stateCode}`, margin, y + 34);
  doc.text(COMPANY.phone, margin, y + 38);

  // Right side - TAX INVOICE
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
  doc.text(`Reverse Charge: No`, detailsX, y + 18, { align: 'right' });

  y += 25;

  // ── Bill To / Ship To ──
  doc.setDrawColor(lineColor);
  doc.line(margin, y, pageWidth - margin, y);
  y += 5;

  const contentWidth = pageWidth - margin * 2;
  const columnGap = 8;
  const columnWidth = (contentWidth - columnGap) / 2;
  const lineHeight = 4;

  // Helper: draw wrapped text lines, returns new Y cursor
  function drawWrapped(text: string, x: number, startY: number, maxWidth: number, font: 'normal' | 'bold' = 'normal', color: string = gray): number {
    doc.setFont('helvetica', font);
    doc.setTextColor(color);
    const lines: string[] = doc.splitTextToSize(text, maxWidth);
    for (const line of lines) {
      doc.text(line, x, startY);
      startY += lineHeight;
    }
    return startY;
  }

  // Draw one address column, returns final Y
  function drawAddressBlock(label: string, x: number, startY: number, maxW: number): number {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(dark);
    doc.text(label, x, startY);

    doc.setFontSize(8);
    let curY = startY + 5;

    const primaryName = data.companyName || data.name;
    curY = drawWrapped(primaryName, x, curY, maxW, 'bold', dark);

    if (data.address) {
      curY = drawWrapped(data.address, x, curY, maxW);
    }
    const cityLine = [data.city, data.state, data.pincode].filter(Boolean).join(', ');
    if (cityLine) {
      curY = drawWrapped(cityLine, x, curY, maxW);
    }
    if (data.gst) {
      curY = drawWrapped(`GSTIN: ${data.gst}`, x, curY, maxW);
    } else if (data.pan) {
      curY = drawWrapped(`PAN: ${data.pan}`, x, curY, maxW);
    }
    return curY;
  }

  const billEndY = drawAddressBlock('Bill To', margin, y, columnWidth);
  const shipX = margin + columnWidth + columnGap;
  const shipEndY = drawAddressBlock('Ship To', shipX, y, columnWidth);

  y = Math.max(billEndY, shipEndY) + 6;

  // ── Line Items Table ──
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

  const gstRate = 18;
  const vehicleLabel = vehicles === 1 ? '1 Vehicle' : `${vehicles} Vehicles`;

  // ── Line 1: Activation ──
  const itemMaxWidth = colX.hsn - colX.item - 2;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(gray);
  const activationDesc = `PayTap NFC Tag Activation & Installation Charges – ${vehicleLabel}`;
  const activationLines: string[] = doc.splitTextToSize(activationDesc, itemMaxWidth);
  doc.text(activationLines, colX.item, y);
  doc.text('997159', colX.hsn, y);
  doc.text(String(vehicles), colX.qty, y);
  doc.text(formatINR(activationRate), colX.rate, y);
  doc.text(`${gstRate}%`, colX.pct, y);
  doc.text(formatINR(activationAmount), colX.amount, y, { align: 'right' });

  y += Math.max(7, activationLines.length * 4 + 3);

  // ── Line 2: AMC ──
  doc.text('Annual Maintenance Charges (AMC)', colX.item, y);
  doc.text('998313', colX.hsn, y);
  doc.text('1', colX.qty, y);
  doc.text(formatINR(amcRate), colX.rate, y);
  doc.text(`${gstRate}%`, colX.pct, y);
  doc.text(formatINR(amcAmount), colX.amount, y, { align: 'right' });

  // ── Line 3: Discount (only if applicable) ──
  if (discountPreTax > 0) {
    y += 7;
    doc.text('Discount', colX.item, y);
    doc.text('—', colX.hsn, y);
    doc.text('1', colX.qty, y);
    doc.text(`-${formatINR(discountPreTax)}`, colX.rate, y);
    doc.text(`${gstRate}%`, colX.pct, y);
    doc.text(`-${formatINR(discountPreTax)}`, colX.amount, y, { align: 'right' });
  }

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
  doc.text(formatINR(subtotalPreTax), totalsX, y, { align: 'right' });
  y += 5;

  if (isInterState) {
    doc.text(`IGST (18%):`, labelX, y, { align: 'right' });
    doc.text(formatINR(igst), totalsX, y, { align: 'right' });
    y += 5;
  } else {
    doc.text(`CGST (9%):`, labelX, y, { align: 'right' });
    doc.text(formatINR(cgst), totalsX, y, { align: 'right' });
    y += 5;
    doc.text(`SGST (9%):`, labelX, y, { align: 'right' });
    doc.text(formatINR(sgst), totalsX, y, { align: 'right' });
    y += 5;
  }

  // Round Off line (only if non-zero)
  if (Math.abs(roundOff) >= 0.01) {
    doc.text('Round Off:', labelX, y, { align: 'right' });
    doc.text((roundOff >= 0 ? '+' : '') + formatINR(roundOff), totalsX, y, { align: 'right' });
    y += 5;
  }

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(dark);
  doc.text('Total:', labelX, y, { align: 'right' });
  doc.text(`₹${formatINR(grandTotal)}`, totalsX, y, { align: 'right' });
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
  doc.text('This is a computer-generated invoice and does not require a physical signature.', pageWidth / 2, y, { align: 'center' });

  doc.save(`${invoiceNo}.pdf`);
}
