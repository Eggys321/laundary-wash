import type { RegisteredAccount } from "@/data/mockUsers";
import type { Order, OrderStatus } from "@/data/mockOrders";

export interface ActivityEntry {
  id: string;
  activity: string;
  service: string;
  date: string;
  status?: OrderStatus;
  amount?: number;
  order?: Order;
}

export const ordersToActivity = (orders: Order[]): ActivityEntry[] =>
  orders
    .map((order) => ({
      id: order.id,
      activity: order.status === "completed" ? "Delivery" : "Order",
      service: order.service,
      date: order.scheduledFor,
      status: order.status,
      amount: order.amount,
      order,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const buildActivityFeed = (
  accounts: RegisteredAccount[],
  orders: Order[],
): ActivityEntry[] => {
  const registrationEntries: ActivityEntry[] = accounts
    .filter((account) => account.role === "customer")
    .map((account) => ({
      id: `reg-${account.id}`,
      activity: "Registration",
      service: "-",
      date: account.createdAt,
    }));

  return [...registrationEntries, ...ordersToActivity(orders)].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
};

export interface RevenueSummary {
  totalRevenue: number;
  paidRevenue: number;
  pendingRevenue: number;
  paidCount: number;
  pendingCount: number;
}

export const getRevenueSummary = (orders: Order[]): RevenueSummary => {
  const active = orders.filter((order) => order.status !== "cancelled");

  const paid = active.filter((order) => order.paymentStatus === "paid");
  const pending = active.filter((order) => order.paymentStatus === "pending");

  const paidRevenue = paid.reduce((sum, order) => sum + order.amount, 0);
  const pendingRevenue = pending.reduce((sum, order) => sum + order.amount, 0);

  return {
    totalRevenue: paidRevenue + pendingRevenue,
    paidRevenue,
    pendingRevenue,
    paidCount: paid.length,
    pendingCount: pending.length,
  };
};

export const paginate = <T,>(items: T[], page: number, pageSize: number) => {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    page: safePage,
    totalPages,
  };
};
