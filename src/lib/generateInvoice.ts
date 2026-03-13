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

// ── Column schema: width-based layout ──
// Each column defined by its width in mm. Total must equal tableWidth (180mm for A4 with 15mm margins).
// For intra-state (CGST+SGST): 4 tax sub-columns
// For inter-state (IGST): 2 tax sub-columns (wider)

interface ColDef {
  key: string;
  width: number;
  align: 'left' | 'center' | 'right';
  headerLine1: string;
  headerLine2: string;
}

function buildColumns(isInterState: boolean): ColDef[] {
  if (isInterState) {
    return [
      { key: 'sr',       width: 7,   align: 'center', headerLine1: 'Sr.',       headerLine2: 'No.' },
      { key: 'hsn',      width: 14,  align: 'left',   headerLine1: 'HSN/SAC',   headerLine2: '' },
      { key: 'desc',     width: 44,  align: 'left',   headerLine1: 'Description', headerLine2: '' },
      { key: 'uom',      width: 10,  align: 'center', headerLine1: 'UOM',       headerLine2: '' },
      { key: 'qty',      width: 8,   align: 'right',  headerLine1: 'Qty.',      headerLine2: '' },
      { key: 'rate',     width: 16,  align: 'right',  headerLine1: 'Rate',      headerLine2: '(₹)' },
      { key: 'gross',    width: 16,  align: 'right',  headerLine1: 'Gross',     headerLine2: 'Value' },
      { key: 'dis',      width: 10,  align: 'right',  headerLine1: 'Dis.',      headerLine2: '(₹)' },
      { key: 'taxable',  width: 18,  align: 'right',  headerLine1: 'Taxable',   headerLine2: 'Value' },
      { key: 'igstRate', width: 13,  align: 'center', headerLine1: 'IGST',      headerLine2: 'Rate' },
      { key: 'igstAmt',  width: 24,  align: 'right',  headerLine1: '',          headerLine2: 'Amt' },
    ];
  } else {
    return [
      { key: 'sr',       width: 7,   align: 'center', headerLine1: 'Sr.',       headerLine2: 'No.' },
      { key: 'hsn',      width: 14,  align: 'left',   headerLine1: 'HSN/SAC',   headerLine2: '' },
      { key: 'desc',     width: 40,  align: 'left',   headerLine1: 'Description', headerLine2: '' },
      { key: 'uom',      width: 10,  align: 'center', headerLine1: 'UOM',       headerLine2: '' },
      { key: 'qty',      width: 8,   align: 'right',  headerLine1: 'Qty.',      headerLine2: '' },
      { key: 'rate',     width: 15,  align: 'right',  headerLine1: 'Rate',      headerLine2: '(₹)' },
      { key: 'gross',    width: 15,  align: 'right',  headerLine1: 'Gross',     headerLine2: 'Value' },
      { key: 'dis',      width: 10,  align: 'right',  headerLine1: 'Dis.',      headerLine2: '(₹)' },
      { key: 'taxable',  width: 16,  align: 'right',  headerLine1: 'Taxable',   headerLine2: 'Value' },
      { key: 'cgstRate', width: 10,  align: 'center', headerLine1: 'CGST',      headerLine2: 'Rate' },
      { key: 'cgstAmt',  width: 13,  align: 'right',  headerLine1: '',          headerLine2: 'Amt' },
      { key: 'sgstRate', width: 10,  align: 'center', headerLine1: 'SGST',      headerLine2: 'Rate' },
      { key: 'sgstAmt',  width: 12,  align: 'right',  headerLine1: '',          headerLine2: 'Amt' },
    ];
  }
}

interface ColLayout {
  key: string;
  left: number;
  width: number;
  right: number;
  align: 'left' | 'center' | 'right';
  headerLine1: string;
  headerLine2: string;
}

function computeLayout(columns: ColDef[], tableLeft: number): ColLayout[] {
  let x = tableLeft;
  return columns.map(c => {
    const layout: ColLayout = {
      key: c.key,
      left: x,
      width: c.width,
      right: x + c.width,
      align: c.align,
      headerLine1: c.headerLine1,
      headerLine2: c.headerLine2,
    };
    x += c.width;
    return layout;
  });
}

