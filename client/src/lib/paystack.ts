export interface PaystackCheckoutOptions {
  key: string;
  email: string;
  amountKobo: number;
  reference: string;
  onSuccess: (reference: string) => void;
  onClose: () => void;
}

interface PaystackHandler {
  openIframe: () => void;
}

interface PaystackPop {
  setup: (options: {
    key: string;
    email: string;
    amount: number;
    currency: string;
    ref: string;
    callback: (response: { reference: string }) => void;
    onClose: () => void;
  }) => PaystackHandler;
}

declare global {
  interface Window {
    PaystackPop?: PaystackPop;
  }
}

const PAYSTACK_SCRIPT_SRC = "https://js.paystack.co/v1/inline.js";

let scriptPromise: Promise<void> | null = null;

export const isPaystackConfigured = () =>
  Boolean(import.meta.env.VITE_PAYSTACK_PUBLIC_KEY);

const loadPaystackScript = () => {
  if (window.PaystackPop) {
    return Promise.resolve();
  }

  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = PAYSTACK_SCRIPT_SRC;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        scriptPromise = null;
        reject(new Error("Failed to load Paystack checkout. Check your connection and try again."));
      };
      document.body.appendChild(script);
    });
  }

  return scriptPromise;
};

export const openPaystackCheckout = async ({
  key,
  email,
  amountKobo,
  reference,
  onSuccess,
  onClose,
}: PaystackCheckoutOptions) => {
  await loadPaystackScript();

  if (!window.PaystackPop) {
    throw new Error("Paystack failed to load. Please try again.");
  }

  const handler = window.PaystackPop.setup({
    key,
    email,
    amount: amountKobo,
    currency: "NGN",
    ref: reference,
    callback: (response) => onSuccess(response.reference),
    onClose,
  });

  handler.openIframe();
};
