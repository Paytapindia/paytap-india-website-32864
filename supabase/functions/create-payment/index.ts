import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Generate SHA512 hash
async function generateHash(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-512', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Generate unique transaction ID (max 25 chars, alphanumeric)
function generateTransactionId(): string {
  const timestamp = Date.now().toString(36).toUpperCase().slice(-8);
  const random = Math.random().toString(36).toUpperCase().slice(2, 8);
  return `TX${timestamp}${random}`;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const PAYU_SALT = Deno.env.get('PAYU_SALT');
    const PAYU_MERCHANT_KEY = Deno.env.get('PAYU_MERCHANT_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    if (!PAYU_SALT || !PAYU_MERCHANT_KEY) {
      console.error('PayU credentials not configured');
      return new Response(
        JSON.stringify({ error: 'Payment configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body = await req.json();
    const {
      name,
      phone,
      email,
      address,
      city,
      state,
      pincode,
      productType,
      quantity,
      debugPreset // For sanity testing
    } = body;

    // Validate required fields (skip validation for debug preset)
    if (!debugPreset && (!name || !phone || !email || !address || !city || !state || !pincode || !productType || !quantity)) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Calculate amount server-side (prevent manipulation)
    const PRODUCT_PRICES: Record<string, number> = {
      sticker: 999,
      card: 999
    };

    // Sanity test mode: use hardcoded values
    let firstname: string;
    let emailClean: string;
    let phoneClean: string;
    let amountStr: string;
    let productinfo: string;
    let validQuantity: number;

    if (debugPreset) {
      // Hardcoded test values for sanity check
      firstname = 'test';
      emailClean = 'test@test.com';
      phoneClean = '9999999999';
      amountStr = '1.00';
      productinfo = 'test';
      validQuantity = 1;
      console.log('=== SANITY TEST MODE ENABLED ===');
    } else {
      // Normal flow: normalize user-provided fields
      firstname = String(name).trim();
      emailClean = String(email).trim().toLowerCase();
      phoneClean = String(phone).trim();
      
      const unitPrice = PRODUCT_PRICES[productType];
      if (!unitPrice) {
        return new Response(
          JSON.stringify({ error: 'Invalid product type' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      validQuantity = Math.min(Math.max(1, parseInt(quantity)), 10);
      const amount = unitPrice * validQuantity;
      amountStr = amount.toFixed(2);
      
      productinfo = productType === 'sticker' 
        ? `Paytap NFC Sticker x${validQuantity}` 
        : `Paytap Prepaid Card x${validQuantity}`;
    }

    // Generate transaction ID (or use fixed for sanity test)
    const txnid = debugPreset ? 'PAYU_TEST_001' : generateTransactionId();

    // Create Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Save order to database with pending status (skip for sanity test)
    if (!debugPreset) {
      const { error: insertError } = await supabase
        .from('orders')
        .insert({
          txnid,
          name: firstname,
          phone: phoneClean,
          email: emailClean,
          address,
          city,
          state,
          pincode,
          product_type: productType,
          quantity: validQuantity,
          amount: parseFloat(amountStr),
          payment_status: 'pending'
        });

      if (insertError) {
        console.error('Error saving order:', insertError);
        return new Response(
          JSON.stringify({ error: 'Failed to create order' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // UDF fields (empty for now)
    const udf1 = '';
    const udf2 = '';
    const udf3 = '';
    const udf4 = '';
    const udf5 = '';

    // Generate hash
    // PayU hash formula: key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||salt
    const hashString = `${PAYU_MERCHANT_KEY}|${txnid}|${amountStr}|${productinfo}|${firstname}|${emailClean}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${PAYU_SALT}`;
    const hash = await generateHash(hashString);

    // Debug logging with lengths
    console.log('=== PayU Hash Debug ===');
    console.log('Hash String:', hashString);
    console.log('Generated Hash:', hash);
    console.log(`Amount: "${amountStr}" (length: ${amountStr.length})`);
    console.log(`Product Info: "${productinfo}" (length: ${productinfo.length})`);
    console.log(`Firstname: "${firstname}" (length: ${firstname.length})`);
    console.log(`Email: "${emailClean}" (length: ${emailClean.length})`);
    console.log(`Phone: "${phoneClean}" (length: ${phoneClean.length})`);
    console.log(`TxnID: "${txnid}" (length: ${txnid.length})`);

    // Get origin from request for callbacks
    const origin = req.headers.get('origin') || 'https://paytap.co.in';

    // Return payment parameters - minimal required fields only
    return new Response(
      JSON.stringify({
        success: true,
        paymentData: {
          key: PAYU_MERCHANT_KEY,
          txnid,
          amount: amountStr,
          productinfo,
          firstname,
          email: emailClean,
          phone: phoneClean,
          surl: `${origin}/checkout/success`,
          furl: `${origin}/checkout/cancel`,
          hash
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
