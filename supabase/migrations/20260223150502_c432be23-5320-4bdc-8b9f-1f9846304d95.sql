
CREATE TABLE public.corporate_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  contact_mobile TEXT NOT NULL,
  gst_no TEXT,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.corporate_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert corporate registrations"
ON public.corporate_registrations
FOR INSERT
WITH CHECK (true);

CREATE POLICY "No public read access"
ON public.corporate_registrations
FOR SELECT
USING (false);

CREATE POLICY "Service role can manage"
ON public.corporate_registrations
FOR ALL
USING (true)
WITH CHECK (true);
