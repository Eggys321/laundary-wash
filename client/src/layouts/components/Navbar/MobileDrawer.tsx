import { Link, NavLink } from "react-router-dom";
import { X } from "lucide-react";
import clsx from "clsx";

import brandLogo from "@/assets/logos/Frame 2.png";
import type { NavigationItem } from "@/constants";
import MobileUserMenu from "./MobileUserMenu";

interface MobileDrawerProps {
  isOpen: boolean;
  closeMenu: () => void;
  links: NavigationItem[];
  isAuthenticated: boolean;
}

export default function MobileDrawer({
  isOpen,
  closeMenu,
  links,
  isAuthenticated,
}: MobileDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeMenu}
        className={clsx(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isOpen
            ? "visible opacity-100"
            : "invisible opacity-0",
        )}
      />

      {/* Drawer */}
      <aside
  className={clsx(
    "fixed right-0 top-0 z-50 flex h-dvh w-72 flex-col bg-background-gray-2 shadow-2xl transition-transform duration-300 lg:hidden",
    isOpen
      ? "translate-x-0"
      : "translate-x-full",
  )}
>
  {/* Header */}
  <div className="flex shrink-0 items-center justify-between border-b p-6">
    <Link
            to="/"
            onClick={closeMenu}
          >
            <img
              src={brandLogo}
              alt="Brand Logo"
              className="h-10 w-auto"
            />
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

  {/* Scrollable Navigation */}
  <div className="min-h-0 flex-1 overflow-y-auto">
    <nav className="flex flex-col gap-2 p-6">
      {links.map(({ label, path }) => (
        <NavLink
          key={path}
          to={path}
          onClick={closeMenu}
          className={({ isActive }) =>
            clsx(
              "rounded-lg px-4 py-3 text-lg",
              isActive
                ? "bg-primary text-white"
                : "text-text-secondary",
            )
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  </div>

  {/* Bottom User / Auth Section */}
  <div className="shrink-0">
    {isAuthenticated ? (
      <MobileUserMenu
        userName="John Doe"
        avatarUrl="https://res.cloudinary.com/eguono/image/upload/v1784630742/laundary-wash/avatar_i0hx4d.png"
        closeMenu={closeMenu}
      />
    ) : (
      <div className="space-y-3 border-t p-6">
        <Link
          to="/register"
          onClick={closeMenu}
          className="btn btn-primary w-full"
        >
          Sign Up
        </Link>

        <Link
          to="/login"
          onClick={closeMenu}
          className="btn w-full"
        >
          Login
        </Link>
      </div>
    )}
  </div>
</aside>
    </>
  );
}



   