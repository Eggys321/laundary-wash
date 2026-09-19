import { useMemo, useState } from "react";
import { ClipboardList, Users, Wallet } from "lucide-react";
import toast from "react-hot-toast";

import { ActivityTable, AdminPageHeader, OrderDetailsModal, StatCard } from "@/components/admin";
import { Seo } from "@/components";
import { useAuthStore } from "@/store/authStore";
import { useOrdersStore } from "@/store/ordersStore";
import { useAdminSearchStore } from "@/store/adminSearchStore";
import { buildActivityFeed, getRevenueSummary, type ActivityEntry } from "@/lib/adminData";
import { formatCurrency } from "@/lib/currency";
import { downloadCsv } from "@/lib/csv";
import { ORDER_STATUS_LABEL } from "@/data/mockOrders";

export default function AdminDashboardPage() {
  const accounts = useAuthStore((state) => state.accounts);
  const orders = useOrdersStore((state) => state.orders);
  const updateOrderStatus = useOrdersStore((state) => state.updateOrderStatus);
  const query = useAdminSearchStore((state) => state.query);
  const [activeOrder, setActiveOrder] = useState<ActivityEntry["order"]>();

  const customerCount = accounts.filter((account) => account.role === "customer").length;
  const revenue = getRevenueSummary(orders);

  const activityFeed = useMemo(() => {
    const feed = buildActivityFeed(accounts, orders);

    if (!query.trim()) return feed;

    const needle = query.trim().toLowerCase();
    return feed.filter(
      (entry) =>
        entry.activity.toLowerCase().includes(needle) ||
        entry.service.toLowerCase().includes(needle),
    );
  }, [accounts, orders, query]);

  const handleExport = () => {
    downloadCsv(
      "dashboard-activity.csv",
      ["Activity", "Service", "Date", "Status", "Amount"],
      activityFeed.map((entry) => [
        entry.activity,
        entry.service,
        entry.date,
        entry.status ? ORDER_STATUS_LABEL[entry.status] : "-",
        entry.amount !== undefined ? entry.amount : "-",
      ]),
    );
  };

  return (
    <>
      <Seo title="Admin Dashboard" description="Laundry Wash admin dashboard overview." />

      <AdminPageHeader title="Dashboard" onExport={handleExport} />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={ClipboardList} label="Orders" value={String(orders.length)} tone="amber" />
        <StatCard icon={Users} label="Users" value={String(customerCount)} tone="purple" />
        <StatCard
          icon={Wallet}
          label="Revenue"
          value={formatCurrency(revenue.totalRevenue)}
          tone="teal"
        />
      </div>

      <div className="mt-6">
        <ActivityTable
          entries={activityFeed}
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
