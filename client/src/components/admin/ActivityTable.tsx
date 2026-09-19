import { useMemo, useState } from "react";
import { Filter, Inbox } from "lucide-react";
import dayjs from "dayjs";

import { Badge } from "@/components";
import RowActionsMenu from "./RowActionsMenu";
import { paginate, type ActivityEntry } from "@/lib/adminData";
import { formatCurrency } from "@/lib/currency";
import { ORDER_STATUS_LABEL, type OrderStatus } from "@/data/mockOrders";

type StatusFilter = OrderStatus | "all";

const FILTERS: { label: string; value: StatusFilter }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Ongoing", value: "ongoing" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

const PAGE_SIZE = 8;

interface ActivityTableProps {
  entries: ActivityEntry[];
  onViewDetails: (entry: ActivityEntry) => void;
  onAccept: (entry: ActivityEntry) => void;
  onReject: (entry: ActivityEntry) => void;
}

export default function ActivityTable({
  entries,
  onViewDetails,
  onAccept,
  onReject,
}: ActivityTableProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () =>
      statusFilter === "all"
        ? entries
        : entries.filter((entry) => entry.status === statusFilter),
    [entries, statusFilter],
  );

  const { items, totalPages, page: currentPage } = paginate(filtered, page, PAGE_SIZE);

  return (
    <div className="rounded-3xl bg-background-gray-2 p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <h2 className="font-redhat text-lg font-bold text-text-primary">Recent Activity</h2>

        <button
          type="button"
          onClick={() => setIsFilterOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm font-medium text-text-secondary hover:bg-white/10"
        >
          <Filter size={16} />
          Filter
        </button>
      </div>

      {isFilterOpen && (
        <div className="mt-4 flex flex-wrap gap-2">
          {FILTERS.map(({ label, value }) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setStatusFilter(value);
                setPage(1);
              }}
              className={
                statusFilter === value
                  ? "rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-white"
                  : "rounded-full bg-white/5 px-4 py-1.5 text-sm font-medium text-text-secondary hover:bg-white/10"
              }
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {items.length === 0 ? (
        <div className="mt-10 flex flex-col items-center py-12 text-center">
          <Inbox size={40} className="text-text-secondary/60" />
          <p className="mt-4 text-sm text-text-secondary">No activity to show.</p>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-175 border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-text-secondary">
                <th className="pb-3 pr-4 font-medium">Activity</th>
                <th className="pb-3 pr-4 font-medium">Service</th>
                <th className="pb-3 pr-4 font-medium">Date</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 pr-4 font-medium">Amount</th>
                <th className="pb-3 font-medium" />
              </tr>
            </thead>

            <tbody>
              {items.map((entry) => (
                <tr key={entry.id} className="border-b border-white/5 text-text-primary">
                  <td className="py-4 pr-4 font-medium">{entry.activity}</td>
                  <td className="py-4 pr-4 text-text-secondary">{entry.service}</td>
                  <td className="py-4 pr-4 text-text-secondary">
                    {dayjs(entry.date).format("MMM D, YYYY · h:mm A")}
                  </td>
                  <td className="py-4 pr-4">
                    {entry.status ? (
                      <Badge tone={entry.status}>{ORDER_STATUS_LABEL[entry.status]}</Badge>
                    ) : (
                      <span className="text-text-secondary">-</span>
                    )}
                  </td>
                  <td className="py-4 pr-4">
                    {entry.amount !== undefined ? formatCurrency(entry.amount) : "-"}
                  </td>
                  <td className="py-4 text-right">
                    {entry.order ? (
                      <RowActionsMenu
                        onViewDetails={() => onViewDetails(entry)}
                        onAccept={
                          entry.order.status === "pending"
                            ? () => onAccept(entry)
                            : undefined
                        }
                        onReject={
                          entry.order.status === "pending"
                            ? () => onReject(entry)
                            : undefined
                        }
                      />
                    ) : (
                      <span className="text-text-secondary">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between text-sm text-text-secondary">
        <span>
          Page {currentPage} of {totalPages}
        </span>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage <= 1}
            className="rounded-lg bg-white/5 px-3 py-1.5 font-medium hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Previous
          </button>

          <button
            type="button"
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage >= totalPages}
            className="rounded-lg bg-white/5 px-3 py-1.5 font-medium hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
