import { Link } from "react-router-dom";

import brandLogo from "@/assets/logos/Frame 2.png";
import { navigationLinks } from "@/constants";
import { useAuth, useMobileMenu } from "@/hooks";

import {
  DesktopAuthButtons,
  DesktopNavigation,
  DesktopUserMenu,
  MobileDrawer,
  MobileMenuButton,
} from ".";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  const { isMenuOpen, openMenu, closeMenu } = useMobileMenu();

  const visibleLinks = navigationLinks.filter(
    ({ requiresAuth }) => !requiresAuth || isAuthenticated,
  );

  return (
    <header className="bg-background-gray-2 sticky top-0 z-1">
      <nav className="container mx-auto flex items-center justify-between px-4 py-6 font-lato md:px-3 md:py-10 lg:px-10">
        <Link to="/">
          <img
            src={brandLogo}
            alt="Laundry Wash"
            className="h-11 w-auto object-contain xl:h-14"
          />
        </Link>

        <DesktopNavigation links={visibleLinks} />

        <DesktopAuthButtons isAuthenticated={isAuthenticated} />

        {isAuthenticated && user && (
          <DesktopUserMenu
            userName={user.name}
            avatarUrl={user.avatarUrl}
            onLogout={logout}
          />
        )}

        <MobileMenuButton onClick={openMenu} />
      </nav>

      <MobileDrawer
        isOpen={isMenuOpen}
        closeMenu={closeMenu}
        links={visibleLinks}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={logout}
      />
    </header>
  );
}
