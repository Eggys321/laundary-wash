export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "note-1",
    title: "Pickup scheduled",
    message: "Your laundry pickup is scheduled for Sep 8, between 8:00 AM and 10:00 AM.",
    createdAt: "2026-09-05T08:30:00",
    isRead: false,
  },
  {
    id: "note-2",
    title: "Order on the way",
    message: "Order LW-10221 has been picked up and is being processed.",
    createdAt: "2026-09-04T15:10:00",
    isRead: false,
  },
  {
    id: "note-3",
    title: "Order delivered",
    message: "Order LW-10198 was delivered successfully. Enjoy your fresh laundry!",
    createdAt: "2026-08-27T18:45:00",
    isRead: true,
  },
  {
    id: "note-4",
    title: "Welcome to Laundry Wash",
    message: "Your account was created successfully. Book your first pickup anytime.",
    createdAt: "2026-08-10T09:00:00",
    isRead: true,
  },
];
