import { useMemo, useState } from "react";
import { CheckCircle2, PackageCheck, Truck } from "lucide-react";

import { ActivityTable, AdminPageHeader, OrderDetailsModal, StatCard } from "@/components/admin";
import { Seo } from "@/components";
import { useOrdersStore } from "@/store/ordersStore";
import { useAdminSearchStore } from "@/store/adminSearchStore";
import { ordersToActivity, type ActivityEntry } from "@/lib/adminData";
import { ORDER_STATUS_LABEL } from "@/data/mockOrders";
import { downloadCsv } from "@/lib/csv";

export default function AdminDeliveriesPage() {
  const orders = useOrdersStore((state) => state.orders);
  const query = useAdminSearchStore((state) => state.query);
  const [activeOrder, setActiveOrder] = useState<ActivityEntry["order"]>();

  const deliveries = useMemo(
    () => orders.filter((order) => order.status === "ongoing" || order.status === "completed"),
    [orders],
  );

  const outForDelivery = deliveries.filter((order) => order.status === "ongoing").length;
  const delivered = deliveries.filter((order) => order.status === "completed").length;

  const activity = useMemo(() => {
    const entries = ordersToActivity(deliveries);

    if (!query.trim()) return entries;

    const needle = query.trim().toLowerCase();
    return entries.filter(
      (entry) =>
        entry.id.toLowerCase().includes(needle) ||
        entry.service.toLowerCase().includes(needle),
    );
  }, [deliveries, query]);

  const handleExport = () => {
    downloadCsv(
      "deliveries.csv",
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
      <Seo title="Admin Deliveries" description="Track Laundry Wash deliveries in progress." />

      <AdminPageHeader title="Deliveries" onExport={handleExport} />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Truck} label="Out for Delivery" value={String(outForDelivery)} tone="blue" />
        <StatCard icon={CheckCircle2} label="Delivered" value={String(delivered)} tone="green" />
        <StatCard
          icon={PackageCheck}
          label="Total Deliveries"
          value={String(deliveries.length)}
          tone="purple"
        />
      </div>

      <div className="mt-6">
        <ActivityTable
          entries={activity}
          onViewDetails={(entry) => entry.order && setActiveOrder(entry.order)}
          onAccept={() => {}}
          onReject={() => {}}
        />
      </div>

      {activeOrder && (
        <OrderDetailsModal order={activeOrder} onClose={() => setActiveOrder(undefined)} />
      )}
    </>
  );
}
