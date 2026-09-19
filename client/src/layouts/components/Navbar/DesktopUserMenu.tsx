import { useEffect, useRef, useState } from "react";
import { ChevronDown, UserCircle } from "lucide-react";
import clsx from "clsx";

import AccountMenuLinks from "../AccountMenuLinks";
import type { UserRole } from "@/data/mockUsers";

interface DesktopUserMenuProps {
  userName?: string;
  avatarUrl?: string;
  role?: UserRole;
  onLogout?: () => void;
}

export default function DesktopUserMenu({
  userName,
  avatarUrl,
  role,
  onLogout,
}: DesktopUserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className="relative hidden lg:block"
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex items-center gap-3"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={userName}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
            <UserCircle size={28} />
          </div>
        )}

        <span className="text-sm font-medium text-text-primary">
          {userName}
        </span>

        <ChevronDown
          size={18}
          className={clsx(
            "transition-transform duration-200 text-white cursor-pointer",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <div
        className={clsx(
          "absolute right-0 top-full z-50 mt-3 w-64 origin-top-right rounded-xl bg-[#444444] p-3 shadow-xl transition-all duration-200",
          isOpen
            ? "visible scale-100 opacity-100"
            : "invisible scale-95 opacity-0",
        )}
      >
        <AccountMenuLinks role={role} onNavigate={() => setIsOpen(false)} onLogout={onLogout} />
      </div>
    </div>
  );
}
