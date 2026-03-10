import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Check if admin already exists
    const { data: existingRoles } = await supabase
      .from('user_roles')
      .select('id')
      .eq('role', 'admin')
      .limit(1);

    if (existingRoles && existingRoles.length > 0) {
      return new Response(JSON.stringify({ success: true, message: 'Admin already exists' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Create admin user
    const { data: userData, error: createError } = await supabase.auth.admin.createUser({
      email: 'akshay@paytap.co.in',
      password: 'Paytao@9999',
      email_confirm: true,
    });

    let userId: string;

    if (createError) {
      if (createError.message?.includes('already been registered')) {
        const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
        if (listError) throw listError;
        const existingUser = users?.find(u => u.email === 'akshay@paytap.co.in');
        if (!existingUser) throw new Error('User not found');
        userId = existingUser.id;
      } else {
        throw createError;
      }
    } else {
      userId = userData.user.id;
    }

    const { error: roleError } = await supabase
      .from('user_roles')
      .upsert({ user_id: userId, role: 'admin' }, { onConflict: 'user_id,role' });

    if (roleError) throw roleError;

    return new Response(JSON.stringify({ success: true, message: 'Admin user created and role assigned' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
