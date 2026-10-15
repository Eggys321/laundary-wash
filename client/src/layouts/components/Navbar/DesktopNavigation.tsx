import { NavLink } from "react-router-dom";
import clsx from "clsx";

import type { NavigationItem } from "@/constants";

interface DesktopNavigationProps {
  links: NavigationItem[];
}

export default function DesktopNavigation({
  links,
}: DesktopNavigationProps) {
  return (
    <>
    
    <div className="hidden items-center gap-8 text-xl font-normal lg:flex lg:gap-12">
      {links.map(({ label, path }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            clsx(
              "transition-colors duration-200",
              isActive
                ? "text-primary"
                : "text-text-secondary hover:text-primary",
            )
          }
        >
          {label}
        </NavLink>

      ))}
    </div>
   
    </>
  );
}