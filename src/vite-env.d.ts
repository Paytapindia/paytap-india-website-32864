/// <reference types="vite/client" />

// Google Tag Manager / Analytics
interface Window {
  gtag: (...args: unknown[]) => void;
  dataLayer: unknown[];
}
