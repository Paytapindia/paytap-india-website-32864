
-- 1. Orders: Remove client-side INSERT, keep only service_role
DROP POLICY IF EXISTS "Anyone can insert orders" ON public.orders;

-- 2. Leads: Replace permissive INSERT with validated one
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;

CREATE POLICY "Anon can insert validated leads"
  ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(phone) = 10 AND
    (email IS NULL OR length(email) BETWEEN 5 AND 255) AND
    (name IS NULL OR length(name) BETWEEN 2 AND 100) AND
    source IN ('navbar', 'navbar_login', 'homepage', 'contact')
  );

-- 3. Corporate registrations: Replace permissive INSERT with validated one
DROP POLICY IF EXISTS "Anyone can insert corporate registrations" ON public.corporate_registrations;

CREATE POLICY "Anon can insert validated corporate registrations"
  ON public.corporate_registrations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(name) BETWEEN 2 AND 100 AND
    length(email) BETWEEN 5 AND 255 AND
    length(company_name) BETWEEN 2 AND 200 AND
    length(contact_mobile) = 10
  );

-- 4. Fix service role policy on corporate_registrations (currently TO public, should be TO service_role)
DROP POLICY IF EXISTS "Service role can manage" ON public.corporate_registrations;

CREATE POLICY "Service role can manage corporate registrations"
  ON public.corporate_registrations
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 5. Fix service role policy on leads (currently TO public, should be TO service_role)
DROP POLICY IF EXISTS "Service role can manage leads" ON public.leads;

CREATE POLICY "Service role can manage leads"
  ON public.leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
