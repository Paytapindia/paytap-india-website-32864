import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  // Verify JWT and check admin role
  const anonClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } } }
  );

  const token = authHeader.replace('Bearer ', '');
  const { data: claimsData, error: claimsError } = await anonClient.auth.getClaims(token);
  if (claimsError || !claimsData?.claims) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), {
      status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const userId = claimsData.claims.sub;

  // Use service role to check admin role
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const { data: roleData } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .eq('role', 'admin')
    .single();

  if (!roleData) {
    return new Response(JSON.stringify({ error: 'Forbidden: Admin access required' }), {
      status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  // Parse request
  const url = new URL(req.url);
  const type = url.searchParams.get('type');
  const search = (url.searchParams.get('search') || '').replace(/[^a-zA-Z0-9@.\- ]/g, '');
  const limit = parseInt(url.searchParams.get('limit') || '50');
  const offset = parseInt(url.searchParams.get('offset') || '0');
  const status = url.searchParams.get('status');

  try {
    // Handle POST actions (update status, delete)
    if (req.method === 'POST') {
      const body = await req.json();
      const { action, orderId, status: newStatus } = body;

      if (action === 'update-order-status' && orderId && newStatus) {
        const { error } = await supabase.from('orders').update({ payment_status: newStatus }).eq('id', orderId);
        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      if (action === 'mark-all-success') {
        const { error } = await supabase.from('orders').update({ payment_status: 'success' }).neq('payment_status', 'success');
        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      if (action === 'delete-order' && orderId) {
        const { error } = await supabase.from('orders').delete().eq('id', orderId);
        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify({ error: 'Invalid action' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    switch (type) {
      case 'verify': {
        return new Response(JSON.stringify({ admin: true, userId }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      case 'stats': {
        const [ordersRes, leadsRes, corpRes, revenueRes, recentOrdersRes, recentLeadsRes] = await Promise.all([
          supabase.from('orders').select('*', { count: 'exact', head: true }),
          supabase.from('leads').select('*', { count: 'exact', head: true }),
          supabase.from('corporate_registrations').select('*', { count: 'exact', head: true }),
          supabase.from('orders').select('amount').eq('payment_status', 'success'),
          supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5),
          supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(5),
        ]);

        const totalRevenue = (revenueRes.data || []).reduce((sum: number, o: any) => sum + Number(o.amount), 0);

        return new Response(JSON.stringify({
          totalOrders: ordersRes.count || 0,
          totalLeads: leadsRes.count || 0,
          totalCorporate: corpRes.count || 0,
          totalRevenue,
          recentOrders: recentOrdersRes.data || [],
          recentLeads: recentLeadsRes.data || [],
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      case 'orders': {
        let query = supabase.from('orders').select('*', { count: 'exact' });
        if (status && status !== 'all') {
          query = query.eq('payment_status', status);
        }
        if (search) {
          query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%,txnid.ilike.%${search}%`);
        }
        const { data, error, count } = await query
          .order('created_at', { ascending: false })
          .range(offset, offset + limit - 1);
        if (error) throw error;
        return new Response(JSON.stringify({ data, count }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      case 'leads': {
        let query = supabase.from('leads').select('*', { count: 'exact' });
        if (search) {
          query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`);
        }
        const { data, error, count } = await query
          .order('created_at', { ascending: false })
          .range(offset, offset + limit - 1);
        if (error) throw error;
        return new Response(JSON.stringify({ data, count }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      case 'corporate': {
        let query = supabase.from('corporate_registrations').select('*', { count: 'exact' });
        if (search) {
          query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,company_name.ilike.%${search}%`);
        }
        const { data, error, count } = await query
          .order('created_at', { ascending: false })
          .range(offset, offset + limit - 1);
        if (error) throw error;
        return new Response(JSON.stringify({ data, count }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      case 'analytics': {
        // Orders by day (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const [ordersData, leadsData] = await Promise.all([
          supabase.from('orders').select('created_at, amount, payment_status, product_type').gte('created_at', thirtyDaysAgo.toISOString()),
          supabase.from('leads').select('created_at, source').gte('created_at', thirtyDaysAgo.toISOString()),
        ]);

        return new Response(JSON.stringify({
          orders: ordersData.data || [],
          leads: leadsData.data || [],
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      default:
        return new Response(JSON.stringify({ error: 'Invalid type parameter' }), {
          status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
