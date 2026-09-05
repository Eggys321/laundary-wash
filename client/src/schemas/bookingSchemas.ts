import { z } from "zod";

export const pickupDetailsSchema = z.object({
  serviceType: z.string().min(1, "Select a service"),
  pickupDate: z.string().min(1, "Select a pickup date"),
  pickupTime: z.string().min(1, "Select a pickup time"),
  address: z.string().min(6, "Enter your pickup address"),
});

export type PickupDetailsValues = z.infer<typeof pickupDetailsSchema>;

export const garmentDetailsSchema = z.object({
  itemCount: z
    .number({ message: "Enter the number of items" })
    .min(1, "Enter at least 1 item"),
  deliveryOption: z.string().min(1, "Select a delivery option"),
  instructions: z.string().max(300, "Keep instructions under 300 characters").optional(),
});

export type GarmentDetailsValues = z.infer<typeof garmentDetailsSchema>;

export const paymentDetailsSchema = z.object({
  paymentMethod: z.enum(["paystack", "cash"], {
    message: "Select a payment method",
  }),
});

export type PaymentDetailsValues = z.infer<typeof paymentDetailsSchema>;

export const SERVICE_TYPE_OPTIONS = [
  { label: "Wash & Fold", value: "wash-fold", pricePerItem: 700 },
  { label: "Wash & Iron", value: "wash-iron", pricePerItem: 900 },
  { label: "Dry Cleaning", value: "dry-cleaning", pricePerItem: 1500 },
  { label: "Ironing Service", value: "ironing", pricePerItem: 500 },
];

export const DELIVERY_OPTIONS = [
  { label: "Standard (48 hours)", value: "standard", fee: 0 },
  { label: "Express (24 hours)", value: "express", fee: 2000 },
];

export const PICKUP_TIME_SLOTS = [
  { label: "8:00 AM - 10:00 AM", value: "08:00-10:00" },
  { label: "10:00 AM - 12:00 PM", value: "10:00-12:00" },
  { label: "12:00 PM - 2:00 PM", value: "12:00-14:00" },
  { label: "2:00 PM - 4:00 PM", value: "14:00-16:00" },
  { label: "4:00 PM - 6:00 PM", value: "16:00-18:00" },
];
