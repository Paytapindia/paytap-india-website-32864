import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Clock, ArrowRight } from "lucide-react";

const CheckoutSuccess = () => {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState<{
    txnid?: string | null;
    amount?: string | null;
    productinfo?: string | null;
    firstname?: string | null;
    status?: string | null;
    hash?: string | null;
    payuMoneyId?: string | null;
    orderData?: {
      name?: string;
      address?: string;
      city?: string;
      state?: string;
      pincode?: string;
      phone?: string;
      email?: string;
    } | null;
    paymentId?: string | null;
    orderId?: string | null;
  } | null>(null);
  
  useEffect(() => {
    // Handle PayU response from URL params or session storage
    const urlParams = new URLSearchParams(location.search);
    const payuData = {
      txnid: urlParams.get('txnid'),
      amount: urlParams.get('amount'),
      productinfo: urlParams.get('productinfo'),
      firstname: urlParams.get('firstname'),
      status: urlParams.get('status'),
      hash: urlParams.get('hash'),
      payuMoneyId: urlParams.get('payuMoneyId')
    };
    
    // Get stored order data
    const storedOrderData = sessionStorage.getItem('payuOrderData');
    const orderData = storedOrderData ? JSON.parse(storedOrderData) : null;
    
    const details = {
      ...payuData,
      orderData,
      paymentId: payuData.payuMoneyId || location.state?.paymentId,
      orderId: payuData.txnid || location.state?.orderId
    };
    
    setOrderDetails(details);

    // Fire Google Ads Purchase Conversion with Enhanced Conversions
    if (typeof window !== 'undefined' && window.gtag && payuData.status === 'success') {
      const transactionId = payuData.txnid || `order_${Date.now()}`;
      
      // Conversion event with inline user_data for Enhanced Conversions (2026 cookieless attribution)
      window.gtag('event', 'conversion', {
        'send_to': 'AW-17870924773/REPLACE_WITH_LABEL',  // TODO: Replace with actual Conversion Label from Google Ads
'value': parseFloat(payuData.amount || '999'),
        'currency': 'INR',
        'transaction_id': transactionId,
        'user_data': orderData ? {
          'email': orderData.email,
          'phone_number': orderData.phone ? `+91${orderData.phone.replace(/^(\+91|91)/, '')}` : undefined,
          'address': {
            'first_name': orderData.name?.split(' ')[0],
            'last_name': orderData.name?.split(' ').slice(1).join(' '),
            'postal_code': orderData.pincode,
            'country': 'IN'
          }
        } : undefined
      });

      // Also fire standard purchase event for GA4
      window.gtag('event', 'purchase', {
        'transaction_id': transactionId,
'value': parseFloat(payuData.amount || '999'),
        'currency': 'INR',
        'items': [{
          'item_id': payuData.productinfo || 'paytap-tag',
          'item_name': 'Paytap NFC Tag',
          'price': parseFloat(payuData.amount || '999')
        }]
      });
    }

    // Fire Meta Pixel Purchase Event
    if (typeof window !== 'undefined' && window.fbq && payuData.status === 'success') {
      window.fbq('track', 'Purchase', {
        value: parseFloat(payuData.amount || '999'),
        currency: 'INR',
        content_ids: [payuData.productinfo || 'paytap-tag'],
        content_type: 'product'
      });
    }
  }, [location]);

  const { paymentId, orderId, orderData } = orderDetails || {};

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Order Confirmed - Paytap</title>
      </Helmet>
      <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your purchase. Your PayTap tag is on its way!</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {orderId && (
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-semibold">{orderId}</span>
              </div>
            )}
            {paymentId && (
              <div className="flex justify-between">
                <span className="text-gray-600">Payment ID:</span>
                <span className="font-semibold">{paymentId}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Amount Paid:</span>
              <span className="font-semibold">₹1180</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-semibold">PayU</span>
            </div>
          </CardContent>
        </Card>

        {orderData && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-700">
                <p className="font-semibold">{orderData.name}</p>
                <p>{orderData.address}</p>
                <p>{orderData.city}, {orderData.state} - {orderData.pincode}</p>
                <p className="mt-2">Phone: {orderData.phone}</p>
                <p>Email: {orderData.email}</p>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>What Happens Next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <Package className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold">Order Processing</h4>
                <p className="text-gray-600 text-sm">Your order will be processed within 1-2 business days</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold">Shipping</h4>
                <p className="text-gray-600 text-sm">Your PayTap tag will be delivered within 5-7 business days</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold">Setup Instructions</h4>
                <p className="text-gray-600 text-sm">Setup instructions will be included in your package</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-4">
          <Link to="/">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <ArrowRight className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <p className="text-sm text-gray-600">
            Need help? Contact our support team at support@paytap.in
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default CheckoutSuccess;