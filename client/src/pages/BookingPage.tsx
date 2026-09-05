import { useState } from "react";
import toast from "react-hot-toast";

import { Seo, StepIndicator } from "@/components";
import {
  BookingSuccess,
  BookingSummaryStep,
  GarmentDetailsStep,
  PaymentStep,
  PickupDetailsStep,
} from "@/features/booking";
import { useAuth } from "@/hooks";
import { calculateBookingTotal, generateOrderId, getServiceOption } from "@/lib/booking";
import { useOrdersStore } from "@/store/ordersStore";
import type {
  GarmentDetailsValues,
  PaymentDetailsValues,
  PickupDetailsValues,
} from "@/schemas/bookingSchemas";

const STEPS = ["Pick-Up", "Details", "Summary", "Payment"];

export default function BookingPage() {
  const { user } = useAuth();
  const addOrder = useOrdersStore((state) => state.addOrder);
  const [step, setStep] = useState(1);
  const [pickup, setPickup] = useState<PickupDetailsValues>();
  const [garment, setGarment] = useState<GarmentDetailsValues>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState<string>();
  const [isPaidOnline, setIsPaidOnline] = useState(false);

  const handlePickupSubmit = (values: PickupDetailsValues) => {
    setPickup(values);
    setStep(2);
  };

  const handleGarmentSubmit = (values: GarmentDetailsValues) => {
    setGarment(values);
    setStep(3);
  };

  const handlePaymentSubmit = async (values: PaymentDetailsValues) => {
    if (!pickup || !garment) return;

    setIsProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const { total } = calculateBookingTotal(pickup, garment);
    const isPaystack = values.paymentMethod === "paystack";
    const newOrderId = generateOrderId();

    addOrder({
      id: newOrderId,
      service: getServiceOption(pickup.serviceType)?.label ?? pickup.serviceType,
      scheduledFor: `${pickup.pickupDate}T00:00:00`,
      address: pickup.address,
      status: "pending",
      amount: total,
      items: garment.itemCount,
      paymentMethod: values.paymentMethod,
      paymentStatus: isPaystack ? "paid" : "pending",
    });

    setOrderId(newOrderId);
    setIsPaidOnline(isPaystack);
    setIsProcessing(false);
    toast.success(isPaystack ? "Payment successful!" : "Order confirmed!");
  };

  if (orderId && pickup && garment) {
    const { total } = calculateBookingTotal(pickup, garment);

    return (
      <>
        <Seo
          title="Booking Confirmed"
          description="Your Laundry Wash booking has been confirmed."
        />

        <div className="bg-background-dark px-4 py-16 font-lato">
          <div className="container mx-auto max-w-xl rounded-3xl bg-background-gray-2 p-6 sm:p-10">
            <BookingSuccess orderId={orderId} amountDue={isPaidOnline ? undefined : total} />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Seo
        title="Book Laundry"
        description="Schedule a laundry pickup in minutes and let us handle the rest."
      />

      <div className="bg-background-dark px-4 py-12 font-lato sm:py-16">
        <div className="container mx-auto max-w-2xl">
          <div className="mb-8">
            <StepIndicator steps={STEPS} currentStep={step} />
          </div>

          <div className="rounded-3xl bg-background-gray-2 p-6 sm:p-10">
            {step === 1 && (
              <PickupDetailsStep defaultValues={pickup ?? {}} onNext={handlePickupSubmit} />
            )}

            {step === 2 && (
              <GarmentDetailsStep
                defaultValues={garment ?? {}}
                onNext={handleGarmentSubmit}
                onBack={() => setStep(1)}
              />
            )}

            {step === 3 && pickup && garment && (
              <BookingSummaryStep
                pickup={pickup}
                garment={garment}
                onNext={() => setStep(4)}
                onBack={() => setStep(2)}
              />
            )}

            {step === 4 && pickup && garment && (
              <PaymentStep
                total={calculateBookingTotal(pickup, garment).total}
                email={user?.email ?? ""}
                isProcessing={isProcessing}
                onSubmit={handlePaymentSubmit}
                onBack={() => setStep(3)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
