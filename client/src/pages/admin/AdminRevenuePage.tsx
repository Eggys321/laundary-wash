import { useMemo, useState } from "react";
import { CheckCircle2, Clock3, Wallet } from "lucide-react";
import dayjs from "dayjs";

import { AdminPageHeader, StatCard } from "@/components/admin";
import { Badge, Seo } from "@/components";
import { useOrdersStore } from "@/store/ordersStore";
import { useAdminSearchStore } from "@/store/adminSearchStore";
import { getRevenueSummary, paginate } from "@/lib/adminData";
import { formatCurrency } from "@/lib/currency";
import { downloadCsv } from "@/lib/csv";
import { PAYMENT_STATUS_LABEL } from "@/data/mockOrders";

const PAGE_SIZE = 8;

export default function AdminRevenuePage() {
  const orders = useOrdersStore((state) => state.orders);
  const query = useAdminSearchStore((state) => state.query);
  const [page, setPage] = useState(1);

  const revenue = getRevenueSummary(orders);

  const rows = useMemo(() => {
    const active = orders
      .filter((order) => order.status !== "cancelled")
      .sort((a, b) => new Date(b.scheduledFor).getTime() - new Date(a.scheduledFor).getTime());

    if (!query.trim()) return active;

    const needle = query.trim().toLowerCase();
    return active.filter(
      (order) =>
        order.id.toLowerCase().includes(needle) || order.service.toLowerCase().includes(needle),
    );
  }, [orders, query]);

  const { items, totalPages, page: currentPage } = paginate(rows, page, PAGE_SIZE);

  const handleExport = () => {
    downloadCsv(
      "revenue.csv",
      ["Order", "Service", "Date", "Payment Method", "Payment Status", "Amount"],
      rows.map((order) => [
        order.id,
        order.service,
        order.scheduledFor,
        order.paymentMethod === "paystack" ? "Paystack" : "Cash on Delivery",
        PAYMENT_STATUS_LABEL[order.paymentStatus],
        order.amount,
      ]),
    );
  };

  return (
    <>
      <Seo title="Admin Revenue" description="Laundry Wash revenue overview." />

      <AdminPageHeader title="Revenue" onExport={handleExport} />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={Wallet}
          label="Total Revenue"
          value={formatCurrency(revenue.totalRevenue)}
          tone="teal"
        />
        <StatCard
          icon={CheckCircle2}
          label="Paid"
          value={formatCurrency(revenue.paidRevenue)}
          tone="green"
        />
        <StatCard
          icon={Clock3}
          label="Pending"
          value={formatCurrency(revenue.pendingRevenue)}
          tone="amber"
        />
      </div>

      <div className="mt-6 rounded-3xl bg-background-gray-2 p-6 sm:p-8">
        <h2 className="font-redhat text-lg font-bold text-text-primary">Payments</h2>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-175 border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-text-secondary">
                <th className="pb-3 pr-4 font-medium">Order</th>
                <th className="pb-3 pr-4 font-medium">Service</th>
                <th className="pb-3 pr-4 font-medium">Date</th>
                <th className="pb-3 pr-4 font-medium">Method</th>
                <th className="pb-3 pr-4 font-medium">Payment</th>
                <th className="pb-3 font-medium">Amount</th>
              </tr>
            </thead>

            <tbody>
              {items.map((order) => (
                <tr key={order.id} className="border-b border-white/5 text-text-primary">
                  <td className="py-4 pr-4 font-medium">{order.id}</td>
                  <td className="py-4 pr-4 text-text-secondary">{order.service}</td>
                  <td className="py-4 pr-4 text-text-secondary">
                    {dayjs(order.scheduledFor).format("MMM D, YYYY")}
                  </td>
                  <td className="py-4 pr-4 text-text-secondary">
                    {order.paymentMethod === "paystack" ? "Paystack" : "Cash"}
                  </td>
                  <td className="py-4 pr-4">
                    <Badge tone={order.paymentStatus === "paid" ? "completed" : "pending"}>
                      {PAYMENT_STATUS_LABEL[order.paymentStatus]}
                    </Badge>
                  </td>
                  <td className="py-4">{formatCurrency(order.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between text-sm text-text-secondary">
          <span>
            Page {currentPage} of {totalPages}
          </span>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage <= 1}
              className="rounded-lg bg-white/5 px-3 py-1.5 font-medium hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Previous
            </button>

            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage >= totalPages}
              className="rounded-lg bg-white/5 px-3 py-1.5 font-medium hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
