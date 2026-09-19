import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import clsx from "clsx";

import brandLogo from "@/assets/logos/Frame 2.png";
import { useAuth } from "@/hooks";
import { ADMIN_NAV_LINKS } from "@/constants";

interface AdminSidebarProps {
  onNavigate?: () => void;
}

export default function AdminSidebar({ onNavigate }: AdminSidebarProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onNavigate?.();
    navigate("/", { replace: true });
  };

  return (
    <div className="flex h-full flex-col px-4 py-6">
      <Link to="/" onClick={onNavigate} className="mb-8 px-2">
        <img src={brandLogo} alt="Laundry Wash" className="h-9 w-auto" />
      </Link>

      <nav className="flex flex-1 flex-col gap-1.5">
        {ADMIN_NAV_LINKS.map(({ label, path, icon: Icon, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-white"
                  : "text-text-secondary hover:bg-white/5 hover:text-text-primary",
              )
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
      >
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
}
