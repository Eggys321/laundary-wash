import { create } from "zustand";
import { persist } from "zustand/middleware";

import { MOCK_ORDERS, type Order } from "@/data/mockOrders";

interface OrdersState {
  orders: Order[];
  addOrder: (order: Order) => void;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set) => ({
      orders: MOCK_ORDERS,
      addOrder: (order) =>
        set((state) => ({ orders: [order, ...state.orders] })),
    }),
    {
      name: "laundry-wash-orders",
    },
  ),
);
