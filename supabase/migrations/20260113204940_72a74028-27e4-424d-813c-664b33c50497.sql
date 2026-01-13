-- Block public SELECT access to leads table
CREATE POLICY "No public read access to leads"
ON public.leads
FOR SELECT
USING (false);

-- Allow service role full access to manage leads (for merchant panel)
CREATE POLICY "Service role can manage leads"
ON public.leads
FOR ALL
USING (true)
WITH CHECK (true);