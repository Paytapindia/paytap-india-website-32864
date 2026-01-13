-- Drop the overly permissive SELECT policy that exposes all orders
DROP POLICY IF EXISTS "Anyone can read orders by txnid" ON public.orders;

-- Create a restrictive SELECT policy that denies public access
-- Orders should only be read via edge functions (service role)
CREATE POLICY "No public read access to orders"
ON public.orders
FOR SELECT
USING (false);