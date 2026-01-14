-- Add details_pending column to track orders needing follow-up
ALTER TABLE public.orders 
ADD COLUMN details_pending BOOLEAN DEFAULT false;

-- Make address fields nullable for express checkout
ALTER TABLE public.orders 
ALTER COLUMN name DROP NOT NULL,
ALTER COLUMN phone DROP NOT NULL,
ALTER COLUMN email DROP NOT NULL,
ALTER COLUMN address DROP NOT NULL,
ALTER COLUMN city DROP NOT NULL,
ALTER COLUMN state DROP NOT NULL,
ALTER COLUMN pincode DROP NOT NULL;