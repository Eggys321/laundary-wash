import { Outlet } from "react-router-dom";

import { AccountSidebar } from "./components";

export default function AccountLayout() {
  return (
    <div className="bg-background-dark font-lato">
      <div className="container mx-auto grid gap-8 px-4 py-10 md:px-6 lg:grid-cols-[260px_1fr] lg:px-10 lg:py-14">
        <aside className="min-w-0 lg:sticky lg:top-28 lg:h-fit">
          <AccountSidebar />
        </aside>

        <div className="min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
