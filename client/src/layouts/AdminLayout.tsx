import { Outlet } from "react-router-dom";

import { AdminMobileDrawer, AdminSidebar, Topbar } from "./components";
import { useMobileMenu } from "@/hooks";

export default function AdminLayout() {
  const { isMenuOpen, openMenu, closeMenu } = useMobileMenu();

  return (
    <div className="flex min-h-screen bg-background-dark font-lato">
      <div className="hidden shrink-0 border-r border-white/5 bg-background-gray-2 lg:block lg:w-64">
        <AdminSidebar />
      </div>

      <AdminMobileDrawer isOpen={isMenuOpen} closeMenu={closeMenu} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onOpenMenu={openMenu} />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
