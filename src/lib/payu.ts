import CryptoJS from 'crypto-js';

// PayU Test Environment Configuration
export const PAYU_CONFIG = {
  MERCHANT_KEY: 'gtKFFx', // Official PayU test merchant key
  SALT: '4R38IvwiV57FwVpsgOvTXBdLE4tHUXFW', // PayU test salt per docs/error hint
  BASE_URL: 'https://test.payu.in', // Test environment URL
  SUCCESS_URL: `${window.location.origin}/checkout/success`,
  FAILURE_URL: `${window.location.origin}/checkout/cancel`,
  CANCEL_URL: `${window.location.origin}/checkout/cancel`
};

export interface PayUOrderData {
  txnid: string;
  amount: number;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  address1: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
}

// Generate hash for PayU payment
export const generatePayUHash = (orderData: PayUOrderData, salt: string): string => {
  const amountStr = Number(orderData.amount).toFixed(2);
  const hashString = `${PAYU_CONFIG.MERCHANT_KEY}|${orderData.txnid}|${amountStr}|${orderData.productinfo}|${orderData.firstname}|${orderData.email}|||||||||||${salt}`;
  return CryptoJS.SHA512(hashString).toString();
};

// Generate unique transaction ID
export const generateTransactionId = (): string => {
  // Max 25 chars, alphanumeric
  const part1 = Date.now().toString(36).toUpperCase().slice(-8);
  const part2 = Math.random().toString(36).toUpperCase().slice(2, 8);
  return `TX${part1}${part2}`; // ~16 chars, safe
};

// Initiate PayU payment using Checkout Plus (Modal)
export const initiatePayUPayment = (orderData: PayUOrderData) => {
  const hash = generatePayUHash(orderData, PAYU_CONFIG.SALT);

  const amountStr = Number(orderData.amount).toFixed(2);

  const payuForm = document.createElement('form');
  payuForm.method = 'POST';
  payuForm.action = `${PAYU_CONFIG.BASE_URL}/_payment`;
  payuForm.style.display = 'none';

  const formData = {
    key: PAYU_CONFIG.MERCHANT_KEY,
    txnid: orderData.txnid,
    amount: amountStr,
    productinfo: orderData.productinfo,
    firstname: orderData.firstname,
    email: orderData.email,
    phone: orderData.phone,
    address1: orderData.address1,
    city: orderData.city,
    state: orderData.state,
    zipcode: orderData.zipcode,
    country: orderData.country,
    surl: PAYU_CONFIG.SUCCESS_URL,
    furl: PAYU_CONFIG.FAILURE_URL,
    curl: PAYU_CONFIG.CANCEL_URL,
    hash: hash
  };
  // Create hidden form fields
  Object.entries(formData).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = value.toString();
    payuForm.appendChild(input);
  });

  document.body.appendChild(payuForm);
  payuForm.submit();
  document.body.removeChild(payuForm);
};

// Initialize PayU Checkout Plus (Modal) - Alternative approach
export const loadPayUCheckoutPlus = () => {
  return new Promise((resolve) => {
    if (window.PayUCheckout) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://jssdk.payu.in/bolt/bolt.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
};

// PayU Checkout Plus Modal Payment
export const initiatePayUModal = async (orderData: PayUOrderData) => {
  const isPayULoaded = await loadPayUCheckoutPlus();
  
  if (!isPayULoaded) {
    throw new Error('Failed to load PayU SDK');
  }

  const hash = generatePayUHash(orderData, PAYU_CONFIG.SALT);

  const amountStr = Number(orderData.amount).toFixed(2);

  const payuConfig = {
    key: PAYU_CONFIG.MERCHANT_KEY,
    txnid: orderData.txnid,
    amount: amountStr,
    productinfo: orderData.productinfo,
    firstname: orderData.firstname,
    email: orderData.email,
    phone: orderData.phone,
    address1: orderData.address1,
    city: orderData.city,
    state: orderData.state,
    zipcode: orderData.zipcode,
    country: orderData.country,
    surl: PAYU_CONFIG.SUCCESS_URL,
    furl: PAYU_CONFIG.FAILURE_URL,
    curl: PAYU_CONFIG.CANCEL_URL,
    hash: hash
  };

  return new Promise((resolve, reject) => {
    window.PayUCheckout(payuConfig, {
      success: (response: any) => {
        resolve(response);
      },
      failure: (error: any) => {
        reject(error);
      }
    });
  });
};

declare global {
  interface Window {
    PayUCheckout: any;
  }
}