import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { PackageOpen } from "lucide-react";

import { Badge, Seo } from "@/components";
import {
  ORDER_STATUS_LABEL,
  PAYMENT_STATUS_LABEL,
  type OrderStatus,
} from "@/data/mockOrders";
import { formatCurrency } from "@/lib/currency";
import { useOrdersStore } from "@/store/ordersStore";

type FilterValue = OrderStatus | "all";

const FILTERS: { label: string; value: FilterValue }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Ongoing", value: "ongoing" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export default function OrdersPage() {
  const allOrders = useOrdersStore((state) => state.orders);
  const [filter, setFilter] = useState<FilterValue>("all");

  const orders = useMemo(
    () =>
      filter === "all"
        ? allOrders
        : allOrders.filter((order) => order.status === filter),
    [allOrders, filter],
  );

  return (
    <>
      <Seo
        title="My Orders"
        description="Track the status of your current and past Laundry Wash orders."
      />

      <div className="rounded-3xl bg-background-gray-2 p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-redhat text-2xl font-bold text-text-primary">Orders</h1>
            <p className="mt-1 text-sm text-text-secondary">
              View and track all of your laundry orders.
            </p>
          </div>

          <Link to="/book" className="btn btn-primary w-fit rounded-xl">
            Book Laundry
          </Link>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
          {FILTERS.map(({ label, value }) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={
                filter === value
                  ? "shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white"
                  : "shrink-0 rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-text-secondary hover:bg-white/10"
              }
            >
              {label}
            </button>
          ))}
        </div>

        {orders.length === 0 ? (
          <div className="mt-10 flex flex-col items-center py-12 text-center">
            <PackageOpen size={40} className="text-text-secondary/60" />
            <p className="mt-4 text-sm text-text-secondary">
              No orders found for this filter.
            </p>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-150 border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-text-secondary">
                  <th className="pb-3 pr-4 font-medium">Order</th>
                  <th className="pb-3 pr-4 font-medium">Service</th>
                  <th className="pb-3 pr-4 font-medium">Date</th>
                  <th className="pb-3 pr-4 font-medium">Amount</th>
                  <th className="pb-3 pr-4 font-medium">Payment</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-white/5 text-text-primary">
                    <td className="py-4 pr-4 font-medium">{order.id}</td>
                    <td className="py-4 pr-4">{order.service}</td>
                    <td className="py-4 pr-4 text-text-secondary">
                      {dayjs(order.scheduledFor).format("MMM D, YYYY · h:mm A")}
                    </td>
                    <td className="py-4 pr-4">{formatCurrency(order.amount)}</td>
                    <td className="py-4 pr-4">
                      <Badge tone={order.paymentStatus === "paid" ? "completed" : "pending"}>
                        {PAYMENT_STATUS_LABEL[order.paymentStatus]}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <Badge tone={order.status}>{ORDER_STATUS_LABEL[order.status]}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
