import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Clock, ArrowRight } from "lucide-react";

const CheckoutSuccess = () => {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  
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
    
    setOrderDetails({
      ...payuData,
      orderData,
      // Fallback to legacy Razorpay data if available
      paymentId: payuData.payuMoneyId || location.state?.paymentId,
      orderId: payuData.txnid || location.state?.orderId
    });
  }, [location]);

  const { paymentId, orderId, orderData } = orderDetails || {};

  return (
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
  );
};

export default CheckoutSuccess;