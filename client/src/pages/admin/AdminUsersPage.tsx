import { useMemo, useState } from "react";
import { ShieldCheck, UserCircle, Users as UsersIcon } from "lucide-react";
import dayjs from "dayjs";
import clsx from "clsx";

import { AdminPageHeader, StatCard } from "@/components/admin";
import { Seo } from "@/components";
import { useAuthStore } from "@/store/authStore";
import { useAdminSearchStore } from "@/store/adminSearchStore";
import { paginate } from "@/lib/adminData";
import { downloadCsv } from "@/lib/csv";

const PAGE_SIZE = 8;

export default function AdminUsersPage() {
  const accounts = useAuthStore((state) => state.accounts);
  const query = useAdminSearchStore((state) => state.query);
  const [page, setPage] = useState(1);

  const customerCount = accounts.filter((account) => account.role === "customer").length;
  const adminCount = accounts.filter((account) => account.role === "admin").length;

  const rows = useMemo(() => {
    const sorted = [...accounts].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    if (!query.trim()) return sorted;

    const needle = query.trim().toLowerCase();
    return sorted.filter(
      (account) =>
        account.name.toLowerCase().includes(needle) ||
        account.email.toLowerCase().includes(needle),
    );
  }, [accounts, query]);

  const { items, totalPages, page: currentPage } = paginate(rows, page, PAGE_SIZE);

  const handleExport = () => {
    downloadCsv(
      "users.csv",
      ["Name", "Email", "Phone", "Role", "Joined"],
      rows.map((account) => [
        account.name,
        account.email,
        account.phone || "-",
        account.role,
        account.createdAt,
      ]),
    );
  };

  return (
    <>
      <Seo title="Admin Users" description="Manage Laundry Wash registered users." />

      <AdminPageHeader title="Users" onExport={handleExport} />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={UsersIcon}
          label="Total Users"
          value={String(accounts.length)}
          tone="purple"
        />
        <StatCard icon={UserCircle} label="Customers" value={String(customerCount)} tone="blue" />
        <StatCard icon={ShieldCheck} label="Admins" value={String(adminCount)} tone="teal" />
      </div>

      <div className="mt-6 rounded-3xl bg-background-gray-2 p-6 sm:p-8">
        <h2 className="font-redhat text-lg font-bold text-text-primary">Registered Users</h2>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-150 border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-text-secondary">
                <th className="pb-3 pr-4 font-medium">Name</th>
                <th className="pb-3 pr-4 font-medium">Email</th>
                <th className="pb-3 pr-4 font-medium">Role</th>
                <th className="pb-3 font-medium">Joined</th>
              </tr>
            </thead>

            <tbody>
              {items.map((account) => (
                <tr key={account.id} className="border-b border-white/5 text-text-primary">
                  <td className="py-4 pr-4 font-medium">{account.name}</td>
                  <td className="py-4 pr-4 text-text-secondary">{account.email}</td>
                  <td className="py-4 pr-4">
                    <span
                      className={clsx(
                        "inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize",
                        account.role === "admin"
                          ? "bg-primary/15 text-primary"
                          : "bg-white/10 text-text-secondary",
                      )}
                    >
                      {account.role}
                    </span>
                  </td>
                  <td className="py-4 text-text-secondary">
                    {dayjs(account.createdAt).format("MMM D, YYYY")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
    </>
  );
}
