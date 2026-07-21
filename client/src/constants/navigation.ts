import PILogo from "@/assets/images/personal-info-icon.png"
import orderLogo from "@/assets/images/order-icon.png"
import notificationLogo from "@/assets/images/notification-logo.png"
import settingsLogo from "@/assets/images/settings-logo.png"
import paymentLogo from "@/assets/images/payment-logo.png"
import supportLogo from "@/assets/images/payment-logo.png"

export interface NavigationItem {
  label: string;
  path: string;
  requiresAuth?: boolean;
  hiddenWhenAuthenticated?: boolean;
  icon?: string;
}

export const navigationLinks: NavigationItem[] = [
  {
    label: "Services",
    path: "/services",
  },
  {
    label: "About Us",
    path: "/about",
  },
  {
    label: "Contact Us",
    path: "/contact",
  },
  {
    label: "Book Laundry",
    path: "/book",
    requiresAuth: true,
  },
];


export const accountNavigationLinks: NavigationItem[] = [
  {
    label: "Personal Information",
    path: "/profile",
    icon:PILogo,
  },
  {
    label: "Orders",
    path: "/orders",
    icon:orderLogo,
  },
  {
    label: "Notification",
    path: "/notifications",
    icon:notificationLogo,
  },
  {
    label: "Settings",
    path: "/settings",
    icon:settingsLogo,
  },
  {
    label: "Payments",
    path: "/payments",
    icon:paymentLogo,
  },
  {
    label: "Support",
    path: "/support",
    icon:supportLogo,
  },
];
