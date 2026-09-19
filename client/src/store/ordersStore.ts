import { create } from "zustand";
import { persist } from "zustand/middleware";

import { MOCK_ORDERS, type Order, type OrderStatus } from "@/data/mockOrders";

interface OrdersState {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set) => ({
      orders: MOCK_ORDERS,
      addOrder: (order) =>
        set((state) => ({ orders: [order, ...state.orders] })),
      updateOrderStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, status } : order,
          ),
        })),
    }),
    {
      name: "laundry-wash-orders",
    },
  ),
);
