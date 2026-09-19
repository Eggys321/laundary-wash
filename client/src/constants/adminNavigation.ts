import {
  ClipboardList,
  LayoutDashboard,
  Truck,
  Users,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface AdminNavigationItem {
  label: string;
  path: string;
  icon: LucideIcon;
  end: boolean;
}

export const ADMIN_NAV_LINKS: AdminNavigationItem[] = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard, end: true },
  { label: "Orders", path: "/admin/orders", icon: ClipboardList, end: false },
  { label: "Revenue", path: "/admin/revenue", icon: Wallet, end: false },
  { label: "Users", path: "/admin/users", icon: Users, end: false },
  { label: "Deliveries", path: "/admin/deliveries", icon: Truck, end: false },
];
