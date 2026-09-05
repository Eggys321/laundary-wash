export type OrderStatus = "pending" | "ongoing" | "completed" | "cancelled";
export type PaymentMethod = "paystack" | "cash";
export type PaymentStatus = "paid" | "pending";

export interface Order {
  id: string;
  service: string;
  scheduledFor: string;
  address: string;
  status: OrderStatus;
  amount: number;
  items: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
}

export const MOCK_ORDERS: Order[] = [
  {
    id: "LW-10234",
    service: "Wash & Fold",
    scheduledFor: "2026-09-08T09:00:00",
    address: "12 Admiralty Way, Lekki, Lagos",
    status: "pending",
    amount: 8500,
    items: 12,
    paymentMethod: "cash",
    paymentStatus: "pending",
  },
  {
    id: "LW-10221",
    service: "Dry Cleaning",
    scheduledFor: "2026-09-04T14:00:00",
    address: "12 Admiralty Way, Lekki, Lagos",
    status: "ongoing",
    amount: 15200,
    items: 5,
    paymentMethod: "paystack",
    paymentStatus: "paid",
  },
  {
    id: "LW-10198",
    service: "Wash & Iron",
    scheduledFor: "2026-08-27T10:30:00",
    address: "12 Admiralty Way, Lekki, Lagos",
    status: "completed",
    amount: 11000,
    items: 9,
    paymentMethod: "paystack",
    paymentStatus: "paid",
  },
  {
    id: "LW-10176",
    service: "Ironing Service",
    scheduledFor: "2026-08-19T16:00:00",
    address: "12 Admiralty Way, Lekki, Lagos",
    status: "completed",
    amount: 4200,
    items: 7,
    paymentMethod: "cash",
    paymentStatus: "paid",
  },
  {
    id: "LW-10150",
    service: "Pickup & Delivery",
    scheduledFor: "2026-08-10T11:00:00",
    address: "12 Admiralty Way, Lekki, Lagos",
    status: "cancelled",
    amount: 6000,
    items: 4,
    paymentMethod: "cash",
    paymentStatus: "pending",
  },
];

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Pending",
  ongoing: "Ongoing",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const PAYMENT_STATUS_LABEL: Record<PaymentStatus, string> = {
  paid: "Paid",
  pending: "Pay on delivery",
};
