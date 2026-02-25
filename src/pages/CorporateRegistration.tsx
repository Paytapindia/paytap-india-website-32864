import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  company_name: z.string().trim().min(1, 'Company name is required').max(200),
  contact_mobile: z.string().regex(/^\d{10}$/, 'Enter a valid 10-digit mobile number'),
  gst_no: z.string().trim().min(1, 'GST or PAN details are required').max(200),
  email: z.string().trim().email('Enter a valid email').max(255),
});

type FormValues = z.infer<typeof formSchema>;

const CorporateRegistration = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', company_name: '', contact_mobile: '', gst_no: '', email: '' },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    const { error } = await supabase.from('corporate_registrations' as any).insert({
      name: values.name,
      company_name: values.company_name,
      contact_mobile: values.contact_mobile,
      gst_no: values.gst_no || null,
      email: values.email,
    } as any);

    setLoading(false);
    if (error) {
      toast({ title: 'Something went wrong', description: 'Please try again later.', variant: 'destructive' });
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          {submitted ? (
            <div className="text-center space-y-6 p-8 rounded-2xl bg-card border shadow-sm">
              <CheckCircle className="w-16 h-16 text-primary mx-auto" />
              <h2 className="text-2xl font-bold text-foreground">Registration Submitted!</h2>
              <p className="text-muted-foreground">
                Our Business support team will contact you shortly to complete your Corporate Prepaid Account KYC.
              </p>
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-card border shadow-sm">
              <h1 className="text-2xl font-bold text-foreground mb-6 text-center">Corporate Account Registration</h1>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl><Input placeholder="Full name" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="company_name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name *</FormLabel>
                      <FormControl><Input placeholder="Company name" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="contact_mobile" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Mobile No *</FormLabel>
                      <FormControl><Input type="tel" placeholder="10-digit mobile number" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="gst_no" render={({ field }) => (
                    <FormItem>
                      <FormLabel>GST or PAN Details</FormLabel>
                      <FormControl><Input placeholder="Enter GST or PAN number" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email ID *</FormLabel>
                      <FormControl><Input type="email" placeholder="Email address" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Submitting...' : 'Create Corporate Account'}
                  </Button>
                </form>
              </Form>
            </div>
          )}
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default CorporateRegistration;