// Safe cell text renderer — clips/shrinks text to fit within cell
function drawCell(
  doc: jsPDF,
  text: string,
  col: ColLayout,
  y: number,
  options?: { fontSize?: number; fontStyle?: 'normal' | 'bold'; color?: string; padding?: number }
) {
  const pad = options?.padding ?? 1.5;
  const fontSize = options?.fontSize ?? 6;
  const fontStyle = options?.fontStyle ?? 'normal';
  const color = options?.color ?? '#021a42';

  doc.setFontSize(fontSize);
  doc.setFont('helvetica', fontStyle);
  doc.setTextColor(color);

  const availableWidth = col.width - pad * 2;

  // Check if text fits, shrink font if needed (minimum 4.5pt)
  let usedFontSize = fontSize;
  let textWidth = doc.getTextWidth(text);
  while (textWidth > availableWidth && usedFontSize > 4.5) {
    usedFontSize -= 0.5;
    doc.setFontSize(usedFontSize);
    textWidth = doc.getTextWidth(text);
  }

  // Compute x position based on alignment
  let x: number;
  if (col.align === 'right') {
    x = col.right - pad;
  } else if (col.align === 'center') {
    x = col.left + col.width / 2;
  } else {
    x = col.left + pad;
  }

  const alignOpt: 'left' | 'center' | 'right' = col.align;
  doc.text(text, x, y, { align: alignOpt });
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

  const activationRate = round2(perUnitActivation / 1.18);
  const amcRate = round2(amcInclGst / 1.18);
  const discountPreTax = discountInclGst > 0 ? round2(discountInclGst / 1.18) : 0;

  const activationAmount = round2(activationRate * vehicles);
  const amcAmount = round2(amcRate * 1);

  const subtotalPreTax = round2(activationAmount + amcAmount - discountPreTax);

  let cgst = 0, sgst = 0, igst = 0;
  if (isInterState) {
    igst = round2(subtotalPreTax * 0.18);
  } else {
    cgst = round2(subtotalPreTax * 0.09);
    sgst = round2(subtotalPreTax * 0.09);
  }

  const calculatedTotal = round2(subtotalPreTax + cgst + sgst + igst);
  const roundOff = round2(grandTotal - calculatedTotal);

  const cgstPct = isInterState ? 0 : 9;
  const sgstPct = isInterState ? 0 : 9;
  const igstPct = isInterState ? 18 : 0;

  const activationCgst = round2(activationAmount * cgstPct / 100);
  const activationSgst = round2(activationAmount * sgstPct / 100);
  const activationIgst = round2(activationAmount * igstPct / 100);

  const amcCgst = round2(amcAmount * cgstPct / 100);
  const amcSgst = round2(amcAmount * sgstPct / 100);
  const amcIgst = round2(amcAmount * igstPct / 100);

  const discountTaxable = discountPreTax;
  const discountCgst = discountPreTax > 0 ? round2(discountTaxable * cgstPct / 100) : 0;
  const discountSgst = discountPreTax > 0 ? round2(discountTaxable * sgstPct / 100) : 0;
  const discountIgst = discountPreTax > 0 ? round2(discountTaxable * igstPct / 100) : 0;

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

  // ═══════════════════════════════════════════════════════
  // ── LINE ITEMS TABLE (width-based column layout) ──
  // ═══════════════════════════════════════════════════════

  const tableLeft = margin;
  const tableRight = pageWidth - margin;
  const columns = buildColumns(isInterState);
  const layout = computeLayout(columns, tableLeft);

  const drawHLine = (atY: number) => {
    doc.setDrawColor(lineColor);
    doc.setLineWidth(0.3);
    doc.line(tableLeft, atY, tableRight, atY);
  };

  const drawVLines = (topY: number, bottomY: number) => {
    doc.setDrawColor(lineColor);
    doc.setLineWidth(0.2);
    // Draw left border of each column + right border of last
    for (const c of layout) {
      doc.line(c.left, topY, c.left, bottomY);
    }
    doc.line(tableRight, topY, tableRight, bottomY);
  };

  // Find column by key
  const colByKey = (key: string): ColLayout => layout.find(c => c.key === key)!;

  // ── Table Header ──
  drawHLine(y);
  const headerTop = y;
  y += 4;

  // Header line 1 — group headers for tax columns
  doc.setFontSize(6);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(dark);

  for (const c of layout) {
    if (c.headerLine1) {
      // For CGST/SGST/IGST group headers, span across rate+amt
      if (c.key === 'cgstRate') {
        const amtCol = colByKey('cgstAmt');
        const midX = c.left + (amtCol.right - c.left) / 2;
        doc.text('CGST', midX, y, { align: 'center' });
      } else if (c.key === 'sgstRate') {
        const amtCol = colByKey('sgstAmt');
        const midX = c.left + (amtCol.right - c.left) / 2;
        doc.text('SGST', midX, y, { align: 'center' });
      } else if (c.key === 'igstRate') {
        const amtCol = colByKey('igstAmt');
        const midX = c.left + (amtCol.right - c.left) / 2;
        doc.text('IGST', midX, y, { align: 'center' });
      } else if (c.key === 'cgstAmt' || c.key === 'sgstAmt' || c.key === 'igstAmt') {
        // Skip — handled by the group header above
      } else {
        drawCell(doc, c.headerLine1, c, y, { fontStyle: 'bold', color: dark });
      }
    }
  }

  y += 3;
  // Header line 2
  for (const c of layout) {
    if (c.headerLine2) {
      drawCell(doc, c.headerLine2, c, y, { fontStyle: 'bold', color: dark });
    }
  }

  y += 2;
  drawHLine(y);

  // ── Data Row Helper ──
  const rowHeight = 6;

  type RowData = Record<string, string>;

  const drawDataRow = (rowData: RowData) => {
    y += rowHeight;

    // Handle description wrapping specially
    const descCol = colByKey('desc');
    const descPad = 1.5;
    const descMaxW = descCol.width - descPad * 2;
    const descText = rowData['desc'] || '';
    doc.setFontSize(6);
    doc.setFont('helvetica', 'normal');
    const descLines: string[] = doc.splitTextToSize(descText, descMaxW);

    for (const c of layout) {
      const val = rowData[c.key] || '';
      if (c.key === 'desc') {
        // Draw first line
        doc.setFontSize(6);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(dark);
        if (descLines[0]) doc.text(descLines[0], c.left + descPad, y);
        // Draw additional lines below
        for (let i = 1; i < descLines.length; i++) {
          doc.text(descLines[i], c.left + descPad, y + i * 3);
        }
      } else {
        drawCell(doc, val, c, y, { color: dark });
      }
    }

    // Account for wrapped description height
    if (descLines.length > 1) {
      y += (descLines.length - 1) * 3;
    }
  };

  const vehicleLabel = vehicles === 1 ? '1 Vehicle' : `${vehicles} Vehicles`;

  // Row 1: Activation
  const row1: RowData = {
    sr: '1',
    hsn: '997159',
    desc: `PayTap NFC Tag Activation & Installation Charges - ${vehicleLabel}`,
    uom: 'Nos.',
    qty: String(vehicles),
    rate: formatINR(activationRate),
    gross: formatINR(activationAmount),
    dis: '-',
    taxable: formatINR(activationAmount),
  };
  if (isInterState) {
    row1.igstRate = `${igstPct}%`;
    row1.igstAmt = formatINR(activationIgst);
  } else {
    row1.cgstRate = `${cgstPct}%`;
    row1.cgstAmt = formatINR(activationCgst);
    row1.sgstRate = `${sgstPct}%`;
    row1.sgstAmt = formatINR(activationSgst);
  }
  drawDataRow(row1);

  // Row 2: AMC
  const row2: RowData = {
    sr: '2',
    hsn: '998313',
    desc: 'Annual Maintenance Charges (AMC)',
    uom: 'Nos.',
    qty: '1',
    rate: formatINR(amcRate),
    gross: formatINR(amcAmount),
    dis: '-',
    taxable: formatINR(amcAmount),
  };
  if (isInterState) {
    row2.igstRate = `${igstPct}%`;
    row2.igstAmt = formatINR(amcIgst);
  } else {
    row2.cgstRate = `${cgstPct}%`;
    row2.cgstAmt = formatINR(amcCgst);
    row2.sgstRate = `${sgstPct}%`;
    row2.sgstAmt = formatINR(amcSgst);
  }
  drawDataRow(row2);

  // Row 3: Discount (if applicable)
  if (discountPreTax > 0) {
    const row3: RowData = {
      sr: '3',
      hsn: '-',
      desc: 'Discount',
      uom: 'Nos.',
      qty: '1',
      rate: `-${formatINR(discountPreTax)}`,
      gross: `-${formatINR(discountPreTax)}`,
      dis: '-',
      taxable: `-${formatINR(discountTaxable)}`,
    };
    if (isInterState) {
      row3.igstRate = `${igstPct}%`;
      row3.igstAmt = `-${formatINR(discountIgst)}`;
    } else {
      row3.cgstRate = `${cgstPct}%`;
      row3.cgstAmt = `-${formatINR(discountCgst)}`;
      row3.sgstRate = `${sgstPct}%`;
      row3.sgstAmt = `-${formatINR(discountSgst)}`;
    }
    drawDataRow(row3);
  }

  // ── Total Row ──
  y += 2;
  drawHLine(y);
  y += 5;

  const totalGross = round2(activationAmount + amcAmount - (discountPreTax > 0 ? discountPreTax : 0));
  const totalTaxable = subtotalPreTax;
  const totalCgst = round2(activationCgst + amcCgst - discountCgst);
  const totalSgst = round2(activationSgst + amcSgst - discountSgst);
  const totalIgst = round2(activationIgst + amcIgst - discountIgst);

  // Total row using drawCell for consistent alignment
  drawCell(doc, 'Total', colByKey('desc'), y, { fontStyle: 'bold', color: dark });
  drawCell(doc, formatINR(totalGross), colByKey('gross'), y, { fontStyle: 'bold', color: dark });
  drawCell(doc, '-', colByKey('dis'), y, { fontStyle: 'bold', color: dark });
  drawCell(doc, formatINR(totalTaxable), colByKey('taxable'), y, { fontStyle: 'bold', color: dark });

  if (isInterState) {
    drawCell(doc, formatINR(totalIgst), colByKey('igstAmt'), y, { fontStyle: 'bold', color: dark });
  } else {
    drawCell(doc, formatINR(totalCgst), colByKey('cgstAmt'), y, { fontStyle: 'bold', color: dark });
    drawCell(doc, formatINR(totalSgst), colByKey('sgstAmt'), y, { fontStyle: 'bold', color: dark });
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
