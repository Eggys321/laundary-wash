import { Link } from "react-router-dom";

interface DesktopAuthButtonsProps {
  isAuthenticated: boolean;
}

export default function DesktopAuthButtons({
  isAuthenticated,
}: DesktopAuthButtonsProps) {
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="hidden items-center gap-3 font-lato text-lg md:flex">
      <Link
        to="/register"
        className="btn btn-primary h-13 rounded-[10px] px-8 lg:rounded-[30px] lg:px-11"
      >
        Sign Up
      </Link>

      <Link
        to="/login"
        className="btn h-13 rounded-[10px] border-primary bg-background-gray-2 px-8 text-primary lg:rounded-[30px] lg:px-11"
      >
        Login
      </Link>
    </div>
  );
}