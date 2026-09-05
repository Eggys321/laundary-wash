import { Link, Outlet } from "react-router-dom";

import brandLogo from "@/assets/logos/Frame 2.png";
import homeImgHero from "@/assets/images/home-img-hero.png";

export default function AuthLayout() {
  return (
    <div className="grid min-h-screen bg-background-dark font-lato lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img
          src={homeImgHero}
          alt="Laundry Wash pickup and delivery service"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-background-dark via-background-dark/50 to-black/10" />

        <Link to="/" className="absolute left-12 top-12">
          <img src={brandLogo} alt="Laundry Wash" className="h-11 w-auto" />
        </Link>

        <div className="absolute inset-x-0 bottom-0 p-12">
          <h2 className="font-redhat text-3xl font-bold text-white">
            Quick. Clean. Delivered.
          </h2>

          <p className="mt-3 max-w-md text-white/80">
            Laundry Wash takes laundry off your to-do list with reliable
            pickup and delivery, every time.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center px-6 py-12 sm:px-10">
        <Link to="/" className="mb-8 lg:hidden">
          <img src={brandLogo} alt="Laundry Wash" className="h-11 w-auto" />
        </Link>

        <Outlet />
      </div>
    </div>
  );
}
