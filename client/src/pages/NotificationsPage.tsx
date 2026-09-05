import { useState } from "react";
import dayjs from "dayjs";
import { Bell, BellOff } from "lucide-react";
import clsx from "clsx";

import { Button, Seo } from "@/components";
import { MOCK_NOTIFICATIONS } from "@/data/mockNotifications";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((item) => !item.isRead).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
  };

  return (
    <>
      <Seo
        title="Notifications"
        description="Stay up to date with your Laundry Wash order notifications."
      />

      <div className="rounded-3xl bg-background-gray-2 p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-redhat text-2xl font-bold text-text-primary">
              Notifications
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              {unreadCount > 0
                ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}.`
                : "You're all caught up."}
            </p>
          </div>

          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead} className="w-fit">
              Mark all as read
            </Button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="mt-10 flex flex-col items-center py-12 text-center">
            <BellOff size={40} className="text-text-secondary/60" />
            <p className="mt-4 text-sm text-text-secondary">No notifications yet.</p>
          </div>
        ) : (
          <ul className="mt-6 space-y-3">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={clsx(
                  "flex gap-4 rounded-2xl border border-white/5 p-4",
                  notification.isRead ? "bg-white/[0.02]" : "bg-white/5",
                )}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Bell size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-redhat font-bold text-text-primary">
                      {notification.title}
                    </p>
                    {!notification.isRead && (
                      <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                    )}
                  </div>

                  <p className="mt-1 text-sm text-text-secondary">{notification.message}</p>

                  <p className="mt-2 text-xs text-text-secondary/60">
                    {dayjs(notification.createdAt).format("MMM D, YYYY · h:mm A")}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
