-- Revoke direct SELECT from anon and authenticated on orders table
-- The only SELECT access should be through service_role (Edge Functions)
REVOKE SELECT ON public.orders FROM anon, authenticated;

-- Force RLS even for table owners as additional safety
ALTER TABLE public.orders FORCE ROW LEVEL SECURITY;