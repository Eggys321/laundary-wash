import { useMemo, useState } from "react";
import { CheckCircle2, Clock3, Truck } from "lucide-react";
import toast from "react-hot-toast";

import { ActivityTable, AdminPageHeader, OrderDetailsModal, StatCard } from "@/components/admin";
import { Seo } from "@/components";
import { useOrdersStore } from "@/store/ordersStore";
import { useAdminSearchStore } from "@/store/adminSearchStore";
import { ordersToActivity, type ActivityEntry } from "@/lib/adminData";
import { ORDER_STATUS_LABEL } from "@/data/mockOrders";
import { downloadCsv } from "@/lib/csv";

export default function AdminOrdersPage() {
  const orders = useOrdersStore((state) => state.orders);
  const updateOrderStatus = useOrdersStore((state) => state.updateOrderStatus);
  const query = useAdminSearchStore((state) => state.query);
  const [activeOrder, setActiveOrder] = useState<ActivityEntry["order"]>();

  const pendingCount = orders.filter((order) => order.status === "pending").length;
  const ongoingCount = orders.filter((order) => order.status === "ongoing").length;
  const completedCount = orders.filter((order) => order.status === "completed").length;

  const activity = useMemo(() => {
    const entries = ordersToActivity(orders);

    if (!query.trim()) return entries;

    const needle = query.trim().toLowerCase();
    return entries.filter(
      (entry) =>
        entry.id.toLowerCase().includes(needle) ||
        entry.service.toLowerCase().includes(needle),
    );
  }, [orders, query]);

  const handleExport = () => {
    downloadCsv(
      "orders.csv",
      ["Order", "Service", "Date", "Status", "Amount"],
      activity.map((entry) => [
        entry.id,
        entry.service,
        entry.date,
        entry.status ? ORDER_STATUS_LABEL[entry.status] : "-",
        entry.amount ?? "-",
      ]),
    );
  };

  return (
    <>
      <Seo title="Admin Orders" description="Manage all Laundry Wash orders." />

      <AdminPageHeader title="Orders" onExport={handleExport} />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Clock3} label="Pending" value={String(pendingCount)} tone="amber" />
        <StatCard icon={Truck} label="Ongoing" value={String(ongoingCount)} tone="blue" />
        <StatCard
          icon={CheckCircle2}
          label="Completed"
          value={String(completedCount)}
          tone="green"
        />
      </div>

      <div className="mt-6">
        <ActivityTable
          entries={activity}
          onViewDetails={(entry) => entry.order && setActiveOrder(entry.order)}
          onAccept={(entry) => {
            if (!entry.order) return;
            updateOrderStatus(entry.order.id, "ongoing");
            toast.success(`Order ${entry.order.id} accepted.`);
          }}
          onReject={(entry) => {
            if (!entry.order) return;
            updateOrderStatus(entry.order.id, "cancelled");
            toast.success(`Order ${entry.order.id} rejected.`);
          }}
        />
      </div>

      {activeOrder && (
        <OrderDetailsModal order={activeOrder} onClose={() => setActiveOrder(undefined)} />
      )}
    </>
  );
}
