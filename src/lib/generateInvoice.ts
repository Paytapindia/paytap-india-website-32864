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

  // ── Line Items Table (GST-compliant format) ──
  const tableLeft = margin;
  const tableRight = pageWidth - margin;
  const tableWidth = tableRight - tableLeft;

  // Column positions (left edges)
  const col = {
    sr:    tableLeft,
    hsn:   tableLeft + 10,
    desc:  tableLeft + 24,
    uom:   tableLeft + 72,
    qty:   tableLeft + 82,
    rate:  tableLeft + 92,
    gross: tableLeft + 108,
    dis:   tableLeft + 124,
    taxable: tableLeft + 134,
    cgstR: tableLeft + 152,
    cgstA: tableLeft + 160,
    sgstR: tableLeft + 170,
    sgstA: tableLeft + 178,
  };
  const colEnd = tableRight;

  // Per-line tax calculations
  const activationGross = activationAmount;
  const amcGross = amcAmount;
  const activationTaxable = activationAmount;
  const amcTaxable = amcAmount;
  const discountTaxable = discountPreTax;

  const cgstPct = isInterState ? 0 : 9;
  const sgstPct = isInterState ? 0 : 9;
  const igstPct = isInterState ? 18 : 0;

  const activationCgst = round2(activationTaxable * cgstPct / 100);
  const activationSgst = round2(activationTaxable * sgstPct / 100);
  const activationIgst = round2(activationTaxable * igstPct / 100);

  const amcCgst = round2(amcTaxable * cgstPct / 100);
  const amcSgst = round2(amcTaxable * sgstPct / 100);
  const amcIgst = round2(amcTaxable * igstPct / 100);

  const discountCgst = discountPreTax > 0 ? round2(discountTaxable * cgstPct / 100) : 0;
  const discountSgst = discountPreTax > 0 ? round2(discountTaxable * sgstPct / 100) : 0;
  const discountIgst = discountPreTax > 0 ? round2(discountTaxable * igstPct / 100) : 0;

  // Draw table border helper
  const drawHLine = (atY: number) => {
    doc.setDrawColor(lineColor);
    doc.setLineWidth(0.3);
    doc.line(tableLeft, atY, tableRight, atY);
  };

  const drawVLines = (topY: number, bottomY: number) => {
    doc.setDrawColor(lineColor);
    doc.setLineWidth(0.2);
    const vLines = [col.sr, col.hsn, col.desc, col.uom, col.qty, col.rate, col.gross, col.dis, col.taxable, col.cgstR, col.sgstR, colEnd];
    // Add IGST column separator if inter-state
    if (isInterState) {
      // For inter-state, we repurpose CGST/SGST columns but still draw separators
    }
    for (const x of vLines) {
      doc.line(x, topY, x, bottomY);
    }
    // Sub-dividers for CGST (Rate|Amt) and SGST (Rate|Amt)
    doc.line(col.cgstA, topY, col.cgstA, bottomY);
    doc.line(col.sgstA, topY, col.sgstA, bottomY);
  };

  // ── Table Header Row 1 ──
  drawHLine(y);
  const headerTop = y;
  y += 4;

  doc.setFontSize(6);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(dark);

  doc.text('Sr.', col.sr + 1, y);
  doc.text('HSN/SAC', col.hsn + 1, y);
  doc.text('Description of Service/Goods', col.desc + 1, y);
  doc.text('UOM', col.uom + 1, y);
  doc.text('Qty.', col.qty + 1, y);
  doc.text('Rate', col.rate + 1, y);
  doc.text('Gross', col.gross + 1, y);
  doc.text('Dis.', col.dis + 1, y);
  doc.text('Taxable', col.taxable + 1, y);

  if (isInterState) {
    const igstMid = col.cgstR + (colEnd - col.cgstR) / 2;
    doc.text('IGST', igstMid, y, { align: 'center' });
  } else {
    const cgstMid = col.cgstR + (col.sgstR - col.cgstR) / 2;
    const sgstMid = col.sgstR + (colEnd - col.sgstR) / 2;
    doc.text('CGST', cgstMid, y, { align: 'center' });
    doc.text('SGST', sgstMid, y, { align: 'center' });
  }

  y += 3;
  // Second header line
  doc.text('No.', col.sr + 1, y);
  doc.text('', col.hsn + 1, y);
  doc.text('', col.desc + 1, y);
  doc.text('', col.uom + 1, y);
  doc.text('', col.qty + 1, y);
  doc.text('(₹)', col.rate + 1, y);
  doc.text('Value', col.gross + 1, y);
  doc.text('(₹)', col.dis + 1, y);
  doc.text('Value', col.taxable + 1, y);

  if (isInterState) {
    doc.text('Rate', col.cgstR + 1, y);
    doc.text('Amt', col.cgstA + 1, y);
  } else {
    doc.text('Rate', col.cgstR + 1, y);
    doc.text('Amt', col.cgstA + 1, y);
    doc.text('Rate', col.sgstR + 1, y);
    doc.text('Amt', col.sgstA + 1, y);
  }

  y += 2;
  drawHLine(y);

  const dataStartY = y;

  // ── Helper to draw a data row ──
  const rowHeight = 6;
  const drawDataRow = (
    sr: string, hsn: string, desc: string, uom: string, qty: string,
    rate: string, gross: string, dis: string, taxable: string,
    cR: string, cA: string, sR: string, sA: string
  ) => {
    y += rowHeight;
    doc.setFontSize(6);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(dark);

    doc.text(sr, col.sr + 5, y, { align: 'center' });
    doc.text(hsn, col.hsn + 1, y);

    // Wrap description within column width
    const descMaxW = col.uom - col.desc - 2;
    const descLines: string[] = doc.splitTextToSize(desc, descMaxW);
    doc.text(descLines[0] || '', col.desc + 1, y);
    if (descLines.length > 1) {
      for (let i = 1; i < descLines.length; i++) {
        doc.text(descLines[i], col.desc + 1, y + i * 3);
      }
    }

    doc.text(uom, col.uom + 1, y);
    // Right-align numeric columns
    doc.text(qty, col.rate - 1, y, { align: 'right' });
    doc.text(rate, col.gross - 1, y, { align: 'right' });
    doc.text(gross, col.dis - 1, y, { align: 'right' });
    doc.text(dis, col.taxable - 1, y, { align: 'right' });
    doc.text(taxable, col.cgstR - 1, y, { align: 'right' });

    if (isInterState) {
      doc.text(cR, col.cgstA - 1, y, { align: 'right' });
      doc.text(cA, colEnd - 1, y, { align: 'right' });
    } else {
      doc.text(cR, col.cgstA - 1, y, { align: 'right' });
      doc.text(cA, col.sgstR - 1, y, { align: 'right' });
      doc.text(sR, col.sgstA - 1, y, { align: 'right' });
      doc.text(sA, colEnd - 1, y, { align: 'right' });
    }

    // If description wrapped, account for extra height
    if (descLines.length > 1) {
      y += (descLines.length - 1) * 3;
    }
  };

  const vehicleLabel = vehicles === 1 ? '1 Vehicle' : `${vehicles} Vehicles`;

  // Row 1: Activation
  drawDataRow(
    '1', '997159',
    `PayTap NFC Tag Activation & Installation Charges - ${vehicleLabel}`,
    'Nos.', String(vehicles),
    formatINR(activationRate), formatINR(activationGross), '-', formatINR(activationTaxable),
    isInterState ? `${igstPct}%` : `${cgstPct}%`,
    isInterState ? formatINR(activationIgst) : formatINR(activationCgst),
    isInterState ? '' : `${sgstPct}%`,
    isInterState ? '' : formatINR(activationSgst)
  );

  // Row 2: AMC
  drawDataRow(
    '2', '998313',
    'Annual Maintenance Charges (AMC)',
    'Nos.', '1',
    formatINR(amcRate), formatINR(amcGross), '-', formatINR(amcTaxable),
    isInterState ? `${igstPct}%` : `${cgstPct}%`,
    isInterState ? formatINR(amcIgst) : formatINR(amcCgst),
    isInterState ? '' : `${sgstPct}%`,
    isInterState ? '' : formatINR(amcSgst)
  );

  // Row 3: Discount (if applicable)
  if (discountPreTax > 0) {
    drawDataRow(
      '3', '-',
      'Discount',
      'Nos.', '1',
      `-${formatINR(discountPreTax)}`, `-${formatINR(discountPreTax)}`, '-', `-${formatINR(discountTaxable)}`,
      isInterState ? `${igstPct}%` : `${cgstPct}%`,
      isInterState ? `-${formatINR(discountIgst)}` : `-${formatINR(discountCgst)}`,
      isInterState ? '' : `${sgstPct}%`,
      isInterState ? '' : `-${formatINR(discountSgst)}`
    );
  }

  // ── Total Row ──
  y += 2;
  drawHLine(y);
  y += 5;

  const totalGross = round2(activationGross + amcGross - (discountPreTax > 0 ? discountPreTax : 0));
  const totalTaxable = subtotalPreTax;
  const totalCgst = round2(activationCgst + amcCgst - discountCgst);
  const totalSgst = round2(activationSgst + amcSgst - discountSgst);
  const totalIgst = round2(activationIgst + amcIgst - discountIgst);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(dark);
  doc.setFontSize(6);
  doc.text('Total', col.desc + 1, y);
  doc.text(formatINR(totalGross), col.dis - 1, y, { align: 'right' });
  doc.text('-', col.taxable - 1, y, { align: 'right' });
  doc.text(formatINR(totalTaxable), col.cgstR - 1, y, { align: 'right' });

  if (isInterState) {
    doc.text(formatINR(totalIgst), colEnd - 1, y, { align: 'right' });
  } else {
    doc.text(formatINR(totalCgst), col.sgstR - 1, y, { align: 'right' });
    doc.text(formatINR(totalSgst), colEnd - 1, y, { align: 'right' });
  }

  y += 2;
  drawHLine(y);
  const tableBottomY = y;

  // Draw all vertical lines spanning the table
  drawVLines(headerTop, tableBottomY);

  y += 8;

  // ── Total in Words ──
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(gray);
  const totalWords = numberToWords(grandTotal);
  doc.text(`Total In Words: Indian Rupees ${totalWords} Only`, margin, y);
  y += 8;

  // ── Grand Total ──
  const totalsX = pageWidth - margin;
  const labelX = totalsX - 60;

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(gray);
  doc.setFontSize(8);

  // Round Off line (only if non-zero)
  if (Math.abs(roundOff) >= 0.01) {
    doc.text('Round Off:', labelX, y, { align: 'right' });
    doc.text((roundOff >= 0 ? '+' : '') + formatINR(roundOff), totalsX, y, { align: 'right' });
    y += 5;
  }

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(dark);
  doc.setFontSize(10);
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
