import {
  DELIVERY_OPTIONS,
  SERVICE_TYPE_OPTIONS,
  type GarmentDetailsValues,
  type PickupDetailsValues,
} from "@/schemas/bookingSchemas";

export const getServiceOption = (value: string) =>
  SERVICE_TYPE_OPTIONS.find((option) => option.value === value);

export const getDeliveryOption = (value: string) =>
  DELIVERY_OPTIONS.find((option) => option.value === value);

export const calculateBookingTotal = (
  pickup: Partial<PickupDetailsValues>,
  garment: Partial<GarmentDetailsValues>,
) => {
  const service = getServiceOption(pickup.serviceType ?? "");
  const delivery = getDeliveryOption(garment.deliveryOption ?? "");
  const itemCount = garment.itemCount ?? 0;

  const subtotal = (service?.pricePerItem ?? 0) * itemCount;
  const deliveryFee = delivery?.fee ?? 0;

  return {
    service,
    delivery,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
  };
};

export const generateOrderId = () =>
  `LW-${Math.floor(10000 + Math.random() * 89999)}`;
