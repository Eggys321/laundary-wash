import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Menu, Search, UserCircle } from "lucide-react";
import clsx from "clsx";

import AccountMenuLinks from "./AccountMenuLinks";
import { useAuth } from "@/hooks";
import { useAdminSearchStore } from "@/store/adminSearchStore";

interface TopbarProps {
  onOpenMenu: () => void;
}

export default function Topbar({ onOpenMenu }: TopbarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const query = useAdminSearchStore((state) => state.query);
  const setQuery = useAdminSearchStore((state) => state.setQuery);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header className="flex items-center justify-between gap-4 border-b border-white/5 bg-background-dark px-4 py-4 sm:px-6">
      <div className="relative w-full max-w-sm">
        <Search
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary/60"
        />

        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search..."
          className="input w-full rounded-xl border-white/10 bg-background-gray-2 pl-10 text-text-primary placeholder:text-text-secondary/60"
        />
      </div>

      <div ref={menuRef} className="relative hidden shrink-0 lg:block">
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-haspopup="menu"
          className="flex items-center gap-3"
        >
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
              <UserCircle size={28} />
            </div>
          )}

          <span className="text-sm font-medium text-text-primary">{user?.name}</span>

          <ChevronDown
            size={18}
            className={clsx(
              "text-text-secondary transition-transform duration-200",
              isMenuOpen && "rotate-180",
            )}
          />
        </button>

        <div
          className={clsx(
            "absolute right-0 top-full z-50 mt-3 w-64 origin-top-right rounded-xl bg-[#444444] p-3 shadow-xl transition-all duration-200",
            isMenuOpen ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0",
          )}
        >
          <AccountMenuLinks
            role={user?.role}
            onNavigate={() => setIsMenuOpen(false)}
            onLogout={handleLogout}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Open navigation menu"
        className="flex shrink-0 items-center justify-center rounded-lg bg-primary p-2 text-white lg:hidden"
      >
        <Menu size={22} />
      </button>
    </header>
  );
}
