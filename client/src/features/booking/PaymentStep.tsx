import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Banknote, CreditCard } from "lucide-react";
import clsx from "clsx";

import { Button } from "@/components";
import { formatCurrency } from "@/lib/currency";
import { isPaystackConfigured, openPaystackCheckout } from "@/lib/paystack";
import {
  paymentDetailsSchema,
  type PaymentDetailsValues,
} from "@/schemas/bookingSchemas";

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

const PAYMENT_METHODS = [
  { value: "paystack", label: "Pay with Card / Bank (Paystack)", icon: CreditCard },
  { value: "cash", label: "Cash on Delivery", icon: Banknote },
] as const;

interface PaymentStepProps {
  total: number;
  email: string;
  isProcessing: boolean;
  onSubmit: (values: PaymentDetailsValues) => void;
  onBack: () => void;
}

export default function PaymentStep({
  total,
  email,
  isProcessing,
  onSubmit,
  onBack,
}: PaymentStepProps) {
  const [isCharging, setIsCharging] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PaymentDetailsValues>({
    resolver: zodResolver(paymentDetailsSchema),
    defaultValues: { paymentMethod: undefined },
  });

  const selectedMethod = watch("paymentMethod");
  const paystackConfigured = isPaystackConfigured();

  const handleFormSubmit = async (values: PaymentDetailsValues) => {
    setCheckoutError(null);

    if (values.paymentMethod === "cash") {
      onSubmit(values);
      return;
    }

    if (!paystackConfigured) {
      setCheckoutError(
        "Card payments aren't configured yet. Add VITE_PAYSTACK_PUBLIC_KEY to your .env file to enable Paystack checkout.",
      );
      return;
    }

    setIsCharging(true);

    try {
      await openPaystackCheckout({
        key: PAYSTACK_PUBLIC_KEY!,
        email,
        amountKobo: Math.round(total * 100),
        reference: `LW-${Date.now()}`,
        onSuccess: () => {
          setIsCharging(false);
          onSubmit(values);
        },
        onClose: () => setIsCharging(false),
      });
    } catch (error) {
      setIsCharging(false);
      setCheckoutError(
        error instanceof Error ? error.message : "Unable to start Paystack checkout.",
      );
    }
  };

  const isBusy = isProcessing || isCharging;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="space-y-6">
      <h2 className="font-redhat text-xl font-bold text-text-primary">Payment</h2>

      <div className="flex items-center justify-between rounded-2xl bg-white/5 p-5">
        <span className="text-sm text-text-secondary">Amount to pay</span>
        <span className="font-redhat text-xl font-bold text-text-primary">
          {formatCurrency(total)}
        </span>
      </div>

      <div className="space-y-3">
        {PAYMENT_METHODS.map(({ value, label, icon: Icon }) => (
          <label
            key={value}
            className={clsx(
              "flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition-colors",
              selectedMethod === value
                ? "border-primary bg-primary/10"
                : "border-white/10 hover:border-white/20",
            )}
          >
            <input
              type="radio"
              value={value}
              checked={selectedMethod === value}
              onChange={() => setValue("paymentMethod", value, { shouldValidate: true })}
              className="radio radio-primary radio-sm"
            />

            <Icon size={20} className="text-primary" />

            <span className="font-medium text-text-primary">{label}</span>
          </label>
        ))}

        {selectedMethod === "paystack" && !paystackConfigured && (
          <p className="text-xs text-amber-400">
            Card payments aren't configured yet — a Paystack public key hasn't been added.
          </p>
        )}
      </div>

      {errors.paymentMethod?.message && (
        <p className="text-sm text-error">{errors.paymentMethod.message}</p>
      )}

      {checkoutError && <p className="text-sm text-error">{checkoutError}</p>}

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          className="shrink-0"
          onClick={onBack}
          disabled={isBusy}
        >
          Back
        </Button>

        <Button type="submit" className="flex-1" isLoading={isBusy}>
          Pay {formatCurrency(total)}
        </Button>
      </div>
    </form>
  );
}
