import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-admin-key',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Protect with admin key
  const adminKey = req.headers.get('x-admin-key');
  if (!adminKey || adminKey !== Deno.env.get('ADMIN_API_KEY')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Create admin user
    const { data: userData, error: createError } = await supabase.auth.admin.createUser({
      email: 'akshay@paytap.co.in',
      password: 'Paytao@9999',
      email_confirm: true,
    });

    if (createError) {
      // User might already exist
      if (createError.message?.includes('already been registered')) {
        // Get existing user
        const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
        if (listError) throw listError;
        const existingUser = users?.find(u => u.email === 'akshay@paytap.co.in');
        if (!existingUser) throw new Error('User not found');

        // Assign admin role
        const { error: roleError } = await supabase
          .from('user_roles')
          .upsert({ user_id: existingUser.id, role: 'admin' }, { onConflict: 'user_id,role' });

        if (roleError) throw roleError;

        return new Response(JSON.stringify({ success: true, message: 'Admin role assigned to existing user' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      throw createError;
    }

    // Assign admin role
    const { error: roleError } = await supabase
      .from('user_roles')
      .insert({ user_id: userData.user.id, role: 'admin' });

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
