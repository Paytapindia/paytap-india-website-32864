/// <reference types="vite/client" />

// Google Tag Manager / Analytics
interface Window {
  gtag: (...args: unknown[]) => void;
  fbq: (...args: unknown[]) => void;
  dataLayer: unknown[];
}
