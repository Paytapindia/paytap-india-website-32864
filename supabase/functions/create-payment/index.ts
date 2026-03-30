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
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const PAYU_SALT = Deno.env.get('PAYU_SALT');
    const PAYU_MERCHANT_KEY = Deno.env.get('PAYU_MERCHANT_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    if (!PAYU_SALT || !PAYU_MERCHANT_KEY) {
      return new Response(
        JSON.stringify({ error: 'Payment configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body = await req.json();
    const { name, phone, email, address, city, state, pincode, productType, quantity } = body;

    // Validate required fields
    if (!name || !phone || !email || !address || !city || !state || !pincode || !productType || !quantity) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Calculate amount server-side
    const PRODUCT_PRICES: Record<string, number> = {
      sticker: 499,
      card: 999
    };

    const firstname = String(name).trim();
    const emailClean = String(email).trim().toLowerCase();
    const phoneClean = String(phone).trim();

    const unitPrice = PRODUCT_PRICES[productType];
    if (!unitPrice) {
      return new Response(
        JSON.stringify({ error: 'Invalid product type' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const validQuantity = Math.min(Math.max(1, parseInt(quantity)), 10);
    const amount = unitPrice * validQuantity;
    const amountStr = amount.toFixed(2);

    const productinfo = productType === 'sticker'
      ? `Paytap NFC Sticker x${validQuantity}`
      : `Paytap Prepaid Card x${validQuantity}`;

    const txnid = generateTransactionId();

    // Save order to database
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

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
      console.error('Order insert failed');
      return new Response(
        JSON.stringify({ error: 'Failed to create order' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // UDF fields
    const udf1 = '', udf2 = '', udf3 = '', udf4 = '', udf5 = '';

    // Generate hash
    const hashString = `${PAYU_MERCHANT_KEY}|${txnid}|${amountStr}|${productinfo}|${firstname}|${emailClean}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${PAYU_SALT}`;
    const hash = await generateHash(hashString);

    const origin = req.headers.get('origin') || 'https://paytap.co.in';

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
    console.error('Payment error occurred');
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
