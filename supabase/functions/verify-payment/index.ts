import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Generate SHA512 hash for verification
async function generateHash(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-512', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
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
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      status,
      hash: receivedHash,
      mihpayid, // PayU payment ID
      mode,     // Payment mode
      error_Message
    } = body;

    // Validate required fields
    if (!txnid || !receivedHash) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify hash (reverse hash formula for response)
    // Response hash formula: SALT|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key
    const reverseHashString = `${PAYU_SALT}|${status}||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${PAYU_MERCHANT_KEY}`;
    const calculatedHash = await generateHash(reverseHashString);

    const isValidHash = calculatedHash.toLowerCase() === receivedHash.toLowerCase();

    // Create Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Determine payment status
    let paymentStatus: 'success' | 'failed' | 'cancelled';
    if (status === 'success' && isValidHash) {
      paymentStatus = 'success';
    } else if (status === 'failure') {
      paymentStatus = 'failed';
    } else {
      paymentStatus = 'cancelled';
    }

    // Update order in database
    const { data: order, error: updateError } = await supabase
      .from('orders')
      .update({
        payment_status: paymentStatus,
        payu_response: {
          mihpayid,
          mode,
          status,
          error_Message,
          hash_verified: isValidHash
        }
      })
      .eq('txnid', txnid)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating order:', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to update order', verified: false }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: paymentStatus === 'success',
        verified: isValidHash,
        order: {
          txnid: order.txnid,
          amount: order.amount,
          status: order.payment_status,
          product_type: order.product_type,
          quantity: order.quantity
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', verified: false }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
