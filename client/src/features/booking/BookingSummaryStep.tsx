import dayjs from "dayjs";

import { Button } from "@/components";
import { calculateBookingTotal } from "@/lib/booking";
import { formatCurrency } from "@/lib/currency";
import type { GarmentDetailsValues, PickupDetailsValues } from "@/schemas/bookingSchemas";

interface BookingSummaryStepProps {
  pickup: PickupDetailsValues;
  garment: GarmentDetailsValues;
  onNext: () => void;
  onBack: () => void;
}

export default function BookingSummaryStep({
  pickup,
  garment,
  onNext,
  onBack,
}: BookingSummaryStepProps) {
  const { service, delivery, subtotal, deliveryFee, total } = calculateBookingTotal(
    pickup,
    garment,
  );

  return (
    <div className="space-y-6">
      <h2 className="font-redhat text-xl font-bold text-text-primary">Booking Summary</h2>

      <div className="space-y-4 rounded-2xl bg-white/5 p-5 text-sm">
        <div className="flex justify-between">
          <span className="text-text-secondary">Service</span>
          <span className="font-medium text-text-primary">{service?.label}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-text-secondary">Pickup Date</span>
          <span className="font-medium text-text-primary">
            {dayjs(pickup.pickupDate).format("MMM D, YYYY")}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-text-secondary">Pickup Time</span>
          <span className="font-medium text-text-primary">{pickup.pickupTime}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-text-secondary">Address</span>
          <span className="max-w-56 truncate text-right font-medium text-text-primary">
            {pickup.address}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-text-secondary">Items</span>
          <span className="font-medium text-text-primary">{garment.itemCount}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-text-secondary">Delivery Option</span>
          <span className="font-medium text-text-primary">{delivery?.label}</span>
        </div>

        {garment.instructions && (
          <div className="flex justify-between gap-4">
            <span className="shrink-0 text-text-secondary">Instructions</span>
            <span className="text-right font-medium text-text-primary">
              {garment.instructions}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-2 border-t border-white/10 pt-4 text-sm">
        <div className="flex justify-between text-text-secondary">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between text-text-secondary">
          <span>Delivery Fee</span>
          <span>{deliveryFee > 0 ? formatCurrency(deliveryFee) : "Free"}</span>
        </div>

        <div className="flex justify-between text-base font-bold text-text-primary">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="outline" className="shrink-0" onClick={onBack}>
          Back
        </Button>

        <Button type="button" className="flex-1" onClick={onNext}>
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
}
