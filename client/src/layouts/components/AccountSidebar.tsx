import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import clsx from "clsx";

import { accountNavigationLinks } from "@/constants";
import { useAuth } from "@/hooks";

interface AccountSidebarProps {
  onNavigate?: () => void;
}

export default function AccountSidebar({ onNavigate }: AccountSidebarProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onNavigate?.();
    navigate("/", { replace: true });
  };

  return (
    <nav className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
      {accountNavigationLinks.map(({ label, path, icon }) => (
        <NavLink
          key={path}
          to={path}
          onClick={onNavigate}
          className={({ isActive }) =>
            clsx(
              "flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-white"
                : "text-text-secondary hover:bg-white/5 hover:text-text-primary",
            )
          }
        >
          {icon && <img src={icon} alt="" className="h-5 w-5" />}
          {label}
        </NavLink>
      ))}

      <button
        type="button"
        onClick={handleLogout}
        className="flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
      >
        <LogOut size={20} />
        Logout
      </button>
    </nav>
  );
}
