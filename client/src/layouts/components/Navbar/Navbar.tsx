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
  const { isAuthenticated } = useAuth();

  const {
    isMenuOpen,
    openMenu,
    closeMenu,
  } = useMobileMenu();

  const visibleLinks = navigationLinks.filter(
    ({ requiresAuth }) =>
      !requiresAuth || isAuthenticated,
  );

  return (
    <header className="bg-background-gray-2">
      <nav className="container mx-auto flex items-center justify-between px-4 py-6 font-lato md:px-3 md:py-10 lg:px-10">
        {/* Brand */}
        <Link to="/">
          <img
            src={brandLogo}
            alt="Laundry Wash"
            className="h-11 w-auto object-contain xl:h-14"
          />
        </Link>

        {/* Desktop Navigation */}
        <DesktopNavigation
          links={visibleLinks}
        />

        {/* Desktop Authentication */}
        <DesktopAuthButtons
          isAuthenticated={isAuthenticated}
        />

        {/* Desktop User */}
        {isAuthenticated && (
          <DesktopUserMenu
            userName="John Doe"
            avatarUrl="https://res.cloudinary.com/eguono/image/upload/v1784630742/laundary-wash/avatar_i0hx4d.png"
          />
        )}
        

        {/* Mobile Menu */}
        <MobileMenuButton
          onClick={openMenu}
        />
        
      </nav>
      

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMenuOpen}
        closeMenu={closeMenu}
        links={visibleLinks}
        isAuthenticated={isAuthenticated}
      />
      
    </header>
  );
}