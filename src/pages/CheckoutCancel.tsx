import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, ShoppingCart } from "lucide-react";

const CheckoutCancel = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-100 rounded-full mx-auto flex items-center justify-center mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
          <p className="text-gray-600">Your order was not completed. Don't worry, you can try again anytime!</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>What Happened?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Your payment was cancelled or interrupted. This could happen due to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Payment window was closed</li>
              <li>Network connectivity issues</li>
              <li>Payment gateway timeout</li>
              <li>User cancellation</li>
            </ul>
            <p className="text-gray-700">
              No charges were made to your account, and you can safely try ordering again.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Still Want Your PayTap Tag?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Your PayTap NFC payment tag is still available for ₹1180 with free shipping across India.
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>PayTap NFC Tag</span>
                <span className="font-semibold">₹1000</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>GST (18%)</span>
                <span className="font-semibold">₹180</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="border-t pt-2 flex items-center justify-between font-semibold">
                <span>Total</span>
                <span>₹1180</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/checkout">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-600">
            Need help with your order? Contact us at support@paytap.in
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCancel;