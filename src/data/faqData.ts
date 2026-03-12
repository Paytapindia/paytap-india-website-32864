
export type FAQ = {
  id: string;
  question: string;
  answer: string;
};

export type FAQSectionData = {
  id: string;
  title: string;
  description: string;
  icon: string;
  faqs: FAQ[];
};

export const faqSections: FAQSectionData[] = [
  {
    id: "understanding",
    title: "Understanding PayTap",
    description: "Learn what PayTap is and how it transforms vehicle payments",
    icon: "Lightbulb",
    faqs: [
      {
        id: "understanding-1",
        question: "What is PayTap?",
        answer: "PayTap is a contactless NFC payment tag designed for vehicles.\n\nIt allows vehicles to make payments directly at merchant card machines, such as fuel stations, service centers, and other vehicle-related merchants.\n\nInstead of giving drivers cash or cards, the vehicle itself becomes the payment method.\n\nEvery payment is instantly recorded and visible on the PayTap dashboard, giving complete transparency and control over vehicle expenses."
      },
      {
        id: "understanding-2",
        question: "Is PayTap similar to FASTag?",
        answer: "No.\n\nFASTag is designed only for toll payments on highways.\n\nPayTap is designed for everyday vehicle expenses such as fuel, service, car wash, and other payments that normally require cash or cards.\n\nPayTap works by tapping the PayTap NFC tag on a merchant card machine, similar to how contactless cards work."
      },
      {
        id: "understanding-3",
        question: "How does PayTap work?",
        answer: "A PayTap transaction typically works like this:\n\n1. The vehicle arrives at a fuel station or merchant.\n2. The merchant enters the payment amount on the POS card machine.\n3. The PayTap NFC tag inside the vehicle is tapped on the card machine.\n4. Payment is processed instantly.\n5. The transaction appears immediately on your PayTap dashboard.\n\nThis eliminates the need for cash, reimbursement, or driver-managed payments."
      },
      {
        id: "understanding-4",
        question: "Why was PayTap created?",
        answer: "Managing vehicle expenses using cash or driver cards creates many problems:\n\n• Cash misuse\n• Lack of transparency\n• Delayed expense reporting\n• Driver reimbursements\n\nPayTap solves this by allowing the vehicle itself to handle payments while the owner monitors everything from a single dashboard."
      }
    ]
  },
  {
    id: "getting-started",
    title: "Getting Started",
    description: "How to get your PayTap tag and start using it",
    icon: "Rocket",
    faqs: [
      {
        id: "start-1",
        question: "How do I get a PayTap tag?",
        answer: "You can subscribe to a PayTap plan and activate your account through the PayTap platform.\n\nOnce your account is verified and activated, PayTap tags are issued for your vehicles.\n\nEach vehicle receives its own PayTap tag linked to your PayTap dashboard."
      },
      {
        id: "start-2",
        question: "Where should I place my PayTap tag?",
        answer: "You can place the PayTap tag in either location:\n\n• On the vehicle windshield\n• Inside the vehicle dashboard\n\nBoth locations work with NFC card machines.\n\nIf you prefer additional comfort or safety, you may place the tag inside the dashboard and simply roll down the window when making a payment so the card machine can be brought close to the tag.\n\nThe placement choice depends on your personal comfort and convenience."
      },
      {
        id: "start-3",
        question: "Do I need a mobile app to use PayTap?",
        answer: "No.\n\nPayTap payments happen directly through the NFC tag and merchant card machine.\n\nYou only need access to your PayTap dashboard to manage your vehicles, monitor transactions, and control spending."
      }
    ]
  },
  {
    id: "payments",
    title: "Payments & Usage",
    description: "Where and how to use PayTap for everyday payments",
    icon: "CreditCard",
    faqs: [
      {
        id: "pay-1",
        question: "Where can I use PayTap?",
        answer: "PayTap works anywhere that accepts contactless card payments using NFC-enabled POS machines.\n\nCommon places include:\n\n• Fuel stations\n• Vehicle service centers\n• Car washes\n• Other merchants using card machines"
      },
      {
        id: "pay-2",
        question: "Do drivers need cash anymore?",
        answer: "No.\n\nWith PayTap, drivers do not need to carry cash or personal cards for vehicle expenses.\n\nPayments are made directly through the vehicle's PayTap tag.\n\nOwners can monitor every transaction from the PayTap dashboard."
      }
    ]
  },
  {
    id: "security",
    title: "Security & Safety",
    description: "How PayTap keeps your payments and data safe",
    icon: "ShieldCheck",
    faqs: [
      {
        id: "sec-1",
        question: "What if someone taps my PayTap tag from outside the vehicle?",
        answer: "PayTap transactions can only happen through authorized merchant POS machines.\n\nThese machines are issued by regulated payment providers and are linked to KYC-verified merchants.\n\nRandom phones or devices cannot trigger payments from the PayTap tag.\n\nEvery transaction is digitally recorded and traceable."
      },
      {
        id: "sec-2",
        question: "Is my bank account linked to PayTap?",
        answer: "No.\n\nPayTap does not connect directly to your personal bank account.\n\nPayTap operates using a prepaid infrastructure where you load money into your PayTap wallet only when required.\n\nThis ensures your personal bank details and banking credentials remain protected."
      },
      {
        id: "sec-3",
        question: "How does PayTap keep my payment information safe?",
        answer: "PayTap uses tokenization technology.\n\nTokenization replaces sensitive card information with secure tokens that cannot be used outside the PayTap system.\n\nThis means your payment details are never exposed.\n\nTokenization is widely considered one of the safest methods for digital payment security."
      },
      {
        id: "sec-4",
        question: "What if someone still manages to tap my tag?",
        answer: "Even in a worst-case scenario, PayTap payments go through regulated merchant POS machines that belong to KYC-verified businesses.\n\nEvery transaction creates a complete digital audit trail.\n\nThis allows investigation and recovery in case of unauthorized merchant activity.\n\nAdditionally, PayTap gives users control tools such as:\n\n• Turning contactless payments ON or OFF\n• Setting transaction limits\n• Requiring PIN authentication for high-value payments"
      },
      {
        id: "sec-5",
        question: "What are the payment limits?",
        answer: "Contactless transactions can be made up to ₹5,000.\n\nFor transactions above ₹5,000, a secure PIN authentication is required.\n\nThis provides an additional layer of protection."
      },
      {
        id: "sec-6",
        question: "Can I disable contactless payments?",
        answer: "Yes.\n\nYou can enable or disable contactless payments anytime through your PayTap dashboard."
      }
    ]
  },
  {
    id: "account",
    title: "Managing Your Account",
    description: "Control your wallet, limits, and settings",
    icon: "Settings",
    faqs: [
      {
        id: "acc-1",
        question: "How do I load money into PayTap?",
        answer: "You can load money into your PayTap wallet through the dashboard using supported payment methods.\n\nThe PayTap wallet functions as a prepaid balance used for vehicle expenses."
      },
      {
        id: "acc-2",
        question: "Can I set spending limits?",
        answer: "Yes.\n\nYou can set transaction limits to control vehicle expenses and prevent misuse."
      }
    ]
  },
  {
    id: "kyc",
    title: "KYC & Account Limits",
    description: "Understanding verification requirements and transaction limits",
    icon: "UserCheck",
    faqs: [
      {
        id: "kyc-1",
        question: "What is KYC and why do I need it?",
        answer: "KYC stands for Know Your Customer. It is a mandatory verification process required for all prepaid accounts.\n\nWhen you first sign up, your account is activated with minimum KYC, which keeps your account valid for 12 months.\n\nYou are required to complete your full KYC within this period to continue using your account without any issues.\n\nImportant: Always complete your full KYC while you have only one vehicle linked to your account. This ensures your account setup is clean and avoids complications when adding more vehicles later."
      },
      {
        id: "kyc-2",
        question: "What are the limits with minimum KYC?",
        answer: "With minimum KYC, your account has the following limits:\n\n• Monthly deposit limit: ₹10,000\n• Monthly withdrawal limit: ₹10,000\n• Account validity: 12 months\n\nThese limits apply to both deposits and withdrawals.\n\nPlease complete your full KYC before linking additional vehicles to your account."
      },
      {
        id: "kyc-3",
        question: "What are the limits after full KYC?",
        answer: "Once you complete full KYC for an individual account, your limits increase significantly:\n\n• Monthly deposit limit: ₹2,00,000\n• Monthly withdrawal limit: ₹2,00,000\n\nWe strongly recommend completing full KYC as early as possible to avoid any disruptions to your account or vehicle payments."
      },
      {
        id: "kyc-4",
        question: "How does KYC work for corporate accounts?",
        answer: "Corporate accounts go through a complete KYC process at the company level.\n\nOnce verified, a corporate prepaid business account is provided. At the corporate level, there are no deposit or withdrawal limits.\n\nUnder the corporate account, individual employee-level accounts are created. Each employee manages multiple vehicles assigned to them.\n\nHowever, at the employee level, standard KYC limits still apply:\n\n• Minimum KYC: ₹10,000 monthly limit\n• Full KYC: ₹2,00,000 monthly limit\n\nEach employee must complete their own KYC as per the prepaid programme norms."
      }
    ]
  },
  {
    id: "fleet",
    title: "Fleet & Business Use",
    description: "PayTap for businesses and fleet operators",
    icon: "Building2",
    faqs: [
      {
        id: "fleet-1",
        question: "Can I manage multiple vehicles?",
        answer: "Yes.\n\nPayTap allows you to manage multiple vehicles from a single dashboard.\n\nEach vehicle receives its own PayTap tag."
      },
      {
        id: "fleet-2",
        question: "Can I track expenses by vehicle?",
        answer: "Yes.\n\nPayTap provides transaction history and expense tracking for every vehicle."
      }
    ]
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    description: "Common issues and how to resolve them",
    icon: "Wrench",
    faqs: [
      {
        id: "trouble-1",
        question: "What if a payment fails at a petrol pump?",
        answer: "If a tap payment fails at a petrol pump, don't worry — it's almost always a merchant machine issue, not your PayTap tag.\n\nHere's what to do:\n\n• Try tapping again on the same machine\n• Ask the petrol pump attendant to retry the transaction\n• Try a smaller amount like ₹1 as a test transaction\n• If it still fails, ask the attendant to try a different card machine\n\nSome older POS machines at fuel stations haven't been upgraded to support the latest contactless payment limits. This can cause transactions to fail even though your tag is working perfectly fine.\n\nIf the payment is being attempted and you see an error or decline, that itself confirms your NFC tag is communicating with the machine. The issue is on the machine's side, not your tag.\n\nYour balance and account are completely safe — failed transactions do not deduct any money."
      },
      {
        id: "trouble-2",
        question: "How can I test if my PayTap tag is working?",
        answer: "You can easily test your PayTap from your dashboard without visiting any merchant.\n\nPayTap provides a prepaid virtual card linked to your account. You can find the card details in your dashboard.\n\nUse those card details to make a small test transaction on any online platform — just like you would with a regular debit or credit card.\n\nIf the online transaction goes through successfully, your PayTap account and card are working perfectly."
      },
      {
        id: "trouble-3",
        question: "Why do some transactions fail even when the tag is working?",
        answer: "The PayTap NFC tag does not selectively block or fail transactions. If your tag is tapping and communicating with the machine, it is working.\n\nTransaction failures happen because of limitations on the merchant's POS machine, not your tag. Common reasons include:\n\n• The POS machine is running outdated firmware\n• The machine hasn't been upgraded to support current contactless transaction limits\n• Network connectivity issues at the merchant's end\n\nIf a transaction fails, your balance is completely safe — no money is deducted for failed transactions.\n\nYou can always verify your tag is working by making a test transaction online using your virtual card details from the PayTap dashboard."
      }
    ]
  },
  {
    id: "support",
    title: "Support & Account Closure",
    description: "Get help and manage your account",
    icon: "Headphones",
    faqs: [
      {
        id: "support-1",
        question: "How can I contact customer support?",
        answer: "You can reach us via email at support@paytap.co.in or call us at our helpline number."
      },
      {
        id: "support-2",
        question: "How do I close my PayTap account?",
        answer: "To close your PayTap account, you must first clear your wallet balance completely.\n\nOnce your balance is zero, go to your Card Settings, scroll down, and select the option to permanently close your account.\n\nPlease note that account closure is permanent and cannot be reversed."
      }
    ]
  }
];
