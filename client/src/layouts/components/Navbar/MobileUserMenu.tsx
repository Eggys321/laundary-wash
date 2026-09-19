import { ChevronDown, UserCircle } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";

import AccountMenuLinks from "../AccountMenuLinks";
import type { UserRole } from "@/data/mockUsers";

interface MobileUserMenuProps {
  userName: string;
  avatarUrl?: string;
  role?: UserRole;
  closeMenu: () => void;
  onLogout?: () => void;
}

export default function MobileUserMenu({
  userName,
  avatarUrl,
  role,
  closeMenu,
  onLogout,
}: MobileUserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between p-5"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
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

          <span className="font-medium text-text-primary">{userName}</span>
        </div>

        <ChevronDown
          size={20}
          className={clsx(
            "transition-transform duration-200 text-white",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <div className="px-5 pb-5">
          <div className="rounded-xl bg-[#444444] p-3">
            <AccountMenuLinks role={role} onNavigate={closeMenu} onLogout={onLogout} />
          </div>
        </div>
      )}
    </div>
  );
}
