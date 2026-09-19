import { X } from "lucide-react";
import dayjs from "dayjs";

import { Badge } from "@/components";
import { ORDER_STATUS_LABEL, PAYMENT_STATUS_LABEL, type Order } from "@/data/mockOrders";
import { formatCurrency } from "@/lib/currency";

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
}

export default function OrderDetailsModal({ order, onClose }: OrderDetailsModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md rounded-3xl bg-background-gray-2 p-6 sm:p-8">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-redhat text-xl font-bold text-text-primary">
              Order {order.id}
            </h2>
            <p className="mt-1 text-sm text-text-secondary">Order details</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-text-secondary hover:bg-white/10 hover:text-text-primary"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-6 space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="text-text-secondary">Service</span>
            <span className="font-medium text-text-primary">{order.service}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-text-secondary">Scheduled For</span>
            <span className="font-medium text-text-primary">
              {dayjs(order.scheduledFor).format("MMM D, YYYY")}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="shrink-0 text-text-secondary">Address</span>
            <span className="text-right font-medium text-text-primary">{order.address}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-text-secondary">Items</span>
            <span className="font-medium text-text-primary">{order.items}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-text-secondary">Amount</span>
            <span className="font-medium text-text-primary">
              {formatCurrency(order.amount)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-text-secondary">Payment</span>
            <span className="font-medium text-text-primary">
              {order.paymentMethod === "paystack" ? "Paystack" : "Cash on Delivery"} ·{" "}
              {PAYMENT_STATUS_LABEL[order.paymentStatus]}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Status</span>
            <Badge tone={order.status}>{ORDER_STATUS_LABEL[order.status]}</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
