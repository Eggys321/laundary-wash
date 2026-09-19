import { Link, NavLink, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import clsx from "clsx";

import brandLogo from "@/assets/logos/Frame 2.png";
import { useAuth } from "@/hooks";
import { ADMIN_NAV_LINKS } from "@/constants";
import MobileUserMenu from "./Navbar/MobileUserMenu";

interface AdminMobileDrawerProps {
  isOpen: boolean;
  closeMenu: () => void;
}

export default function AdminMobileDrawer({ isOpen, closeMenu }: AdminMobileDrawerProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <>
      <div
        onClick={closeMenu}
        className={clsx(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
      />

      <aside
        className={clsx(
          "fixed right-0 top-0 z-50 flex h-dvh w-72 flex-col bg-background-gray-2 shadow-2xl transition-transform duration-300 lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/5 p-6">
          <Link to="/" onClick={closeMenu}>
            <img src={brandLogo} alt="Laundry Wash" className="h-10 w-auto" />
          </Link>

          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close navigation menu"
            className="rounded-lg bg-primary p-2 text-white"
          >
            <X size={28} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <nav className="flex flex-col gap-1.5 p-6">
            {ADMIN_NAV_LINKS.map(({ label, path, icon: Icon, end }) => (
              <NavLink
                key={path}
                to={path}
                end={end}
                onClick={closeMenu}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-lg",
                    isActive ? "bg-primary text-white" : "text-text-secondary",
                  )
                }
              >
                <Icon size={20} />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="shrink-0">
          {user && (
            <MobileUserMenu
              userName={user.name}
              avatarUrl={user.avatarUrl}
              role={user.role}
              closeMenu={closeMenu}
              onLogout={handleLogout}
            />
          )}
        </div>
      </aside>
    </>
  );
}
