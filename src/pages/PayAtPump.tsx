import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Check, Fuel, CreditCard, Car, Shield, Zap, Clock } from "lucide-react";
import { memo, useEffect, useState } from "react";
import paytapLogo from "@/assets/paytap-logo-navbar.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PayAtPump = memo(() => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [utmParams, setUtmParams] = useState("");

  useEffect(() => {
    // Preserve UTM parameters for tracking
    const params = new URLSearchParams();
    const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
    utmKeys.forEach((key) => {
      const value = searchParams.get(key);
      if (value) params.set(key, value);
    });
    setUtmParams(params.toString());
  }, [searchParams]);

  const handleActivate = () => {
    // Track CTA click for funnel analysis
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'begin_checkout', {
        'value': 999,
        'currency': 'INR',
        'items': [{
          'item_id': 'paytap-nfc-tag',
          'item_name': 'Paytap NFC Fuel Payment Tag',
          'price': 999
        }]
      });
    }

    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        value: 999,
        currency: 'INR',
        content_ids: ['paytap-nfc-tag']
      });
    }

    const checkoutUrl = utmParams 
      ? `/checkout?product=sticker&${utmParams}` 
      : "/checkout?product=sticker";
    navigate(checkoutUrl);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Paytap NFC Fuel Payment Tag",
    "description": "Contactless payment tag for instant fuel payments at petrol pumps across India",
    "brand": { "@type": "Brand", "name": "Paytap" },
    "image": "https://paytap.co.in/images/pay-at-pump-hero.png",
    "offers": {
      "@type": "Offer",
      "price": "999",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": "https://paytap.co.in/pay-at-pump"
    }
  };

  const faqs = [
    {
      question: "Where can I use Paytap for fuel?",
      answer: "Paytap works at 8 lakh+ RuPay-enabled terminals across India, including major petrol pump chains like Indian Oil, Bharat Petroleum, and HP."
    },
    {
      question: "Is the payment secure?",
      answer: "Yes! Paytap uses bank-grade encryption and is fully RBI & NPCI compliant. Each transaction requires terminal validation, and you control your spending limits."
    },
    {
      question: "How fast is the payment?",
      answer: "Lightning fast! Tap your tag, and payment completes in under 2 seconds. No PIN entry, no waiting for card machines to connect."
    },
    {
      question: "Do I need a bank account?",
      answer: "No bank account linking required. Simply load your Paytap wallet via UPI or card, and you're ready to pay."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Pay at Pump | Tap, Fuel & Go with Paytap NFC Tags</title>
        <meta name="description" content="No cards, no cash, no delay. Pay for fuel with a single tap of your Paytap NFC tag. Works at 8L+ terminals across India. ₹999 one-time." />
        <link rel="canonical" href="https://paytap.co.in/pay-at-pump" />
        
        {/* Open Graph for Discovery */}
        <meta property="og:title" content="Tap, Fuel, & Go — Paytap" />
        <meta property="og:description" content="Skip the pump queue. Pay for fuel instantly with a single tap." />
        <meta property="og:image" content="https://paytap.co.in/images/pay-at-pump-hero.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="628" />
        <meta property="og:url" content="https://paytap.co.in/pay-at-pump" />
        <meta property="og:type" content="product" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tap, Fuel, & Go — Paytap" />
        <meta name="twitter:description" content="Skip the pump queue. Pay for fuel instantly with a single tap." />
        <meta name="twitter:image" content="https://paytap.co.in/images/pay-at-pump-hero.png" />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Minimal Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center">
              <img src={paytapLogo} alt="Paytap" className="h-8" />
            </a>
            <Button 
              onClick={handleActivate}
              className="bg-paytap-coral hover:bg-paytap-coral/90 text-white font-semibold"
            >
              Get Started
            </Button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-background to-paytap-coral/5 -z-10" />
          
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-paytap-coral/10 text-paytap-coral px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Fuel className="w-4 h-4" />
                Fuel Payment Revolution
              </div>

              {/* Headline - Matches Ad Copy Exactly */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight">
                Tap, Fuel, & Go.
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Skip the queue. Pay for fuel with a single tap of your Paytap tag. 
                No cards, no cash, no delay.
              </p>

              {/* Primary CTA */}
              <Button 
                onClick={handleActivate}
                size="lg"
                className="bg-paytap-coral hover:bg-paytap-coral/90 text-white font-bold text-lg px-8 py-6 h-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-8"
              >
Activate Now — ₹999
              </Button>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>8L+ terminals</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Instant payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Free shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>RBI compliant</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works - 3 Steps */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
              How It Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-paytap-coral/10 flex items-center justify-center">
                  <CreditCard className="w-10 h-10 text-paytap-coral" />
                </div>
                <div className="text-sm font-semibold text-paytap-coral mb-2">Step 1</div>
                <h3 className="text-xl font-bold text-foreground mb-2">Tap</h3>
                <p className="text-muted-foreground">
                  Hold your Paytap tag to the terminal at the fuel pump
                </p>
              </div>

              {/* Arrow (hidden on mobile) */}
              <div className="hidden md:flex items-center justify-center">
                <div className="w-12 h-0.5 bg-paytap-coral/30" />
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Zap className="w-10 h-10 text-green-500" />
                </div>
                <div className="text-sm font-semibold text-green-500 mb-2">Step 2</div>
                <h3 className="text-xl font-bold text-foreground mb-2">Pay</h3>
                <p className="text-muted-foreground">
                  Payment processes instantly — no PIN, no waiting
                </p>
              </div>

              {/* Arrow (hidden on mobile) */}
              <div className="hidden md:flex items-center justify-center">
                <div className="w-12 h-0.5 bg-green-500/30" />
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Car className="w-10 h-10 text-blue-500" />
                </div>
                <div className="text-sm font-semibold text-blue-500 mb-2">Step 3</div>
                <h3 className="text-xl font-bold text-foreground mb-2">Go</h3>
                <p className="text-muted-foreground">
                  Drive away happy — no queue, no hassle
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-12 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-foreground">50,000+</div>
                <div className="text-sm text-muted-foreground">Fleet Operators</div>
              </div>
              <div className="w-px h-12 bg-border hidden md:block" />
              <div>
                <div className="text-3xl md:text-4xl font-bold text-foreground">8L+</div>
                <div className="text-sm text-muted-foreground">Acceptance Points</div>
              </div>
              <div className="w-px h-12 bg-border hidden md:block" />
              <div>
                <div className="text-3xl md:text-4xl font-bold text-foreground">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="w-px h-12 bg-border hidden md:block" />
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-paytap-coral" />
                <span className="text-sm text-muted-foreground">RBI & NPCI Compliant</span>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                "No cards, no cash, no delay."
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Revolutionize your petrol stops. Experience the fastest contactless fuel payment today. 
                Secure, seamless, and lightning-fast — the ultimate payment tag for the modern driver.
              </p>
              <Button 
                onClick={handleActivate}
                size="lg"
                className="bg-paytap-dark hover:bg-paytap-navy text-white font-bold text-lg px-8 py-6 h-auto rounded-xl"
              >
                Get Your Tag Now
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
              Frequently Asked Questions
            </h2>

            <div className="max-w-2xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`faq-${index}`}
                    className="bg-background rounded-lg border border-border px-6"
                  >
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24 bg-paytap-dark text-white">
          <div className="container mx-auto px-4 text-center">
            <Clock className="w-12 h-12 mx-auto mb-6 text-paytap-coral" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Stop waiting at the terminal.
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
              Pay for your fuel with a simple tap and drive away happy. 
              Get your Paytap tag today.
            </p>
            <Button 
              onClick={handleActivate}
              size="lg"
              className="bg-paytap-coral hover:bg-paytap-coral/90 text-white font-bold text-lg px-8 py-6 h-auto rounded-xl"
            >
              Activate Now — ₹999
            </Button>
            <p className="text-sm text-white/60 mt-4">
              Free shipping • Activate in 1 minute • No hidden fees
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-border">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              © 2026 Paytap. All rights reserved. | 
              <a href="/privacy-policy" className="hover:text-foreground ml-1">Privacy Policy</a> | 
              <a href="/terms-and-conditions" className="hover:text-foreground ml-1">Terms of Service</a>
            </p>
          </div>
        </footer>

        {/* Sticky Mobile CTA */}
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background border-t border-border p-4">
          <Button 
            onClick={handleActivate}
            className="w-full bg-paytap-coral hover:bg-paytap-coral/90 text-white font-bold py-4 h-auto rounded-xl"
          >
            Get Your Tag — ₹699
          </Button>
        </div>

        {/* Bottom padding for mobile sticky CTA */}
        <div className="h-20 md:hidden" />
      </div>
    </>
  );
});

PayAtPump.displayName = "PayAtPump";

export default PayAtPump;
