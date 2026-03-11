CREATE POLICY "Anon can insert orders"
ON public.orders
FOR INSERT
TO anon, authenticated
WITH CHECK (
  payment_status = 'pending'
  AND amount > 0
  AND length(txnid) >= 5
  AND name IS NOT NULL
  AND phone IS NOT NULL
  AND email IS NOT NULL
);