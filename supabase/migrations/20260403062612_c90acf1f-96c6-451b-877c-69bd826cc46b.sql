DROP POLICY "Anon can insert validated leads" ON public.leads;
CREATE POLICY "Anon can insert validated leads" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (
  (length(phone) = 10) AND
  ((email IS NULL) OR ((length(email) >= 5) AND (length(email) <= 255))) AND
  ((name IS NULL) OR ((length(name) >= 2) AND (length(name) <= 100))) AND
  (source = ANY (ARRAY['navbar'::text, 'navbar_login'::text, 'homepage'::text, 'contact'::text, 'checkout_gate'::text]))
);