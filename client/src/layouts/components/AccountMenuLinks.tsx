import { Link } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";

import { accountNavigationLinks } from "@/constants";
import type { UserRole } from "@/data/mockUsers";
import logOutLogo from "@/assets/images/log-out-img.png";

interface AccountMenuLinksProps {
  role?: UserRole;
  onNavigate: () => void;
  onLogout?: () => void;
}

const LINK_CLASSES =
  "flex items-center gap-2 rounded-lg px-4 py-3 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white";

export default function AccountMenuLinks({ role, onNavigate, onLogout }: AccountMenuLinksProps) {
  return (
    <nav className="flex flex-col">
      {role === "admin" && (
        <Link to="/admin" onClick={onNavigate} className={LINK_CLASSES}>
          <LayoutDashboard size={18} className="shrink-0" />
          Dashboard
        </Link>
      )}

      {accountNavigationLinks.map(({ label, path, icon }) => (
        <Link key={path} to={path} onClick={onNavigate} className={LINK_CLASSES}>
          {icon && <img src={icon} alt="" className="h-[18px] w-[18px] shrink-0" />}
          {label}
        </Link>
      ))}

      <button
        type="button"
        onClick={() => {
          onNavigate();
          onLogout?.();
        }}
        className={`${LINK_CLASSES} w-full text-left`}
      >
        <img src={logOutLogo} alt="" className="h-[18px] w-[18px] shrink-0" />
        Logout
      </button>
    </nav>
  );
}
