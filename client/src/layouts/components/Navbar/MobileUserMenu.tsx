import {
  ChevronDown,
  UserCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useState } from "react";

import { accountNavigationLinks } from "@/constants";

interface MobileUserMenuProps {
  userName?: string;
  avatarUrl?: string;
  closeMenu: () => void;
  onLogout?: () => void;
}

export default function MobileUserMenu({
  userName = "John Doe",
  avatarUrl,
  closeMenu,
  onLogout,
}: MobileUserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t">
      {/* User Trigger */}
      <button
        type="button"
        onClick={() =>
          setIsOpen((prev) => !prev)
        }
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

          <span className="font-medium text-text-primary">
            {userName}
          </span>
        </div>

        <ChevronDown
          size={20}
          className={clsx(
            "transition-transform duration-200 text-white",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {/* Account Links */}
      {isOpen && (
        <div className="px-5 pb-5">
          <nav className="rounded-xl bg-[#444444] p-3">
            {accountNavigationLinks.map(
              ({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={closeMenu}
                  className="block rounded-lg px-4 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-white"
                >
                  {label}
                </Link>
              ),
            )}

            <button
              type="button"
              onClick={() => {
                closeMenu();
                onLogout?.();
              }}
              className="w-full rounded-lg px-4 py-3 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white"
            >
              Logout
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}